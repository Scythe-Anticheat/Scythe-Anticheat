import * as Minecraft from "mojang-minecraft";

const World = Minecraft.World;
const Commands = Minecraft.Commands;

// to make eslint shut up 
if (Commands !== World) console.log(`impossible`);

export function kick(message, args) {
    // validate that required params are defined
    if (!message) return console.warn("Error: ${message} isnt defined. Did you forget to pass it? (./commands/kick.js:13)");
    if (!args) return console.warn("Error: ${args} isnt defined. Did you forget to pass it? (./commands/kick.js:14)");

    message.cancel = true;

    let player = message.sender;
    let reason = args.slice(1).join(" ") || "No reason specified";

    // make sure the user has permissions to run the command
    try {
        Commands.run(`execute @a[name="${player.nameTag}",tag=op] ~~~ list`, World.getDimension("overworld"));
    } catch (error) {
        return Commands.run(`tellraw ${player.nameTag} {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to be Scythe-Opped to use this command."}]}`, World.getDimension("overworld"));
    }

    if (!args.length) return Commands.run(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to provide who to kick!"}]}`, World.getDimension("overworld"));
    /* eslint no-var: "off"*/
    for (let pl of World.getPlayers()) {
        if (pl.nameTag.toLowerCase().includes(args[0].toLowerCase())) var member = pl.nameTag; 
    }
    try {
        Commands.run(`event entity "${member}" scythe:kick`, World.getDimension("overworld"));
    } catch (error) {
        console.warn(error);
        return Commands.run(`tellraw ${player.nameTag} {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"Couldnt find that player!"}]}`, World.getDimension("overworld"));
    }
    return Commands.run(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.nameTag} has kicked ${member}. Reason: ${reason}"}]}`, World.getDimension("overworld"));
}
