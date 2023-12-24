import { registerCommand } from "../handler.js";

registerCommand({
    name: "antigms",
    description: "Toggle the anti-gamemode survival mode module",
    category: "settings",
    execute: (message) => {
        message.sender.runCommandAsync("function settings/antiGMS");
    }
});