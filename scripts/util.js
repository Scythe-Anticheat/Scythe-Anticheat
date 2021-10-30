import * as Minecraft from "mojang-minecraft";

const World = Minecraft.World;
const Commands = Minecraft.Commands;

export function hacknotif(player, check, debug, message) {
    // validate that required params are defined
    if (!player) return console.warn("Error: ${player} isnt defined. Did you forget to pass it? (./util.js)");
    if (!check) return console.warn("Error: ${check} isnt defined. Did you forget to pass it? (./util.js)");

    // make sure all scoreboard objectives are created
    try {
        Commands.run(`scoreboard objectives add spammervl dummy`, World.getDimension("overworld"));
    } catch (err) {}
    try {
        Commands.run(`scoreboard objectives add namespoofvl dummy`, World.getDimension("overworld"));
    } catch (err) {}
    try {
        Commands.run(`scoreboard objectives add crashervl dummy`, World.getDimension("overworld"));
    } catch (err) {}
    try {
        Commands.run(`scoreboard objectives add jesusvl dummy`, World.getDimension("overworld"));
    } catch (err) {}

    if (check === "BadPackets2") {
        message.cancel = true;
        Commands.run(`scoreboard players add "${player.nameTag}" spammervl 1`, World.getDimension("overworld"));
        Commands.run(`execute "${player.nameTag}" ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Player) §4BadPackets/2 §7(msgLength=${debug})§4. VL= "},{"score":{"name":"@s","objective":"spammervl"}}]}`, World.getDimension("overworld"));
    } else if (check === "NameSpoofA") {
        player.nameTag = "invalid username";
        Commands.run(`scoreboard players add "${player.nameTag}" namespoofvl 1`, World.getDimension("overworld"));
        Commands.run(`execute "${player.nameTag}" ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Exploit) §4NameSpoof/A §7(nameLength=${debug})§4. VL= "},{"score":{"name":"@s","objective":"namespoofvl"}}]}`, World.getDimension("overworld"));
    } else if (check === "NameSpoofB") {
        player.nameTag = "invalid username";
        Commands.run(`scoreboard players add "${player.nameTag}" namespoofvl 1`, World.getDimension("overworld"));
        Commands.run(`execute "${player.nameTag}" ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Exploit) §4NameSpoof/B. VL= "},{"score":{"name":"@s","objective":"namespoofvl"}}]}`, World.getDimension("overworld"));
    } else if (check === "CrasherA") {
        Commands.run(`scoreboard players add "${player.nameTag}" crasher 1`, World.getDimension("overworld"));
        Commands.run(`execute "${player.nameTag}" ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Exploit) §4Crasher/A. VL= "},{"score":{"name":"@s","objective":"crashervl"}}]}`, World.getDimension("overworld"));
    } else if (check === "FlyB") {
        Commands.run(`scoreboard players add "${player.nameTag}" flyvl 1`, World.getDimension("overworld"));
        Commands.run(`execute "${player.nameTag}" ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Movement) §4Fly/B. VL= "},{"score":{"name":"@s","objective":"flyvl"}}]}`, World.getDimension("overworld"));
        Commands.run(`execute "${player.nameTag}" ~~~ tp @s ~ ~-2 ~`, World.getDimension("overworld"));
    } else if (check === "JesusB") {
        Commands.run(`scoreboard players add "${player.nameTag}" jesusvl 1`, World.getDimension("overworld"));
        Commands.run(`execute "${player.nameTag}" ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Movement) §4Jesus/B §7(yMotion=${debug})§4. VL= "},{"score":{"name":"@s","objective":"jesusvl"}}]}`, World.getDimension("overworld"));
        Commands.run(`execute "${player.nameTag}" ~~~ tp @s ~ ~-1 ~`, World.getDimension("overworld"));
    } else return console.warn(`Error: No check by the name of ${check} exists. Did you forget to put an if statement? (./util.js)`);
}
