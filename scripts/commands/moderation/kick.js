import * as Minecraft from "mojang-minecraft";

const World = Minecraft.world;

/**
 * @name kick
 * @param {object} message - Message object
 * @param {array} args - Additional arguments provided.
 */
export function kick(message, args) {
    // validate that required params are defined
    if(typeof message !== "object") return console.warn(`${new Date()} | ` + `Error: message is type of ${typeof message}. Expected "object' (./commands/moderation/kick.js:12)`);
    if(typeof args !== "object") return console.warn(`${new Date()} | ` + `Error: args is type of ${typeof args}. Expected "object' (./commands/moderation/kick.js:13)`);

    message.cancel = true;

    let player = message.sender;

    if(args.length === 0) return player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to provide who to kick!"}]}`);

    let isSilent = false;

    if(args[1] === "-s") isSilent = true;

    let reason = args.slice(1).join(" ").replace("-s", "").replace(/"|\\/g, "") || "No reason specified";
	
    // try to find the player requested
    for (let pl of World.getPlayers()) if(pl.nameTag.toLowerCase().includes(args[0].toLowerCase().replace(/"|\\|@/g, ""))) var member = pl;

    if(typeof member === "undefined") return player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"Couldnt find that player!"}]}`);

    // make sure they dont kick themselves
    if(member.name === player.name) return player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You cannot kick yourself."}]}`);

    try {
        if(isSilent === false) player.runCommand(`kick "${member.name}" ${reason}`);
            else member.runCommand(`event entity @s scythe:kick`);
    } catch (error) {
        console.warn(`${new Date()} | ` + error);
        return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"I was unable to ban that player! Error: ${error}.replace(/"|\\/g, "")"}]}`);
    }
    player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.nameTag} has kicked ${member.name} (Silent:${isSilent}). Reason: ${reason}"}]}`);
}
