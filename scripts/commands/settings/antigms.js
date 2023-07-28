import { registerCommand } from "../handler.js";

registerCommand({
    name: "antigms",
    execute: (message) => {
        message.sender.runCommandAsync("function settings/antiGMS");
    }
});