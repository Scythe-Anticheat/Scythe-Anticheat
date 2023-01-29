import * as Minecraft from "@minecraft/server";
import config from "./data/config.js";
import data from "./data/data.js";

const World = Minecraft.world;

/**
 * @name flag
 * @param {object} player - The player object
 * @param {string} check - What check ran the function.
 * @param {string} checkType - What sub-check ran the function (ex. a, b ,c).
 * @param {string} hackType - What the hack is considered as (ex. movement, combat, exploit).
 * @param {string | undefined} [debugName] - Name for the debug value.
 * @param {string | number | undefined} [debug] - Debug info.
 * @param {boolean} [shouldTP] - Whever to tp the player to itself.
 * @param {object | undefined} [cancelObject] - object with property "cancel" to cancel.
 * @param {number | undefined} [slot] - Slot to clear an item out.
 * @example flag(player, "Spammer", "B", "Combat", undefined, undefined, undefined, msg, undefined);
 * @remarks Alerts staff if a player is hacking.
 */
export function flag(player, check, checkType, hackType, debugName, debug, shouldTP = false, cancelObject, slot) {
    // validate that required params are defined
    if(typeof player !== "object") throw TypeError(`Error: player is type of ${typeof player}. Expected "object"`);
    if(typeof check !== "string") throw TypeError(`Error: check is type of ${typeof check}. Expected "string"`);
    if(typeof checkType !== "string") throw TypeError(`Error: checkType is type of ${typeof checkType}. Expected "string"`);
    if(typeof hackType !== "string") throw TypeError(`Error: hackType is type of ${typeof hackType}. Expected "string"`);
    if(typeof debugName !== "string" && typeof debugName !== "undefined") throw TypeError(`Error: debugName is type of ${typeof debugName}. Expected "string" or "undefined"`);
    if(typeof debug !== "string" && typeof debug !== "number" && typeof debug !== "undefined") throw TypeError(`Error: debug is type of ${typeof debug}. Expected "string", "number" or "undefined"`);
    if(typeof shouldTP !== "boolean") throw TypeError(`Error: shouldTP is type of ${typeof shouldTP}. Expected "boolean"`);
    if(typeof cancelObject !== "object" && typeof cancelObject !== "undefined") throw TypeError(`Error: cancelObject is type of ${typeof cancelObject}. Expected "object" or "undefined`);
    if(typeof slot !== "number" && typeof slot !== "undefined") throw TypeError(`Error: slot is type of ${typeof slot}. Expected "nunber" or "undefined`);

    if(config.disable_flags_from_scythe_op === true && player.hasTag("op")) return;

    if(typeof debug === "string") {
        // remove characters that may break commands, and newlines
        debug = debug.replace(/"|\\|\n/gm, "");

        // malicous users may try make the debug field ridiclously large to lag any clients that may
        // try to view the alert (anybody with the 'notify' tag)
        if(debug.length > 256) {
            const extraLength = debug.length - 256;
            debug = debug.slice(0, -extraLength) + ` (+${extraLength} additional characters)`;
        }
    }

    // If debug is enabled, then we log everything we know about the player.
    if(config.debug === true) {
        const currentItem = player.getComponent("inventory").container.getItem(player.selectedSlot);
        console.warn(`{"timestamp":${Date.now()},"time":"${new Date().toISOString()}","check":"${check}/${checkType}","hackType":"${hackType}","debug":"${debugName}=${debug}§r","shouldTP":${shouldTP},"slot":"${slot}","playerData":{"playerName":"${player.name}§r","playerNameTag":"${player.nameTag}§r","lastPlayerName":"${player.oldName}§r","location":{"x":${player.location.x},"y":${player.location.y},"z":${player.location.z}},"headLocation":{"x":${player.headLocation.x},"y":${player.headLocation.y},"z":${player.headLocation.z}},"velocity":{"x":${player.velocity.x},"y":${player.velocity.y},"z":${player.velocity.z}},"rotation":{"x":${player.rotation.x},"y":${player.rotation.y}},"playerTags":"${String(player.getTags()).replace(/[\r\n"]/gm, "")}","currentItem":"${currentItem?.typeId || "minecraft:air"}:${currentItem?.data || 0}","selectedSlot":${player.selectedSlot},"dimension":"${player.dimension.id}","playerDataExtra":{"blocksBroken":${player.blocksBroken || -1},"entitiesHitCurrentTick":"${player.entitiesHit}","entitiesHitCurrentTickSize":${player.entitiesHit?.length || -1},"playerCPS":${player.cps || -1},"firstAttack":${player.firstAttack || -1},"lastSelectedSlot":${player.lastSelectedSlot || -1},"startBreakTime":${player.startBreakTime || -1},"lastThrowTime":${player.lastThrow}}}}`);
    }
    // cancel the message
    if(typeof cancelObject === "object") cancelObject.cancel = true;

    if(shouldTP === true && check !== "Crasher") player.teleport(new Minecraft.Location(player.location.x, player.location.y, player.location.z), player.dimension, player.rotation.x, player.rotation.y, false);
        else if(shouldTP === true && check === "Crasher") player.teleport(new Minecraft.Location(30000000, 30000000, 30000000), player.dimension, 0, 0);

    const scoreboardObjective = check === "CommandBlockExploit" ? "cbevl" : `${check.toLowerCase()}vl`;

    if(!World.scoreboard.getObjective(scoreboardObjective)) {
        World.scoreboard.addObjective(scoreboardObjective, scoreboardObjective);
    } 

    player.runCommandAsync(`scoreboard players add @s ${scoreboardObjective} 1`);

    if(debug) player.runCommandAsync(`tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r ${player.nameTag}§r §1has failed §7(${hackType}) §4${check}/${checkType.toUpperCase()} §7(${debugName}=${debug}§r§7)§4. VL= "},{"score":{"name":"@s","objective":"${scoreboardObjective}"}}]}`);
        else player.runCommandAsync(`tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r ${player.nameTag}§r §1has failed §7(${hackType}) §4${check}/${checkType.toUpperCase()}. VL= "},{"score":{"name":"@s","objective":"${scoreboardObjective}"}}]}`);

    if(typeof slot === "number") {
		const container = player.getComponent("inventory").container;
		try {
			container.setItem(slot, new Minecraft.ItemStack(Minecraft.MinecraftItemTypes.dirt, 0, 0));
		} catch {}
	}

    const checkData = config.modules[check.toLowerCase() + checkType.toUpperCase()];
    if(typeof checkData !== "object") throw Error(`No valid check data found for ${check}/${checkType}.`);

    if(checkData.enabled === false) throw Error(`${check}/${checkType} was flagged but the module was disabled.`);

    // punishment stuff
    const punishment = checkData.punishment?.toLowerCase();
    if(typeof punishment !== "string") throw TypeError(`Error: punishment is type of ${typeof punishment}. Expected "string"`);
    if(punishment === "none" || punishment === "") return;

    if(getScore(player, scoreboardObjective, 1) < checkData.minVlbeforePunishment) return;

    if(punishment === "kick") {
        player.runCommandAsync(`tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has been automatically kicked by Scythe Anticheat for Unfair Advantage. Check: ${check}/${checkType}"}]}`);
        player.runCommandAsync(`kick "${player.name}" §r§6[§aScythe§6]§r You have been kicked for hacking. Check: ${check}\\${checkType} (${debugName}=${debug})`);
        // incase /kick fails, we despawn them from the world
        player.triggerEvent("scythe:kick");
    }
    if(punishment === "ban") {
        if(getScore(player, "autoban") >= 1) {
            const punishmentLength = checkData.punishmentLength?.toLowerCase();
            
            player.runCommandAsync(`tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has been banned by Scythe Anticheat for Unfair Advantage. Check: ${check}/${checkType}"}]}`);
                
            // this removes old ban stuff
            player.getTags().forEach(t => {
                if(t.includes("reason:") || t.includes("by:") || t.includes("time:")) player.removeTag(t);
            });

            let banLength;

            if(typeof punishmentLength !== "undefined" && isNaN(punishmentLength) && punishment !== "") {
                banLength = parseTime(punishmentLength);
            }

            player.addTag("by:Scythe Anticheat");
            player.addTag(`reason:Scythe Anticheat detected Unfair Advantage! Check: ${check}/${checkType}`);
            if(typeof banLength === "number") player.addTag(`time:${Date.now() + banLength}`);
            player.addTag("isBanned");
        }
    }
    if(punishment === "mute") {
        player.addTag("isMuted");
        player.tell(`§r§6[§aScythe§6]§r You have been muted by Scythe Anticheat for Unfair Advantage. Check: ${check}/${checkType}`);
    
        // remove chat ability
        player.runCommandAsync("ability @s mute true");

        player.runCommandAsync(`tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has been automatically muted by Scythe Anticheat for Unfair Advantage. Check: ${check}/${checkType}"}]}`);
    }
}

/**
 * @name banMessage
 * @param {object} player - The player object
 * @example banMessage(player);
 * @remarks Bans the player from the game.
 */
export function banMessage(player) {
    // validate that required params are defined
    if(typeof player !== "object") throw TypeError(`Error: player is type of ${typeof player}. Expected "object"`);
    
    if(config.flagWhitelist.includes(player.name) && player.hasTag("op") && player.oldName) return;
    if(data.unbanQueue.includes(player.name.toLowerCase().split(" ")[0])) {
        player.removeTag("isBanned");

        player.runCommandAsync(`tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has been found in the unban queue and has been unbanned."}]}`);

        player.getTags().forEach(t => {
            if(t.includes("reason:") || t.includes("by:") || t.includes("time:")) player.removeTag(t);
        });

        // remove the player from the unban queue
        for (let i = -1; i < data.unbanQueue.length; i++) {
            if(data.unbanQueue[i] == player.name.toLowerCase().split(" ")[0]) {
                data.unbanQueue.splice(i, 1);
                break;
            }
        }
        return;
    }

    let reason;
    let by;
    let time;

    player.getTags().forEach(t => {
        if(t.includes("by:")) by = t.slice(3);
            else if(t.includes("reason:")) reason = t.slice(7);
            else if(t.includes("time:")) time = t.slice(5);
    });


    if(typeof time !== "undefined") {
        if(time < Date.now()) {
            player.runCommandAsync(`tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.name}'s ban has expired and has now been unbanned."}]}`);

            // ban expired, woo
            player.removeTag("isBanned");
            player.getTags().forEach(t => {
                if(t.includes("reason:") || t.includes("by:") || t.includes("time:")) player.removeTag(t);
            });
            return;
        }

        time = msToTime(Number(time));
        time = `${time.w} weeks, ${time.d} days, ${time.h} hours, ${time.m} minutes, ${time.s} seconds`;
    }
    
    player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r ${player.name} was kicked for being banned. Ban Reason: ${reason || "You are banned!"}."}]}`);

    player.runCommandAsync(`kick "${player.name}" §r\n§l§cYOU ARE BANNED!\n§eBanned By:§r ${by || "N/A"}\n§bReason:§r ${reason || "N/A"}\n§aBan Length:§r ${time || "Permenant"}`);
    player.triggerEvent("scythe:kick");
}

/**
 * @name getClosestPlayer
 * @param {object} entity - The entity to check
 * @example getClosestPlayer(entity);
 * @remarks Gets the nearest player to an entity.
 * @returns {object} player - The player that was found
 */
 export function getClosestPlayer(entity) {
    // validate that required params are defined
    if(typeof entity !== "object") return TypeError(`Error: entity is type of ${typeof entity}. Expected "object"`);

    const nearestPlayer = [...entity.dimension.getPlayers({
        closest: 1,
        location: new Minecraft.Location(entity.location.x, entity.location.y, entity.location.z)
    })][0];

    return nearestPlayer;
}

/**
 * @name parseTime
 * @param {string} str - The time value to convert to milliseconds
 * @example parseTime("24d"); // returns 2073600000
 * @remarks Parses a time string into milliseconds.
 * @returns {number | null} str - The converted string
 */
export function parseTime(str) {
    // validate that required params are defined
    if(typeof str !== "string") throw TypeError(`Error: str is type of ${typeof str}. Expected "string"`);

    // parse time values like 12h, 1d, 10m into milliseconds
    const time = str.match(/^(\d+)([smhdwy])$/);
    if(time) {
        const [, num, unit] = time;
        const ms = {
            s: 1000,
            m: 60000,
            h: 3600000,
            d: 86400000,
            w: 604800000,
            y: 31536000000
        }[unit];
        return ms * Number(num);
    }
    return time;
}

/**
 * @name msToTime
 * @param {number} ms - The string to convert
 * @example str(88200000); // Returns { d: 1, h: 0, m: 30, s: 0 }
 * @remarks Convert miliseconds to seconds, minutes, hours, days and weeks
 * @returns {object} str - The converted string
 */
export function msToTime(ms) {
    // validate that required params are defined
    if(typeof ms !== "number") throw TypeError(`Error: ms is type of ${typeof ms}. Expected "number"`);

    if(ms > Date.now()) ms = ms - Date.now();

    // turn miliseconds into days, minutes, seconds, etc
    const w = Math.floor(ms / (1000 * 60 * 60 * 24 * 7));
    const d = Math.floor((ms % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
    const h = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((ms % (1000 * 60)) / 1000);
    return {
        w: w,
        d: d,
        h: h,
        m: m,
        s: s
    };
}

/**
 * @name getScore
 * @param {object} player - The player to get the scoreboard value from
 * @param {string} objective - The player to get the scoreboard value from
 * @param {number} defaultValue? - Default value to return if unable to get scoreboard score
 * @example getScore(player, "cbevl", 0)
 * @remarks Convert miliseconds to seconds, minutes, hours, days and weeks
 * @returns {number} score - The scoreboard objective value
 */
 export function getScore(player, objective, defaultValue = 0) {
    if(typeof player !== "object") throw TypeError(`Error: player is type of ${typeof player}. Expected "object"`);
    if(typeof objective !== "string") throw TypeError(`Error: objective is type of ${typeof objective}. Expected "string"`);
    if(typeof defaultValue !== "number") throw TypeError(`Error: defaultValue is type of ${typeof defaultValue}. Expected "number"`);

    try {
       return World.scoreboard.getObjective(objective).getScore(player.scoreboard);
    } catch {
        return defaultValue;
    }
}