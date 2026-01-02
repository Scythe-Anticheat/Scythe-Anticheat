// @ts-check
import Check from "../../Check.js";
import { world, Player } from "@minecraft/server";

/**
 * Most implementations of autotool in hack clients wait for the player to start breaking a block and immedietly switch the currently held item to one that best fits with the block
 * Changing your current slot right after you start breaking a block isn't possible as a human, so to detect Autotool we can check if the player changes their current slot 90ms after they start breaking a block
 *
 * If you are breaking a block and you switch your current selected slot client should stop breaking the block with the exception of pressing the number keys on a Keyboard
 * We could check if the currently slot when you start breaking a block and finish breaking the block differs to potentially detect more Autotools
 */
class AutotoolA extends Check {
	/**
	 * @class
	 * @description Check for changing current slot right after breaking a block
	 */
	constructor() {
		super({
			check: "Autotool",
			subcheck: "A",
			type: "World"
		});

		if(this.config.enabled) this.enable();
	}

	enable() {
		this.callbacks = {
			afterEntityHitBlock: world.afterEvents.entityHitBlock.subscribe(this.afterEntityHitBlock.bind(this)),
			afterPlayerChangeSlot: world.afterEvents.playerHotbarSelectedSlotChange.subscribe(this.afterPlayerChangeSlot.bind(this))
		};
	}

	disable() {
		if(!this.callbacks) return;

		world.afterEvents.entityHitBlock.unsubscribe(this.callbacks.afterEntityHitBlock);
		world.afterEvents.playerHotbarSelectedSlotChange.unsubscribe(this.callbacks.afterPlayerChangeSlot);
		delete this.callbacks;
	}

	/**
	 * @param {import("@minecraft/server").EntityHitBlockAfterEvent} data
	 */
	afterEntityHitBlock(data) {
		const { damagingEntity: source } = data;
		if(!(source instanceof Player)) return;

		source.startBreakTime = Date.now();
	}

	/**
	 * @param {import("@minecraft/server").PlayerHotbarSelectedSlotChangeAfterEvent} data
	 */
	afterPlayerChangeSlot(data) {
		const { player, previousSlotSelected, newSlotSelected } = data;

		// Delay between starting to break a block and switching inventory slot
		const switchDelay = Date.now() - player.startBreakTime;
		if(switchDelay < this.config.startBreakDelay) {
			this.flag(player, `oldSlot=${previousSlotSelected},newSlot=${newSlotSelected},switchDelay=${switchDelay}`);
		}
	}

}

export default new AutotoolA();