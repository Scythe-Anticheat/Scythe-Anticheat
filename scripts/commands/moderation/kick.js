import * as Minecraft from "@minecraft/server";

const world = Minecraft.world;

/**
 * @name kick
 * @param {object} message - Message object
 * @param {array} args - Additional arguments provided.
 */
export function kick(message, args) {
    // validate that required params are defined
    if(typeof message !== "object") throw TypeError(`message is type of ${typeof message}. Expected "object".`);
    if(typeof args !== "object") throw TypeError(`args is type of ${typeof args}. Expected "object".`);

    const player = message.sender;

    if(!args.length) return player.sendMessage("§r§6[§aScythe§6]§r You need to provide who to kick.");

    let isSilent = false;

    if(args[1] === "-s" || args[1] === "-silent") isSilent = true;

    const reason = args.slice(1).join(" ").replace(/-s|-silent/, "").replace(/"|\\/g, "") || "No reason specified";
	
    // try to find the player requested
    let member;

    for (const pl of world.getPlayers()) if(pl.name.toLowerCase().includes(args[0].toLowerCase().replace(/"|\\|@/g, ""))) {
        member = pl;
        break;
    }

    if(!member) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

    // make sure they dont kick themselves
    if(member.name === player.name) return player.sendMessage("§r§6[§aScythe§6]§r You cannot kick yourself.");

    if(!isSilent) player.runCommandAsync(`kick "${member.name}" ${reason}`);
    member.triggerEvent("scythe:kick");
    
    player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.nameTag} has kicked ${member.name} (Silent:${isSilent}). Reason: ${reason}"}]}`);
}
