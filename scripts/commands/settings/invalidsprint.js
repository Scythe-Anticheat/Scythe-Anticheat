import { registerCommand } from "../handler.js";

registerCommand({
    name: "invalidsprint",
    description: "Enable the anti-invalid sprint module",
    category: "settings",
    execute: (message) => {
        message.sender.runCommandAsync("function settings/invalidsprint");
    }
});