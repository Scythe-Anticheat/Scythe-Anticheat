import { findPlayerByName, tellAllStaff } from "../../util.js";
import { registerCommand } from "../handler.js";

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
		const memberInv = member.getComponent("inventory").container;

		for (let i = 0; i < memberInv.size; i++) {
			playerInv.setItem(i, memberInv.getItem(i));
		}

		player.sendMessage(`§r§6[§aScythe§6]§r You have cloned ${member.name}'s inventory.`);

		tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has cloned ${member.name}'s inventory.`);
	}
});