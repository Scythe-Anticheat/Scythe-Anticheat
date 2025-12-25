// @ts-check
import Check from "../../../assets/Check.js";

class AutoOffhandC extends Check {
	/**
	 * @class
	 * @description Check for moving items into the offhand while swinging their hand
	 */
	constructor() {
		super({
			check: "AutoOffhand",
			subcheck: "C",
			type: "Inventory"
		});
	}

	/**
	 * @param {import("@minecraft/server").Player} player
	 */
	tick(player) {
		if(player.hasTag("left")) {
			this.flag(player);
		}
	}
}

export default new AutoOffhandC();