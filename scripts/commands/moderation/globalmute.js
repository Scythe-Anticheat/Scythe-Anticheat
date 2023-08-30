import { tellAllStaff } from "../../util.js";
import { registerCommand } from "../handler.js";
import data from "../../data/data.js";

registerCommand({
	name: "globalmute",
	execute: (message) => {
		const player = message.sender;

		if(data.chatMuted) {
			data.chatMuted = false;

			tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has re-enabled chat for all players.`);
		} else {
			data.chatMuted = true;
			data.chatMuter = message.sender.name;

			tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has disabled chat for all players. This action can be reverted by running the !globalmute command.`);
		}
	}
});