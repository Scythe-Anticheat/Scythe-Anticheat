import { registerCommand } from "../handler.js";

registerCommand({
    name: "credits",
    execute: (message) => {
        message.sender.runCommandAsync("function credits");
    }
});