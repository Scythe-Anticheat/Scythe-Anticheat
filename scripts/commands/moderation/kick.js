import * as Minecraft from "mojang-minecraft";

const World = Minecraft.world;

/**
 * @name kick
 * @param {object} message - Message object
 * @param {array} args - Additional arguments provided.
 */
export function kick(message, args) {
    // validate that required params are defined
    if (!message) return console.warn(`${new Date()} | ` + "Error: ${message} isnt defined. Did you forget to pass it? (./commands/moderation/kick.js:12)");
    if (!args) return console.warn(`${new Date()} | ` + "Error: ${args} isnt defined. Did you forget to pass it? (./commands/moderation/kick.js:13)");

    message.cancel = true;

    if (args[1] === "-s") var isSilent = true;
        else isSilent = false;

    let player = message.sender;
    let reason = args.slice(1).join(" ").replace("-s", "").replace(/"|\\/g, "") || "No reason specified";

    // make sure the user has permissions to run the command
    if(!player.hasTag("op")) 
        return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to be Scythe-Opped to use this command."}]}`);

    if (!args.length) return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to provide who to kick!"}]}`);
	
    // try to find the player requested
    for (let pl of World.getPlayers()) if (pl.nameTag.toLowerCase().includes(args[0].toLowerCase().replace(/"|\\|@/g, ""))) var member = pl;

    if (!member) return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"Couldnt find that player!"}]}`);

    // make sure they dont kick themselves
    if (member.name === player.name) return player.runCommand(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You cannot kick yourself."}]}`);

    try {
        if (!isSilent) player.runCommand(`kick "${member.name}" ${reason}`);
            else member.runCommand(`event entity @s scythe:kick`);
    } catch (error) {
        console.warn(`${new Date()} | ` + error);
        return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"I was unable to ban that player! Error: ${error}.replace(/"|\\/g, "")"}]}`);
    }
    return player.runCommand(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.nameTag} has kicked ${member.name} (Silent:${isSilent}). Reason: ${reason}"}]}`);
}
