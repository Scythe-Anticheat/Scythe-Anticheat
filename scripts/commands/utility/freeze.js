import { findPlayerByName } from "../../util.js";
import { registerCommand } from "../handler.js";

registerCommand({
    name: "freeze",
    description: "Toggle a player's ability to move",
    usage: "<player>",
    minArgCount: 1,
    category: "utility",
    execute: (message, args) => {
        const player = message.sender;

        // Find the player requested
        const member = findPlayerByName(args[0]);

        if(!member) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

        member.runCommandAsync("function tools/freeze");
    }
});