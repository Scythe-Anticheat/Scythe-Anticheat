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
    if(typeof message !== "object") return console.warn(`${new Date()} | ` + `Error: message is type of ${typeof message}. Expected "object' (./commands/moderation/ban.js:13)`);
    if(typeof args !== "object") return console.warn(`${new Date()} | ` + `Error: args is type of ${typeof args}. Expected "object' (./commands/moderation/ban.js:14)`);

    message.cancel = true;

    let player = message.sender;

    // make sure the user has permissions to run the command
    if(player.hasTag("op") === false) 
        return player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to be Scythe-Opped to use this command."}]}`);

    if(args.length === 0) return player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to provide who to ban!"}]}`);

    let time;
    if(typeof args[1] === "string") time = parseTime(args[1]);

    if(typeof time !== "undefined") args.splice(1, 1);

    let reason = args.slice(1).join(" ").replace(/"|\\/g, "") || "No reason specified";
    
    // try to find the player requested
    for (let pl of World.getPlayers()) if(pl.nameTag.toLowerCase().includes(args[0].toLowerCase().replace(/"|\\|@/g, ""))) var member = pl; 

    if(typeof member === "undefined") return player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"Couldnt find that player!"}]}`);

    // make sure they dont ban themselves
    if(member.nameTag === player.nameTag) return player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You cannot ban yourself."}]}`);

    // cannot ban staff members
    if(member.hasTag("op") === true) return player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You cannot ban other staff members!."}]}`);

    // this removes old ban stuff
    member.getTags().forEach(t => {
        t = t.replace(/"/g, "");
        if(t.startsWith("reason:")) member.removeTag(t);
            else if(t.startsWith("by:")) member.removeTag(t);
            else if(t.startsWith("time:")) member.removeTag(t);
    });

    member.addTag(`reason:${reason}`);
    member.addTag(`by:${player.nameTag}`);
    if(typeof time !== "undefined") member.addTag(`time:${Date.now() + time}`);
    member.addTag(`isBanned`);

    player.runCommand(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.nameTag} has banned ${member.nameTag}. Reason: ${reason}"}]}`);
}