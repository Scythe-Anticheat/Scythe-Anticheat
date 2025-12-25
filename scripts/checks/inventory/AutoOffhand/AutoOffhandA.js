// @ts-check
import Check from "../../../assets/Check.js";

class AutoOffhandA extends Check {
	/**
	 * @class
	 * @description Check for moving items into the offhand while moving
	 */
	constructor() {
		super({
			check: "AutoOffhand",
			subcheck: "A",
			type: "Inventory"
		});
	}

	/**
	 * @param {import("@minecraft/server").Player} player
	 */
	tick(player) {
		if(player.isUsingInputKeys()) {
			this.flag(player, undefined, true);
		}
	}
}

export default new AutoOffhandA();