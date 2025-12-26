// @ts-check
import Check from "../../../assets/Check.js";
import { world } from "@minecraft/server";

class ScaffoldC extends Check {
	/**
	 * @class
	 * @description Check if a player places a block under them while looking upwards
	 */
	constructor() {
		super({
			check: "Scaffold",
			subcheck: "C",
			type: "World"
		});

		if(this.config.enabled) this.enable();
	}

	enable() {
		// Normally we want to use before events whenever possible, however the before event does tell whether or not the block permutation that has been placed is solid
		world.afterEvents.playerPlaceBlock.subscribe((...args) => this.afterPlayerPlaceBlock(...args));
	}

	disable() {
		world.afterEvents.playerPlaceBlock.unsubscribe(this.afterPlayerPlaceBlock);
	}

	/**
	 * @param {import("@minecraft/server").PlayerPlaceBlockAfterEvent} data
	 */
	afterPlayerPlaceBlock(data) {
		const { player, block } = data;
		if(player.isSwimming || !block.isSolid || player.hasTag("riding")) return;

		// Make sure the players's y location is greater than the block placed's y location.
		const rotation = player.getRotation();
		if(Math.trunc(player.location.y) > block.location.y && rotation.x < this.config.min_x_rot) {
			this.delayedFlag(player, `xRot=${rotation.x},yPosPlayer=${player.location.y},yPosBlock=${block.location.y}`);
			block.setType("air");
		}
	}
}

export default new ScaffoldC();