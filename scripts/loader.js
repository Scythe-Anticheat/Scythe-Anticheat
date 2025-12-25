// This is the initial file that runs. It is used to load everything for Scythe
import config from "./data/config.js";
import { system, world } from "@minecraft/server";

const latestConfigVer = "22";

// Set dynamic properties
system.run(() => {
	if(!world.getDynamicProperty("globalmute")) {
		const data = { muted: false, muter: "" };

		world.setDynamicProperty("globalmute", JSON.stringify(data));
	}

	if(!world.getDynamicProperty("unbanQueue")) {
		/*
			The data in the object should have the following format:

			Key: <player username>
			Value: [<unbanner>, <reason>]

			The data is stored in an array to conserve storage as dynamic property strings have a limit of 32767 characters
		*/
		world.setDynamicProperty("unbanQueue", "{}");
	}

	const dpConfig = world.getDynamicProperty("config"); // Object
	if(dpConfig) {
		// @ts-expect-error
		const parsedConfig = JSON.parse(dpConfig);

		for(const i of Object.keys(parsedConfig)) {
			config[i] = parsedConfig[i];
		}

		console.log("Loaded Scythe config from Dynamic Properties");
	}

	// Update config to support the latest Scythe version
	/* eslint-disable no-fallthrough */
	switch(config.version) {
		case "3.0.0":
			config.modules.badpackets4 = {
				enabled: true,
				punishment: "ban",
				punishmentLength: "",
				minVlbeforePunishment: 1
			};

			config.modules.inventorymodsB = {
				enabled: true,
				punishment: "none",
				minVlbeforePunishment: 1
			};

		case "3.1.1":
			config.modules.autooffhandA = {
				enabled: true,
				punishment: "none",
				minVlbeforePunishment: 0
			};

			config.modules.autooffhandB = {
				enabled: true,
				punishment: "none",
				minVlbeforePunishment: 0
			};

			config.modules.autooffhandC = {
				enabled: true,
				punishment: "none",
				minVlbeforePunishment: 0
			};

		case "6":
			// @ts-expect-error
			config.modules.badpackets5 = {
				enabled: true,
				punishment: "ban",
				punishmentLength: "",
				minVlbeforePunishment: 1
			};
		
		case "7":
			config.modules.reachB = {
				enabled: false,
				punishment: "none",
				minVlbeforePunishment: 1
			};

			config.modules.reachC = {
				enabled: false,
				punishment: "none",
				minVlbeforePunishment: 1
			};
		
		case "8":
			config.modules.badpackets5.exclude_scythe_op = true;

		case "9":
			delete config.modules.reachB.reach;
			delete config.modules.reachC.reach;

		case "10":
			config.misc_modules.antiSpam = {
				enabled: config.modules.spammerE.enabled,
				messageRatelimit: config.modules.spammerE.messageRatelimit
			};

			delete config.modules.spammerE;
		
		case "11":
			delete config.modules.reachA.excluded_entities;

		case "12":
			for(const command of Object.values(config.customcommands)) {
				// @ts-expect-error
				delete command.aliases;
			}
		
		case "13":
			config.modules.badpackets1 = {
				enabled: true,
				punishment: "ban",
				punishmentLength: "",
				minVlbeforePunishment: 1
			};
		
		case "14":
			delete config.misc_modules.itemSpawnRateLimit;

		case "15":
			delete config.autoban;

		case "16":
			config.modules.invalidsprintF = {
				enabled: true,
				punishment: "none",
				minVlbeforePunishment: 0
			};

		case "17":
			config.modules.invalidsprintB = {
				enabled: false,
				punishment: "none",
				minVlbeforePunishment: 0
			};

			config.modules.invalidsprintC = {
				enabled: true,
				punishment: "none",
				minVlbeforePunishment: 0
			};

			config.modules.invalidsprintD = {
				enabled: false,
				punishment: "none",
				minVlbeforePunishment: 0
			};

			config.modules.invalidsprintE = {
				enabled: true,
				punishment: "none",
				minVlbeforePunishment: 0
			};

			delete config.customcommands.invalidsprint;

		case "18":
			config.modules.inventorymodsA = {
				enabled: false,
				punishment: "none",
				minVlbeforePunishment: 0
			};
		
		case "19":
			// Convert the previous time in ticks to milliseconds
			config.modules.killauraA.min_item_use_time = config.modules.killauraA.rightTicks * 50;
			delete config.modules.killauraA.rightTicks;

		case "20":
			delete config.misc_modules.antiGamemode;

		case "21":
			delete config.modules.badpackets2.maxLength;

		case latestConfigVer:
			break;

		default:
			console.error(`Unknown config revision ${config.version}. It is probably best we revert to the default config.`);
			world.setDynamicProperty("config", undefined);
	}

	config.version = latestConfigVer;

	// Once we have loaded the config, load all checks
	import("./checks/registry.js");

	console.log("Scythe has successfully loaded!");
});

// Load class extensions
import "./extensions/Entity.js";
import "./extensions/Player.js";

// Register all commands
import "./commands/moderation/kick.js";
import "./commands/other/help.js";
import "./commands/moderation/notify.js";
import "./commands/moderation/op.js";
import "./commands/moderation/ban.js";
import "./commands/moderation/mute.js";
import "./commands/moderation/unmute.js";
import "./commands/other/credits.js";
import "./commands/settings/module.js";
import "./commands/settings/modules.js";
import "./commands/utility/tag.js";
import "./commands/utility/ecwipe.js";
import "./commands/utility/freeze.js";
import "./commands/moderation/stats.js";
import "./commands/utility/fullreport.js";
import "./commands/utility/vanish.js";
import "./commands/utility/fly.js";
import "./commands/utility/invsee.js";
import "./commands/utility/cloneinv.js";
import "./commands/other/report.js";
import "./commands/moderation/unban.js";
import "./commands/utility/ui.js";
import "./commands/moderation/resetwarns.js";
import "./commands/other/version.js";
import "./commands/moderation/deop.js";
import "./commands/moderation/globalmute.js";
import "./commands/utility/gma.js";
import "./commands/utility/gmc.js";
import "./commands/utility/gms.js";
import "./commands/utility/gmsp.js";
import "./commands/settings/resetconfig.js";

// Run anticheat core
import "./main.js";