import { registerCommand } from "../handler.js";

registerCommand({
    name: "worldborder",
    execute: (message) => {
        message.sender.runCommandAsync("function settings/worldborder");
    }
});