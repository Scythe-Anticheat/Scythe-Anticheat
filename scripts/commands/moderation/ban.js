// @ts-check
import { parseTime, findPlayerByName, tellAllStaff } from "../../util.js";
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
        const time = args[1] ? parseTime(args[1]) : undefined;

        // Remove time from arguments list if present
        if(time) args.splice(1, 1);

        // Remove player name and join all arguments together
        const reason = args.slice(1).join(" ").replace(/"|\\/g, "") || "No reason specified";

        // Find the player requested
        const target = findPlayerByName(args[0]);

        if(!target) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

        // Make sure they don't ban themselves
        if(target.id === player.id) return player.sendMessage("§r§6[§aScythe§6]§r You cannot ban yourself.");

        // Don't allow staff to ban other staff members
        if(target.hasTag("op")) return player.sendMessage("§r§6[§aScythe§6]§r You cannot ban other staff members.");

        target.setDynamicProperty("banInfo", JSON.stringify({
            by: player.name,
            reason: reason,
            time: typeof time === "number" ? Date.now() + time : null
        }));

        tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has banned ${target.name} for ${reason}`);
    }
});
