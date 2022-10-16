import * as Minecraft from "mojang-minecraft";

const World = Minecraft.world;

// found the inventory viewing scipt in the bedrock addons discord, unsure of the original owner (not my code)
/**
 * @name invsee
 * @param {object} message - Message object
 * @param {array} args - Additional arguments provided.
 */
export function invsee(message, args) {
    // validate that required params are defined
    if(typeof message !== "object") throw TypeError(`message is type of ${typeof message}. Expected "object".`);

    const player = message.sender;

    if(args.length === 0) return player.tell("§r§6[§aScythe§6]§r You need to provide whos inventory to view!");
    
    // try to find the player requested
    for (const pl of World.getPlayers()) if(pl.name.toLowerCase().includes(args[0].toLowerCase().replace(/"|\\|@/g, ""))) {
        var member = pl;
        break;
    }
    
    if(typeof member === "undefined") return player.tell("§r§6[§aScythe§6]§r Couldnt find that player!");

    const container = member.getComponent('inventory').container;
    
    player.tell(`§r§6[§aScythe§6]§r ${member.nameTag}'s inventory:\n\n`);
    
    for (let i = 0; i < container.size; i++) {
        const item = container.getItem(i);
        if(typeof item === "undefined") continue;

        player.tell(`§r§6[§aScythe§6]§r Slot ${i}: ${item.id}:${item.data} x${item.amount}`);
    }
}
