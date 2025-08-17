// @ts-check
import { findPlayerByName, tellAllStaff } from "../../util.js";
import { registerCommand } from "../handler.js";

registerCommand({
    name: "report",
    description: "Send a player report to all currently online staff members",
    usage: "<player> [reason]",
    minArgCount: 1,
    category: "other",
    execute: (message, args) => {
        const { player } = message;

        // Find the player requested
        const target = findPlayerByName(args[0]);
        if(!target) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

        // Make sure they don't report themselves
        if(target.id === player.id) return player.sendMessage("§r§6[§aScythe§6]§r You cannot report yourself.");

        // Prevent report spam
        if(player.reports.includes(target.id)) return player.sendMessage("§r§6[§aScythe§6]§r You have already reported this player.");
        player.reports.push(target.id);

        const reason = args.slice(1).join(" ") || "No reason specified";

        player.sendMessage(`§r§6[§aScythe§6]§r You have reported ${target.name} for ${reason}.`);

        tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has reported ${target.name} for ${reason}`);
    }
});