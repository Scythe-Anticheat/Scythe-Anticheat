// @ts-check
import Check from "../../../assets/Check.js";

class InvalidsprintB extends Check {
	/**
	 * @class
	 * @description Check for sprinting while using an item
	 */
	constructor() {
		super({
			check: "Invalidsprint",
			subcheck: "B",
			type: "Movement"
		});
	}

	/**
	 * @param {import("@minecraft/server").Player} player
	 */
	tick(player) {
		if(!player.isUsingItem || player.heldItem === "minecraft:trident") return;

		// This module is disabled due to false flags
		// When the player is about to finish eating food, the game makes the player sprint right before the player finishes eating
		const now = Date.now();
		if(now - player.itemUsedAt >= 200) this.flag(player, `itemUsedFor=${now - player.itemUsedAt}`, true);
	}
}

export default new InvalidsprintB();