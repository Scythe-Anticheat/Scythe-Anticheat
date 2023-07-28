import { registerCommand } from "../handler.js";

registerCommand({
    name: "help",
    execute: (message) => {
        message.sender.runCommandAsync("function help");
    }
});