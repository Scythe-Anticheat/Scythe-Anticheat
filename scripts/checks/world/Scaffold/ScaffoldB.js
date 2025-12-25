// @ts-check
import Check from "../../../assets/Check.js";
import { world } from "@minecraft/server";

class ScaffoldB extends Check {
	/**
	 * @class
	 * @description Check for flat X/Y rotations
	 * @author 4urxra
	 */
	constructor() {
		super({
			check: "Scaffold",
			subcheck: "B",
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
		const { player } = data;

		/*
		A way to detect scaffold is to check if the player is in view of the block they placed.
		Hack client owners know this, so an option to make the player aim at the placed block was added to these clients
		The problem however is some hack clients poorly implemented this bypass by setting the player's rotation to a flat XY value, which is nearly impossible in vanilla gameplay

		This check was donated to me by the developer of Isolate Anticheat
		*/
		const rotation = player.getRotation();
		if((Number.isInteger(rotation.x) && rotation.x !== 0) || (Number.isInteger(rotation.y) && rotation.y !== 0)) {
			this.delayedFlag(player, `xRot=${rotation.x},yRot=${rotation.y}`, true);
			data.cancel = true;
		}
	}
}

export default new ScaffoldB();