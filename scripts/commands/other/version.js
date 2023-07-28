import { registerCommand } from "../handler.js";

registerCommand({
    name: "version",
    execute: (message) => {
        message.sender.runCommandAsync("function version");
    }
});