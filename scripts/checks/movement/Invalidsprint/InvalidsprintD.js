// @ts-check
import Check from "../../../assets/Check.js";

class InvalidsprintD extends Check {
	/**
	 * @class
	 * @description Check for sprinting while using an elytra
	 */
	constructor() {
		super({
			check: "Invalidsprint",
			subcheck: "D",
			type: "Movement"
		});
	}

	/**
	 * @param {import("@minecraft/server").Player} player
	 */
	tick(player) {
		if(player.isGliding) this.flag(player, undefined, true);
	}
}

export default new InvalidsprintD();