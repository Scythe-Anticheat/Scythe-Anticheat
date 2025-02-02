import { world } from "@minecraft/server";
import { tellAllStaff } from "../../util.js";
import { registerCommand } from "../handler.js";

const logo = "§r§6[§aScythe§6]§r";

registerCommand({
	name: "unban",
	description: "Manage the unban queue",
	usage: "<add | list | remove> [player name]",
	minArgCount: 1,
	aliases: ["ub","pardon"],
	category: "moderation",
	execute: (message, args) => {
		const { player } = message;

		const unbanQueue = JSON.parse(world.getDynamicProperty("unbanQueue")); // Object
		switch(args[0]) {
			case "add": {
				if(!args[1]) {
					return player.sendMessage("§r§6[§aScythe§6]§r You must enter a username to unban.");
				}

				const member = args[1].replace(/\\/g, "").toLowerCase(); // String

				if(member.length > 20) {
					return player.sendMessage("§r§6[§aScythe§6]§r That player name is too long. It must be less than 20 characters long.");
				}

				if(unbanQueue[member]) {
					return player.sendMessage(`§r§6[§aScythe§6]§r ${member} is already queued for an unban.`);
				}

				if(Object.keys(unbanQueue).length > 100) {
					return player.sendMessage("§r§6[§aScythe§6]§r The unban queue has reached the limit of 100 members.");
				}

				const reason = args.slice(2).join(" ").replace(/"|\\/g, "") || "No reason specified";

				unbanQueue[member] = [player.name, reason];
				world.setDynamicProperty("unbanQueue", JSON.stringify(unbanQueue));

				tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has added ${member} to the unban queue. Reason: ${reason}`);
				break;
			}

			case "list": {
				let msg = `${logo} Unban Queue:`;

				let count = 1;
				for(const playerName of Object.keys(unbanQueue)) {
					const info = unbanQueue[playerName];

					msg += `\n\n${logo} ${count}. ${playerName}\n${logo} Unbanned by: ${info[0]}\n${logo} Reason: ${info[1]}`;
					count++;
				}

				player.sendMessage(msg);
				break;
			}

			case "remove": {
				if(!args[1]) {
					return player.sendMessage("§r§6[§aScythe§6]§r You must enter a username.");
				}

				const member = args[1].replace(/\\/g, "").toLowerCase(); // String

				const reason = args.slice(2).join(" ").replace(/"|\\/g, "") || "No reason specified";

				if(!unbanQueue[member]) {
					return player.sendMessage(`§r§6[§aScythe§6]§r ${member} is not in the unban queue.`);
				}

				delete unbanQueue[member];
				world.setDynamicProperty("unbanQueue", JSON.stringify(unbanQueue));

				tellAllStaff(`${logo} ${player.name} has removed ${member} from the unban queue. Reason: ${reason}`);
				break;
			}

			default:
				player.sendMessage(`§r§6[§aScythe§6]§r Unknown subcommand "${args[0]}".`);
		}
	}
});