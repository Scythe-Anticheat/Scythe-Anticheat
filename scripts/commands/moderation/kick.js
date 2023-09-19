import { findPlayerByName, tellAllStaff } from "../../util.js";
import { registerCommand } from "../handler.js";

registerCommand({
    name: "kick",
    usage: "<player> [-s] [--silent] [reason]",
    minArgCount: 1,
    execute: (message, args) => {
        const player = message.sender;

        let isSilent = false;
        if(args[1] === "-s" || args[1] === "--silent") isSilent = true;

        const reason = args.slice(1).join(" ").replace(/-s|-silent|"|\\/g, "") ?? "No reason specified";

        // Find the player requested
        const member = findPlayerByName(args[0]);

        if(!member) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

        // Make sure they don't kick themselves
        if(member.id === player.id) return player.sendMessage("§r§6[§aScythe§6]§r You cannot kick yourself.");

        if(!isSilent) player.runCommandAsync(`kick "${member.name}" ${reason}`);

        member.triggerEvent("scythe:kick");

        tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has kicked ${member.name} ${isSilent ? "(Silent) ": ""}for ${reason}`);
    }
});