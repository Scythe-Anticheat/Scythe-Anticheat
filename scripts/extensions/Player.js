// @ts-check
// Add new methods to Scripting API classes
import { Player } from "@minecraft/server";
import { tellAllStaff } from "../util.js";

// In older versions of Scythe, we would only add these properties if the necessary module was enabled in the playerJoin event
// However this would bring along a problem where if a world is loaded without the module enabled,
// and an admin were to enable the module, Scythe would break due to the required properties not being initialized.
Player.prototype.blocksBroken = 0;
Player.prototype.firstAttack = 0;
Player.prototype.clicks = 0;
Player.prototype.lastThrow = 0;
// We set this to NaN to prevent any KillauraB false flags which can be caused if Scythe is not at the top of the behavior packs list.
Player.prototype.lastLeftClick = NaN;
Player.prototype.entitiesHit = [];
Player.prototype.lastMessageSent = 0;
Player.prototype.reports = [];

/**
 * @remarks Add Scythe-OP status to a player
 * @param {Player} [initiator] - The player that initiated the request
 */
Player.prototype.addOp = function(initiator) {
    if(initiator) tellAllStaff(`§r§6[§aScythe§6]§r ${initiator.name} has given ${this.name} scythe-op status.`);

    this.addTag("op");
    this.sendMessage("§r§6[§aScythe§6]§r §7You are now scythe-op.");
};

/**
 * @remarks Remove Scythe-OP status from a player
 * @param {Player} [initiator] - The player that initiated the request
 */
Player.prototype.removeOp = function(initiator) {
    if(initiator) tellAllStaff(`§r§6[§aScythe§6]§r ${initiator.name} has removed ${this.name}'s scythe-op status.`);

    this.removeTag("op");
};

/**
 * @remarks Wipe the ender chest of a player
 * @param {Player} [initiator] - The player that initiated the request
 */
Player.prototype.wipeEnderchest = function(initiator) {
    if(initiator) tellAllStaff(`§r§6[§aScythe§6]§r ${initiator.name} has cleared ${this.name}'s enderchest.`);

    for(let i = 0; i < 27; i++) {
        this.runCommand(`replaceitem entity @s slot.enderchest ${i} air`);
    }
};