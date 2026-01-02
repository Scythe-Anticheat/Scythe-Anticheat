// @ts-check
import Check from "../../Check.js";
import { world, Player } from "@minecraft/server";

class KillauraA extends Check {
	/**
	 * @class
	 * @description Check if a player attacks an entity while doing another action
	 */
	constructor() {
		super({
			check: "Killaura",
			subcheck: "A",
			type: "Combat"
		});

		if(this.config.enabled) this.enable();
	}

	enable() {
		this.callbacks = {
			afterEntityHitEntity: world.afterEvents.entityHitEntity.subscribe(this.afterEntityHitEntity.bind(this))
		};
	}

	disable() {
		if(!this.callbacks) return;

		world.afterEvents.entityHitEntity.unsubscribe(this.callbacks.afterEntityHitEntity);
		delete this.callbacks;
	}

	/**
	 * @param {import("@minecraft/server").EntityHitEntityAfterEvent} data
	 */
	afterEntityHitEntity(data) {
		const { damagingEntity: player } = data;
		if(!(player instanceof Player)) return;

		// Checks if a player attacks while using an item
		if(player.isUsingItem && Date.now() - player.itemUsedAt > this.config.min_item_use_time) {
            this.flag(player, `state=usingItem,itemUsedFor=${Date.now() - player.itemUsedAt}`);
        }

		// Checks if a player attacks while sleeping
		if(player.isSleeping) {
			this.flag(player, `state=sleeping`);
		}

		// Checks if a player attacks while having a GUI (such as a chest) open
		if(player.hasTag("hasGUIopen")) {
			this.flag(player, `state=guiOpen`);
		}
	}
}

export default new KillauraA();