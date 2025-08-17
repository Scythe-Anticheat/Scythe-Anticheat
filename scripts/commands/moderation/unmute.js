// @ts-check
import { findPlayerByName } from "../../util.js";
import { registerCommand } from "../handler.js";

registerCommand({
    name: "unmute",
    description: "Unmute a player and let them speak in chat again",
    usage: "<player> [reason]",
    minArgCount: 1,
    aliases: ["um"],
    category: "moderation",
    execute: (message, args) => {
        const { player } = message;

        // Find the player requested
        const target = findPlayerByName(args[0]);
        if(!target) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

        const reason = args.slice(1).join(" ").replace(/"|\\/g, "");

        target.unmute(player, reason);
    }
});