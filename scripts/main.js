import * as Minecraft from "mojang-minecraft";
import { flag, banMessage, getClosestPlayer, snakeToCamel} from "./util.js";
import { commandHandler } from "./commands/handler.js";
import config from "./data/config.js";
import { banList } from "./data/globalban.js";
import cache from "./data/cache.js";
import { mainGui, playerSettingsMenuSelected } from "./features/ui.js";

const World = Minecraft.world;

if (config.debug) console.warn(`${new Date()} | Im not a dumbass and this actually worked :sunglasses:`);

World.events.beforeChat.subscribe(msg => {
    const message = msg.message.toLowerCase();
    const player = msg.sender;

    if (config.debug && message === "ping") console.warn(`${new Date()} | Pong!`);

    if (message.includes("the best minecraft bedrock utility mod")) msg.cancel = true;

    if(player.hasTag("isMuted")) {
        msg.cancel = true;
        player.runCommand(`tellraw @s {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"§a§lNOPE! §r§aYou have been muted."}]}`);
    }

    // BadPackets/2 = chat message length check
    if (config.modules.badpackets2.enabled && message.length > config.modules.badpackets2.maxlength || message.length < config.modules.badpackets2.minLength) flag(player, "BadPackets", "2", "messageLength", message.length, false, msg);

    // Spammer/A = checks if someone sends a message while moving and on ground
    if (config.modules.spammerA.enabled && player.hasTag('moving') && player.hasTag('ground') && !player.hasTag('jump'))
        flag(player, "Spammer", "A", "Movement", false, false, true, msg);

    // Spammer/B = checks if someone sends a message while swinging their hand
    if (config.modules.spammerB.enabled && player.hasTag('left'))
        flag(player, "Spammer", "B", "Combat", false, false, false, msg);

    // Spammer/C = checks if someone sends a message while using an item
    if (config.modules.spammerC.enabled && player.hasTag('right'))
        flag(player, "Spammer", "C", "Misc", false, false, false, msg);

    // Spammer/D = checks if someone sends a message while having a GUI open
    if (config.modules.spammerD.enabled && player.hasTag('hasGUIopen'))
        flag(player, "Spammer", "D", "Misc", false, false, false, msg);

    commandHandler(player, msg);

    // add's user custom tags to their messages if it exists or we fall back
    // also filter for non ASCII characters and remove them in messages
    if (player.name && player.name !== player.nameTag && !msg.cancel) {
        player.runCommand(`tellraw @a {"rawtext":[{"text":"<${player.nameTag}> ${msg.message.replace(/[^\x00-\xFF]/g, "").replace(/"/g, "").replace(/\\/g, "")}"}]}`);
        msg.cancel = true;
    } else if (player.name && player.name === player.nameTag && !msg.cancel && config.modules.filterUnicodeChat) {
        player.runCommand(`tellraw @a {"rawtext":[{"text":"<${player.nameTag}> ${msg.message.replace(/[^\x00-\xFF]/g, "").replace(/"/g, "").replace(/\\/g, "")}"}]}`);
        msg.cancel = true;
    }
});

World.events.tick.subscribe(() => {
    if(config.modules.itemSpawnRateLimit.enabled) cache.entitiesSpawnedInLastTick = 0;
    if(config.debug) cache.currentTick++;

    // run as each player
    for (let player of World.getPlayers()) {
        player.blocksBroken = 0;
        player.entitiesHit = [];

        if(player.isGlobalBanned) {
            player.addTag(`by:Scythe Anticheat`);
            player.addTag(`reason:You are Scythe Anticheat global banned!`);
            player.addTag(`isBanned`);
        }

        // player.selectedSlot = 3;

        // sexy looking ban message
        if(player.hasTag("isBanned")) banMessage(player);

        // Crasher/A = invalid pos check
        if (config.modules.crasherA.enabled && Math.abs(player.location.x) > 30000000 ||
            Math.abs(player.location.y) > 30000000 || Math.abs(player.location.z) > 30000000) flag(player, "Crasher", "A", "Exploit", false, false, true);

        // anti-namespoof
        // these values are set in the playerJoin config
        if(player.flagNamespoofA) flag(player, "Namespoof", "A", "Exploit", "nameLength", player.name.length);
        if(player.flagNamespoofB) flag(player, "Namespoof", "B", "Exploit");

        // player position shit
        if(player.hasTag("moving")) {
            try {
                player.runCommand(`scoreboard players set @s xPos ${Math.floor(player.location.x)}`);
                player.runCommand(`scoreboard players set @s yPos ${Math.floor(player.location.y)}`);
                player.runCommand(`scoreboard players set @s zPos ${Math.floor(player.location.z)}`);
            } catch {}
        }

        if(config.modules.bedrockValidate.enabled) {
            try {
                player.runCommand("testfor @s[scores={bedrock=1..}]");
                if (config.modules.bedrockValidate.overworld && player.dimension.id == "minecraft:overworld") {
                    try {
                        player.runCommand(`fill ~-10 -64 ~-10 ~10 -64 ~10 bedrock`);
                    } catch {}

                    try {
                        player.runCommand(`fill ~-4 -59 ~-4 ~4 319 ~4 air 0 replace bedrock`);
                    } catch {}
                }

                if (config.modules.bedrockValidate.nether && player.dimension.id == "minecraft:nether") { 
                    try {
                        player.runCommand(`fill ~-10 0 ~-10 ~10 0 ~10 bedrock`);
                    } catch {}
                    try {
                        player.runCommand(`fill ~-10 127 ~-10 ~10 127 ~10 bedrock`);
                    } catch {}
                    try {
                        player.runCommand(`fill ~-5 5 ~-5 ~5 120 ~5 air 0 replace bedrock`);
                    } catch {}
                }
            } catch {}
        }

        // if (config.debug) console.warn(`${new Date()} | ${player.name}'s speed: ${Math.sqrt(player.velocity.x**2 + player.velocity.z**2).toFixed(4)} Vertical Speed: ${player.velocity.y.toFixed(4)}`);

        // NoSlow/A = speed limit check
        if(config.modules.noslowA.enabled && Math.sqrt(Math.abs(player.velocity.x**2 + player.velocity.z**2)).toFixed(2) >= config.modules.noslowA.speed && Math.sqrt(Math.abs(player.velocity.x**2 + player.velocity.z**2)).toFixed(2) <= config.modules.noslowA.maxSpeed) {
            if (!player.getEffect(Minecraft.MinecraftEffectTypes.speed) && player.hasTag('moving') && player.hasTag('right') && player.hasTag('ground') && !player.hasTag('jump') && !player.hasTag('gliding') && !player.hasTag('swimming')) {
                try {
                    player.runCommand("testfor @s[scores={right=5..}]");
                    flag(player, "NoSlow", "A", "Movement", "speed", Math.sqrt(Math.abs(player.velocity.x **2 + player.velocity.z **2)).toFixed(3), true);
                } catch {}
            }
        }

        let container = player.getComponent('inventory').container;
        for (let i = 0; i < container.size; i++) if (container.getItem(i)) {
            let item = container.getItem(i);
            // Illegalitems/C = item stacked over 64 check
            if(config.modules.illegalitemsC.enabled && item.amount > config.modules.illegalitemsC.maxStack)
                flag(player, "IllegalItems", "C", "Exploit", "stack", item.amount, false, false, i);
                
            // Illegalitems/D = additional item clearing check
            if (config.modules.illegalitemsD.enabled && config.itemLists.items_very_illegal.includes(item.id))
                flag(player, "IllegalItems", "D", "Exploit", "item", item.id, false, false, i);

            // CommandBlockExploit/H = clear items
            if(config.modules.commandblockexploitH.enabled && config.itemLists.cbe_items.includes(item.id))
                flag(player, "CommandBlockExploit", "H", "Exploit", "item", item.id, false, false, i);
                
            // Illegalitems/F = Checks if an item has a name longer then 32 characters
            if(config.modules.illegalitemsF.enabled && item.nameTag?.length > config.modules.illegalitemsF.length)
                flag(player, "IllegalItems", "F", "Exploit", "name", `${item.nameTag},length=${item.nameTag.length}`, false, false, i);

            // BadEnchants/D = checks if an item has a lore
            if(config.modules.badenchantsD.enabled && item.getLore().length) {
                if(!config.modules.badenchantsD.exclusions.includes(String(item.getLore())))
                    flag(player, "BadEnchants", "D", "Exploit", "lore", item.getLore(), false, false, i);
            }

            if(config.modules.badenchantsA.enabled || config.modules.badenchantsB.enabled || config.modules.badenchantsC.enabled) {
                let itemEnchants = item.getComponent("enchantments").enchantments;

                for (let enchantment in Minecraft.MinecraftEnchantmentTypes) {
                    let enchantData = itemEnchants.getEnchantment(Minecraft.MinecraftEnchantmentTypes[enchantment]);
        
                    if(enchantData) {
                        // badenchants/A = checks for items with invalid enchantment levels
                        let maxLevel = config.modules.badenchantsA.levelExclusions[enchantData.type.id]?.maxLevel;
                        if(maxLevel && enchantData.level > maxLevel) {
                            flag(player, "BadEnchants", "A", "Exploit", "enchant", `minecraft:${enchantData.type.id},level=${enchantData.level}`, false, false, i);
                        } else 
                            if(enchantData.level > Minecraft.MinecraftEnchantmentTypes[enchantment].maxLevel)
                                flag(player, "BadEnchants", "A", "Exploit", "enchant", `minecraft:${enchantData.type.id},level=${enchantData.level}`, false, false, i);

                        // badenchants/B = checks for negative enchantment levels
                        if(config.modules.badenchantsB.enabled && enchantData.level < config.modules.badenchantsA.minLevel) 
                            flag(player, "BadEnchants", "B", "Exploit", "enchant", `minecraft:${enchantData.type.id},level=${enchantData.level}`, false, false, i);

                        // badenchants/C = checks if an item has an enchantment which isnt support by the item
                        // just dont ask.
                        if(config.modules.badenchantsD.enabled) {
                            let item2 = new Minecraft.ItemStack(Minecraft.MinecraftItemTypes[snakeToCamel(item.id)], 1, item.data);
                            if(!item2.getComponent("enchantments").enchantments.canAddEnchantment(new Minecraft.Enchantment(Minecraft.MinecraftEnchantmentTypes[enchantment], 1))) {
                                flag(player, "BadEnchants", "C", "Exploit", "item", `${item.id},enchant=minecraft:${enchantData.type.id},level=${enchantData.level}`, false, false, i);
                            }
                        }
                    }
                }
            }
        }

        // invalidsprint/a = checks for sprinting with the blindness effect
        if (config.modules.invalidsprintA.enabled && player.getEffect(Minecraft.MinecraftEffectTypes.blindness) && player.hasTag('sprint'))
            flag(player, "InvalidSprint", "A", "Movement", false, false, true);

        // fly/a
        if(config.modules.flyA.enabled && Math.abs(player.velocity.y).toFixed(4) == 0.1552 && !player.hasTag("jump") && !player.hasTag("gliding") && !player.hasTag("riding") && !player.hasTag("levitating") && player.hasTag("ground") && player.hasTag("moving")) {
            try {
                player.runCommand("execute @s ~~~ detect ~~~ air -1 execute @s ~~~ detect ~1~~ air -1 execute @s ~~~ detect ~~~1 air -1 execute @s ~~~ detect ~1~~1 air -1 execute @s ~~~ detect ~-1~~ air -1 execute @s ~~~ detect ~~~-1 air -1 execute @s ~~~ detect ~-1~~-1 air -1 execute @s ~~~ detect ~1~~-1 air -1 testforblock ~-1~~1 air -1");
                flag(player, "Fly", "A", "Movement", "vertical_speed", Math.abs(player.velocity.y).toFixed(4), true);
            } catch {}
        }
        
        if(config.modules.autoclickerA.enabled && player.cps > 0 && new Date().getTime() - player.firstAttack > config.modules.autoclickerA.checkCPSAfter) {
            player.cps = player.cps / ((new Date().getTime() - player.firstAttack) / 1000);
            // autoclicker/A = checks for high cps
            if(player.cps > config.modules.autoclickerA.maxCPS) flag(player, "Autoclicker", "A", "Combat", "CPS", player.cps);
            
            // player.runCommand(`say ${player.cps} ${player.lastCPS}`);

            // autoclicker/B = checks if cps is similar to last cps (WIP)
            /*
            if(String(player.cps).substring(0, 3) == String(player.lastCPS)?.substring(0, 4)) flag(player, "AutoClicker", "B", "Combat", "CPS", `${player.cps},last_cps=${player.lastCPS}`);
            player.lastCPS = player.cps;
            */

            player.firstAttack = new Date().getTime();
            player.cps = 0;
        }

        // if(config.debug) console.warn(`${new Date()} | reached end of tick event. current tick: ${cache.currentTick}`);
    }
});

World.events.blockPlace.subscribe(block => {
    if(config.debug) console.warn(`${block.player.nameTag} has placed ${block.block.id}`);
});

World.events.blockBreak.subscribe(block => {
    if(config.debug) console.warn(`${block.player.nameTag} has broken the block ${block.brokenBlockPermutation.type.id}`);

    // nuker/a = checks if a player breaks more than 3 blocks in a tick
    if(config.modules.nukerA.enabled) {
        block.player.blocksBroken++;

        if(block.player.blocksBroken > config.modules.nukerA.maxBlocks) {
            flag(block.player, "Nuker", "A", "Misc", "blocksBroken", block.player.blocksBroken);
            block.block.setPermutation(block.brokenBlockPermutation);
        }
    }

    // liquidinteract/a = checks if a player breaks a liquid source block
    if(config.modules.liquidinteractA.enabled) {
        if(config.modules.liquidinteractA.liquids.includes(block.brokenBlockPermutation.type.id)) {
            flag(block.player, "LiquidInteract", "A", "Misc", "block", block.brokenBlockPermutation.type.id);
            block.block.setPermutation(block.brokenBlockPermutation);
        }
    }
});

World.events.beforeItemUseOn.subscribe(block => {
    // commandblockexploit/f = cancels the placement of cbe items
    if(config.modules.commandblockexploitF.enabled && config.itemLists.cbe_items.includes(block.item.id)) {
        flag(block.source, "CommandBlockExploit","F", "Exploit", "block", block.item.id, false, false, block.source.selectedSlot);
        block.cancel = true;
    }

    /*
        illegalitems/e = cancels the placement of illegal items
        illegalitems/a could be bypassed by using a right click autoclicker/autobuild or lag
        thx drib or matrix_code for telling me lol
    */
    if(config.modules.illegalitemsE.enabled) {
        // items that are obtainble using commands
        if(!block.source.hasTag("op")) {
            if(config.itemLists.items_semi_illegal.includes(block.item.id)) {
                // dont affect gmc players
                try {
                    block.source.runCommand("testfor @s[m=!c]");
                    flag(block.source, "IllegalItems", "E", "Exploit", "block", block.item.id, false, false, block.source.selectedSlot);
                    block.cancel = true;
                } catch {}
            }

            // patch element blocks
            if(config.itemLists.elements && block.item.id.startsWith("minecraft:element_")) {
                // dont affect gmc players
                try {
                    block.source.runCommand("testfor @s[m=!c]");
                    flag(block.source, "IllegalItems", "E", "Exploit", "block", block.item.id, false, false, block.source.selectedSlot);
                    block.cancel = true;
                } catch {}
            }
            
            // patch spawn eggs
            if(config.itemLists.spawnEggs && block.item.id.endsWith("_spawn_egg")) {
                // dont affect gmc players
                try {
                    block.source.runCommand("testfor @s[m=!c]");
                    flag(block.source, "IllegalItems", "E", "Exploit", "block", block.item.id, false, false, block.source.selectedSlot);
                    block.cancel = true;
                } catch {}
            }
        }
    
        // items that cannot be obtained normally
        if(config.itemLists.items_very_illegal.includes(block.item.id)) {
            flag(block.source, "IllegalItems", "E", "Exploit", "item", block.item.id, false, false, block.source.selectedSlot);
            block.cancel = true;
        }
    }
});

World.events.playerJoin.subscribe(playerJoin => {
    let player = playerJoin.player;

    if(!cache.loaded) {
        try {
            World.getDimension("overworld").runCommand(`scoreboard players set scythe:config gametestapi 1`);
            World.getDimension("overworld").runCommand(`scoreboard players operation @a gametestapi = scythe:config gametestapi`);
            cache.loaded = true;
        } catch {}
    }

    // fix a weird crash that happens when the player has an extremely long name
    if(player.nameTag.length > 100) player.triggerEvent("scythe:kick");

    // fix a disabler method
    player.nameTag = player.nameTag.replace(/"|\\/g, "");

    // load custom nametag
    let tag = player.getTags().find(t => t.replace(/"|\\/g, "").startsWith("tag:"));
    if(tag) {
        tag = tag.replace(/"|\\/g, "");
        player.nameTag = `§8[§r${tag.slice(4)}§8]§r ${player.name}`;
    }

    // Namespoof/A = username length check.
    if (config.modules.namespoofA.enabled) {
        // checks if 2 players are logged in with the same name
        // minecraft adds a sufix to the end of the name which we detect
        if(player.name?.endsWith(')') && (player.name?.length > config.modules.namespoofA.maxNameLength + 3 || player.name?.length < config.modules.namespoofA.minNameLength))
            player.flagNamespoofA = true;

        if(!player.name?.endsWith(')') && (player.name?.length < config.modules.namespoofA.minNameLength || player.name?.length > config.modules.namespoofA.maxNameLength))
            player.flagNamespoofA = true;
    }

    // Namespoof/B = regex check
    if (config.modules.namespoofB.enabled && config.modules.namespoofB.regex.test(player.name)) player.flagNamespoofB = true;

    // check if the player is in the global ban list
    if (banList.includes(player.name)) player.isGlobalBanned = true;
});

World.events.entityCreate.subscribe(entity => {
    if(config.modules.itemSpawnRateLimit.enabled) {
        cache.entitiesSpawnedInLastTick++;

        if(cache.entitiesSpawnedInLastTick > config.modules.itemSpawnRateLimit.entitiesBeforeRateLimit) {
            if(config.debug) console.warn(`Killed "${entity.entity.id}" due to item spawn ratelimit reached.`);
            // doing entity.entity.kill() crashes my game for whatever reason so we teleport them
            entity.entity.runCommand("tp @s ~ -200 ~");
        }
    }
    if(config.modules.commandblockexploitG.enabled) {
        if(config.modules.commandblockexploitG.entities.includes(entity.entity.id.toLowerCase())) {
            flag(getClosestPlayer(entity.entity), "CommandBlockExploit", "G", "Exploit", "entity", entity.entity.id);
            entity.entity.kill();
        }

        if(config.modules.commandblockexploitG.npc && entity.entity.id.toLowerCase() == "minecraft:npc") {
            try {
                entity.entity.runCommand("scoreboard players operation @s npc = scythe:config npc");
                entity.entity.runCommand("testfor @s[scores={npc=1..}]");
                flag(getClosestPlayer(entity.entity), "CommandBlockExploit", "G", "Exploit", "entity", entity.entity.id);
                entity.entity.kill();
            } catch {}
        }
    }
});

World.events.entityHit.subscribe(entityHit => {
    let entity = entityHit.hitEntity;
    let player = entityHit.entity;

    if(player.id !== "minecraft:player") return;

    if(entity) {
        let entityHitName = entity.nameTag || entity.id;
        
        // killaura/C = checks for multi-aura
        if(config.modules.killauraC.enabled) {
            if(!player.entitiesHit.includes(entityHitName)) {
                player.entitiesHit.push(entityHitName);
                if(player.entitiesHit.length >= config.modules.killauraC.entities) {
                    flag(player, "KillAura", "C", "Combat", "entitiesHit", player.entitiesHit.length);
                }
            }
        }

        // reach/A = check if a player hits an entity more then 4.5 block away
        if(config.modules.reachA.enabled) {
            // get the difference between 2 three dimensional coordinates
            let distance = Math.sqrt(Math.pow(entity.location.x - player.location.x, 2) + Math.pow(entity.location.y - player.location.y, 2) + Math.pow(entity.location.z - player.location.z, 2));
            if(config.debug) console.warn(`${player.name} attacked ${entityHitName} with a distance of ${distance}`);

            if(distance > config.modules.reachA.reach) {
                // we ignore gmc players as they get increased reach
                try {
                    player.runCommand("testfor @s[m=!c]");
                    flag(player, "Reach", "A", "Combat", "reach", distance);
                } catch {}
            }
        }

        // badpackets/3 = checks if a player attacks themselves
        // some (bad) hacks use this to bypass anti-movement cheat checks
        if(config.modules.badpackets3.enabled && entity === player) flag(player, "BadPackets", "3", "Exploit");
    
        // check if the player was hit with the UI item, and if so open the UI for that player
        let container = player.getComponent("inventory").container;

        if(config.customcommands.gui && entity.id == "minecraft:player" && container.getItem(player.selectedSlot)?.id == "minecraft:wooden_axe" && player.hasTag("op") && container.getItem(player.selectedSlot)?.nameTag == "§r§l§aRight click to Open the UI") {
            playerSettingsMenuSelected(player, entity);
        }
    }

     // autoclicker/a = check for high cps
     if(config.modules.autoclickerA.enabled) {
        // if anti-autoclicker is disabled in game then disable it in config.js
        if(!cache.checkedModules.autoclicker) {
            try {
                player.runCommand("testfor @s[scores={autoclicker=..0}]");
            } catch {
                config.modules.autoclickerA.enabled = false;
            }
            cache.checkedModules.autoclicker = true;
        }

        if(!player.firstAttack) player.firstAttack = new Date().getTime();
        if(!player.cps) player.cps = 0;
        player.cps++;
    }
});

World.events.beforeItemUse.subscribe((beforeItemUse) => {
    let item = beforeItemUse.item;
    let player = beforeItemUse.source;

    // GUI stuff
    if(config.customcommands.gui && item.id == "minecraft:wooden_axe" && item.nameTag == "§r§l§aRight click to Open the UI" && player.hasTag("op")) {
        mainGui(player);
        beforeItemUse.cancel = true;
    }
});