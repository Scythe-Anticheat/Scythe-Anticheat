import * as Minecraft from "@minecraft/server";

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

    const player = message.sender;
    
    if(!args.length) return player.tell("§r§6[§aScythe§6]§r You need to provide which target to freeze!");
    
    // try to find the player requested
    let member;

    for (const pl of World.getPlayers()) if(pl.name.toLowerCase().includes(args[0].toLowerCase().replace(/"|\\|@/g, ""))) {
        member = pl;
        break;
    }
    
    if(!member) return player.tell("§r§6[§aScythe§6]§r Couldn't find that player.");

    member.runCommandAsync("function tools/freeze");
}
