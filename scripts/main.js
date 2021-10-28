import * as Minecraft from "mojang-minecraft";
import { hacknotif } from "./util.js";

const World = Minecraft.World;
const Commands = Minecraft.Commands;

var debug = true;
var ticks = 0;

if (debug) console.warn("Im not a dumbass and this actually worked :sunglasses:");

World.events.beforeChat.subscribe(msg => {
    let message = msg.message.toLowerCase();
    let player = msg.sender;

    if (debug && message == "ping") console.warn("Pong!");

    if (message.includes("the best minecraft bedrock utility mod")) msg.cancel = true;

    // BadPackets/2 = chat message length check
    if(message.length > 180 || message.length < 0) hacknotif(player, "BadPackets2", msg);
});

World.events.tick.subscribe(() => {
    // count ticks
    ticks++;
    if (ticks >= 20) ticks = 0;

    // run as each player
    for (let player of World.getPlayers()) {
        // Namespoof/A = username length check.
        if(player.name.length > 16) hacknotif(player, "NameSpoofA");

        // Namespoof/B = regex check
        let regex = /[^A-Za-z0-9_ ]/;

        if (regex.test(player.name)) hacknotif(player, "NameSpoofB");

        // Crasher/A = invalid pos check
        if (isNaN(player.location.x) || player.location.x > 30000000 || 
            isNaN(player.location.y) || player.location.y > 30000000 || 
            isNaN(player.location.z) || player.location.z > 30000000) hacknotif(player, "CrasherA");

        // player position shit
        Commands.run(`scoreboard players set "${player.name}" xPos ${Math.floor(player.location.x)}`, World.getDimension("overworld"));
        Commands.run(`scoreboard players set "${player.name}" yPos ${Math.floor(player.location.y)}`, World.getDimension("overworld"));
        Commands.run(`scoreboard players set "${player.name}" zPos ${Math.floor(player.location.z)}`, World.getDimension("overworld"));

        // bedrock validation
        try {
            Commands.run(`scoreboard players operation "${player.name}" bedrock = scythe:config bedrock`, World.getDimension("overworld"));
        } catch(error) {}

        try {
            Commands.run(`execute @a[name="${player.name}",rm=0,scores={bedrock=1..}] ~~~ fill ~-10 0 ~-10 ~+10 0 ~+10 bedrock`, World.getDimension("overworld"));
        } catch(error) {}

        try {
            Commands.run(`execute @a[name="${player.name}",rm=0,scores={bedrock=1..}] ~~~ fill ~-5 5 ~-5 ~+5 255 ~+5 air 0 replace bedrock`, World.getDimension("overworld"));
        } catch(error) {}

        try {
            Commands.run(`execute @a[name="${player.name}",rm=0,scores={bedrock=1..}] ~~~ fill ~-10 0 ~-10 ~+10 0 ~+10 bedrock`, World.getDimension("nether"));
        } catch(error) {}

        try {
            Commands.run(`execute @a[name="${player.name}",rm=0,scores={bedrock=1..}] ~~~ fill ~-10 127 ~-10 ~+10 127 ~+10 bedrock`, World.getDimension("nether"));
        } catch(error) {}
        
        try {
            Commands.run(`execute @a[name="${player.name}",rm=0,scores={bedrock=1..}] ~~~ fill ~-5 5 ~-5 ~+5 120 ~+5 air 0 replace bedrock`, World.getDimension("nether"));
        } catch(error) {}

        // fly
        if (Math.abs(player.velocity.y).toFixed(3) == 0.333) try {
            Commands.run(`execute @a[name="${player.name}",tag=jump,tag=!elytra,tag=!dead,tag=!ground] ~~~ detect ~ ~-1 ~ air -1 testforblock ~ ~-2 ~ air -1`, World.getDimension("overworld"));
            hacknotif(player, "FlyB");
        } catch (error) {}

        // if (debug) console.warn(`${player.name}'s vertical velocity: ${Math.abs(player.velocity.y).toFixed(3)}`);

        // reach
        try {                                                                   // we could use r=4 but that wont account for lag
            Commands.run(`execute @a[name="${player.name}",tag=attack,m=!c] ~~~ execute @p[name=!"${player.name}",r=5] ~~~ list`, World.getDimension("overworld"));
        } catch(error) {
            try {
                Commands.run(`execute @a[name="${player.name}",tag=attack,m=!c] ~~~ function checks/alerts/reach`, World.getDimension("overworld"));
            } catch (error) {}
        };

        // jesus/b
        try {
            if (Math.abs(player.velocity.y).toFixed(3) <= 0.026 && Math.abs(player.velocity.y).toFixed(3) >= 0.024) {
                Commands.run(`execute @a[name="${player.name}",tag=!flying,m=!c,tag=!jump,tag=!dead,tag=!ground,tag=!gliding] ~~~ detect ~ ~-1 ~ water -1 list`, World.getDimension("overworld"));
                hacknotif(player, "JesusB");
            }
        } catch(error) {}
}});
