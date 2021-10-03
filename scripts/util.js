import * as Gametest from "mojang-gametest";
import * as Minecraft from "mojang-minecraft";

const World = Minecraft.World;
const Commands = Minecraft.Commands

export function hacknotif(player, check, message) {

    console.warn(check, player.name)

    if (check == "BadPackets2") {
        message.cancel = true;
        Commands.run(`execute "${player.name}" ~~~ say exposed1`, World.getDimension("overworld"));
    };
    if (check == "NameSpoofA") {
        Commands.run(`execute "${player.name}" ~~~ say exposed2`, World.getDimension("overworld"));
    };
    if (check == "NameSpoofB") {
        Commands.run(`execute "${player.name}" ~~~ say exposed3`, World.getDimension("overworld"));
    };
    if (check == "CrasherA") {
        Commands.run(`execute "${player.name}" ~~~ say exposed4`, World.getDimension("overworld"));
    };

};