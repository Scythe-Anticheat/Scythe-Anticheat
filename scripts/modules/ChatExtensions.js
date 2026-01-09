// @ts-check
import Module from "./Module.js";
import config from "../data/config.js";
import { world } from "@minecraft/server";

class ChatExtensions extends Module {
	/**
	 * @class
	 * @description Additional features to game chat
	 */
	constructor() {
		super({
			name: "chatExtensions"
		});

		if(this.config.enabled) this.enable();
	}

	enable() {
		this.callbacks = {
			afterPlayerSpawn: world.afterEvents.playerSpawn.subscribe(this.afterPlayerSpawn.bind(this)),
			beforeChatSend: world.beforeEvents.chatSend.subscribe(this.beforeChatSend.bind(this))
		};
	}

	disable() {
		if(!this.callbacks) return;

		world.afterEvents.playerSpawn.unsubscribe(this.callbacks.afterPlayerSpawn);
		world.beforeEvents.chatSend.unsubscribe(this.callbacks.beforeChatSend);
		delete this.callbacks;
	}

	/**
	 * @param {import("@minecraft/server").PlayerSpawnAfterEvent} data
	 */
	afterPlayerSpawn({ initialSpawn, player }) {
		if(!initialSpawn || !this.config.customTags) return;

		const { mainColor, borderColor, playerNameColor, defaultTag } = config.commands.tag;

		let tag = player.getDynamicProperty("tag");

		// Add default tag if enabled
		if(!tag && defaultTag) tag = defaultTag;

		if(tag) player.nameTag = `${borderColor}[§r${mainColor}${tag}${borderColor}]§r ${playerNameColor}${player.nameTag}`;
	}

	/**
	 * @param {import("@minecraft/server").ChatSendBeforeEvent} msg
	 */
	beforeChatSend(msg) {
		if(msg.cancel) return;

		const { sender, message } = msg;
		if(sender.name === sender.nameTag && !this.config.filterUnicodeChat) return;

		// Adds user custom tags to their messages and filter any non-ASCII characters
		const playerTag = (this.config.customTags && sender.name !== sender.nameTag) ? `${sender.nameTag}§7:§r` : `<${sender.nameTag}>`;
		const newMsg = this.config.filterUnicodeChat ? message.replace(/[^\x00-\xFF]/g, "") : message;

		world.sendMessage(`${playerTag} ${newMsg}`);
		msg.cancel = true;
	}
}

export default new ChatExtensions();