import { registerCommand } from "../handler.js";

registerCommand({
    name: "version",
    description: "Shows what version the anticheat is using",
    category: "other",
    execute: (message) => {
        message.sender.runCommandAsync("function version");
    }
});