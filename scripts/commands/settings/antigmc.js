import { registerCommand } from "../handler.js";

registerCommand({
    name: "antigmc",
    description: "Toggle the anti-gamemode creative mode module",
    category: "settings",
    execute: (message) => {
        message.sender.runCommandAsync("function settings/antiGMC");
    }
});