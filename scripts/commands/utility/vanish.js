/**
 * @name vanish
 * @param {object} message - Message object
 */
export function vanish(message) {
    // validate that required params are defined
    if(typeof message !== "object") return console.warn(`${new Date()} | ` + `Error: message is type of ${typeof message}. Expected "object' (./commands/utility/vanish.js:7)`);

    let player = message.sender;
    
    try {
        player.runCommand("function tools/vanish");
    } catch (error) {
        if(JSON.parse(error).statusMessage === "Function tools/vanish not found.")
            player.tell("§r§6[§aScythe§6]§r For this command to function, please enable Spectator Mode in world settings.");

        console.warn(error);
        return;
    }
}
