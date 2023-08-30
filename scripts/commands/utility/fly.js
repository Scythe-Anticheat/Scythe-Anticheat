import * as Minecraft from "@minecraft/server";
import { findPlayerByName, tellAllStaff } from "../../util.js";
import { registerCommand } from "../handler.js";

const world = Minecraft.world;

registerCommand({
    name: "fly",
    usage: "[player]",
    execute: (message, args) => {
        const player = message.sender;

        // Find the player requested
        const member = args.length ? findPlayerByName(args[0]) : player;

        if(!member) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

        const checkGmc = world.getPlayers({
            excludeGameModes: [Minecraft.GameMode.creative, Minecraft.GameMode.spectator],
            name: member.name
        });

        if(![...checkGmc].length) return player.sendMessage("§r§6[§aScythe§6]§r No need! This player is in creative which allows flying by default.");

        if(member.hasTag("flying")) {
            member.removeTag("flying");

            member.runCommandAsync("ability @s mayfly false");
            member.sendMessage("§r§6[§aScythe§6]§r You are now no longer in fly mode.");
        
            tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has removed ${player.id === member.id ? "their" : `${member.name}'s`} fly mode.`);
        } else {
            member.addTag("flying");

            member.runCommandAsync("ability @s mayfly true");
            member.sendMessage("§r§6[§aScythe§6]§r You are now in fly mode.");
        
            tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has given ${player.id === member.id ? "themselves" : `${member.name}'s`} fly mode.`);
        }
    }
});