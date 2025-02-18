import { findPlayerByName, tellAllStaff } from "../../util.js";
import { registerCommand } from "../handler.js";
import config from "../../data/config.js";

registerCommand({
    name: "gms",
    description: "Change your or another player's gamemode to survival",
	usage: "[player]",
    category: "utility",
    execute: (message, args) => {
        const { player } = message;

		if(args[0] && !config.customcommands.gms.canChangeOtherPeopleGamemode) player.sendMessage("§r§6[§aScythe§6]§r You cannot change other people's gamemodes.");

        // Find the player requested
        const target = args.length ? findPlayerByName(args[0]) : player;

        if(!target) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

		target.setGameMode("survival");

		tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has changed ${player.id === target.id ? "their" : `${target.name}'s`} gamemode to survival.`);
    }
});