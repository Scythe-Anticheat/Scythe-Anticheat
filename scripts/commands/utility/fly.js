/* eslint no-var: "off"*/
/* eslint no-redeclare: "off"*/
import * as Minecraft from "mojang-minecraft";

const World = Minecraft.world;


/**
 * @name fly
 * @param {object} message - Message object
 * @param {array} args - (Optional) Additional arguments provided.
 */
export function fly(message, args) {
    // validate that required params are defined
    if (!message) return console.warn(`${new Date()} | ` + "Error: ${message} isnt defined. Did you forget to pass it? (./commands/utility/fly.js:10)");

    message.cancel = true;

    let player = message.sender;

    // make sure the user has permissions to run the command
    if(!player.hasTag("op")) 
        return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to be Scythe-Opped to use this command."}]}`);
    
    // try to find the player requested
    if(args.length) for (let pl of World.getPlayers()) if (pl.nameTag.toLowerCase().includes(args[0].toLowerCase().replace("@", "").replace("\"", ""))) var member = pl.nameTag; 
    
    if (!member) var member = player.nameTag;

    player.runCommand(`execute "${member}" ~~~ function tools/fly`);
    
    // I find try/catch to be completely unorthodox for this lol
    try {
        player.runCommand(`testfor @s[tag=flying]`);
        if (player.nameTag === member) {
            return player.runCommand(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.nameTag} has enabled fly mode for themselves."}]}`);
        } else if (player.nameTag != member) {
            return player.runCommand(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.nameTag} has enabled fly mode for ${member}."}]}`);
        } else {
            return;
        }
    } catch {
        if (player.nameTag === member) {
            return player.runCommand(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.nameTag} has disabled fly mode for themselves."}]}`);
        } else if (player.nameTag != member) {
            return player.runCommand(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.nameTag} has disabled fly mode for ${member}."}]}`);
        } else {
            return;
        }
    }
}
