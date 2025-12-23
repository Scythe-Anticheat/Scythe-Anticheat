// @ts-check
import Check from "../../../assets/Check.js";
import { world, Player } from "@minecraft/server";

// KillauraA, KillauraD, and KillauraE are closely linked together as they all check if a player attacks an entity in impossible scenarios
// Maybe we should combine these checks into one
class KillauraA extends Check {
	/**
	 * @class
	 * @description Check if a player attacks an entity while using an item
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
		world.afterEvents.entityHitEntity.subscribe((...args) => this.afterEntityHitEntity(...args));
	}

	disable() {
		world.afterEvents.entityHitEntity.unsubscribe(this.afterEntityHitEntity);
	}

	/**
	 * @param {import("@minecraft/server").EntityHitEntityAfterEvent} data
	 */
	afterEntityHitEntity(data) {
		const { damagingEntity: player } = data;
		if(!(player instanceof Player)) return;

		if(player.isUsingItem && Date.now() - player.itemUsedAt > this.config.min_item_use_time) {
            this.flag(player, `itemUsedFor=${Date.now() - player.itemUsedAt}`);
        }
	}
}

export default new KillauraA();