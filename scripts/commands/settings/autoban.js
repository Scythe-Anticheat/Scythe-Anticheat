/**
 * @name autoban
 * @param {object} message - Message object
 */
 export function autoban(message) {
    // validate that required params are defined
    if(typeof message !== "object") return console.warn(`${new Date()} | ` + `Error: message is type of ${typeof message}. Expected "object' (./commands/settings/autoban.js:7)`);

    let player = message.sender;
    
    player.runCommand("function settings/autoban");
}
