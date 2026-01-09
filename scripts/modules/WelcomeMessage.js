// @ts-check
import Module from "./Module.js";
import { world } from "@minecraft/server";

class WelcomeMessage extends Module {
	/**
	 * @class
	 * @description Send a welcome message to players that join the game
	 */
	constructor() {
		super({
			name: "welcomeMessage"
		});

		if(this.config.enabled) this.enable();
	}

	enable() {
		this.callbacks = {
			afterPlayerSpawn: world.afterEvents.playerSpawn.subscribe(this.afterPlayerSpawn.bind(this))
		};
	}

	disable() {
		if(!this.callbacks) return;

		world.afterEvents.playerSpawn.unsubscribe(this.callbacks.afterPlayerSpawn);
		delete this.callbacks;
	}

	/**
	 * @param {import("@minecraft/server").PlayerSpawnAfterEvent} data
	 */
	afterPlayerSpawn({ initialSpawn, player }) {
		if(!initialSpawn) return;

        // If the welcome message has '[@player]' in it, replace it with the player's name
        const message = this.config.message.replace(/\[@player]/g, player.name);
        player.sendMessage(message);
	}
}

export default new WelcomeMessage();