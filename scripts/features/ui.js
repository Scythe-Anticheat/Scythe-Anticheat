import * as Minecraft from "mojang-minecraft";
import * as MinecraftUI from "mojang-minecraft-ui";

import config from "../data/config.js";

let World = Minecraft.world;

// this is the function that will be called when the player wants to open the GUI
// all other GUI functions will be called from here
export function mainGui(player) {
    player.playSound("mob.chicken.plop");

    const mainGui = new MinecraftUI.ActionFormData()
		.title("Scythe Anticheat UI")
		.body(`Hello ${player.name},\n\nPlease select an option below.`)
		.button("Ban Menu", "textures/ui/anvil_icon.png")
        .button("Configure Settings", "textures/ui/gear.png")
        .button("Player Options", "textures/ui/FriendsDiversity.png")
        .button("Server Options", "textures/ui/servers.png")
        .button("Exit", "textures/ui/redX1.png");
    mainGui.show(player).then((response) => {
        if(response.selection === 0) banMenu(player);
        if(response.selection === 1) settingsMenu(player);
        if(response.selection === 2) playerSettingsMenu(player);
        if(response.selection === 3) worldSettingsMenu(player);
        if(response.selection === 4) return;
    });
}

function banMenu(player) {
    player.playSound("mob.chicken.plop");
    mainGui(player);
}

function settingsMenu(player) {
    player.playSound("mob.chicken.plop");
    mainGui(player);
}

function playerSettingsMenu(player) {
    player.playSound("mob.chicken.plop");

    let playerIcons = [
        "textures/ui/icon_alex.png",
        "textures/ui/icon_steve.png",
    ];

    const playerSettingsMenu = new MinecraftUI.ActionFormData()
        .title("Player Menu")
        .body(`Please select a player to manage.`);
    
    for(let plr of World.getPlayers()) {
        playerSettingsMenu.button(plr.name, playerIcons[Math.floor(Math.random() * playerIcons.length)]);
    }

    playerSettingsMenu.button(`Back`, `textures/ui/arrow_left.png`);

    playerSettingsMenu.show(player).then((response) => {
        if([...World.getPlayers()].length > response.selection) playerSettingsMenuSelected(player, [...World.getPlayers()][response.selection]);
            else mainGui(player);
    });
}

export function playerSettingsMenuSelected(player, playerSelected) {
    player.playSound("mob.chicken.plop");

    const playerSettingsMenuSelected = new MinecraftUI.ActionFormData()
        .title("Player Menu")
        .body(`Managing ${playerSelected.name}.\n\nPlayer Info:\nCoordinates: ${Math.floor(playerSelected.location.x)}, ${Math.floor(playerSelected.location.y)}, ${Math.floor(playerSelected.location.z)}\nDimension: ${(playerSelected.dimension.id).replace("minecraft:", "")}\nScythe Opped: ${playerSelected.hasTag("op")}\nMuted: ${playerSelected.hasTag("isMuted")}\nFrozen: ${playerSelected.hasTag("frozen")}\nVanished: ${playerSelected.hasTag("vanish")}\nFlying: ${playerSelected.hasTag("flying")}`)
        .button(`Clear EnderChest`, "textures/blocks/ender_chest_front.png")
        .button(`Kick Player`, "textures/ui/anvil_icon.png");

    if(!playerSelected.hasTag("flying")) playerSettingsMenuSelected.button(`Enable Fly Mode`, `textures/ui/levitation_effect.png`);
        else playerSettingsMenuSelected.button(`Disable Fly Mode`, `textures/ui/levitation_effect.png`);

    if(!playerSelected.hasTag("frozen")) playerSettingsMenuSelected.button(`Freeze Player`, `textures/ui/icon_winter.png`);
        else playerSettingsMenuSelected.button(`Unfreeze Player`, `textures/ui/icon_winter.png`);
    
    if(!playerSelected.hasTag("isMuted")) playerSettingsMenuSelected.button(`Mute Player`, `textures/ui/mute_on.png`);
        else playerSettingsMenuSelected.button(`Unmute Player`, `textures/ui/mute_off.png`);

    if(!playerSelected.hasTag("op")) playerSettingsMenuSelected.button(`Set Player as Scythe-Op`, `textures/ui/op.png`);
        else playerSettingsMenuSelected.button(`Remove Player as Scythe-Op`, `textures/ui/permissions_member_star.png`);

    if(!playerSelected.hasTag("vanish")) playerSettingsMenuSelected.button(`Vanish Player`, `textures/ui/invisibility_effect.png`);
        else playerSettingsMenuSelected.button(`Un-Vanish Player`, `textures/ui/invisibility_effect.png`);

    playerSettingsMenuSelected
        .button(`Teleport`, "textures/ui/arrow.png")
        .button(`Switch Gamemode`, "textures/ui/op.png")
        .button(`View Anticheat Logs`, "textures/ui/WarningGlyph.png")
        .button(`Back`, `textures/ui/arrow_left.png`);

    playerSettingsMenuSelected.show(player).then((response) => {
        if(response.selection === 0) {
            if(!config.customcommands.ecwipe) return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"Enderchest wiping is disabled in config.js."}]}`);
            let isOp;
            if (playerSelected.hasTag("op")) {
                isOp = true;
                playerSelected.removeTag("op");
            }
            playerSelected.runCommand("function tools/ecwipe");
            player.runCommand(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${playerSelected.name} has cleared ${player.name}'s enderchest."}]}`);
            if(isOp) playerSelected.addTag("op");
        }
        if(response.selection === 1) {
            if(!config.customcommands.kick) return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"Kicking players is disabled in config.js."}]}`);
            try {
                player.runCommand(`kick "${playerSelected.nameTag}" You have been kicked from the game by ${player.name}.`);
            } catch {
                playerSelected.triggerEvent("scythe:kick");
            }
            player.runCommand(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${playerSelected.name} has been kicked by ${player.name}."}]}`);
        }
        if(response.selection === 2) {
            if(!config.customcommands.fly) return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"Toggling Fly is disabled in config.js."}]}`);
            if(playerSelected.hasTag("flying")) {
                playerSelected.runCommand("function tools/fly");
                player.runCommand(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.name} has disabled fly mode for ${playerSelected.name}."}]}`);
                playerSettingsMenuSelected(player, playerSelected);
            } else {
                playerSelected.runCommand("function tools/fly");
                player.runCommand(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.name} has enabled fly mode for ${playerSelected.name}."}]}`);
                playerSettingsMenuSelected(player, playerSelected);
            }
        }
        if(response.selection === 3) {
            if(!config.customcommands.freeze) return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"Toggling Frozen State is disabled in config.js."}]}`);
            if(playerSelected.hasTag("frozen")) {
                playerSelected.runCommand("function tools/freeze");
                player.runCommand(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.name} has unfrozen for ${playerSelected.name}."}]}`);
                playerSettingsMenuSelected(player, playerSelected);
            } else {
                playerSelected.runCommand("function tools/freeze");
                player.runCommand(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.name} has frozen for ${playerSelected.name}."}]}`);
                playerSettingsMenuSelected(player, playerSelected);
            }
        }
        if(response.selection === 4) {
            if(!config.customcommands.mute) return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"Muting players is disabled in config.js."}]}`);
            if(playerSelected.hasTag("isMuted")) {
                playerSelected.removeTag("isMuted");
                try {
                    playerSelected.runCommand("ability @s mute false");
                } catch {}
                player.runCommand(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${playerSelected.name} has been unmuted by ${player.name}."}]}`);
                playerSettingsMenuSelected(player, playerSelected);
            } else {
                playerSelected.addTag("isMuted");
                try {
                    playerSelected.runCommand("ability @s mute true");
                } catch {}
                player.runCommand(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${playerSelected.name} has been muted by ${player.name}."}]}`);
                playerSettingsMenuSelected(player, playerSelected);
            }
        }
        if(response.selection === 5) {
            if(!config.customcommands.op) return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"Scythe-Opping players is disabled in config.js."}]}`);
            if(playerSelected.hasTag("op")) {
                playerSelected.removeTag("op");
                player.runCommand(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${playerSelected.name} is no longer Scythe-Opped by ${player.name}."}]}`);
                playerSettingsMenuSelected(player, playerSelected);
            } else {
                playerSelected.addTag("op");
                player.runCommand(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${playerSelected.name} is now Scythe-Opped by ${player.name}."}]}`);
                playerSettingsMenuSelected(player, playerSelected);
            }
        }
        if(response.selection === 6) {
            if(!config.customcommands.vanish) return player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"Toggling Vanish is disabled in config.js."}]}`);
            if(playerSelected.hasTag("vanished")) {
                playerSelected.runCommand("function tools/vanish");
                player.runCommand(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.name} has put ${playerSelected.name} into vanish."}]}`);
                playerSettingsMenuSelected(player, playerSelected);
            } else {
                playerSelected.runCommand("function tools/vanish");
                player.runCommand(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.name} has unvanished ${playerSelected.name}."}]}`);
                playerSettingsMenuSelected(player, playerSelected);
            }
        }
        if(response.selection === 7) playerSettingsMenuSelectedTeleport(player, playerSelected);
        if(response.selection === 8) playerSettingsMenuSelectedGamemode(player, playerSelected);
        if(response.selection === 9) playerSelected.runCommand("function tools/stats");
        if(response.selection === 10 || !response.selection) playerSettingsMenu(player);
    });
}

function playerSettingsMenuSelectedTeleport(player, playerSelected) {
    player.playSound("mob.chicken.plop");

    const playerSettingsMenuSelectedTeleport = new MinecraftUI.ActionFormData()
        .title("Teleport Menu")
        .body(`Managing ${playerSelected.name}.`)
        .button(`Teleport To`, "textures/ui/arrow.png")
        .button(`Teleport Here`, "textures/ui/arrow_down.png")
        .button(`Back`, `textures/ui/arrow_left.png`);

    playerSettingsMenuSelectedTeleport.show(player).then((response) => {
        if(response.selection === 0) player.runCommand(`tp @s "${playerSelected.nameTag}"`);
        if(response.selection === 1) player.runCommand(`tp "${playerSelected.nameTag}" @s`);
        if(response.selection === 2 || !response.selection) playerSettingsMenuSelected(player, playerSelected);
    });
}

function playerSettingsMenuSelectedGamemode(player, playerSelected) {
    player.playSound("mob.chicken.plop");

    const playerSettingsMenuSelectedGamemode = new MinecraftUI.ActionFormData()
        .title("Gamemode Menu")
        .body(`Managing ${playerSelected.name}.`)
        .button(`Gamemode Creative`, "textures/ui/op.png")
        .button(`Gamemode Survival`, "textures/ui/permissions_member_star.png")
        .button(`Gamemode Adventure`, "textures/ui/permissions_visitor_hand.png")
        .button(`Back`, `textures/ui/arrow_left.png`);

        playerSettingsMenuSelectedGamemode.show(player).then((response) => {
            if(response.selection === 0) player.runCommand(`gamemode 1 "${playerSelected.nameTag}"`);
            if(response.selection === 1) player.runCommand(`gamemode 0 "${playerSelected.nameTag}"`);
            if(response.selection === 2) player.runCommand(`gamemode 2 "${playerSelected.nameTag}"`);
            if(response.selection === 3 || !response.selection) playerSettingsMenuSelected(player, playerSelected);
    });
}

function worldSettingsMenu(player) {
    player.playSound("mob.chicken.plop");
    mainGui(player);
}