import { GameMode } from "@minecraft/server";
import { tellAllStaff } from "../../util.js";
import { registerCommand } from "../handler.js";

registerCommand({
    name: "vanish",
    description: "Make yourself invisible to investigate players",
    aliases: ["v"],
    category: "utility",
    execute: (message) => {
        const { player } = message;

        if(player.getDynamicProperty("vanished")) {
            player.setDynamicProperty("vanished", false);

            player.setGameMode(player.getDynamicProperty("previousGamemode"));
            player.setDynamicProperty("previousGamemode", undefined);

            player.sendMessage("§r§6[§aScythe§6]§r You are now no longer vanished.");
            tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} is no longer vanished.`);
        } else {
            player.setDynamicProperty("vanished", true);

            // Store the player's previous gamemode so we can return them back when they exit out of vanish
            player.setDynamicProperty("previousGamemode", player.getGameMode());
            player.setGameMode(GameMode.Spectator);

            player.sendMessage("§r§6[§aScythe§6]§r You are now vanished.");
            tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} is now vanished.`);
        }
    }
});