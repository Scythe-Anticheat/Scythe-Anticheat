import * as Minecraft from "mojang-minecraft";

const World = Minecraft.world;

/**
 * @name report
 * @param {object} message - Message object
 * @param {array} args - Additional arguments provided.
 */
export function report(message, args) {
    // validate that required params are defined
    if (!message) return console.warn(`${new Date()} | ` + "Error: ${message} isnt defined. Did you forget to pass it? ./commands/moderation/ban.js:12)");
    if (!args) return console.warn(`${new Date()} | ` + "Error: ${args} isnt defined. Did you forget to pass it? (./commands/moderation/ban.js:13)");

    message.cancel = true;

    let player = message.sender;
    let reason = args.slice(1).join(" ") || "No reason specified";

    if (!args.length) return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to provide who to report!"}]}`);
    
    // try to find the player requested
    for (let pl of World.getPlayers()) if (pl.nameTag.toLowerCase().includes(args[0].toLowerCase().replace(/"|\\|@/g, ""))) var member = pl; 

    if (!member) return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"Couldnt find that player!"}]}`);

    // make sure they dont report themselves
    if (member.nameTag === player.nameTag) return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You cannot report yourself."}]}`);

    // prevent report spam
    if(!player.reports) player.reports = [];
    if(player.reports.includes(member.nameTag)) return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You have already reported this player!"}]}`);
    player.reports.push(member.nameTag);

    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You have reported ${member.nameTag} for: ${reason}."}]}`);

    return player.runCommand(`tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.nameTag} has reported ${member.nameTag} for: ${reason}"}]}`);
}
