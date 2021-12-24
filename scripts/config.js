export default
{
    "debug": true,
    "customcommands": {
        "ban": true,
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
            "minMotion": 0.0246,
            "maxMotion": 0.027
        },
        "noslowA": {
            "enabled": true,
            "speed": 0.11
        },
        "illegalitemsC": {
            "enabled": true,
            "maxStack": 64
        },
        "invalidsprintA": {
            "enabled": true
        },
        "flyA": {
            "enabled": true,
            "yChange": 0.375
        }
    }
};