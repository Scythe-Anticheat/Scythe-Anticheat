// @ts-check
import { tellAllStaff } from "../../util.js";
import { registerCommand } from "../handler.js";

registerCommand({
    name: "notify",
    description: "Recieve alerts when a player gets flagged by Scythe Anticheat",
    category: "moderation",
    execute: (message) => {
        const { player } = message;

        if(player.hasTag("notify")) {
            player.removeTag("notify");

            player.sendMessage("§r§6[§aScythe§6]§r You will now no longer receive cheat notifications.");
            tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has §4disabled§r cheat notifications.`);
        } else {
            player.addTag("notify");

            player.sendMessage("§r§6[§aScythe§6]§r You will now receive cheat notifications.");
            tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has §aenabled§r cheat notifications.`);
        }
    }
});