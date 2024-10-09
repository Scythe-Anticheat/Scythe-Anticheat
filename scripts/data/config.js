export default
{
	/*
	This value should not be changed unless you know what you are doing.
	It is used to make Scythe be able to work with older versions of the config

	Internally we still call it the config version, however it should be referred to as the config revision.
	*/
	"version": "6",
	"debug": true,
	// If checks can auto-ban
	"autoban": true,
	"flagWhitelist": [],
	/*
	By enabling this toggle, you can prevent anybody will scythe op from getting flagged from the anticheat
	Although this may be a useful feature, it can be exploited by hackers to completely disable the anticheat for themselves.
	It is a much better idea to add "exclude_scythe_op" for each individual check instead of globally
	*/
	"disableFlagsFromScytheOp": false,
	"logAlertsToConsole": true,
	"customcommands": {
		"prefix": "!",
		"sendInvalidCommandMsg": false,
		"ban": {
			"enabled": true,
			"requiredTags": ["op"],
			"aliases": ["b"]
		},
		"help": {
			"enabled": true,
			"requiredTags": ["op"],
			"aliases": ["support","commands"]
		},
		"op": {
			"enabled": true,
			"requiredTags": ["op"],
			"aliases": ["staff"]
		},
		"deop": {
			"enabled": true,
			"requiredTags": ["op"]
		},
		"credits": {
			"enabled": true,
			"requiredTags": []
		},
		"misc_module": {
			"enabled": true,
			"requiredTags": ["op"],
			"aliases": ["mm"]
		},
		"module": {
			"enabled": true,
			"requiredTags": ["op"]
		},
		"modules": {
			"enabled": true,
			"requiredTags": ["op"]
		},
		"invalidsprint": {
			"enabled": true,
			"requiredTags": ["op"],
			"aliases": ["is"]
		},
		"ecwipe": {
			"enabled": true,
			"requiredTags": ["op"],
			"aliases": ["enderchestwipe", "ecw", "clearec", "cec"]
		},
		"freeze": {
			"enabled": true,
			"requiredTags": ["op"]
		},
		"stats": {
			"enabled": true,
			"requiredTags": ["op"],
			"aliases": ["info"]
		},
		"fullreport": {
			"enabled": true,
			"requiredTags": ["op"],
			"aliases": ["fr"]
		},
		"kick": {
			"enabled": true,
			"requiredTags": ["op"],
			"aliases": ["k"]
		},
		"mute": {
			"enabled": true,
			"requiredTags": ["op"],
			"aliases": ["m"]
		},
		"unmute": {
			"enabled": true,
			"requiredTags": ["op"],
			"aliases": ["um"]
		},
		"fly": {
			"enabled": true,
			"requiredTags": ["op"]
		},
		"invsee": {
			"enabled": true,
			"show_enchantments": true,
			"show_armor": true,
			"requiredTags": ["op"],
			"aliases": ["inv"]
		},
		"cloneinv": {
			"enabled": true,
			"requiredTags": ["op"],
			"aliases": ["invclone", "invc"]
		},
		"notify": {
			"enabled": true,
			"requiredTags": ["op"]
		},
		"tag": {
			"enabled": true,
			// The color of the tag name, inside the brackets
			// Players can still choose their own tag color by adding a color code in the !tag command
			"mainColor": "§a",
			// The color of the tag name, aka the brackets
			"borderColor": "§8",
			// Color of player name. Leave blank for none.
			"playerNameColor": "§r",
			// If players should have a default tag when they join. Leave blank to disable this.
			"defaultTag": "",
			"requiredTags": ["op"],
			"aliases": ["rank"]
		},
		"vanish": {
			"enabled": true,
			"requiredTags": ["op"],
			"aliases": ["v"]
		},
		"report": {
			"enabled": true,
			"requiredTags": []
		},
		"unban": {
			"enabled": true,
			"requiredTags": ["op"],
			"aliases": ["ub","pardon"]
		},
		"ui": {
			"enabled": true,
			"ui_item_name": "§r§l§aRight click to Open the UI",
			"ui_item": "minecraft:wooden_axe",
			// Players without this tag wont be able to use the Scythe UI
			"requiredTags": ["op"],
			"aliases": ["gui"]
		},
		"resetwarns": {
			"enabled": true,
			"requiredTags": ["op"],
			"aliases": ["rw"]
		},
		"version": {
			"enabled": true,
			"requiredTags": ["op"],
			"aliases": ["ver","about"]
		},
		"globalmute": {
			"enabled": true,
			// If this is enabled then all players can see who disabled the chat
			"showModeratorName": false,
			"requiredTags": ["op"],
			"aliases": ["gm"]
		},
		"gma": {
			"enabled": true,
			"canChangeOtherPeopleGamemode": true,
			"requiredTags": ["op"]
		},
		"gmc": {
			"enabled": true,
			"canChangeOtherPeopleGamemode": true,
			"requiredTags": ["op"]
		},
		"gms": {
			"enabled": true,
			"canChangeOtherPeopleGamemode": true,
			"requiredTags": ["op"]
		},
		"gmsp": {
			"enabled": true,
			"canChangeOtherPeopleGamemode": true,
			"requiredTags": ["op"]
		},
		"resetconfig": {
			"enabled": true,
			"requiredTags": ["op"]
		}
	},
	"modules": {
		"exampleA": {
			// If the check should be enabled or not.
			"enabled": true,
			// If players with scythe-op can bypass this check (Optional)
			"exclude_scythe_op": false,
			// The punishment. Can either be "none", "mute", "kick", "ban" or "freeze"
			"punishment": "none",
			// PunishmentLength can be either a length ('7d', '2w 1h') or how long the ban should be in milliseconds
			// To permamently ban a user the string should be empty.
			"punishmentLength": "",
			// How much violations the player must first have to start punishing them
			"minVlbeforePunishment": 1
		},
		"autoclickerA": {
			"enabled": true,
			"maxCPS": 12,
			"checkCPSAfter": 1000,
			"punishment": "none",
			"minVlbeforePunishment": 0
		},
		"autooffhandA": {
			"enabled": false,
			"punishment": "none",
			"minVlbeforePunishment": 0
		},
		"autooffhandB": {
			"enabled": true,
			"punishment": "none",
			"minVlbeforePunishment": 0
		},
		"autooffhandC": {
			"enabled": true,
			"punishment": "none",
			"minVlbeforePunishment": 0
		},
		"autotoolA": {
			"enabled": true,
			"startBreakDelay": 90,
			"punishment": "none",
			"minVlbeforePunishment": 0
		},
		"badpackets2": {
			"enabled": true,
			"maxLength": 512,
			"punishment": "ban",
			"punishmentLength": "",
			"minVlbeforePunishment": 1
		},
		"badpackets3": {
			"enabled": true,
			"punishment": "ban",
			"punishmentLength": "",
			"minVlbeforePunishment": 1
		},
		"badpackets4": {
			"enabled": true,
			"punishment": "ban",
			"punishmentLength": "",
			"minVlbeforePunishment": 1
		},
		"fastuseA": {
			"enabled": true,
			"min_use_delay": 10,
			"max_use_delay": 130,
			"punishment": "none",
			"minVlbeforePunishment": 0
		},
		"flyA": {
			"enabled": false,
			"punishment": "none",
			"minVlbeforePunishment": 0
		},
		/*
		"flyB": {
			"enabled": true,
			"punishment": "none",
			"minVlbeforePunishment": 0
		},
		*/
		// This should only be enabled if your realm/server is being targetted by advanced hacking groups
		"instabreakA": {
			"enabled": false,
			"unbreakable_blocks": [
				"minecraft:bedrock",
				"minecraft:end_portal",
				"minecraft:end_portal_gateway",
				"minecraft:barrier",
				"minecraft:command_block",
				"minecraft:chain_command_block",
				"minecraft:repeating_command_block",
				"minecraft:end_gateway",
				"minecraft:light_block"
			],
			"punishment": "kick",
			"minVlbeforePunishment": 1
		},
		"invalidsprintA": {
			"enabled": true,
			"punishment": "none",
			"minVlbeforePunishment": 0
		},
		"inventorymodsB": {
			"enabled": false,
			"punishment": "none",
			"minVlbeforePunishment": 0
		},
		"killauraA": {
			"enabled": true,
			"rightTicks": 3,
			"punishment": "none",
			"minVlbeforePunishment": 0
		},
		"killauraB": {
			"enabled": true,
			// Wait 2 seconds before checking if the player has swinged
			"wait_ticks": 40,
			"max_swing_delay": 5000,
			"punishment": "none",
			"minVlbeforePunishment": 0
		},
		"killauraC": {
			"enabled": true,
			// It is only possible to attack one entity per tick, but incase of lag someone may be able to attack two entites at once.
			"entities": 3,
			"punishment": "none",
			"minVlbeforePunishment": 0
		},
		"killauraD": {
			"enabled": true,
			"punishment": "none",
			"minVlbeforePunishment": 0
		},
		"killauraE": {
			"enabled": true,
			"punishment": "none",
			"minVlbeforePunishment": 0
		},
		"namespoofA": {
			"enabled": true,
			"minNameLength": 3,
			"maxNameLength": 16,
			"punishment": "kick",
			"minVlbeforePunishment": 1
		},
		"namespoofB": {
			"enabled": true,
			// This should be a string.
			"regex": "/[^A-Za-z0-9_\\-() ]/",
			"punishment": "kick",
			"minVlbeforePunishment": 1
		},
		"noslowA": {
			"enabled": true,
			"speed": 0.12,
			"maxSpeed": 0.28,
			"punishment": "none",
			"minVlbeforePunishment": 0
		},
		"nukerA": {
			"enabled": false,
			"maxBlocks": 3,
			"punishment": "none",
			"minVlbeforePunishment": 0
		},
		"reachA": {
			"enabled": true,
			"reach": 6,
			"excluded_entities": [
				"minecraft:enderman",
				"minecraft:fireball",
				"minecraft:ender_dragon",
				"minecraft:ghast",
				"minecraft:wind_charge_projectile"
			],
			"excluded_items": [
				"minecraft:trident",
				"minecraft:mace"
			],
			"punishment": "none",
			"minVlbeforePunishment": 0
		},
		"spammerA": {
			"enabled": true,
			"punishment": "none",
			"minVlbeforePunishment": 0
		},
		"spammerB": {
			"enabled": true,
			"punishment": "none",
			"minVlbeforePunishment": 0
		},
		"spammerC": {
			"enabled": true,
			"punishment": "none",
			"minVlbeforePunishment": 0
		},
		"spammerD": {
			"enabled": true,
			"punishment": "none",
			"minVlbeforePunishment": 0
		},
		"spammerE": {
			"enabled": true,
			// How fast players can send messages in milliseconds
			"messageRatelimit": 500,
			// If a warning message should be sent to the spammer
			"sendWarningMessage": true,
			"punishment": "none",
			"minVlbeforePunishment": 0
		},
		"scaffoldA": {
			"enabled": true,
			"max_y_pos_diff": 0.35,
			"punishment": "none",
			"minVlbeforePunishment": 0
		},
		"scaffoldB": {
			"enabled": true,
			"punishment": "none",
			"minVlbeforePunishment": 0
		},
		"scaffoldC": {
			"enabled": true,
			// Checks if the player's x rot is higher than this
			"min_x_rot": 5,
			"punishment": "none",
			"minVLbeforePunishment": 0
		},
		"scaffoldD": {
			"enabled": true,
			"punishment": "none",
			"minVLbeforePunishment": 0,
		},
		"scaffoldE": {
			"enabled": true,
			"punishment": "none",
			"minVLbeforePunishment": 0,
		}
	},
	"misc_modules": {
		"antiArmorStandCluster": {
			"enabled": true,
			"radius": 5,
			"max_armor_stand_count": 50
		},
		"antiGamemode": {
			"enabled": false,
			"blockedGamemodes": [
				/*
				Example:

				creative,
				spectator,
				adventure
				*/
			]
		},
		"filterUnicodeChat": {
			"enabled": false
		},
		"itemSpawnRateLimit": {
			"enabled": false,
			"entitiesBeforeRateLimit": 45
		},
		"welcomeMessage": {
			"enabled": false,
			// You can use [@player] to mention the player name
			"message": "Welcome [@player] to our server!"
		},
		"worldborder": {
			"enabled": false,
			"max_x": 10000,
			"max_z": 10000
		},
		"oreAlerts": {
			"enabled": false,
			"blocks": [
				"minecraft:diamond_ore",
				"minecraft:deepslate_diamond_ore",
				"minecraft:ancient_debris"
			]
		}
	}
};
