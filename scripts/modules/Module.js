import config from "../data/config.js";

class Module {
	/**
	 * @class
	 * @param {Object} data
	 * @param {String} data.name - The name of the module
	 * @throws
	 */
	constructor({ name }) {
		this.name = name;

		const moduleConfig = config.misc_modules[this.name];
		if(!moduleConfig) throw Error(`No config data was found for module ${this.name}`);

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
}

export default Module;