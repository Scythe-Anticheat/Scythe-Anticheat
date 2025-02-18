import { EquipmentSlot } from "@minecraft/server";
import { findPlayerByName, tellAllStaff } from "../../util.js";
import { registerCommand } from "../handler.js";

registerCommand({
	name: "cloneinv",
    description: "Copy all the items in a player's inventory to your inventory",
	usage: "<player>",
	minArgCount: 1,
	aliases: ["invclone", "invc"],
    category: "utility",
	execute: (message, args) => {
		const { player } = message;

		// Find the player requested
		const target = findPlayerByName(args[0]);

		if(!target) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

		const playerInv = player.getComponent("inventory").container;
		const playerArmor = player.getComponent("equippable");

		const targetInv = target.getComponent("inventory").container;
		const targetArmor = player.getComponent("equippable");

		for(const equipment of Object.keys(EquipmentSlot)) {
			playerArmor.setEquipment(equipment, targetArmor.getEquipment(equipment));
		}

		for(let i = 0; i < targetInv.size; i++) {
			playerInv.setItem(i, targetInv.getItem(i));
		}

		player.sendMessage(`§r§6[§aScythe§6]§r You have cloned ${target.name}'s inventory.`);

		tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has cloned ${target.name}'s inventory.`);
	}
});