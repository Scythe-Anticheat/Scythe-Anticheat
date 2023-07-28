import { registerCommand } from "../handler.js";

registerCommand({
    name: "antigma",
    execute: (message) => {
        message.sender.runCommandAsync("function settings/antiGMA");
    }
});