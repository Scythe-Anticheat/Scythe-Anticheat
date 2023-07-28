import { registerCommand } from "../handler.js";
import data from "../../data/data.js";

registerCommand({
    name: "autoclicker",
    execute: (message) => {
        data.checkedModules.autoclicker = false;

        message.sender.runCommandAsync("function settings/antiGMA");
    }
});