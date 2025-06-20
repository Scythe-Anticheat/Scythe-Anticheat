// @ts-check
// Add new methods to Scripting API classes
import { Entity, world } from "@minecraft/server";

/**
 * @param {string} objective - The name of the scoreboard objective
 * @param {number} [defaultValue] - Default value to return if unable to get scoreboard score
 * @example getScore(player, "cbevl")
 * @remarks Gets the scoreboard objective value for a player
 * @returns {number} score - The scoreboard objective value
 */
Entity.prototype.getScore = function(objective, defaultValue = 0) {
    if(typeof objective !== "string") throw TypeError(`Error: objective is type of ${typeof objective}. Expected "string"`);
    if(typeof defaultValue !== "number") throw TypeError(`Error: defaultValue is type of ${typeof defaultValue}. Expected "number"`);

    try {
       return world.scoreboard.getObjective(objective)?.getScore(this) ?? defaultValue;
    } catch {
        return defaultValue;
    }
};

/**
 * @param {string} objectiveName - The scoreboard objective
 * @param {number} value - The new value of the scoreboard objective
 * @example getScore(player, "cbevl", 0)
 * @remarks Sets the scoreboard objective value for a player
 */
Entity.prototype.setScore = function(objectiveName, value) {
    if(typeof objectiveName !== "string") throw TypeError(`Error: objective is type of ${typeof objectiveName}. Expected "string"`);
    if(typeof value !== "number") throw TypeError(`Error: value is type of ${typeof value}. Expected "number"`);

    const objective = world.scoreboard.getObjective(objectiveName);
    if(!objective) throw Error(`Objective "${objectiveName}" does not exist`);

    objective.setScore(this, value);
};