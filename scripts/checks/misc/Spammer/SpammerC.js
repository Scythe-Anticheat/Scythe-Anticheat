// @ts-check
import Check from "../../../assets/Check.js";
import { world } from "@minecraft/server";

class SpammerC extends Check {
	/**
	 * @class
	 * @description Check for sending messages while using an item
	 */
	constructor() {
		super({
			check: "Spammer",
			subcheck: "C",
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

		if(sender.isUsingItem) {
			this.delayedFlag(sender);
			msg.cancel = true;
		}
	}
}

export default new SpammerC();