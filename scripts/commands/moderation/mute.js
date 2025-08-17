// @ts-check
import { findPlayerByName } from "../../util.js";
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

        // Find the player requested
        const target = findPlayerByName(args[0]);
        if(!target) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

        // Make sure they don't mute themselves
        if(target.id === player.id) return player.sendMessage("§r§6[§aScythe§6]§r You cannot mute yourself.");

        const reason = args.slice(1).join(" ").replace(/"|\\/g, "");

        target.mute(player, reason);
    }
});