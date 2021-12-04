/* eslint no-var: "off"*/
import * as Minecraft from "mojang-minecraft";

const World = Minecraft.World;
const Commands = Minecraft.Commands;

// found the inventory viewing scipt in the bedrock addons discord, unsure of the original owner (not my code)
export function invsee(message, args) {
    // validate that required params are defined
    if (!message) return console.warn("Error: ${message} isnt defined. Did you forget to pass it? ./commands/utility/invsee.js:10)");
    if (!args) return console.warn("Error: ${args} isnt defined. Did you forget to pass it? (./commands/utility/invsee.js:1)");

    message.cancel = true;

    let player = message.sender;

    // make sure the user has permissions to run the command
    try {
        Commands.run(`testfor @a[name="${player.nameTag}",tag=op]`, World.getDimension("overworld"));
    } catch (error) {
        return Commands.run(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to be Scythe-Opped to use this command."}]}`, World.getDimension("overworld"));
    }

    if (!args.length) return Commands.run(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to provide whos inventory to view!"}]}`, World.getDimension("overworld"));
    
    // try to find the player requested
    for (let pl of World.getPlayers()) {
        if (pl.nameTag.toLowerCase().includes(args[0].toLowerCase())) var member = pl; 
    }
    if (!member) return Commands.run(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"Couldnt find that player!"}]}`, World.getDimension("overworld"));

    let container = player.getComponent('inventory').container;
    let o = [];
    for (let i = 0; i < container.size; i++) { o.push(container.getItem(i) ?? {id: 'minecraft:air', amount: 0, data: 0});}

    Commands.run(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${member.nameTag}'s inventory:\n\n"}]}`, World.getDimension("overworld"));

    for (let i = 0; i < 36; i++) {
        if (o[i].id !== "minecraft:air") {
            Commands.run(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"Slot ${i}: ${o[i].id}:${o[i].data} x${o[i].amount}"}]}`, World.getDimension("overworld"));
        }
    }
}
