import * as GameTest from "mojang-gametest";
import { World, Commands } from "mojang-minecraft";

console.warn("Im not a dumbass and this actually worked :sunglasses:")

World.events.beforeChat.subscribe(msg => {
    let message = msg.message;
    
    if (message == "Ping") console.warn("Pong!")
});
