import { findPlayerByName, tellAllStaff } from "../../util.js";
import { registerCommand } from "../handler.js";

registerCommand({
    name: "mute",
    description: "Remove a player's ability to send chat messages",
    usage: "<player> [reason]",
    minArgCount: 1,
    category: "moderation",
    execute: (message, args) => {
        const player = message.sender;

        const reason = args.slice(1).join(" ").replace(/"|\\/g, "") ?? "No reason specified";

        // Find the player requested
        const member = findPlayerByName(args[0]);

        if(!member) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

        // Make sure they don't mute themselves
        if(member.id === player.id) return player.sendMessage("§r§6[§aScythe§6]§r You cannot mute yourself.");

        member.addTag("isMuted");
        member.sendMessage(`§r§6[§aScythe§6]§r You have been muted. Reason: ${reason}`);

        // Remove chat ability
        member.runCommandAsync("ability @s mute true");

        tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has muted ${member.name} for ${reason}`);
    }
});