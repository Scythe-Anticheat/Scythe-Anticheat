import { findPlayerByName, tellAllStaff } from "../../util.js";
import { registerCommand } from "../handler.js";

registerCommand({
    name: "ecwipe",
    description: "Remove all items in a player's ender chest",
    usage: "<player>",
    minArgCount: 1,
    category: "utility",
    execute: (message, args) => {
        const player = message.sender;

        // Find the player requested
        const member = findPlayerByName(args[0]);

        if(!member) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

        wipeEnderchest(player, member);
    }
});

export function wipeEnderchest(initiator, player) {
    tellAllStaff(`§r§6[§aScythe§6]§r ${initiator.name} has cleared ${player.name}'s enderchest.`);

    for(let i = 0; i < 27; i++) {
        player.runCommandAsync(`replaceitem entity @s slot.enderchest ${i} air`);
    }
}
