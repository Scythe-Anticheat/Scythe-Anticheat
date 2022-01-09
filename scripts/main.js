import * as Minecraft from "mojang-minecraft";
import { flag, banMessage } from "./util.js";
import { commandHandler } from "./commands/handler.js";
import config from "./config.js";

const World = Minecraft.World;
const Commands = Minecraft.Commands;

let loaded = false;

if (config.debug) console.warn(`${new Date()} | Im not a dumbass and this actually worked :sunglasses:`);

World.events.beforeChat.subscribe(msg => {
    const message = msg.message.toLowerCase();
    const player = msg.sender;

    if (config.debug && message === "ping") console.warn(`${new Date()} | Pong!`);

    if (message.includes("the best minecraft bedrock utility mod")) msg.cancel = true;

    // BadPackets/2 = chat message length check
    if (config.modules.badpackets2.enabled && message.length > config.modules.badpackets2.maxlength || message.length < config.modules.badpackets2.minLength) flag(player, "BadPackets", "2", "messageLength", message.length, false, msg);

    // Spammer/A = checks if someone sends a message while moving and on ground
    if (config.modules.spammerA.enabled) {
        try {
            Commands.run(`testfor @a[name="${player.nameTag}",tag=moving,tag=ground,tag=!jump]`, World.getDimension("overworld"));
            flag(player, "Spammer", "A", "Movement", false, false, true, msg);
        } catch (error) {}
    }

    // Spammer/B = checks if someone sends a message while swinging their hand
    if (config.modules.spammerB.enabled) {
        try {
            Commands.run(`testfor @a[name="${player.nameTag}",tag=left]`, World.getDimension("overworld"));
            flag(player, "Spammer", "B", "Combat", false, false, false, msg);
        } catch (error) {}
    }

    // Spammer/C = checks if someone sends a message while using an item
    if (config.modules.spammerC.enabled) {
        try {
            Commands.run(`testfor @a[name="${player.nameTag}",tag=right]`, World.getDimension("overworld"));
            flag(player, "Spammer", "C", "Misc", false, false, false, msg);
        } catch (error) {}
    }

    // Spammer/D = checks if someone sends a message while having a GUI open
    if (config.modules.spammerD.enabled) {
        try {
            Commands.run(`testfor @a[name="${player.nameTag}",tag=hasGUIopen]`, World.getDimension("overworld"));
            flag(player, "Spammer", "D", "Misc", false, false, false, msg);
        } catch (error) {}
    }

    commandHandler(player, msg);

    // add's user custom tags to their messages
    if (player.name && player.name !== player.nameTag && !msg.cancel) {
        Commands.run(`tellraw @a {"rawtext":[{"text":"<${player.nameTag}> ${msg.message}"}]}`, World.getDimension("overworld"));
        msg.cancel = true;
    }
});

World.events.tick.subscribe(() => {
    // Credits go out to mrpatches123#0348 for giving guidance to use tick events
    // to check when loaded in the world and to execute code afterwards
    try {
        if (!loaded) {
            const players = World.getPlayers().map(player => player.nameTag);
            Commands.run(`testfor @a[name="${players[0]}"]`, World.getDimension("overworld"));
            try {
                // (1..) gametest already enabled so set loaded to true and do nothing
                Commands.run(`testfor @a[scores={gametestapi=1..}]`, World.getDimension("overworld"));
                loaded = true;
            } catch {
                // (..0) gametest needs to be enabled (1..) then set loaded to true
                Commands.run(`testfor @a[scores={gametestapi=..0}]`, World.getDimension("overworld"));
                Commands.run(`execute "${players[0]}" ~~~ function checks/gametestapi`, World.getDimension("overworld"));
                loaded = true;
                return;
            }
        }
    } catch (error) {}
    
    // run as each player
    for (let player of World.getPlayers()) {
        // fix a disabler method
        player.nameTag = player.nameTag.replace("\"", "");
        player.nameTag = player.nameTag.replace("\\", "");

        // sexy looking ban message
        try {
            Commands.run(`testfor @a[name="${player.nameTag}",tag=isBanned]`, World.getDimension("overworld"));
            banMessage(player);
        } catch(error) {}

        // Crasher/A = invalid pos check
        if (config.modules.crasherA.enabled && Math.abs(player.location.x) > 30000000 ||
            Math.abs(player.location.y) > 30000000 || Math.abs(player.location.z) > 30000000) flag(player, "Crasher", "A", "Exploit", false, false, true, false);

        // Namespoof/A = username length check.
        try {
            if (config.modules.namespoofA.enabled && player.name.length < config.modules.namespoofA.minNameLength || player.name.length > config.modules.namespoofA.maxNameLength) flag(player, "Namespoof", "A", "Exploit", "nameLength", player.name.length, false, false);
        } catch(error) {}

        // Namespoof/B = regex check
        try {
            if (config.modules.namespoofB.enabled && config.modules.namespoofB.regex.test(player.name)) flag(player, "Namespoof", "B", "Exploit", false, false, false, false);
        } catch(error) {}

        // player position shit
        try {
            Commands.run(`scoreboard players set "${player.nameTag}" xPos ${Math.floor(player.location.x)}`, World.getDimension("overworld"));
            Commands.run(`scoreboard players set "${player.nameTag}" yPos ${Math.floor(player.location.y)}`, World.getDimension("overworld"));
            Commands.run(`scoreboard players set "${player.nameTag}" zPos ${Math.floor(player.location.z)}`, World.getDimension("overworld"));
        } catch(e) {}

        // bedrock validation
        if (config.modules.bedrockValidate.enabled && config.modules.bedrockValidate.overworld) {
            try {
                // only run the rest of the commands if the player is in the overworld
                Commands.run(`testfor @a[name="${player.nameTag}",rm=0,scores={bedrock=1..}]`, World.getDimension("overworld"));
                try {
                    Commands.run(`execute @a[name="${player.nameTag}",rm=0,scores={bedrock=1..}] ~~~ fill ~-20 -64 ~-20 ~20 -64 ~20 bedrock`, World.getDimension("overworld"));
                } catch (error) {}

                try {
                    Commands.run(`execute @a[name="${player.nameTag}",rm=0,scores={bedrock=1..}] ~~~ fill ~-4 -59 ~-4 ~4 319 ~4 air 0 replace bedrock`, World.getDimension("overworld"));
                } catch (error) {}
            } catch (error) {}
        }

        if (config.modules.bedrockValidate.enabled && config.modules.bedrockValidate.nether) {
            try {
                // only run the rest of the commands if the player is in the nether
                Commands.run(`testfor @a[name="${player.nameTag}",rm=0,scores={bedrock=1..}]`, World.getDimension("nether"));
                try {
                    Commands.run(`execute @a[name="${player.nameTag}",rm=0,scores={bedrock=1..}] ~~~ fill ~-10 0 ~-10 ~10 0 ~10 bedrock`, World.getDimension("nether"));
                } catch (error) {}

                try {
                    Commands.run(`execute @a[name="${player.nameTag}",rm=0,scores={bedrock=1..}] ~~~ fill ~-10 127 ~-10 ~10 127 ~10 bedrock`, World.getDimension("nether"));
                } catch (error) {}

                try {
                    Commands.run(`execute @a[name="${player.nameTag}",rm=0,scores={bedrock=1..}] ~~~ fill ~-5 5 ~-5 ~5 120 ~5 air 0 replace bedrock`, World.getDimension("nether"));
                } catch (error) {}
            } catch(error) {}
        }

        // if (config.debug) console.warn(`${new Date()} | ${player.name}'s vertical velocity: ${Math.abs(player.velocity.y).toFixed(4)}`);

        // reach/a
        if (config.modules.reachA.enabled) {
            try {                                                                   // we could use r=4 but that wont account for lag
                Commands.run(`execute @a[name="${player.nameTag}",tag=attack,m=!c] ~~~ testfor @p[name=!"${player.nameTag}",r=${config.modules.reachA.reach}]`, World.getDimension("overworld"));
            } catch (error) {
                try {
                    Commands.run(`execute @a[name="${player.nameTag}",tag=attack,m=!c] ~~~ function checks/alerts/reach`, World.getDimension("overworld"));
                } catch (error2) {}
            }
        }

        // jesus/b = motion check
        try {
            if (config.modules.jesusB.enabled && Math.abs(player.velocity.y).toFixed(4) <= config.modules.jesusB.maxMotion && Math.abs(player.velocity.y).toFixed(4) >= config.modules.jesusB.minMotion && !player.getEffect(Minecraft.MinecraftEffectTypes.slowFalling)) {
                Commands.run(`execute @a[name="${player.nameTag}",tag=!flying,m=!c,tag=!jump,tag=!ground,tag=!gliding,tag=!levitating,tag=!vanish,tag=!swimming] ~~~ detect ~~-1~ water 0 list`, World.getDimension("overworld"));
                flag(player, "Jesus", "B", "Movement", "yMotion", Math.abs(player.velocity.y).toFixed(4), true, false);
            }
        } catch (error) {}

        // NoSlow/A = speed limit check
        if(config.modules.noslowA.enabled && Math.sqrt(Math.abs(player.velocity.x**2 + player.velocity.z**2)).toFixed(3) >= config.modules.noslowA.speed) {
            if (!player.getEffect(Minecraft.MinecraftEffectTypes.speed)) {
                try {
                    Commands.run(`testfor @a[name="${player.nameTag}",tag=right,tag=ground,tag=!jump,tag=!gliding]`, World.getDimension("overworld"));
                    flag(player, "NoSlow", "A", "Movement", "speed", Math.sqrt(Math.abs(player.velocity.x **2 + player.velocity.z **2)).toFixed(3), true, false);
                } catch(error) {}
            }
        }

        if(config.modules.illegalitemsC.enabled) {
            let container = player.getComponent('inventory').container;
            for (let i = 0; i < container.size; i++) if (container.getItem(i)) {
                if(container.getItem(i).amount > config.modules.illegalitemsC.maxStack) {
                    let o = container.getItem(i);
                    o.slot = i;
                    flag(player, "IllegalItems", "C", "Exploit", "stack", o, false, false);
                }
            }
        }

        // invalidsprint/a = checks for sprinting with the blindness effect
        if (config.modules.invalidsprintA.enabled && player.getEffect(Minecraft.MinecraftEffectTypes.blindness)) {
            try {
                Commands.run(`testfor @a[name=${player.nameTag},tag=sprint]`, World.getDimension("overworld"));
                flag(player, "InvalidSprint", "A", "Movement", false, false, true, false);
            } catch(error) {}
        }
        
        // fly/a = checks for creative fly while in survival
        if(config.modules.flyA.enabled && player.lastYpos) {
            let yChange = player.location.y - player.lastYpos;
            // console.warn(yChange);
            if (yChange == config.modules.flyA.yChange) {
                try {
                    Commands.run(`testfor @a[name="${player.nameTag}",tag=moving,tag=!ground,tag=!gliding,tag=!levitating,m=!c,tag=!flying]`, World.getDimension("overworld"));
                    flag(player, "Fly", "A", "Movement", "yVelocity", `${Math.abs(player.velocity.y).toFixed(3)},yChange=${yChange}`, true, false);
                } catch(error) {}
            }
        }
        player.lastYpos = player.location.y;
    }
});
