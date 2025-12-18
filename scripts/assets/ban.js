// @ts-check
import config from "../data/config.js";
import { world, Player } from "@minecraft/server";
import { msToTime, tellAllStaff } from "../util.js";

/**
 * @param {Player} player - The player that should be kicked from the game
 * @remarks Show the player the ban message if they are banned and not part of the unban queue
 */
export function banMessage(player) {
    // validate that required params are defined
    if(!(player instanceof Player)) throw TypeError(`Error: player is not an instance of Player.`);

    // @ts-expect-error
    if(config.flagWhitelist.includes(player.name) && player.hasTag("op")) return;

    // @ts-expect-error
    const unbanQueue = JSON.parse(world.getDynamicProperty("unbanQueue"));

    const playerName = player.name.toLowerCase();
    if(Object.hasOwn(unbanQueue, playerName)) {
        player.setDynamicProperty("banInfo", undefined);

        tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has been found in the unban queue and has been unbanned.`);

        delete unbanQueue[playerName];
        world.setDynamicProperty("unbanQueue", JSON.stringify(unbanQueue));
        return;
    }

    // @ts-expect-error
    const { by, reason, time } = JSON.parse(player.getDynamicProperty("banInfo"));

    let friendlyTime;

    // Check if the ban data includes an unban time
    if(time) {
        if(time < Date.now()) {
           tellAllStaff(`§r§6[§aScythe§6]§r ${player.name}'s ban has expired and has now been unbanned.`);

            player.setDynamicProperty("banInfo", undefined);
            return;
        }

        const timeUntilUnban = time - Date.now();

        const { w, d, h, m, s } = msToTime(timeUntilUnban);
        friendlyTime = `${w} weeks, ${d} days, ${h} hours, ${m} minutes, ${s} seconds`;
    }

    tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} was kicked for being banned. Ban Reason: ${reason ?? "You are banned!"}.`);

    player.kick(null, `§r\n§l§cYOU ARE BANNED!\n§eBanned By:§r ${by ?? "N/A"}\n§bReason:§r ${reason ?? "N/A"}\n§aBan Length:§r ${friendlyTime || "Permanent"}`);
}