// @ts-check
import { GameMode } from "@minecraft/server";
import { findPlayerByName, tellAllStaff } from "../../util.js";
import { registerCommand } from "../handler.js";

registerCommand({
	name: "fly",
	description: "Toggle the ability to fly in survival or adventure mode",
	usage: "[player]",
	category: "utility",
	execute: (message, args) => {
		const player = message.sender;

		// Find the player requested
		const member = args.length ? findPlayerByName(args[0]) : player;

		if(!member) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

		if(!player.matches({excludeGameModes: [GameMode.creative, GameMode.spectator]})) return player.sendMessage("§r§6[§aScythe§6]§r No need! This player is in creative which allows flying by default.");

		member.hasTag("flying") ? disableFly(member, player) : enableFly(member, player);
	}
});

export function enableFly(player, initator) {
	player.addTag("flying");

	player.runCommandAsync("ability @s mayfly true");
	player.sendMessage("§r§6[§aScythe§6]§r You are now in fly mode.");

	tellAllStaff(`§r§6[§aScythe§6]§r ${initator.name} has given ${initator.id === player.id ? "themselves" : `${player.name}'s`} fly mode.`);
}

export function disableFly(player, initator) {
	player.removeTag("flying");

	player.runCommandAsync("ability @s mayfly false");
	player.sendMessage("§r§6[§aScythe§6]§r You are now no longer in fly mode.");

	tellAllStaff(`§r§6[§aScythe§6]§r ${initator.name} has removed ${player.id === initator.id ? "their" : `${player.name}'s`} fly mode.`);
}