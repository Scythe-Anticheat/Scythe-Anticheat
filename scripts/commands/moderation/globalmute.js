import { world } from "@minecraft/server";
import { tellAllStaff } from "../../util.js";
import { registerCommand } from "../handler.js";

registerCommand({
	name: "globalmute",
	execute: (message) => {
		toggleGlobalMute(message.sender);
	}
});

export function toggleGlobalMute(initiator) {
	const muteData = JSON.parse(world.getDynamicProperty("globalmute"));

	if(muteData.muted) {
		world.setDynamicProperty("globalmute", JSON.stringify({
			muted: false,
			muter: ""
		}));

		tellAllStaff(`§r§6[§aScythe§6]§r ${initiator.name} has re-enabled chat for all players.`);
	} else {
		world.setDynamicProperty("globalmute", JSON.stringify({
			muted: true,
			muter: initiator.name
		}));

		tellAllStaff(`§r§6[§aScythe§6]§r ${initiator.name} has disabled chat for all players. This action can be reverted by running the !globalmute command.`);
	}
}