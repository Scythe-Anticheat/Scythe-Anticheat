import * as Minecraft from "@minecraft/server";

const World = Minecraft.world;

/**
 * @name op
 * @param {object} message - Message object
 * @param {array} args - Additional arguments provided.
 */
export function op(message, args) {
    // validate that required params are defined
    if(typeof message !== "object") throw TypeError(`message is type of ${typeof message}. Expected "object".`);
    if(typeof args !== "object") throw TypeError(`args is type of ${typeof args}. Expected "object".`);

    const player = message.sender;
    
    if(args.length === 0) {
        if(!player.isOp() && !player.hasTag("op"))
            return player.tell("§r§6[§aScythe§6]§r You need to provide who to op!");
    }

    // try to find the player requested
    let member;
    for (const pl of World.getPlayers()) if(pl.name.toLowerCase().includes(args[0]?.toLowerCase().replace(/"|\\|@/g, ""))) {
        member = pl;
        break;
    }

    if(typeof member === "undefined") {
        if(player.isOp() && player.hasTag("op")) return player.tell("§r§6[§aScythe§6]§r Couldn't find that player.");
        member = player;
    }

    if(member.hasTag("op")) return player.tell("§r§6[§aScythe§6]§r This player already has scythe-op.");

    addOp(member);

    member.tell("§r§6[§aScythe§6]§r §7You are now scythe-op!");
    member.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r ${player.name} has given ${member.name} scythe-op status."}]}`);
}

export function addOp(player) {
    player.addTag("op");

    player.addTag("AwcsbI");
    player.addTag("tiDUM5");
    player.addTag("jccOdl");
    player.addTag("nLkZQH");
    player.addTag("Gi0uPF");
    player.addTag("BxFMun");
}

export function removeOp(player) {
    player.removeTag("op");

    player.removeTag("AwcsbI");
    player.removeTag("tiDUM5");
    player.removeTag("jccOdl");
    player.removeTag("nLkZQH");
    player.removeTag("Gi0uPF");
    player.removeTag("BxFMun");
}