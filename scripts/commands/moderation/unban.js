import { world } from "@minecraft/server";
import { tellAllStaff } from "../../util.js";
import { registerCommand } from "../handler.js";

registerCommand({
	name: "unban",
	description: "Unban a player and allow them to be able to join the world again",
	usage: "<player> [reason]",
	minArgCount: 1,
	category: "moderation",
	execute: (message, args) => {
		const player = message.sender;

		const member = args[0].replace(/\\/g, "").toLowerCase(); // String

		const reason = args.slice(1).join(" ").replace(/"|\\/g, "") || "No reason specified";

		if(member.length > 20) {
			return player.sendMessage("§r§6[§aScythe§6]§r That player name is too long. It must be less than 20 characters long.");
		}

		const unbanQueue = JSON.parse(world.getDynamicProperty("unbanQueue")); // Returns Object

		if(Object.keys(unbanQueue).length > 1000) {
			return player.sendMessage("§r§6[§aScythe§6]§r The unban queue has reached the limit of 100 members.");
		}

		if(unbanQueue[member]) {
			return player.sendMessage(`§r§6[§aScythe§6]§r ${member} is already queued for an unban.`);
		}

		unbanQueue[member] = [player.name, reason];
		world.setDynamicProperty("unbanQueue", JSON.stringify(unbanQueue));

		tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has added ${member} to the unban queue. Reason: ${reason}`);
	}
});