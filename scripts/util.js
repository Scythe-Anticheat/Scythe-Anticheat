// @ts-check
import config from "./data/config.js";
import { world, Player } from "@minecraft/server";

/**
 * @name flag
 * @description Sends a notification to staff members, and punish the player for cheating
 * @param {Player} player - The player object
 * @param {string} check - What check ran the function
 * @param {string} checkType - What sub-check ran the function (ex. A, B, C)
 * @param {string} hackType - What the hack is considered as (ex. movement, combat, exploit)
 * @param {string} [debug] - Debug info
 * @param {boolean} [shouldTP] - Whether to reset the player's position
 * @example flag(player, "Spammer", "B", "Combat");
 */
export function flag(player, check, checkType, hackType, debug, shouldTP = false) {
    // validate that required params are defined
    if(!(player instanceof Player)) throw TypeError(`Error: player is not an instance of Player.`);
    if(typeof check !== "string") throw TypeError(`Error: check is type of ${typeof check}. Expected "string"`);
    if(typeof checkType !== "string") throw TypeError(`Error: checkType is type of ${typeof checkType}. Expected "string"`);
    if(typeof hackType !== "string") throw TypeError(`Error: hackType is type of ${typeof hackType}. Expected "string"`);
    if(typeof debug !== "string" && debug !== undefined) throw TypeError(`Error: debug is type of ${typeof debug}. Expected "string", "number" or "undefined"`);
    if(typeof shouldTP !== "boolean") throw TypeError(`Error: shouldTP is type of ${typeof shouldTP}. Expected "boolean"`);

    // @ts-expect-error
    const checkData = config.modules[check.toLowerCase() + checkType];
    if(!checkData) throw Error(`No valid check data was found for ${check}/${checkType}.`);

    if((config.disableFlagsFromScytheOp || checkData.exclude_scythe_op) && player.hasTag("op")) return;

    if(debug) {
        /*
        Back when the NBT exploit was still a major thing, Scythe had a check called IllegalItemsF that would log if an item had a name greater than 32 characters
        This check would return the item name as part of the debug data to fix any false positives if there was a vanilla item with a longer name
        The problem is that a malicious NBT could set an item's name to include thousands of characters which would lag and potentially crash any staff members who viewed the Scythe alert
        To solve this, a character limit of 256 was imposed to stop this type of attack.
        
        While exploits such as NBTs are no longer a concern, this is good pratice for any other currently present modules that could be abused in a similiar fashion
        */
        if(debug.length > 256) {
            const extraLength = debug.length - 256;
            debug = debug.slice(0, -extraLength) + ` (+${extraLength} additional characters)`;
        }
    }

    // If debug is enabled then log everything we know about the player
    if(config.debug) {
        const playerData = {
            name: player.name,
            dimension: player.dimension.id,
            location: player.location,
            headLocation: player.getHeadLocation(),
            velocity: player.getVelocity(),
            rotation: player.getRotation(),
            tags: player.getTags(),
            heldItem: player.heldItem,
            selectedSlotIndex: player.selectedSlotIndex,
            platform: player.clientSystemInfo.platformType,
            scythe: {
                blocksBroken: player.blocksBroken,
                entitiesHit: player.entitiesHit,
                clicks: player.clicks,
                firstAttack: player.firstAttack,
                startBreakTime: player.startBreakTime,
                lastThrow: player.lastThrow,
                lastMessageSent: player.lastMessageSent,
                lastGoodPosition: player.lastGoodPosition,
                movedAt: player.movedAt
            }
        };

        // Copy all methods such as 'isMoving', 'isGliding', 'isFlying', 'isEmoting', etc to player data
        for(const property in player) {
            if(!property.startsWith("is")) continue;

            // @ts-expect-error
            playerData[property] = player[property];
        }

        const data = {
            timestamp: Date.now(),
            time: new Date().toISOString(),
            check: `${check}/${checkType}`,
            debug: `${debug}§r`,
            shouldTP,
            playerData
        };

        console.warn(JSON.stringify(data));
    }

    if(shouldTP) player.tryTeleport(player.lastGoodPosition, { dimension: player.dimension, rotation: { x: 0, y: 0 }, keepVelocity: false });

    const scoreboardObjective = check.toLowerCase() + "vl";

    // Create the violation scoreboard objective if it does not yet exist
    if(!world.scoreboard.getObjective(scoreboardObjective)) world.scoreboard.addObjective(scoreboardObjective, scoreboardObjective);

    let currentVl = player.getScore(scoreboardObjective);
    player.setScore(scoreboardObjective, ++currentVl);

    const flagMessage = `§r§6[§aScythe§6]§r ${player.name}§r §1has failed §7(${hackType}) §4${check}/${checkType}${debug ? ` §7(${debug}§r§7)§4`: ""}. VL= ${currentVl}`;

    if(config.logAlertsToConsole) console.log(flagMessage.replace(/§./g, ""));
    tellAllStaff(flagMessage, ["notify"]);

    // Handle punishments
    const { punishment } = checkData;

    if(currentVl < checkData.minVlbeforePunishment) return;

    switch(punishment) {
        case "kick": {
            tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has been automatically kicked by Scythe Anticheat for Unfair Advantage. Check: ${check}/${checkType}`, ["notify"]);

            player.kick(null, `§r§6[§aScythe§6]§r You have been kicked for hacking. Check: ${check}/${checkType}`);
            break;
        }

        case "ban": {
            const punishmentLength = checkData.punishmentLength?.toLowerCase();
            let banLength;

            if(punishmentLength) {
                banLength = isNaN(punishmentLength) ? parseTime(punishmentLength) : Number(punishmentLength);
            }

            player.ban(
                null,
                `Scythe Anticheat detected Unfair Advantage! Check: ${check}/${checkType}`,
                typeof banLength === "number" ? banLength : null
            );

            tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has been banned by Scythe Anticheat for Unfair Advantage. Check: ${check}/${checkType}`);
            break;
        }

        case "mute": {
            player.mute();
            player.sendMessage(`§r§6[§aScythe§6]§r You have been muted by Scythe Anticheat for Unfair Advantage. Check: ${check}/${checkType}`);

            tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has automatically been muted by Scythe Anticheat for Unfair Advantage. Check: ${check}/${checkType}.`);
            break;
        }

        case "freeze": {
            player.freeze();
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
    return {
        w: Math.floor(ms / (1000 * 60 * 60 * 24 * 7)),
        d: Math.floor((ms % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24)),
        h: Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        m: Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((ms % (1000 * 60)) / 1000)
    };
}

/**
 * @name capitalizeFirstLetter
 * @param {string} string - The string to modify
 * @remarks Capitalize the first character of a string
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
    // Remove characters that may been added when the player's name was autofilled
	const searchName = name.toLowerCase().replace(/\\|@/g, "");

    /**
     * We want to first try and see if there is an exact match for the player name.
     * If there are no exact matches, we check if the name searched is a substring of a player name and return that
     */
    let partialMatch;

    const players = world.getPlayers();
    for(let i = 0; i < players.length; i++) {
        const player = players[i];

        const lowercaseName = player.name.toLowerCase();
        if(searchName === lowercaseName) return player;

        if(lowercaseName.includes(searchName)) partialMatch = player;
	}

    return partialMatch;
}

/**
 * @name tellAllStaff
 * @remarks Send a message to all Scythe-Opped players
 * @param {string} message - The message to send
 * @param {string[]} tags - What tags does a player require to get this message
 */
export function tellAllStaff(message, tags = ["op"]) {
    const players = world.getPlayers({ tags });
    for(const player of players) {
        player.sendMessage(message);
    }
}

/**
 * @name getBlocksBetween
 * @remarks Find every possible coordinate between two sets of Vector3
 * @param {{ x: Number; y: Number; z: Number; }} pos1 - First set of coordinates
 * @param {{ x: Number; y: Number; z: Number; }} pos2 - Second set of coordinates
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