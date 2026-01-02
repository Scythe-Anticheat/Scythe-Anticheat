// @ts-check
import Check from "../../Check.js";
import { world } from "@minecraft/server";

class SpammerA extends Check {
	/**
	 * @class
	 * @description Check for sending messages while moving
	 */
	constructor() {
		super({
			check: "Spammer",
			subcheck: "A",
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

		if(sender.isUsingInputKeys()) {
			this.delayedFlag(sender, undefined, true);
			msg.cancel = true;
		}
	}
}

export default new SpammerA();