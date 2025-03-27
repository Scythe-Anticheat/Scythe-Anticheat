import { findPlayerByName, tellAllStaff } from "../../util.js";
import { registerCommand } from "../handler.js";

registerCommand({
    name: "ecwipe",
    description: "Remove all items in a player's ender chest",
    usage: "<player>",
    minArgCount: 1,
    aliases: ["ecw", "clearec"],
    category: "utility",
    execute: (message, args) => {
        const { player } = message;

        // Find the player requested
        const target = findPlayerByName(args[0]);

        if(!target) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

        wipeEnderchest(target, player);
    }
});

export function wipeEnderchest(target, initiator) {
    tellAllStaff(`§r§6[§aScythe§6]§r ${initiator.name} has cleared ${target.name}'s enderchest.`);

    for(let i = 0; i < 27; i++) {
        target.runCommand(`replaceitem entity @s slot.enderchest ${i} air`);
    }
}