import * as Minecraft from "mojang-minecraft";
import * as MinecraftUI from "mojang-minecraft-ui";

let World = Minecraft.world;

// this is the function that will be called when the player wants to open the GUI
// all other GUI functions will be called from here
export function mainGui(player) {
    // make sound effect
    player.playSound("mob.chicken.plop");

    const form = new MinecraftUI.ActionFormData()
		.title("Scythe Anticheat UI")
		.body(`Hello ${player.name},\n\nPlease select an option below.`)
		.button("Ban Menu", "textures/ui/anvil_icon.png")
		.button("Configure Settings", "textures/ui/gear.png")
        .button("Player Options", "textures/ui/FriendsDiversity.png")
        .button("Server Options", "textures/ui/servers.png")
        .button("Exit", "textures/ui/redX1.png");
    form.show(player).then((response) => {
        if (response.selection == 0) banMenu(player);
        if(response.selection == 2) playerSettingsMenu(player);
        if(response.selection == 3) worldSettingsMenu(player);
        if(response.selection == 4) return;
    });
}

function banMenu(player) {
    // do stuff
    player.playSound("mob.chicken.plop");
    console.warn(player.name, 1);
}

function playerSettingsMenu(player) {
    player.playSound("mob.chicken.plop");

    let playerIcons = [
        "textures/ui/icon_alex.png",
        "textures/ui/icon_steve.png",
    ];

    const form = new MinecraftUI.ActionFormData()
        .title("Player Menu")
        .body(`Please select a player to manage.`);
    
    for(let plr of World.getPlayers()) {
        form.button(plr.name, playerIcons[Math.floor(Math.random() * playerIcons.length)]);
    }

    form.button(`Back`, `textures/ui/arrow_left.png`);

    form.show(player).then((response) => {
        if([...World.getPlayers()].length > response.selection) playerSettingsMenuSelected(player, [...World.getPlayers()][response.selection]);
            else mainGui(player);
    });
}

export function playerSettingsMenuSelected(player, playerSelected) {
    player.playSound("mob.chicken.plop");

    const form = new MinecraftUI.ActionFormData()
        .title("Player Menu")
        .body(`Managing ${playerSelected.name}.\n\nPlayer Info:\nCoordinates: ${Math.floor(playerSelected.location.x)}, ${Math.floor(playerSelected.location.y)}, ${Math.floor(playerSelected.location.z)}\nDimension: ${(playerSelected.dimension.id).replace("minecraft:", "")}\nScythe Opped: ${playerSelected.hasTag("op")}\nMuted: ${playerSelected.hasTag("isMuted")}`)
        .button(`Kick Player`, "textures/ui/anvil_icon.png");
    
    if(!playerSelected.hasTag("isMuted")) form.button(`Mute Player`, `textures/ui/mute_on.png`);
        else form.button(`Unmute Player`, `textures/ui/mute_off.png`);

    if(!playerSelected.hasTag("op")) form.button(`Set Player as Scythe-Op`, `textures/ui/op.png`);
        else form.button(`Remove Player as Scythe-Op`, `textures/ui/permissions_member_star.png`);

    form.button(`Teleport To`, "textures/ui/arrow.png");
    form.button(`Teleport Here`, "textures/ui/arrow_down.png");
    form.button(`View Anticheat Logs`, "textures/ui/WarningGlyph.png");
    form.button(`Back`, `textures/ui/arrow_left.png`);

    form.show(player).then((response) => {
        if(response.selection == 0) {
            try {
                player.runCommand(`kick "${playerSelected.nameTag}" You have been kicked from the game by ${player.name}.`);
            } catch {
                playerSelected.triggerEvent("scythe:kick");
            }
        }
        if(response.selection == 1) {
            if(playerSelected.hasTag("isMuted")) {
                playerSelected.removeTag("isMuted");
                playerSettingsMenuSelected(player, playerSelected);
            } else {
                playerSelected.addTag("isMuted");
                playerSettingsMenuSelected(player, playerSelected);
            }
        }
        if(response.selection == 2) {
            if(playerSelected.hasTag("op")) {
                playerSelected.removeTag("op");
                playerSettingsMenuSelected(player, playerSelected);
            } else {
                playerSelected.addTag("op");
                playerSettingsMenuSelected(player, playerSelected);
            }
        }
        if(response.selection == 3) player.runCommand(`tp @s "${playerSelected.nameTag}"`);
        if(response.selection == 4) player.runCommand(`tp "${playerSelected.nameTag}" @s`);
        if(response.selection == 5) playerSelected.runCommand("function tools/stats");
        if(response.selection == 6) playerSettingsMenu(player);
    });
}

function worldSettingsMenu(player) {
    player.playSound("mob.chicken.plop");
}