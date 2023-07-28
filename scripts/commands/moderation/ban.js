import * as Minecraft from "@minecraft/server";
import { parseTime } from "../../util.js";
import { registerCommand } from "../handler.js";

const world = Minecraft.world;

registerCommand({
    name: "ban",
    usage: "<player> [time] [reason]",
    minArgCount: 1,
    execute: (message, args) => {
        const player = message.sender;
        const time = args[1] ? parseTime(args[1]) : undefined;

        if(!time) args.splice(1, 1);

        const reason = args.slice(1).join(" ").replace(/"|\\/g, "") || "No reason specified";
        
        // try to find the player requested
        let member;

        for (const pl of world.getPlayers()) if(pl.name.toLowerCase().includes(args[0].toLowerCase().replace(/"|\\|@/g, ""))) {
            member = pl;
            break;
        }

        if(!member) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

        // make sure they dont ban themselves
        if(member.id === player.id) return player.sendMessage("§r§6[§aScythe§6]§r You cannot ban yourself.");

        // cannot ban staff members
        if(member.hasTag("op")) return player.sendMessage("§r§6[§aScythe§6]§r You cannot ban other staff members.");

        // removes old ban data
        member.getTags().forEach(t => {
            if(t.includes("reason:") || t.includes("by:") || t.includes("time:")) member.removeTag(t);
        });

        member.addTag(`reason:${reason}`);
        member.addTag(`by:${player.nameTag}`);
        if(typeof time === "number") member.addTag(`time:${Date.now() + time}`);
        member.addTag("isBanned");

        player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r ${player.nameTag} has banned ${member.nameTag} for ${reason}"}]}`);
    }
});