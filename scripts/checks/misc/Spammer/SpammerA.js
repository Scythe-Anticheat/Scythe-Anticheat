// @ts-check
import Check from "../../../assets/Check.js";
import { world } from "@minecraft/server";

class SpammerA extends Check {
    /**
     * @class
     * @description Check for sending messages while moving
     */
    constructor() {
        super();

        this.check = "Spammer";
        this.subcheck = "A";
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

        if(sender.isUsingInputKeys()) {
            this.delayedFlag(sender, undefined, true);
            msg.cancel = true;
        }
    }
}

export default new SpammerA();