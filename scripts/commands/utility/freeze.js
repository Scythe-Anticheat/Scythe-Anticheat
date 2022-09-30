import * as Minecraft from "mojang-minecraft";

const World = Minecraft.world;

/**
 * @name freeze
 * @param {object} message - Message object
 * @param {array} args - Additional arguments provided.
 */
export function freeze(message, args) {
    // validate that required params are defined
    if(typeof message !== "object") throw TypeError(`message is type of ${typeof message}. Expected "object".`);
    if(typeof args !== "object") throw TypeError(`args is type of ${typeof args}. Expected "object".`);

    let player = message.sender;
    
    if(args.length === 0) return player.tell("§r§6[§aScythe§6]§r You need to provide which target to freeze!");
    
    // try to find the player requested
    for (let pl of World.getPlayers()) if(pl.nameTag.toLowerCase().includes(args[0].toLowerCase().replace(/"|\\|@/g, ""))) var member = pl;
    
    if(typeof member === "undefined") return player.tell("§r§6[§aScythe§6]§r Couldnt find that player!");

    member.runCommand("function tools/freeze");
}
