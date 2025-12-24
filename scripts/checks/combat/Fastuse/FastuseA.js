// @ts-check
import Check from "../../../assets/Check.js";
import { world, Player } from "@minecraft/server";

class FastuseA extends Check {
	/**
	 * @class
	 * @description Check if a player uses an item too fast
	 */
	constructor() {
		super({
			check: "Fastuse",
			subcheck: "A",
			type: "Combat"
		});

		if(this.config.enabled) this.enable();
	}

	enable() {
		world.beforeEvents.itemUse.subscribe((...args) => this.beforeItemUse(...args));
	}

	disable() {
		world.beforeEvents.itemUse.unsubscribe(this.beforeItemUse);
	}

	/**
	 * @param {import("@minecraft/server").ItemUseBeforeEvent} data
	 */
	beforeItemUse(data) {
		const { source } = data;
		if(!(source instanceof Player)) return;

		const now = Date.now();

		const throwDelay = now - source.lastThrow;
		if(throwDelay > this.config.min_use_delay && throwDelay < this.config.max_use_delay) {
			// When using items such as fishing rods or throwing snowballs, there is about a 200ms delay before the item can be used again or thrown
			// Placing blocks has a delay that is around 100ms, which can trip this detection
			// TODO: Figure out how to differentiate placing blocks and using items (maybe through the playerswing event?)
			// this.delayedFlag(player, `lastThrowTime=${throwDelay}`);
			data.cancel = true;
		}

		source.lastThrow = now;
	}
}

export default new FastuseA();