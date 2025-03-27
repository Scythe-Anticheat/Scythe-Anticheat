// @ts-check
import { findPlayerByName, addOp } from "../../util.js";
import { registerCommand } from "../handler.js";

registerCommand({
    name: "op",
    description: "Give a specific player Scythe-OP",
    usage: "<player>",
    minArgCount: 1,
    aliases: ["staff"],
    category: "moderation",
    execute: (message, args) => {
        const { player } = message;

        // Find the player requested
        const target = findPlayerByName(args[0]);

        if(!target) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

        if(target.hasTag("op")) return player.sendMessage("§r§6[§aScythe§6]§r This player already has scythe-op.");

        addOp(player, target);
    }
});