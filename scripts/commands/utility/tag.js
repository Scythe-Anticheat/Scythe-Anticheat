// import * as Minecraft from "mojang-minecraft";

// const World = Minecraft.world;

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

    // reset user nametag
    if (args.includes("reset")) {
        // remove old tags
        player.getTags().forEach(t => {
            if(t.replace(/"|\\/g, "").startsWith("tag:")) player.removeTag(`${t}`);
        });

        player.nameTag = player.name;
        return player.runCommand(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.name} has reset their nametag"}]}`);
    }

    let nametag = `§8[§r${args.join(" ")}§8]§r ${player.name}`.replace(/"|\\/g, "");

    if (!args.length) return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to provide a tag!"}]}`);

    player.nameTag = nametag;

    // remove old tags
    player.getTags().forEach(t => {
        if(t.replace(/"|\\/g, "").startsWith("tag:")) player.removeTag(`${t}`);
    });

    player.addTag(`"tag:${args.join(" ").replace(/"|\\/g, "")}"`);

    return player.runCommand(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.name} has changed their nametag to ${nametag}"}]}`);
}
