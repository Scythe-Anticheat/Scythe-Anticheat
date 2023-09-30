import { findPlayerByName, tellAllStaff } from "../../util.js";
import { registerCommand } from "../handler.js";

const equipmentList = [
	"head",
	"chest",
	"legs",
	"feet",
	"offhand"
];

registerCommand({
	name: "cloneinv",
	usage: "<player>",
	minArgCount: 1,
	execute: (message, args) => {
		const player = message.sender;

		// Find the player requested
		const member = findPlayerByName(args[0]);

		if(!member) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

		const playerInv = player.getComponent("inventory").container;
		const playerArmor = player.getComponent("equipment_inventory");

		const memberInv = member.getComponent("inventory").container;
		const memberArmor = player.getComponent("equipment_inventory");

		for(const equipment of equipmentList) {
			playerArmor.setEquipment(equipment, memberArmor.getEquipment(equipment));
		}

		for(let i = 0; i < memberInv.size; i++) {
			playerInv.setItem(i, memberInv.getItem(i));
		}

		player.sendMessage(`§r§6[§aScythe§6]§r You have cloned ${member.name}'s inventory.`);

		tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has cloned ${member.name}'s inventory.`);
	}
});