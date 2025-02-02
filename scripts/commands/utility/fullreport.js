import { world } from "@minecraft/server";
import { registerCommand } from "../handler.js";
import { getStatsMsg } from "../moderation/stats.js";

registerCommand({
    name: "fullreport",
    description: "Shows the violation history of all players online in the world",
    aliases: ["fr"],
    category: "utility",
    execute: (message) => {
        for(const player of world.getPlayers()) {
            message.player.sendMessage(getStatsMsg(player));
        }
    }
});