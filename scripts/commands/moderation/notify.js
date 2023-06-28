/**
 * @name notify
 * @param {object} message - Message object
 */
export function notify(message) {
    // validate that required params are defined
    if(typeof message !== "object") throw TypeError(`message is type of ${typeof message}. Expected "object".`);

    const player = message.sender;

    if(player.hasTag("notify")) {
        player.removeTag("notify");

        player.sendMessage("§r§6[§aScythe§6]§r You will now no longer recieve cheat notifications.");
        player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r ${player.name} has §4disabled§r cheat notifications."}]}`);
    } else {
        player.addTag("notify");

        player.sendMessage("§r§6[§aScythe§6]§r You will now recieve cheat notifications.");
        player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r ${player.name} has §aenabled§r cheat notifications."}]}`);
    }
}
