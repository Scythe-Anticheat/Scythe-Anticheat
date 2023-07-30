import * as Minecraft from "@minecraft/server";
import { registerCommand } from "../handler.js";

const world = Minecraft.world;

registerCommand({
    name: "kick",
    usage: "<player> [-s] [--silent] [reason]",
    minArgCount: 1,
    execute: (message, args) => {
        const player = message.sender;

        let isSilent = false;
        if(args[1] === "-s" || args[1] === "--silent") isSilent = true;

        const reason = args.slice(1).join(" ").replace(/-s|-silent/, "").replace(/"|\\/g, "") || "No reason specified";

        // try to find the player requested
        let member;

        for (const pl of world.getPlayers()) if(pl.name.toLowerCase().includes(args[0].toLowerCase().replace(/"|\\|@/g, ""))) {
            member = pl;
            break;
        }

        if(!member) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

        // make sure they don't kick themselves
        if(member.id === player.id) return player.sendMessage("§r§6[§aScythe§6]§r You cannot kick yourself.");

        if(!isSilent) player.runCommandAsync(`kick "${member.name}" ${reason}`);
        member.triggerEvent("scythe:kick");

        player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r ${player.nameTag} has kicked ${member.name} ${isSilent ? "(Silent) ": ""}for ${reason}"}]}`);
    }
});