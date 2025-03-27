// @ts-check
import { world } from "@minecraft/server";
import { registerCommand } from "../handler.js";

registerCommand({
    name: "resetconfig",
    description: "Reset the saved config and instead rely on the config.js file",
    category: "settings",
    execute: (message) => {
        world.setDynamicProperty("config", undefined);

        message.player.sendMessage("§r§6[§aScythe§6]§r The scythe config has been reset. Run '/reload' to apply the changes.");
    }
});