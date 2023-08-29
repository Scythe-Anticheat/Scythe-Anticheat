import * as Minecraft from "@minecraft/server";
import { registerCommand } from "../handler.js";
import { getStatsMsg } from "./stats.js";

const world = Minecraft.world;

registerCommand({
    name: "fullreport",
    execute: (message) => {
        for(const player of world.getPlayers()) {
            message.sender.sendMessage(getStatsMsg(player));
        }
    }
});