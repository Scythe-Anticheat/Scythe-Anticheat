import * as Minecraft from "@minecraft/server";
import { registerCommand } from "../handler.js";

const world = Minecraft.world;

registerCommand({
    name: "resetwarns",
    usage: "<player>",
    minArgCount: 1,
    execute: (message, args) => {
        const player = message.sender;

        // try to find the player requested
        let member;

        for (const pl of world.getPlayers()) if(pl.name.toLowerCase().includes(args[0].toLowerCase().replace(/"|\\|@/g, ""))) {
            member = pl;
            break;
        }
        
        if(!member) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

        if(member.id === player.id) return player.sendMessage("§r§6[§aScythe§6]§r You cannot reset your own warns.");

        player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r ${player.nameTag} has reset ${member.nameTag}'s warns."}]}`);

        member.runCommandAsync("function tools/resetwarns");
    }
});