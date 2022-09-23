import * as Minecraft from "mojang-minecraft";

const World = Minecraft.world;

/**
 * @name unmute
 * @param {object} message - Message object
 * @param {array} args - Additional arguments provided.
 */
export function unmute(message, args) {
    // validate that required params are defined
    if(typeof message !== "object") return console.warn(`${new Date()} | ` + `Error: message is type of ${typeof message}. Expected "object' (./commands/moderation/unmute.js:12)`);
    if(typeof args !== "object") return console.warn(`${new Date()} | ` + `Error: args is type of ${typeof args}. Expected "object' (./commands/moderation/unmute.js:13)`);

    let player = message.sender;

    if(args.length === 0) return player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to provide who to mute!"}]}`);

    let reason = args.slice(1).join(" ").replace(/"|\\/g, "") || "No reason specified";
    
    // try to find the player requested
    for (let pl of World.getPlayers()) if(pl.nameTag.toLowerCase().includes(args[0].toLowerCase().replace(/"|\\|@/g, ""))) var member = pl; 
    
    if(typeof member === "undefined") return player.tell("§r§6[§aScythe§6]§r Couldnt find that player!");

    try {
        member.removeTag("isMuted");
        member.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You have been unmuted."}]}`);
    
        // add chat ability
        member.runCommandAsync("ability @s mute false");
    } catch (error) {
        console.warn(`${new Date()} | ` + error);
        return player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"I was unable to unmute that player."}]}`);
    }
    player.runCommand(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.nameTag} has unmuted ${member.nameTag}. Reason: ${reason}"}]}`);
}
