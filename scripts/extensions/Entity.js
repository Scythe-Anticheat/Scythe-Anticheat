// @ts-check
// Add new methods to Scripting API classes
import { Entity, world } from "@minecraft/server";

/**
 * @remarks Returns the closest player to the calling entity
 * @returns {import("@minecraft/server").Player} score - The player
 */
Entity.prototype.getClosestPlayer = function() {
    const nearestPlayer = this.dimension.getPlayers({
        closest: 1,
        location: this.location
    })[0];

    return nearestPlayer;
};

/**
 * @remarks Gets the scoreboard objective value for a player
 * @param {string} objective - The name of the scoreboard objective
 * @param {number} [defaultValue] - Default value to return if unable to get scoreboard score
 * @returns {number} score - The scoreboard objective value
 */
Entity.prototype.getScore = function(objective, defaultValue = 0) {
    try {
       return world.scoreboard.getObjective(objective)?.getScore(this) ?? defaultValue;
    } catch {
        return defaultValue;
    }
};

/**
 * @remarks Sets the scoreboard objective value for a player
 * @param {string} objectiveName - The scoreboard objective
 * @param {number} value - The new value of the scoreboard objective
 */
Entity.prototype.setScore = function(objectiveName, value) {
    const objective = world.scoreboard.getObjective(objectiveName);
    if(!objective) throw Error(`Objective "${objectiveName}" does not exist`);

    objective.setScore(this, value);
};