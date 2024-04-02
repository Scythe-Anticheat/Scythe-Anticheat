import { registerCommand } from "../handler.js";

registerCommand({
    name: "reset",
    description: "Resets the player and return to lobby",
    category: "other",
    execute: (message) => {
        message.player.runCommandAsync("function statereset");;
    }
});