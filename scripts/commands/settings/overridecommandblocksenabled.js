import { registerCommand } from "../handler.js";

registerCommand({
    name: "overridecommandblocksenabled",
    description: "Toggle the override command blocks enabled module, which can prevent change to the commandblocksenabled gamerule",
    category: "settings",
    execute: (message) => {
        message.sender.runCommandAsync("function settings/overrideCommandBlocksEnabled");
    }
});