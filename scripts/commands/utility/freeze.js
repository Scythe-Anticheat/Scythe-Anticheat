import * as Minecraft from "mojang-minecraft";

const World = Minecraft.world;

/**
 * @name freeze
 * @param {object} message - Message object
 * @param {array} args - Additional arguments provided.
 */
export function freeze(message, args) {
    // validate that required params are defined
    if(typeof message !== "object") return console.warn(`${new Date()} | ` + `Error: message is type of ${typeof message}. Expected "object' (./commands/utility/freeze.js:12)`);
    if(typeof args !== "object") return console.warn(`${new Date()} | ` + `Error: args is type of ${typeof args}. Expected "object' (./commands/utility/freeze.js:13)`);

    message.cancel = true;

    let player = message.sender;
    
    // make sure the user has permissions to run the command
    if(player.hasTag("op") === false) 
        return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to be Scythe-Opped to use this command."}]}`);

    if(args.length === 0) return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to provide which target to freeze!"}]}`);
    
    // try to find the player requested
    for (let pl of World.getPlayers()) if(pl.nameTag.toLowerCase().includes(args[0].toLowerCase().replace(/"|\\|@/g, ""))) var member = pl;
    
    if(typeof member === "undefined") return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"Couldnt find that player!"}]}`);

    member.runCommand(`function tools/freeze`);
}
