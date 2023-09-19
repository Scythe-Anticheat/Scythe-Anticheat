import { registerCommand } from "../handler.js";

registerCommand({
    name: "removecommandblocks",
    execute: (message) => {
        message.sender.runCommandAsync("function settings/removeCommandBlocks");
    }
});