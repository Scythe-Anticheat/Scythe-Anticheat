// @ts-check
import { findPlayerByName } from "../../util.js";
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

		target.hasTag("flying") ? target.disableFly(player) : target.enableFly(player);
	}
});