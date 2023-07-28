import { registerCommand } from "../handler.js";

registerCommand({
    name: "autoban",
    execute: (message) => {
        message.sender.runCommandAsync("function settings/autoban");
    }
});