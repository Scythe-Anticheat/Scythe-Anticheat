// @ts-check
import { registerCommand } from "../handler.js";
import config from "../../data/config.js";

const enabled = "§8[§aENABLED§8]";
const disabled = "§8[§4DISABLED§8]";

registerCommand({
	name: "modules",
    description: "Shows all modules and if they are enabled or not",
    category: "settings",
	execute: (message) => {
		let msg = "==== MODULES ====\n";

		for(const module of Object.keys(config.modules)) {
			msg += `§r§6[§aScythe§6]§r ${module} ${config.modules[module].enabled ? enabled : disabled}\n`;
		}

		msg += "§r==== MISC MODULES =====\n";

		for(const misc_module of Object.keys(config.misc_modules)) {
			msg += `§r§6[§aScythe§6]§r ${misc_module} ${config.misc_modules[misc_module].enabled ? enabled : disabled}\n`;
		}

		message.player.sendMessage(msg);
	}
});