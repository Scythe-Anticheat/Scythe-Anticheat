import data from "../../data/data.js";

/**
 * @name autoclicker
 * @param {object} message - Message object
 */
export function autoclicker(message) {
    // validate that required params are defined
    if(typeof message !== "object") return console.warn(`${new Date()} | ` + `Error: message is type of ${typeof message}. Expected "object' (./commands/settings/autoclicker.js:9)`);

    message.cancel = true;

    let player = message.sender;
    
    data.checkedModules.autoclicker = false;

    player.runCommand(`function settings/autoclicker`);
}
