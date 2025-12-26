// @ts-check
import Check from "../../assets/Check.js";

/**
 * This check could detect Inventory Move cheats by seeing if the player was interacting with the inventory and moving items into their cursor
 * Server Authoritative Movement, at least since 1.21.130, now checks if the player moves while having so inventory move cheats are completely patched
 */
class InventoryModsB extends Check {
	/**
	 * @class
	 * @description Check for changing the current cursor slot while moving
	 */
	constructor() {
		super({
			check: "InventoryMods",
			subcheck: "B",
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