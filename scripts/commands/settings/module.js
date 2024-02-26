// @ts-check
import config from "../../data/config.js";
import { world } from "@minecraft/server";
import { registerCommand } from "../handler.js";

registerCommand({
    name: "module",
    description: "Change the data of scythe modules",
	usage: "<module name> <setting> [value]",
    category: "settings",
    execute: execute
});

registerCommand({
    name: "misc_module",
    description: "Change the data of optional scythe modules",
	usage: "<module name> <setting> [value]",
    category: "settings",
    execute: execute
});

function execute(message, args, commandName) {
	const player = message.sender;
	const category = commandName === "module" ? "modules" : "misc_modules";
    const module = args[0];
	const name = args[1];
	const value = args.slice(2).join(" ");

	if(!module) return player.sendMessage(`§r§6[§aScythe§6]§r Module list: ${Object.keys(config[category]).join(", ")}`);

	const moduleData = config[category][module];
	if(!moduleData) return player.sendMessage(`§r§6[§aScythe§6]§r No such module as ${module} exists. Please select a module from this list: ${Object.keys(config[category]).join(", ")}`);

	if(!name) return player.sendMessage(`§r§6[§aScythe§6]§r ${module} data:\n${JSON.stringify(moduleData, null, 2)}`);

	if(moduleData[name] === undefined) return player.sendMessage(`§r§6[§aScythe§6]§r ${module} does not have a setting called ${name}. Please select a setting from this list: ${Object.keys(moduleData).join(", ")}`);

	if(value === "") return player.sendMessage(`§r§6[§aScythe§6]§r You need enter a value for this setting.`);

	let newValue;
	switch(moduleData[name]?.constructor.name) {
		case "Boolean":
			newValue = value === "true" ? true : false;
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

		case "RegExp":
			newValue = RegExp(value);
			break;
	}

	moduleData[name] = newValue;

	// Save config
	world.setDynamicProperty("config", JSON.stringify(config));

	player.sendMessage(`§r§6[§aScythe§6]§r ${module}'s data has been updated. New Data: ${JSON.stringify(moduleData, null, 2)}`);
}