import { world } from "@minecraft/server";
import { tellAllStaff } from "../../util.js";
import { registerCommand } from "../handler.js";

const logo = "§r§6[§aScythe§6]§r";

registerCommand({
	name: "unbanlist",
	description: "View the unban queue or remove players",
	usage: "[remove] [player name]",
	minArgCount: 0,
	category: "moderation",
	execute: (message, args) => {
		const player = message.sender;

		const unbanQueue = JSON.parse(world.getDynamicProperty("unbanQueue"));

		// List all players in unban queue
		if(args[0] !== "remove") {
			let msg = `${logo} Unban Queue:\n\n`;

			let count = 1;
			for(const playerName of Object.keys(unbanQueue)) {
				const info = unbanQueue[playerName];

				msg += `${logo} ${count}. ${playerName}\n${logo} Unbanned by: ${info[0]}\n${logo} Reason: ${info[1]}\n\n`;
				count++;
			}

			return player.sendMessage(msg);
		}

		// Remove player from unban queue
		const member = args[1].replace(/\\/g, "").toLowerCase(); // String

		const reason = args.slice(2).join(" ").replace(/"|\\/g, "") || "No reason specified";

		if(!unbanQueue[member]) {
			return player.sendMessage(`§r§6[§aScythe§6]§r ${member} is not in the unban queue.`);
		}

		delete unbanQueue[member];
		world.setDynamicProperty("unbanQueue", JSON.stringify(unbanQueue));

		tellAllStaff(`${logo} ${player.name} has removed ${member} from the unban queue. Reason: ${reason}`);
	}
});