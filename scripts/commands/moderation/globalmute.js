// @ts-check
import DataManager from "../../managers/DataManager.js";
import { tellAllStaff } from "../../util.js";
import { registerCommand } from "../handler.js";

registerCommand({
	name: "globalmute",
	description: "Prevent any players from sending messages in chat. Useful incase your world gets hit by a spam attack",
	aliases: ["gm"],
    category: "moderation",
	execute: (message) => {
		const enabled = DataManager.getGlobalMute().enabled;
		DataManager.setGlobalMute(!enabled, message.sender.name);

		tellAllStaff(`§r§6[§aScythe§6]§r ${message.sender.name} has enabled global mute. This action can be reverted by running the !globalmute command.`);
	}
});