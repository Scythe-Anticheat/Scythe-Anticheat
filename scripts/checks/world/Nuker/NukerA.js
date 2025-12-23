// @ts-check
import Check from "../../../assets/Check.js";
import { world } from "@minecraft/server";

class NukerA extends Check {
	/**
	 * @class
	 * @description Check for breaking too many blocks in a single tick
	 */
	constructor() {
		super();

		this.check = "Nuker";
		this.subcheck = "A";
		this.type = "World";

		if(this.config.enabled) this.enable();
	}

	enable() {
		world.beforeEvents.playerBreakBlock.subscribe((...args) => this.beforePlayerBreakBlock(...args));
	}

	disable() {
		world.beforeEvents.playerBreakBlock.unsubscribe(this.beforePlayerBreakBlock);
	}

	/**
	 * @param {import("@minecraft/server").PlayerBreakBlockBeforeEvent} data
	 */
	beforePlayerBreakBlock(data) {
		const { player } = data;

        // player.blocksBroken gets reset in the tick event
		if(++player.blocksBroken > this.config.maxBlocks) {
			this.delayedFlag(player, `blocksBroken=${player.blocksBroken}`);
			data.cancel = true;
		}
	}
}

export default new NukerA();