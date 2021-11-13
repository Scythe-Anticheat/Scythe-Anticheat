import * as Minecraft from "mojang-minecraft";

const World = Minecraft.World;
const Commands = Minecraft.Commands;

// import all our commands
import { kick } from "./moderation/kick.js";
import { tag } from "./utility/tag.js";

// to make eslint shut up 
if (Commands !== World) console.log(`impossible`);

let prefix = "!";

export function commandHandler(player, message) {
    // validate that required params are defined
    if (!player) return console.warn("Error: ${player} isnt defined. Did you forget to pass it? (./commands/handler.js:13)");
    if (!message) return console.warn("Error: ${message} isnt defined. Did you forget to pass it? (./commands/handler.js:14)");

    console.warn("hello world");

    // checks if the message starts with our prefix, if not exit
    if (!message.message.startsWith(prefix)) return;

    let args = message.message.slice(prefix.length).split(/ +/);

    const commandName = args.shift().toLowerCase();

    // we could much easily get rid of the if/else chain only if we have npm support...
    if (commandName === "kick") {
        kick(message, args);
    } else if (commandName === "tag") {
        tag(message, args);
    }
}
