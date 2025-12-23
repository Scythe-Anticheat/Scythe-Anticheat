// @ts-check
import Check from "../../../assets/Check.js";
import { world } from "@minecraft/server";

class SpammerB extends Check {
    /**
     * @class
     * @description Check for sending messages while attacking
     */
    constructor() {
        super();

        this.check = "Spammer";
        this.subcheck = "B";
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

        // Mining fatigue can make the arm swing animation last longer than normal so we ignore players with that effect
        if(sender.hasTag("left") && !sender.getEffect("mining_fatigue")) {
            this.delayedFlag(sender);
            msg.cancel = true;
        }
    }
}

export default new SpammerB();