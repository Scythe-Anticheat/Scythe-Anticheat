// @ts-check
import config from "../../data/config.js";
import { world } from "@minecraft/server";
import { registerCommand } from "../handler.js";

// These two commands are functionally identical so they have been combined into one file
registerCommand({
	name: "module",
	description: "Change the data of Scythe modules",
	usage: "<module name> <setting> [value]",
	category: "settings",
	execute: execute
});

registerCommand({
	name: "misc_module",
	description: "Change the data of optional Scythe modules",
	usage: "<module name> <setting> [value]",
	aliases: ["mm"],
	category: "settings",
	execute: execute
});

function execute(message, args, commandName) {
	const { player } = message;
	const [ module, name ] = args;
	const value = args.slice(2).join(" ");

	const category = commandName === "module" ? "modules" : "misc_modules";

	if(!module) return player.sendMessage(`§r§6[§aScythe§6]§r Module list: ${Object.keys(config[category]).join(", ")}`);
	if(!Object.hasOwn(config[category], module)) return player.sendMessage(`§r§6[§aScythe§6]§r No such module as ${module} exists. Please select a module from this list: ${Object.keys(config[category]).join(", ")}`);

	const moduleData = config[category][module];

	if(!name) return player.sendMessage(`§r§6[§aScythe§6]§r ${module}'s configuration data:\n${JSON.stringify(moduleData, null, 2)}`);

	if(!Object.hasOwn(moduleData, name)) return player.sendMessage(`§r§6[§aScythe§6]§r ${module} does not have a property called ${name}. Please select a property from this list: ${Object.keys(moduleData).join(", ")}`);

	if(value === "") return player.sendMessage(`§r§6[§aScythe§6]§r You need enter a value for this setting.`);

	let newValue;
	switch(moduleData[name]?.constructor.name) {
		case "Boolean":
			newValue = value === "true";
			break;

		case "Number":
			newValue = Number(value);
			break;

		case "String":
			newValue = value;
			break;

		case "Array":
			newValue = JSON.parse(value.replace(/'/g, '"'));
			break;

		default:
			throw Error(`Unimplemented case ${moduleData[name]?.constructor.name}`);
	}

	moduleData[name] = newValue;

	// Save config
	world.setDynamicProperty("config", JSON.stringify(config));

	player.sendMessage(`§r§6[§aScythe§6]§r ${module}'s data has been updated. New data:\n${JSON.stringify(moduleData, null, 2)}`);
}