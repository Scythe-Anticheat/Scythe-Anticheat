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
        "unban": true
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
                "minecraft:mob_spawner",
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
                "minecraft:portal",
                "minecraft:end_portal",
                "minecraft:end_gateway",
                "minecraft:glowingobsidian",
                "minecraft:netherreactor",
                "minecraft:unknown",
                "minecraft:camera",
                "minecraft:reserved6",
                "minecraft:info_update",
                "minecraft:info_update2",
                "minecraft:client_request_placeholder_block",
                "minecraft:invisiblebedrock"
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
        }
    }
};