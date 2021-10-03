import * as GameTest from "mojang-gametest";
import { World, Commands } from "mojang-minecraft";

var debug = true

if (debug) console.warn("Im not a dumbass and this actually worked :sunglasses:");

World.events.beforeChat.subscribe(msg => {
    let message = msg.message;

    if (debug && message == "Ping") console.warn("Pong!");

    if (message.includes("Horion - the best minecraft bedrock utility mod - horion.download"))  msg.cancel = true;
});

World.events.tick.subscribe(() => {
    for (let player of World.getPlayers()) {
        // Namespoof/A = username length check.
        if(player.name.length > 15) 
            Commands.run(`execute ${player.name} ~~~ say i am a noob who uses namespoof`, World.getDimension("overworld"));

        // Namespoof/B = regex check
        let regex = /[^A-Za-z0-9_ ]/
        if(!regex.test(plater.name))
        Commands.run(`execute ${player.name} ~~~ say i am a noob who uses namespoof`, World.getDimension("overworld"));
    }
});
