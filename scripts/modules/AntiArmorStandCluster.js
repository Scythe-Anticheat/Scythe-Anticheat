// @ts-check
import Module from "./Module.js";
import { tellAllStaff } from "../util.js";
import { world } from "@minecraft/server";

class AntiArmorStandCluster extends Module {
	/**
	 * @class
	 * @description Prevent lag machines that involve a tight cluster of armor stands
	 */
	constructor() {
		super({
			name: "antiArmorStandCluster"
		});

		if(this.config.enabled) this.enable();
	}

	enable() {
		this.callbacks = {
			afterEntitySpawn: world.afterEvents.entitySpawn.subscribe(this.afterEntitySpawn.bind(this))
		};
	}

	disable() {
		if(!this.callbacks) return;

		world.afterEvents.entitySpawn.unsubscribe(this.callbacks.afterEntitySpawn);
		delete this.callbacks;
	}

	/**
	 * @param {import("@minecraft/server").EntitySpawnAfterEvent} data
	 */
	afterEntitySpawn({ entity }) {
		if(entity.typeId !== "minecraft:armor_stand") return;

		// Get all nearby armor stand entities
		const entities = entity.dimension.getEntities({
			location: entity.location,
			maxDistance: this.config.radius,
			type: "armor_stand"
		});

		if(entities.length < this.config.max_armor_stand_count) return;

		tellAllStaff(`§r§6[§aScythe§6]§r Potential lag machine detected at X: ${Math.trunc(entity.location.x)}, Y: ${Math.trunc(entity.location.y)}, Z: ${Math.trunc(entity.location.z)}. There are ${entities.length}/${this.config.max_armor_stand_count} armor stands in this area.`, ["notify"]);

		for(const entityLoop of entities) {
			entityLoop.remove();
		}
	}
}

export default new AntiArmorStandCluster();