import * as Minecraft from "mojang-minecraft";

/**
 * @name gui
 * @param {object} message - Message object
 */
 export function gui(message) {
    console.warn(1);
    // validate that required params are defined
    if (!message) return console.warn(`${new Date()} | ` + "Error: ${message} isnt defined. Did you forget to pass it? (./commands/utility/gui.js:7)");
    
    message.cancel = true;

    let player = message.sender;
    
    // make sure the user has permissions to run the command
    if(!player.hasTag("op")) 
        return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to be Scythe-Opped to use this command."}]}`);

    // creating the item that opens the GUI
    let item = new Minecraft.ItemStack(Minecraft.MinecraftItemTypes.woodenAxe, 1, 0);

    item.nameTag = "§r§l§aRight click to Open the UI";

    // enchant it since why not
    let enchantments = item.getComponent("enchantments").enchantments;
    enchantments.addEnchantment(new Minecraft.Enchantment(Minecraft.MinecraftEnchantmentTypes.unbreaking, 3));

    // get the player's inventory component
    let container = player.getComponent("inventory").container;

    container.addItem(item);

    return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"The GUI item has been added to your inventory."}]}`);
}
