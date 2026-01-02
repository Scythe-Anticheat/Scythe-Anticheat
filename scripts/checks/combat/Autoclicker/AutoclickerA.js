// @ts-check
import Check from "../../Check.js";
import { world, Player } from "@minecraft/server";

class AutoclickerA extends Check {
	/**
	 * @class
	 * @description Check for attacking too many entities in a period of time
	 */
	constructor() {
		super({
			check: "Autoclicker",
			subcheck: "A",
			type: "Combat"
		});

		if(this.config.enabled) this.enable();
	}

	enable() {
		/**
		 * There's surely a better way to do this...
		 * We want the afterEntityHitEntity function have a this value of the AutoclickerA class
		 * Doing something like 'world.afterEvents.entityHitEntity.subscribe(this.afterEntityHitEntity)' will result in a this value of null
		 * We could use .bind() in order to set the this value to the AutoClickerA class, but the callback signature would be different so we wont be able to unsubscribe from it in the disable function
		 * To get around this, we use .bind() and store the callback in the callbacks object, and use the references to those callbacks in the disable function
		 */
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
		/*
		Propeling yourself towards a group of entities using a Riptide Trident will result in the trident attacking all the entities in the same tick
		The AutoclickerA check will increment your clicks by the amount of entities in the group, which could result in a false flag if there are lots of entities in the group
		To prevent this, we don't increment the player's clicks if the player is are holding a trident
		*/
		if(!(player instanceof Player) || player.heldItem === "minecraft:trident") return;

		player.clicks++;

		// Check if the data collection period has ended
		const now = Date.now();
		if(now - player.firstAttack <= this.config.checkCPSAfter) return;

		const cps = player.clicks / ((now - player.firstAttack) / 1000);
		if(cps > this.config.maxCPS) this.flag(player, `cps=${cps}`);

		// TODO: Potentially save this data inside the AutoclickerA class instead of in the player class?
		player.firstAttack = now;
		player.clicks = 0;
	}
}

export default new AutoclickerA();