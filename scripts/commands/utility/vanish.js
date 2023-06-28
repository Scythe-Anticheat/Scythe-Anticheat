/**
 * @name vanish
 * @param {object} message - Message object
 */
export function vanish(message) {
    // validate that required params are defined
    if(typeof message !== "object") throw TypeError(`message is type of ${typeof message}. Expected "object".`);

    const player = message.sender;
    
    if(player.hasTag("vanish")) {
        player.removeTag("vanish");

        player.runCommandAsync("gamemode creative");

        player.sendMessage("§r§6[§aScythe§6]§r You are now no longer vanished.");
        player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r ${player.name} is no longer vanished."}]}`);
    } else {
        player.addTag("vanish");

        player.runCommandAsync("gamemode spectator");

        player.sendMessage("§r§6[§aScythe§6]§r You are now vanished.");
        player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r ${player.name} is now vanished."}]}`);
    }
}
