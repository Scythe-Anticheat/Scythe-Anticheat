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

    if(shouldTP && check !== "Crasher") player.runCommand(`tp @s @s`);
    else if(shouldTP && check === "Crasher") player.runCommand(`tp @s 30000000 30000000 30000000`);

    if (check != "CommandBlockExploit") player.runCommand(`scoreboard players add @s ${check.toLowerCase()}vl 1`);
        else player.runCommand(`scoreboard players add @s cbevl 1`);

    try {
        if(debug && check != "CommandBlockExploit") player.runCommand(`tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(${hackType}) §4${check}/${checkType.toUpperCase()} §7(${debugName}=${debug.replace(/"|\\/g, "")})§4. VL= "},{"score":{"name":"@s","objective":"${check.toLowerCase()}vl"}}]}`);
            else if (debug) player.runCommand(`tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(${hackType}) §4${check}/${checkType.toUpperCase()} §7(${debugName}=${debug.replace(/"|\\/g, "")})§4. VL= "},{"score":{"name":"@s","objective":"cbevl"}}]}`);
            else player.runCommand(`tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(${hackType}) §4${check}/${checkType.toUpperCase()}. VL= "},{"score":{"name":"@s","objective":"${check.toLowerCase()}vl"}}]}`);
    } catch {}

    slot = slot + 0;

    if (slot >= 0) {
        try {
            if(slot <= 8) player.runCommand(`replaceitem entity @s slot.hotbar ${slot} air 1`);
                else player.runCommand(`replaceitem entity @s slot.inventory ${slot - 9} air 1`);
        } catch(error) {
            console.warn(`${new Date()} | ` + error);
        }
    }

    let checkData = config.modules[check.toLowerCase() + checkType.toUpperCase()];

    // punishment stuff
    if(checkData.punishment == "kick") {
        try {
            player.runCommand(`kick "${player.nameTag}" §r§6[§aScythe§6]§r You have been kicked for hacking. Check: ${check}\\${checkType}`);
        } catch(error) {
            // if we cant /kick them then we despawn them
            player.triggerEvent("scythe:kick");
        }
    } else if(checkData.punishment == "ban") {
        try {
            player.runCommand(`testfor @s[scores={autoban=1..,${check.toLowerCase()}vl=${checkData.minVlbeforeBan}..}]`);
            player.runCommand(`tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has been banned by Scythe Anticheat for Unfair Advantage. Check: ${check}/${checkType}"}]}`);

            // this removes old ban stuff
            player.getTags().forEach(t => {
                if(t.slice(1).startsWith("reason:")) player.removeTag(t);
                if(t.slice(1).startsWith("by:")) player.removeTag(t);
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

    console.warn(cache.unbanQueue);
    if(cache.unbanQueue.includes(player.name.toLowerCase().split(" ")[0])) {
        player.removeTag("isBanned");
        player.getTags().forEach(t => {
            if(t.replace(/"/g, "").startsWith("reason:")) player.removeTag(t);
            if(t.replace(/"/g, "").startsWith("by:")) player.removeTag(t);
        });

        // remove the player from the unban queue
        for (let i = -1; i < cache.unbanQueue.length; i++) {
            if(cache.unbanQueue[i] == player.name.toLowerCase().split(" ")[0]) cache.unbanQueue.splice(i, 1);
        }
        return;
    }

    var reason;
    var by;

    player.getTags().forEach(t => {
        if(t.startsWith(`by:`)) by = t.replace(/"/g, "").slice(3);
        if(t.startsWith(`reason:`)) reason = t.replace(/"/g, "").slice(7);
    });

    try {
        player.runCommand(`kick "${player.nameTag}" §r\n§l§cYOU ARE BANNED!\n§r\n§eBanned By:§r ${by || "N/A"}\n§bReason:§r ${reason || "N/A"}`);
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
 * @example str("minecraft:enchanted_golden_apple");
 * @remarks Converts a snake_case string to camelCase
 * @returns {string} str - The converted string
 */
export function snakeToCamel(str) {
    // thanks https://stackoverflow.com/a/52551910
    str = str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());

    str = str.replace("minecraft", "");

    // https://stackoverflow.com/a/7224605
    return str.charAt(0).toLowerCase() + str.slice(1);
}