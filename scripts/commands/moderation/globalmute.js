import { tellAllStaff } from "../../util.js";
import { registerCommand } from "../handler.js";
import data from "../../data/data.js";

registerCommand({
	name: "globalmute",
	execute: (message) => {
		toggleGlobalMute(message.sender);
	}
});

export function toggleGlobalMute(initiator) {
	if(data.chatMuted) {
		data.chatMuted = false;

		tellAllStaff(`§r§6[§aScythe§6]§r ${initiator.name} has re-enabled chat for all players.`);
	} else {
		data.chatMuted = true;
		data.chatMuter = initiator.name;

		tellAllStaff(`§r§6[§aScythe§6]§r ${initiator.name} has disabled chat for all players. This action can be reverted by running the !globalmute command.`);
	}
}