import * as Minecraft from "mojang-minecraft";
import { hacknotif } from "./util.js";
import { commandHandler } from "./commands/handler.js";

const World = Minecraft.World;
const Commands = Minecraft.Commands;

const debug = true;
let ticks = 0;

if (debug) console.warn("Im not a dumbass and this actually worked :sunglasses:");

World.events.beforeChat.subscribe(msg => {
    const message = msg.message.toLowerCase();
    const player = msg.sender;

    if (debug && message === "ping") console.warn("Pong!");

    if (message.includes("the best minecraft bedrock utility mod")) msg.cancel = true;

    // BadPackets/2 = chat message length check
    if (message.length > 512 || message.length < 0) hacknotif(player, "BadPackets2", message.length, msg);

    commandHandler(player, msg, debug);

    // add's user custom tags to their messages
    if (player.name !== player.nameTag) {
        if (!msg.cancel) Commands.run(`tellraw @a {"rawtext":[{"text":"<${player.nameTag}> ${msg.message}"}]}`, World.getDimension("nether"));
        msg.cancel = true;
    }

    // Spammer/A = checks if someone sends a message while moving and on ground
    try {
        Commands.run(`execute @a[name="${player.nameTag}",tag=moving,tag=ground,tag=!jump] ~~~ list`, World.getDimension("overworld"));
        hacknotif(player, "SpammerA", "isMoving", msg);
    } catch (error) {}

    // Spammer/B = checks if someone sends a message while swinging their hand
    try {
        Commands.run(`execute @a[name="${player.nameTag}",tag=left] ~~~ list`, World.getDimension("overworld"));
        hacknotif(player, "SpammerC", "left", msg);
    } catch (error) {}

    // Spammer/C = checks if someone sends a message while using an item
    try {
        Commands.run(`execute @a[name="${player.nameTag}",tag=right] ~~~ list`, World.getDimension("overworld"));
        hacknotif(player, "SpammerD", "right", msg);
    } catch (error) {}

    // Spammer/D = checks if someone sends a message while having a GUI open
    try {
        Commands.run(`execute @a[name="${player.nameTag}",tag=hasGUIopen] ~~~ list`, World.getDimension("overworld"));
        hacknotif(player, "SpammerE", "has_gui_open", msg);
    } catch (error) {}
});

World.events.tick.subscribe(() => {
    // count ticks
    ticks++;
    if (ticks >= 20) ticks = 0;

    // run as each player
    for (let player of World.getPlayers()) {
        // Namespoof/A = username length check.
        if (player.name.length > 16) hacknotif(player, "NameSpoofA", player.name.length);

        // Namespoof/B = regex check
        const regex = /[^A-Za-z0-9_ ]/;

        if (regex.test(player.name)) hacknotif(player, "NameSpoofB");

        // Crasher/A = invalid pos check
        if (isNaN(player.location.x) || Math.abs(Math.ceil(player.location.x)) > 30000000 ||
            isNaN(player.location.y) || Math.abs(Math.ceil(player.location.y)) > 30000000 ||
            isNaN(player.location.z) || Math.abs(Math.ceil(player.location.z)) > 30000000) hacknotif(player, "CrasherA");

        // player position shit
        Commands.run(`scoreboard players set "${player.nameTag}" xPos ${Math.floor(player.location.x)}`, World.getDimension("overworld"));
        Commands.run(`scoreboard players set "${player.nameTag}" yPos ${Math.floor(player.location.y)}`, World.getDimension("overworld"));
        Commands.run(`scoreboard players set "${player.nameTag}" zPos ${Math.floor(player.location.z)}`, World.getDimension("overworld"));

        // bedrock validation
        try {
            Commands.run(`scoreboard players operation "${player.nameTag}" bedrock = scythe:config bedrock`, World.getDimension("overworld"));
        } catch (error) {}

        try {
            Commands.run(`execute @a[name="${player.nameTag}",rm=0,scores={bedrock=1..}] ~~~ fill ~-10 0 ~-10 ~+10 0 ~+10 bedrock`, World.getDimension("overworld"));
        } catch (error) {}

        try {
            Commands.run(`execute @a[name="${player.nameTag}",rm=0,scores={bedrock=1..}] ~~~ fill ~-5 5 ~-5 ~+5 255 ~+5 air 0 replace bedrock`, World.getDimension("overworld"));
        } catch (error) {}

        try {
            Commands.run(`execute @a[name="${player.nameTag}",rm=0,scores={bedrock=1..}] ~~~ fill ~-10 0 ~-10 ~+10 0 ~+10 bedrock`, World.getDimension("nether"));
        } catch (error) {}

        try {
            Commands.run(`execute @a[name="${player.nameTag}",rm=0,scores={bedrock=1..}] ~~~ fill ~-10 127 ~-10 ~+10 127 ~+10 bedrock`, World.getDimension("nether"));
        } catch (error) {}

        try {
            Commands.run(`execute @a[name="${player.nameTag}",rm=0,scores={bedrock=1..}] ~~~ fill ~-5 5 ~-5 ~+5 120 ~+5 air 0 replace bedrock`, World.getDimension("nether"));
        } catch (error) {}

        // fly = airjump check
        if (Math.abs(player.velocity.y).toFixed(3) === 0.333) try {
            Commands.run(`execute @a[name="${player.nameTag}",tag=jump,tag=!elytra,tag=!dead,tag=!ground] ~~~ detect ~ ~-1 ~ air -1 testforblock ~ ~-2 ~ air -1`, World.getDimension("overworld"));
            hacknotif(player, "FlyB");
        } catch (error) {}

        // if (debug) console.warn(`${player.name}'s vertical velocity: ${Math.abs(player.velocity.y).toFixed(4)}`);

        // reach/a
        try {                                                                   // we could use r=4 but that wont account for lag
            Commands.run(`execute @a[name="${player.nameTag}",tag=attack,m=!c] ~~~ execute @p[name=!"${player.nameTag}",r=4.5] ~~~ list`, World.getDimension("overworld"));
        } catch (error) {
            try {
                Commands.run(`execute @a[name="${player.nameTag}",tag=attack,m=!c] ~~~ function checks/alerts/reach`, World.getDimension("overworld"));
            } catch (error2) {}
        }

        // jesus/b = motion check
        try {
            if (Math.abs(player.velocity.y).toFixed(4) <= 0.027 && Math.abs(player.velocity.y).toFixed(4) >= 0.0246) {
                Commands.run(`execute @a[name="${player.nameTag}",tag=!flying,m=!c,tag=!jump,tag=!dead,tag=!ground,tag=!gliding] ~~~ detect ~ ~-1 ~ water 0 list`, World.getDimension("overworld"));
                hacknotif(player, "JesusB", Math.abs(player.velocity.y).toFixed(4));
            }
        } catch (error) {}
}});