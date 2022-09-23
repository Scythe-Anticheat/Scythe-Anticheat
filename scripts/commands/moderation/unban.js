import data from "../../data/data.js";

/**
 * @name unban
 * @param {object} message - Message object
 * @param {array} args - Additional arguments provided.
 */
export function unban(message, args) {
    // validate that required params are defined
    if(typeof message !== "object") return console.warn(`${new Date()} | ` + `Error: message is type of ${typeof message}. Expected "object' (./commands/moderation/unban.js:12)`);
    if(typeof args !== "object") return console.warn(`${new Date()} | ` + `Error: args is type of ${typeof args}. Expected "object' (./commands/moderation/unban.js:13)`);

    let player = message.sender;

    if(args.length === 0) return player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"You need to provide who to ban!"}]}`);

    let reason = args.slice(1).join(" ").replace(/"|\\/g, "") || "No reason specified";
    
    let member = args[0].replace(/"|\\/g, "");

    if(data.unbanQueue.includes(member)) return player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"Error: ${member} is already queued for an unban."}]}`);

    data.unbanQueue.push(member.toLowerCase());
    
    player.runCommand(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.nameTag} has added ${member} into the unban queue. Reason: ${reason}"}]}`);
}
