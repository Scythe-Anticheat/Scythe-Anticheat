import * as Minecraft from "@minecraft/server";

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

    const player = message.sender;

    if(!args.length) return player.tell("§r§6[§aScythe§6]§r You need to provide a tag to add.");

    // try to find the player requested
    let member;

    for (const pl of World.getPlayers()) if(pl.name.toLowerCase().includes(args[0].toLowerCase().replace(/"|\\|@/g, ""))) {
        member = pl;
        args.shift();
        break;
    }

    if(!member) member = player;

    if(!args[0]) return player.tell("§r§6[§aScythe§6]§r You need to provide a tag to add.");

    // reset user nametag
    if(args[0].includes("reset")) {
        // remove old tags
        member.getTags().forEach(t => {
            if(t.replace(/"|\\/g, "").startsWith("tag:")) member.removeTag(t);
        });

        member.nameTag = member.name;
        return player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.name} has reset ${member.name}'s nametag."}]}`);
    }

    const tag = args.join(" ").replace(/"|\\/g, "");
    const nametag = `§8[§r${tag}§8]§r ${member.name}`.replace(/"|\\/g, "");

    member.nameTag = nametag;

    // remove old tags
    member.getTags().forEach(t => {
        if(t.replace(/"|\\/g, "").startsWith("tag:")) member.removeTag(t);
    });

    member.addTag(`tag:${tag}`);

    player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.name} has changed ${member.name}'s nametag to ${nametag}."}]}`);
}
