// @ts-check
import Module from "./Module.js";
import { tellAllStaff } from "../util.js";
import { world } from "@minecraft/server";

class AntiSpam extends Module {
	/**
	 * @class
	 * @description Prevent players from flooding the chat by sending too many messages
	 */
	constructor() {
		super({
			name: "antiSpam"
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
		const { sender, message } = msg;
		if(sender.hasTag("op")) return;

		const now = Date.now();
		const messageDelay = now - sender.lastMessageSent;

		if(messageDelay < this.config.messageRatelimit) {
			tellAllStaff(`§o§7<${sender.name}> ${message}\n§r§6[§aScythe§6]§r ${sender.name}'s message has been blocked due to spam. (delay=${messageDelay})`, ["notify"]);

			sender.sendMessage("§r§6[§aScythe§6]§r Stop spamming! You are sending messages too fast.");
			msg.cancel = true;
		}

		sender.lastMessageSent = now;
	}
}

export default new AntiSpam();