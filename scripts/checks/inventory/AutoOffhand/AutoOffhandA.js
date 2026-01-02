// @ts-check
import Check from "../../../assets/Check.js";

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
		// Check if the player is using sending movement inputs
		if(player.isUsingInputKeys()) {
			this.flag(player, `state=moving`, true);
		}

		if(player.isUsingItem) {
			this.flag(player, `state=usingItem`);
		}

		// Check if the player is currently swinging their hand
		if(player.hasTag("left")) {
			this.flag(player, `state=swungHand`);
		}
	}
}

export default new AutoOffhandA();