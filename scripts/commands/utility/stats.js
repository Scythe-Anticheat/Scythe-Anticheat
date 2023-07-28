import * as Minecraft from "@minecraft/server";
import { registerCommand } from "../handler.js";

const world = Minecraft.world;

registerCommand({
    name: "stats",
    usage: "<player>",
    minArgCount: 1,
    execute: (message, args) => {
        const player = message.sender;

        // try to find the player requested
        let member;

        for (const pl of world.getPlayers()) if(pl.name.toLowerCase().includes(args[0].toLowerCase().replace(/"|\\|@/g, ""))) {
            member = pl;
            break;
        }

        if(!member) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

        member.runCommandAsync("function tools/stats");
    }
});