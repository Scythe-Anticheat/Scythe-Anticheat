/**
 * @name credits
 * @param {object} message - Message object
 */
export function credits(message) {
    // validate that required params are defined
    if(typeof message !== "object") return console.warn(`${new Date()} | ` + `Error: message is type of ${typeof message}. Expected "object' (./commands/utility/credits.js:7)`);

    let player = message.sender;

    player.runCommand("function credits");
}
