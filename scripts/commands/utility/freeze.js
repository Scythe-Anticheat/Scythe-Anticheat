// @ts-check
import { InputPermissionCategory } from "@minecraft/server";
import { findPlayerByName, tellAllStaff } from "../../util.js";
import { registerCommand } from "../handler.js";

registerCommand({
	name: "freeze",
	description: "Toggle a player's ability to move",
	usage: "<player>",
	minArgCount: 1,
	category: "utility",
	execute: (message, args) => {
		const { player } = message;

		// Find the player requested
		const target = findPlayerByName(args[0]);

		if(!target) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

		target.getDynamicProperty("frozen") ? unfreezePlayer(target, player) : freezePlayer(target, player);
	}
});

export function freezePlayer(target, initator) {
	target.addEffect("weakness", 99999, {
		amplifier: 255,
		showParticles: false
	});
	target.triggerEvent("scythe:freeze");
	target.setDynamicProperty("frozen", true);
	target.inputPermissions.setPermissionCategory(InputPermissionCategory.Movement, false);

	target.sendMessage("§r§6[§aScythe§6]§r You have been frozen by a staff member.");
	tellAllStaff(`§r§6[§aScythe§6]§r ${initator.name} has frozen ${target.name}.`);
}

export function unfreezePlayer(target, initator) {
	target.removeEffect("weakness");
	target.triggerEvent("scythe:unfreeze");
	target.setDynamicProperty("frozen", undefined);
	target.inputPermissions.setPermissionCategory(InputPermissionCategory.Movement, true);

	target.sendMessage("§r§6[§aScythe§6]§r You are no longer frozen.");
	tellAllStaff(`§r§6[§aScythe§6]§r ${initator.name} has unfrozen ${target.name}.`);
}