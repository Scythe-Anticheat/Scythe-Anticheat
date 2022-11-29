import * as Minecraft from "@minecraft/server";
import * as MinecraftUI from "@minecraft/server-ui";

import config from "../data/config.js";
import data2 from "../data/data.js";
import { parseTime } from "../util.js";
import { addOp, removeOp } from "../commands/moderation/op.js";

const World = Minecraft.world;

const playerIcons = [
    "textures/ui/icon_alex.png",
    "textures/ui/icon_steve.png",
];

// this is the function that will be called when the player wants to open the GUI
// all other GUI functions will be called from here
export function mainGui(player) {
    if(!player.hasTag("op")) return;
    player.playSound("mob.chicken.plop");

    const mainGui = new MinecraftUI.ActionFormData()
		.title("Scythe Anticheat UI")
		.body(`Hello ${player.name},\n\nPlease select an option below.`)
		.button("Ban Menu", "textures/ui/anvil_icon.png")
        .button("Configure Settings", "textures/ui/gear.png")
        .button(`Manage Players\n§8§o${[...World.getPlayers()].length} player(s) online`, "textures/ui/FriendsDiversity.png")
        .button("Server Options", "textures/ui/servers.png")
        .button("Exit", "textures/ui/redX1.png");
    if(config.debug === true) mainGui.button("⭐ Debug", "textures/ui/debug_glyph_color.png");
    mainGui.show(player).then((response) => {
        if(response.selection === 0) banMenu(player);
        if(response.selection === 1) settingsMenu(player);
        if(response.selection === 2) playerSettingsMenu(player);
        if(response.selection === 3) worldSettingsMenu(player);
        if(response.selection === 4) return;
        if(config.debug === true && response.selection === 5) debugSettingsMenu(player);
    });
}

// ====================== //
//        Ban Menu        //
// ====================== //
function banMenu(player) {
    if(!player.hasTag("op")) return;
    player.playSound("mob.chicken.plop");

    const banMenu = new MinecraftUI.ActionFormData()
        .title("Ban Menu")
        .body("Please select an option.")
        .button("Kick Player", "textures/ui/anvil_icon.png")
        .button("Ban Player", "textures/ui/anvil_icon.png")
        .button("Unban Player", "textures/ui/anvil_icon.png")
        .button("Back", "textures/ui/arrow_left.png");
    banMenu.show(player).then((response) => {
        if(response.selection === 3 || response.canceled) return mainGui(player);

        if(response.selection === 2) return unbanPlayerMenu(player);
        
        banMenuSelect(player, response.selection);
    });
}

function banMenuSelect(player, selection) {
    if(!player.hasTag("op")) return;
    player.playSound("mob.chicken.plop");

    const banMenuSelect = new MinecraftUI.ActionFormData()
        .title("Ban Menu")
        .body("Please select a player to manage.");
    
    for (const plr of World.getPlayers()) {
        let playerName = `${plr.name}`;
        if(plr === player) playerName += " §1[YOU]";
        if(plr.hasTag("op")) playerName += " §1[OP]";
        banMenuSelect.button(playerName, playerIcons[Math.floor(Math.random() * playerIcons.length)]);
    }

    banMenuSelect.button("Back", "textures/ui/arrow_left.png");

    banMenuSelect.show(player).then((response) => {
        if(response.canceled) return banMenu(player);

        if([...World.getPlayers()].length > response.selection) {
            if(selection === 0) kickPlayerMenu(player, [...World.getPlayers()][response.selection]);
            if(selection === 1) banPlayerMenu(player, [...World.getPlayers()][response.selection]);
        } else banMenu(player);
    });
}

function kickPlayerMenu(player, playerSelected, lastMenu = 0) {
    if(!player.hasTag("op")) return;
    if(config.customcommands.kick.enabled === false) return player.tell("§r§6[§aScythe§6]§r Kicking players is disabled in config.js.");
    player.playSound("mob.chicken.plop");

    const kickPlayerMenu = new MinecraftUI.ModalFormData()
        .title("Kick Player Menu - " + playerSelected.name)
        .textField("Kick Reason:", "§o§7No Reason Provided")
        .toggle("Silent", false);
    kickPlayerMenu.show(player).then((response) => {
        if(response.canceled) {
            if(lastMenu === 0) banMenuSelect(player, lastMenu);
            if(lastMenu === 1) playerSettingsMenuSelected(player, playerSelected);
            return;
        }

        const data = String(response.formValues).split(",");

        const isSilent = data.pop();
        const reason = data.join(",").replace(/"|\\/g, "") || "No Reason Provided";

        if(isSilent === false) player.runCommandAsync(`kick "${playerSelected.name}" ${reason}`);
        playerSelected.triggerEvent("scythe:kick");

        player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.nameTag} has kicked ${playerSelected.name} (Silent:${isSilent}). Reason: ${reason}"}]}`);
    });
}

function banPlayerMenu(player, playerSelected, lastMenu = 0) {
    if(!player.hasTag("op")) return;
    if(!config.customcommands.kick.enabled) return player.tell("§r§6[§aScythe§6]§r Banning players is disabled in config.js.");

    player.playSound("mob.chicken.plop");

    const banPlayerMenu = new MinecraftUI.ModalFormData()
        .title("Ban Player Menu - " + playerSelected.name)
        .textField("Ban Reason:", "§o§7No Reason Provided")
        .slider("Ban Length (in days)", 0, 365, 1)
        .toggle("Permenant Ban", true);
    banPlayerMenu.show(player).then((response) => {
        if(response.canceled) {
            if(lastMenu === 0) banMenuSelect(player, lastMenu);
            if(lastMenu === 1) playerSettingsMenuSelected(player, playerSelected);
            return;
        }

        const data = String(response.formValues).split(",");

        const shouldPermBan = data.pop();

        let banLength = data.pop();
        if(banLength != 0) banLength = parseTime(`${banLength}d`);

        const reason = data.join(",").replace(/"|\\/g, "") || "No Reason Provided";

        // remove old ban tags
        playerSelected.getTags().forEach(t => {
            t = t.replace(/"/g, "");
            if(t.startsWith("reason:") || t.startsWith("by:") || t.startsWith("time:")) playerSelected.removeTag(t);
        });
    
        playerSelected.addTag(`reason:${reason}`);
        playerSelected.addTag(`by:${player.nameTag}`);
        if(banLength && shouldPermBan === "false") playerSelected.addTag(`time:${Date.now() + banLength}`);
        playerSelected.addTag("isBanned");
    
        player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.nameTag} has banned ${playerSelected.nameTag}. Reason: ${reason}"}]}`);
    });
}

function unbanPlayerMenu(player) {
    if(!player.hasTag("op")) return;
    if(!config.customcommands.unban.enabled) return player.tell("§r§6[§aScythe§6]§r Kicking players is disabled in config.js.");
    player.playSound("mob.chicken.plop");

    const unbanPlayerMenu = new MinecraftUI.ModalFormData()
        .title("Unban Player Menu")
        .textField("Player to unban:", "§o§7Enter player name")
        .textField("Unban Reason:", "§o§7No Reason Provided");
        unbanPlayerMenu.show(player).then((response) => {
        if(response.canceled) return banMenu(player, 2);

        const data = String(response.formValues).split(",");

        const playerToUnban = data.shift().split(" ")[0];

        const reason = data.join(",").replace(/"|\\/g, "") || "No Reason Provided";

        data2.unbanQueue.push(playerToUnban.toLowerCase());

        player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.nameTag} has added ${playerToUnban} into the unban queue. Reason: ${reason}"}]}`);
    });
}

// ====================== //
//     Settings Menu      //
// ====================== //
function settingsMenu(player) {
    if(!player.hasTag("op")) return;
    // player.playSound("mob.chicken.plop");
    mainGui(player);
}

// ====================== //
//       Player Menu      //
// ====================== //
function playerSettingsMenu(player) {
    if(!player.hasTag("op")) return;
    player.playSound("mob.chicken.plop");

    const playerSettingsMenu = new MinecraftUI.ActionFormData()
        .title("Player Menu")
        .body("Please select a player to manage.");
    
    for (const plr of World.getPlayers()) {
        let playerName = `${plr.name}`;
        if(plr === player) playerName += " §1[YOU]";
        if(plr.hasTag("op")) playerName += " §1[OP]";
        playerSettingsMenu.button(playerName, playerIcons[Math.floor(Math.random() * playerIcons.length)]);
    }

    playerSettingsMenu.button("Back", "textures/ui/arrow_left.png");

    playerSettingsMenu.show(player).then((response) => {
        if([...World.getPlayers()].length > response.selection) playerSettingsMenuSelected(player, [...World.getPlayers()][response.selection]);
            else mainGui(player);
    });
}

export function playerSettingsMenuSelected(player, playerSelected) {
    if(!player.hasTag("op")) return;
    player.playSound("mob.chicken.plop");

    const playerSettingsMenuSelected = new MinecraftUI.ActionFormData()
        .title("Player Menu - " + player.name)
        .body(`Managing ${playerSelected.name}.\n\nPlayer Info:\nCoordinates: ${Math.floor(playerSelected.location.x)}, ${Math.floor(playerSelected.location.y)}, ${Math.floor(playerSelected.location.z)}\nDimension: ${(playerSelected.dimension.id).replace("minecraft:", "")}\nScythe Opped: ${playerSelected.hasTag("op")}\nMuted: ${playerSelected.hasTag("isMuted")}\nFrozen: ${playerSelected.hasTag("freeze")}\nVanished: ${playerSelected.hasTag("vanish")}\nFlying: ${playerSelected.hasTag("flying")}`)
        .button("Clear EnderChest", "textures/blocks/ender_chest_front.png")
        .button("Kick Player", "textures/ui/anvil_icon.png")
        .button("Ban Player", "textures/ui/anvil_icon.png");

    if(!playerSelected.hasTag("flying")) playerSettingsMenuSelected.button("Enable Fly Mode", "textures/ui/levitation_effect.png");
        else playerSettingsMenuSelected.button("Disable Fly Mode", "textures/ui/levitation_effect.png");

    if(!playerSelected.hasTag("freeze")) playerSettingsMenuSelected.button("Freeze Player", "textures/ui/icon_winter.png");
        else playerSettingsMenuSelected.button("Unfreeze Player", "textures/ui/icon_winter.png");
    
    if(!playerSelected.hasTag("isMuted")) playerSettingsMenuSelected.button("Mute Player", "textures/ui/mute_on.png");
        else playerSettingsMenuSelected.button("Unmute Player", "textures/ui/mute_off.png");

    if(!playerSelected.hasTag("op")) playerSettingsMenuSelected.button("Set Player as Scythe-Op", "textures/ui/op.png");
        else playerSettingsMenuSelected.button("Remove Player as Scythe-Op", "textures/ui/permissions_member_star.png");

    if(!playerSelected.hasTag("vanish")) playerSettingsMenuSelected.button("Vanish Player", "textures/ui/invisibility_effect.png");
        else playerSettingsMenuSelected.button("Unvanish Player", "textures/ui/invisibility_effect.png");

    playerSettingsMenuSelected
        .button("Teleport", "textures/ui/arrow.png")
        .button("Switch Gamemode", "textures/ui/op.png")
        .button("View Anticheat Logs", "textures/ui/WarningGlyph.png")
        .button("Back", "textures/ui/arrow_left.png");

    playerSettingsMenuSelected.show(player).then((response) => {
        if(response.selection === 0) {
            if(!config.customcommands.ecwipe.enabled) return player.tell("§r§6[§aScythe§6]§r Enderchest wiping is disabled in config.js.");
            let isOp;
            if(playerSelected.hasTag("op")) {
                isOp = true;
                removeOp(playerSelected);
            }
            playerSelected.runCommandAsync("function tools/ecwipe")
                .then(() => isOp && addOp(playerSelected));

            player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${playerSelected.name} has cleared ${player.name}'s enderchest."}]}`);
        } else if(response.selection === 1) {
           kickPlayerMenu(player, playerSelected, 1);
        } else if(response.selection === 2) {
            banPlayerMenu(player, playerSelected, 1);
        } else if(response.selection === 3) {
            if(!config.customcommands.fly.enabled) return player.tell("§r§6[§aScythe§6]§r Toggling Fly is disabled in config.js.");
            if(playerSelected.hasTag("flying")) {
                playerSelected.runCommandAsync("function tools/fly");
                player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.name} has disabled fly mode for ${playerSelected.name}."}]}`);
                playerSettingsMenuSelected(player, playerSelected);
            } else {
                playerSelected.runCommandAsync("function tools/fly");
                player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.name} has enabled fly mode for ${playerSelected.name}."}]}`);
                playerSettingsMenuSelected(player, playerSelected);
            }
        } else if(response.selection === 4) {
            if(!config.customcommands.freeze.enabled) return player.tell("§r§6[§aScythe§6]§r Toggling Frozen State is disabled in config.js.");
            if(playerSelected.hasTag("freeze")) {
                playerSelected.runCommandAsync("function tools/freeze");
                player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.name} has unfrozen for ${playerSelected.name}."}]}`);
                playerSettingsMenuSelected(player, playerSelected);
            } else {
                playerSelected.runCommandAsync("function tools/freeze");
                player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.name} has frozen for ${playerSelected.name}."}]}`);
                playerSettingsMenuSelected(player, playerSelected);
            }
        } else if(response.selection === 5) {
            if(!config.customcommands.mute.enabled) return player.tell("§r§6[§aScythe§6]§r Muting players is disabled in config.js.");
            if(playerSelected.hasTag("isMuted")) {
                playerSelected.removeTag("isMuted");
                playerSelected.runCommandAsync("ability @s mute false");
                player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${playerSelected.name} has been unmuted by ${player.name}."}]}`);
                playerSettingsMenuSelected(player, playerSelected);
            } else {
                playerSelected.addTag("isMuted");
                playerSelected.runCommandAsync("ability @s mute true");
                player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${playerSelected.name} has been muted by ${player.name}."}]}`);
                playerSettingsMenuSelected(player, playerSelected);
            }
        } else if(response.selection === 6) {
            if(!config.customcommands.op.enabled) return player.tell("§r§6[§aScythe§6]§r Scythe-Opping players is disabled in config.js.");
            if(playerSelected.hasTag("op")) {
                removeOp(playerSelected);
                player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.name} has given ${playerSelected.name} scythe-op status."}]}`);
                playerSettingsMenuSelected(player, playerSelected);
            } else {
                addOp(playerSelected);
                player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.name} has removed scythe-op status from ${playerSelected.name}."}]}`);
                playerSettingsMenuSelected(player, playerSelected);
            }
        } else if(response.selection === 7) {
            if(!config.customcommands.vanish.enabled) return player.tell("§r§6[§aScythe§6]§r Toggling Vanish is disabled in config.js.");
            if(playerSelected.hasTag("vanished")) {
                playerSelected.runCommandAsync("function tools/vanish");
                player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.name} has put ${playerSelected.name} into vanish."}]}`);
                playerSettingsMenuSelected(player, playerSelected);
            } else {
                playerSelected.runCommandAsync("function tools/vanish");
                player.runCommandAsync(`tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"${player.name} has unvanished ${playerSelected.name}."}]}`);
                playerSettingsMenuSelected(player, playerSelected);
            }
        } else if(response.selection === 8) playerSettingsMenuSelectedTeleport(player, playerSelected);
            else if(response.selection === 9) playerSettingsMenuSelectedGamemode(player, playerSelected);
            else if(response.selection === 10) playerSelected.runCommandAsync("function tools/stats");
            else if(response.selection === 11 || response.canceled) playerSettingsMenu(player);
    });
}

function playerSettingsMenuSelectedTeleport(player, playerSelected) {
    if(!player.hasTag("op")) return;
    player.playSound("mob.chicken.plop");

    const playerSettingsMenuSelectedTeleport = new MinecraftUI.ActionFormData()
        .title("Teleport Menu")
        .body(`Managing ${playerSelected.name}.`)
        .button("Teleport To", "textures/ui/arrow.png")
        .button("Teleport Here", "textures/ui/arrow_down.png")
        .button("Back", "textures/ui/arrow_left.png");

    playerSettingsMenuSelectedTeleport.show(player).then((response) => {
        if(response.selection === 0) player.runCommandAsync(`tp @s "${playerSelected.nameTag}"`);
        if(response.selection === 1) player.runCommandAsync(`tp "${playerSelected.nameTag}" @s`);
        if(response.selection === 2 || response.canceled) playerSettingsMenuSelected(player, playerSelected);
    });
}

function playerSettingsMenuSelectedGamemode(player, playerSelected) {
    if(!player.hasTag("op")) return;
    player.playSound("mob.chicken.plop");

    const playerSettingsMenuSelectedGamemode = new MinecraftUI.ActionFormData()
        .title("Gamemode Menu")
        .body(`Managing ${playerSelected.name}.`)
        .button("Gamemode Creative", "textures/ui/op.png")
        .button("Gamemode Survival", "textures/ui/permissions_member_star.png")
        .button("Gamemode Adventure", "textures/ui/permissions_visitor_hand.png")
        .button("Back", "textures/ui/arrow_left.png");

    playerSettingsMenuSelectedGamemode.show(player).then((response) => {
        if(response.selection === 0) player.runCommandAsync(`gamemode 1 "${playerSelected.nameTag}"`);
        if(response.selection === 1) player.runCommandAsync(`gamemode 0 "${playerSelected.nameTag}"`);
        if(response.selection === 2) player.runCommandAsync(`gamemode 2 "${playerSelected.nameTag}"`);
        if(response.selection === 3 || response.canceled) playerSettingsMenuSelected(player, playerSelected);
    });
}

// ====================== //
//       World Menu       //
// ====================== //
function worldSettingsMenu(player) {
    if(!player.hasTag("op")) return;
    // player.playSound("mob.chicken.plop");
    mainGui(player);
}

// ====================== //
//       Debug Menu       //
// ====================== //
function debugSettingsMenu(player) {
    if(!player.hasTag("op") || config.debug === false) return;
    player.playSound("mob.chicken.plop");

    const debugSettingsMenu = new MinecraftUI.ActionFormData()
        .title("Scythe Anticheat UI")
        .body(`Hello ${player.name},\n\nPlease select an option below.`)
        .button("Disable Debug Intents", "textures/ui/debug_glyph_color.png")
        .button("Randomize Inventory", "textures/ui/debug_glyph_color.png")
        .button("Force Watchdog Stackoverflow", "textures/ui/debug_glyph_color.png")
        .button("Force Watchdog Hang", "textures/ui/debug_glyph_color.png")
        .button("Force Watchdog Memory Crash Type 1", "textures/ui/debug_glyph_color.png")
        .button("Force Watchdog Memory Crash Type 2", "textures/ui/debug_glyph_color.png")
        .button("Back", "textures/ui/arrow_left.png");
        debugSettingsMenu.show(player).then((response) => {
        if(response.selection === 0) {
            config.debug = false;
            mainGui(player);
        } else if(response.selection === 1) {
            const container = player.getComponent("inventory").container;

            const totalItems = [];
            for (let i = 0; i < container.size; i++) {
                if(container.getItem(i)?.nameTag === config.customcommands.gui.gui_item_name) continue;

                const allItems = [...Object.keys(Minecraft.MinecraftItemTypes)];
                const randomItemName = allItems[Math.floor(Math.random() * allItems.length)];
                const randomItem = Minecraft.MinecraftItemTypes[randomItemName];

                if(totalItems.includes(randomItem.id) || config.itemLists.cbe_items.includes(randomItem.id) || config.itemLists.items_semi_illegal.includes(randomItem.id) || config.itemLists.items_very_illegal.includes(randomItem.id) || randomItemName.includes("element")) {
                    i--;
                    continue;
                }
                totalItems.push(randomItem.id);

                container.setItem(i, new Minecraft.ItemStack(randomItem, 1, 0));
            }
        } else if(response.selection === 2) {
            const troll = function() {
                troll();
            };
            troll();
        } else if(response.selection === 3) {
            while(Minecraft !== "a") {}
        } else if(response.selection === 4) {
            config.array = [config];
            while(Minecraft !== "a") {
                config.array.push(config);
            }
        } else if(response.selection === 5) {
            while(Minecraft !== "a") {
                import("./main.js");
            }
        } else if(response.selection === 6 || response.canceled) mainGui(player);
    });
}