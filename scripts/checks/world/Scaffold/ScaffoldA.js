// @ts-check
import Check from "../../../assets/Check.js";
import { world } from "@minecraft/server";

class ScaffoldA extends Check {
	/**
	 * @class
	 * @description Check for Tower-like behavior
	 */
	constructor() {
		super({
			check: "Scaffold",
			subcheck: "A",
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

		const blockId = block?.typeId;
		if(
			player.isFlying ||
			player.isJumping ||
			player.isFalling ||
			player.getEffect("jump_boost") ||
			// Fence and wall blocks have a bigger Y hitbox
			blockId.includes("fence") || blockId.includes("wall") ||
			// Standing on a shulker box and opening it pushes the player upwards
			blockId.includes("_shulker_box")
		) return;

		// Get the block underneath the player
		const blockUnder = player.dimension.getBlock({x: Math.trunc(player.location.x), y: Math.trunc(player.location.y) - 1, z: Math.trunc(player.location.z)});

		// Check if the block that was placed is underneath the player
		// TODO: This check fails when either the X or Z coordinates are in the negatives, look into
		if(!blockUnder || block.location.x !== blockUnder.location.x || block.location.y !== blockUnder.location.y || block.location.z !== blockUnder.location.z) return;

		/*
		The tower module in hack clients allows a player to quickly build up
		When building up in a vanilla game, you place blocks while the decimal portion of the Y value is less than 35
		Tower modules in hack clients place blocks while the decimal portion of the Y value is greater than that value
		*/
		const yDecimal = Math.abs(player.location.y % 1);

		if(yDecimal > this.config.max_y_pos_diff) {
			this.delayedFlag(player, `yPosDiff=${yDecimal},block=${block.typeId}`, true);
			data.cancel = true;
		}
	}
}

export default new ScaffoldA();