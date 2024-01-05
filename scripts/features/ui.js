// @ts-check
import { world, ItemTypes, ItemStack } from "@minecraft/server";
import { ModalFormData, ActionFormData } from "@minecraft/server-ui";

import { flag, parseTime, capitalizeFirstLetter, addOp, removeOp, tellAllStaff } from "../util.js";
import { getStatsMsg } from "../commands/moderation/stats.js";
import { toggleGlobalMute } from "../commands/moderation/globalmute.js";
import { wipeEnderchest } from "../commands/utility/ecwipe.js";
import { getInvseeMsg } from "../commands/utility/invsee.js";
import { freezePlayer, unfreezePlayer } from "../commands/utility/freeze.js";
import { disableFly, enableFly } from "../commands/utility/fly.js";

import config from "../data/config.js";
import data from "../data/data.js";

// Commonly used icons
const icons = {
    back: "textures/ui/arrow_left.png",
    anvil: "textures/ui/anvil_icon.png",
    member: "textures/ui/permissions_member_star.png",
    op: "textures/ui/op.png",
    info: "textures/ui/infobulb.png",
    mute_off: "textures/ui/mute_off.png",
    mute_on: "textures/ui/mute_on.png",
    debug: "textures/ui/debug_glyph_color.png",
    arrow: "textures/ui/arrow.png"
};

const moduleList = Object.keys(config.modules).concat(Object.keys(config.misc_modules));
const modules = [];

for(const fullModule of moduleList) {
    if(fullModule.startsWith("example")) continue;
    const module = fullModule[fullModule.length - 1].toUpperCase() === fullModule[fullModule.length - 1] ? fullModule.slice(0, fullModule.length - 1) : fullModule;

    if(modules.includes(module)) continue;
    modules.push(module);
}

const punishments = {
    none: 0,
    mute: 1,
    kick: 2,
    ban: 3
};

const punishmentSettings = ["punishment","punishmentLength","minVlbeforePunishment"];

// This is the function that will be called when the player wants to open the GUI
// All other GUI functions will be called from here
export function mainGui(player, error) {
    player.playSound("mob.chicken.plop");

    let text = `Hello ${player.name},\n\nPlease select an option below.`;
    if(error) text += `\n\n§c${error}`;

    const menu = new ActionFormData()
		.title("Scythe Anticheat UI")
		.body(text)
		.button("Ban Menu", icons.anvil)
		.button("Configure Settings", "textures/ui/gear.png")
		.button(`Manage Players\n§8§o${world.getPlayers().length} player(s) online`, "textures/ui/FriendsDiversity.png")
        .button("Server Management", "textures/ui/servers.png")
		.button("Exit", "textures/ui/redX1.png");

	if(config.debug) menu.button("⭐ Debug", icons.debug);

    menu.show(player).then((response) => {
        switch(response.selection) {
            case 0:
                banMenu(player);
                break;
            case 1:
                settingsMenu(player);
                break;
            case 2:
                playerSettingsMenu(player);
                break;
            case 3:
                serverManagementMenu(player);
                break;
            case 5:
                debugSettingsMenu(player);
        }
    });
}

// ====================== //
//        Ban Menu        //
// ====================== //
function banMenu(player) {
    player.playSound("mob.chicken.plop");

    const menu = new ActionFormData()
        .title("Ban Menu")
        .body("Please select an option.")
        .button("Kick Player", icons.anvil)
        .button("Ban Player", icons.anvil)
        .button("Unban Player", icons.anvil)
        .button("Back", icons.back);

    menu.show(player).then((response) => {
        switch(response.selection) {
            case 1:
                banMenuSelect(player, 1);
                break;

            case 2:
                unbanPlayerMenu(player);
                break;

            default:
                mainGui(player);
        }
    });
}

function banMenuSelect(player, selection) {
    player.playSound("mob.chicken.plop");
    const allPlayers = world.getPlayers();

    const menu = createSelectPlayerMenu("Ban Menu", allPlayers, player);

    menu.show(player).then((response) => {
        // Check if the form was cancelled. Response.selection is checked if its undefined to prevent typing errors
        if(response.selection === undefined || allPlayers.length < response.selection) return banMenu(player);

        if(selection === 0) kickPlayerMenu(player, allPlayers[response.selection]);
            else banPlayerMenu(player, allPlayers[response.selection]);
    });
}

function kickPlayerMenu(player, playerSelected, lastMenu = 0) {
    if(!config.customcommands.kick.enabled) return player.sendMessage("§r§6[§aScythe§6]§r Kicking players is disabled in config.js.");
    player.playSound("mob.chicken.plop");

    const menu = new ModalFormData()
        .title("Kick Player Menu - " + playerSelected.name)
        .textField("Kick Reason:", "§o§7No Reason Provided")
        .toggle("Silent", false);

    menu.show(player).then((response) => {
        if(response.canceled) {
            switch (lastMenu) {
                case 0:
                    banMenuSelect(player, lastMenu);
                    break;
                case 1:
                    playerSettingsMenuSelected(player, playerSelected);
            }
            return;
        }

        const formValues = response.formValues ?? [];

        // @ts-expect-error
        const reason = formValues[0].replace(/"|\\/g, "") ?? "No Reason Provided";
        const isSilent = formValues[1];

        if(!isSilent) player.runCommandAsync(`kick "${playerSelected.name}" ${reason}`);
        playerSelected.triggerEvent("scythe:kick");

        tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has kicked ${playerSelected.name} (Silent:${isSilent}). Reason: ${reason}`);
    });
}

function banPlayerMenu(player, playerSelected, lastMenu = 0) {
    if(!config.customcommands.ban.enabled) return player.sendMessage("§r§6[§aScythe§6]§r Banning players is disabled in config.js.");

    player.playSound("mob.chicken.plop");

    const menu = new ModalFormData()
        .title("Ban Player Menu - " + playerSelected.name)
        .textField("Ban Reason:", "§o§7No Reason Provided")
        .slider("Ban Length (in days)", 1, 365, 1)
        .toggle("Permanant Ban", false);

    menu.show(player).then((response) => {
        if(response.canceled) {
            switch(lastMenu) {
                case 0:
                    banMenuSelect(player, lastMenu);
                    break;

                case 1:
                    playerSettingsMenuSelected(player, playerSelected);
                    break;
            }
            return;
        }

        const formValues = response.formValues ?? [];

        // @ts-expect-error
        const reason = formValues[0].replace(/"|\\/g, "") ?? "No Reason Provided";
        const banLength = parseTime(`${formValues[1]}d`);
        const permBan = formValues[2];

        // Remove old ban data
        for(const t of playerSelected.getTags()) {
            if(t.startsWith("reason:") || t.startsWith("by:") || t.startsWith("time:")) playerSelected.removeTag(t);
        }

        playerSelected.addTag(`reason:${reason}`);
        playerSelected.addTag(`by:${player.name}`);
        if(banLength && !permBan) playerSelected.addTag(`time:${Date.now() + banLength}`);
        playerSelected.addTag("isBanned");

        tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has banned ${playerSelected.nameTag} for ${reason}`);
    });
}

function unbanPlayerMenu(player) {
    if(!config.customcommands.unban.enabled) return player.sendMessage("§r§6[§aScythe§6]§r Unbanning players is disabled in config.js.");
    player.playSound("mob.chicken.plop");

    const menu = new ModalFormData()
        .title("Unban Player Menu")
        .textField("Player to unban:", "§o§7Enter player name")
        .textField("Unban Reason:", "§o§7No Reason Provided");

    menu.show(player).then((response) => {
        if(response.canceled) return banMenu(player);

        const formValues = response.formValues ?? [];

        const playerToUnban = formValues[0];

        // @ts-expect-error
        const reason = formValues[1].replace(/"|\\/g, "") ?? "No Reason Provided";

        // @ts-expect-error
        data.unbanQueue.push(playerToUnban.toLowerCase());

        tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has added ${playerToUnban} into the unban queue. Reason: ${reason}`);
    });
}

// ====================== //
//     Settings Menu      //
// ====================== //
function settingsMenu(player) {
    player.playSound("mob.chicken.plop");

    const menu = new ActionFormData()
        .title("Configure Settings")
        .body("Please select a sub-check to edit.");

    for(const subModule of modules) {
        menu.button(capitalizeFirstLetter(subModule));
    }

    menu.button("Back", icons.back);

    menu.show(player).then((response) => {
        if(!modules[response.selection ?? -1]) return mainGui(player);

        settingsCheckSelectMenu(player, response.selection);
    });
}

function settingsCheckSelectMenu(player, selection) {
    player.playSound("mob.chicken.plop");
    const subCheck = modules[selection];

    const menu = new ActionFormData()
        .title("Configure Settings")
        .body("Please select a check to edit.");

    const checks = [];
    for(const module of moduleList) {
        if(!module.startsWith(subCheck)) continue;
        checks.push(module);

        const checkData = config.modules[module] ?? config.misc_modules[module];
        menu.button(`${capitalizeFirstLetter(subCheck)}/${module[module.length - 1]}\n${checkData.enabled ? "§8[§aENABLED§8]" : "§8[§4DISABLED§8]"}`);
    }

    if(checks.length === 1) return editSettingMenu(player, checks[0]);

    menu.button("Back", icons.back);

    menu.show(player).then((response) => {
        const selection = response.selection ?? - 1;

        if(!checks[selection]) return settingsMenu(player);

        editSettingMenu(player, checks[selection]);
    });
}

function editSettingMenu(player, check) {
    player.playSound("mob.chicken.plop");
    const checkData = config.modules[check] ?? config.misc_modules[check];

    let optionsMap = [];

    const menu = new ModalFormData()
        .title(`Editing check: ${capitalizeFirstLetter(check)}`);

    for(const key of Object.keys(checkData)) {
        if(punishmentSettings.includes(key)) continue;

        // Friendly setting name. Changes "multi_protection" to "Multi Protection"
        const settingName = capitalizeFirstLetter(key).replace(/_./g, (match) => " " + match[1].toUpperCase());

        switch(typeof checkData[key]) {
            case "number":
                menu.slider(settingName, 0, 100, Number.isInteger(checkData[key]) ? 1 : 0.01, checkData[key]);
                optionsMap.push(key);
                break;
            case "boolean":
                menu.toggle(settingName, checkData[key]);
                optionsMap.push(key);
                break;
            case "string":
                menu.textField(settingName, "Enter text here", checkData[key]);
                optionsMap.push(key);
                break;
        }
    }

    // Check if the module supports punishments
    if(checkData.punishment) {
        menu.dropdown("Punishment", Object.keys(punishments), punishments[checkData.punishment]);
        menu.textField("Punishment Length", "Enter a length (ex: 12d, 1d, 1m, 30s", checkData["punishmentLength"]);
        menu.slider("Minimum Violations Before Punishment", 0, 20, 1, checkData["minVlbeforePunishment"]);

        optionsMap = optionsMap.concat(punishmentSettings);
    }

    menu.show(player).then((response) => {
        if(response.canceled) return;

        const formValues = response.formValues ?? [];

        for(const id in optionsMap) {
            const name = optionsMap[id];

            // @ts-expect-error
            checkData[name] = name === "punishment" ? Object.keys(punishments)[formValues[id]] : formValues[id];
        }

        player.sendMessage(`§r§6[§aScythe§6]§r Successfully updated the settings for ${check}.\n§r§6[§aScythe§6]§r New Data:\n${JSON.stringify(checkData, null, 2)}`);
    });
}

// ====================== //
//       Player Menu      //
// ====================== //
function playerSettingsMenu(player) {
    player.playSound("mob.chicken.plop");
    const allPlayers = world.getPlayers();

    const menu = createSelectPlayerMenu("Player Menu", allPlayers, player);

    menu.show(player).then((response) => {
        if(response.selection !== undefined && allPlayers.length > response.selection) {
            playerSettingsMenuSelected(player, allPlayers[response.selection]);
        } else {
            mainGui(player);
        }
    });
}

export function playerSettingsMenuSelected(player, playerSelected) {
    player.playSound("mob.chicken.plop");

    const menu = new ActionFormData()
        .title("Player Menu - " + playerSelected.name)
        .body(`Player Info:\n\nName: ${player.name}\nUnique ID: ${playerSelected.id}\nCoordinates: ${Math.floor(playerSelected.location.x)}, ${Math.floor(playerSelected.location.y)}, ${Math.floor(playerSelected.location.z)}\nDimension: ${capitalizeFirstLetter((playerSelected.dimension.id).replace("minecraft:", ""))}\nScythe Opped: ${playerSelected.hasTag("op") ? "§atrue" : "false"}\n§rMuted: ${playerSelected.hasTag("isMuted") ? "§ctrue" : "§afalse"}\n§rFrozen: ${playerSelected.hasTag("freeze") ? "§ctrue" : "§afalse"}\n§rVanished: ${playerSelected.hasTag("vanish")}\nFlying: ${playerSelected.isFlying}`)
        .button("View Inventory", "textures/blocks/chest_front.png")
        .button("Kick Player", icons.anvil)
        .button("Ban Player", icons.anvil)
        .button("View Anticheat Logs", icons.info)
        .button("Clear Enderchest", "textures/blocks/ender_chest_front.png")
        .button(playerSelected.hasTag("flying") ? "Disable Fly Mode" : "Enable Fly Mode", "textures/ui/levitation_effect.png")
        .button(playerSelected.hasTag("freeze") ? "Unfreeze Player" : "Freeze Player", "textures/ui/icon_winter.png");

    playerSelected.hasTag("isMuted") ? menu.button("Unmute Player", icons.mute_off) : menu.button("Mute Player", icons.mute_on);
    playerSelected.hasTag("op") ? menu.button("Remove Player as Scythe-Op", icons.member) :  menu.button("Set Player as Scythe-Op", icons.op);

    menu
        .button("Teleport", icons.arrow)
        .button("Switch Gamemode", icons.op)
        .button("Back", icons.back);

    menu.show(player).then((response) => {
        switch (response.selection) {
            case 0:
                if(!config.customcommands.invsee.enabled) {
                    return player.sendMessage("§r§6[§aScythe§6]§r Invsee is disabled in config.js.");
                }

                player.sendMessage(getInvseeMsg(playerSelected));
                break;

            case 1:
                kickPlayerMenu(player, playerSelected, 1);
                break;

            case 2:
                banPlayerMenu(player, playerSelected, 1);
                break;

            case 3:
                if(!config.customcommands.stats.enabled) {
                    return player.sendMessage("§r§6[§aScythe§6]§r Player Stats is disabled in config.js.");
                }

                player.sendMessage(getStatsMsg(playerSelected));
                break;

            case 4:
                if(!config.customcommands.ecwipe.enabled) {
                    return player.sendMessage("§r§6[§aScythe§6]§r Enderchest wiping is disabled in config.js.");
                }

                wipeEnderchest(player, playerSelected);
                break;

            case 5:
                if(!config.customcommands.fly.enabled) {
                    return player.sendMessage("§r§6[§aScythe§6]§r Toggling Fly is disabled in config.js.");
                }

                playerSelected.hasTag("flying") ? disableFly(playerSelected, player) : enableFly(playerSelected, player);
                break;

            case 6:
                if(!config.customcommands.freeze.enabled) {
                    return player.sendMessage("§r§6[§aScythe§6]§r Freezing players is disabled in config.js.");
                }

                playerSelected.hasTag("freeze") ? unfreezePlayer(playerSelected, player) : freezePlayer(playerSelected, player);
                break;

            case 7:
                if(!config.customcommands.mute.enabled) {
                    return player.sendMessage("§r§6[§aScythe§6]§r Muting players is disabled in config.js.");
                }

                if(playerSelected.hasTag("isMuted")) {
                    playerSelected.removeTag("isMuted");
                    playerSelected.runCommandAsync("ability @s mute false");

                    tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has unmuted ${playerSelected.name}.`);
                } else {
                    playerSelected.addTag("isMuted");
                    playerSelected.runCommandAsync("ability @s mute true");

                    tellAllStaff(`§r§6[§aScythe§6]§r ${player.name} has muted ${playerSelected.name}.`);
                }
                break;

            case 8:
                if(!config.customcommands.op.enabled) {
                    return player.sendMessage("§r§6[§aScythe§6]§r Scythe-Opping players is disabled in config.js.");
                }

                playerSelected.hasTag("op") ? removeOp(player, playerSelected) : addOp(player, playerSelected);
                break;

            case 9:
                playerSettingsMenuSelectedTeleport(player, playerSelected);
                break;

            case 10:
                playerSettingsMenuSelectedGamemode(player, playerSelected);
                break;

            default:
                playerSettingsMenu(player);
        }
    });
}

function playerSettingsMenuSelectedTeleport(player, playerSelected) {
    player.playSound("mob.chicken.plop");

    const menu = new ActionFormData()
        .title("Teleport Menu")
        .body(`Managing ${playerSelected.name}.`)
        .button("Teleport To", icons.arrow)
        .button("Teleport Here", "textures/ui/arrow_down.png")
        .button("Back", icons.back);

    menu.show(player).then((response) => {
        switch(response.selection) {
            case 0:
                player.teleport(playerSelected.location);
                break;

            case 1:
                playerSelected.teleport(player.location);
                break;

            default:
                playerSettingsMenuSelected(player, playerSelected);
        }
    });
}

function playerSettingsMenuSelectedGamemode(player, playerSelected) {
    player.playSound("mob.chicken.plop");

    const menu = new ActionFormData()
        .title("Gamemode Menu")
        .body(`Switching ${playerSelected.name}'s gamemode.`)
        .button("Gamemode Survival", icons.member)
        .button("Gamemode Creative", icons.op)
        .button("Gamemode Adventure", "textures/ui/permissions_visitor_hand.png")
        .button("Gamemode Spectator", "textures/ui/invisibility_effect.png")
        .button("Default Gamemode", "textures/ui/recap_glyph_desaturated.png")
        .button("Back", icons.back);

    menu.show(player).then((response) => {
        if(response.selection === 5 || response.canceled) return playerSettingsMenuSelected(player, playerSelected);

        switch(response.selection) {
            case 3:
                playerSelected.runCommandAsync("gamemode spectator");
                break;

            case 4:
                playerSelected.runCommandAsync("gamemode 5");
                break;

            // Handles changing to survival, creative and adventure
            default:
                playerSelected.runCommandAsync(`gamemode ${response.selection}`);
        }
    });
}
// ====================== //
//   Server Management    //
// ====================== //
function serverManagementMenu(player) {
    player.playSound("mob.chicken.plop");

    // @ts-expect-error
    const globalmute = JSON.parse(world.getDynamicProperty("globalmute"));

    const menu = new ActionFormData()
        .title("Server Management Menu")
        .body(`Hello ${player.name},\n\nPlease select an option below.`)
        .button("Full Report", icons.info);

    globalmute.muted ? menu.button("Disable Global Mute", icons.mute_off) : menu.button("Enable Global Mute", icons.mute_on);

    menu.button("Back", icons.back);
    menu.show(player).then((response) => {
        switch(response.selection) {
            case 0:
                for(const pl of world.getPlayers()) {
                    player.sendMessage(getStatsMsg(pl));
                }
                break;

            case 1:
                toggleGlobalMute(player);
                break;
            
            case 2:
                mainGui(player);
        }
    });
}

// ====================== //
//       Debug Menu       //
// ====================== //
function debugSettingsMenu(player) {
    player.playSound("mob.chicken.plop");

    const menu = new ActionFormData()
        .title("Debug Settings Menu")
        .body(`Hello ${player.name},\n\nPlease select an option below.`)
        .button("Disable Debug Intents", icons.debug)
        .button("Randomize Inventory", icons.debug)
        .button("Test Flag", icons.debug)
        .button("Force Watchdog Stack Overflow", icons.debug)
        .button("Force Watchdog Hang", icons.debug)
        .button("Force Watchdog Memory Crash", icons.debug)
        .button("Back", icons.back);
    menu.show(player).then((response) => {
        switch(response.selection) {
            case 0:
                config.debug = false;
                mainGui(player);
                break;

            case 1: {
                const container = player.getComponent("inventory").container;
                const allItems = ItemTypes.getAll();

                const totalItems = [];
                for (let i = 0; i < 36; i++) {
                    if(container.getItem(i)?.nameTag === config.customcommands.ui.ui_item_name) continue;

                    const randomItem = allItems[Math.floor(Math.random() * allItems.length)];

                    if(totalItems.includes(randomItem.id) || config.itemLists.cbe_items.includes(randomItem.id) || config.itemLists.items_semi_illegal.includes(randomItem.id) || config.itemLists.items_very_illegal.includes(randomItem.id) || randomItem.id.includes("element")) {
                        i--;
                        continue;
                    }
                    totalItems.push(randomItem.id);

                    container.setItem(i, new ItemStack(randomItem, 1));
                }
                break;
            }

            case 2:
                debugSettingsFlag(player);
                break;

            case 3: {
                const troll = () => troll();
                troll();
                break;
            }

            case 4:
                // eslint-disable-next-line no-constant-condition
                while(true) {}

            case 5:
                config.array = [config];
                // eslint-disable-next-line no-constant-condition
                while(true) {
                    config.array.push(config);
                }

            default:
                mainGui(player);
        }
    });
}

function debugSettingsFlag(player) {
    player.playSound("mob.chicken.plop");

    const menu = new ModalFormData()
        .title("Debug Menu - Test Flag")
        .textField("Check", "Example", "Example")
        .textField("Check type", "A", "A")
        .textField("Hack type", "Combat", "Combat")
        .textField("Debug", "")
        .toggle("Should TP", false)
        .toggle("Clear slot", false)
        .slider("Slot", 0, 36, 1, 0);

    menu.show(player).then((response) => {
        const formValues = response.formValues;
        if(!formValues) return debugSettingsMenu(player);

        // @ts-expect-error
        flag(player, formValues[0], formValues[1], formValues[2], formValues[3], formValues[4], undefined, formValues[5] ? formValues[6] : undefined);
    });
}

// ====================== //
//         Extra          //
// ====================== //
const playerIcons = [
    "textures/ui/icon_alex.png",
    "textures/ui/icon_steve.png",
];

function createSelectPlayerMenu(title, players, self) {
    const menu = new ActionFormData()
        .title(title)
        .body("Please select a player to manage.");

    for(const player of players) {
        let playerName = player.name;

        if(player.id === self.id) playerName += " §1[YOU]";
        if(player.hasTag("op")) playerName += " §1[OP]";

        menu.button(playerName, playerIcons[Math.floor(Math.random() * playerIcons.length)]);
    }

    menu.button("Back", icons.back);

    return menu;
}