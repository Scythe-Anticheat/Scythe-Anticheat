// @ts-check
import Check from "../../Check.js";

class AutoOffhandA extends Check {
	/**
	 * @class
	 * @description Check for moving items into the offhand while doing another action
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
			this.flag(player, `state=moving`, true);
		}

		if(player.isUsingItem) {
			this.flag(player, `state=usingItem`);
		}

		const lastSwingTime = Date.now() - player.lastLeftClick;
		if(lastSwingTime > 250) {
			this.flag(player, `state=swungHand,lastSwingTime=${lastSwingTime}`);
		}
	}
}

export default new AutoOffhandA();