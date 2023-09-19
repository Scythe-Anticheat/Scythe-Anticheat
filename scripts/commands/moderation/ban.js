import { parseTime, findPlayerByName, tellAllStaff } from "../../util.js";
import { registerCommand } from "../handler.js";

registerCommand({
    name: "ban",
    usage: "<player> [time] [reason]",
    minArgCount: 1,
    execute: (message, args) => {
        const player = message.sender;
        const time = args[1] ? parseTime(args[1]) : undefined;

        if(!time) args.splice(1, 1);

        const reason = args.slice(1).join(" ").replace(/"|\\/g, "") ?? "No reason specified";

        // Find the player requested
        const member = findPlayerByName(args[0]);

        if(!member) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

        // Make sure they don't ban themselves
        if(member.id === player.id) return player.sendMessage("§r§6[§aScythe§6]§r You cannot ban yourself.");

        // Don't allow staff to ban other staff members
        if(member.hasTag("op")) return player.sendMessage("§r§6[§aScythe§6]§r You cannot ban other staff members.");

        // Remove old ban data
        member.getTags().forEach(t => {
            if(t.startsWith("reason:") || t.startsWith("by:") || t.startsWith("time:")) member.removeTag(t);
        });

        member.addTag(`reason:${reason}`);
        member.addTag(`by:${player.name}`);
        if(typeof time === "number") member.addTag(`time:${Date.now() + time}`);
        member.addTag("isBanned");

        tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has banned ${member.name} for ${reason}`);
    }
});