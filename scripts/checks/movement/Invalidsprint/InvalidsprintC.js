// @ts-check
import Check from "../../../assets/Check.js";

class InvalidsprintC extends Check {
	/**
	 * @class
	 * @description Check for sprinting while sneaking
	 */
	constructor() {
		super({
			check: "Invalidsprint",
			subcheck: "C",
			type: "Movement"
		});
	}

	/**
	 * @param {import("@minecraft/server").Player} player
	 */
	tick(player) {
		// It is possible to sprint when flying in the air
		if(player.isSneaking && !player.isFlying) this.flag(player, undefined, true);
	}
}

export default new InvalidsprintC();