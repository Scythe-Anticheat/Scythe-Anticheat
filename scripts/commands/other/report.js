import { findPlayerByName, tellAllStaff } from "../../util.js";
import { registerCommand } from "../handler.js";

registerCommand({
    name: "report",
    description: "Sends a player report to all currently online staff members",
    usage: "<player> [reason]",
    minArgCount: 1,
    category: "other",
    execute: (message, args) => {
        const { player } = message;
        const reason = args.slice(1).join(" ") ?? "No reason specified";

        // Find the player requested
        const member = findPlayerByName(args[0]);

        if(!member) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

        // Make sure they don't report themselves
        if(member.id === player.id) return player.sendMessage("§r§6[§aScythe§6]§r You cannot report yourself.");

        // Prevent report spam
        if(player.reports.includes(member.id)) return player.sendMessage("§r§6[§aScythe§6]§r You have already reported this player.");
        player.reports.push(member.id);

        player.sendMessage(`§r§6[§aScythe§6]§r You have reported ${member.name} for ${reason}.`);

        tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has reported ${member.name} for ${reason}`);
    }
});