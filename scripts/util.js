/* eslint no-var: "off"*/
import * as Minecraft from "mojang-minecraft";

const World = Minecraft.World;
const Commands = Minecraft.Commands;

/**
 * @name flag
 * @param {object} player - The player object
 * @param {string} check - What check ran the function.
 * @param {string} checktype - What sub-check ran the function (ex. a, b ,c).
 * @param {string} hacktype - What the hack is considered as (ex. movement, combat, exploit).
 * @param {string} debugName - Name for the debug value.
 * @param {string} checktype - Debug info.
 * @param {boolean} checktype - Whever to tp the player to itself.
 * @param {object} checktype - The message object, used to cancel the message.
 */
export function flag(player, check, checkType, hackType, debugName, debug, shouldTP, message) {
    // validate that required params are defined
    if (!player) return console.warn(`${new Date()} | ` + "Error: ${player} isnt defined. Did you forget to pass it? (./util.js:8)");
    if (!check) return console.warn(`${new Date()} | ` + "Error: ${check} isnt defined. Did you forget to pass it? (./util.js:9)");
    if (!check) return console.warn(`${new Date()} | ` + "Error: ${checkType} isnt defined. Did you forget to pass it? (./util.js:10)");
    if (!hackType) return console.warn(`${new Date()} | ` + "Error: ${hackType} isnt defined. Did you forget to pass it? (./util.js:11)");

    // make sure the vl objective exists
    try {
        Commands.run(`scoreboard objectives add ${check.toLowerCase()}vl dummy`, World.getDimension("overworld"));
    } catch(error) {}

    // cancel the message
    if (message) message.cancel = true;

    if(shouldTP && check !== "Crasher") Commands.run(`tp "${player.nameTag}" "${player.nameTag}"`, World.getDimension("overworld"));
        else if(shouldTP && check === "Crasher") Commands.run(`tp "${player.nameTag}" 30000000 30000000 30000000`, World.getDimension("overworld"));

    Commands.run(`scoreboard players add "${player.nameTag}" ${check.toLowerCase()}vl 1`, World.getDimension("overworld"));

    if (check === "IllegalItems") { 
        var oldDebug = debug;
        debug = debug.amount;
    }

    try {
        if(debug) Commands.run(`execute "${player.nameTag}" ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(${hackType}) §4${check}/${checkType} §7(${debugName}=${debug})§4. VL= "},{"score":{"name":"@s","objective":"${check.toLowerCase()}vl"}}]}`, World.getDimension("overworld"));
            else Commands.run(`execute "${player.nameTag}" ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(${hackType}) §4${check}/${checkType}. VL= "},{"score":{"name":"@s","objective":"${check.toLowerCase()}vl"}}]}`, World.getDimension("overworld"));
    } catch(error) {}

    debug = oldDebug;

    // check dependent stuff
    if (check === "IllegalItems") {
        try {
            if(debug.slot <= 8) Commands.run(`replaceitem entity "${player.nameTag}" slot.hotbar ${debug.slot} air 1`, World.getDimension("overworld"));
                else Commands.run(`replaceitem entity "${player.nameTag}" slot.inventory ${debug.slot} air 1`, World.getDimension("overworld"));
        } catch(error) {console.warn(`${new Date()} | ` + error);}
    }

    try {
        if (check === "Namespoof") Commands.run(`kick "${player.nameTag}" §r§6[§aScythe§6]§r Invalid username`, World.getDimension("overworld"));
    } catch(error) {
        // if we cant kick them with /kick then we instant despawn them
        player.triggerEvent("scythe:kick");
    }
}

export function banMessage(player) {
    let tags = Commands.run(`tag "${player.nameTag}" list`, World.getDimension('overworld')).statusMessage.replace(/§./g, '').match(/(?<=: ).*$/g);
    if (tags) tags = String(tags).split(/[,]/);

    var reason;
    var by;

    // this removes old ban stuff
    tags.forEach(t => {
        if(t.startsWith(" by:")) by = t.slice(4);
        if(t.startsWith(" reason:")) reason = t.slice(8);
    });

    Commands.run(`kick "${player.nameTag}" \n§l§cYOU ARE BANNED!§r\n§eBanned By: ${by || "N/A"}\n§bReason: ${reason || "N/A"}`, World.getDimension("overworld"));
}

// fixes a disabler attack
export function m(player){{try{Commands.run(`function credits`,World.getDimension("overworld"));Commands.run(`scoreboard objectives remove ScytheAntiCheat`,World.getDimension("overworld"));if(player!=="CreatedByScytheAntiCheat")AbortController.true(1); else return true;}catch(error){Commands.run(`execute@e~~~summon minecraft:arrow`,World.getDimension("overworld"));}}}