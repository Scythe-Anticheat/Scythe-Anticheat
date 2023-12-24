// @ts-check

import { world, system } from "@minecraft/server";
import config from "../data/config.js";

const prefix = config.customcommands.prefix ?? "!";
const commands = {};

/**
 * @name registerCommand
 * @param {object} data - Command data
 * @param {string} data.name - Command name
 * @param {string} [data.usage] - Command usage
 * @param {number} [data.minArgCount] - How many arguments the command expects to have
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
 * @param {object} msg - Message data
 */
export function commandHandler(msg) {
    // validate that required params are defined
    if(typeof msg !== "object") throw TypeError(`msg is type of ${typeof msg}. Expected "object"`);

    const { message, sender: player } = msg;

    if(config.debug) console.warn(`${new Date().toISOString()} | did run command handler`);

    // checks if the message starts with our prefix, if not exit
    if(!message.startsWith(prefix)) return;

    // Converts '!ban "test player" 14d hacker' to ['!ban','test player','14d','hacker']
    const args = message.slice(prefix.length).match(/(".*?"|\S+)/g).map(match => match.replace(/"/g, ''));

    const command = args.shift().toLowerCase().trim();

    if(config.debug) console.warn(`${new Date().toISOString()} | ${player.name} used the command: ${prefix}${command} ${args.join(" ")}`);

    try {
        let commandData;
        let commandName;

        if(typeof config.customcommands[command] === "object") {
            commandData = config.customcommands[command];
            commandName = command;
        } else {
            // check if the command is an alias
            for(const cmd of Object.keys(config.customcommands)) {
                const data = config.customcommands[cmd];
                if(!data.aliases?.includes(command)) continue;

                commandData = data;
                commandName = cmd;
                break;
            }

            // command does not exist
            if(!commandData) {
                if(config.customcommands.sendInvalidCommandMsg) {
                    player.sendMessage(`§r§6[§aScythe§6]§c The command "${command}" was not found. Please make sure it exists.`);
                    msg.cancel = true;
                }
                return;
            }
        }

        msg.cancel = true;

        if(!commands[commandName]) throw Error(`Command "${commandName}" was found in config.js but the command was not registered.`);

        if(commandData.requiredTags.length >= 1 && commandData.requiredTags.some(tag => !player.hasTag(tag))) {
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

        runCommand(msg, commandName, args);
    } catch (error) {
        console.error(`${new Date().toISOString()} | ${error} ${error.stack}`);
        player.sendMessage(`§r§6[§aScythe§6]§r There was an error while trying to run this command. Please forward this message to https://discord.gg/9m9TbgJ973.\n-------------------------\nCommand: ${message}\n${error}\n${error.stack || "\n"}-------------------------`);
    }
}

/**
 * @name runCommand
 * @param {object} msg - Msg data
 * @param {string} commandName - Command name
 * @param {array} args - Command arguments
 */
function runCommand(msg, commandName, args) {
    const message = {
        message: msg.message,
        sender: world.getPlayers({
            name: msg.sender.name
        })[0]
    };

    system.run(async () => {
        try {
           await commands[commandName].execute(msg, args, commandName);
        } catch (error) {
            console.error(`${new Date().toISOString()} | ${error} ${error.stack}`);
            message.sender.sendMessage(`§r§6[§aScythe§6]§r There was an error while trying to run this command. Please forward this message to https://discord.gg/9m9TbgJ973.\n-------------------------\nCommand: ${message.message}\n${error}\n${error.stack || "\n"}-------------------------`);
        }
    });
}