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
		world.beforeEvents.playerPlaceBlock.subscribe((...args) => this.beforePlayerPlaceBlock(...args));
	}

	disable() {
		world.beforeEvents.playerPlaceBlock.unsubscribe(this.beforePlayerPlaceBlock);
	}

	/**
	 * @param {import("@minecraft/server").PlayerPlaceBlockBeforeEvent} data
	 */
	beforePlayerPlaceBlock(data) {
		const { player, block } = data;
		if(player.isSwimming || !block.isSolid || player.hasTag("riding")) return;

		// Make sure the players's y location is greater than the block placed's y location.
		if(Math.trunc(player.location.y) > block.location.y && player.rotation.x < this.config.min_x_rot) {
			this.delayedFlag(player, `xRot=${player.rotation.x},yPosPlayer=${player.location.y},yPosBlock=${block.location.y}`);
			data.cancel = true;
		}
	}
}

export default new ScaffoldC();