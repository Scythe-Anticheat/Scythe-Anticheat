// @ts-check
import Check from "../../Check.js";
import { world } from "@minecraft/server";

class SpammerB extends Check {
	/**
	 * @class
	 * @description Check for sending messages while attacking
	 */
	constructor() {
		super({
			check: "Spammer",
			subcheck: "B",
			type: "Misc"
		});

		if(this.config.enabled) this.enable();
	}

	enable() {
		this.callbacks = {
			beforeChatSend: world.beforeEvents.chatSend.subscribe(this.beforeChatSend.bind(this))
		};
	}

	disable() {
		if(!this.callbacks) return;

		world.beforeEvents.chatSend.unsubscribe(this.callbacks.beforeChatSend);
		delete this.callbacks;
	}

	/**
	 * @param {import("@minecraft/server").ChatSendBeforeEvent} msg
	 */
	beforeChatSend(msg) {
		const { sender } = msg;

		// Mining fatigue can make the arm swing animation last longer than normal so we ignore players with that effect
		if(sender.hasTag("left") && !sender.getEffect("mining_fatigue")) {
			this.delayedFlag(sender);
			msg.cancel = true;
		}
	}
}

export default new SpammerB();