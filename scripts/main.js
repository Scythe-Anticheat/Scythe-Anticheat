import * as Minecraft from "mojang-minecraft";
import { flag, banMessage} from "./util.js";
import { commandHandler } from "./commands/handler.js";
import { banplayer } from "./data/globalban.js";
import config from "./data/config.js";

const World = Minecraft.world;

let loaded = false;

if (config.debug) console.warn(`${new Date()} | Im not a dumbass and this actually worked :sunglasses:`);

World.events.beforeChat.subscribe(msg => {
    const message = msg.message.toLowerCase();
    const player = msg.sender;

    if (config.debug && message === "ping") console.warn(`${new Date()} | Pong!`);

    if (message.includes("the best minecraft bedrock utility mod")) msg.cancel = true;

    // BadPackets/2 = chat message length check
    if (config.modules.badpackets2.enabled && message.length > config.modules.badpackets2.maxlength || message.length < config.modules.badpackets2.minLength) flag(player, "BadPackets", "2", "messageLength", message.length, false, msg);

    // get all tags of the player
    let playerTags = player.getTags();

    // Spammer/A = checks if someone sends a message while moving and on ground
    if (config.modules.spammerA.enabled && playerTags.includes('moving') && playerTags.includes('ground') && !playerTags.includes('jump')) {
        flag(player, "Spammer", "A", "Movement", false, false, true, msg);
    }

    // Spammer/B = checks if someone sends a message while swinging their hand
    if (config.modules.spammerB.enabled && playerTags.includes('left')) {
        flag(player, "Spammer", "B", "Combat", false, false, false, msg);
    }

    // Spammer/C = checks if someone sends a message while using an item
    if (config.modules.spammerC.enabled && playerTags.includes('right')) {
        flag(player, "Spammer", "C", "Misc", false, false, false, msg);
    }

    // Spammer/D = checks if someone sends a message while having a GUI open
    if (config.modules.spammerD.enabled && playerTags.includes('hasGUIopen')) {
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
            const players = World.getPlayers().map(player => player.nameTag);
            World.getDimension("overworld").runCommand(`testfor @a[name="${players[0]}"]`);
            try {
                // (1..) gametest already enabled so set loaded to true and do nothing
                World.getDimension("overworld").runCommand(`testfor @r[scores={gametestapi=1..}]`);
                loaded = true;
            } catch {
                // (..0) gametest needs to be enabled (1..) then set loaded to true
                World.getDimension("overworld").runCommand(`testfor @r[scores={gametestapi=..0}]`);
                World.getDimension("overworld").runCommand(`execute "${players[0]}" ~~~ function checks/gametestapi`);
                loaded = true;
                return;
            }
        }
    } catch (error) {}
    
    // run as each player
    for (let player of World.getPlayers()) {
        // fix a disabler method
        player.nameTag = player.nameTag.replace(/"/g, "").replace(/\\/g, "");

        // get all tags of the player
        let playerTags = player.getTags();

        // Check global ban list and if the player who is joining is on the server then kick them out
        if (banplayer.some(code => JSON.stringify(code) === JSON.stringify({ name: player.nameTag }))) {
            player.addTag(`"by:Scythe Anticheat"`);
            player.addTag(`"reason:You are Scythe Anticheat global banned!"`);
            banMessage(player);
        }

        // sexy looking ban message
        if(playerTags.includes("isBanned")) banMessage(player);

        // Crasher/A = invalid pos check
        if (config.modules.crasherA.enabled && Math.abs(player.location.x) > 30000000 ||
            Math.abs(player.location.y) > 30000000 || Math.abs(player.location.z) > 30000000) flag(player, "Crasher", "A", "Exploit", false, false, true, false, false, 3);

        // Namespoof/A = username length check.
        try {
            if (config.modules.namespoofA.enabled) {
                // checks if 2 players are logged in with the same name
                // minecraft adds a sufix to the end of the name which we detect
                if(player.name.endsWith(')') && ((player.name.length + 3) > config.modules.namespoofA.maxNameLength || player.name.length < config.modules.namespoofA.minNameLength))
                    flag(player, "Namespoof", "A", "Exploit", "nameLength", player.name.length, false, false);

                if(!player.name.endsWith(')') && (player.name.length < config.modules.namespoofA.minNameLength || player.name.length > config.modules.namespoofA.maxNameLength))
                    flag(player, "Namespoof", "A", "Exploit", "nameLength", player.name.length, false, false);
            }
        } catch(error) {}

        // Namespoof/B = regex check
        try {
            if (config.modules.namespoofB.enabled && config.modules.namespoofB.regex.test(player.name)) flag(player, "Namespoof", "B", "Exploit", false, false, false, false);
        } catch(error) {}

        // player position shit
        try {
            player.runCommand(`scoreboard players set @s xPos ${Math.floor(player.location.x)}`);
            player.runCommand(`scoreboard players set @s yPos ${Math.floor(player.location.y)}`);
            player.runCommand(`scoreboard players set @s zPos ${Math.floor(player.location.z)}`);
        } catch(e) {}

        // bedrock validation
        // not yet supported in the latest beta
        /*
        if (config.modules.bedrockValidate.enabled && config.modules.bedrockValidate.overworld) {
            try {
                // only run the rest of the commands if the player is in the overworld
                World.getDimension("overworld").runCommand(`testfor @r[name="${player.nameTag}",rm=0,scores={bedrock=1..}]`);
                try {
                    player.runCommand(`fill ~-20 -64 ~-20 ~20 -64 ~20 bedrock`);
                } catch (error) {}

                try {
                    player.runCommand(`fill ~-4 -59 ~-4 ~4 319 ~4 air 0 replace bedrock`);
                } catch (error) {}
            } catch (error) {}
        }

        if (config.modules.bedrockValidate.enabled && config.modules.bedrockValidate.nether) {
            try {
                // only run the rest of the commands if the player is in the nether
                World.getDimension("nether").runCommand(`testfor @r[name="${player.nameTag}",rm=0,scores={bedrock=1..}]`);
                try {
                    player.runCommand(`fill ~-10 0 ~-10 ~10 0 ~10 bedrock`);
                } catch (error) {}

                try {
                    player.runCommand(`fill ~-10 127 ~-10 ~10 127 ~10 bedrock`);
                } catch (error) {}

                try {
                    player.runCommand(`fill ~-5 5 ~-5 ~5 120 ~5 air 0 replace bedrock`);
                } catch (error) {}
            } catch(error) {}
        }
        */

        // if (config.debug) console.warn(`${new Date()} | ${player.name}'s vertical velocity: ${Math.abs(player.velocity.y).toFixed(4)}`);
        // if (config.debug) console.warn(`${new Date()} | ${player.name}'s speed: ${Math.sqrt(Math.abs(player.velocity.x**2 + player.velocity.z**2)).toFixed(4)}`);

        // reach/a
        if (config.modules.reachA.enabled && playerTags.includes('attack')) {
            try {                                                                   // we could use r=4 but that wont account for lag
                player.runCommand(`execute @s[tag=attack,m=!c] ~~~ testfor @p[name=!"${player.nameTag}",r=${config.modules.reachA.reach}]`);
            } catch (error) {
                try {
                    player.runCommand(`execute @s[tag=attack,m=!c] ~~~ function checks/alerts/reach`);
                } catch (error2) {}
            }
        }

        // NoSlow/A = speed limit check
        if(config.modules.noslowA.enabled && Math.sqrt(Math.abs(player.velocity.x**2 + player.velocity.z**2)).toFixed(2) >= config.modules.noslowA.speed) {
            if (!player.getEffect(Minecraft.MinecraftEffectTypes.speed) && playerTags.includes('right') && playerTags.includes('ground') && !playerTags.includes('jump') && !playerTags.includes('gliding') && !playerTags.includes('swimming')) {
                flag(player, "NoSlow", "A", "Movement", "speed", Math.sqrt(Math.abs(player.velocity.x **2 + player.velocity.z **2)).toFixed(3), true, false);
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
        if (config.modules.invalidsprintA.enabled && player.getEffect(Minecraft.MinecraftEffectTypes.blindness) && playerTags.includes('sprint')) {
            flag(player, "InvalidSprint", "A", "Movement", false, false, true, false);
        }

        // we put this inside main.js because if we were to put this in a function, it would error if Education Edition was disabled
        try {
            player.runCommand(`ability @s[tag=!flying2] mayfly false`);
        } catch (e) {}
    }
});

World.events.blockPlace.subscribe(block => {
    if(config.debug) console.warn(block.block.id);
    if(config.modules.cbeB.bannedBlocks.includes(block.block.id)) {
        block.player.runCommand(`scoreboard players add @s cbevl 1`);
        block.player.runCommand(`tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Exploit) §4CommandBlockExploit/B §7(item=${block.block.id})§4. VL= "},{"score":{"name":"@s","objective":"cbevl"}}]}`);
        block.player.runCommand(`setblock ${block.block.x} ${block.block.y} ${block.block.z} air`);
    }
});