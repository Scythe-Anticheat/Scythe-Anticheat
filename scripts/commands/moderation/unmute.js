import * as Minecraft from "@minecraft/server";
import { registerCommand } from "../handler.js";

const world = Minecraft.world;

registerCommand({
    name: "unmute",
    usage: "<player> [reason]",
    minArgCount: 1,
    execute: (message, args) => {
        const player = message.sender;

        const reason = args.slice(1).join(" ").replace(/"|\\/g, "") || "No reason specified";
        
        // try to find the player requested
        let member;
        for(const pl of world.getPlayers()) if(pl.name.toLowerCase().includes(args[0].toLowerCase().replace(/"|\\|@/g, ""))) {
            member = pl;
            break;
        }
        
        if(!member) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

        member.removeTag("isMuted");
        member.sendMessage("§r§6[§aScythe§6]§r You have been unmuted.");
        
        // add chat ability
        member.runCommandAsync("ability @s mute false");

        player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r ${player.nameTag} has unmuted ${member.nameTag} for ${reason}"}]}`);
    }
});