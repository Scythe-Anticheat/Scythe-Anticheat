// @ts-check
import Check from "../../../assets/Check.js";

class InvalidsprintA extends Check {
	/**
	 * @class
	 * @description Check for sprinting while having the blindness effect
	 */
	constructor() {
		super({
			check: "Invalidsprint",
			subcheck: "A",
			type: "Movement"
		});
	}

	/**
	 * @param {import("@minecraft/server").Player} player
	 */
	tick(player) {
		if(player.getEffect("blindndess")) this.flag(player, undefined, true);
	}
}

export default new InvalidsprintA();