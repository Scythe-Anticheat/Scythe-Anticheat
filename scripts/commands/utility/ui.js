import * as Minecraft from "@minecraft/server";
import config from "../../data/config.js";
import { registerCommand } from "../handler.js";

registerCommand({
    name: "ui",
    execute: (message) => {
        const player = message.sender;

        // Get the player's inventory component
        const container = player.getComponent("inventory").container;

        if(container.emptySlotsCount === 0) {
            return player.sendMessage("§r§6[§aScythe§6]§r Your inventory is full! Try removing some items and try again.");
        }

        // Make sure they don't have the UI item in their current slot
        const currentItem = container.getItem(player.selectedSlot);

        if(currentItem?.typeId === config.customcommands.ui.ui_item && currentItem?.nameTag === config.customcommands.ui.ui_item_name)
            return player.sendMessage("§r§6[§aScythe§6]§r You already have the UI item in your inventory.");

        // Create the item that opens the UI
        let itemType = Minecraft.ItemTypes.get(config.customcommands.ui.ui_item);
        let didError = false;

        if(!itemType) {
            console.error(`Unable to create item type, most likely the item name is invalid. Defaulted to using wooden axe.`);

            didError = true;
            itemType = Minecraft.ItemTypes.get("minecraft:wooden_axe");
        }

        const item = new Minecraft.ItemStack(itemType, 1);

        item.nameTag = config.customcommands.ui.ui_item_name;

        // Enchant the item with Unbreaking 3
        const enchantments = item.getComponent("enchantments").enchantments;
        enchantments.addEnchantment(new Minecraft.Enchantment("unbreaking", 3));

        item.getComponent("enchantments").enchantments = enchantments;

        container.addItem(item);

        player.sendMessage(`§r§6[§aScythe§6]§r The UI item has been added to your inventory.${didError ? "\n§4[§cWARNING§4]§r There was an error trying to create the custom UI item. The UI item has been defaulted to a wooden axe." : ""}`);
    }
});