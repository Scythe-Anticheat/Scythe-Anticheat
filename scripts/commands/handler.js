import * as Minecraft from "mojang-minecraft";
import config from "../config.js";

const World = Minecraft.World;
const Commands = Minecraft.Commands;

// import all our commands
import { kick } from "./moderation/kick.js";
import { ban } from "./moderation/ban.js";
import { mute } from "./moderation/mute.js";
import { unmute } from "./moderation/unmute.js";
import { notify } from "./utility/notify.js";
import { tag } from "./utility/tag.js";
import { vanish } from "./utility/vanish.js";
import { fly } from "./utility/fly.js";
import { invsee } from "./utility/invsee.js";

// to make eslint shut up 
if (Commands === World) console.log(`impossible`);

let prefix = "!";

/**
 * @name commandHandler
 * @param {object} player - The player that has sent the message
 * @param {object} message - Message data
 */
export function commandHandler(player, message) {
    // validate that required params are defined
    if (!player) return console.warn(`${new Date()} | ` + "Error: ${player} isnt defined. Did you forget to pass it? (./commands/handler.js:13)");
    if (!message) return console.warn(`${new Date()} | ` + "Error: ${message} isnt defined. Did you forget to pass it? (./commands/handler.js:14)");

    if (config.debug) console.warn(`${new Date()} | ` + "did run command handler");

    // checks if the message starts with our prefix, if not exit
    if (!message.message.startsWith(prefix)) return;

    let args = message.message.slice(prefix.length).split(/ +/);

    const commandName = args.shift().toLowerCase();

    if (config.debug) console.warn(`${new Date()} | ${player.name} used the command: ${prefix}${commandName} ${args.join(" ")}`);

    // we could much easily get rid of the if/else chain only if we have npm support...
    try {
        if (config.customcommands.kick && commandName === "kick") kick(message, args);
        else if (config.customcommands.tag && commandName === "tag" || commandName === "nametag") tag(message, args);
        else if (config.customcommands.ban && commandName === "ban") ban(message, args);
        else if (config.customcommands.notify && commandName === "notify") notify(message);
        else if (config.customcommands.vanish && commandName === "vanish" || commandName === "v") vanish(message);
        else if (config.customcommands.fly && commandName === "fly") fly(message, args);
        else if (config.customcommands.mute && commandName === "mute") mute(message, args);
        else if (config.customcommands.unmute && commandName === "unmute") unmute(message, args);
        else if (config.customcommands.invsee && commandName === "invsee") invsee(message, args);
        else return;
    } catch (error) {
        console.warn(`${new Date()} | ` + error);
        return Commands.run(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"There was an error while trying to run this command. Please read console output"}]}`, World.getDimension("overworld"));
    }
}