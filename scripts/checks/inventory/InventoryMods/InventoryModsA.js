// @ts-check
import Check from "../../../assets/Check.js";
import { world, Player } from "@minecraft/server";

/**
 * This module is disabled due to false flags
 * To determine if a player has a GUI open, such as a chest, we have an environmental sensor in the player.json file that checks if the player has a container open
 * When a player opens a container, an event will fire which will give the player the 'hasGUIopen' tag
 * This process is rather slow, as it could take up to 500ms from when the player first opened the chest to giving the tag
 * Between that time, the player could close the GUI and use an item, causing a false flag
 */
class InventoryModsA extends Check {
	/**
	 * @class
	 * @description Check for using an item while having a GUI open
	 */
	constructor() {
		super({
			check: "InventoryMods",
			subcheck: "A",
			type: "Inventory"
		});

		if(this.config.enabled) this.enable();
	}

	enable() {
		world.beforeEvents.itemUse.subscribe((...args) => this.beforeItemUse(...args));
	}

	disable() {
		world.beforeEvents.itemUse.unsubscribe(this.beforeItemUse);
	}

	/**
	 * @param {import("@minecraft/server").ItemUseBeforeEvent} data
	 */
	beforeItemUse(data) {
		const { source } = data;
		if(!(source instanceof Player)) return;

		if(source.hasTag("hasGUIopen")) {
			this.delayedFlag(source);
			data.cancel = true;
		}
	}
}

export default new InventoryModsA();