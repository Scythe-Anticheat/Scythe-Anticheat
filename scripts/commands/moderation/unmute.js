import * as Minecraft from "mojang-minecraft";

const World = Minecraft.world;

/**
 * @name unmute
 * @param {object} message - Message object
 * @param {array} args - Additional arguments provided.
 */
export function unmute(message, args) {
    // validate that required params are defined
    if (!message) return console.warn(`${new Date()} | ` + "Error: ${message} isnt defined. Did you forget to pass it? ./commands/moderation/unmute.js:12)");
    if (!args) return console.warn(`${new Date()} | ` + "Error: ${args} isnt defined. Did you forget to pass it? (./commands/moderation/unmute.js:13)");

    message.cancel = true;

    let player = message.sender;
    let reason = args.slice(1).join(" ") || "No reason specified";

    // make sure the user has permissions to run the command
    if(!player.hasTag("op")) 
        return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to be Scythe-Opped to use this command."}]}`);

    if (!args.length) return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to provide who to mute!"}]}`);
    
    // try to find the player requested
    for (let pl of World.getPlayers()) if (pl.nameTag.toLowerCase().includes(args[0].toLowerCase().replace(/"|\\|@/g, ""))) var member = pl.nameTag; 
    
    if (!member) return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"Couldnt find that player!"}]}`);

    try {
        player.runCommand(`ability "${member}" mute false`);
        player.runCommand(`tellraw "${member}" {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You have been unmuted."}]}`);
    } catch (error) {
        console.warn(`${new Date()} | ` + error);
        return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"I was unable to unmute that player! You most likely dont have education edition enabled."}]}`);
    }
    return player.runCommand(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.nameTag} has unmuted ${member}. Reason: ${reason}"}]}`);
}
