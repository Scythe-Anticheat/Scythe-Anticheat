import { system } from "@minecraft/server";
import { flag } from "../util.js";
import config from "../data/config.js";

class Check {
    /**
     * @class
     * @param {Object} data
     * @param {String} data.check - The name of the check
     * @param {String} data.subcheck - Which type of check (ex. A, B, C)
     * @param {String} data.type - What kind of cheat does this check detect (ex. Movement, Exploit)
     * @throws
     */
    constructor({ check, subcheck, type }) {
        this.check = check;
        this.subcheck = subcheck;
        this.type = type;

        // @ts-expect-error
        this.config = config.modules[`${this.check.toLowerCase()}${this.subcheck}`];
        if(!this.config) throw Error(`No config data was found for ${this.check}[${this.subcheck}]`);
    }

    /**
     * @param {import("@minecraft/server").Player} player - The player that should be flaged
     * @param {String} [debug] - Debug information about what caused the flag
     * @param {Boolean} [resetPos] - Should the player's position be reset to the last known good position
     * @param {Number} [slot] - The item slot to clear
     */
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