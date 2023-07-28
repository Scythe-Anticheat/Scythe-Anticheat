import { registerCommand } from "../handler.js";

registerCommand({
    name: "modules",
    execute: (message) => {
        message.sender.runCommandAsync("function settings/modules");
    }
});