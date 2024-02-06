import config from "../../data/config.js";
import { registerCommand } from "../handler.js";

registerCommand({
    name: "version",
    description: "Shows what version the anticheat is using",
    category: "other",
    execute: (message) => {
        const player = message.sender;

        player.runCommandAsync("function version");
        player.sendMessage(`§r§6[§aScythe§6]§r Config version: ${config.version}.`);
    }
});