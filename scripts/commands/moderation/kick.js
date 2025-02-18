import { findPlayerByName, tellAllStaff } from "../../util.js";
import { registerCommand } from "../handler.js";

registerCommand({
    name: "kick",
    description: "Kick out a player from the world",
    usage: "<player> [-s] [--silent] [reason]",
    minArgCount: 1,
    aliases: ["k"],
    category: "moderation",
    execute: (message, args) => {
        const { player } = message;

        let isSilent = false;
        if(args[1] === "-s" || args[1] === "--silent") isSilent = true;

        const reason = args.slice(1).join(" ").replace(/-s|-silent|"|\\/g, "") || "No reason specified";

        // Find the player requested
        const target = findPlayerByName(args[0]);

        if(!target) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

        // Make sure they don't kick themselves
        if(target.id === player.id) return player.sendMessage("§r§6[§aScythe§6]§r You cannot kick yourself.");

        isSilent ? target.triggerEvent("scythe:kick") : target.runCommandAsync(`kick @s ${reason}`);

        tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has kicked ${target.name} ${isSilent ? "(Silent) ": ""}for ${reason}`);
    }
});