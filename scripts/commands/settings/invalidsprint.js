import { registerCommand } from "../handler.js";

registerCommand({
    name: "invalidsprint",
    execute: (message) => {
        message.sender.runCommandAsync("function settings/invalidsprint");
    }
});