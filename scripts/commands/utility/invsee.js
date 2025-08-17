// @ts-check
import config from "../../data/config.js";

import { capitalizeFirstLetter, findPlayerByName } from "../../util.js";
import { registerCommand } from "../handler.js";

const equipmentList = {
	"Head": "Helmet",
	"Chest": "Chestplate",
	"Legs": "Leggings",
	"Feet": "Boots",
	"Offhand": "Offhand"
};

registerCommand({
	name: "invsee",
    description: "Shows the inventory of any player",
	usage: "<player>",
	minArgCount: 1,
	aliases: ["inv"],
    category: "utility",
	execute: (message, args) => {
		const { player } = message;

		// Find the player requested
		const target = findPlayerByName(args[0]);
		if(!target) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

		player.sendMessage(getInvseeMsg(target));
	}
});

/**
 * @name getInvseeMsg
 * @param {import("@minecraft/server").Player} target
 * @returns {string} msg - A list of all the items in the players inventory
 */
export function getInvseeMsg(target) {
	const container = target.getComponent("inventory")?.container;

	let inventory = `§r§6[§aScythe§6]§r ${target.name}'s inventory:\n\n`;

	// This function loops through every enchantment on the item and then adds it to the inventory string. It is used if show_enchantments is enabled in the config
	const loopEnchants = (allEnchantments = []) => {
		for(const enchantment of allEnchantments) {
			const id = enchantment.type.id;
			const level = enchantment.level;

			const enchantmentName = capitalizeFirstLetter(id);

			inventory += `    | ${enchantmentName} ${level}\n`;
		}
	};

	// Loop through every armor slot
	let foundItem = false;
	if(config.customcommands.invsee.show_armor) {
		const armor = target.getComponent("equippable");

		for(const equipment of Object.keys(equipmentList)) {
			// @ts-expect-error
			const item = armor?.getEquipment(equipment);
			if(!item) continue;

			foundItem = true;

			inventory += `§r§6[§aScythe§6]§r ${equipmentList[equipment]}: ${item.typeId} x${item.amount}\n`;

			if(config.customcommands.invsee.show_enchantments) {
				loopEnchants(item.getComponent("enchantable")?.getEnchantments());
			}
		}

		if(foundItem) inventory += `\n`;
	}

	// Loop through every item in the player's inventory
	for(let i = 0; i < 36; i++) {
		if(!container) break;

		const item = container.getItem(i);
		if(!item) continue;

		foundItem = true;

		inventory += `§r§6[§aScythe§6]§r Slot ${i}: ${item.typeId} x${item.amount}\n`;

		if(config.customcommands.invsee.show_enchantments) {
			loopEnchants(item.getComponent("enchantable")?.getEnchantments());
		}
	}

	if(!foundItem) return `§r§6[§aScythe§6]§r ${target.name}'s inventory is empty.`;

	return inventory.replace(/\n+$/, "");
}