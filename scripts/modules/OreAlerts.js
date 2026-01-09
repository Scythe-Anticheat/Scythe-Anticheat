// @ts-check
import Module from "./Module.js";
import { tellAllStaff } from "../util.js";
import { world } from "@minecraft/server";

class OreAlerts extends Module {
	/**
	 * @class
	 * @description Prevent players from flooding the chat by sending too many messages
	 */
	constructor() {
		super({
			name: "oreAlerts"
		});

		if(this.config.enabled) this.enable();
	}

	enable() {
		this.callbacks = {
			beforePlayerBreakBlock: world.beforeEvents.playerBreakBlock.subscribe(this.beforePlayerBreakBlock.bind(this))
		};
	}

	disable() {
		if(!this.callbacks) return;

		world.beforeEvents.playerBreakBlock.unsubscribe(this.callbacks.beforePlayerBreakBlock);
		delete this.callbacks;
	}

	/**
	 * @param {import("@minecraft/server").PlayerBreakBlockBeforeEvent} msg
	 */
	beforePlayerBreakBlock({ player, block }) {
		if(player.hasTag("op")) return;

		if(this.config.blocks.includes(block.typeId)) {
			tellAllStaff(`§r§6[§aScythe§6]§r [Ore Alerts] ${player.name} has broken 1x ${block.typeId}`, ["notify"]);
		}
	}
}

export default new OreAlerts();