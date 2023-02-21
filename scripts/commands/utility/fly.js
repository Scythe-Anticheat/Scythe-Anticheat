import * as Minecraft from "@minecraft/server";

const World = Minecraft.world;

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
    
    for (const pl of World.getPlayers()) if(pl.name.toLowerCase().includes(args[0]?.toLowerCase().replace(/"|\\|@/g, ""))) {
        member = pl; 
        break;
    }
    
    if(!member) member = player;

    const checkGmc = World.getPlayers({
        excludeGameModes: [Minecraft.GameMode.creative, Minecraft.GameMode.spectator],
        name: member.name
    });

    if(![...checkGmc].length) return player.tell("§r§6[§aScythe§6]§r No need! This player is in creative which allows flying by default.");

    member.runCommandAsync(`function tools/fly`);

    if(member.id === player.id) player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.nameTag} has toggled fly mode for themselves."}]}`);
        else player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.nameTag} has toggled fly mode for ${member.nameTag}."}]}`);
}
