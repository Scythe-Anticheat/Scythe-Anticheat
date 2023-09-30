import { tellAllStaff } from "../../util.js"; 
import { registerCommand } from "../handler.js";
import data from "../../data/data.js";

registerCommand({
    name: "unban",
    usage: "<player> [reason]",
    minArgCount: 1,
    execute: (message, args) => {
        const player = message.sender;

        const reason = args.slice(1).join(" ").replace(/"|\\/g, "") ?? "No reason specified";

        const member = args[0].replace(/\\/g, "");

        if(data.unbanQueue.includes(member)) return player.sendMessage(`§r§6[§aScythe§6]§r ${member} is already queued for an unban.`);

        data.unbanQueue.push(member.toLowerCase());

        tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has added ${member} to the unban queue. Reason: ${reason}`);
    }
});