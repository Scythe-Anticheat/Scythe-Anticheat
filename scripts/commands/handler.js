import * as Minecraft from "mojang-minecraft";

const World = Minecraft.World;
const Commands = Minecraft.Commands;

// import all our commands
import { kick } from "./moderation/kick.js";
import { ban } from "./moderation/ban.js";
import { tag } from "./utility/tag.js";

// to make eslint shut up 
if (Commands !== World) console.log(`impossible`);

let prefix = "!";

export function commandHandler(player, message, debug) {
    // validate that required params are defined
    if (!player) return console.warn("Error: ${player} isnt defined. Did you forget to pass it? (./commands/handler.js:13)");
    if (!message) return console.warn("Error: ${message} isnt defined. Did you forget to pass it? (./commands/handler.js:14)");

    if (debug) console.warn("did run command handler");

    // checks if the message starts with our prefix, if not exit
    if (!message.message.startsWith(prefix)) return;

    let args = message.message.slice(prefix.length).split(/ +/);

    const commandName = args.shift().toLowerCase();

    console.warn(`${player.name} used the command: ${prefix}${commandName} ${args.join(" ")}`);

    // we could much easily get rid of the if/else chain only if we have npm support...
    try {
        if (commandName === "kick") kick(message, args);
        else if (commandName === "tag") tag(message, args);
        else if (commandName === "ban") ban(message, args);
    } catch (error) {
        console.warn(error);
        return Commands.run(`tellraw ${player.nameTag} {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"There was an error while trying to run this command. Please read console output"}]}`, World.getDimension("overworld"));
    }
}
