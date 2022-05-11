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
    
    for(player of World.getPlayers()) {
        form.button(`${player.name}`, playerIcons[~~(Math.random() * playerIcons.length)]);
    }

    form.show(player).then(() => {

    });
}

function worldSettingsMenu(player) {
    player.playSound("mob.chicken.plop");
}