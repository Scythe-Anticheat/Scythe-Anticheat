import * as Minecraft from "mojang-minecraft";

const World = Minecraft.world;

/**
 * @name ecwipe
 * @param {object} message - Message object
 * @param {array} args - Additional arguments provided.
 */
export function ecwipe(message, args) {
    // validate that required params are defined
    if(typeof message !== "object") return console.warn(`${new Date()} | ` + `Error: message is type of ${typeof message}. Expected "object' (./commands/utility/ecwipe.js:12)`);
    if(typeof args !== "object") return console.warn(`${new Date()} | ` + `Error: args is type of ${typeof args}. Expected "object' (./commands/utility/ecwipe.js:13)`);

    message.cancel = true;

    let player = message.sender;
    
    if(args.length === 0) return player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to provide whos ender chest inventory to wipe!"}]}`);
    
    // try to find the player requested
    for (let pl of World.getPlayers()) if(pl.nameTag.toLowerCase().includes(args[0].toLowerCase().replace(/"|\\|@/g, ""))) var member = pl;
    
    if(typeof member === "undefined") return player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"Couldnt find that player!"}]}`);

    member.runCommand(`function tools/ecwipe`);
}
