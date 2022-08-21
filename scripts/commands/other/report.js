import * as Minecraft from "mojang-minecraft";

const World = Minecraft.world;

/**
 * @name report
 * @param {object} message - Message object
 * @param {array} args - Additional arguments provided.
 */
export function report(message, args) {
    // validate that required params are defined
    if(typeof message !== "object") return console.warn(`${new Date()} | ` + `Error: message is type of ${typeof message}. Expected "object' (./commands/utility/report.js:12)`);
    if(typeof args !== "object") return console.warn(`${new Date()} | ` + `Error: args is type of ${typeof args}. Expected "object' (./commands/utility/report.js:13)`);

    message.cancel = true;

    let player = message.sender;
    let reason = args.slice(1).join(" ") || "No reason specified";

    if(args.length === 0) return player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to provide who to report!"}]}`);
    
    // try to find the player requested
    for (let pl of World.getPlayers()) if(pl.nameTag.toLowerCase().includes(args[0].toLowerCase().replace(/"|\\|@/g, ""))) var member = pl; 

    if(typeof member === "undefined") return player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"Couldnt find that player!"}]}`);

    // make sure they dont report themselves
    if(member.nameTag === player.nameTag) return player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You cannot report yourself."}]}`);

    // prevent report spam
    if(typeof player.reports !== "object") player.reports = [];
    if(player.reports.includes(member.nameTag) === true) return player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You have already reported this player!"}]}`);
    player.reports.push(member.nameTag);

    player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You have reported ${member.nameTag} for: ${reason}."}]}`);

    player.runCommandAsync(`tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.nameTag} has reported ${member.nameTag} for: ${reason}"}]}`);
}
