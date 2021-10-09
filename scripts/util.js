import * as Gametest from "mojang-gametest";
import * as Minecraft from "mojang-minecraft";

const World = Minecraft.World;
const Commands = Minecraft.Commands

var i = 0

export function hacknotif(player, check, message) {
    if (check == "BadPackets2") {
        message.cancel = true;
        Commands.run(`scoreboard players add "${player.name}" spammervl 1`, World.getDimension("overworld"));
        Commands.run(`execute "${player.name}" ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Player) BadPackets/2. VL= "},{"score":{"name":"@s","objective":"spammervl"}}]}`, World.getDimension("overworld"));
    };
    if (check == "NameSpoofA") {
        Commands.run(`scoreboard players add "${player.name}" namespoofvl 1`, World.getDimension("overworld"));
        Commands.run(`execute "${player.name}" ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Exploit) §4NameSpoof/A. VL= "},{"score":{"name":"@s","objective":"namespoofvl"}}]}`, World.getDimension("overworld"));
    };
    if (check == "NameSpoofB") {
        Commands.run(`scoreboard players add "${player.name}" namespoofvl 1`, World.getDimension("overworld"));
        Commands.run(`execute "${player.name}" ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Exploit) §4NameSpoof/B. VL= "},{"score":{"name":"@s","objective":"namespoofvl"}}]}`, World.getDimension("overworld"));
    };
    if (check == "CrasherA") {
        Commands.run(`scoreboard players add "${player.name}" crasher 1`, World.getDimension("overworld"));
        Commands.run(`execute "${player.name}" ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Exploit) §4Crasher/A. VL= "},{"score":{"name":"@s","objective":"crashervl"}}]}`, World.getDimension("overworld"));
    };
};

export function bedrock(player) {
    i++;

    // Overworld
    if (i === 1) Commands.run(`execute @a[name="${player.name}",rm=0,scores={bedrock=1..}] ~~~ fill ~-10 0 ~-10 ~+10 0 ~+10 bedrock`, World.getDimension("overworld"));
    if (i === 2) Commands.run(`execute @a[name="${player.name}",rm=0,scores={bedrock=1..}] ~~~ fill ~-5 5 ~-5 ~+5 255 ~+5 air 0 replace bedrock`, World.getDimension("overworld"));
   
    // nether
    if (i === 3) Commands.run(`execute @a[name="${player.name}",rm=0,scores={bedrock=1..}] ~~~ fill ~-10 0 ~-10 ~+10 0 ~+10 bedrock`, World.getDimension("nether"));
    if (i === 4) Commands.run(`execute @a[name="${player.name}",rm=0,scores={bedrock=1..}] ~~~ fill ~-10 127 ~-10 ~+10 127 ~+10 bedrock`, World.getDimension("nether"));
    if (i === 5) Commands.run(`execute @a[name="${player.name}",rm=0,scores={bedrock=1..}] ~~~ fill ~-5 5 ~-5 ~+5 120 ~+5 air 0 replace bedrock`, World.getDimension("nether"));

    if (i >= 6) i = 0
};
