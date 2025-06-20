// @ts-check
import { world } from "@minecraft/server";
import { capitalizeFirstLetter, findPlayerByName } from "../../util.js";
import { registerCommand } from "../handler.js";

const logo = "§r§6[§aScythe§6]§r";

registerCommand({
	name: "stats",
	description: "Show all checks a player was flagged for",
	usage: "<player>",
	minArgCount: 1,
	aliases: ["info", "lookup"],
    category: "moderation",
	execute: (message, args) => {
		const { player } = message;

		// Find the player requested
		const target = findPlayerByName(args[0]);

		if(!target) return player.sendMessage(`${logo} Couldn't find that player.`);

		player.sendMessage(getStatsMsg(target));
	}
});

export function getStatsMsg(target) {
	let statsMsg = `${logo} Showing all Scythe logs for ${target.name}:\n${logo} ==== BASIC INFO ====\n${logo} Unique ID: ${target.id}\n${logo} Gamemode: ${target.gamemode}\n${logo} Dimension: ${capitalizeFirstLetter(target.dimension.id.replace("minecraft:", ""))}\n${logo} Position: ${Math.trunc(target.location.x)}, ${Math.trunc(target.location.y)}, ${Math.trunc(target.location.z)}\n${logo} Platform: ${target.clientSystemInfo.platformType}\n${logo} ==== VIOLATIONS ====\n`;

	let totalViolations = 0;
	for(const objective of world.scoreboard.getObjectives()) {
		const { id } = objective;

		if(!id.endsWith("vl")) continue;

		const score = objective.getScore(target);
		if(!score) continue;

		totalViolations += score;

		statsMsg += `${logo} ${capitalizeFirstLetter(id).replace("vl", "")} violations: §c${score}\n`;
	}

	statsMsg += `\n${logo} Total violations: ${totalViolations === 0 ? "§a0" : `§c${totalViolations}`}\n${logo} ==== USER FLAGS ====\n${logo} Scythe OP: ${target.hasTag("op") ? "§atrue" : "false"}\n${logo} Vanished: ${target.getDynamicProperty("vanished") ?? false}\n${logo} Frozen: ${target.getDynamicProperty("frozen") ? "§ctrue" : "§afalse"}\n${logo} Muted: ${target.getDynamicProperty("muted") ? "§ctrue" : "§afalse"}\n${logo} Flying: ${target.isFlying}\n${logo} ==== END OF STATS ====`;

	return statsMsg;
}