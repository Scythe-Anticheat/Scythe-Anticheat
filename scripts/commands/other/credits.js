import { registerCommand } from "../handler.js";

registerCommand({
    name: "credits",
    description: "Show credits for the anticheat",
    category: "other",
    execute: (message) => {
        message.player.runCommandAsync("function credits");
    }
});