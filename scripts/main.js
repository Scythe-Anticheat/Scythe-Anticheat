import * as Minecraft from "mojang-minecraft";
import { flag, banMessage} from "./util.js";
import { commandHandler } from "./commands/handler.js";
import { banplayer } from "./data/globalban.js";
import config from "./data/config.js";

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
    if (config.modules.spammerA.enabled && player.hasTag('moving') && player.hasTag('ground') && !player.hasTag('jump')) {
        flag(player, "Spammer", "A", "Movement", false, false, true, msg);
    }

    // Spammer/B = checks if someone sends a message while swinging their hand
    if (config.modules.spammerB.enabled && player.hasTag('left')) {
        flag(player, "Spammer", "B", "Combat", false, false, false, msg);
    }

    // Spammer/C = checks if someone sends a message while using an item
    if (config.modules.spammerC.enabled && player.hasTag('right')) {
        flag(player, "Spammer", "C", "Misc", false, false, false, msg);
    }

    // Spammer/D = checks if someone sends a message while having a GUI open
    if (config.modules.spammerD.enabled && player.hasTag('hasGUIopen')) {
        flag(player, "Spammer", "D", "Misc", false, false, false, msg);
    }

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
    // Credits go out to mrpatches123#0348 for giving guidance to use tick events
    // to check when loaded in the world and to execute code afterwards
    try {
        if (!loaded) {
            const players = [...World.getPlayers()].map(player => player.nameTag);
            World.getDimension("overworld").runCommand(`testfor @a[name="${players[0]}"]`);
            try {
                World.getDimension("overworld").runCommand(`scoreboard players set scythe:config gametestapi 1`);
                World.getDimension("overworld").runCommand(`scoreboard players operation @a gametestapi = scythe:config gametestapi`);
                loaded = true;
            } catch {}
        }
    } catch {}
    
    // run as each player
    for (let player of World.getPlayers()) {
        // fix a disabler method
        player.nameTag = player.nameTag.replace(/"/g, "").replace(/\\/g, "");

        // Check global ban list and if the player who is joining is on the server then kick them out
        if (banplayer.some(code => JSON.stringify(code) === JSON.stringify({ name: player.nameTag }))) {
            player.addTag(`"by:Scythe Anticheat"`);
            player.addTag(`"reason:You are Scythe Anticheat global banned!"`);
            banMessage(player);
        }

        // sexy looking ban message
        if(player.hasTag("isBanned")) banMessage(player);

        // Crasher/A = invalid pos check
        if (config.modules.crasherA.enabled && Math.abs(player.location.x) > 30000000 ||
            Math.abs(player.location.y) > 30000000 || Math.abs(player.location.z) > 30000000) flag(player, "Crasher", "A", "Exploit", false, false, true, false, false, 3);

        // Namespoof/A = username length check.
        try {
            if (config.modules.namespoofA.enabled) {
                // checks if 2 players are logged in with the same name
                // minecraft adds a sufix to the end of the name which we detect
                if(player.name.endsWith(')') && ((player.name.length + 3) > config.modules.namespoofA.maxNameLength || player.name.length < config.modules.namespoofA.minNameLength))
                    flag(player, "Namespoof", "A", "Exploit", "nameLength", player.name.length);

                if(!player.name.endsWith(')') && (player.name.length < config.modules.namespoofA.minNameLength || player.name.length > config.modules.namespoofA.maxNameLength))
                    flag(player, "Namespoof", "A", "Exploit", "nameLength", player.name.length);
            }
        } catch {}

        // Namespoof/B = regex check
        try {
            if (config.modules.namespoofB.enabled && config.modules.namespoofB.regex.test(player.name)) flag(player, "Namespoof", "B", "Exploit", false, false, false, false);
        } catch {}

        // player position shit
        if(player.hasTag("moving")) {
            try {
                player.runCommand(`scoreboard players set @s xPos ${Math.floor(player.location.x)}`);
                player.runCommand(`scoreboard players set @s yPos ${Math.floor(player.location.y)}`);
                player.runCommand(`scoreboard players set @s zPos ${Math.floor(player.location.z)}`);
            } catch {}
        }

        if (config.modules.bedrockValidate.enabled && config.modules.bedrockValidate.overworld && player.dimension === World.getDimension("overworld")) {
            try {
                // only run the rest of the commands if the player is in the overworld
                World.getDimension("overworld").runCommand(`testfor @a[name="${player.nameTag}",rm=0,scores={bedrock=1..}]`);
                try {
                    player.runCommand(`fill ~-20 -64 ~-20 ~20 -64 ~20 bedrock`);
                } catch {}

                try {
                    player.runCommand(`fill ~-4 -59 ~-4 ~4 319 ~4 air 0 replace bedrock`);
                } catch {}
            } catch {}
        }

        if (config.modules.bedrockValidate.enabled && config.modules.bedrockValidate.nether && player.dimension === World.getDimension("nether")) { 
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

        // if (config.debug) console.warn(`${new Date()} | ${player.name}'s speed: ${Math.sqrt(Math.abs(player.velocity.x**2 + player.velocity.z**2)).toFixed(4)} Vertical Speed: ${Math.abs(player.velocity.y).toFixed(4)}`);

        // reach/a
        if (config.modules.reachA.enabled && player.hasTag('attack')) {
            try {                                                                   // we could use r=4 but that wont account for lag
                player.runCommand(`execute @s[tag=attack,m=!c] ~~~ testfor @p[name=!"${player.nameTag}",r=${config.modules.reachA.reach}]`);
            } catch {
                try {
                    player.runCommand(`execute @s[tag=attack,m=!c] ~~~ function checks/alerts/reach`);
                } catch {}
            }
        }

        // NoSlow/A = speed limit check
        if(config.modules.noslowA.enabled && Math.sqrt(Math.abs(player.velocity.x**2 + player.velocity.z**2)).toFixed(2) >= config.modules.noslowA.speed && Math.sqrt(Math.abs(player.velocity.x**2 + player.velocity.z**2)).toFixed(2) <= config.modules.noslowA.maxSpeed) {
            if (!player.getEffect(Minecraft.MinecraftEffectTypes.speed) && player.hasTag('right') && player.hasTag('ground') && !player.hasTag('jump') && !player.hasTag('gliding') && !player.hasTag('swimming')) {
                flag(player, "NoSlow", "A", "Movement", "speed", Math.sqrt(Math.abs(player.velocity.x **2 + player.velocity.z **2)).toFixed(3), true);
            }
        }

        if(config.modules.illegalitemsC.enabled || config.modules.illegalitemsD.enabled) {
            let container = player.getComponent('inventory').container;
            for (let i = 0; i < container.size; i++) if (container.getItem(i)) {
                let item = container.getItem(i);
                // Illegalitems/C = item stacked over 64 check
                if(config.modules.illegalitemsC.enabled && item.amount > config.modules.illegalitemsC.maxStack)
                    flag(player, "IllegalItems", "C", "Exploit", "stack", item.amount, false, false, i, 3);
                
                // Illegalitems/D = additional item clearing check
                if (config.modules.illegalitemsD.enabled && config.modules.illegalitemsD.illegalItems.includes(item.id))
                    flag(player, "IllegalItems", "D", "Exploit", "item", item.id, false, false, i, 3);
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
        if (config.modules.invalidsprintA.enabled && player.getEffect(Minecraft.MinecraftEffectTypes.blindness) && player.hasTag('sprint')) {
            flag(player, "InvalidSprint", "A", "Movement", false, false, true);
        }

        if(config.modules.nukerA.enabled && player.blocksBroken > config.modules.nukerA.maxBlocks)
            flag(player, "Nuker", "A", "Misc", "blocksBroken", player.blocksBroken);

        player.blocksBroken = 0;
    }
});

World.events.blockPlace.subscribe(block => {
    if(config.debug) console.warn(`${block.player.nameTag} has placed ${block.block.id}`);

    // reach/b = checks for build reach
    if(config.modules.reachB.enabled) {
        // i guess not sleeping through math class was a good idea
        let reach = Math.sqrt((block.block.location.x - block.player.location.x)**2 + (block.block.location.y - block.player.location.y)**2 + (block.block.location.z - block.player.location.z)**2);

        if(config.debug) console.warn(reach.toFixed(3));

        if(reach > config.modules.reachB.reach) {
            flag(block.player, "Reach", "B", "Combat", "reach", reach.toFixed(3));
            block.player.runCommand(`setblock ${block.block.x} ${block.block.y} ${block.block.z} air 0 destroy`);
        }
    }
});

World.events.blockBreak.subscribe(block => {
    if(config.debug) console.warn(`${block.player.nameTag} has broken the block ${block.brokenBlockPermutation.type.id}`);

    // reach/C = checks for break reach
    if(config.modules.reachC.enabled) {
        // i guess not sleeping through math class was a good idea
        let reach = Math.sqrt((block.block.location.x - block.player.location.x)**2 + (block.block.location.y - block.player.location.y)**2 + (block.block.location.z - block.player.location.z)**2);

        if(config.debug) console.warn(reach.toFixed(3));

        if(reach > config.modules.reachC.reach) {
            flag(block.player, "Reach", "C", "Combat", "reach", reach.toFixed(3));
            block.block.setPermutation(block.brokenBlockPermutation);
        }
    }

    if(config.modules.nukerA.enabled) {
        if(!block.player.blocksBroken) block.player.blocksBroken = 0;
        block.player.blocksBroken++;

        if(block.player.blocksBroken > config.modules.nukerA.maxBlocks) block.block.setPermutation(block.brokenBlockPermutation);
    }
});

World.events.beforeItemUseOn.subscribe(item => {
    if(config.modules.commandblockexploitF.enabled && config.modules.commandblockexploitF.bannedBlocks.includes(item.item.id)) {
        item.source.runCommand(`scoreboard players add @s cbevl 1`);
        item.source.runCommand(`tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Exploit) §4CommandBlockExploit/F §7(item=${item.item.id})§4. VL= "},{"score":{"name":"@s","objective":"cbevl"}}]}`);
        item.cancel = true;
    }
});