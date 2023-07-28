import { registerCommand } from "../handler.js";

registerCommand({
    name: "overidecommandblocksenabled",
    execute: (message) => {
        message.sender.runCommandAsync("function settings/overideCommandBlocksEnabled");
    }
});