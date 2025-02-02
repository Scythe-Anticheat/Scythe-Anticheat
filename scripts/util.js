// @ts-check
import config from "./data/config.js";
import { world, Entity, Player } from "@minecraft/server";

/**
 * @name flag
 * @param {Player} player - The player object
 * @param {string} check - What check ran the function.
 * @param {string} checkType - What sub-check ran the function (ex. A, B, C).
 * @param {string} hackType - What the hack is considered as (ex. movement, combat, exploit).
 * @param {string} [debug] - Debug info.
 * @param {boolean} [shouldTP] - Whether to tp the player to itself.
 * @param {object} [cancelObject] - object with property "cancel" to cancel.
 * @param {number} [slot] - Slot to clear an item out.
 * @example flag(player, "Spammer", "B", "Combat", undefined, undefined, undefined, msg);
 * @remarks Alerts staff if a player is hacking.
 */
export function flag(player, check, checkType, hackType, debug, shouldTP = false, cancelObject, slot) {
    // validate that required params are defined
    if(!(player instanceof Player)) throw TypeError(`Error: player is not an instance of Player.`);
    if(typeof check !== "string") throw TypeError(`Error: check is type of ${typeof check}. Expected "string"`);
    if(typeof checkType !== "string") throw TypeError(`Error: checkType is type of ${typeof checkType}. Expected "string"`);
    if(typeof hackType !== "string") throw TypeError(`Error: hackType is type of ${typeof hackType}. Expected "string"`);
    if(typeof debug !== "string" && debug !== undefined) throw TypeError(`Error: debug is type of ${typeof debug}. Expected "string", "number" or "undefined"`);
    if(typeof shouldTP !== "boolean") throw TypeError(`Error: shouldTP is type of ${typeof shouldTP}. Expected "boolean"`);
    if(typeof cancelObject !== "object" && cancelObject !== undefined) throw TypeError(`Error: cancelObject is type of ${typeof cancelObject}. Expected "object" or "undefined"`);
    if(typeof slot !== "number" && slot !== undefined) throw TypeError(`Error: slot is type of ${typeof slot}. Expected "number" or "undefined"`);

    const checkData = config.modules[check.toLowerCase() + checkType];
    if(!checkData) throw Error(`No valid check data was found for ${check}/${checkType}.`);

    if((config.disableFlagsFromScytheOp || checkData.exclude_scythe_op) && player.hasTag("op")) return;

    if(debug) {
        // Remove characters that may break commands
        debug = debug.replace(/"|\\|\n/gm, "");

        // Malicious users may try make the debug field ridiculously large to lag any clients that may
        // try to view the alert (anybody with the 'notify' tag)
        if(debug.length > 256) {
            const extraLength = debug.length - 256;
            debug = debug.slice(0, -extraLength) + ` (+${extraLength} additional characters)`;
        }
    }

    // If debug is enabled then log everything we know about the player.
    if(config.debug) {
        const {
            name,
            nameTag,
            location,
            velocity,
            rotation,
            heldItem,
            selectedSlotIndex,
            isEmoting,
            isFlying,
            isGliding,
            isJumping,
            isClimbing,
            isFalling,
            isInWater,
            isOnGround,
            isSleeping,
            isSneaking,
            isSprinting,
            isSwimming,
            blocksBroken,
            entitiesHit,
            cps,
            firstAttack,
            lastSelectedSlot,
            startBreakTime,
            lastThrow,
            autotoolSwitchDelay,
            lastMessageSent,
            lastGoodPosition,
            movedAt
        } = player;

       const data = {
            timestamp: Date.now(),
            time: new Date().toISOString(),
            check: `${check}/${checkType}`,
            debug: `${debug}§r`,
            shouldTP,
            slot,
            playerData: {
                name,
                nameTag,
                dimension: player.dimension.id,
                location,
                headLocation: player.getHeadLocation(),
                velocity,
                rotation,
                tags: String(player.getTags()).replace(/[\r\n"]/gm, ""),
                heldItem,
                selectedSlotIndex,
                platform: player.clientSystemInfo.platformType,
                isEmoting,
                isFlying,
                isGliding,
                isJumping,
                isClimbing,
                isFalling,
                isInWater,
                isOnGround,
                isSleeping,
                isSneaking,
                isSprinting,
                isSwimming,
                scythe: {
                    blocksBroken,
                    entitiesHit,
                    cps,
                    firstAttack,
                    lastSelectedSlot,
                    startBreakTime,
                    lastThrow,
                    autotoolSwitchDelay,
                    lastMessageSent,
                    lastGoodPosition,
                    movedAt
                }
            }
        };

        console.warn(JSON.stringify(data));
    }

    // Cancel the message/placement if possible
    if(cancelObject) cancelObject.cancel = true;

    if(shouldTP) player.tryTeleport(player.lastGoodPosition, { dimension: player.dimension, rotation: { x: 0, y: 0 }, keepVelocity: false });

    const scoreboardObjective = check !== "InventoryMods" ? `${check.toLowerCase()}vl` : "invmovevl";

    // If the VL scoreboard object doesn't exist then create one
    if(!world.scoreboard.getObjective(scoreboardObjective)) world.scoreboard.addObjective(scoreboardObjective, scoreboardObjective);

    let currentVl = getScore(player, scoreboardObjective, 0);
    setScore(player, scoreboardObjective, ++currentVl);

    const flagMessage = `§r§6[§aScythe§6]§r ${player.name}§r §1has failed §7(${hackType}) §4${check}/${checkType}${debug ? ` §7(${debug}§r§7)§4`: ""}. VL= ${currentVl}`;

    if(config.logAlertsToConsole) console.log(flagMessage.replace(/§./g, ""));
    tellAllStaff(flagMessage, ["notify"]);

    if(typeof slot === "number") {
        const container = player.getComponent("inventory")?.container;

		container?.setItem(slot, undefined);
	}

    if(!checkData.enabled) throw Error(`${check}/${checkType} was flagged but the module was disabled.`);

    // Handle punishments
    const { punishment } = checkData;

    if(currentVl < checkData.minVlbeforePunishment) return;

    switch(punishment) {
        case "kick": {
            tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has been automatically kicked by Scythe Anticheat for Unfair Advantage. Check: ${check}/${checkType}`, ["notify"]);
            player.runCommandAsync(`kick "${player.name}" §r§6[§aScythe§6]§r You have been kicked for hacking. Check: ${check}/${checkType}`)
                .catch(() => player.triggerEvent("scythe:kick")); // Incase /kick fails we despawn them from the world
            break;
        }

        case "ban": {
            // Check if auto-banning is disabled
            if(!config.autoban) break;

            const punishmentLength = checkData.punishmentLength?.toLowerCase();
            let banLength;

            if(punishmentLength) {
                banLength = isNaN(punishmentLength) ? parseTime(punishmentLength) : Number(punishmentLength);
            }

            player.setDynamicProperty("banInfo", JSON.stringify({
                by: "Scythe Anticheat",
                reason: `Scythe Anticheat detected Unfair Advantage! Check: ${check}/${checkType}`,
                time: typeof banLength === "number" ? Date.now() + banLength : null
            }));

            tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has been banned by Scythe Anticheat for Unfair Advantage. Check: ${check}/${checkType}`);
            break;
        }

        case "mute": {
            player.setDynamicProperty("muted", true);
            player.sendMessage(`§r§6[§aScythe§6]§r You have been muted by Scythe Anticheat for Unfair Advantage. Check: ${check}/${checkType}`);

            // remove chat ability
            player.runCommandAsync("ability @s mute true");

            tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has automatically been muted by Scythe Anticheat for Unfair Advantage. Check: ${check}/${checkType}.`);
            break;
        }

        case "freeze": {
            player.addEffect("weakness", 99999, {
                amplifier: 255,
                showParticles: false
            });
            player.triggerEvent("scythe:freeze");
            player.setDynamicProperty("frozen", true);
            player.inputPermissions.movementEnabled = false;

            player.sendMessage("§r§6[§aScythe§6]§r You have been frozen by Scythe Anticheat for Unfair Advantage.");
            tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has automatically been frozen by Scythe Anticheat for Unfair Advantage. Check: ${check}/${checkType}.`);
            break;
        }

        case "none":
            break;

        default:
            throw Error(`Unknown punishment type "${punishment}".`);
    }
}

/**
 * @name banMessage
 * @param {Player} player - The player object
 * @example banMessage(player);
 * @remarks Bans the player from the game.
 */
export function banMessage(player) {
    // validate that required params are defined
    if(!(player instanceof Player)) throw TypeError(`Error: player is not an instance of Player.`);

    // @ts-expect-error
    if(config.flagWhitelist.includes(player.name) && player.hasTag("op")) return;

    // @ts-expect-error
    const unbanQueue = JSON.parse(world.getDynamicProperty("unbanQueue"));

    // We check for an array as a player can join with a spoofed name such as "__proto__" and automatically get unbanned
    // This is because Object's have a property called "__proto__"
    if(Array.isArray(unbanQueue[player.name.toLowerCase()])) {
        player.setDynamicProperty("banInfo", undefined);

        tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has been found in the unban queue and has been unbanned.`);

        delete unbanQueue[player.name.toLowerCase()];
        world.setDynamicProperty("unbanQueue", JSON.stringify(unbanQueue));
        return;
    }

    // @ts-expect-error
    const { by, reason, time } = JSON.parse(player.getDynamicProperty("banInfo"));

    let friendlyTime;

    if(time && time !== null) {
        if(time < Date.now()) {
           tellAllStaff(`§r§6[§aScythe§6]§r ${player.name}'s ban has expired and has now been unbanned.`);

            player.setDynamicProperty("banInfo", undefined);
            return;
        }

        const { w, d, h, m, s } = msToTime(Number(time));
        friendlyTime = `${w} weeks, ${d} days, ${h} hours, ${m} minutes, ${s} seconds`;
    }

    tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} was kicked for being banned. Ban Reason: ${reason ?? "You are banned!"}.`);

    player.runCommandAsync(`kick "${player.name}" §r\n§l§cYOU ARE BANNED!\n§eBanned By:§r ${by ?? "N/A"}\n§bReason:§r ${reason ?? "N/A"}\n§aBan Length:§r ${friendlyTime || "Permanent"}`)
        .catch(() => player.triggerEvent("scythe:kick")); // Incase /kick fails we despawn them from the world
}

/**
 * @name getClosestPlayer
 * @param {Entity} entity - The entity to check
 * @example getClosestPlayer(entity);
 * @remarks Gets the nearest player to an entity. (Unused for now)
 * @returns {Player} player - The player that was found
 */
export function getClosestPlayer(entity) {
    // validate that required params are defined
    if(!(entity instanceof Entity)) throw TypeError(`Error: entity is not an instance of Entity.`);

    const nearestPlayer = entity.dimension.getPlayers({
        closest: 1,
        location: entity.location
    })[0];

    return nearestPlayer;
}

/**
 * @name parseTime
 * @param {string} str - The time value to convert to milliseconds
 * @example parseTime("24d"); // returns 2073600000
 * @remarks Parses a time string into milliseconds.
 * @returns {number | null} str - The converted string
 */
export function parseTime(str) {
    // validate that required params are defined
    if(typeof str !== "string") throw TypeError(`Error: str is type of ${typeof str}. Expected "string"`);

    // parse time values like 12h, 1d, 10m into milliseconds
    const time = str.match(/^(\d+)([smhdwy])$/);

    if(time) {
        const [, num, unit] = time;
        const ms = {
            s: 1000,
            m: 60000,
            h: 3600000,
            d: 86400000,
            w: 604800000,
            y: 31536000000
        }[unit];
        return ms * Number(num);
    }
    return time;
}

/**
 * @name msToTime
 * @param {number} ms - The string to convert
 * @example str(88200000); // Returns { d: 1, h: 0, m: 30, s: 0 }
 * @remarks Convert milliseconds to seconds, minutes, hours, days and weeks
 * @returns {object} str - The converted string
 */
export function msToTime(ms) {
    // validate that required params are defined
    if(typeof ms !== "number") throw TypeError(`Error: ms is type of ${typeof ms}. Expected "number"`);

    // If the milliseconds count is greater than now, subtract now.
    const now = Date.now();
    if(ms > now) ms = ms - now;

    // Turn milliseconds into days, minutes, seconds, etc
    return {
        w: Math.floor(ms / (1000 * 60 * 60 * 24 * 7)),
        d: Math.floor((ms % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24)),
        h: Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        m: Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((ms % (1000 * 60)) / 1000)
    };
}

/**
 * @name getScore
 * @param {Entity} entity - The entity to get the scoreboard value from
 * @param {string} objective - The name of the scoreboard objective
 * @param {number} [defaultValue] - Default value to return if unable to get scoreboard score
 * @example getScore(player, "cbevl")
 * @remarks Gets the scoreboard objective value for a player
 * @returns {number} score - The scoreboard objective value
 */
export function getScore(entity, objective, defaultValue = 0) {
    if(!(entity instanceof Entity)) throw TypeError(`Error: entity is not an instance of Entity.`);
    if(typeof objective !== "string") throw TypeError(`Error: objective is type of ${typeof objective}. Expected "string"`);
    if(typeof defaultValue !== "number") throw TypeError(`Error: defaultValue is type of ${typeof defaultValue}. Expected "number"`);

    try {
       return world.scoreboard.getObjective(objective)?.getScore(entity) ?? defaultValue;
    } catch {
        return defaultValue;
    }
}

/**
 * @name setScore
 * @param {Entity} entity - The player to set the score for
 * @param {string} objectiveName - The scoreboard objective
 * @param {number} value - The new value of the scoreboard objective
 * @example getScore(player, "cbevl", 0)
 * @remarks Sets the scoreboard objective value for a player
 */
export function setScore(entity, objectiveName, value) {
    if(!(entity instanceof Entity)) throw TypeError(`Error: entity is not an instance of Entity.`);
    if(typeof objectiveName !== "string") throw TypeError(`Error: objective is type of ${typeof objectiveName}. Expected "string"`);
    if(typeof value !== "number") throw TypeError(`Error: value is type of ${typeof value}. Expected "number"`);

    const objective = world.scoreboard.getObjective(objectiveName);
    if(!objective) throw Error(`Objective "${objectiveName}" does not exist`);

    objective.setScore(entity, value);
}

/**
 * @name capitalizeFirstLetter
 * @param {string} string - The string to modify
 * @remarks Capitalize the first
 * @returns {string} string - The updated string
 */
export function capitalizeFirstLetter(string) {
	return string[0].toUpperCase() + string.slice(1);
}

/**
 * @name findPlayerByName
 * @remarks Finds a player object by a player name
 * @param {string} name - The player to look for
 * @returns {Player | undefined} [player] - The player found
 */
export function findPlayerByName(name) {
	const searchName = name.toLowerCase().replace(/\\|@/g, "");

    for(const player of world.getPlayers()) {
        const lowercaseName = player.name.toLowerCase();
        if(searchName !== lowercaseName && !lowercaseName.includes(searchName)) continue;

		// Found a valid player
		return player;
	}
}

/**
 * @name addOp
 * @remarks Add Scythe-OP status to a player
 * @param {Player} initiator - The player that initiated the request
 * @param {Player} player - The player that will be given scythe-op status
 */
export function addOp(initiator, player) {
    tellAllStaff(`§r§6[§aScythe§6]§r ${initiator.name} has given ${player.name} scythe-op status.`);

    player.addTag("op");

    player.sendMessage("§r§6[§aScythe§6]§r §7You are now scythe-op.");
}

/**
 * @name removeOp
 * @remarks Remove Scythe-OP status from a player
 * @param {Player} initiator - The player that initiated the request
 * @param {Player} player - The player that will be given scythe-op status
 */
export function removeOp(initiator, player) {
    tellAllStaff(`§r§6[§aScythe§6]§r ${initiator.name} has removed ${player.name}'s scythe-op status.`);

    player.removeTag("op");
}

/**
 * @name tellAllStaff
 * @remarks Send a message to all Scythe-Opped players
 * @param {string} message - The message to send
 * @param {string[]} tags - What tags does a player require to get this message
 */
export function tellAllStaff(message, tags = ["op"]) {
    for(const player of world.getPlayers({tags})) {
        player.sendMessage(message);
    }
}

/**
 * @name getBlocksBetween
 * @remarks Find every possible coordinate between two sets of Vector3
 * @param {object} pos1 - First set of coordinates
 * @param {object} pos2 - Second set of coordinates
 * @returns {object[]} coordinates - Each possible coordinate
 */
export function getBlocksBetween(pos1, pos2) {
    const { x: minX, y: minY, z: minZ } = pos1;
    const { x: maxX, y: maxY, z: maxZ } = pos2;

    const coordinates = [];

    for(let x = minX; x <= maxX; x++) {
        for(let y = minY; y <= maxY; y++) {
            for(let z = minZ; z <= maxZ; z++) {
                coordinates.push({x, y, z});
            }
        }
    }

    return coordinates;
}