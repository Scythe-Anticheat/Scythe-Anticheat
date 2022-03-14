/* eslint no-redeclare: "off"*/
import * as Minecraft from "mojang-minecraft";

const World = Minecraft.world;

/**
 * @name tag
 * @param {object} message - Message object
 * @param {array} args - Additional arguments provided.
 */
export function tag(message, args) {
    // validate that required params are defined
    if (!message) return console.warn(`${new Date()} | ` + "Error: ${message} isnt defined. Did you forget to pass it? (./utility/tag.js:8)");
    if (!args) return console.warn(`${new Date()} | ` + "Error: ${args} isnt defined. Did you forget to pass it? (./utility/tag.js:9)");

    message.cancel = true;

    let player = message.sender;

    // make sure the user has permissions to run the command
    if(!player.hasTag("op")) 
        return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to be Scythe-Opped to use this command."}]}`);

    if (!args.length) return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to provide a tag!"}]}`);

    for (let pl of World.getPlayers()) if (pl.nameTag.toLowerCase().includes(args[0].toLowerCase().replace(/"|\\|@/g, ""))) {
        var member = pl; 
        args.shift();
    }
    if (!member) var member = player;

    // reset user nametag
    if (args[0].includes("reset")) {
        // remove old tags
        member.getTags().forEach(t => {
            if(t.replace(/"|\\/g, "").startsWith("tag:")) member.removeTag(`${t}`);
        });

        member.nameTag = member.name;
        return player.runCommand(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.name} has reset ${member.name}'s nametag."}]}`);
    }

    let nametag = `§8[§r${args.join(" ")}§8]§r ${member.name}`.replace(/"|\\/g, "");

    member.nameTag = nametag;

    // remove old tags
    member.getTags().forEach(t => {
        if(t.replace(/"|\\/g, "").startsWith("tag:")) member.removeTag(`${t}`);
    });

    member.addTag(`"tag:${args.join(" ").replace(/"|\\/g, "")}"`);

    return player.runCommand(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.name} has changed ${member.name}'s nametag to ${nametag}."}]}`);
}
