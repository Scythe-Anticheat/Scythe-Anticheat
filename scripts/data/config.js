export default
{
	"debug": true,
	"flagWhitelist": [],
	/*
	By enabling this toggle, you can prevent anybody will scythe op from getting flagged from the anticheat
	Although this may be a useful feature, it can be exploited by hackers to completely disable the anticheat for themselves.
	Enable with caution.
	*/
	"disable_flags_from_scythe_op": false,
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
		"antigma": {
			"enabled": true,
			"requiredTags": ["op"],
			"aliases": ["allowgma","agma"]
		},
		"antigmc": {
			"enabled": true,
			"requiredTags": ["op"],
			"aliases": ["allowgmc","agmc"]
		},
		"antigms": {
			"enabled": true,
			"requiredTags": ["op"],
			"aliases": ["allowgms","agms"]
		},
		"modules": {
			"enabled": true,
			"requiredTags": ["op"]
		},
		"npc": {
			"enabled": true,
			"requiredTags": ["op"]
		},
		"overridecommandblocksenabled": {
			"enabled": true,
			"requiredTags": ["op"],
			"aliases": ["overridecbe","overridecommandblocksenabled","ocbe"]
		},
		"removecommandblocks": {
			"enabled": true,
			"requiredTags": ["op"],
			"aliases": ["removecb","rcb"]
		},
		"worldborder": {
			"enabled": true,
			"requiredTags": ["op"],
			"aliases": ["wb"]
		},
		"autoban": {
			"enabled": true,
			"requiredTags": ["op"],
			"aliases": ["ab"]
		},
		"invalidsprint": {
			"enabled": true,
			"requiredTags": ["op"],
			"aliases": ["is"]
		},
		"ecwipe": {
			"enabled": true,
			"requiredTags": ["op"],
			"aliases": ["enderchestwipe", "ecw"]
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
			"aliases": ["ub"]
		},
		"ui": {
			"enabled": true,
			"ui_item_name": "§r§l§aRight click to Open the UI",
			"ui_item": "minecraft:wooden_axe",
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
			// If this is enabled, then all players can see who disabled the chat globally
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
	},
	"modules": {
		"exampleA": {
			// If the check should be enabled or not.
			"enabled": true,
			// The punishment. Can either be "none", "mute", "kick" or "ban"
			"punishment": "ban",
			// PunishmentLength can be either a length ('7d', '2w 1h'), how long the ban should be in milliseconds
			// or to just perm ban the user (set value to nothing).
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
		"autotoolA": {
			"enabled": true,
			"startBreakDelay": 90,
			"punishment": "none",
			"minVlbeforePunishment": 0
		},
		"badenchantsA": {
			"enabled": true,
			"levelExclusions": {
				/*
				If your realm uses enchantments with levels higher then vanilla then you need to exclude them here.
				To add an exclusion, add ' "<enchantment name>": <max level> ' below the examples
				Anything in this area will be considered as a comment, and wont take effect,

				"efficiency": 69,
				"sharpness": 420
				*/
			},
			"punishment": "kick",
			"minVlbeforePunishment": 1
		},
		"badenchantsB": {
			"enabled": true,
			"multi_protection": true,
			"punishment": "kick",
			"minVlbeforePunishment": 1
		},
		"badenchantsC": {
			"enabled": true,
			"punishment": "kick",
			"minVlbeforePunishment": 1
		},
		"badenchantsD": {
			"enabled": true,
			"exclusions": [
				"(+DATA)"
			],
			"punishment": "none",
			"minVlbeforePunishment": 0
		},
		"badenchantsE": {
			"enabled": true,
			"punishment": "kick",
			"minVlbeforePunishment": 1
		},
		/*
		// This hack has been entirely patched out
		"badpackets2": {
			"enabled": true,
			"minLength": 1,
			"maxlength": 512,
			"punishment": "ban",
			"punishmentLength": ""
		},
		*/
		"badpackets3": {
			"enabled": true,
			"punishment": "ban",
			"punishmentLength": "",
			"minVlbeforePunishment": 1
		},
		/*
		// This hack has been entirely patched out
		"badpackets4": {
			"enabled": true,
			"punishment": "kick",
			"minVlbeforePunishment": 1
		},
		*/
		"commandblockexploitF": {
			"enabled": true,
			"punishment": "ban",
			"punishmentLength": "",
			"minVlbeforePunishment": 1
		},
		"commandblockexploitG": {
			"enabled": true,
			"npc": true,
			"entities": [
				"minecraft:command_block_minecart",
				"minecraft:agent",
				"minecraft:balloon",
				"minecraft:ice_bomb",
				"minecraft:tripod_camera"
			],
			// Checks if a certain type of block is near where the entity summoned
			// This helps against more advanced bypasses
			"blockSummonCheck": [
				"minecraft:beehive",
				"minecraft:bee_nest",
				"minecraft:dispenser"
			],
			"punishment": "kick",
			"minVlbeforePunishment": 0
		},
		"commandblockexploitH": {
			"enabled": true,
			"punishment": "kick",
			"minVlbeforePunishment": 1
		},
		/*
		// This hack has been entirely patched out
		"crasherA": {
			"enabled": false,
			"punishment": "ban",
			"punishmentLength": "",
			"minVlbeforePunishment": 1
		},
		*/
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
		"flyB": {
			"enabled": true,
			"punishment": "none",
			"minVlbeforePunishment": 0
		},
		"illegalitemsB": {
			"enabled": true,
			"punishment": "none",
			"minVlbeforePunishment": 0
		},
		"illegalitemsC": {
			"enabled": true,
			"punishment": "none",
			"minVlbeforePunishment": 0
		},
		"illegalitemsD": {
			"enabled": true,
			"punishment": "none",
			"minVlbeforePunishment": 0
		},
		"illegalitemsE": {
			"enabled": true,
			"punishment": "ban",
			"punishmentLength": "",
			"minVlbeforePunishment": 1
		},
		"illegalitemsF": {
			"enabled": true,
			"length": 33,
			"punishment": "none",
			"minVlbeforePunishment": 0
		},
		"illegalitemsH": {
			"enabled": true,
			"punishment": "none",
			"minVlbeforePunishment": 0
		},
		"illegalitemsI": {
			"enabled": true,
			"exclude_scythe_op": true,
			"container_blocks": [
				"minecraft:chest",
				"minecraft:trapped_chest",
				"minecraft:barrel",
				"minecraft:beacon",
				"minecraft:blast_furnace",
				"minecraft:brewing_stand",
				"minecraft:dispenser",
				"minecraft:dropper",
				"minecraft:hopper",
				"minecraft:jukebox",
				"minecraft:lectern",
				"minecraft:smoker"
			],
			"punishment": "none",
			"minVlbeforePunishment": 0
		},
		"illegalitemsJ": {
			"enabled": true,
			"exclude_scythe_op": true,
			"punishment": "none",
			"minVlbeforePunishment": 0
		},
		"illegalitemsK": {
			"enabled": true,
			"exclude_scythe_op": true,
			"entities": [
				"minecraft:chest_boat",
				"minecraft:chest_minecart"
			],
			"punishment": "none",
			"minVlbeforePunishment": 0
		},
		"illegalitemsL": {
			"enabled": true,
			"punishment": "none",
			"minVlbeforePunishment": 0
		},
		"illegalitemsN": {
			"enabled": true,
			"punishment": "none",
			"minVlbeforePunishment": 0
		},
		"instabreakA": {
			"enabled": true,
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
		"killauraC": {
			"enabled": true,
			"entities": 2,
			"punishment": "none",
			"minVlbeforePunishment": 0
		},
		"killauraD": {
			"enabled": true,
			"punishment": "none",
			"minVlbeforePunishment": 0
		},
		"namespoofA": {
			"enabled": false,
			"minNameLength": 3,
			"maxNameLength": 16,
			"punishment": "kick",
			"minVlbeforePunishment": 1
		},
		"namespoofB": {
			"enabled": false,
			"punishment": "kick",
			"minVlbeforePunishment": 1
		},
		"noslowA": {
			"enabled": true,
			"speed": 0.12,
			"maxSpeed": 0.16,
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
			"entities_blacklist": [
				"minecraft:enderman",
				"minecraft:fireball",
				"minecraft:ender_dragon",
				"minecraft:ghast"
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
		"towerA": {
			"enabled": true,
			"max_y_pos_diff": 0.35,
			"punishment": "none",
			"minVlbeforePunishment": 0
		},
		"xrayA": {
			"enabled": true,
			"punishment": "none",
			"minVlbeforePunishment": 0
		}
	},
	"misc_modules": {
		"antiArmorStandCluster": {
			"enabled": true,
			"radius": 5,
			"max_armor_stand_count": 50
		},
		"filterUnicodeChat": {
			"enabled": false
		},
		"itemSpawnRateLimit": {
			"enabled": false,
			"entitiesBeforeRateLimit": 45
		},
		/*
        Enabling this module is highly discouraged, as it breaks items names, enchantments, durability
        and item data relating to it.
        These items can contain large nbt data which can cause the world file size to dramatically increase.
        In anarchy environments, this module can help greatly to prevent world corruption.
        Your welcome, Carthe.
        */
		"resetItemData": {
			"enabled": false,
			"items": [
				"minecraft:armor_stand",
				"minecraft:barrel",
				"minecraft:blast_furnace",
				"minecraft:brewing_stand",
				"minecraft:campfire",
				"minecraft:soul_campfire",
				"minecraft:cauldron",
				"minecraft:chest",
				"minecraft:trapped_chest",
				"minecraft:dropper",
				"minecraft:flower_pot",
				"minecraft:hopper",
				"minecraft:frame",
				"minecraft:glow_frame",
				"minecraft:jukebox",
				"minecraft:lectern",
				"minecraft:chest_minecart",
				"minecraft:hopper_minecart",
				"minecraft:smoker",
				"minecraft:end_gateway",
				"minecraft:sponge"
			]
		}
	},
	"itemLists": {
		"spawnEggs": {
			"clearVanillaSpawnEggs": true,
			"clearCustomSpawnEggs": false
		},
		"elements": true,
		"xray_items": [
			"minecraft:diamond_ore",
			"minecraft:ancient_debris"
		],
		"cbe_items": [
			"minecraft:beehive",
			"minecraft:bee_nest",
			"minecraft:moving_block",
			"minecraft:axolotl_bucket",
			"minecraft:cod_bucket",
			"minecraft:powder_snow_bucket",
			"minecraft:pufferfish_bucket",
			"minecraft:salmon_bucket",
			"minecraft:tropical_fish_bucket",
			"minecraft:tadpole_bucket",
			"minecraft:dispenser"
		],
		"items_semi_illegal": [
			"minecraft:bedrock",
			"minecraft:end_portal_frame",
			"minecraft:dragon_egg",
			"minecraft:monster_egg",
			"minecraft:infested_deepslate",
			"minecraft:mob_spawner",
			"minecraft:budding_amethyst",
			"minecraft:command_block",
			"minecraft:repeating_command_block",
			"minecraft:chain_command_block",
			"minecraft:barrier",
			"minecraft:structure_block",
			"minecraft:structure_void",
			"minecraft:jigsaw",
			"minecraft:allow",
			"minecraft:deny",
			"minecraft:light_block",
			"minecraft:border_block",
			"minecraft:chemistry_table",
			"minecraft:frosted_ice",
			"minecraft:npc_spawn_egg",
			"minecraft:reinforced_deepslate",
			"minecraft:farmland"
		],
		"items_very_illegal": [
			"minecraft:flowing_water",
			"minecraft:water",
			"minecraft:flowing_lava",
			"minecraft:lava",
			"minecraft:fire",
			"minecraft:lit_furnace",
			"minecraft:standing_sign",
			"minecraft:wall_sign",
			"minecraft:lit_redstone_ore",
			"minecraft:unlit_redstone_ore",
			"minecraft:portal",
			"minecraft:unpowered_repeater",
			"minecraft:powered_repeater",
			"minecraft:pumpkin_stem",
			"minecraft:melon_stem",
			"minecraft:end_portal",
			"minecraft:lit_redstone_lamp",
			"minecraft:carrots",
			"minecraft:potatoes",
			"minecraft:unpowered_comparator",
			"minecraft:powered_comparator",
			"minecraft:double_wooden_slab",
			"minecraft:standing_banner",
			"minecraft:wall_banner",
			"minecraft:daylight_detector_inverted",
			"minecraft:chemical_heat",
			"minecraft:underwater_torch",
			"minecraft:end_gateway",
			"minecraft:stonecutter",
			"minecraft:glowingobsidian",
			"minecraft:netherreactor",
			"minecraft:bubble_column",
			"minecraft:bamboo_sapling",
			"minecraft:spruce_standing_sign",
			"minecraft:spruce_wall_sign",
			"minecraft:birch_standing_sign",
			"minecraft:birch_wall_sign",
			"minecraft:jungle_standing_sign",
			"minecraft:jungle_wall_sign",
			"minecraft:acacia_standing_sign",
			"minecraft:acacia_wall_sign",
			"minecraft:darkoak_standing_sign",
			"minecraft:darkoak_wall_sign",
			"minecraft:lit_smoker",
			"minecraft:lava_cauldron",
			"minecraft:soul_fire",
			"minecraft:crimson_standing_sign",
			"minecraft:crimson_wall_sign",
			"minecraft:warped_standing_sign",
			"minecraft:warped_wall_sign",
			"minecraft:blackstone_double_slab",
			"minecraft:polished_blackstone_brick_double_slab",
			"minecraft:polished_blackstone_double_slab",
			"minecraft:unknown",
			"minecraft:camera",
			"minecraft:reserved6",
			"minecraft:info_update",
			"minecraft:info_update2",
			"minecraft:lit_deepslate_redstone_ore",
			"minecraft:hard_stained_glass_pane",
			"minecraft:hard_stained_glass",
			"minecraft:colored_torch_rg",
			"minecraft:colored_torch_bp",
			"minecraft:balloon",
			"minecraft:ice_bomb",
			"minecraft:medicine",
			"minecraft:sparkler",
			"minecraft:glow_stick",
			"minecraft:compound",
			"minecraft:powder_snow",
			"minecraft:lit_blast_furnace",
			"minecraft:redstone_wire",
			"minecraft:crimson_double_slab",
			"minecraft:warped_double_slab",
			"minecraft:cobbled_deepslate_double_slab",
			"minecraft:polished_deepslate_double_slab",
			"minecraft:deepslate_tile_double_slab",
			"minecraft:deepslate_brick_double_slab",
			"minecraft:agent_spawn_egg",
			"minecraft:client_request_placeholder_block",
			"minecraft:rapid_fertilizer",
			"minecraft:hard_glass",
			"minecraft:hard_glass_pane",
			"minecraft:exposed_double_cut_copper_slab",
			"minecraft:oxidized_double_cut_copper_slab",
			"minecraft:waxed_double_cut_copper_slab",
			"minecraft:waxed_exposed_double_cut_copper_slab",
			"minecraft:waxed_oxidized_double_cut_copper_slab",
			"minecraft:waxed_weathered_double_cut_copper_slab",
			"minecraft:weathered_double_cut_copper_slab",
			"minecraft:double_wooden_slab",
			"minecraft:double_cut_copper_slab",
			"minecraft:invisible_bedrock",
			"minecraft:piston_arm_collision",
			"minecraft:sticky_piston_arm_collision",
			"minecraft:trip_wire",
			"minecraft:brewingstandblock",
			"minecraft:real_double_stone_slab",
			"minecraft:item.acacia_door",
			"minecraft:item.bed",
			"minecraft:item.beetroot",
			"minecraft:item.birch_door",
			"minecraft:item.cake",
			"minecraft:item.camera",
			"minecraft:item.campfire",
			"minecraft:item.cauldron",
			"minecraft:item.chain",
			"minecraft:item.crimson_door",
			"minecraft:item.dark_oak_door",
			"minecraft:item.flower_pot",
			"minecraft:item.frame",
			"minecraft:item.glow_frame",
			"minecraft:item.hopper",
			"minecraft:item.iron_door",
			"minecraft:item.jungle_door",
			"minecraft:item.kelp",
			"minecraft:item.nether_sprouts",
			"minecraft:item.nether_wart",
			"minecraft:item.reeds",
			"minecraft:item.skull",
			"minecraft:item.soul_campfire",
			"minecraft:item.spruce_door",
			"minecraft:item.warped_door",
			"minecraft:item.wheat",
			"minecraft:item.wooden_door",
			"minecraft:real_double_stone_slab3",
			"minecraft:real_double_stone_slab4",
			"minecraft:cave_vines",
			"minecraft:cave_vines_body_with_berries",
			"minecraft:cave_vines_head_with_berries",
			"minecraft:real_double_stone_slab2",
			"minecraft:spawn_egg",
			"minecraft:coral_fan_hang",
			"minecraft:coral_fan_hang2",
			"minecraft:coral_fan_hang3",
			"minecraft:cocoa",
			"minecraft:mangrove_standing_sign",
			"minecraft:item.mangrove_door",
			"minecraft:mangrove_wall_sign",
			"minecraft:mud_brick_double_slab",
			"minecraft:mangrove_double_slab",
			"minecraft:item.brewing_stand",
			"minecraft:double_stone_block_slab",
			"minecraft:bleach",
			"minecraft:double_stone_block_slab2",
			"minecraft:double_stone_block_slab3",
			"minecraft:double_stone_block_slab4",
			"minecraft:black_candle_cake",
			"minecraft:blue_candle_cake",
			"minecraft:brown_candle_cake",
			"minecraft:candle_cake",
			"minecraft:cyan_candle_cake",
			"minecraft:gray_candle_cake",
			"minecraft:green_candle_cake",
			"minecraft:light_blue_candle_cake",
			"minecraft:light_gray_candle_cake",
			"minecraft:lime_candle_cake",
			"minecraft:magenta_candle_cake",
			"minecraft:orange_candle_cake",
			"minecraft:pink_candle_cake",
			"minecraft:purple_candle_cake",
			"minecraft:red_candle_cake",
			"minecraft:sweet_berry_bush",
			"minecraft:unlit_redstone_torch",
			"minecraft:white_candle_cake",
			"minecraft:yellow_candle_cake"
		]
	}
};
