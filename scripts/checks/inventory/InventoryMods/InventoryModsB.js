// @ts-check
import Check from "../../../assets/Check.js";

/**
 * This module is disabled due to false flags
 * To determine if a player has a GUI open, such as a chest, we have an environmental sensor in the player.json file that checks if the player has a container open
 * When a player opens a container, an event will fire which will give the player the 'hasGUIopen' tag
 * This process is rather slow, as it could take up to 500ms from when the player first opened the chest to giving the tag
 * Between that time, the player could close the GUI and use an item, causing a false flag
 */
class InventoryModsB extends Check {
	/**
	 * @class
	 * @description Check for changing the current cursor slot while moving
	 */
	constructor() {
		super({
			check: "InventoryMods",
			subcheck: "A",
			type: "Inventory"
		});
	}

	/**
	 * @param {import("@minecraft/server").Player} player
	 */
	tick(player) {
		const cursorItem = player.getComponent("cursor_inventory")?.item;

		if(player.lastCursorItem?.typeId !== cursorItem?.typeId && player.isUsingInputKeys()) {
			this.flag(player, `oldItem=${player.lastCursorItem?.typeId},newItem=${cursorItem?.typeId}`, true);
		}

		player.lastCursorItem = cursorItem;
	}
}

export default new InventoryModsB();