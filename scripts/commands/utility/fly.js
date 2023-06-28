import * as Minecraft from "@minecraft/server";

const world = Minecraft.world;

/**
 * @name fly
 * @param {object} message - Message object
 * @param {array} args - (Optional) Additional arguments provided.
 */
export function fly(message, args) {
    // validate that required params are defined
    if(typeof message !== "object") throw TypeError(`message is type of ${typeof message}. Expected "object".`);

    const player = message.sender;
    
    // try to find the player requested
    let member;
    for(const pl of world.getPlayers()) if(pl.name.toLowerCase().includes(args[0]?.toLowerCase().replace(/"|\\|@/g, ""))) {
        member = pl; 
        break;
    }
    
    if(!member) member = player;

    const checkGmc = world.getPlayers({
        excludeGameModes: [Minecraft.GameMode.creative, Minecraft.GameMode.spectator],
        name: member.name
    });

    if(![...checkGmc].length) return player.sendMessage("§r§6[§aScythe§6]§r No need! This player is in creative which allows flying by default.");

    if(player.hasTag("flying")) {
        player.removeTag("flying");

        player.runCommandAsync("ability @s mayfly false");
        player.sendMessage("§r§6[§aScythe§6]§r You are now no longer in fly mode.");
        player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r ${player.name} has disabled fly mode."}]}`);
    } else {
        player.addTag("flying");

        player.runCommandAsync("ability @s mayfly true");
        player.sendMessage("§r§6[§aScythe§6]§r You are now no longer in fly mode.");
        player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r ${player.name} has enabled fly mode."}]}`);
    }
}
