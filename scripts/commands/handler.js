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
import { allowgma } from "./settings/allowgma.js";
import { allowgmc } from "./settings/allowgmc.js";
import { allowgms } from "./settings/allowgms.js";
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
import { oldvanish } from "./utility/oldvanish.js";
import { fly } from "./utility/fly.js";
import { invsee } from "./utility/invsee.js";
import { report } from "./other/report.js";
import { unban } from "./moderation/unban.js";
import { gui } from "./utility/gui.js";

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
    if (!message.message.startsWith(config.customcommands.prefix)) return;

    let args = message.message.slice(config.customcommands.prefix.length).split(/ +/);

    const commandName = args.shift().toLowerCase();

    if (config.debug) console.warn(`${new Date()} | ${player.name} used the command: ${config.customcommands.prefix}${commandName} ${args.join(" ")}`);

    // this wont work if you use a command alias
    if(config.customcommands[commandName] === false) {
        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"This command has been disabled in config.js. If this was a mistake please contact your server owner,"}]}`);
        message.cancel = true;
        return;
    }

    // we could much easily get rid of the if/else chain only if we have npm support...
    try {
        if (config.customcommands.kick && commandName === "kick") kick(message, args);
        else if (config.customcommands.tag && commandName === "tag" || commandName === "rank") tag(message, args);
        else if (config.customcommands.ban && commandName === "ban") ban(message, args);
        else if (config.customcommands.notify && commandName === "notify") notify(message);
        else if (config.customcommands.vanish && commandName === "vanish" || commandName === "v") vanish(message);
	else if (config.customcommands.oldvanish && commandName === "oldvanish" || commandName === "ov") oldvanish(message);
        else if (config.customcommands.fly && commandName === "fly" || commandName === "birdmode") fly(message, args);
        else if (config.customcommands.mute && commandName === "mute") mute(message, args);
        else if (config.customcommands.unmute && commandName === "unmute") unmute(message, args);
        else if (config.customcommands.invsee && commandName === "invsee" || commandName === "inv") invsee(message, args);
        else if (config.customcommands.ecwipe && commandName === "ecwipe") ecwipe(message, args);
        else if (config.customcommands.freeze && commandName === "freeze") freeze(message, args);
        else if (config.customcommands.stats && commandName === "stats") stats(message, args);
        else if (config.customcommands.fullreport && commandName === "fullreport") fullreport(message);
        else if (config.customcommands.allowgma && commandName === "allowgma") allowgma(message);
        else if (config.customcommands.allowgmc && commandName === "allowgmc") allowgmc(message);
        else if (config.customcommands.allowgms && commandName === "allowgms") allowgms(message);
        else if (config.customcommands.bedrockvalidate && commandName === "bedrockvalidate") bedrockvalidate(message);
        else if (config.customcommands.modules && commandName === "modules") modules(message);
        else if (config.customcommands.npc && commandName === "npc") npc(message);
        else if (config.customcommands.invalidsprint && commandName === "invalidsprint") invalidsprint(message);
        else if (config.customcommands.overidecommandblocksenabled && commandName === "overridecbe" || commandName === "overidecommandblocksenabled") overidecommandblocksenabled(message);
        else if (config.customcommands.removecommandblocks && commandName === "removecb" || commandName === "removecommandblocks") removecommandblocks(message);
        else if (config.customcommands.worldborder && commandName === "worldborder" || commandName === "wb") worldborder(message);
        else if (config.customcommands.xray && commandName === "xray") xray(message);
        else if (config.customcommands.help && commandName === "help") help(message);
        else if (config.customcommands.credits && commandName === "credits") credits(message);
        else if (config.customcommands.op && commandName === "op") op(message, args);
        else if (config.customcommands.autoclicker && commandName === "autoclicker") autoclicker(message);
        else if (config.customcommands.autoban && commandName === "autoban") autoban(message);
        else if (config.customcommands.report && commandName === "report") report(message, args);
        else if (config.customcommands.unban && commandName === "unban") unban(message, args);
        else if (config.customcommands.gui && commandName === "gui") gui(message);
        else return;
    } catch (error) {
        console.warn(`${new Date()} | ` + `${error} ${error.stack}`);
        return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"There was an error while trying to run this command. Please forward this message to support.\n-------------------------\nCommand: ${String(message.message).replace(/"|\\/g, "")}\nError: ${String(error).replace(/"|\\/g, "")}\n${error.stack}\n-------------------------"}]}`);
    }
}
