import * as Minecraft from "@minecraft/server";

const World = Minecraft.world;

/**
 * @name ecwipe
 * @param {object} message - Message object
 * @param {array} args - Additional arguments provided.
 */
export function ecwipe(message, args) {
    // validate that required params are defined
    if(typeof message !== "object") throw TypeError(`message is type of ${typeof message}. Expected "object".`);
    if(typeof args !== "object") throw TypeError(`args is type of ${typeof args}. Expected "object".`);

    const player = message.sender;
    
    if(args.length === 0) return player.tell("§r§6[§aScythe§6]§r You need to provide whos ender chest inventory to wipe!");
    
    // try to find the player requested
    for (const pl of World.getPlayers()) if(pl.name.toLowerCase().includes(args[0].toLowerCase().replace(/"|\\|@/g, ""))) {
        var member = pl;
        break;
    }
    
    if(typeof member === "undefined") return player.tell("§r§6[§aScythe§6]§r Couldnt find that player!");

    member.runCommandAsync("function tools/ecwipe");
}
