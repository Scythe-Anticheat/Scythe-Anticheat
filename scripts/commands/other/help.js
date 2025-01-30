import config from "../../data/config.js";
import { capitalizeFirstLetter } from "../../util.js";
import { registerCommand, commands } from "../handler.js";

const prefix = config.customcommands.prefix;

let didFillCaches = false;
const moderationCommands = [];
const settingsCommands = [];
const utilityCommands = [];
const otherCommands = [];

registerCommand({
	name: "help",
	description: "Shows this help page",
	usage: "[commandName]",
    category: "other",
	execute: (message, args) => {
		const { player } = message;

		// Looping over every single command every time the help command is obviously bad for performance, so we cache all the command data.
		for(const command of Object.values(commands)) {
			if(didFillCaches) break; // Dont loop through all commands again

			switch(command.category) {
				case "moderation":
					moderationCommands.push(command);
					break;
				case "settings":
					settingsCommands.push(command);
					break;
				case "utility":
					utilityCommands.push(command);
					break;
				case "other":
					otherCommands.push(command);
					break;
				default:
					throw Error(`Unknown command category "${command.category}".`);
			}
		}

		didFillCaches = true;

		if(!args.length) {
			// Display all commands to the user
			let message = "§l§aScythe Anticheat Command Help\n\n§l§aModeration Commands\n";
			for(const command of moderationCommands) {
				message += `§r§3${prefix}${command.name} ${command.usage ?? ""}§r - ${command.description}\n`;
			}

			message += "\n§l§aOptional Features\n";
			for(const command of settingsCommands) {
				message += `§r§3${prefix}${command.name} ${command.usage ?? ""}§r - ${command.description}\n`;
			}

			message += "\n§l§aTools and Utilities\n";
			for(const command of utilityCommands) {
				message += `§r§3${prefix}${command.name} ${command.usage ?? ""}§r - ${command.description}\n`;
			}

			message += "\n§l§aOther Commands\n";
			for(const command of otherCommands) {
				message += `§r§3${prefix}${command.name} ${command.usage ?? ""}§r - ${command.description}\n`;
			}

			message += "\nNeed extra help? Ask your question in the support server: https://discord.gg/9m9TbgJ973.\n";

			player.sendMessage(message);
			return;
		}

		// Give help for a command
		const name = args[0].toLowerCase();
		if(!commands[name]) return player.sendMessage(`§r§6[§aScythe§6]§r The command '${name}' was not found`);

		const { description, usage, minArgCount, category } = commands[name];

		let commandInfo = `§r§6[§aScythe§6]§r Info for command: ${name}\n§r§6[§aScythe§6]§r Description: ${description}\n`;

		if(usage) commandInfo += `§r§6[§aScythe§6]§r Command Usage: ${prefix}${name} ${usage}\n`;
		if(minArgCount) commandInfo += `§r§6[§aScythe§6]§r Minimium Argument Count: ${minArgCount}\n`;

		commandInfo += `§r§6[§aScythe§6]§r Command Category: ${capitalizeFirstLetter(category)}\n§r§6[§aScythe§6]§r Enabled: ${config.customcommands[name].enabled ? "§atrue" : "§4false"}`;

		player.sendMessage(commandInfo);
	}
});