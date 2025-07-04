// @ts-check
import { ItemStack, EnchantmentType } from "@minecraft/server";
import config from "../../data/config.js";
import { registerCommand } from "../handler.js";

registerCommand({
	name: "ui",
	description: "Access the Scythe UI for world and player management",
	aliases: ["gui"],
	category: "utility",
	execute: (message) => {
		const { player } = message;

		// Get the player's inventory component
		const container = player.getComponent("inventory").container;

		// Check if the player's inventory is full
		if(container.emptySlotsCount === 0) {
			return player.sendMessage("§r§6[§aScythe§6]§r Your inventory is full! Try removing some items and try again.");
		}

		// Make sure they don't have the UI item in their current slot
		const currentItem = container.getItem(player.selectedSlotIndex);

		if(currentItem?.typeId === config.customcommands.ui.ui_item && currentItem?.nameTag === config.customcommands.ui.ui_item_name) {
			return player.sendMessage("§r§6[§aScythe§6]§r You already have the UI item in your inventory.");
		}

		// Create the item that opens the UI
		const item = new ItemStack(config.customcommands.ui.ui_item, 1);

		item.nameTag = config.customcommands.ui.ui_item_name;

		// Enchant the item with Unbreaking 3
		item.getComponent("enchantable")?.addEnchantment({ type: new EnchantmentType("unbreaking"), level: 3 });

		container.addItem(item);

		player.sendMessage("§r§6[§aScythe§6]§r The UI item has been added to your inventory.");
	}
});