import data from "../../data/data.js";

/**
 * @name autoclicker
 * @param {object} message - Message object
 */
export function autoclicker(message) {
    // validate that required params are defined
    if (!message) return console.warn(`${new Date()} | ` + "Error: ${message} isnt defined. Did you forget to pass it? (./commands/settings/autoclicker.js:11)");

    message.cancel = true;

    let player = message.sender;
    
    // make sure the user has permissions to run the command
    if(!player.hasTag("op")) 
        return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to be Scythe-Opped to use this command."}]}`);

    data.checkedModules.autoclicker = false;

    return player.runCommand(`function settings/autoclicker`);
}
