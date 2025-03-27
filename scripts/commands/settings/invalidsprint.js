// @ts-check
import { registerCommand } from "../handler.js";

registerCommand({
    name: "invalidsprint",
    description: "Enable the anti-invalid sprint module",
    aliases: ["is"],
    category: "settings",
    execute: (message) => {
        message.player.runCommand("function settings/invalidsprint");
    }
});