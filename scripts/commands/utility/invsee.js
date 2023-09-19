// @ts-check
// eslint-disable-next-line no-unused-vars
import { Player } from "@minecraft/server";
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

// Found the inventory viewing script in the bedrock addons discord, unsure of the original owner (not my code)
registerCommand({
	name: "invsee",
	usage: "<player>",
	minArgCount: 1,
	execute: (message, args) => {
		const player = message.sender;

		// Find the player requested
		const member = findPlayerByName(args[0]);

		if(!member) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

		player.sendMessage(getInvseeMsg(member));
	}
});

/**
 * @name getInvseeMsg
 * @param {Player} player 
 * @returns {string} msg - A list of all the items in the players inventory
 */
export function getInvseeMsg(player) {
	// @ts-expect-error
	const container = player.getComponent("inventory").container;

	let inventory = `§r§6[§aScythe§6]§r ${player.name}'s inventory:\n\n`;

	// This function loops through every enchantment on the item and then adds it to the inventory string. It is used if show_enchantments is enabled in the config
	const loopEnchants = (iterator) => {
		const iteratorResult = iterator.next();
		if(iteratorResult.done) return;

		const { value } = iteratorResult;

		const id = value.type.id;
		const level = value.level;

		const enchantmentName = capitalizeFirstLetter(id);

		inventory += `    | ${enchantmentName} ${level}\n`;

		loopEnchants(iterator);
	};

	// Loop through every armor slot
	let foundItem = false;
	if(config.customcommands.invsee.show_armor) {
		const armor = player.getComponent("equippable");

		for(const equipment of Object.keys(equipmentList)) {
			// @ts-expect-error
			const item = armor.getEquipment(equipment);
			if(!item) continue;

			foundItem = true;

			inventory += `§r§6[§aScythe§6]§r ${equipmentList[equipment]}: ${item.typeId} x${item.amount}\n`;

			if(config.customcommands.invsee.show_enchantments) {
				loopEnchants(item.getComponent("enchantments").enchantments[Symbol.iterator]());
			}
		}

		if(foundItem) inventory += `\n`;
	}

	// Loop through every item in the player's inventory
	for(let i = 0; i < 36; i++) {
		const item = container.getItem(i);
		if(!item) continue;

		foundItem = true;

		inventory += `§r§6[§aScythe§6]§r Slot ${i}: ${item.typeId} x${item.amount}\n`;

		if(config.customcommands.invsee.show_enchantments) {
			loopEnchants(item.getComponent("enchantments").enchantments[Symbol.iterator]());
		}
	}
	
	if(!foundItem) return `§r§6[§aScythe§6]§r ${player.name}'s inventory is empty.`;

	return inventory.replace(/\n+$/, "");
}