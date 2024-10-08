import { findPlayerByName, tellAllStaff } from "../../util.js";
import { registerCommand } from "../handler.js";

registerCommand({
    name: "unmute",
    description: "Unmute a player and let them speak in chat again",
    usage: "<player> [reason]",
    minArgCount: 1,
    category: "moderation",
    execute: (message, args) => {
        const { player } = message;

        const reason = args.slice(1).join(" ").replace(/"|\\/g, "") || "No reason specified";

        // Find the player requested
        const member = findPlayerByName(args[0]);

        if(!member) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

        member.setDynamicProperty("muted", undefined);
        member.sendMessage("§r§6[§aScythe§6]§r You have been unmuted.");

        // Add chat ability
        member.runCommandAsync("ability @s mute false");

        tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has unmuted ${member.name} for ${reason}`);
    }
});