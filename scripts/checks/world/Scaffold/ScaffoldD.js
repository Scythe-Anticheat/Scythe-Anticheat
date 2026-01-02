// @ts-check
import Check from "../../Check.js";
import { world } from "@minecraft/server";

class ScaffoldD extends Check {
	/**
	 * @class
	 * @description Check if a player places a block under the block they are standing on (Downwards scaffold)
	 */
	constructor() {
		super({
			check: "Scaffold",
			subcheck: "D",
			type: "World"
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
		const { player, block } = data;

		// Get block underneath the player
		const blockUnder = player.dimension.getBlock({x: Math.trunc(player.location.x), y: Math.trunc(player.location.y) - 1, z: Math.trunc(player.location.z)});

		if(
			blockUnder?.isSolid &&
			Math.trunc(player.location.x) === block.location.x &&
			Math.trunc(player.location.y) - 2 === block.location.y &&
			Math.trunc(player.location.z) === block.location.z
		) {
			this.delayedFlag(player, `playerYpos=${player.location.y},blockXpos=${block.location.x},blockYpos=${block.location.y},blockZpos=${block.location.z}`);
			data.cancel = true;
		}
	}
}

export default new ScaffoldD();