// @ts-check
import Check from "../../../assets/Check.js";
import { world, Player } from "@minecraft/server";

class KillauraC extends Check {
	/**
	 * @class
	 * @description Check if a player attacks multiple different entities in a single tick
	 */
	constructor() {
		super({
			check: "Killaura",
			subcheck: "C",
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
		const { damagingEntity: player, hitEntity: entity } = data;
		/*
		Propeling yourself towards a group of entities using a Riptide Trident will result in the trident attacking all the entities in the same tick
		The KillauraC check will see that the player attacked multiple entities at once, and falsely flag the player. To prevent this, we dont run the check if the player is holding a trident
		*/
		if(!(player instanceof Player) || player.heldItem === "minecraft:trident") return;

		// It is possible to attack the same entity more than one time in a single tick, so to avoid false positives we only count how many different entities were attacked
		player.entitiesHit.add(entity.id);

		if(player.entitiesHit.size >= this.config.entities) {
			this.flag(player, `entitiesHit=${player.entitiesHit.size}`);
		}
	}

	/**
	 * @param {Player} player
	 */
	tick(player) {
		player.entitiesHit.clear();
	}
}

export default new KillauraC();