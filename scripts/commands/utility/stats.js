import * as Minecraft from "mojang-minecraft";

const World = Minecraft.world;

/**
 * @name stats
 * @param {object} message - Message object
 * @param {array} args - Additional arguments provided.
 */
export function stats(message, args) {
    // validate that required params are defined
    if(typeof message !== "object") return console.warn(`${new Date()} | ` + `Error: message is type of ${typeof message}. Expected "object' (./commands/utility/stats.js:12)`);
    if(typeof args !== "object") return console.warn(`${new Date()} | ` + `Error: args is type of ${typeof args}. Expected "object' (./commands/utility/stats.js:13)`);
    
    message.cancel = true;

    let player = message.sender;
    
    if(args.length === 0) player.runCommand(`function tools/stats`);
    
    // try to find the player requested
    for (let pl of World.getPlayers()) if(pl.nameTag.toLowerCase().includes(args[0].toLowerCase().replace(/"|\\|@/g, ""))) var member = pl; 
    
    if(typeof member === "undefined") return player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"Couldnt find that player!"}]}`);

    member.runCommand(`function tools/stats`);
}
