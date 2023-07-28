import { registerCommand } from "../handler.js";

registerCommand({
    name: "fullreport",
    execute: (message) => {
        message.sender.runCommandAsync("execute @a ~~~ function tools/stats");
    }
});