/**
 * @name fullreport
 * @param {object} message - Message object
 */
export function fullreport(message) {
    // validate that required params are defined
    if(typeof message !== "object") return console.warn(`${new Date()} | ` + `Error: message is type of ${typeof message}. Expected "object' (./commands/utility/fullreport.js:12)`);
    
    message.cancel = true;

    let player = message.sender;
    
    // make sure the user has permissions to run the command
    if(player.hasTag("op") === false) 
        return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to be Scythe-Opped to use this command."}]}`);

    player.runCommand(`execute @a ~~~ function tools/stats`);
}
