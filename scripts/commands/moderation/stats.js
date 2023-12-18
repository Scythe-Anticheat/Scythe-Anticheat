import { world } from "@minecraft/server";
import { capitalizeFirstLetter, findPlayerByName } from "../../util.js";
import { registerCommand } from "../handler.js";

const logo = "§r§6[§aScythe§6]§r";

registerCommand({
	name: "stats",
	usage: "<player>",
	minArgCount: 1,
	execute: (message, args) => {
		const player = message.sender;

		// Find the player requested
		const member = findPlayerByName(args[0]);

		if(!member) return player.sendMessage("${logo} Couldn't find that player.");

		player.sendMessage(getStatsMsg(member));
	}
});

export function getStatsMsg(player) {
	let statsMsg = `${logo} Showing all Scythe logs for ${player.name}:\n${logo} ==== BASIC INFO ====\n${logo} Unique ID: ${player.id}\n${logo} Gamemode: N/A\n${logo} Dimension: ${capitalizeFirstLetter(player.dimension.id.replace("minecraft:", ""))}\n${logo} Position: ${Math.floor(player.location.x)}, ${Math.floor(player.location.y)}, ${Math.floor(player.location.z)}\n${logo} Current selected slot: ${player.selectedSlot}\n${logo} XP Levels: ${player.level}\n${logo} ==== VIOLATIONS ====\n`;

	let totalViolations = 0;
	for(const objective of world.scoreboard.getObjectives()) {
		const { id } = objective;

		if(!id.endsWith("vl")) continue;

		const score = objective.getScore(player);
		if(!score) continue;

		totalViolations += score;

		statsMsg += `${logo} ${capitalizeFirstLetter(id).replace("vl", "")} violations: §c${score}\n`;
	}

	statsMsg += `\n${logo} Total violations: ${totalViolations === 0 ? "§a0" : `§c${totalViolations}`}\n${logo} ==== USER FLAGS ====\n${logo} Scythe OP: ${player.hasTag("op") ? "§atrue" : "false"}\n${logo} Vanished: ${player.hasTag("vanish")}\n${logo} Frozen: ${player.hasTag("freeze") ? "§ctrue" : "§afalse"}\n${logo} Muted: ${player.hasTag("isMuted") ? "§ctrue" : "§afalse"}\n${logo} Flying: ${player.isFlying}\n${logo} ==== END OF STATS ====`;

	return statsMsg;
}