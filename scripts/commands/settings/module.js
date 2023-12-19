// @ts-check
import { registerCommand } from "../handler.js";
import config from "../../data/config.js";

registerCommand({
    name: "module",
	usage: "<module name> <setting> [value]",
    execute: execute
});

registerCommand({
    name: "misc_module",
	usage: "<module name> <setting> [value]",
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
    
	let newValue;
	switch(typeof moduleData[name]) {
		case "boolean": 
			newValue = value === "true" ? true : false;
			break;
			
		case "number":
			newValue = Number(value);
			break;

		case "string":
			newValue = value;
			break;
			
		// "Object" type is kind of a wildcard, it can refer to normal objects, arrays,, regexs, promises, etc
		case "object": {
			// Normal objects and Arrays can both be parsed with JSON.parse
			if(moduleData[name] instanceof RegExp) {
				newValue = RegExp(value);
			} else {
				newValue = JSON.parse(value);
			}
			break;
		}
	}

	moduleData[name] = newValue;

	player.sendMessage(`§r§6[§aScythe§6]§r ${module}'s data has been updated. New Data: ${JSON.stringify(moduleData, null, 2)}`);
}