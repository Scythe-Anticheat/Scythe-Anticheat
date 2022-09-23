/**
 * @name autoban
 * @param {object} message - Message object
 */
 export function autoban(message) {
    // validate that required params are defined
    if(typeof message !== "object") throw TypeError(`message is type of ${typeof message}. Expected "object".`);

    let player = message.sender;
    
    player.runCommand("function settings/autoban");
}
