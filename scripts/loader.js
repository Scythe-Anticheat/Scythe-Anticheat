// @ts-check
// This is the initial file that runs. It is used to load everything for Scythe
import config from "./data/config.js";
import { world } from "@minecraft/server";

// Set dynamic properties
if(!world.getDynamicProperty("globalmute")) {
	world.setDynamicProperty("globalmute", JSON.stringify({
		muted: false,
		muter: ""
	}));
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

const latestConfigVer = "8";

const dpConfig = world.getDynamicProperty("config"); // Object
if(dpConfig) {
	// @ts-expect-error
	const parsedConfig = JSON.parse(dpConfig);

	for(const i of Object.keys(parsedConfig)) {
		config[i] = parsedConfig[i];
	}

	console.log("Loaded Scythe Config from Dynamic Properties");
}

// Update config to support the latest Scythe version
/* eslint-disable no-fallthrough */
switch(config.version) {
	case "2.20.0":
		config.itemLists.items_semi_illegal.push("minecraft:trial_spawner");

		config.modules.namespoofB.regex = String(config.modules.namespoofB.regex);

		config.logAlertsToConsole = true;

		config.disableFlagsFromScytheOp = config.disable_flags_from_scythe_op;
		delete config.disable_flags_from_scythe_op;

		config.customcommands.unban.aliases.push("pardon");

		config.modules.killauraA = {
			enabled: true,
			rightTicks: 3,
			punishment: "none",
			minVlbeforePunishment: 0
		};

		config.modules.scaffoldE = {
			enabled: true,
			punishment: "none",
			minVLbeforePunishment: 0,
		};

		config.modules.commandblockexploitH.punishment = "none";
		config.modules.commandblockexploitH.minVlbeforePunishment = 0;

		config.misc_modules.antiGamemode = {
			enabled: false,
			blockedGamemodes: []
		};

		delete config.customcommands.antigma;
		delete config.customcommands.antigmc;
		delete config.customcommands.antigms;

		delete config.customcommands.overridecommandblocksenabled;

	case "2.22.0":
		config.misc_modules.oreAlerts = {
			enabled: config.modules.xrayA.enabled,
			blocks: config.itemLists.xray_items
		};

		delete config.modules.xrayA;
		delete config.itemLists.xray_items;

	case "2.24.0":
		delete config.modules.badenchantsA;
		delete config.modules.badenchantsB;
		delete config.modules.badenchantsC;
		delete config.modules.badenchantsD;
		delete config.modules.badenchantsE;

		delete config.modules.commandblockexploitF;
		delete config.modules.commandblockexploitG;
		delete config.modules.tcommandblockexploitH;

		delete config.modules.illegalitemsB;
		delete config.modules.illegalitemsC;
		delete config.modules.illegalitemsD;
		delete config.modules.illegalitemsE;
		delete config.modules.illegalitemsF;
		delete config.modules.illegalitemsH;
		delete config.modules.illegalitemsI;
		delete config.modules.illegalitemsJ;
		delete config.modules.illegalitemsK;
		delete config.modules.illegalitemsL;
		delete config.modules.illegalitemsM;

		delete config.misc_modules.resetItemData;

		delete config.itemLists;

		config.modules.badpackets2 = {
			enabled: true,
			maxLength: 512,
			punishment: "ban",
			punishmentLength: "",
			minVlbeforePunishment: 1
		};

		config.modules.reachA.excluded_entities = config.modules.reachA.entities_blacklist;
		delete config.modules.reachA.entities_blacklist;

		config.modules.reachA.excluded_items = [
			"minecraft:trident",
			"minecraft:mace"
		];

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
		config.modules.badpackets5 = {
			enabled: true,
			punishment: "ban",
			punishmentLength: "",
			minVlbeforePunishment: 1
		};
	
	case "7":
		config.modules.reachB = {
			enabled: false,
			reach: 7,
			punishment: "none",
			minVlbeforePunishment: 1
		};

		config.modules.reachC = {
			enabled: false,
			reach: 7,
			punishment: "none",
			minVlbeforePunishment: 1
		};

	case latestConfigVer:
		break;

	default:
		console.error(`Unknown config revision ${config.version}. It is probably best we revert to the default config.`);
		world.setDynamicProperty("config", undefined);
}

config.version = latestConfigVer;

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
import "./commands/settings/invalidsprint.js";
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

console.log("Scythe has successfully loaded!");
