// @ts-check
// Manage globally stored data in dynamic properties
import { world } from "@minecraft/server";

class DataManager {
	/**
	 * @description Return whether or not global mute is enabled
	 * @returns {{ enabled: boolean, muter: string }} - Global mute data
	 */
	getGlobalMute() {
		let enabled;
		let muter;

		try {
			// Global mute data should always be a JSON object
			// @ts-expect-error
			const data = JSON.parse(world.getDynamicProperty("globalmute"));

			enabled = data.muted;
			muter = data.muter;
		} catch {
			// If global mute isn't set up, or is invalid, then create it
			this.setGlobalMute(false);

			enabled = false;
			muter = "";
		}

		return { enabled, muter };
	}

	/**
	 * @description Enable or disable global mute
	 * @param {boolean} value - Whether or not global mute is enabled
	 * @param {string} [muter] - Player who enabled global mute
	 */
	setGlobalMute(value, muter = "") {
		const data = { muted: value, muter: muter };

		world.setDynamicProperty("globalmute", JSON.stringify(data));
	}
}

export default new DataManager();