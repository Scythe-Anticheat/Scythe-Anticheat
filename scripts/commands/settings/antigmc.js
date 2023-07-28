import { registerCommand } from "../handler.js";

registerCommand({
    name: "antigmc",
    execute: (message) => {
        message.sender.runCommandAsync("function settings/antiGMC");
    }
});