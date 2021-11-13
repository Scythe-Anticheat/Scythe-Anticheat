import * as Minecraft from "mojang-minecraft";

const World = Minecraft.World;
const Commands = Minecraft.Commands;

export function tag(message, args) {
    // validate that required params are defined
    if (!message) return console.warn("Error: ${message} isnt defined. Did you forget to pass it? (./utility/tag.js:13)");
    if (!args) return console.warn("Error: ${args} isnt defined. Did you forget to pass it? (./utility/tag.js:14)");

    message.cancel = true;

    let player = message.sender;
    let nametag = `[${args.join(" ")}] ${player.name}`;

    // make sure the user has permissions to run the command
    try {
        Commands.run(`execute @a[name="${player.nameTag}",tag=op] ~~~ list`, World.getDimension("overworld"));
    } catch (error) {
        return Commands.run(`tellraw ${player.nameTag} {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to be Scythe-Opped to use this command."}]}`, World.getDimension("overworld"));
    }

    if (!args.length) return Commands.run(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to provide a tag!"}]}`, World.getDimension("overworld"));

    player.nameTag = nametag;

    return Commands.run(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.name} has changed their nametag to ${nametag}"}]}`, World.getDimension("overworld"));
}
