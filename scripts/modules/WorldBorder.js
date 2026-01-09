// @ts-check
import Module from "./Module.js";

class WorldBorder extends Module {
	/**
	 * @class
	 * @description Prevent players from exceeding a portion of the map
	 */
	constructor() {
		super({
			name: "worldborder"
		});
	}

	/**
	 * @param {import("@minecraft/server").Player} player
	 */
	tick(player) {
		if(player.hasTag("op")) return;

		if(Math.abs(player.location.x) > this.config.max_x || Math.abs(player.location.z) > this.config.max_z) {
			player.tryTeleport({
				x: player.location.x - (player.location.x >= 0 ? 1 : -1),
				y: player.location.y,
				z: player.location.z - (player.location.z >= 0 ? 1 : -1)
			}, {
				checkForBlocks: false
			});

			player.sendMessage("§r§6[§aScythe§6]§r You have reached the world border.");
		}
	}
}

export default new WorldBorder();