// @ts-check
import { findPlayerByName, tellAllStaff } from "../../util.js";
import { registerCommand } from "../handler.js";

registerCommand({
    name: "mute",
    description: "Remove a player's ability to send chat messages",
    usage: "<player> [reason]",
    minArgCount: 1,
    aliases: ["m"],
    category: "moderation",
    execute: (message, args) => {
        const { player } = message;

        const reason = args.slice(1).join(" ").replace(/"|\\/g, "") || "No reason specified";

        // Find the player requested
        const target = findPlayerByName(args[0]);

        if(!target) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

        // Make sure they don't mute themselves
        if(target.id === player.id) return player.sendMessage("§r§6[§aScythe§6]§r You cannot mute yourself.");

        target.setDynamicProperty("muted", true);
        // Remove chat ability
        target.runCommand("ability @s mute true");

        target.sendMessage(`§r§6[§aScythe§6]§r You have been muted. Reason: ${reason}`);

        tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has muted ${target.name} for ${reason}`);
    }
});