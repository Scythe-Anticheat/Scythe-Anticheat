import * as Minecraft from "@minecraft/server";
import config from "../../data/config.js";
import { registerCommand } from "../handler.js";

const world = Minecraft.world;

// found the inventory viewing scipt in the bedrock addons discord, unsure of the original owner (not my code)
registerCommand({
    name: "invsee",
    execute: (message, args) => {
        const player = message.sender;

        // try to find the player requested
        let member;

        for (const pl of world.getPlayers()) if(pl.name.toLowerCase().includes(args[0].toLowerCase().replace(/"|\\|@/g, ""))) {
            member = pl;
            break;
        }
        
        if(!member) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

        const container = member.getComponent('inventory').container;
    
        if(container.emptySlotsCount === 36) {
            return player.sendMessage(`§r§6[§aScythe§6]§r ${member.nameTag}'s inventory is empty.`);
        }

        let inventory = `§r§6[§aScythe§6]§r ${member.nameTag}'s inventory:\n\n`;
        
        for (let i = 0; i < 36; i++) {
            const item = container.getItem(i);
            if(!item) continue;

            inventory += `§r§6[§aScythe§6]§r Slot ${i}: ${item.typeId} x${item.amount}\n`;

            if(config.customcommands.invsee.show_enchantments) {
                const loopIterator = (iterator) => {
                    const iteratorResult = iterator.next();
                    if(iteratorResult.done) return;
                    const enchantData = iteratorResult.value;

                    let enchantmentName = enchantData.type.id;
                    enchantmentName = enchantmentName[0].toUpperCase() + enchantmentName.slice(1);

                    inventory += `    | ${enchantmentName} ${enchantData.level}\n`;

                    loopIterator(iterator);
                };
                loopIterator(item.getComponent("enchantments").enchantments[Symbol.iterator]());
            }
        }

        player.sendMessage(inventory);
    }
});