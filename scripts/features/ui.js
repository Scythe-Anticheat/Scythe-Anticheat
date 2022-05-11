// import * as Minecraft from "mojang-minecrat";
import * as MinecraftUI from "mojang-minecraft-ui";

// this is the function that will be called when the player wants to open the GUI
// all other GUI functions will be called from here
export function mainGui(player) {
    // make sound effect
    player.playSound("mob.chicken.plop");

    const form = new MinecraftUI.ActionFormData()
		.title("Scythe Anticheat UI")
		.body("Select an option below.")
		.button("ban someone")
		.button("configure settings");
    form.show(player).then((response) => {
        if (response.selection == 0) {
            banMenu(player);
        }
    });
}

function banMenu(player) {
    // do stuff
    player.playSound("mob.chicken.plop");
    console.warn(player.name, 1);
}