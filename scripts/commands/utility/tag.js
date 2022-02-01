// import * as Minecraft from "mojang-minecraft";

// const World = Minecraft.world;

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
    if(!player.hasTag("op")) 
        return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to be Scythe-Opped to use this command."}]}`);

    // check if array contains the string 'reset'
    let argcheck = args.includes('reset');

    // reset user nametag
    if (argcheck) {
        player.nameTag = player.name;
        return player.runCommand(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.name} has reset their nametag"}]}`);
    }

    let nametag = `§8[§r${args.join(" ")}§8]§r ${player.name}`;
    
    // input sanitization
    nametag = nametag.replace("\\", "").replace("\"", "");

    if (!args.length) return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to provide a tag!"}]}`);

    player.nameTag = nametag;

    return player.runCommand(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.name} has changed their nametag to ${nametag}"}]}`);
}
