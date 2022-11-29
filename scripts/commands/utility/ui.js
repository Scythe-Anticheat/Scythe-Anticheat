import * as Minecraft from "@minecraft/server";
import config from "../../data/config.js";

/**
 * @name ui
 * @param {object} message - Message object
 */
 export function ui(message) {
    // validate that required params are defined
    if(typeof message !== "object") throw TypeError(`message is type of ${typeof message}. Expected "object".`);
    
    const player = message.sender;
    
    // get the player's inventory component
    const container = player.getComponent("inventory").container;

    if(container.emptySlotsCount === 0)
        return player.tell("§r§6[§aScythe§6]§r Your inventory is full! Try removing some items and try again.");

    // make sure they dont have the UI item in their current slot
    const currentItem = container.getItem(player.selectedSlot);

    if(currentItem?.typeId === config.customcommands.ui.ui_item && currentItem?.nameTag === config.customcommands.ui.ui_item_name)
        return player.tell("§r§6[§aScythe§6]§r You already have the UI item in your inventory.");

    // creating the item that opens the UI
    const item = new Minecraft.ItemStack(Minecraft.Items.get(config.customcommands.ui.ui_item), 1, 0);

    item.nameTag = config.customcommands.ui.ui_item_name;

    // enchant it since why not
    const enchantments = item.getComponent("enchantments").enchantments;
    enchantments.addEnchantment(new Minecraft.Enchantment(Minecraft.MinecraftEnchantmentTypes.unbreaking, 3));
    
    item.getComponent("enchantments").enchantments = enchantments;

    container.addItem(item);

    player.tell("§r§6[§aScythe§6]§r The UI item has been added to your inventory.");
}
