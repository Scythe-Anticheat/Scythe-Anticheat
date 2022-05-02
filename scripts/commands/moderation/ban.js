import * as Minecraft from "mojang-minecraft";
import { parseTime } from "../../util.js";

const World = Minecraft.world;

/**
 * @name ban
 * @param {object} message - Message object
 * @param {array} args - Additional arguments provided.
 */
export function ban(message, args) {
    // validate that required params are defined
    if (!message) return console.warn(`${new Date()} | ` + "Error: ${message} isnt defined. Did you forget to pass it? ./commands/moderation/ban.js:12)");
    if (!args) return console.warn(`${new Date()} | ` + "Error: ${args} isnt defined. Did you forget to pass it? (./commands/moderation/ban.js:13)");

    message.cancel = true;

    let player = message.sender;
    let time = parseTime(args[1]);

    if(time) args.splice(1, 1);

    let reason = args.slice(1).join(" ") || "No reason specified";

    // make sure the user has permissions to run the command
    if(!player.hasTag("op")) 
        return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to be Scythe-Opped to use this command."}]}`);

    if (!args.length) return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to provide who to ban!"}]}`);
    
    // try to find the player requested
    for (let pl of World.getPlayers()) if (pl.nameTag.toLowerCase().includes(args[0].toLowerCase().replace(/"|\\|@/g, ""))) var member = pl; 

    if (!member) return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"Couldnt find that player!"}]}`);

    // make sure they dont ban themselves
    if (member.nameTag === player.nameTag) return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You cannot ban yourself."}]}`);

    // cannot ban staff members
    if(member.hasTag("op")) return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You cannot ban other staff members!."}]}`);

    // this removes old ban stuff
    member.getTags().forEach(t => {
        t = t.replace(/"/g, "");
        if(t.startsWith("reason:")) member.removeTag(t);
        if(t.startsWith("by:")) member.removeTag(t);
        if(t.startsWith("time:")) member.removeTag(t);
    });

    member.addTag(`reason:${reason}`);
    member.addTag(`by:${player.nameTag}`);
    if(time) member.addTag(`time:${new Date().getTime() + time}`);
    member.addTag(`isBanned`);

    return player.runCommand(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.nameTag} has banned ${member.nameTag}. Reason: ${reason}"}]}`);
}