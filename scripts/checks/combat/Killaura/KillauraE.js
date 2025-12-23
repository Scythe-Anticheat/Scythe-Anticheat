// @ts-check
import Check from "../../../assets/Check.js";
import { world, Player } from "@minecraft/server";

class KillauraE extends Check {
	/**
	 * @class
	 * @description Check if a player attacks an entity while having a GUI open
	 */
	constructor() {
		super({
			check: "Killaura",
			subcheck: "E",
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

		if(player.hasTag("hasGUIopen")) {
			this.flag(player);
		}
	}
}

export default new KillauraE();