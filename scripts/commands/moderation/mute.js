import * as Minecraft from "@minecraft/server";

const world = Minecraft.world; // geometry dash extreme demon

/**
 * @name mute
 * @param {object} message - Message object
 * @param {array} args - Additional arguments provided.
 */
export function mute(message, args) {
    // validate that required params are defined
    if(typeof message !== "object") throw TypeError(`message is type of ${typeof message}. Expected "object".`);
    if(typeof args !== "array") throw TypeError(`args is type of ${typeof args}. Expected "array".`);

    const player = message.sender;

    if(!args.length) return player.sendMessage("§r§6[§aScythe§6]§r You need to provide who to mute.");

    const reason = args.slice(1).join(" ").replace(/"|\\/g, "");

    // try to find the goofy goober requested
    let member;
    for (const pl of world.getPlayers()) if(pl.name.toLowerCase().includes(args[0].toLowerCase().replace(/"|\\|@/g, ""))) {
        member = pl;
        break;
    }

    if(!member) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

    // make sure they dont mute themselves 
    if(member.id === player.id) return player.sendMessage("§r§6[§aScythe§6]§r You cannot mute yourself stupid.");

    // check if the player calling the function has a certian level of swag
    if(!player.hasPermission("op")) return player.sendMessage("§r§6[§aScythe§6]§r You do not have permission to mute players.");

    // remove the chat ability from the muted player 
    member.runCommandAsync("ability @s mute true");

    // send a message to the muted player
    member.sendMessage(`§r§6[§aScythe§6]§r You have been muted. Reason: ${reason}`);

    // send a message to all ops
    player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.nameTag} has muted ${member.nameTag}. Reason: ${reason}"}]}`);
}
