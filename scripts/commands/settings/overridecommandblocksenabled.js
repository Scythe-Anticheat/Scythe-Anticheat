import { registerCommand } from "../handler.js";

registerCommand({
    name: "overridecommandblocksenabled",
    execute: (message) => {
        message.sender.runCommandAsync("function settings/overrideCommandBlocksEnabled");
    }
});