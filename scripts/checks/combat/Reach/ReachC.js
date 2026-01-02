// @ts-check
import Check from "../../../assets/Check.js";
import { world } from "@minecraft/server";

class ReachC extends Check {
	/**
	 * @class
	 * @description Check for placing blocks farther away than possible
	 */
	constructor() {
		super({
			check: "Reach",
			subcheck: "C",
			// Technically this isn't a combat cheat, however the check has to be beside with the other Reach checks
			// Having two reach checks in different folders would be pretty messy
			type: "Combat"
		});

		if(this.config.enabled) this.enable();
	}

	enable() {
		this.callbacks = {
			beforePlayerPlaceBlock: world.beforeEvents.playerPlaceBlock.subscribe(this.beforePlayerPlaceBlock.bind(this))
		};
	}

	disable() {
		if(!this.callbacks) return;

		world.beforeEvents.playerPlaceBlock.unsubscribe(this.callbacks.beforePlayerPlaceBlock);
		delete this.callbacks;
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
			this.delayedFlag(player, `distance=${distance},gamemode=${player.getGameMode()},inputMode=${player.inputInfo.lastInputModeUsed}`);
			data.cancel = true;
		}
	}
}

export default new ReachC();