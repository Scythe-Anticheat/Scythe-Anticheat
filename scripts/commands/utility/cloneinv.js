import { EquipmentSlot } from "@minecraft/server";
import { findPlayerByName, tellAllStaff } from "../../util.js";
import { registerCommand } from "../handler.js";

registerCommand({
	name: "cloneinv",
    description: "Copy all the items in a player's inventory to your inventory",
	usage: "<player>",
	minArgCount: 1,
    category: "utility",
	execute: (message, args) => {
		const { player } = message;

		// Find the player requested
		const member = findPlayerByName(args[0]);

		if(!member) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

		const playerInv = player.getComponent("inventory").container;
		const playerArmor = player.getComponent("equippable");

		const memberInv = member.getComponent("inventory").container;
		const memberArmor = player.getComponent("equippable");

		for(const equipment of Object.keys(EquipmentSlot)) {
			playerArmor.setEquipment(equipment, memberArmor.getEquipment(equipment));
		}

		for(let i = 0; i < memberInv.size; i++) {
			playerInv.setItem(i, memberInv.getItem(i));
		}

		player.sendMessage(`§r§6[§aScythe§6]§r You have cloned ${member.name}'s inventory.`);

		tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has cloned ${member.name}'s inventory.`);
	}
});