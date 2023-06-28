import * as Minecraft from "@minecraft/server";
import config from "../../data/config.js";

const world = Minecraft.world;

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

    if(!args.length) return player.sendMessage("§r§6[§aScythe§6]§r You need to provide a tag to add.");

    // try to find the player requested
    let member;

    for(const pl of world.getPlayers()) if(pl.name.toLowerCase().includes(args[0].toLowerCase().replace(/"|\\|@/g, ""))) {
        member = pl;
        args.shift();
        break;
    }

    if(!member) member = player;

    if(!args[0]) return player.sendMessage("§r§6[§aScythe§6]§r You need to provide a tag to add.");

    // reset user nametag
    if(args[0].includes("reset")) {
        // remove old tags
        member.getTags().forEach(t => {
            if(t.replace(/"|\\/g, "").startsWith("tag:")) member.removeTag(t);
        });

        member.nameTag = member.name;
        return player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r ${player.name} has reset ${member.name}'s nametag."}]}`);
    }

    const tag = args.join(" ").replace(/"|\\/g, "");
    const { mainColor, borderColor, playerNameColor } = config.customcommands.tag;

    const nametag = `${borderColor}[§r${mainColor}${tag}${borderColor}]§r ${playerNameColor}${member.name}`.replace(/"|\\/g, "");

    member.nameTag = nametag;

    // remove old tags
    member.getTags().forEach(t => {
        if(t.replace(/"|\\/g, "").startsWith("tag:")) member.removeTag(t);
    });

    member.addTag(`tag:${tag}`);

    player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r ${player.name} has changed ${member.name}'s nametag to ${nametag}."}]}`);
}
