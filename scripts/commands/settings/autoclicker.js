import data from "../../data/data.js";

/**
 * @name autoclicker
 * @param {object} message - Message object
 */
export function autoclicker(message) {
    // validate that required params are defined
    if(typeof message !== "object") throw TypeError(`message is type of ${typeof message}. Expected "object".`);

    const player = message.sender;
    
    data.checkedModules.autoclicker = false;

    player.runCommand("function settings/autoclicker");
}
