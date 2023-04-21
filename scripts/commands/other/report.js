import * as Minecraft from "@minecraft/server";

const world = Minecraft.world;

/**
 * @name report
 * @param {object} message - Message object
 * @param {array} args - Additional arguments provided.
 */
export function report(message, args) {
    // validate that required params are defined
    if(typeof message !== "object") throw TypeError(`message is type of ${typeof message}. Expected "object".`);
    if(typeof args !== "object") throw TypeError(`args is type of ${typeof args}. Expected "object".`);

    const player = message.sender;
    const reason = args.slice(1).join(" ") || "No reason specified";

    if(!args.length) return player.sendMessage("§r§6[§aScythe§6]§r You need to provide who to report.");
    
    // try to find the player requested
    let member;

    for (const pl of world.getPlayers()) if(pl.name.toLowerCase().includes(args[0].toLowerCase().replace(/"|\\|@/g, ""))) {
        member = pl;
        break;
    }

    if(!member) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

    // make sure they dont report themselves
    if(member.nameTag === player.nameTag) return player.sendMessage("§r§6[§aScythe§6]§r You cannot report yourself.");

    // prevent report spam
    if(player.reports.includes(member.nameTag)) return player.sendMessage("§r§6[§aScythe§6]§r You have already reported this player.");
    player.reports.push(member.nameTag);

    player.sendMessage(`§r§6[§aScythe§6]§r You have reported ${member.nameTag} for: ${reason}.`);

    player.runCommandAsync(`tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.nameTag} has reported ${member.nameTag} for: ${reason}"}]}`);
}
