// @ts-check
import Check from "../../../assets/Check.js";
import { GameMode } from "@minecraft/server";

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
		if(!player.isSneaking) return;

		// It is possible to sprint when flying in the air
		// TODO: The player gamemode check is left here when player.isFlying did not exist, and we instead checked if the player was able to fly through the !fly command
		// Now that we have player.isFlying to check if the player is currently flying, do we even need the gamemode checks?
		if(player.gamemode !== GameMode.Creative && !player.isFlying) this.flag(player, undefined, true);
	}
}

export default new InvalidsprintC();