// @ts-check
import Check from "../../Check.js";
import { world, GameMode, Player } from "@minecraft/server";

class ReachA extends Check {
	/**
	 * @class
	 * @description Check for attacking players farther away than possible
	 */
	constructor() {
		super({
			check: "Reach",
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
		const { damagingEntity: player, hitEntity: entity } = data;
		/*
		This reach detection is rather annoying, as the vanilla client can attack an entity if their collision box is in range
		however this reach calculation doesn't account for the collision box but rather the entity's center
		This causes false positives when attacking entities with large collision boxes such as Ender Dragons
		To prevent any sort of false positives, we only check reach when the player attacks another player
		*/
		if(!(player instanceof Player) || !(entity instanceof Player) || player.getGameMode() === GameMode.Creative || this.config.excluded_items.includes(player.heldItem)) return;

		// Calculate reach from the player's head location
		const headLocation = player.getHeadLocation();

		// Use the Euclidean Distance Formula to determine the distance between two 3-dimensional objects
		const distance = Math.sqrt(
			(entity.location.x - headLocation.x)**2 +
			(entity.location.y - headLocation.y)**2 +
			(entity.location.z - headLocation.z)**2
		);

		if(distance > this.config.reach) {
			this.flag(player, `distance=${distance},item=${player.heldItem}`);
		}
	}
}

export default new ReachA();