/**
 * @name fullreport
 * @param {object} message - Message object
 */
export function fullreport(message) {
    // validate that required params are defined
    if(typeof message !== "object") return console.warn(`${new Date()} | ` + `Error: message is type of ${typeof message}. Expected "object' (./commands/utility/fullreport.js:12)`);

    let player = message.sender;
    
    player.runCommand(`execute @a ~~~ function tools/stats`);
}
