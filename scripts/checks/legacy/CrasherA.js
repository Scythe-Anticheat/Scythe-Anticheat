// @ts-check
import Check from "../Check.js";

class CrasherA extends Check {
	/**
	 * @class
	 * @description Check for invalid player positions
	 */
	constructor() {
		super({
			check: "Crasher",
			subcheck: "A",
			type: "Exploit"
		});
	}

	/**
	 * @param {import("@minecraft/server").Player} player
	 */
	tick(player) {
		/*
		Horion's old crasher would teleport the player to the position 4,294.967,295 in each coordinate plane
		This would result in the server crashing as it does not support such large player positions
		The vanilla game has a border at 30,000,000 which cannot be passed normally, even with commands like /tp
		If the player goes beyond that coordinate value, then we know an exploit, most likely Crasher, is being used
		*/
		if(
			Math.abs(player.location.x) > 30000000 ||
			Math.abs(player.location.y) > 30000000 ||
			Math.abs(player.location.z) > 30000000
		) this.flag(player, `xPos=${player.location.x},yPos=${player.location.y},zPos=${player.location.z}`, true);
	}
}

export default new CrasherA();