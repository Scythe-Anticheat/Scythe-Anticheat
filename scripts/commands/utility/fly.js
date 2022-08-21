/* eslint no-redeclare: "off"*/
import * as Minecraft from "mojang-minecraft";

const World = Minecraft.world;

/**
 * @name fly
 * @param {object} message - Message object
 * @param {array} args - (Optional) Additional arguments provided.
 */
export function fly(message, args) {
    // validate that required params are defined
    if(typeof message !== "object") return console.warn(`${new Date()} | ` + `Error: message is type of ${typeof message}. Expected "object' (./commands/utility/fly.js:12)`);

    message.cancel = true;

    let player = message.sender;

    // make sure the user has permissions to run the command
    if(player.hasTag("op") === false) 
        return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to be Scythe-Opped to use this command."}]}`);
    
    // try to find the player requested
    if(args.length) for (let pl of World.getPlayers())
        if(pl.nameTag.toLowerCase().includes(args[0].toLowerCase().replace(/"|\\|@/g, ""))) var member = pl; 
    
    if(typeof member === "undefined") var member = player;

    try {
        member.runCommand(`function tools/fly`);
    } catch (error) {
        if(JSON.parse(error).statusMessage === "Function tools/fly not found.")
            player.runCommand(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"For this command to function, please enable Education Edition in world settings."}]}`);

        console.warn(error);
        return;
    }
    
    if(member === player) player.runCommand(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.nameTag} has toggled fly mode for themselves."}]}`);
        else player.runCommand(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.nameTag} has toggled fly mode for ${member.nameTag}."}]}`);
}