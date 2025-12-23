// @ts-check
import Check from "../../../assets/Check.js";
import { world, Player } from "@minecraft/server";

class AutoclickerA extends Check {
	/**
	 * @class
	 * @description Check for attacking too many entities in a period of time
	 */
	constructor() {
		super();

		this.check = "Autoclicker";
		this.subcheck = "A";
		this.type = "Combat";

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

		/*
		To find the player's CPS, we divide the amount of times they have clicked between now and the last marked click, divided by the amount of time that has passed between those two points
		The time is measured in milliseconds, so we divide the time by 1000 to get the seconds between now and their last marked click.
		*/
		const cps = player.clicks / ((now - player.firstAttack) / 1000);
		if(cps > this.config.maxCPS) this.flag(player, `cps=${cps}`);

		// Reset CPS data
		// TODO: Potentially save this data inside the AutoclickerA class instead of in the player class?
		player.firstAttack = now;
		player.clicks = 0;
	}
}

export default new AutoclickerA();