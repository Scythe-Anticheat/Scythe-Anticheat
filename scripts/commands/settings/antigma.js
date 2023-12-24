import { registerCommand } from "../handler.js";

registerCommand({
    name: "antigma",
    description: "Toggle the anti-gamemode adventure mode module",
    category: "settings",
    execute: (message) => {
        message.sender.runCommandAsync("function settings/antiGMA");
    }
});