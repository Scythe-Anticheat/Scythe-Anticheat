// @ts-check
import config from "../../data/config.js";
import { capitalizeFirstLetter } from "../../util.js";
import { registerCommand, commands } from "../handler.js";

const prefix = config.commands.prefix;

const commandData = {
	filledCache: false,
	moderation: [],
	settings: [],
	utility: [],
	other: []
};

const friendlyCategoryNames = {
	moderation: "Moderation Commands",
	settings: "Settings Commands",
	utility: "Tools and Utilities",
	other: "Other Commands"
};

registerCommand({
	name: "help",
	description: "Shows this help page",
	usage: "[commandName]",
	aliases: ["support", "commands", "man"],
    category: "other",
	execute: (message, args) => {
		const { player } = message;

		// Looping over every single command every time is obviously bad for performance, so we cache all the generated command data
		if(!commandData.filledCache) generateCommandData();

		// If no command was passed in then send the user all avaliable commands
		if(!args.length) return player.sendMessage(getHelpMessage());

		// Give help for a command
		const name = args[0].toLowerCase();
		if(!Object.hasOwn(commands, name)) return player.sendMessage(`§r§6[§aScythe§6]§r The command '${name}' was not found.`);

		const { description, usage, minArgCount, category, aliases } = commands[name];

		let commandInfo = `§r§6[§aScythe§6]§r Info for command: ${name}\n§r§6[§aScythe§6]§r Description: ${description}\n`;

		if(usage) commandInfo += `§r§6[§aScythe§6]§r Usage: ${prefix}${name} ${usage}\n`;
		if(minArgCount) commandInfo += `§r§6[§aScythe§6]§r Minimium Argument Count: ${minArgCount}\n`;
		if(aliases) commandInfo += `§r§6[§aScythe§6]§r Aliases: ${aliases.join(", ")}\n`;

		commandInfo += `§r§6[§aScythe§6]§r Category: ${capitalizeFirstLetter(category)}\n§r§6[§aScythe§6]§r Enabled: ${config.commands[name].enabled ? "§atrue" : "§4false"}`;

		player.sendMessage(commandInfo);
	}
});

function generateCommandData() {
	for(const command of Object.values(commands)) {
		if(!commandData[command.category]) throw Error(`Unknown command category "${command.category}".`);

		commandData[command.category].push(command);
	}

	commandData.filledCache = true;
}

function getHelpMessage() {
	let message = "§l§aScythe Anticheat Command Help\n";

	// Loop through all command categories
	for(const category of Object.keys(friendlyCategoryNames)) {
		message += `\n§l§a${friendlyCategoryNames[category]}\n`;

		// Loop through all commands that exist for the category
		for(const command of commandData[category]) {
			message += `§r§3${prefix}${command.name} ${command.usage ?? ""}§r - ${command.description}\n`;
		}
	}

	message += "\nNeed extra help? Ask your question in the support server: https://discord.gg/9m9TbgJ973.\n";

	return message;
}