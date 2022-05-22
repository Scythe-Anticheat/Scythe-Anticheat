export default
{
    "debug": true,
    "customcommands": {
        "prefix": "!",
        "ban": true,
        "help": true,
        "op": true,
        "credits": true,
        "allowgma": true,
        "allowgmc": true,
        "allowgms": true,
        "bedrockvalidate": true,
        "modules": true,
        "npc": true,
        "overidecommandblocksenabled": true,
        "removecommandblocks": true,
        "worldborder": true,
        "xray": true,
        "autoclicker": true,
        "autoban": true,
        "invalidsprint": true,
        "ecwipe": true,
        "freeze": true,
        "stats": true,
        "fullreport": true,
        "kick": true,
        "mute": true,
        "unmute": true,
        "fly": true,
        "invsee": true,
        "notify": true,
        "tag": true,
        "vanish": true,
        "report": true,
        "unban": true,
        "gui": true
    },
    "modules": {
        "itemSpawnRateLimit": {
            "enabled": false,
            "entitiesBeforeRateLimit": 10
        },
        "filterUnicodeChat": false,
        "badpackets2": {
            "enabled": true,
            "minLength": 1,
            "maxlength": 512,
            "punishment": "none",
            "minVlbeforeBan": 0
        },
        "spammerA": {
            "enabled": true,
            "punishment": "none",
            "minVlbeforeBan": 0
        },
        "spammerB": {
            "enabled": true,
            "punishment": "none",
            "minVlbeforeBan": 0
        },
        "spammerC": {
            "enabled": true,
            "punishment": "none",
            "minVlbeforeBan": 0
        },
        "spammerD": {
            "enabled": true,
            "punishment": "none",
            "minVlbeforeBan": 0
        },
        "crasherA": {
            "enabled": true,
            "punishment": "ban",
            "minVlbeforeBan": 1
        },
        "namespoofA": {
            "enabled": true,
            "minNameLength": 3,
            "maxNameLength": 16,
            "punishment": "kick",
            "minVlbeforeBan": 0
        },
        "namespoofB": {
            "enabled": true,
            "regex": /[^A-Za-z0-9_\-() ]/,
            "punishment": "kick",
            "minVlbeforeBan": 0
        },
        "bedrockValidate": {
            "enabled": true,
            "overworld": true,
            "nether": true
        },
        "reachA": {
            "enabled": true,
            "reach": 4.5,
            "punishment": "none",
            "minVlbeforeBan": 0
        },
        "noslowA": {
            "enabled": true,
            "speed": 0.12,
            "maxSpeed": 0.16,
            "punishment": "none",
            "minVlbeforeBan": 0
        },
        "illegalitemsC": {
            "enabled": true,
            "maxStack": 64,
            "punishment": "ban",
            "minVlbeforeBan": 1
        },
        "invalidsprintA": {
            "enabled": true,
            "punishment": "none",
            "minVlbeforeBan": 0
        },
        "illegalitemsD": {
            "enabled": true,
            "illegalItems": [
                "minecraft:beehive",
                "minecraft:bee_nest",
                "minecraft:moving_block"
            ],
            "punishment": "ban",
            "minVlbeforeBan": 3
        },
        "commandblockexploitF": {
            "enabled": true,
            "bannedBlocks": [
                "minecraft:beehive",
                "minecraft:bee_nest",
                "minecraft:moving_block",
                "minecraft:axolotl_bucket",
                "minecraft:cod_bucket",
                "minecraft:powder_snow_bucket",
                "minecraft:pufferfish_bucket",
                "minecraft:salmon_bucket",
                "minecraft:tropical_fish_bucket",
                "minecraft:tadpole_bucket"
            ],
            "punishment": "ban",
            "minVlbeforeBan": 1
        },
        "nukerA": {
            "enabled": true,
            "maxBlocks": 3,
            "punishment": "none",
            "minVlbeforeBan": 0
        },
        "liquidinteractA": {
            "enabled": true,
            "liquids": [
                "minecraft:water",
                "minecraft:flowing_water",
                "minecraft:lava",
                "minecraft:flowing_lava"
            ],
            "punishment": "ban",
            "minVlbeforeBan": 1
        },
        "flyA": {
            "enabled": false,
            "punishment": "none",
            "minVlbeforeBan": 0
        },
        "illegalitemsE": {
            "enabled": true,
            "clearElements": true,
            "obtainable_items" : [
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
                "minecraft:frosted_ice"
            ],
            "unobtainable_items" : [
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
                "minecraft_ice_bomb",
                "minecraft:medicine",
                "minecraft:sparkler",
                "minecraft:glow_stick",
                "minecraft:compound",
                "minecraft:powder_snow",
                "minecraft:sweat_berry_bush",
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
                "minecraft:spawn_egg",
                "minecraft:npc_spawn_egg"
            ],
            "punishment": "ban",
            "minVlbeforeBan": 1
        },
        "commandblockexploitG": {
            "enabled": true,
            "npc": true,
            "entities": [
                "minecraft:command_block_minecart"
            ],
            "punishment": "none",
            "minVlbeforeBan": 0
        },
        "badenchantsA": {
            "enabled": true,
            "punishment": "none",
            "minVlbeforeBan": 0
        },
        "badenchantsB": {
            "enabled": true,
            "minLevel": 0,
            "punishment": "none",
            "minVlbeforeBan": 0
        },
        "badenchantsC": {
            "enabled": true,
            "punishment": "none",
            "minVlbeforeBan": 0
        },
        "badenchantsD": {
            "enabled": true,
            "exclusions": [
                "(+DATA)"
            ],
            "punishment": "none",
            "minVlbeforeBan": 0
        },
        "killauraC": {
            "enabled": true,
            "entities": 2,
            "punishment": "none",
            "minVlbeforeBan": 0
        },
        "illegalitemsF": {
            "enabled": true,
            "length": 32,
            "punishment": "none",
            "minVlbeforeBan": 0
        },
        "badpackets3": {
            "enabled": true,
            "punishment": "ban",
            "minVlbeforeBan": 1
        },
        "autoclickerA": {
            "enabled": true,
            "maxCPS": 12,
            "checkCPSAfter": 1000,
            "punishment": "none",
            "minVlbeforeBan": 0
        }
    }
};