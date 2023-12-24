import { findPlayerByName, tellAllStaff } from "../../util.js";
import { registerCommand } from "../handler.js";
import config from "../../data/config.js";

registerCommand({
    name: "gma",
    description: "Change your or another player's gamemode to adventure",
	usage: "[player]",
    category: "utility",
    execute: (message, args) => {
        const player = message.sender;

		if(args[0] && !config.customcommands.gma.canChangeOtherPeopleGamemode) player.sendMessage("§r§6[§aScythe§6]§r You cannot change other people's gamemodes.");

        // Find the player requested
        const member = args.length ? findPlayerByName(args[0]) : player;

        if(!member) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

		member.runCommandAsync("gamemode adventure");

		tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has changed ${player.id === member.id ? "their" : `${member.name}'s`} gamemode to adventure.`);
    }
});