// @ts-check
import { findPlayerByName, tellAllStaff } from "../../util.js";
import { registerCommand } from "../handler.js";

registerCommand({
	name: "fly",
	description: "Toggle the ability to fly in survival or adventure mode",
	usage: "[player]",
	category: "utility",
	execute: (message, args) => {
		const { player } = message;

		// Find the player requested
		const target = args.length ? findPlayerByName(args[0]) : player;

		if(!target) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

		if(player.gamemode === "Creative") return player.sendMessage("§r§6[§aScythe§6]§r No need! This player is in creative which allows flying by default.");

		target.hasTag("flying") ? disableFly(target, player) : enableFly(target, player);
	}
});

export function enableFly(target, initator) {
	target.addTag("flying");

	target.runCommand("ability @s mayfly true");
	target.sendMessage("§r§6[§aScythe§6]§r You are now in fly mode.");

	tellAllStaff(`§r§6[§aScythe§6]§r ${initator.name} has given ${initator.id === target.id ? "themselves" : `${target.name}'s`} fly mode.`);
}

export function disableFly(target, initator) {
	target.removeTag("flying");

	target.runCommand("ability @s mayfly false");
	target.sendMessage("§r§6[§aScythe§6]§r You are now no longer in fly mode.");

	tellAllStaff(`§r§6[§aScythe§6]§r ${initator.name} has removed ${target.id === initator.id ? "their" : `${target.name}'s`} fly mode.`);
}