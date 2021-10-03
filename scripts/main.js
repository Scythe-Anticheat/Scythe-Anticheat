import * as Gametest from "mojang-gametest";
import * as Minecraft from "mojang-minecraft";
import { hacknotif } from "./util.js";

const World = Minecraft.World;
const Commands = Minecraft.Commands;

var debug = true;

if (debug) console.warn("Im not a dumbass and this actually worked :sunglasses:");

World.events.beforeChat.subscribe(msg => {
    let message = msg.message.toLowerCase();

    if (debug && message == "Ping") console.warn("Pong!");

    if (message.includes("the best minecraft bedrock utility mod"))  msg.cancel = true;

    // BadPackets/2 = chat message length check
    if(message.length > 180 || message.length < 0) return hacknotif(player, "BadPackets2", msg);
});

World.events.tick.subscribe(() => {
    // run as each player
    for (let player of World.getPlayers()) {
        // Namespoof/A = username length check.
        if(player.name.length > 16) return hacknotif(player, "NameSpoofA");
        
        // Namespoof/B = regex check
        let regex = /[^A-Za-z0-9_ ]/;

        if (regex.test(player.name)) return hacknotif(player, "NameSpoofB");

        // Crasher/A = invalid pos check
        if (isNaN(player.location.x) || player.location.x > 30000000 || 
            isNaN(player.location.y) || player.location.y > 30000000 || 
            isNaN(player.location.z) || player.location.z > 30000000) return hacknotif(player, "CrasherA");

        // fixed banning system, yay!
        // messy af but if it works then it works
        Commands.run(`execute ${player.name} ~~~ execute @s[scores={isBanned=3}] ~~~ kick ${player.name} "§cYOU ARE BANNED!\n\n§bReason: Sending Crash Packets\n§bBanned By: Scythe AntiCheat."`, World.getDimension("overworld"));
        Commands.run(`execute ${player.name} ~~~ execute @s[scores={isBanned=2}] ~~~ kick ${player.name} "§cYOU ARE BANNED!\n\n§bReason: Hacking Or Abuse\n§bBanned By: Scythe AntiCheat."`, World.getDimension("overworld"));
        Commands.run(`execute ${player.name} ~~~ execute @s[scores={isBanned=1}] ~~~ kick ${player.name} "§cYOU ARE BANNED!\n\n§bReason: Hacking Or Abuse\n§bBanned By: An Operator."`, World.getDimension("overworld"));
    };
});
