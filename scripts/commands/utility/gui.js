import * as Minecraft from "mojang-minecraft";

/**
 * @name gui
 * @param {object} message - Message object
 */
 export function gui(message) {
    // validate that required params are defined
    if(typeof message !== "object") throw TypeError(`message is type of ${typeof message}. Expected "object".`);
    
    let player = message.sender;
    
    // get the player's inventory component
    let container = player.getComponent("inventory").container;

    // make sure they dont have the UI item in their current slot
    let currentItem = container.getItem(player.selectedSlot);

    if(currentItem?.id === "minecraft:wooden_axe" && currentItem?.nameTag === "§r§l§aRight click to Open the UI")
        return player.tell("§r§6[§aScythe§6]§r You already have the UI item in your inventory.");

    // creating the item that opens the UI
    let item = new Minecraft.ItemStack(Minecraft.MinecraftItemTypes.woodenAxe, 1, 0);

    item.nameTag = "§r§l§aRight click to Open the UI";

    // enchant it since why not
    let enchantments = item.getComponent("enchantments").enchantments;
    enchantments.addEnchantment(new Minecraft.Enchantment(Minecraft.MinecraftEnchantmentTypes.unbreaking, 3));
    
    item.getComponent("enchantments").enchantments = enchantments;

    container.addItem(item);

    player.tell("§r§6[§aScythe§6]§r The UI item has been added to your inventory.");
}
