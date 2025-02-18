// Add new methods to Scripting API classes
import { Player } from "@minecraft/server";

// In older versions of Scythe, we would only add these properties if the necessary module was enabled
// However this would bring along a problem where if a world is loaded without the module enabled,
// and an admin were to enable the module, Scythe would break due to the required properties not being initialized.
Player.prototype.blocksBroken = 0;
Player.prototype.firstAttack = 0;
Player.prototype.clicks = 0;
Player.prototype.lastThrow = 0;
// We set this to NaN to prevent any KillauraB false flags which can be caused
// if Scythe is not at the top of the behavior packs list.
Player.prototype.lastLeftClick = NaN;
Player.prototype.entitiesHit = [];
Player.prototype.lastMessageSent = 0;
Player.prototype.reports = [];