import * as Minecraft from "mojang-minecraft";

const World = Minecraft.world;

// found the inventory viewing scipt in the bedrock addons discord, unsure of the original owner (not my code)
/**
 * @name invsee
 * @param {object} message - Message object
 * @param {array} args - Additional arguments provided.
 */
export function invsee(message, args) {
    // validate that required params are defined
    if (!message) return console.warn(`${new Date()} | ` + "Error: ${message} isnt defined. Did you forget to pass it? ./commands/utility/invsee.js:10)");
    if (!args) return console.warn(`${new Date()} | ` + "Error: ${args} isnt defined. Did you forget to pass it? (./commands/utility/invsee.js:1)");

    message.cancel = true;

    let player = message.sender;

    // make sure the user has permissions to run the command
    if(!player.hasTag("op")) 
        return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to be Scythe-Opped to use this command."}]}`);

    if (!args.length) return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to provide whos inventory to view!"}]}`);
    
    // try to find the player requested
    for (let pl of World.getPlayers()) if (pl.nameTag.toLowerCase().includes(args[0].toLowerCase().replace(/"|\\|@/g, ""))) var member = pl;
    
    if (!member) return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"Couldnt find that player!"}]}`);

    let container = member.getComponent('inventory').container;
    
    player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${member.nameTag}'s inventory:\n\n"}]}`);
    for (let i = 0; i < container.size; i++) if (container.getItem(i)) {
        let o = container.getItem(i);
        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"Slot ${i}: ${o.id}:${o.data} x${o.amount}"}]}`);
    }
}
