// @ts-check
// Add new methods to Scripting API classes
import { Player, InputPermissionCategory } from "@minecraft/server";
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
Player.prototype.entitiesHit = new Set();
Player.prototype.lastMessageSent = 0;
Player.prototype.reports = [];
Player.prototype.lastSprintState = false;
Player.prototype.isUsingItem = false;

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
 * @remarks Give the player the mayfly ability so they can fly outside of Creative
 * @param {Player} [initiator] - The player that initiated the request
 */
Player.prototype.enableFly = function(initiator) {
    if(initiator) tellAllStaff(`§r§6[§aScythe§6]§r ${initiator.name} has given ${initiator.id === this.id ? "themselves" : `${this.name}'s`} fly mode.`);

    this.addTag("flying");

	this.runCommand("ability @s mayfly true");
	this.sendMessage("§r§6[§aScythe§6]§r You are now in fly mode.");
};

/**
 * @remarks Remove the mayflay ability from the player
 * @param {Player} [initiator] - The player that initiated the request
 */
Player.prototype.disableFly = function(initiator) {
    if(initiator) tellAllStaff(`§r§6[§aScythe§6]§r ${initiator.name} has removed ${initiator.id === this.id ? "their" : `${this.name}'s`} fly mode.`);

	this.removeTag("flying");

	this.runCommand("ability @s mayfly false");
	this.sendMessage("§r§6[§aScythe§6]§r You are now no longer in fly mode.");
};

/**
 * @remarks Make the player unable to move
 * @param {Player} [initiator] - The player that initiated the request
 */
Player.prototype.freeze = function(initiator) {
    if(initiator) {
        tellAllStaff(`§r§6[§aScythe§6]§r ${initiator.name} has frozen ${this.name}.`);

        this.sendMessage("§r§6[§aScythe§6]§r You have been frozen by a staff member.");
    }

    this.setDynamicProperty("frozen", true);

    // To prohibit the player from being able to attack entities
    this.addEffect("weakness", 99999, { amplifier: 255, showParticles: false });
    this.triggerEvent("scythe:freeze");
    this.inputPermissions.setPermissionCategory(InputPermissionCategory.Movement, false);
};

/**
 * @remarks Restore the player's ability to move
 * @param {Player} [initiator] - The player that initiated the request
 */
Player.prototype.unfreeze = function(initiator) {
    if(initiator) {
        tellAllStaff(`§r§6[§aScythe§6]§r ${initiator.name} has unfrozen ${this.name}.`);

        this.sendMessage("§r§6[§aScythe§6]§r You have been unfrozen.");
    }

    this.setDynamicProperty("frozen", false);

    this.removeEffect("weakness");
    this.triggerEvent("scythe:unfreeze");
    this.inputPermissions.setPermissionCategory(InputPermissionCategory.Movement, true);
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