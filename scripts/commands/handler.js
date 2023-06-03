import config from "../data/config.js";

// import all our commands
import { kick } from "./moderation/kick.js";
import { help } from "./other/help.js";
import { notify } from "./moderation/notify.js";
import { op } from "./moderation/op.js";
import { ban } from "./moderation/ban.js";
import { mute } from "./moderation/mute.js";
import { unmute } from "./moderation/unmute.js";
import { credits } from "./other/credits.js";
import { antigma } from "./settings/antigma.js";
import { antigmc } from "./settings/antigmc.js";
import { antigms } from "./settings/antigms.js";
import { bedrockvalidate } from "./settings/bedrockvalidate.js";
import { modules } from "./settings/modules.js";
import { npc } from "./settings/npc.js";
import { invalidsprint } from "./settings/invalidsprint.js";
import { overidecommandblocksenabled } from "./settings/overidecommandblocksenabled.js";
import { removecommandblocks } from "./settings/removecommandblocks.js";
import { worldborder } from "./settings/worldborder.js";
import { xray } from "./settings/xray.js";
import { autoclicker } from "./settings/autoclicker.js";
import { autoban } from "./settings/autoban.js";
import { tag } from "./utility/tag.js";
import { ecwipe } from "./utility/ecwipe.js";
import { freeze } from "./utility/freeze.js";
import { stats } from "./utility/stats.js";
import { fullreport } from "./utility/fullreport.js";
import { vanish } from "./utility/vanish.js";
import { fly } from "./utility/fly.js";
import { invsee } from "./utility/invsee.js";
import { cloneinv } from "./utility/cloneinv.js";
import { report } from "./other/report.js";
import { unban } from "./moderation/unban.js";
import { ui } from "./utility/ui.js";
import { resetwarns } from "./moderation/resetwarns.js";
import { version } from "./other/version.js";

const prefix = config.customcommands.prefix;

/**
 * @name commandHandler
 * @param {object} player - The player that has sent the message
 * @param {object} message - Message data
 */
export function commandHandler(player, message) {
    // validate that required params are defined
    if(typeof player !== "object") throw TypeError(`player is type of ${typeof player}. Expected "object"`);
    if(typeof message !== "object") throw TypeError(`message is type of ${typeof message}. Expected "object"`);

    if(config.debug) console.warn(`${new Date().toISOString()} | did run command handler`);

    // checks if the message starts with our prefix, if not exit
    if(!message.message.startsWith(prefix)) return;

    const args = message.message.slice(prefix.length).split(/ +/);

    const command = args.shift().toLowerCase().trim();

    if(config.debug) console.warn(`${new Date().toISOString()} | ${player.name} used the command: ${prefix}${command} ${args.join(" ")}`);

    let commandData;
    let commandName;

    try {
        if(typeof config.customcommands[command] === "object") {
            commandData = config.customcommands[command];
            commandName = command;
        } else {
            // check if the command is an alias
            for (const cmd of Object.keys(config.customcommands)) {
                const data = config.customcommands[cmd];
                if(typeof data !== "object" || !data.aliases || !data.aliases.includes(command)) continue;

                commandData = data;
                commandName = cmd;
                break;
            }

            // command does not exist
            if(!commandData) {
                if(config.customcommands.sendInvalidCommandMsg) {
                    player.sendMessage(`§r§6[§aScythe§6]§c The command: ${command} was not found. Please make sure it exists.`);
                    message.sendToTargets = true;
                }
                return;
            }
        }

        message.sendToTargets = false;

        if(commandData.requiredTags.length >= 1 && commandData.requiredTags.some(tag => !player.hasTag(tag))) {
            player.sendMessage("§r§6[§aScythe§6]§r You need to be Scythe-Opped to use this command. To gain scythe-op please run: /function op");
            return;
        }

        if(!commandData.enabled) {
            player.sendMessage("§r§6[§aScythe§6]§r This command has been disabled. Please contact your server administrator for assistance.");
            return;
        }

        if(commandName === "kick") kick(message, args);
        else if(commandName === "tag") tag(message, args);
        else if(commandName === "ban") ban(message, args);
        else if(commandName === "notify") notify(message);
        else if(commandName === "vanish") vanish(message);
        else if(commandName === "fly") fly(message, args);
        else if(commandName === "mute") mute(message, args);
        else if(commandName === "unmute") unmute(message, args);
        else if(commandName === "invsee" ) invsee(message, args);
        else if(commandName === "cloneinv" ) cloneinv(message, args);
        else if(commandName === "ecwipe") ecwipe(message, args);
        else if(commandName === "freeze") freeze(message, args);
        else if(commandName === "stats") stats(message, args);
        else if(commandName === "fullreport") fullreport(message);
        else if(commandName === "antigma") antigma(message);
        else if(commandName === "antigmc") antigmc(message);
        else if(commandName === "antigms") antigms(message);
        else if(commandName === "bedrockvalidate") bedrockvalidate(message);
        else if(commandName === "modules") modules(message);
        else if(commandName === "npc") npc(message);
        else if(commandName === "invalidsprint") invalidsprint(message);
        else if(commandName === "overridecommandblocksenabled") overidecommandblocksenabled(message);
        else if(commandName === "removecommandblocks") removecommandblocks(message);
        else if(commandName === "worldborder") worldborder(message);
        else if(commandName === "xray") xray(message);
        else if(commandName === "help") help(message);
        else if(commandName === "credits") credits(message);
        else if(commandName === "op") op(message, args);
        else if(commandName === "autoclicker") autoclicker(message);
        else if(commandName === "autoban") autoban(message);
        else if(commandName === "report") report(message, args);
        else if(commandName === "unban") unban(message, args);
        else if(commandName === "ui") ui(message);
        else if(commandName === "resetwarns") resetwarns(message, args);
        else if(commandName === "version") version(message);
        else throw Error(`Command ${commandName} was found in config.js but no handler for it was found.`);
    } catch (error) {
        console.error(`${new Date().toISOString()} | ${error} ${error.stack}`);
        player.sendMessage(`§r§6[§aScythe§6]§r There was an error while trying to run this command. Please forward this message to https://discord.gg/9m9TbgJ973.\n-------------------------\nCommand: ${String(message.message)}\n${String(error)}\n${error.stack || "\n"}-------------------------`);
    }
}
