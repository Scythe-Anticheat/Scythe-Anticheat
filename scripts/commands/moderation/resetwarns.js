import { world } from "@minecraft/server";
import { findPlayerByName, tellAllStaff, setScore } from "../../util.js";
import { registerCommand } from "../handler.js";

registerCommand({
    name: "resetwarns",
    description: "Reset a player's violation history",
    usage: "<player>",
    minArgCount: 1,
    category: "moderation",
    execute: (message, args) => {
        const { player } = message;

        // Find the player requested
        const member = findPlayerByName(args[0]);

        if(!member) return player.sendMessage("§r§6[§aScythe§6]§r Couldn't find that player.");

        for(const objective of world.scoreboard.getObjectives()) {
            const { id } = objective;

            if(!id.endsWith("vl")) continue;

            setScore(member, id, 0);
        }

        tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has reset ${member.name}'s warns.`);
    }
});