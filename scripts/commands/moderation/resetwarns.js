import { findPlayerByName, tellAllStaff } from "../../util.js";
import { registerCommand } from "../handler.js";

registerCommand({
    name: "resetwarns",
    usage: "<player>",
    minArgCount: 1,
    execute: (message, args) => {
        const player = message.sender;

        // Find the player requested
        const member = findPlayerByName(args[0]);

        if(!member) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

        if(member.id === player.id) return player.sendMessage("§r§6[§aScythe§6]§r You cannot reset your own warns.");

        tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has reset ${member.name}'s warns.`);

        member.runCommandAsync("function tools/resetwarns");
    }
});