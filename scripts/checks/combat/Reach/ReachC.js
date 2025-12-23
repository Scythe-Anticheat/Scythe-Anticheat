// @ts-check
import Check from "../../../assets/Check.js";
import { world } from "@minecraft/server";

class ReachC extends Check {
	/**
	 * @class
	 * @description Check for placing blocks farther away than possible
	 */
	constructor() {
		super();

		this.check = "Reach";
		this.subcheck = "C";
		// Technically this isn't a combat cheat, however the check has to be beside with the other Reach checks
		// Having two reach checks in different folders would be pretty messy
		this.type = "Combat";

		if(this.config.enabled) this.enable();
	}

	enable() {
		world.beforeEvents.playerPlaceBlock.subscribe((...args) => this.beforePlayerPlaceBlock(...args));
	}

	disable() {
		world.beforeEvents.playerPlaceBlock.unsubscribe(this.beforePlayerPlaceBlock);
	}

	/**
	 * @param {import("@minecraft/server").PlayerPlaceBlockBeforeEvent} data
	 */
	beforePlayerPlaceBlock(data) {
		const { block, player } = data;

		// Use the Euclidean Distance Formula to determine the distance between two 3-dimensional objects
		const distance = Math.sqrt(
			(block.location.x - player.location.x)**2 +
			(block.location.y - player.location.y)**2 +
			(block.location.z - player.location.z)**2
		);

		const maxPlaceDistance = player.getMaxBlockPlaceDistance();
		if(distance > maxPlaceDistance) {
			this.delayedFlag(player, `distance=${distance},gamemode=${player.gamemode},inputMode=${player.inputInfo.lastInputModeUsed}`);
		}
	}
}

export default new ReachC();