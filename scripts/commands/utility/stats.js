/* eslint no-var: "off"*/
import * as Minecraft from "mojang-minecraft";

const World = Minecraft.World;
const Commands = Minecraft.Commands;

/**
 * @name stats
 * @param {object} message - Message object
 * @param {array} args - Additional arguments provided.
 */
export function stats(message, args) {
    // validate that required params are defined
    if (!message) return console.warn(`${new Date()} | ` + "Error: ${message} isnt defined. Did you forget to pass it? (./commands/utility/stats.js:14)");

    message.cancel = true;

    let player = message.sender;
    
    // make sure the user has permissions to run the command
    try {
        Commands.run(`testfor @a[name="${player.nameTag}",tag=op]`, World.getDimension("overworld"));
    } catch (error) {
        return Commands.run(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to be Scythe-Opped to use this command."}]}`, World.getDimension("overworld"));
    }

    if (!args.length) return Commands.run(`execute "${player.nameTag}" ~~~ function tools/stats`, World.getDimension("overworld"));
    
    // try to find the player requested
    for (let pl of World.getPlayers()) if (pl.nameTag.toLowerCase().includes(args[0].toLowerCase())) var member = pl; 
    
    if (!member) return Commands.run(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"Couldnt find that player!"}]}`, World.getDimension("overworld"));

    return Commands.run(`execute "${member.nameTag}" ~~~ function tools/stats`, World.getDimension("overworld"));
}
