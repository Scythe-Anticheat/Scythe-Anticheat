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
    if(typeof message !== "object") throw TypeError(`message is type of ${typeof message}. Expected "object".`);
    if(typeof args !== "object") throw TypeError(`args is type of ${typeof args}. Expected "object".`);

    let player = message.sender;
    let member;

    if(args.length === 0) return player.tell("§r§6[§aScythe§6]§r You need to provide a tag!");

    for (let pl of World.getPlayers()) if(pl.name.toLowerCase().includes(args[0].toLowerCase().replace(/"|\\|@/g, ""))) {
        member = pl;
        args.shift();
    }

    if(typeof member === "undefined") member = player;

    if(!args[0]) return player.tell("§r§6[§aScythe§6]§r You need to provide a tag!");

    // reset user nametag
    if(args[0].includes("reset") === true) {
        // remove old tags
        member.getTags().forEach(t => {
            if(t.replace(/"|\\/g, "").startsWith("tag:")) member.removeTag(t);
        });

        member.nameTag = member.name;
        return player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.name} has reset ${member.name}'s nametag."}]}`);
    }

    let tag = args.join(" ").replace(/"|\\/g, "");
    let nametag = `§8[§r${tag}§8]§r ${member.name}`.replace(/"|\\/g, "");

    member.nameTag = nametag;

    // remove old tags
    member.getTags().forEach(t => {
        if(t.replace(/"|\\/g, "").startsWith("tag:")) member.removeTag(t);
    });

    member.addTag(`tag:${tag}`);

    player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.name} has changed ${member.name}'s nametag to ${nametag}."}]}`);
}
