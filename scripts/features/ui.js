import * as Minecraft from "mojang-minecraft";
import * as MinecraftUI from "mojang-minecraft-ui";

let World = Minecraft.world;

// this is the function that will be called when the player wants to open the GUI
// all other GUI functions will be called from here
export function mainGui(player) {
    if(!player.hasTag("op")) return;

    // make sound effect
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
    if(!player.hasTag("op")) return;

    player.playSound("mob.chicken.plop");

    const playerSettingsMenuSelected = new MinecraftUI.ActionFormData()
        .title("Player Menu")
        .body(`Managing ${playerSelected.name}.\n\nPlayer Info:\nCoordinates: ${Math.floor(playerSelected.location.x)}, ${Math.floor(playerSelected.location.y)}, ${Math.floor(playerSelected.location.z)}\nDimension: ${(playerSelected.dimension.id).replace("minecraft:", "")}\nScythe Opped: ${playerSelected.hasTag("op")}\nMuted: ${playerSelected.hasTag("isMuted")}\nFrozen: ${playerSelected.hasTag("frozen")}\nVanished: ${playerSelected.hasTag("vanish")}`)
        .button(`Clear EnderChest`, "textures/blocks/ender_chest_front.png")
        .button(`Kick Player`, "textures/ui/anvil_icon.png");
    
    if(!playerSelected.hasTag("isMuted")) playerSettingsMenuSelected.button(`Mute Player`, `textures/ui/mute_on.png`);
        else playerSettingsMenuSelected.button(`Unmute Player`, `textures/ui/mute_off.png`);

    if(!playerSelected.hasTag("op")) playerSettingsMenuSelected.button(`Set Player as Scythe-Op`, `textures/ui/op.png`);
        else playerSettingsMenuSelected.button(`Remove Player as Scythe-Op`, `textures/ui/permissions_member_star.png`);

    playerSettingsMenuSelected
        .button(`Teleport`, "textures/ui/arrow.png")
        .button(`Switch Gamemode`, "textures/ui/op.png")
        .button(`View Anticheat Logs`, "textures/ui/WarningGlyph.png")
        .button(`Back`, `textures/ui/arrow_left.png`);

    playerSettingsMenuSelected.show(player).then((response) => {
        if(response.selection === 0) {
            let isOp;
            if (playerSelected.hasTag("op")) {
                isOp = true;
                playerSelected.removeTag("op");
            }
            playerSelected.runCommand("function tools/ecwipe");
            if(isOp) playerSelected.addTag("op");
        }
        if(response.selection === 1) {
            try {
                player.runCommand(`kick "${playerSelected.nameTag}" You have been kicked from the game by ${player.name}.`);
            } catch {
                playerSelected.triggerEvent("scythe:kick");
            }
        }
        if(response.selection === 2) {
            if(playerSelected.hasTag("isMuted")) {
                playerSelected.removeTag("isMuted");
                playerSettingsMenuSelected(player, playerSelected);
            } else {
                playerSelected.addTag("isMuted");
                playerSettingsMenuSelected(player, playerSelected);
            }
        }
        if(response.selection === 3) {
            if(playerSelected.hasTag("op")) {
                playerSelected.removeTag("op");
                playerSettingsMenuSelected(player, playerSelected);
            } else {
                playerSelected.addTag("op");
                playerSettingsMenuSelected(player, playerSelected);
            }
        }
        if(response.selection === 4) playerSettingsMenuSelectedTeleport(player, playerSelected);
        if(response.selection === 5) playerSettingsMenuSelectedGamemode(player, playerSelected);
        if(response.selection === 6) playerSelected.runCommand("function tools/stats");
        if(response.selection === 7 || !response.selection) playerSettingsMenu(player);
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