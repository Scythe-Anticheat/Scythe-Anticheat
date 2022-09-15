/**
 * @name notify
 * @param {object} message - Message object
 */
export function notify(message) {
    // validate that required params are defined
    if(typeof message !== "object") return console.warn(`${new Date()} | ` + `Error: message is type of ${typeof message}. Expected "object' (./commands/utility/notify.js:12)`);

    message.cancel = true;

    let player = message.sender;
    
    player.runCommand("function notify");
}
