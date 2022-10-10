/**
 * @name modules
 * @param {object} message - Message object
 */
export function modules(message) {
    // validate that required params are defined
    if(typeof message !== "object") throw TypeError(`message is type of ${typeof message}. Expected "object".`);

    const player = message.sender;
    
    player.runCommand("function settings/modules");
}
