import { registerCommand } from "../handler.js";

registerCommand({
    name: "npc",
    description: "Toggles the anti-NPC module",
    category: "settings",
    execute: (message) => {
        message.player.runCommandAsync("function settings/npc");
    }
});