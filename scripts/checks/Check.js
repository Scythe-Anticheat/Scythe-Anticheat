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

		const moduleConfig = config.modules[this.check.toLowerCase() + this.subcheck];
		if(!moduleConfig) throw Error(`No config data was found for ${this.check}[${this.subcheck}]`);

		Object.defineProperty(moduleConfig, "_enabled", {
			// We dont want the command or UI interfaces to show the '_enabled' field
			enumerable: false,
			writable: true,
			value: moduleConfig.enabled
		});

		const self = this;
		Object.defineProperty(moduleConfig, "enabled", {
			enumerable: true,
			get: function() {
				return this._enabled;
			},
			set: function(value) {
				if(config.debug) console.log(`${this._enabled} --> ${value}`);
				// Module was enabled
				if(!this._enabled && value) self.enable?.();

				// Module was disabled
				if(this._enabled && !value) self.disable?.();

				this._enabled = value;
			}
		});

		this.config = moduleConfig;
	}

	/**
	 * @param {import("@minecraft/server").Player} player - The player that should be flagged
	 * @param {String} [debug] - Debug information about what caused the flag
	 * @param {Boolean} [resetPos] - Should the player's position be reset to the last known good position
	 */
	flag(player, debug, resetPos = false) {
		flag(player, this.check, this.subcheck, this.type, debug, resetPos);
	}

	// Incase we are in a before event then we will need to wait one tick before we can run the flag function
	delayedFlag(...args) {
		system.run(() => this.flag(...args));
	}
}

export default Check;