import { findPlayerByName, tellAllStaff } from "../../util.js";
import { registerCommand } from "../handler.js";
import config from "../../data/config.js";

registerCommand({
    name: "tag",
    usage: "[player] <tag | reset>",
    minArgCount: 1,
    execute: (message, args) => {
        const player = message.sender;

        // Find the player requested
        let member = findPlayerByName(args[0]);

        if(!member) member = player;
            else args.shift();

        if(!args[0]) return player.sendMessage("§r§6[§aScythe§6]§r You need to provide a tag to add.");

        // Reset user nametag
        if(args[0] === "reset") {
            // Remove old tags
            member.getTags().forEach(t => {
                if(t.startsWith("tag:")) member.removeTag(t);
            });

            member.nameTag = member.name;
            return tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has reset ${member.name}'s nametag.`);
        }

        const tag = args.join(" ").replace(/"|\\/g, "");
        const { mainColor, borderColor, playerNameColor } = config.customcommands.tag;

        const nametag = `${borderColor}[§r${mainColor}${tag}${borderColor}]§r ${playerNameColor}${member.name}`.replace(/"|\\/g, "");

        member.nameTag = nametag;

        // Remove old tags
        member.getTags().forEach(t => {
            if(t.startsWith("tag:")) member.removeTag(t);
        });

        member.addTag(`tag:${tag}`);

        tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has changed ${member.name}'s nametag to ${nametag}.`);
    }
});