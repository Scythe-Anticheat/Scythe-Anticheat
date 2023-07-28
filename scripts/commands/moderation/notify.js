import { registerCommand } from "../handler.js";

registerCommand({
    name: "notify",
    execute: (message) => {
        const player = message.sender;

        if(player.hasTag("notify")) {
            player.removeTag("notify");

            player.sendMessage("§r§6[§aScythe§6]§r You will now no longer recieve cheat notifications.");
            player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r ${player.name} has §4disabled§r cheat notifications."}]}`);
        } else {
            player.addTag("notify");

            player.sendMessage("§r§6[§aScythe§6]§r You will now recieve cheat notifications.");
            player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r ${player.name} has §aenabled§r cheat notifications."}]}`);
        }
    }
});