import * as Minecraft from "mojang-minecraft";

/**
 * @name gui
 * @param {object} message - Message object
 */
 export function gui(message) {
    // validate that required params are defined
    if (!message) return console.warn(`${new Date()} | ` + "Error: ${message} isnt defined. Did you forget to pass it? (./commands/utility/gui.js:7)");
    
    message.cancel = true;

    let player = message.sender;
    
    // make sure the user has permissions to run the command
    if(!player.hasTag("op")) 
        return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to be Scythe-Opped to use this command."}]}`);

    // get the player's inventory component
    let container = player.getComponent("inventory").container;

    // make sure they dont have the UI item in their current slot
    let currentItem = container.getItem(player.selectedSlot);

    if(currentItem?.id === "minecraft:wooden_axe" && currentItem?.nameTag == "§r§l§aRight click to Open the UI")
        return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You already have the UI item in your inventory."}]}`);

    // creating the item that opens the UI
    let item = new Minecraft.ItemStack(Minecraft.MinecraftItemTypes.woodenAxe, 1, 0);

    item.nameTag = "§r§l§aRight click to Open the UI";

    // enchant it since why not
    let enchantments = item.getComponent("enchantments").enchantments;
    enchantments.addEnchantment(new Minecraft.Enchantment(Minecraft.MinecraftEnchantmentTypes.unbreaking, 3));
    
    item.getComponent("enchantments").enchantments = enchantments;

    container.addItem(item);

    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"The UI item has been added to your inventory."}]}`);
}
