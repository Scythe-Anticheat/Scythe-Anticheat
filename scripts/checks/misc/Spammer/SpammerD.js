// @ts-check
import Check from "../../../assets/Check.js";
import { world } from "@minecraft/server";

class SpammerD extends Check {
    /**
     * @class
     * @description Check for sending messages while having a GUI open
     */
    constructor() {
        super();

        this.check = "Spammer";
        this.subcheck = "D";
        this.type = "Misc";

        if(this.config.enabled) this.enable();
    }

    enable() {
        world.beforeEvents.chatSend.subscribe((...args) => this.beforeChatSend(...args));
    }

    disable() {
        world.beforeEvents.chatSend.unsubscribe(this.beforeChatSend);
    }

    /**
	 * @param {import("@minecraft/server").ChatSendBeforeEvent} msg
	 */
    beforeChatSend(msg) {
        const { sender } = msg;

        if(sender.hasTag("hasGUIopen")) {
            this.delayedFlag(sender);
            msg.cancel = true;
        }
    }
}

export default new SpammerD();