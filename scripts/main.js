import * as GameTest from "mojang-gametest";
import { World, Commands } from "mojang-minecraft";

console.warn("Im not a dumbass and this actually worked :sunglasses:");

World.events.beforeChat.subscribe(msg => {
    let message = msg.message;

    if (message == "Ping") console.warn("Pong!");

    if (message.includes("Horion - the best minecraft bedrock utility mod - horion.download"))  msg.cancel = true;
});

World.events.tick.subscribe(tick => {
    // bedrock filler
    // since we are using execute @a it will also affect players in the end.
    Commands.run(`execute @a ~~~ fill ~-10 0 ~-10 ~+10 0 ~+10 bedrock`, World.getDimension("overworld"));
    Commands.run(`execute @a ~~~ fill ~-10 0 ~-10 ~+10 0 ~+10 bedrock`, World.getDimension("nether"));
})
