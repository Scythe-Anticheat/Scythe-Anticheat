import * as Minecraft from "@minecraft/server";
import { registerCommand } from "../handler.js";

const world = Minecraft.world;

registerCommand({
    name: "ecwipe",
    usage: "<player>",
    minArgCount: 0,
    execute: (message, args) => {
        const player = message.sender;

        // try to find the player requested
        let member;

        for (const pl of world.getPlayers()) if(pl.name.toLowerCase().includes(args[0].toLowerCase().replace(/"|\\|@/g, ""))) {
            member = pl;
            break;
        }

        if(!member) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

        for(let i = 0; i < 27; i++) {
            member.runCommandAsync(`replaceitem entity @s slot.enderchest ${i} air`);
        }

        player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r ${player.nameTag} has cleared ${member.nameTag}'s enderchest."}]}`);
    }
});