import * as Minecraft from "mojang-minecraft";

const World = Minecraft.world;

/**
 * @name resetwarns
 * @param {Message} message - Message object
 * @param {array} args - Additional arguments provided.
 */
export function resetwarns(message, args) {
    // validate that required params are defined
    if(typeof message !== "object") return console.warn(`${new Date()} | ` + `Error: message is type of ${typeof message}. Expected "object' (./commands/moderation/resetwarns.js:12)`);
    if(typeof args !== "object") return console.warn(`${new Date()} | ` + `Error: args is type of ${typeof args}. Expected "object' (./commands/moderation/resetwarns.js:13)`);

    message.cancel = true;

    let player = message.sender;
    
    // make sure the user has permissions to run the command
    if(player.hasTag("op") === false) 
        return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to be Scythe-Opped to use this command."}]}`);
    
    if(args.length === 0) return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to provide who's warns to reset!"}]}`);

    // try to find the player requested
    if(args.length) for (let pl of World.getPlayers()) if(pl.nameTag.toLowerCase().includes(args[0].toLowerCase().replace(/"|\\|@/g, ""))) var member = pl;
    
    if(typeof member === "undefined") return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"Couldnt find that player!"}]}`);

    if(member === player) return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You cannot reset your own warns."}]}`);

    player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.nameTag} has reset ${member.nameTag}'s warns."}]}`);

    member.runCommand("function tools/resetwarns");
}
