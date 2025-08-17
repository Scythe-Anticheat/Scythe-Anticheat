// @ts-check
import { parseTime, findPlayerByName } from "../../util.js";
import { registerCommand } from "../handler.js";

registerCommand({
    name: "ban",
    description: "Ban the specified user from joining the world",
    usage: "<player> [time] [reason]",
    minArgCount: 1,
    aliases: ["b"],
    category: "moderation",
    execute: (message, args) => {
        const { player } = message;

        // Find the player requested
        const target = findPlayerByName(args[0]);
        if(!target) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

        // Make sure they do not ban themselves
        if(target.id === player.id) return player.sendMessage("§r§6[§aScythe§6]§r You cannot ban yourself.");

        // Don't allow staff to ban other staff members
        if(target.hasTag("op")) return player.sendMessage("§r§6[§aScythe§6]§r You cannot ban other staff members.");

        // Check if ban length is provided
        const time = args[1] ? parseTime(args[1]) : undefined;
        if(time) args.splice(1, 1);

        const reason = args.slice(1).join(" ");

        target.ban(player, reason, time);
    }
});