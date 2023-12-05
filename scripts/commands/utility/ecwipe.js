import { findPlayerByName, tellAllStaff } from "../../util.js";
import { registerCommand } from "../handler.js";

registerCommand({
    name: "ecwipe",
    usage: "<player>",
    minArgCount: 1,
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
