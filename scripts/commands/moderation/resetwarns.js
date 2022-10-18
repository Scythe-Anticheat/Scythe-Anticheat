import * as Minecraft from "@minecraft/server";

const World = Minecraft.world;

/**
 * @name resetwarns
 * @param {Message} message - Message object
 * @param {array} args - Additional arguments provided.
 */
export function resetwarns(message, args) {
    // validate that required params are defined
    if(typeof message !== "object") throw TypeError(`message is type of ${typeof message}. Expected "object".`);

    const player = message.sender;
    
    if(args.length === 0) return player.tell("§r§6[§aScythe§6]§r You need to provide who's warns to reset!");

    // try to find the player requested
    for (const pl of World.getPlayers()) if(pl.name.toLowerCase().includes(args[0].toLowerCase().replace(/"|\\|@/g, ""))) {
        var member = pl;
        break;
    }
    
    if(typeof member === "undefined") return player.tell("§r§6[§aScythe§6]§r Couldnt find that player!");

    if(member === player) return player.tell("§r§6[§aScythe§6]§r You cannot reset your own warns.");

    player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.nameTag} has reset ${member.nameTag}'s warns."}]}`);

    member.runCommandAsync("function tools/resetwarns");
}
