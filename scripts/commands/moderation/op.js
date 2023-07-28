import * as Minecraft from "@minecraft/server";
import { registerCommand } from "../handler.js";

const world = Minecraft.world;

registerCommand({
    name: "op",
    usage: "<player>",
    minArgCount: 1,
    execute: (message, args) => {
        const player = message.sender;

        // try to find the player requested
        let member;

        for (const pl of world.getPlayers()) if(pl.name.toLowerCase().includes(args[0]?.toLowerCase().replace(/"|\\|@/g, ""))) {
            member = pl;
            break;
        }

        if(!member) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

        if(member.hasTag("op")) return player.sendMessage("§r§6[§aScythe§6]§r This player already has scythe-op.");

        addOp(member);

        member.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r ${player.name} has given ${member.name} scythe-op status."}]}`);
    }
});

export function addOp(player) {
    player.addTag("op");

    player.sendMessage("§r§6[§aScythe§6]§r §7You are now scythe-op.");
}

export function removeOp(player) {
    player.removeTag("op");
}