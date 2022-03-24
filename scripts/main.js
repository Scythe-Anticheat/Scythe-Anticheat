import * as Minecraft from "mojang-minecraft";
import { flag, banMessage} from "./util.js";
import { commandHandler } from "./commands/handler.js";
import config from "./data/config.js";
import { banList } from "./data/globalban.js";

const World = Minecraft.world;

var loaded = false;

if (config.debug) console.warn(`${new Date()} | Im not a dumbass and this actually worked :sunglasses:`);

World.events.beforeChat.subscribe(msg => {
    const message = msg.message.toLowerCase();
    const player = msg.sender;

    if (config.debug && message === "ping") console.warn(`${new Date()} | Pong!`);

    if (message.includes("the best minecraft bedrock utility mod")) msg.cancel = true;

    // BadPackets/2 = chat message length check
    if (config.modules.badpackets2.enabled && message.length > config.modules.badpackets2.maxlength || message.length < config.modules.badpackets2.minLength) flag(player, "BadPackets", "2", "messageLength", message.length, false, msg);

    // Spammer/A = checks if someone sends a message while moving and on ground
    if (config.modules.spammerA.enabled && player.hasTag('moving') && player.hasTag('ground') && !player.hasTag('jump'))
        flag(player, "Spammer", "A", "Movement", false, false, true, msg);

    // Spammer/B = checks if someone sends a message while swinging their hand
    if (config.modules.spammerB.enabled && player.hasTag('left'))
        flag(player, "Spammer", "B", "Combat", false, false, false, msg);

    // Spammer/C = checks if someone sends a message while using an item
    if (config.modules.spammerC.enabled && player.hasTag('right'))
        flag(player, "Spammer", "C", "Misc", false, false, false, msg);

    // Spammer/D = checks if someone sends a message while having a GUI open
    if (config.modules.spammerD.enabled && player.hasTag('hasGUIopen'))
        flag(player, "Spammer", "D", "Misc", false, false, false, msg);

    commandHandler(player, msg);

    // add's user custom tags to their messages if it exists or we fall back
    // also filter for non ASCII characters and remove them in messages
    if (player.name && player.name !== player.nameTag && !msg.cancel) {
        player.runCommand(`tellraw @a {"rawtext":[{"text":"<${player.nameTag}> ${msg.message.replace(/[^\x00-\xFF]/g, "").replace(/"/g, "").replace(/\\/g, "")}"}]}`);
        msg.cancel = true;
    } else if (player.name && player.name === player.nameTag && !msg.cancel && config.modules.filterUnicodeChat) {
        player.runCommand(`tellraw @a {"rawtext":[{"text":"<${player.nameTag}> ${msg.message.replace(/[^\x00-\xFF]/g, "").replace(/"/g, "").replace(/\\/g, "")}"}]}`);
        msg.cancel = true;
    }
});

World.events.tick.subscribe(() => {
    // run as each player
    for (let player of World.getPlayers()) {
        if (banList.includes(player.name)) {
            player.addTag(`"by:Scythe Anticheat"`);
            player.addTag(`"reason:You are Scythe Anticheat global banned!"`);
            player.addTag(`isBanned`);
        }

        // sexy looking ban message
        if(player.hasTag("isBanned")) banMessage(player);

        // Crasher/A = invalid pos check
        if (config.modules.crasherA.enabled && Math.abs(player.location.x) > 30000000 ||
            Math.abs(player.location.y) > 30000000 || Math.abs(player.location.z) > 30000000) flag(player, "Crasher", "A", "Exploit", false, false, true);

        // Namespoof/A = username length check.
        if (config.modules.namespoofA.enabled) {
            try {
                // checks if 2 players are logged in with the same name
                // minecraft adds a sufix to the end of the name which we detect
                if(player.name.endsWith(')') && (player.name.length > config.modules.namespoofA.maxNameLength + 3 || player.name.length < config.modules.namespoofA.minNameLength))
                    flag(player, "Namespoof", "A", "Exploit", "nameLength", player.name.length);

                if(!player.name.endsWith(')') && (player.name.length < config.modules.namespoofA.minNameLength || player.name.length > config.modules.namespoofA.maxNameLength))
                    flag(player, "Namespoof", "A", "Exploit", "nameLength", player.name.length);
            } catch {}
        }

        // Namespoof/B = regex check
        try {
            if (config.modules.namespoofB.enabled && config.modules.namespoofB.regex.test(player.name)) flag(player, "Namespoof", "B", "Exploit");
        } catch {}

        // player position shit
        if(player.hasTag("moving")) {
            try {
                player.runCommand(`scoreboard players set @s xPos ${Math.floor(player.location.x)}`);
                player.runCommand(`scoreboard players set @s yPos ${Math.floor(player.location.y)}`);
                player.runCommand(`scoreboard players set @s zPos ${Math.floor(player.location.z)}`);
            } catch {}
        }

        if(config.modules.bedrockValidate.enabled) {
            try {
                player.runCommand("testfor @s[scores={bedrock=1..}]");
                if (config.modules.bedrockValidate.overworld && player.dimension === World.getDimension("overworld")) {
                    try {
                        player.runCommand(`fill ~-20 -64 ~-20 ~20 -64 ~20 bedrock`);
                    } catch {}

                    try {
                        player.runCommand(`fill ~-4 -59 ~-4 ~4 319 ~4 air 0 replace bedrock`);
                    } catch {}
                }

                if (config.modules.bedrockValidate.nether && player.dimension === World.getDimension("nether")) { 
                    try {
                        player.runCommand(`fill ~-10 0 ~-10 ~10 0 ~10 bedrock`);
                    } catch {}
                    try {
                        player.runCommand(`fill ~-10 127 ~-10 ~10 127 ~10 bedrock`);
                    } catch {}
                    try {
                        player.runCommand(`fill ~-5 5 ~-5 ~5 120 ~5 air 0 replace bedrock`);
                    } catch {}
                }
            } catch{}
        }

        // if (config.debug) console.warn(`${new Date()} | ${player.name}'s speed: ${Math.sqrt(player.velocity.x**2 + player.velocity.z**2).toFixed(4)} Vertical Speed: ${player.velocity.y.toFixed(4)}`);

        // reach/a
        if (config.modules.reachA.enabled && player.hasTag('attack')) {
            try {                                                                   // we could use r=4 but that wont account for lag
                player.runCommand(`execute @s[m=!c] ~~~ testfor @p[name=!"${player.nameTag}",r=${config.modules.reachA.reach}]`);
            } catch {
                try {
                    player.runCommand(`execute @s[m=!c] ~~~ function checks/alerts/reach`);
                } catch {}
            }
        }

        // NoSlow/A = speed limit check
        if(config.modules.noslowA.enabled && Math.sqrt(Math.abs(player.velocity.x**2 + player.velocity.z**2)).toFixed(2) >= config.modules.noslowA.speed && Math.sqrt(Math.abs(player.velocity.x**2 + player.velocity.z**2)).toFixed(2) <= config.modules.noslowA.maxSpeed) {
            if (!player.getEffect(Minecraft.MinecraftEffectTypes.speed) && player.hasTag('moving') && player.hasTag('right') && player.hasTag('ground') && !player.hasTag('jump') && !player.hasTag('gliding') && !player.hasTag('swimming')) {
                try {
                    player.runCommand("testfor @s[scores={right=5..}]");
                    flag(player, "NoSlow", "A", "Movement", "speed", Math.sqrt(Math.abs(player.velocity.x **2 + player.velocity.z **2)).toFixed(3), true);
                } catch {}
            }
        }

        if(config.modules.illegalitemsC.enabled || config.modules.illegalitemsD.enabled) {
            let container = player.getComponent('inventory').container;
            for (let i = 0; i < container.size; i++) if (container.getItem(i)) {
                let item = container.getItem(i);
                // Illegalitems/C = item stacked over 64 check
                if(config.modules.illegalitemsC.enabled && item.amount > config.modules.illegalitemsC.maxStack)
                    flag(player, "IllegalItems", "C", "Exploit", "stack", item.amount);
                
                // Illegalitems/D = additional item clearing check
                if (config.modules.illegalitemsD.enabled && config.modules.illegalitemsD.illegalItems.includes(item.id))
                    flag(player, "IllegalItems", "D", "Exploit", "item", item.id);
                // badenchants/a

                // this enchant magic will come soon
                /*
                let enchants = item.getComponent("enchantments").enchantments;

                for(let e of enchants) {
                    console.warn(e);
                }
                */
            }
        }

        // invalidsprint/a = checks for sprinting with the blindness effect
        if (config.modules.invalidsprintA.enabled && player.getEffect(Minecraft.MinecraftEffectTypes.blindness) && player.hasTag('sprint'))
            flag(player, "InvalidSprint", "A", "Movement", false, false, true);

        player.blocksBroken = 0;

        // fly/a
        if(config.modules.flyA.enabled && Math.abs(player.velocity.y).toFixed(4) == 0.1552 && !player.hasTag("jump") && !player.hasTag("gliding") && !player.hasTag("riding") && !player.hasTag("levitating") && player.hasTag("ground") && player.hasTag("moving")) {
            try {
                player.runCommand("execute @s ~~~ detect ~~~ air -1 execute @s ~~~ detect ~1~~ air -1 execute @s ~~~ detect ~~~1 air -1 execute @s ~~~ detect ~1~~1 air -1 execute @s ~~~ detect ~-1~~ air -1 execute @s ~~~ detect ~~~-1 air -1 execute @s ~~~ detect ~-1~~-1 air -1 execute @s ~~~ detect ~1~~-1 air -1 testforblock ~-1~~1 air -1");
                flag(player, "Fly", "A", "Movement", "vertical_speed", Math.abs(player.velocity.y).toFixed(4), true);
            } catch {}
        }
    }
});

World.events.blockPlace.subscribe(block => {
    if(config.debug) console.warn(`${block.player.nameTag} has placed ${block.block.id}`);
});

World.events.blockBreak.subscribe(block => {
    if(config.debug) console.warn(`${block.player.nameTag} has broken the block ${block.brokenBlockPermutation.type.id}`);

    // nuker/a = checks if a player breaks more than 2 blocks in a tick
    if(config.modules.nukerA.enabled) {
        if(!block.player.blocksBroken) block.player.blocksBroken = 0;
        block.player.blocksBroken++;

        if(block.player.blocksBroken > config.modules.nukerA.maxBlocks) {
            flag(block.player, "Nuker", "A", "Misc", "blocksBroken", block.player.blocksBroken);

            block.block.setPermutation(block.brokenBlockPermutation);
        }
    }

    // liquidinteract/a = checks if a player breaks a liquid source block
    if(config.modules.liquidinteractA.enabled) {
        if(config.modules.liquidinteractA.liquids.includes(block.brokenBlockPermutation.type.id)) {
            flag(block.player, "LiquidInteract", "A", "Misc", "block", block.brokenBlockPermutation.type.id);
            block.block.setPermutation(block.brokenBlockPermutation);
        }
    }
});

World.events.beforeItemUseOn.subscribe(block => {
    if(config.modules.commandblockexploitF.enabled && config.modules.commandblockexploitF.bannedBlocks.includes(block.item.id)) {
        flag(block.source, "CommandBlockExploit","F", "Exploit", "block", block.item.id, false, false, block.source.selectedSlot);
        block.cancel = true;
    }
});

World.events.playerJoin.subscribe(player => {
    if(!loaded) {
        try {
            World.getDimension("overworld").runCommand(`scoreboard players set scythe:config gametestapi 1`);
            World.getDimension("overworld").runCommand(`scoreboard players operation @a gametestapi = scythe:config gametestapi`);
            loaded = true;
        } catch {}
    }

    // fix a disabler method
    player.player.nameTag = player.player.nameTag.replace(/"|\\/g, "");

    // load custom nametag
    player.player.getTags().forEach(t => {
        if(t.replace(/"|\\/g, "").startsWith("tag:")) {
            player.player.nameTag = `§8[§r${t.replace(/"|\\/g, "").slice(4)}§8]§r ${player.player.name}`;
        }
    });
});