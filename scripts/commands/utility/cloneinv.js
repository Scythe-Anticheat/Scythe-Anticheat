import * as Minecraft from "@minecraft/server";
import { registerCommand } from "../handler.js";

const world = Minecraft.world;

registerCommand({
    name: "cloneinv",
    usage: "<player>",
    minArgCount: 1,
    execute: (message, args) => {
        const player = message.sender;
 
        // try to find the player requested
        let member;

        for (const pl of world.getPlayers()) if(pl.name.toLowerCase().includes(args[0].toLowerCase().replace(/"|\\|@/g, ""))) {
            member = pl;
            break;
        }
        
        if(!member) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

        const playerInv = player.getComponent('inventory').container;
        const memberInv = member.getComponent('inventory').container;

        for (let i = 0; i < memberInv.size; i++) {
            const item = memberInv.getItem(i);
            if(!item) {
                playerInv.setItem(i, undefined);
                continue;
            }

            playerInv.setItem(i, item);
        }

        player.sendMessage(`§r§6[§aScythe§6]§r You have cloned ${member.name}'s inventory.`);
    }
});