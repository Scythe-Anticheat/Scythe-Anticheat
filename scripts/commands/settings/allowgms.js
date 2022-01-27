import * as Minecraft from "mojang-minecraft";

const World = Minecraft.world;
const Commands = Minecraft.Commands;

/**
 * @name allowgms
 * @param {object} message - Message object
 */
export function allowgms(message) {
    // validate that required params are defined
    if (!message) return console.warn(`${new Date()} | ` + "Error: ${message} isnt defined. Did you forget to pass it? (./commands/settings/allowGMS.js:12)");

    message.cancel = true;

    let player = message.sender;
    
    // make sure the user has permissions to run the command
    try {
        Commands.run(`testfor @a[name="${player.nameTag}",tag=op]`, World.getDimension("overworld"));
    } catch (error) {
        return Commands.run(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to be Scythe-Opped to use this command."}]}`, World.getDimension("overworld"));
    }

    return Commands.run(`execute "${player.nameTag}" ~~~ function settings/allowGMS`, World.getDimension("overworld"));
}
