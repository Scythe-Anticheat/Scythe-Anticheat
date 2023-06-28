import * as Minecraft from "@minecraft/server";

const world = Minecraft.world;

/**
 * @name unmute
 * @param {object} message - Message object
 * @param {array} args - Additional arguments provided.
 */
export function unmute(message, args) {
    // validate that required params are defined
    if(typeof message !== "object") throw TypeError(`message is type of ${typeof message}. Expected "object".`);
    if(typeof args !== "object") throw TypeError(`args is type of ${typeof args}. Expected "object".`);

    const player = message.sender;

    if(!args.length) return player.sendMessage("§r§6[§aScythe§6]§r You need to provide who to unmute.");

    const reason = args.slice(1).join(" ").replace(/"|\\/g, "") || "No reason specified";
    
    // try to find the player requested
    let member;
    for(const pl of world.getPlayers()) if(pl.name.toLowerCase().includes(args[0].toLowerCase().replace(/"|\\|@/g, ""))) {
        member = pl;
        break;
    }
    
    if(!member) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

    member.removeTag("isMuted");
    member.sendMessage("§r§6[§aScythe§6]§r You have been unmuted.");
    
    // add chat ability
    member.runCommandAsync("ability @s mute false");

    player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r ${player.nameTag} has unmuted ${member.nameTag} for ${reason}"}]}`);
}
