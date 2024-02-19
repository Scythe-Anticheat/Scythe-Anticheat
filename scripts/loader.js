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

const dpConfig = world.getDynamicProperty("config"); // Object
if(dpConfig) {
	const parsedConfig = JSON.parse(dpConfig);

	for(const item of Object.keys(parsedConfig)) {
		config[item] = parsedConfig[item];
	}

	console.warn("Loaded Scythe Config from Dynamic Properties");
}

// Update config to support the latest Scythe version
switch(config.version) {
	case "2.20.0":
		config.modules.namespoofB.regex = String(config.modules.namespoofB.regex);

		config.logAlertsToConsole = true;

		config.disableFlagsFromScytheOp = config.disable_flags_from_scythe_op;
		delete config.disable_flags_from_scythe_op;

		config.modules.killauraA = {
			enabled: true,
			rightTicks: 3,
			punishment: "none",
			minVlbeforePunishment: 0
		};

		config.modules.invalidsprintB = {
			enabled: true,
			punishment: "none",
			minVLbeforePunishment: 0,
		};

		config.modules.invalidsprintE = {
			enabled: true,
			punishment: "none",
			minVLbeforePunishment: 0,
		};
}

config.version = "2.21.0";

// Register all commands
import "./commands/moderation/kick.js";
import "./commands/other/help.js";
import "./commands/moderation/notify.js";
import "./commands/moderation/op.js";
import "./commands/moderation/ban.js";
import "./commands/moderation/mute.js";
import "./commands/moderation/unmute.js";
import "./commands/other/credits.js";
import "./commands/settings/antigma.js";
import "./commands/settings/antigmc.js";
import "./commands/settings/antigms.js";
import "./commands/settings/module.js";
import "./commands/settings/modules.js";
import "./commands/settings/npc.js";
import "./commands/settings/overridecommandblocksenabled.js";
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

// Run anticheat core
import "./main.js";

console.log("Scythe has successfully loaded!");