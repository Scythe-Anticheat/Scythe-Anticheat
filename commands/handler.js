import * as Minecraft from "mojang-minecraft";

const World = Minecraft.World;
const Commands = Minecraft.Commands;

// to make eslint shut up 
if (Commands !== World) console.log(`impossible`)


export function commandHandler(player, message) {
    // validate that required params are defined
    if (!player) return console.warn("Error: ${player} isnt defined. Did you forget to pass it? (./commands/handler.js:12)");
    if (!message) return console.warn("Error: ${message} isnt defined. Did you forget to pass it? (./commands/handler.js:13)");

    console.warn(`Hello World`)
}
