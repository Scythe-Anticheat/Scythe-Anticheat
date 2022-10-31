import config from "../../data/config.js";

/**
 * @name bedrockvalidate
 * @param {object} message - Message object
 */
export function bedrockvalidate(message) {
    // validate that required params are defined
    if(typeof message !== "object") throw TypeError(`message is type of ${typeof message}. Expected "object".`);

    const player = message.sender;

    config.modules.bedrockValidate.enabled = true;
    
    player.runCommandAsync("function settings/bedrockValidate");
}
