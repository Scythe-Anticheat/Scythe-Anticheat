import { findPlayerByName, addOp } from "../../util.js";
import { registerCommand } from "../handler.js";

registerCommand({
    name: "op",
    description: "Give a specific player Scythe-OP",
    usage: "<player>",
    minArgCount: 1,
    category: "moderation",
    execute: (message, args) => {
        const { player } = message;

        // Find the player requested
        const member = findPlayerByName(args[0]);

        if(!member) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

        if(member.hasTag("op")) return player.sendMessage("§r§6[§aScythe§6]§r This player already has scythe-op.");

        addOp(player, member);
    }
});