import * as GameTest from "mojang-gametest";
import { World, Commands } from "mojang-minecraft";

var debug = true;

if (debug) console.warn("Im not a dumbass and this actually worked :sunglasses:");

World.events.beforeChat.subscribe(msg => {
    let message = msg.message;

    if (debug && message == "Ping") console.warn("Pong!");

    if (message.toLowerCase().includes("the best minecraft bedrock utility mod"))  msg.cancel = true;
});

World.events.tick.subscribe(() => {
    // run as each player
    for (let player of World.getPlayers()) {
        // Namespoof/A = username length check.
        if(player.name.length > 16)
            Commands.run(`execute ${player.name} ~~~ say i am a noob who uses namespoof`, World.getDimension("overworld"));
        
        // Namespoof/B = regex check
        let regex = /[^A-Za-z0-9_ ]/;

        //if(!regex.test(player.name))
            // Commands.run(`execute ${player.name} ~~~ say i am a noob who uses namespoof`, World.getDimension("overworld"));

        // Crasher/A = invalid pos check
        if (isNaN(player.location.x) || player.location.x > 30000000 || 
            isNaN(player.location.y) || player.location.y > 30000000 || 
            isNaN(player.location.z) || player.location.z > 30000000) console.warn("CRASH!!! NO!!!!!");

        // fixed banning system, yay!
        // messy af but if it works then it works
        Commands.run(`execute ${player.name} ~~~ execute @s[scores={isBanned=3}] ~~~ kick ${player.name} "§cYOU ARE BANNED!\n\n§bReason: Sending Crash Packets\nebBanned By: Scythe AntiCheat."`, World.getDimension("overworld"));
        Commands.run(`execute ${player.name} ~~~ execute @s[scores={isBanned=2}] ~~~ kick ${player.name} "§cYOU ARE BANNED!\n\n§bReason: Hacking Or Abuse\nebBanned By: Scythe AntiCheat."`, World.getDimension("overworld"));
        Commands.run(`execute ${player.name} ~~~ execute @s[scores={isBanned=3}] ~~~ kick ${player.name} "§cYOU ARE BANNED!\n\n§bReason: Hacking Or Abuse\nebBanned By: An Operator."`, World.getDimension("overworld"));
    };
});
