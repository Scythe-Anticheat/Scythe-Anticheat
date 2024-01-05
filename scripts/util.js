// @ts-check
import config from "./data/config.js";
import data from "./data/data.js";
import { world } from "@minecraft/server";

/**
 * @name flag
 * @param {object} player - The player object
 * @param {string} check - What check ran the function.
 * @param {string} checkType - What sub-check ran the function (ex. A, B, C).
 * @param {string} hackType - What the hack is considered as (ex. movement, combat, exploit).
 * @param {string | undefined} [debug] - Debug info.
 * @param {boolean} [shouldTP] - Whether to tp the player to itself.
 * @param {object | undefined} [cancelObject] - object with property "cancel" to cancel.
 * @param {number | undefined} [slot] - Slot to clear an item out.
 * @example flag(player, "Spammer", "B", "Combat", undefined, undefined, undefined, msg, undefined);
 * @remarks Alerts staff if a player is hacking.
 */
export function flag(player, check, checkType, hackType, debug, shouldTP = false, cancelObject, slot) {
    // validate that required params are defined
    if(typeof player !== "object") throw TypeError(`Error: player is type of ${typeof player}. Expected "object"`);
    if(typeof check !== "string") throw TypeError(`Error: check is type of ${typeof check}. Expected "string"`);
    if(typeof checkType !== "string") throw TypeError(`Error: checkType is type of ${typeof checkType}. Expected "string"`);
    if(typeof hackType !== "string") throw TypeError(`Error: hackType is type of ${typeof hackType}. Expected "string"`);
    if(typeof debug !== "string" && debug !== undefined) throw TypeError(`Error: debug is type of ${typeof debug}. Expected "string", "number" or "undefined"`);
    if(typeof shouldTP !== "boolean") throw TypeError(`Error: shouldTP is type of ${typeof shouldTP}. Expected "boolean"`);
    if(typeof cancelObject !== "object" && cancelObject !== undefined) throw TypeError(`Error: cancelObject is type of ${typeof cancelObject}. Expected "object" or "undefined"`);
    if(typeof slot !== "number" && slot !== undefined) throw TypeError(`Error: slot is type of ${typeof slot}. Expected "number" or "undefined"`);

    const checkData = config.modules[check.toLowerCase() + checkType.toUpperCase()];
    if(!checkData) throw Error(`No valid check data was found for ${check}/${checkType}.`);

    if((config.disable_flags_from_scythe_op || checkData.exclude_scythe_op) && player.hasTag("op")) return;

    if(debug) {
        // Remove characters and newlines to prevent commands from breaking
        debug = debug.replace(/"|\\|\n/gm, "");

        // Malicious users may try make the debug field ridiculously large to lag any clients that may
        // try to view the alert (anybody with the 'notify' tag)
        if(debug.length > 256) {
            const extraLength = debug.length - 256;
            debug = debug.slice(0, -extraLength) + ` (+${extraLength} additional characters)`;
        }
    }

    // If debug is enabled, then log everything we know about the player.
    if(config.debug) {
        const currentItem = player.getComponent("inventory").container.getItem(player.selectedSlot);

        const data = {
            timestamp: Date.now(),
            time: new Date().toISOString(),
            check: `${check}/${checkType}`,
            hackType: hackType,
            debug: `${debug}§r`,
            shouldTP: shouldTP,
            slot: slot,
            playerData: {
                name: player.name,
                nametag: player.nameTag,
                location: player.location,
                headLocation: player.getHeadLocation(),
                velocity: player.velocity,
                rotation: player.rotation,
                tags: String(player.getTags()).replace(/[\r\n"]/gm, ""),
                currentItem: currentItem?.typeId ?? "minecraft:air",
                selectedSlot: player.selectedSlot,
                dimension: player.dimension.id,
                fallDistance: player.fallDistance,
                extra: {
                    blocksBroken: player.blocksBroken ?? -1,
                    entitiesHitTick: player.entitiesHit,
                    cps: player.cps ?? -1,
                    firstAttack: player.firstAttack ?? -1,
                    lastSelectedSlot: player.lastSelectedSlot ?? -1,
                    startBreakTime: player.startBreakTime,
                    lastThrow: player.lastThrow,
                    autotoolSwitchDelay: player.autotoolSwitchDelay ?? -1,
                    lastMessageSent: player.lastMessageSent,
                    lastGoodPosition: player.lastGoodPosition
                }
            }
        };

        console.warn(JSON.stringify(data));
    }

    // Cancel the message/placement if possible
    if(cancelObject) cancelObject.cancel = true;

    if(shouldTP) player.tryTeleport(check === "Crasher" ? {x: 30000000, y: 30000000, z: 30000000} : player.lastGoodPosition, {dimension: player.dimension, rotation: {x: 0, y: 0}, keepVelocity: false});

    const scoreboardObjective = check === "CommandBlockExploit" ? "cbevl" : `${check.toLowerCase()}vl`;

    // If the VL scoreboard object doesn't exist then create one
    if(!world.scoreboard.getObjective(scoreboardObjective)) world.scoreboard.addObjective(scoreboardObjective, scoreboardObjective);

    let currentVl = getScore(player, scoreboardObjective, 0);
    currentVl++;

    if(debug) {
        tellAllStaff(`§r§6[§aScythe§6]§r ${player.name}§r §1has failed §7(${hackType}) §4${check}/${checkType.toUpperCase()} §7(${debug}§r§7)§4. VL= ${currentVl}`, ["notify"]);
    } else {
        tellAllStaff(`§r§6[§aScythe§6]§r ${player.name}§r §1has failed §7(${hackType}) §4${check}/${checkType.toUpperCase()}. VL= ${currentVl}`, ["notify"]);
    }

    setScore(player, scoreboardObjective, currentVl);

    if(typeof slot === "number") {
		const container = player.getComponent("inventory").container;
		container.setItem(slot, undefined);
	}

    if(!checkData.enabled) throw Error(`${check}/${checkType} was flagged but the module was disabled.`);

    // Handle punishments
    const punishment = checkData.punishment?.toLowerCase();
    if(typeof punishment !== "string") throw TypeError(`Error: punishment is type of ${typeof punishment}. Expected "string"`);

    if(punishment === "none" || punishment === "" || currentVl < checkData.minVlbeforePunishment) return;

    switch(punishment) {
        case "kick": {
            tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has been automatically kicked by Scythe Anticheat for Unfair Advantage. Check: ${check}/${checkType}`, ["notify"]);
            player.runCommandAsync(`kick "${player.name}" §r§6[§aScythe§6]§r You have been kicked for hacking. Check: ${check}/${checkType}`);
            // incase /kick fails, we despawn them from the world
            player.triggerEvent("scythe:kick");
            break;
        }

        case "ban": {
            // Check if auto-banning is disabled
            if(!config.autoban) break;

            // Remove old ban data
            for(const t of player.getTags()) {
                if(t.startsWith("reason:") || t.startsWith("by:") || t.startsWith("time:")) player.removeTag(t);
            }

            const punishmentLength = checkData.punishmentLength?.toLowerCase();
            let banLength;

            if(punishmentLength) {
                banLength = isNaN(punishmentLength) ? parseTime(punishmentLength) : Number(punishmentLength);
            }

            player.addTag("by:Scythe Anticheat");
            player.addTag(`reason:Scythe Anticheat detected Unfair Advantage! Check: ${check}/${checkType}`);
            if(typeof banLength === "number") player.addTag(`time:${Date.now() + banLength}`);
            player.addTag("isBanned");

            tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has been banned by Scythe Anticheat for Unfair Advantage. Check: ${check}/${checkType}`);
            break;
        }

        case "mute": {
            player.addTag("isMuted");
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
            player.addTag("freeze");
            player.runCommandAsync("inputpermission set @s movement disabled");
        
            player.sendMessage("§r§6[§aScythe§6]§r You have been frozen by Scythe Anticheat for Unfair Advantage.");
            tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has automatically been frozen by Scythe Anticheat for Unfair Advantage. Check: ${check}/${checkType}.`);
            break;
        }

        default:
            throw Error(`Unknown punishment type "${punishment}".`);
    }
}

/**
 * @name banMessage
 * @param {import("@minecraft/server").Player} player - The player object
 * @example banMessage(player);
 * @remarks Bans the player from the game.
 */
export function banMessage(player) {
    // validate that required params are defined
    if(typeof player !== "object") throw TypeError(`Error: player is type of ${typeof player}. Expected "object"`);

    // @ts-expect-error
    if(config.flagWhitelist.includes(player.name) && player.hasTag("op")) return;

    // @ts-expect-error
    if(data.unbanQueue.includes(player.name.toLowerCase())) {
        player.removeTag("isBanned");

        tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has been found in the unban queue and has been unbanned.`);

        for(const t of player.getTags()) {
            if(t.startsWith("reason:") || t.startsWith("by:") || t.startsWith("time:")) player.removeTag(t);
        }

        // remove the player from the unban queue
        for(let i = -1; i < data.unbanQueue.length; i++) {
            if(data.unbanQueue[i] !== player.name.toLowerCase().split(" ")[0]) continue;

            data.unbanQueue.splice(i, 1);
            break;
        }
        return;
    }

    let reason;
    let by;
    let time;

    for(const t of player.getTags()) {
        if(t.startsWith("by:")) by = t.slice(3);
            else if(t.startsWith("reason:")) reason = t.slice(7);
            else if(t.startsWith("time:")) time = Number(t.slice(5));
    }


    if(time) {
        if(time < Date.now()) {
           tellAllStaff(`§r§6[§aScythe§6]§r ${player.name}'s ban has expired and has now been unbanned.`, ["notify"]);

            // Ban expired, woo
            player.removeTag("isBanned");

            for(const t of player.getTags()) {
                if(t.startsWith("reason:") || t.startsWith("by:") || t.startsWith("time:")) player.removeTag(t);
            }

            return;
        }

        time = msToTime(Number(time));
        time = `${time.w} weeks, ${time.d} days, ${time.h} hours, ${time.m} minutes, ${time.s} seconds`;
    }

    tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} was kicked for being banned. Ban Reason: ${reason ?? "You are banned!"}.`);

    player.runCommandAsync(`kick "${player.name}" §r\n§l§cYOU ARE BANNED!\n§eBanned By:§r ${by ?? "N/A"}\n§bReason:§r ${reason ?? "N/A"}\n§aBan Length:§r ${time || "Permanent"}`);
    player.triggerEvent("scythe:kick");
}

/**
 * @name getClosestPlayer
 * @param {object} entity - The entity to check
 * @example getClosestPlayer(entity);
 * @remarks Gets the nearest player to an entity.
 * @returns {object} player - The player that was found
 */
export function getClosestPlayer(entity) {
    // validate that required params are defined
    if(typeof entity !== "object") return TypeError(`Error: entity is type of ${typeof entity}. Expected "object"`);

    const nearestPlayer = entity.dimension.getPlayers({
        closest: 1,
        location: {x: entity.location.x, y: entity.location.y, z: entity.location.z}
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

    // turn milliseconds into days, minutes, seconds, etc
    const w = Math.floor(ms / (1000 * 60 * 60 * 24 * 7));
    const d = Math.floor((ms % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
    const h = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((ms % (1000 * 60)) / 1000);

    return {
        w: w,
        d: d,
        h: h,
        m: m,
        s: s
    };
}

/**
 * @name getScore
 * @param {import("@minecraft/server").Entity} player - The player to get the scoreboard value from
 * @param {string} objective - The player to get the scoreboard value from
 * @param {number} [defaultValue] - Default value to return if unable to get scoreboard score
 * @example getScore(player, "cbevl", 0)
 * @remarks Gets the scoreboard objective value for a player
 * @returns {number} score - The scoreboard objective value
 */
export function getScore(player, objective, defaultValue = 0) {
    if(typeof player !== "object") throw TypeError(`Error: player is type of ${typeof player}. Expected "object"`);
    if(typeof objective !== "string") throw TypeError(`Error: objective is type of ${typeof objective}. Expected "string"`);
    if(typeof defaultValue !== "number") throw TypeError(`Error: defaultValue is type of ${typeof defaultValue}. Expected "number"`);

    try {
       return world.scoreboard.getObjective(objective)?.getScore(player) ?? defaultValue;
    } catch {
        return defaultValue;
    }
}

/**
 * @name setScore
 * @param {import("@minecraft/server").Entity} player - The player to set the score for
 * @param {string} objectiveName - The scoreboard objective
 * @param {number} value - The new value of the scoreboard objective
 * @example getScore(player, "cbevl", 0)
 * @remarks Sets the scoreboard objective value for a player
 */
export function setScore(player, objectiveName, value) {
    if(typeof player !== "object") throw TypeError(`Error: player is type of ${typeof player}. Expected "object"`);
    if(typeof objectiveName !== "string") throw TypeError(`Error: objective is type of ${typeof objectiveName}. Expected "string"`);
    if(typeof value !== "number") throw TypeError(`Error: value is type of ${typeof value}. Expected "number"`);

    const objective = world.scoreboard.getObjective(objectiveName);
    if(!objective) throw Error(`Objective "${objectiveName}" does not exist`);

    objective.setScore(player, value);
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
 * @returns {import("@minecraft/server").Player | undefined} [player] - The player found
 */
export function findPlayerByName(name) {
	const searchName = name.toLowerCase().replace(/\\|@/g, "");

    let player;

    for(const pl of world.getPlayers()) {
        const lowercaseName = pl.name.toLowerCase();
        if(searchName !== lowercaseName && !lowercaseName.includes(searchName)) continue;

		// Found a valid player
		player = pl;
		break;
	}

	return player;
}

/**
 * @name addOp
 * @remarks Add Scythe-OP status to a player
 * @param {import("@minecraft/server").Player} initiator - The player that initiated the request
 * @param {import("@minecraft/server").Player} player - The player that will be given scythe-op status
 */
export function addOp(initiator, player) {
    tellAllStaff(`§r§6[§aScythe§6]§r ${initiator.name} has given ${player.name} scythe-op status.`);

    player.addTag("op");

    player.sendMessage("§r§6[§aScythe§6]§r §7You are now scythe-op.");
}

/**
 * @name removeOp
 * @remarks Remove Scythe-OP status from a player
 * @param {import("@minecraft/server").Player} initiator - The player that initiated the request
 * @param {import("@minecraft/server").Player} player - The player that will be given scythe-op status
 */
export function removeOp(initiator, player) {
    tellAllStaff(`§r§6[§aScythe§6]§r ${initiator.name} has removed ${player.name}'s scythe-op status.`);

    player.removeTag("op");
}

/**
 * @name tellAllStaff
 * @remarks Send a message to all Scythe-Opped players
 * @param {string} message - The message to send
 * @param {Array} tags - What tags should be sent the message
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
 * @returns {Array} coordinates - Each possible coordinate
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