// import * as Minecraft from "mojang-minecraft";

// const World = Minecraft.world;

/**
 * @name removecommandblocks
 * @param {object} message - Message object
 */
export function removecommandblocks(message) {
    // validate that required params are defined
    if (!message) return console.warn(`${new Date()} | ` + "Error: ${message} isnt defined. Did you forget to pass it? (./commands/settings/removeCommandBlocks.js:11)");

    message.cancel = true;

    let player = message.sender;
    
    // make sure the user has permissions to run the command
    if(!player.hasTag("op")) 
        return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to be Scythe-Opped to use this command."}]}`);

    return player.runCommand(`function settings/removeCommandBlocks`);
}
