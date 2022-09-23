/**
 * @name fullreport
 * @param {object} message - Message object
 */
export function fullreport(message) {
    // validate that required params are defined
    if(typeof message !== "object") throw TypeError(`message is type of ${typeof message}. Expected "object".`);

    let player = message.sender;
    
    player.runCommand(`execute @a ~~~ function tools/stats`);
}
