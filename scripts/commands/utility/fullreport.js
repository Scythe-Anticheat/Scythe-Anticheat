import { world } from "@minecraft/server";
import { registerCommand } from "../handler.js";
import { getStatsMsg } from "../moderation/stats.js";

registerCommand({
    name: "fullreport",
    execute: (message) => {
        for(const player of world.getPlayers()) {
            message.sender.sendMessage(getStatsMsg(player));
        }
    }
});