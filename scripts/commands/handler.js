// @ts-check
import { world, system } from "@minecraft/server";
import config from "../data/config.js";

const prefix = config.customcommands.prefix ?? "!";
export const commands = {};

/**
 * @name registerCommand
 * @param {object} data - Command data
 * @param {string} data.name - Command name
 * @param {string} data.description - Command description
 * @param {string} [data.usage] - Command usage
 * @param {number} [data.minArgCount] - How many arguments the command expects to have
 * @param {string} data.category - The category that the command belongs to
 * @param {function} data.execute - The function that should be ran
 */
export function registerCommand(data) {
    const { name, execute } = data;

    if(typeof name !== "string") throw TypeError(`data.name is type of ${typeof name}. Expected "string"`);
    if(typeof execute !== "function") throw TypeError(`data.execute is type of ${typeof execute}. Expected "function"`);

    if(commands[name]) throw Error(`Command "${name}" has already been registered`);

    if(!config.customcommands[name]) throw Error(`No valid config found for ${name}`);

    commands[name] = data;
}

/**
 * @name commandHandler
 * @param {import("@minecraft/server").ChatSendBeforeEvent} msg - Message data
 */
export function commandHandler(msg) {
    // validate that required params are defined
    if(typeof msg !== "object") throw TypeError(`msg is type of ${typeof msg}. Expected "object"`);

    const { message, sender: player } = msg;

    // checks if the message starts with our prefix, if not exit
    if(!message.startsWith(prefix)) return;

    // Converts '!ban "test player" 14d hacker' to ['!ban','test player','14d','hacker']
    // Remove the first @ symbol as its used for auto-filling usernames and isn't needed
    const args = message.slice(prefix.length).replace("@", "").match(/(".*?"|\S+)/g)?.map((/** @type {string} */ match) => match.replace(/"/g, ''));
    if(!args) return;

    const command = args.shift()?.toLowerCase().trim();

    if(config.debug) console.warn(`${player.name} used the command: ${prefix}${command} ${args.join(" ")}`);

    try {
        let commandData;
        let commandName;

        if(typeof config.customcommands[command] === "object") {
            commandData = config.customcommands[command];
            commandName = command;
        } else {
            // Check if the command is an alias
            for(const cmd of Object.keys(config.customcommands)) {
                const data = config.customcommands[cmd];
                if(!data.aliases?.includes(command)) continue;

                commandData = data;
                commandName = cmd;
                break;
            }

            if(!commandData) {
                // Command does not exist
                if(config.customcommands.sendInvalidCommandMsg) {
                    player.sendMessage(`§r§6[§aScythe§6]§c The command "${command}" was not found. Please make sure it exists.`);
                    msg.cancel = true;
                }

                return;
            }
        }

        msg.cancel = true;

        if(!commands[commandName]) throw Error(`Command "${commandName}" was found in config.js but the command was not registered.`);

        if(commandData.requiredTags.length >= 1 && commandData.requiredTags.some((/** @type {any} */ tag) => !player.hasTag(tag))) {
            player.sendMessage("§r§6[§aScythe§6]§r You need to be Scythe-Opped to use this command. To gain scythe-op please run: /function op");
            return;
        }

        if(!commandData.enabled) {
            player.sendMessage("§r§6[§aScythe§6]§r This command has been disabled. Please contact your server administrator for assistance.");
            return;
        }

        if(args.length < commands[commandName].minArgCount) {
            player.sendMessage(`§r§6[§aScythe§6]§r Invalid command usage.\n${prefix}${commandName} ${commands[commandName].usage}`);
            return;
        }

        const newMsg = {
            message: message,
            player: world.getPlayers({
                name: player.name
            })[0]
        };

        system.run(async () => {
            try {
               await commands[commandName].execute(newMsg, args, commandName);
            } catch (error) {
                reportError(error, newMsg.player, newMsg.message);
            }
        });
    } catch (error) {
        reportError(error, player, message);
    }
}

/**
 * @param {Error} error
 * @param {import("@minecraft/server").Player} player
 * @param {string} message
 */
function reportError(error, player, message) {
    console.error(`${error} ${error.stack}`);
    player.sendMessage(`§r§6[§aScythe§6]§r There was an error while trying to run this command. Please forward this message to https://discord.gg/9m9TbgJ973.\n-------------------------\nCommand: ${message}\n${error}\n${error.stack || "\n"}-------------------------`);
}