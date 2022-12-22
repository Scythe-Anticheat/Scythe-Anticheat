import * as Minecraft from "@minecraft/server";

const World = Minecraft.world;

/**
 * @name cloneinv
 * @param {object} message - Message object
 * @param {array} args - Additional arguments provided.
 */
export function cloneinv(message, args) {
    // validate that required params are defined
    if(typeof message !== "object") throw TypeError(`message is type of ${typeof message}. Expected "object".`);

    const player = message.sender;

    if(args.length === 0) return player.tell("§r§6[§aScythe§6]§r You need to provide whos inventory to view.");
    
    // try to find the player requested
    for (const pl of World.getPlayers()) if(pl.name.toLowerCase().includes(args[0].toLowerCase().replace(/"|\\|@/g, ""))) {
        var member = pl;
        break;
    }
    
    if(typeof member === "undefined") return player.tell("§r§6[§aScythe§6]§r Couldn't find that player.");

    const playerInv = player.getComponent('inventory').container;
    const memberInv = member.getComponent('inventory').container;

    for(let i = 0; i < memberInv.size; i++) {
        const item = memberInv.getItem(i);
        if(typeof item === "undefined") {
            playerInv.setItem(i, new Minecraft.ItemStack(Minecraft.MinecraftItemTypes.dirt, 0, 0));
            continue;
        }

        playerInv.setItem(i, item);
    }

    player.tell(`§r§6[§aScythe§6]§r You have cloned ${member.name}'s inventory.`);
}
