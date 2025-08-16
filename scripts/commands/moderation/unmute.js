// @ts-check
import { findPlayerByName, tellAllStaff } from "../../util.js";
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

        const reason = args.slice(1).join(" ").replace(/"|\\/g, "");

        // Find the player requested
        const target = findPlayerByName(args[0]);

        if(!target) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

        target.unmute(player, reason);

        tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has unmuted ${target.name} for ${reason}`);
    }
});