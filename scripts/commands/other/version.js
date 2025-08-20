// @ts-check
import config from "../../data/config.js";
import { registerCommand } from "../handler.js";

registerCommand({
    name: "version",
    description: "Get the current version of Scythe",
    aliases: ["ver","about"],
    category: "other",
    execute: (message) => {
        const { player } = message;

        player.runCommand("function version");
        player.sendMessage(`§r§6[§aScythe§6]§r Config revision: ${config.version}`);
    }
});