// @ts-check
import Check from "../../Check.js";

class InvalidsprintE extends Check {
	/**
	 * @class
	 * @description Check for sprinting while riding an entity
	 */
	constructor() {
		super({
			check: "Invalidsprint",
			subcheck: "E",
			type: "Movement"
		});
	}

	/**
	 * @param {import("@minecraft/server").Player} player
	 */
	tick(player) {
		if(!player.isUsingInputKeys() || !player.hasTag("riding")) return;

		// Make sure the player hasn't moved within the last four ticks (4 * 50)
		const now = Date.now();
		if(now - player.movedAt > 200) this.flag(player, `movedFor=${now - player.movedAt}`);
	}
}

export default new InvalidsprintE();