// @ts-check
import Check from "../Check.js";
import { Player } from "@minecraft/server";

/**
 * The hack NoSlowDown allows a player to not be slowed down when using an item
 * When this check was created (and for most of its lifespan), Server Authoritative Movement did not trigger if you are going too fast while using an item
 * meaning this was one of the few movement checks we could detect without SAM 'normalizing' player velocities in the eye of the Scripting API
 * 
 * As of 1.21.130 when it was tested again, Server Authoritative Movement now has checks against moving too fast while using an item
 * so this means that Scythe's check for Noslow is useless
 */
class NoslowA extends Check {
	/**
	 * @class
	 * @description Check for too high player speeds when using an item
	 */
	constructor() {
		super({
			check: "Noslow",
			subcheck: "A",
			type: "Movement"
		});
	}

	/**
	 * @param {Player} player
	 */
	tick(player) {
		if(
			!player.isOnGround ||
			// TODO: Try to remove the isJumping check to patch bypasses
			player.isJumping ||
			player.isGliding ||
			player.heldItem === "minecraft:trident" ||
			player.heldItem === "minecraft:fishing_rod" ||
			!player.isUsingItem ||
			!player.isUsingInputKeys() ||
			player.getEffect("speed") ||
			player.hasTag("riding")
		) return;

		// Make sure the player has been using the item for at least 10 ticks
		const now = Date.now();
		if(now - player.itemUsedAt <= 500) return;

		// Find the magnitude of the velocity vector
		const velocity = player.getVelocity();
		const playerSpeed = Math.sqrt(velocity.x**2 + velocity.z**2);

		// Check if player speed is within the range of the flag
		if(playerSpeed <= this.config.speed && playerSpeed >= this.config.maxSpeed) return;

		// Get the block below the player
		const blockBelow = player.dimension.getBlock({x: player.location.x, y: player.location.y - 1, z: player.location.z});

		// Make sure there are no entities below the player to fix false positives with boats
		const nearbyEntities = player.dimension.getEntitiesAtBlockLocation(player.location);

		if(blockBelow && !nearbyEntities.find(entity => entity instanceof Player) && !blockBelow.typeId.includes("ice")) {
			this.flag(player, `speed=${playerSpeed.toFixed(2)},heldItem=${player.heldItem},blockBelow=${blockBelow.typeId},timeUsingItem=${now - player.itemUsedAt}`, true);
		}
	}
}

export default new NoslowA();