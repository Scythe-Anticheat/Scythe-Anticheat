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
    if(typeof message !== "object") return console.warn(`${new Date()} | ` + `Error: message is type of ${typeof message}. Expected "object' (./commands/utility/tag.js:13)`);
    if(typeof args !== "object") return console.warn(`${new Date()} | ` + `Error: args is type of ${typeof args}. Expected "object' (./commands/utility/tag.js:14)`);

    message.cancel = true;

    let player = message.sender;

    if(args.length === 0) return player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to provide a tag! (./utility/tag.js:24)"}]}`);

    for (let pl of World.getPlayers()) if(pl.name.toLowerCase().includes(args[0].toLowerCase().replace(/"|\\|@/g, ""))) {
        var member = pl;
        args.shift();
    }

    if(typeof member === "undefined") var member = player;

    if(!args[0]) return player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to provide a tag! (./utility/tag.js:32)"}]}`);

    // reset user nametag
    if(args[0].includes("reset") === true) {
        // remove old tags
        member.getTags().forEach(t => {
            if(t.replace(/"|\\/g, "").startsWith("tag:")) member.removeTag(t);
        });

        member.nameTag = member.name;
        return player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.name} has reset ${member.name}'s nametag."}]}`);
    }

    let nametag = `§8[§r${args.join(" ")}§8]§r ${member.name}`.replace(/"|\\/g, "");

    member.nameTag = nametag;

    // remove old tags
    member.getTags().forEach(t => {
        if(t.replace(/"|\\/g, "").startsWith("tag:")) member.removeTag(t);
    });

    member.addTag(`tag:${args.join(" ").replace(/"|\\/g, "")}`);

    player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.name} has changed ${member.name}'s nametag to ${nametag}."}]}`);
}
