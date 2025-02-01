import { world } from "@minecraft/server";
import { capitalizeFirstLetter, findPlayerByName } from "../../util.js";
import { registerCommand } from "../handler.js";

const logo = "§r§6[§aScythe§6]§r";

registerCommand({
	name: "stats",
	description: "Show all checks a player was flagged for",
	usage: "<player>",
	minArgCount: 1,
    category: "moderation",
	execute: (message, args) => {
		const { player } = message;

		// Find the player requested
		const member = findPlayerByName(args[0]);

		if(!member) return player.sendMessage(`${logo} Couldn't find that player.`);

		player.sendMessage(getStatsMsg(member));
	}
});

export function getStatsMsg(player) {
	let statsMsg = `${logo} Showing all Scythe logs for ${player.name}:\n${logo} ==== BASIC INFO ====\n${logo} Unique ID: ${player.id}\n${logo} Gamemode: ${capitalizeFirstLetter(player.gamemode)}\n${logo} Dimension: ${capitalizeFirstLetter(player.dimension.id.replace("minecraft:", ""))}\n${logo} Position: ${Math.trunc(player.location.x)}, ${Math.trunc(player.location.y)}, ${Math.trunc(player.location.z)}\n${logo} Platform: ${player.clientSystemInfo.platformType}\n${logo} ==== VIOLATIONS ====\n`;

	let totalViolations = 0;
	for(const objective of world.scoreboard.getObjectives()) {
		const { id } = objective;

		if(!id.endsWith("vl")) continue;

		const score = objective.getScore(player);
		if(!score) continue;

		totalViolations += score;

		statsMsg += `${logo} ${capitalizeFirstLetter(id).replace("vl", "")} violations: §c${score}\n`;
	}

	statsMsg += `\n${logo} Total violations: ${totalViolations === 0 ? "§a0" : `§c${totalViolations}`}\n${logo} ==== USER FLAGS ====\n${logo} Scythe OP: ${player.hasTag("op") ? "§atrue" : "false"}\n${logo} Vanished: ${player.getDynamicProperty("vanished") ?? false}\n${logo} Frozen: ${player.getDynamicProperty("frozen") ? "§ctrue" : "§afalse"}\n${logo} Muted: ${player.getDynamicProperty("muted") ? "§ctrue" : "§afalse"}\n${logo} Flying: ${player.isFlying}\n${logo} ==== END OF STATS ====`;

	return statsMsg;
}