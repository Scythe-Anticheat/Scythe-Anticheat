import config from "../../data/config.js";

import { capitalizeFirstLetter, findPlayerByName } from "../../util.js";
import { registerCommand } from "../handler.js";

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

export function getInvseeMsg(player) {
	const container = player.getComponent("inventory").container;

	if(container.emptySlotsCount === 36) return `§r§6[§aScythe§6]§r ${player.name}'s inventory is empty.`;

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

	// Loop through every item in the player's inventory
	for(let i = 0; i < 36; i++) {
		const item = container.getItem(i);
		if(!item) continue;

		inventory += `§r§6[§aScythe§6]§r Slot ${i}: ${item.typeId} x${item.amount}\n`;

		if(config.customcommands.invsee.show_enchantments) {
			loopEnchants(item.getComponent("enchantments").enchantments[Symbol.iterator]());
		}
	}

	return inventory;
}