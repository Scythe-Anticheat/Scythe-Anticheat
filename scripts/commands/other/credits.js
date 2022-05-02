/**
 * @name credits
 * @param {object} message - Message object
 */
export function credits(message) {
    // validate that required params are defined
    if (!message) return console.warn(`${new Date()} | ` + "Error: ${message} isnt defined. Did you forget to pass it? (./commands/moderation/credits.js:7)");

    message.cancel = true;

    let player = message.sender;

    return player.runCommand(`function credits`);
}
