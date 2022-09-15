/**
 * @name overidecommandblocksenabled
 * @param {object} message - Message object
 */
export function overidecommandblocksenabled(message) {
    // validate that required params are defined
    if(typeof message !== "object") return console.warn(`${new Date()} | ` + `Error: message is type of ${typeof message}. Expected "object' (./commands/settings/overideCommandBlocksEnabled.js:7)`);

    message.cancel = true;

    let player = message.sender;

    player.runCommand("function settings/overideCommandBlocksEnabled");
}
