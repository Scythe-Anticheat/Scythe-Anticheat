// @ts-check
// Add new methods to Scripting API classes
import { Player, InputPermissionCategory, GameMode, InputMode } from "@minecraft/server";
import { tellAllStaff } from "../util.js";
import { banMessage } from "../assets/ban.js";

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
Player.prototype.reports = new Set();
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
 * @remarks Ban a player from the world
 * @param {Player | null} [initiator] - The player that initiated the ban
 * @param {String} [reason] - The reason for the ban
 * @param {Number | null} [time] - How long in milliseconds the player should be banned for
 */
Player.prototype.ban = function(initiator, reason = "No reason specified", time = null) {
    if(initiator) tellAllStaff(`§r§6[§aScythe§6]§r ${initiator.name} has banned ${this.name} for ${reason}`);

    this.setDynamicProperty("banInfo", JSON.stringify({
        by: initiator ? initiator.name : "Scythe Anticheat",
        reason,
        time: typeof time === "number" ? Date.now() + time : null
    }));

    // Show the ban message to the player
    banMessage(this);
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
 * @remarks Determine how far the player can place blocks according to their gamemode and input method
 * @returns {number} - How far the player can break blocks
 */
Player.prototype.getMaxBlockPlaceDistance = function() {
    // Regardless of what input method you are using, the block place reach is capped if you are on survival
    if(this.gamemode === GameMode.Survival) return 5;

    const inputMode = this.inputInfo.lastInputModeUsed;

    /*
	When in Creative, the place block reach changes depending on the device:
		- Desktop: Reach limit remains the same
		- Mobile: Reach limit increases to ~11 blocks, depending on angle
		- Console: Reach liit can vary around 5-6.5 blocks, depending on device
    */
    switch(inputMode) {
        case InputMode.KeyboardAndMouse:
            return 5;

        case InputMode.Touch:
            return 11.5;

        case InputMode.Gamepad:
            // Xbox consoles have a reach limit of ~5 blocks, meanwhile Switch consoles have a reach limit of ~6.5 blocks
            // We can't differentiate between the two platforms so the Switch reach limit is used
            return 6.5;

        case InputMode.MotionController:
            // Unknown
            return 12;
    }
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
 * @remarks Kick the calling player from the game
 * @param {Player | null} [initiator] - The player that initiated the kick
 * @param {String} [reason] - The reason for the kick
 * @param {Boolean} [silent] - If the player should be shown a vague disconnect message instead of a kick message
 */
Player.prototype.kick = function(initiator, reason = "No reason specified", silent = false) {
    if(initiator) tellAllStaff(`§r§6[§aScythe§6]§r ${initiator.name} has kicked ${this.name} for ${reason}.`);

    silent ? this.triggerEvent("scythe:kick") : this.runCommand(`kick @s ${reason}`);
};

/**
 * @remarks Returns whether or not the player is muted
 * @returns {Boolean} - If the player is muted
 */
Player.prototype.isMuted = function() {
    return !!this.getDynamicProperty("muted");
};

/**
 * @remarks Prevent a player from being able to send chat messages
 * @param {Player | null} [initiator] - The player that muted the player
 * @param {String} [reason] - The reason for the mute
 */
Player.prototype.mute = function(initiator, reason = "No reason specified") {
    if(initiator) {
        tellAllStaff(`§r§6[§aScythe§6]§r ${initiator.name} has muted ${this.name} for ${reason}.`);

        this.sendMessage(`§r§6[§aScythe§6]§r You have been muted for ${reason}.`);
    }

    // Mark the player as muted
    this.setDynamicProperty("muted", true);

    // Remove the player's chat ability
    this.runCommand("ability @s mute true");
};

/**
 * @remarks Restore's a player ability to send chat messages
 * @param {Player | null} [initiator] - The player that unmuted the player
 * @param {String} [reason] - The reason for the unmute
 */
Player.prototype.unmute = function(initiator, reason = "No reason specified") {
    if(initiator) {
        tellAllStaff(`§r§6[§aScythe§6]§r ${initiator.name} has unmuted ${this.name} for ${reason}.`);

        this.sendMessage(`§r§6[§aScythe§6]§r You have been unmuted.`);
    }

    // Unmar the player as muted
    this.setDynamicProperty("muted", false);

    // Restore the player's chat ability
    this.runCommand("ability @s mute false");
};

/**
 * @remarks Checks if the player is either pressing one of the movement keys (WASD) or is moving the joystick
 * @returns {Boolean} - Whether or not the player is using the input keys
 */
Player.prototype.isUsingInputKeys = function() {
    /*
    This is a good method to determine if a player is intentionally moving as it does not include movement from factors such as knockback, flowing water, pistons, etc
    The only problem is that this data comes directly from the MoveVector field from the PlayerAuthInput packet, meaning it could be easily spoofed by a hack client
    I'm not sure if Server Authoritative Movement triggers if the movement vector does not check out, so it might be necessary to implement checks for spoofed move vectors
    */
    const moveVector = this.inputInfo.getMovementVector();

    return moveVector.x !== 0 || moveVector.y !== 0;
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