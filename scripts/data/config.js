export default
{
    "debug": true,
    "customcommands": {
        "prefix": "!",
        "ban": true,
        "clearchat": true,
        "help": true,
        "op": true,
        "credits": true,
        "allowgma": true,
        "allowgmc": true,
        "allowgms": true,
        "bedrockvalidate": true,
        "modules": true,
        "nofrostwalker": true,
        "npc": true,
        "overidecommandblocksenabled": true,
        "removecommandblocks": true,
        "worldborder": true,
        "xray": true,
        "autoclicker": true,
        "jesus": true,
        "phase": true,
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
        "vanish": true
    },
    "modules": {
        "badpackets2": {
            "enabled": true,
            "minLength": 1,
            "maxlength": 512
        },
        "spammerA": {
            "enabled": true
        },
        "spammerB": {
            "enabled": true
        },
        "spammerC": {
            "enabled": true
        },
        "spammerD": {
            "enabled": true
        },
        "crasherA": {
            "enabled": true
        },
        "namespoofA": {
            "enabled": true,
            "minNameLength": 3,
            "maxNameLength": 16
        },
        "namespoofB": {
            "enabled": true,
            "regex": "/[^A-Za-z0-9_ ]/"
        },
        "bedrockValidate": {
            "enabled": true,
            "overworld": true,
            "nether": true
        },
        "reachA": {
            "enabled": true,
            "reach": 4.5
        },
        "jesusB": {
            "enabled": true,
            "minMotion": 0.0247,
            "maxMotion": 0.0269
        },
        "noslowA": {
            "enabled": true,
            "speed": 0.117
        },
        "illegalitemsC": {
            "enabled": true,
            "maxStack": 64
        },
        "invalidsprintA": {
            "enabled": true
        },
        "flyA": {
            "enabled": true
        },
        "illegalitemsD": {
            "enabled": true,
            "illegalItems": [
                "minecraft:movingblock"
            ]
        }
    }
};