/* eslint no-redeclare: "off"*/
import * as Minecraft from "@minecraft/server";

const World = Minecraft.world;

/**
 * @name fly
 * @param {object} message - Message object
 * @param {array} args - (Optional) Additional arguments provided.
 */
export function fly(message, args) {
    // validate that required params are defined
    if(typeof message !== "object") throw TypeError(`message is type of ${typeof message}. Expected "object".`);

    const player = message.sender;
    let member;
    
    // try to find the player requested
    if(args.length) for (const pl of World.getPlayers()) if(pl.name.toLowerCase().includes(args[0].toLowerCase().replace(/"|\\|@/g, ""))) {
        member = pl; 
        break;
    }
    
    if(typeof member === "undefined") member = player;

    try {
        member.runCommand("testfor @s[m=!c]");
    } catch {
        player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"No need! This player is in creative which allows flying by default."}]}`);
        return;
    }

    try {
        member.runCommand(`function tools/fly`);
    } catch (error) {
        if(JSON.parse(error).statusMessage === "Function tools/fly not found.") {
            player.tell("§r§6[§aScythe§6]§r For this command to function, please enable Education Edition in world settings.");
            return;
        } else throw Error(error);
    }
    
    if(member === player) player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.nameTag} has toggled fly mode for themselves."}]}`);
        else player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.nameTag} has toggled fly mode for ${member.nameTag}."}]}`);
}