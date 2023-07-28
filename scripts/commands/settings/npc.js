import { registerCommand } from "../handler.js";

registerCommand({
    name: "npc",
    execute: (message) => {
        message.sender.runCommandAsync("function settings/npc");
    }
});