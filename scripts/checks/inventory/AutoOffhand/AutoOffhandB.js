// @ts-check
import Check from "../../../assets/Check.js";

class AutoOffhandB extends Check {
	/**
	 * @class
	 * @description Check for moving items into the offhand while using an item
	 */
	constructor() {
		super({
			check: "AutoOffhand",
			subcheck: "B",
			type: "Inventory"
		});
	}

	/**
	 * @param {import("@minecraft/server").Player} player
	 */
	tick(player) {
		if(player.isUsingItem) {
			this.flag(player);
		}
	}
}

export default new AutoOffhandB();