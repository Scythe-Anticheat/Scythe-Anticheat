import * as Minecraft from "mojang-minecraft";

const World = Minecraft.World;
const Commands = Minecraft.Commands;

/**
 * @name tag
 * @param {object} message - Message object
 * @param {array} args - Additional arguments provided.
 */
export function tag(message, args) {
    // validate that required params are defined
    if (!message) return console.warn(`${new Date()} | ` + "Error: ${message} isnt defined. Did you forget to pass it? (./utility/tag.js:8)");
    if (!args) return console.warn(`${new Date()} | ` + "Error: ${args} isnt defined. Did you forget to pass it? (./utility/tag.js:9)");

    message.cancel = true;

    let player = message.sender;

    // fixes a bug with this command not working if the nametag had invalid characters
    player.nameTag = player.name;

    // make sure the user has permissions to run the command
    try {
        Commands.run(`execute @a[name="${player.nameTag}",tag=op] ~~~ list`, World.getDimension("overworld"));
    } catch (error) {
        return Commands.run(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to be Scythe-Opped to use this command."}]}`, World.getDimension("overworld"));
    }

    // check if array contains the string 'reset'
    let argcheck = args.includes('reset');

    // reset user nametag
    if (argcheck === true) {
        player.nameTag = player.name;
        return Commands.run(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.name} has reset their nametag"}]}`, World.getDimension("overworld"));
    }

    let nametag = `§8[§r${args.join(" ")}§8]§r ${player.name}`;
    
    // input sanitization
    nametag = nametag.replace("\\", "").replace("\"", "");

    if (!args.length) return Commands.run(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to provide a tag!"}]}`, World.getDimension("overworld"));

    player.nameTag = nametag;

    return Commands.run(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.name} has changed their nametag to ${nametag}"}]}`, World.getDimension("overworld"));
}
