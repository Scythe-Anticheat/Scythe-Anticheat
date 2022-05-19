import * as Minecraft from "mojang-minecraft";
import config from "./data/config.js";
import cache from "./data/cache.js";

const World = Minecraft.world;

/**
 * @name flag
 * @param {object} player - The player object
 * @param {string} check - What check ran the function.
 * @param {string} checkType - What sub-check ran the function (ex. a, b ,c).
 * @param {string} hackType - What the hack is considered as (ex. movement, combat, exploit).
 * @param {string} debugName - Name for the debug value.
 * @param {string} debug - Debug info.
 * @param {boolean} shouldTP - Whever to tp the player to itself.
 * @param {object} message - The message object, used to cancel the message.
 * @param {number} slot - Slot to clear an item out.
 * @example flag(player, "Spammer", "B", "Combat", false, false, false, msg, false);
 * @remarks Alerts staff if a player is hacking.
 */
export function flag(player, check, checkType, hackType, debugName, debug, shouldTP, message, slot) {
    // validate that required params are defined
    if (!player) return console.warn(`${new Date()} | ` + "Error: ${player} isnt defined. Did you forget to pass it? (./util.js:8)");
    if (!check) return console.warn(`${new Date()} | ` + "Error: ${check} isnt defined. Did you forget to pass it? (./util.js:9)");
    if (!check) return console.warn(`${new Date()} | ` + "Error: ${checkType} isnt defined. Did you forget to pass it? (./util.js:10)");
    if (!hackType) return console.warn(`${new Date()} | ` + "Error: ${hackType} isnt defined. Did you forget to pass it? (./util.js:11)");

    // cancel the message
    if (message) message.cancel = true;

    // remove characters that may break commands
    if(debug) debug = String(debug).replace(/"|\\/g, "");

    if(shouldTP && check !== "Crasher") player.runCommand(`tp @s @s`);
    else if(shouldTP && check === "Crasher") player.runCommand(`tp @s 30000000 30000000 30000000`);

    if(check !== "CommandBlockExploit") try {
        player.runCommand(`scoreboard objectives add ${check.toLowerCase()}vl dummy`);
    } catch {}

    if (check != "CommandBlockExploit") player.runCommand(`scoreboard players add @s ${check.toLowerCase()}vl 1`);
        else player.runCommand(`scoreboard players add @s cbevl 1`);

    try {
        if(debug && check != "CommandBlockExploit") player.runCommand(`tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(${hackType}) §4${check}/${checkType.toUpperCase()} §7(${debugName}=${debug})§4. VL= "},{"score":{"name":"@s","objective":"${check.toLowerCase()}vl"}}]}`);
            else if (debug) player.runCommand(`tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(${hackType}) §4${check}/${checkType.toUpperCase()} §7(${debugName}=${debug})§4. VL= "},{"score":{"name":"@s","objective":"cbevl"}}]}`);
            else player.runCommand(`tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(${hackType}) §4${check}/${checkType.toUpperCase()}. VL= "},{"score":{"name":"@s","objective":"${check.toLowerCase()}vl"}}]}`);
    } catch {}

    slot = slot + 0;

    if (slot >= 0) {
        try {
            if(slot <= 8) player.runCommand(`replaceitem entity @s slot.hotbar ${slot} air 1`);
                else player.runCommand(`replaceitem entity @s slot.inventory ${slot - 9} air 1`);
        } catch {}
    }

    let checkData = config.modules[check.toLowerCase() + checkType.toUpperCase()];

    // punishment stuff
    if(checkData.punishment == "kick") {
        try {
            player.runCommand(`kick "${player.nameTag}" §r§6[§aScythe§6]§r You have been kicked for hacking. Check: ${check}\\${checkType}`);
        } catch {
            // if we cant /kick them then we despawn them
            player.triggerEvent("scythe:kick");
        }
    } else if(checkData.punishment == "ban") {
        try {
            player.runCommand(`testfor @s[scores={autoban=1..,${check.toLowerCase()}vl=${checkData.minVlbeforeBan}..}]`);
            try {
                player.runCommand(`tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has been banned by Scythe Anticheat for Unfair Advantage. Check: ${check}/${checkType}"}]}`);
            } catch {}
                
            // this removes old ban stuff
            player.getTags().forEach(t => {
                t = t.replace(/"/g, "");
                if(t.startsWith("reason:")) player.removeTag(t);
                if(t.startsWith("by:")) player.removeTag(t);
                if(t.startsWith("time:")) player.removeTag(t);
            });

            player.addTag(`by:Scythe Anticheat`);
            player.addTag(`reason:Scythe Anticheat detected Unfair Advantage! Check: ${check}/${checkType}`);
            player.addTag(`isBanned`);
        } catch {}
    }
}

/**
 * @name banMessage
 * @param {object} player - The player object
 * @example banMessage(player);
 * @remarks Bans the player from the game.
 */
export function banMessage(player) {
    // validate that required params are defined
    if (!player) return console.warn(`${new Date()} | ` + "Error: ${player} isnt defined. Did you forget to pass it? (./util.js:68)");

    if(cache.unbanQueue.includes(player.name.toLowerCase().split(" ")[0])) {
        player.removeTag("isBanned");
        player.getTags().forEach(t => {
            t = t.replace(/"/g, "");
            if(t.startsWith("reason:")) player.removeTag(t);
            if(t.startsWith("by:")) player.removeTag(t);
            if(t.startsWith("time:")) player.removeTag(t);
        });

        // remove the player from the unban queue
        for (let i = -1; i < cache.unbanQueue.length; i++) {
            if(cache.unbanQueue[i] == player.name.toLowerCase().split(" ")[0]) cache.unbanQueue.splice(i, 1);
        }
        return;
    }

    var reason;
    var by;
    var time;

    player.getTags().forEach(t => {
        t = t.replace(/"/g, "");
        if(t.startsWith(`by:`)) by = t.slice(3);
        if(t.startsWith(`reason:`)) reason = t.slice(7);
        if(t.startsWith(`time:`)) time = t.slice(5);
    });


    if(time) {
        if(time < new Date().getTime()) {
            // ban expired, woo
            player.removeTag("isBanned");
            player.getTags().forEach(t => {
                t = t.replace(/"/g, "");
                if(t.startsWith("reason:")) player.removeTag(t);
                if(t.startsWith("by:")) player.removeTag(t);
                if(t.startsWith("time:")) player.removeTag(t);
            });
            return;
        }

        time = msToTime(Number(time));
        time = `${time.w} weeks, ${time.d} days, ${time.h} hours, ${time.m} minutes, ${time.s} seconds`;
    }

    try {
        player.runCommand(`kick "${player.nameTag}" §r\n§l§cYOU ARE BANNED!\n§r\n§eBanned By:§r ${by || "N/A"}\n§bReason:§r ${reason || "N/A"}\n§aBan Length:§r ${time || "Permenant"}`);
    } catch {
        player.triggerEvent("scythe:kick");
    }
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
    if (!entity) return console.warn(`${new Date()} | ` + "Error: ${entity} isnt defined. Did you forget to pass it? (./util.js:130)");

    // thx https://discord.com/channels/523663022053392405/854033525546942464/948349809746669629

    const query = new Minecraft.EntityQueryOptions();
    query.closest = 1;

    let closestPlayer;

    for (let player of World.getPlayers()) {
        query.location = player.location;
    
        const nearestPlayer = [...player.dimension.getPlayers(query)][0];
    
        if (!nearestPlayer) continue;

        closestPlayer = player;
    }

    return closestPlayer;
}

/**
 * @name snakeToCamel
 * @param {string} str - The string to convert
 * @example str("minecraft:enchanted_golden_apple"); // returns "enchantedGoldenApple"
 * @remarks Converts a snake_case string to camelCase
 * @returns {string} str - The converted string
 */
export function snakeToCamel(str) {
    // validate that required params are defined
    if (!str) return console.warn(`${new Date()} | ` + "Error: ${str} isnt defined. Did you forget to pass it? (./util.js:196)");

    // thanks https://stackoverflow.com/a/52551910
    str = str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());

    str = str.replace("minecraft", "");

    // https://stackoverflow.com/a/7224605
    return str.charAt(0).toLowerCase() + str.slice(1);
}

/**
 * @name parseTime
 * @param {string} str - The time value to convert to milliseconds
 * @example str("24d"); // returns 2073600000
 * @remarks Parses a time string into milliseconds.
 * @returns {string} str - The converted string
 */
export function parseTime(str) {
    // validate that required params are defined
    if (!str) return console.warn(`${new Date()} | ` + "Error: ${str} isnt defined. Did you forget to pass it? (./util.js:211)");

    // parse time values like 12h, 1d, 10m into milliseconds

    // code from github co-pilot, thanks ai!
    const time = str.match(/^(\d+)([smhdw])$/);
    if (time) {
        const [, num, unit] = time;
        const ms = {
            s: 1000,
            m: 60000,
            h: 3600000,
            d: 86400000,
            w: 604800000
        }[unit];
        return ms * num;
    }
    return time;
}

/**
 * @name msToTime
 * @param {string} str - The string to convert
 * @example str(88200000); // Returns { d: 1, h: 0, m: 30, s: 0 }
 * @remarks Convert miliseconds to seconds, minutes, hours, days and weeks
 * @returns {string} str - The converted string
 */
export function msToTime(str) {
    // validate that required params are defined
    if (!str) return console.warn(`${new Date()} | ` + "Error: ${str} isnt defined. Did you forget to pass it? (./util.js:246)");

    if(str > new Date().getTime()) str = str - new Date().getTime();

    // turn miliseconds into days, minutes, seconds, etc
    const ms = str;
    const w = Math.floor(ms / (1000 * 60 * 60 * 24 * 7));
    const d = Math.floor(ms / (1000 * 60 * 60 * 24));
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