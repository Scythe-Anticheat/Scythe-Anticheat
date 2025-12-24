// @ts-check
import Check from "../../../assets/Check.js";
import { world } from "@minecraft/server";

class ScaffoldE extends Check {
	/**
	 * @class
	 * @description Check if a player places a block without a valid adjacent block
	 */
	constructor() {
		super({
			check: "Scaffold",
			subcheck: "E",
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
		const { player, block, permutationToPlace } = data;

		const surroundingBlocks = [
			block.above(),
			block.below(),
			block.north(),
			block.east(),
			block.south(),
			block.west()
		];

		const validBlockPlace = surroundingBlocks.some(adjacentBlock =>
			// Check if adjacent block is valid
			adjacentBlock &&
			// Check if there is a nearby block that isn't air
			!adjacentBlock.isAir &&
			// Check if there is a nearby block that isn't a liquid
			// Lilypads are the only block that can be placed onto water, so we should account for that
			(!adjacentBlock.isLiquid || permutationToPlace.type.id == "minecraft:waterlily")
		);

		if(!validBlockPlace) {
			this.delayedFlag(player, `block=${permutationToPlace.type.id}`);
			data.cancel = true;
		}
	}
}

export default new ScaffoldE();