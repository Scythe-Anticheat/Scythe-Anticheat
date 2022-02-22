import config from "./data/config.js";

/**
 * @name flag
 * @param {object} player - The player object
 * @param {string} check - What check ran the function.
 * @param {string} checkType - What sub-check ran the function (ex. a, b ,c).
 * @param {string} hacktype - What the hack is considered as (ex. movement, combat, exploit).
 * @param {string} debugName - Name for the debug value.
 * @param {string} debug - Debug info.
 * @param {boolean} shouldTP - Whever to tp the player to itself.
 * @param {object} message - The message object, used to cancel the message.
 * @param {number} slot - Slot to clear an item out.
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

    player.runCommand(`scoreboard players add @s ${check.toLowerCase()}vl 1`);

    try {
        if(debug) player.runCommand(`tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(${hackType}) §4${check}/${checkType} §7(${debugName}=${debug})§4. VL= "},{"score":{"name":"@s","objective":"${check.toLowerCase()}vl"}}]}`);
            else player.runCommand(`tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(${hackType}) §4${check}/${checkType}. VL= "},{"score":{"name":"@s","objective":"${check.toLowerCase()}vl"}}]}`);
    } catch {}

    if(slot == 0) slot++;

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
            // if we cant /kick them then we despwan them
            player.triggerEvent("scythe:kick");
        }
    } else if(checkData.punishment == "ban") {
        try {
            player.runCommand(`testfor @s[scores={autoban=1..,${check.toLowerCase()}vl=${checkData.minVlbeforeBan}..}]`);
            player.runCommand(`tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has been banned by Scythe Anticheat for Unfair Advantage. Check: ${check}/${checkType}"}]}`);

            player.addTag(`"by:Scythe Anticheat"`);
            player.addTag(`"reason:Scythe Anticheat detected Unfair Advantage! Check: ${check}/${checkType}"`);
            player.addTag(`isBanned`);
        } catch {}
    }
}

/**
 * @name banMessage
 * @param {object} player - The player object
 */
export function banMessage(player) {
    // validate that required params are defined
    if (!player) return console.warn(`${new Date()} | ` + "Error: ${player} isnt defined. Did you forget to pass it? (./util.js:68)");

    var reason;
    var by;

    player.tags.forEach(t => {
        if(t.startsWith(`"by:`)) by = t.replace(/"/g, "").slice(3);
        if(t.startsWith(`"reason:`)) reason = t.replace(/"/g, "").slice(7);
    });

    try {
        player.runCommand(`kick "${player.nameTag}" §r\n§l§cYOU ARE BANNED!\n§r\n§eBanned By:§r ${by || "N/A"}\n§bReason:§r ${reason || "N/A"}`);
    } catch(error) {
        player.triggerEvent("scythe:kick");
    }
}