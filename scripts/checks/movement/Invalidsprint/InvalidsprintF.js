// @ts-check
import Check from "../../Check.js";
import { EntityComponentTypes } from "@minecraft/server";

const MIN_HUNGER_FOR_SPINT = 6;

class InvalidsprintF extends Check {
	/**
	 * @class
	 * @description Check for sprinting while not having sufficient hunger
	 */
	constructor() {
		super({
			check: "Invalidsprint",
			subcheck: "F",
			type: "Movement"
		});
	}

	/**
	 * @param {import("@minecraft/server").Player} player
	 */
	tick(player) {
		const hunger = player.getComponent(EntityComponentTypes.Hunger);
        if(!hunger) return;

        if(hunger.currentValue <= MIN_HUNGER_FOR_SPINT) this.flag(player, `hunger=${hunger.currentValue}`, true);
	}
}

export default new InvalidsprintF();