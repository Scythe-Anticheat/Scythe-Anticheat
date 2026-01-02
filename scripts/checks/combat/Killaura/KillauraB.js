// @ts-check
import Check from "../../../assets/Check.js";
import { world, system, Player } from "@minecraft/server";

class KillauraB extends Check {
	/**
	 * @class
	 * @description Check if a player attacks without swinging their hand
	 */
	constructor() {
		super({
			check: "Killaura",
			subcheck: "B",
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
		// Mining fatigue increases how long the arm swing animation lasts, and if its in middle of an animation the playerSwingStart event will not trigger for attacks
		if(!(player instanceof Player) || player.heldItem === "minecraft:trident" || player.getEffect("mining_fatigue")) return;

		/*
		The playerSwingStart event fires after the entityHitEntity event is fired, so we have to implement some sort of delay
		When a player attacks, we wait 40 ticks (or two seconds) to compensate for the playerSwingStart event firing after entityHitEntity, and then check if the player has swung in the last 5 seconds
		If they have not swung, then we know they are using a no swing cheat and we can detect them
		*/
		system.runTimeout(() => {
			const swingDelay = Date.now() - player.lastLeftClick;
	
			if(swingDelay > this.config.max_swing_delay) {
				this.flag(player, `swingDelay=${swingDelay}`);
			}
		}, this.config.wait_ticks);
	}
}

export default new KillauraB();