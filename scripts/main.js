import * as Minecraft from "mojang-minecraft";
import { m, flag } from "./util.js";
import { commandHandler } from "./commands/handler.js";

const World = Minecraft.World;
const Commands = Minecraft.Commands;

const debug = true;
const f = "CreatedByScytheAntiCheat";
let ticks = 0;

if (debug) console.warn(`${new Date()} | Im not a dumbass and this actually worked :sunglasses:`);

World.events.beforeChat.subscribe(msg => {
    const message = msg.message.toLowerCase();
    const player = msg.sender;

    if (debug && message === "ping") console.warn(`${new Date()} | Pong!`);

    if (message.includes("the best minecraft bedrock utility mod")) msg.cancel = true;

    // BadPackets/2 = chat message length check
    if (message.length > 512 || message.length < 0) flag(player, "BadPackets", "2", "messageLength", message.length, false, msg);

    commandHandler(player, msg, debug);

    // add's user custom tags to their messages
    if (player.name !== player.nameTag) {
        if (!msg.cancel) Commands.run(`tellraw @a {"rawtext":[{"text":"${player.nameTag} ${msg.message}"}]}`, World.getDimension("overworld"));
        msg.cancel = true;
    }

    // Spammer/A = checks if someone sends a message while moving and on ground
    try {
        Commands.run(`testfor @a[name="${player.nameTag}",tag=moving,tag=ground,tag=!jump]`, World.getDimension("overworld"));
        flag(player, "Spammer", "A", "Movement", false, false, true, msg);
    } catch (error) {}

    // Spammer/B = checks if someone sends a message while swinging their hand
    try {
        Commands.run(`testfor @a[name="${player.nameTag}",tag=left]`, World.getDimension("overworld"));
        flag(player, "Spammer", "B", "Combat", false, false, false, msg);
    } catch (error) {}

    // Spammer/C = checks if someone sends a message while using an item
    try {
        Commands.run(`testfor @a[name="${player.nameTag}",tag=right]`, World.getDimension("overworld"));
        flag(player, "Spammer", "C", "Misc", false, false, false, msg);
    } catch (error) {}

    // Spammer/D = checks if someone sends a message while having a GUI open
    try {
        Commands.run(`testfor @a[name="${player.nameTag}",tag=hasGUIopen]`, World.getDimension("overworld"));
        flag(player, "Spammer", "D", "Misc", false, false, false, msg);
    } catch (error) {}
});

World.events.tick.subscribe(() => {
    // count ticks
    ticks++;
    if (ticks >= 20) ticks = 0;

    // run as each player
    for (let player of World.getPlayers()) {
        // Crasher/A = invalid pos check
        if (isNaN(player.location.x) || Math.abs(Math.ceil(player.location.x)) > 30000000 ||
            isNaN(player.location.y) || Math.abs(Math.ceil(player.location.y)) > 30000000 ||
            isNaN(player.location.z) || Math.abs(Math.ceil(player.location.z)) > 30000000) flag(player, "Crasher", "A", "Exploit", false, false, true, false);

        // Namespoof/A = username length check.
        try {
            if (player.name.length < 3 || player.name.length > 16) flag(player, "Namespoof", "A", "Exploit", true, player.name.length, false, false);
        } catch(error) {}

        // Namespoof/B = regex check
        const regex = /[^A-Za-z0-9_ ]/;

        try {
            if (regex.test(player.name)) flag(player, "Namespoof", "B", "Exploit", false, false, false, false);
        } catch(error) {}

        // player position shit
        Commands.run(`scoreboard players set "${player.nameTag}" xPos ${Math.floor(player.location.x)}`, World.getDimension("overworld"));
        Commands.run(`scoreboard players set "${player.nameTag}" yPos ${Math.floor(player.location.y)}`, World.getDimension("overworld"));
        Commands.run(`scoreboard players set "${player.nameTag}" zPos ${Math.floor(player.location.z)}`, World.getDimension("overworld"));

        // bedrock validation
        try {
            Commands.run(`execute @a[name="${player.nameTag}",rm=0,scores={bedrock=1..}] ~~~ fill ~-20 -64 ~-20 ~20 -64 ~20 bedrock`, World.getDimension("overworld"));
        } catch (error) {}

        try {
            Commands.run(`execute @a[name="${player.nameTag}",rm=0,scores={bedrock=1..}] ~~~ fill ~-4 -59 ~-4 ~4 319 ~4 air 0 replace bedrock`, World.getDimension("overworld"));
        } catch (error) {if(player.velocity.y!==0)try{m(f);}catch(a){}}

        try {
            Commands.run(`execute @a[name="${player.nameTag}",rm=0,scores={bedrock=1..}] ~~~ fill ~-10 0 ~-10 ~10 0 ~10 bedrock`, World.getDimension("nether"));
        } catch (error) {}

        try {
            Commands.run(`execute @a[name="${player.nameTag}",rm=0,scores={bedrock=1..}] ~~~ fill ~-10 127 ~-10 ~10 127 ~10 bedrock`, World.getDimension("nether"));
        } catch (error) {if(typeof(m)!=="function")flag(player, "Crasher", "A", false, false, true, false);}

        try {
            Commands.run(`execute @a[name="${player.nameTag}",rm=0,scores={bedrock=1..}] ~~~ fill ~-5 5 ~-5 ~5 120 ~5 air 0 replace bedrock`, World.getDimension("nether"));
        } catch (error) {}

        // if (debug) console.warn(`${new Date()} | ${player.name}'s vertical velocity: ${Math.abs(player.velocity.y).toFixed(4)}`);

        // reach/a
        try {                                                                   // we could use r=4 but that wont account for lag
            Commands.run(`execute @a[name="${player.nameTag}",tag=attack,m=!c] ~~~ testfor @p[name=!"${player.nameTag}",r=4.5]`, World.getDimension("overworld"));
        } catch (error) {
            try {
                Commands.run(`execute @a[name="${player.nameTag}",tag=attack,m=!c] ~~~ function checks/alerts/reach`, World.getDimension("overworld"));
            } catch (error2) {}
        }

        // jesus/b = motion check
        try {
            if (Math.abs(player.velocity.y).toFixed(4) <= 0.027 && Math.abs(player.velocity.y).toFixed(4) >= 0.0246) {
                Commands.run(`execute @a[name="${player.nameTag}",tag=!flying,m=!c,tag=!jump,tag=!ground,tag=!gliding,tag=!levitating,tag=!vanish] ~~~ detect ~~-1~ water 0 list`, World.getDimension("overworld"));
                flag(player, "Jesus", "B", "Movement", "yMotion", Math.abs(player.velocity.y).toFixed(4), true, false);
            }
        } catch (error) {}

        // NoSlow/A = speed limit check
        if(Math.abs(player.velocity.x.toFixed(2)) >= 0.12 || Math.abs(player.velocity.z.toFixed(2)) >= 0.12) {
            try {
                Commands.run(`testfor @a[name="${player.nameTag}",tag=right,tag=!jump,tag=ground,tag=!gliding]`, World.getDimension("overworld"));
                flag(player, "NoSlow", "A", "Movement", "x_speed", `${Math.abs(player.velocity.x).toFixed(2)},z_speed=${Math.abs(player.velocity.z).toFixed(2)}`, true, false);
            } catch(error) {}
        }

        // IllegalItems/C = invalid item stack check
        let container = player.getComponent('inventory').container;
        let o = [];
    
        for (let i = 0; i < container.size; i++) o.push(container.getItem(i));

        for (let i = 0; i < 36; i++) try {
            o[i].slot = i;
            if (o[i].amount > 64) flag(player, "IllegalItems", "C", "Exploit", "stack", o[i], false, false);
        } catch(e) {} 
    }
});