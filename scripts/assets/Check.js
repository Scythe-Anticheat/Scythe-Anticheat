import config from "../data/config.js";
import { system } from "@minecraft/server";
import { flag } from "../util.js";

class Check {
    constructor() {
        this.check = null;
        this.subcheck = null;
        this.type = null;
    }

    get config() {
        return config.modules[`${this.check}${this.subcheck}`.toLowerCase()];
    }

    flag(player, debug, resetPos = false, slot) {
        // When all checks are migrated to the new Check class then we should move the flag function from utils into here
        flag(player, this.check, this.subcheck, this.type, debug, resetPos, slot);
    }

    // Incase we are in a before event then we will need to wait one tick before we can run the flag function
    delayedFlag(...args) {
        system.run(() => this.flag(...args));
    }
}

export default Check;