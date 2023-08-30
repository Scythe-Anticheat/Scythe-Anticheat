// @ts-check
import * as Minecraft from "@minecraft/server";

import { flag, banMessage, getClosestPlayer, getScore, setScore, getBlocksBetween, tellAllStaff } from "./util.js";
import { mainGui, playerSettingsMenuSelected } from "./features/ui.js";
import { commandHandler } from "./commands/handler.js";
import banList from "./data/globalban.js";
import config from "./data/config.js";
import data from "./data/data.js";

const world = Minecraft.world;

if(config.debug) console.warn(`${new Date().toISOString()} | Im not a ******* and this actually worked :sunglasses:`);

world.beforeEvents.chatSend.subscribe((msg) => {
	const message = msg.message.toLowerCase();
	const player = msg.sender;

	if(message.includes("the best minecraft bedrock utility mod") || message.includes("disepi/ambrosial")) msg.cancel = true;

	if(player.hasTag("isMuted")) {
		msg.cancel = true;
		player.sendMessage("§r§6[§aScythe§6]§r §a§lNOPE! §r§aYou have been muted.");
	}

	commandHandler(msg);

	if(!msg.cancel && data.chatMuted && !player.hasTag("op")) {
		player.sendMessage(config.customcommands.globalmute.showModeratorName ? `§r§6[§aScythe§6]§r Chat has been disabled by ${data.chatMuter}` : "§r§6[§aScythe§6]§r Chat has been disabled by a server admin.");
		msg.cancel = true;
	}

	if(!msg.cancel) {
		// add's user custom tags to their messages if it exists or we fall back
		// also filter for non ASCII characters and remove them in messages
		if(player.name !== player.nameTag && !config.misc_modules.filterUnicodeChat.enabled) {
			world.sendMessage(`${player.nameTag}§7:§r ${msg.message}`);
			msg.cancel = true;
		} else if(player.name === player.nameTag && config.misc_modules.filterUnicodeChat.enabled) {
			world.sendMessage(`<${player.nameTag}> ${msg.message.replace(/[^\x00-\xFF]/g, "")}`);
			msg.cancel = true;
		}
	}
});

world.afterEvents.chatSend.subscribe((msg) => {
	const player = msg.sender;

	/*
	// BadPackets[2] = checks for invalid chat message length
	if(config.modules.badpackets2.enabled && message.length > config.modules.badpackets2.maxlength || message.length < config.modules.badpackets2.minLength) flag(player, "BadPackets", "2", "Exploit", `messageLength=${message.length}`, undefined, msg);
	*/

	// Spammer/A = checks if someone sends a message while moving and on ground
	if(config.modules.spammerA.enabled && player.hasTag('moving') && player.isOnGround && !player.isJumping) {
		flag(player, "Spammer", "A", "Movement");
		return msg.sendToTargets = false;
	}

	// Spammer/B = checks if someone sends a message while swinging their hand
	if(config.modules.spammerB.enabled && player.hasTag('left') && !player.getEffect("mining_fatigue")) {
		flag(player, "Spammer", "B", "Combat");
		return msg.sendToTargets = false;
	}

	// Spammer/C = checks if someone sends a message while using an item
	if(config.modules.spammerC.enabled && player.hasTag('right')) {
		flag(player, "Spammer", "C", "Misc");
		return msg.sendToTargets = false;
	}

	// Spammer/D = checks if someone sends a message while having a GUI open
	if(config.modules.spammerD.enabled && player.hasTag('hasGUIopen')) {
		flag(player, "Spammer", "D", "Misc");
		return msg.sendToTargets = false;
	}

	if(config.modules.spammerE.enabled) {
		const lastMessageSentMS = Date.now() - player.lastMessageSent;
		if(lastMessageSentMS < config.modules.spammerE.messageRatelimit) {
			flag(player, "Spammer", "E", "Misc", `lastMessageSent=${lastMessageSentMS}`);
			msg.sendToTargets = false;

			if(config.modules.spammerE.sendWarningMessage) player.sendMessage("§r§6[§aScythe§6]§r Stop spamming! You are sending messages too fast.");
		}
		player.lastMessageSent = Date.now();
	}
});

Minecraft.system.runInterval(() => {
	if(config.misc_modules.itemSpawnRateLimit.enabled) data.entitiesSpawnedInLastTick = 0;

	// run as each player
	for(const player of world.getPlayers()) {
		try {
			const { selectedSlot } = player;

			if(player.isGlobalBanned) {
				player.addTag("by:Scythe Anticheat");
				player.addTag("reason:You are Scythe Anticheat global banned!");
				player.addTag("isBanned");
			}

			// sexy looking ban message
			if(player.hasTag("isBanned")) banMessage(player);

			if(player.blocksBroken >= 1 && config.modules.nukerA.enabled) player.blocksBroken = 0;
			if(player.entitiesHit?.length >= 1 && config.modules.killauraC.enabled) player.entitiesHit = [];
			if(Date.now() - player.startBreakTime < config.modules.autotoolA.startBreakDelay && player.lastSelectedSlot !== selectedSlot) {
				player.flagAutotoolA = true;
				player.autotoolSwitchDelay = Date.now() - player.startBreakTime;
			}

			/*
			// Crasher/A = invalid pos check
			if(config.modules.crasherA.enabled && Math.abs(player.location.x) > 30000000 ||
				Math.abs(player.location.y) > 30000000 || Math.abs(player.location.z) > 30000000)
					flag(player, "Crasher", "A", "Exploit", `x_pos=${player.location.x},y_pos=${player.location.y},z_pos=${player.location.z}`, true);
			*/

			// anti-namespoof
			// these values are set in the playerJoin event
			if(player.flagNamespoofA) {
				flag(player, "Namespoof", "A", "Exploit", `nameLength=${player.name.length}`);
				player.flagNamespoofA = false;
			}
			if(player.flagNamespoofB) {
				flag(player, "Namespoof", "B", "Exploit");
				player.flagNamespoofB = false;
			}

			// player position shit
			if(player.hasTag("moving")) {
				setScore(player, "xPos", Math.floor(player.location.x));
				setScore(player, "yPos", Math.floor(player.location.y));
				setScore(player, "zPos", Math.floor(player.location.z));
			}

			const playerVelocity = player.getVelocity();

			const playerSpeed = Number(Math.sqrt(Math.abs(playerVelocity.x**2 +playerVelocity.z**2)).toFixed(2));

			// NoSlow/A = speed limit check
			if(config.modules.noslowA.enabled && playerSpeed >= config.modules.noslowA.speed && playerSpeed <= config.modules.noslowA.maxSpeed) {
				if(player.isOnGround && !player.isJumping && !player.isGliding && !player.isGliding && !player.getEffect("speed") && player.hasTag('moving') && player.hasTag('right') && !player.hasTag("trident") && getScore(player, "right") >= 5) {
					flag(player, "NoSlow", "A", "Movement", `speed=${playerSpeed}`, true);
				}
			}

			// @ts-expect-error
			const container = player.getComponent("inventory").container;
			for(let i = 0; i < 36; i++) {
				const item = container.getItem(i);
				if(!item) continue;

				// Illegalitems/C = item stacked over 64 check
				if(config.modules.illegalitemsC.enabled && item.amount > item.maxAmount)
					flag(player, "IllegalItems", "C", "Exploit", `stack=${item.amount}`, false, undefined, i);

				// Illegalitems/D = additional item clearing check
				if(config.modules.illegalitemsD.enabled) {
					if(config.itemLists.items_very_illegal.includes(item.typeId)) flag(player, "IllegalItems", "D", "Exploit", `item=${item.typeId}`, false, undefined, i);

					// semi illegal items
					if(!player.hasTag("op")) {
						let flagPlayer = false;

						// patch element blocks
						if(config.itemLists.elements && item.typeId.startsWith("minecraft:element_"))
							flagPlayer = true;

						// patch spawn eggs
						if(item.typeId.endsWith("_spawn_egg")) {
							if(config.itemLists.spawnEggs.clearVanillaSpawnEggs && item.typeId.startsWith("minecraft:"))
								flagPlayer = true;

							if(config.itemLists.spawnEggs.clearCustomSpawnEggs && !item.typeId.startsWith("minecraft:"))
								flagPlayer = true;
						}

						if(config.itemLists.items_semi_illegal.includes(item.typeId) || flagPlayer) {
							const checkGmc = world.getPlayers({
								excludeGameModes: [Minecraft.GameMode.creative],
								name: player.name
							});

							if([...checkGmc].length !== 0) {
								flag(player, "IllegalItems", "D", "Exploit", `item=${item.typeId}`, false, undefined, i);
							}
						}
					}
				}

				// CommandBlockExploit/H = clear items
				if(config.modules.commandblockexploitH.enabled && config.itemLists.cbe_items.includes(item.typeId))
					flag(player, "CommandBlockExploit", "H", "Exploit", `item=${item.typeId}`, false, undefined, i);

				// Illegalitems/F = Checks if an item has a name longer then 32 characters
				if(config.modules.illegalitemsF.enabled && item.nameTag?.length > config.modules.illegalitemsF.length)
					flag(player, "IllegalItems", "F", "Exploit", `"name=${item.nameTag},length=${item.nameTag.length}`, false, undefined, i);

				// IllegalItems/L = check for keep on death items
				if(config.modules.illegalitemsL.enabled && item.keepOnDeath)
					flag(player, "IllegalItems", "L", "Exploit", undefined, false, undefined, i);

				// BadEnchants/D = checks if an item has a lore
				if(config.modules.badenchantsD.enabled) {
					const lore = String(item.getLore());

					if(lore && !config.modules.badenchantsD.exclusions.includes(lore)) {
						flag(player, "BadEnchants", "D", "Exploit", `lore=${lore}`, false, undefined, i);
					}
				}

				/*
					As of 1.19.30, Mojang removed all illegal items from MinecraftItemTypes, although this change
					doesn't matter, they mistakenly removed 'written_book', which can be obtained normally.
					Written books will make this code error out, and make any items that haven't been check bypass
					anti32k checks. In older versions, this error will also make certain players not get checked
					leading to a Scythe Semi-Gametest Disabler method.
				*/
				const itemType = item.type ?? Minecraft.ItemTypes.get("minecraft:book");

				if(config.misc_modules.resetItemData.enabled && config.misc_modules.resetItemData.items.includes(item.typeId)) {
					// This creates a duplicate version of the item without any attributes such as NBT.
					const item2 = new Minecraft.ItemStack(itemType, item.amount);
					container.setItem(i, item2);
				}

				if(config.modules.badenchantsA.enabled || config.modules.badenchantsB.enabled || config.modules.badenchantsC.enabled || config.modules.badenchantsE.enabled) {
					const itemEnchants = item.getComponent("enchantments").enchantments;

					const item2 = new Minecraft.ItemStack(itemType, 1);

					// @ts-expect-error
					const item2Enchants = item2.getComponent("enchantments").enchantments;
					const enchantments = [];

					const loopIterator = (iterator) => {
						const iteratorResult = iterator.next();
						if(iteratorResult.done) return;

						const enchantData = iteratorResult.value;

						// badenchants/A = checks for items with invalid enchantment levels
						if(config.modules.badenchantsA.enabled) {
							const maxLevel = config.modules.badenchantsA.levelExclusions[enchantData.type.id];

							if(typeof maxLevel === "number") {
								if(enchantData.level > maxLevel) flag(player, "BadEnchants", "A", "Exploit", `enchant=minecraft:${enchantData.type.id},level=${enchantData.level}`, false, undefined, i);
							} else if(enchantData.level > enchantData.type.maxLevel)
								flag(player, "BadEnchants", "A", "Exploit", `enchant=${enchantData.type.id},level=${enchantData.level}`, false, undefined, i);
						}

						// badenchants/B = checks for negative enchantment levels
						if(config.modules.badenchantsB.enabled && enchantData.level <= 0)
							flag(player, "BadEnchants", "B", "Exploit", `enchant=${enchantData.type.id},level=${enchantData.level}`, false, undefined, i);

						// badenchants/C = checks if an item has an enchantment which isn't support by the item
						if(config.modules.badenchantsC.enabled) {
							if(!item2Enchants.canAddEnchantment(new Minecraft.Enchantment(enchantData.type, 1))) {
								flag(player, "BadEnchants", "C", "Exploit", `item=${item.typeId},enchant=${enchantData.type.id},level=${enchantData.level}`, false, undefined, i);
							}

							if(config.modules.badenchantsB.multi_protection) {
								item2Enchants.addEnchantment(new Minecraft.Enchantment(enchantData.type, 1));

								// @ts-expect-error
								item2.getComponent("enchantments").enchantments = item2Enchants;
							}
						}

						// BadEnchants/E = checks if an item has duplicated enchantments
						if(config.modules.badenchantsE.enabled) {
							if(enchantments.includes(enchantData.type.id)) {
								flag(player, "BadEnchants", "E", "Exploit", `enchantments=${enchantments.join(", ")}`, false, undefined, i);
							}

							enchantments.push(enchantData.type.id);
						}

						loopIterator(iterator);
					};
					loopIterator(itemEnchants[Symbol.iterator]());
				}
			}

			// invalidsprint/a = checks for sprinting with the blindness effect
			if(config.modules.invalidsprintA.enabled && player.isSprinting && player.getEffect("blindness"))
				flag(player, "InvalidSprint", "A", "Movement", undefined, false, true);

			// fly/a
			if(config.modules.flyA.enabled && Math.abs(playerVelocity.y).toFixed(4) === "0.1552" && !player.isJumping && !player.isGliding && !player.hasTag("riding") && !player.hasTag("levitating") && player.hasTag("moving")) {
				const pos1 = {x: player.location.x - 2, y: player.location.y - 1, z: player.location.z - 2};
				const pos2 = {x: player.location.x + 2, y: player.location.y + 2, z: player.location.z + 2};

				const isInAir = !getBlocksBetween(pos1, pos2).some((block) => player.dimension.getBlock(block)?.typeId !== "minecraft:air");

				if(isInAir) flag(player, "Fly", "A", "Movement", `vertical_speed=${Math.abs(playerVelocity.y).toFixed(4)}`, true);
					else if(config.debug) console.warn(`${new Date().toISOString()} | ${player.name} was detected with flyA motion but was found near solid blocks.`);
			}

			if(config.modules.autoclickerA.enabled && player.cps > 0 && Date.now() - player.firstAttack >= config.modules.autoclickerA.checkCPSAfter) {
				const cps = player.cps / ((Date.now() - player.firstAttack) / 1000);

				// autoclicker/A = checks for high cps
				if(cps > config.modules.autoclickerA.maxCPS) flag(player, "Autoclicker", "A", "Combat", `cps=${cps}`);

				player.firstAttack = Date.now();
				player.cps = 0;
			}

			// BadPackets[4] = checks for invalid selected slot
			// The handler for the player hotbar packet runs a function called PlayerInventory::selectSlot. This function checks for invalid selected slot
			// thus making this check useless.
			/*
			if(config.modules.badpackets4.enabled && selectedSlot < 0 || selectedSlot > 8) {
				flag(player, "BadPackets", "4", "Exploit", `selectedSlot=${selectedSlot}`);
				player.selectedSlot = 0;
			}
			*/

			if(player.location.y < -104) player.teleport({x: player.location.x, y: -104, z: player.location.z});

			if(config.modules.flyB.enabled && player.fallDistance < -1 && !player.isSwimming && !player.isJumping &&!player.hasTag("trident") ) flag(player, "Fly", "B", "Movement", `fallDistance=${player.fallDistance}`, true);
		
			const rotation = player.getRotation();
			// Credit to the dev of Isolate Anticheat for giving me the idea of checking if a player x rotation is 60 to detect horion scaffold
			// The check was later updated to check if the x rotation or the y rotation is a flat number to further detect any other aim related hacks
			if((Number.isInteger(rotation.x) || Number.isInteger(rotation.y)) && rotation.x !== 0 && rotation.y !== 0) flag(player, "Aim", "A", "Combat", `xRot=${rotation.x},yRot=${rotation.y}`, true);
		} catch (error) {
			console.error(error, error.stack);
			if(player.hasTag("errorlogger")) tellAllStaff(`§r§6[§aScythe§6]§r There was an error while running the tick event. Please forward this message to https://discord.gg/9m9TbgJ973.\n-------------------------\n${error}\n${error.stack || "\n"}-------------------------`, ["errorlogger"]);
		}
	}
}, 0);

world.afterEvents.blockPlace.subscribe((blockPlace) => {
	const { block, player} = blockPlace;

	if(config.debug) console.warn(`${player.name} has placed ${block.typeId}. Player Tags: ${player.getTags()}`);

	// IllegalItems/H = checks for pistons that can break any block
	if(config.modules.illegalitemsH.enabled && block.typeId === "minecraft:piston" || block.typeId === "minecraft:sticky_piston") {
		const piston = block.getComponent("piston");

		// @ts-expect-error
		if(!piston.isRetracted || piston.isMoving || piston.isExpanded) {
			// @ts-expect-error
			flag(player, "IllegalItems", "H", "Exploit", `isRetracted=${piston.isRetracted},isRetracting=${piston.isRetracting},isMoving=${piston.isMoving},isExpanding=${piston.isExpanding},isExpanded=${piston.isExpanded}`, false, undefined, player.selectedSlot);
			block.setType("air");
		}
	}

	if(config.modules.illegalitemsI.enabled && config.modules.illegalitemsI.container_blocks.includes(block.typeId) && !player.hasTag("op")) {
		// @ts-expect-error
		const container = block.getComponent("inventory").container;

		let startNumber = 0;
		let didFindItems = false;
		const emptySlots = container.emptySlotsCount;
		if(container.size > 27) startNumber = container.size / 2;

		for (let i = startNumber; i < container.size; i++) {
			const item = container.getItem(i);
			if(!item) continue;

			// an item exists within the container, get fucked hacker!
			container.setItem(i, undefined);
			didFindItems = true;
		}

		if(didFindItems) {
			flag(player, "IllegalItems", "I", "Exploit", `containerBlock=${block.typeId},totalSlots=${container.size},emptySlots=${emptySlots}`, false, undefined, player.selectedSlot);
			block.setType("air");
		}
	}

	if(config.modules.illegalitemsJ.enabled && block.typeId.includes("sign")) {
		// we need to wait 1 tick before we can get the sign text
		Minecraft.system.runTimeout(() => {
			if(config.modules.illegalitemsJ.exclude_scythe_op && player.hasTag("op")) return;

			// @ts-expect-error
			const text = block.getComponent("sign").text;

			if(text.length >= 1) {
				flag(player, "IllegalItems", "J", "Exploit", `signText=${text}`, false, undefined, player.selectedSlot);
				block.setType("air");
			}
		}, 1);
	}

	/*
	if(config.modules.commandblockexploitH.enabled && block.typeId === "minecraft:hopper") {
		const pos1 = {x: block.location.x + 2, y: block.location.y + 2, z: block.location.z + 2};
		const pos2 = {x: block.location.x - 2, y: block.location.y - 2, z: block.location.z - 2};

		let foundDispenser = false;
		pos1.blocksBetween(pos2).some((block) => {
			const blockType = player.dimension.getBlock(block);
			// @ts-expect-error
			if(blockType.typeId !== "minecraft:dispenser") return;

			// @ts-expect-error
			blockType.setType(Minecraft.MinecraftBlockTypes.air);
			foundDispenser = true;
		});

		if(foundDispenser) {
			// @ts-expect-error
			player.dimension.getBlock({x:block.location.x, y: block.location.y, z: block.location.z}).setType(Minecraft.MinecraftBlockTypes.air);
		}
	}
	*/

	if(config.modules.towerA.enabled) {
		// get block under player
		const blockUnder = player.dimension.getBlock({x: Math.floor(player.location.x), y: Math.floor(player.location.y) - 1, z: Math.floor(player.location.z)});

		// @ts-expect-error
		if(!player.isFlying && player.isJumping && blockUnder.location.x === block.location.x && blockUnder.location.y === block.location.y && blockUnder.location.z === block.location.z && !player.getEffect("jump_boost") && !block.typeId.includes("fence") && !block.typeId.includes("wall")) {
			const yPosDiff = player.location.y - Math.floor(Math.abs(player.location.y));

			if(yPosDiff > config.modules.towerA.max_y_pos_diff) {
				const checkGmc = world.getPlayers({
					excludeGameModes: [Minecraft.GameMode.creative],
					name: player.name
				});

				if([...checkGmc].length > 0) {
					flag(player, "Tower", "A", "World", `yPosDiff=${yPosDiff},block=${block.typeId}`, true);
					block.setType("air");
				}
			}
		}
	}

	if(config.modules.illegalitemsN.enabled && block.typeId.includes("shulker_box")) {
		// @ts-expect-error
		const container = block.getComponent("inventory").container;

		const illegalItems = [];

		for (let i = 0; i < 27; i++) {
			const item = container.getItem(i);
			if(!item) continue;

			if(config.itemLists.items_very_illegal.includes(item.typeId) || config.itemLists.cbe_items.includes(item.typeId)) illegalItems.push(illegalItems);
		}

		if(illegalItems.length >= 1) {
			flag(player, "IllegalItems", "N", "Exploit", `items_count=${illegalItems.length}`, false, undefined, player.selectedSlot);
			block.setType("air");
		}
	}
});

world.afterEvents.blockBreak.subscribe((blockBreak) => {
	const brokenBlockId = blockBreak.brokenBlockPermutation.type.id;
	const { player, dimension, block } = blockBreak;

	let revertBlock = false;

	if(config.debug) console.warn(`${player.name} has broken the block ${brokenBlockId}`);

	// nuker/a = checks if a player breaks more than 3 blocks in a tick
	if(config.modules.nukerA.enabled) {
		player.blocksBroken++;

		if(player.blocksBroken > config.modules.nukerA.maxBlocks) {
			revertBlock = true;
			flag(player, "Nuker", "A", "Misc", `blocksBroken=${player.blocksBroken}`);
		}
	}

	// Autotool/A = checks for player slot mismatch
	if(config.modules.autotoolA.enabled && player.flagAutotoolA) {
		revertBlock = true;
		flag(player, "AutoTool", "A", "Misc", `selectedSlot=${player.selectedSlot},lastSelectedSlot=${player.lastSelectedSlot},switchDelay=${player.autotoolSwitchDelay}`);
	}

	/*
		InstaBreak/A = checks if a player in survival breaks an unbreakable block
		While the InstaBreak method used in Horion and Zephyr are patched, there are still some bypasses
		that can be used
	*/
	if(config.modules.instabreakA.enabled && config.modules.instabreakA.unbreakable_blocks.includes(brokenBlockId)) {
		const checkGmc = world.getPlayers({
			excludeGameModes: [Minecraft.GameMode.creative],
			name: player.name
		});

		if([...checkGmc].length !== 0) {
			revertBlock = true;
			flag(player, "InstaBreak", "A", "Exploit", `block=${brokenBlockId}`);
		}
	}

	if(config.modules.xrayA.enabled && config.itemLists.xray_items.includes(brokenBlockId) && !player.hasTag("op")) {
		flag(player, "Xray", "A", "Misc", `block=${brokenBlockId}`);
		revertBlock = true;
	}

	if(revertBlock) {
		// kill the items dropped items
		const droppedItems = dimension.getEntities({
			location:{x: block.location.x, y: block.location.y, z: block.location.z},
			minDistance: 0,
			maxDistance: 2,
			type: "item"
		});

		for(const item of droppedItems) item.kill();

		block.setPermutation(blockBreak.brokenBlockPermutation);
	}
});

/*
world.afterEvents.beforeItemUseOn.subscribe((beforeItemUseOn) => {
	const player = beforeItemUseOn.source;
	const item = beforeItemUseOn.itemStack;

	// commandblockexploit/f = cancels the placement of cbe items
	if(config.modules.commandblockexploitF.enabled && config.itemLists.cbe_items.includes(item.typeId)) {
		flag(player, "CommandBlockExploit","F", "Exploit", `block=${item.typeId}`, false, undefined, player.selectedSlot);
		beforeItemUseOn.cancel = true;
	}

	/*
		illegalitems/e = cancels the placement of illegal items
		illegalitems/a could be bypassed by using a right click autoclicker/autobuild or lag
		thx drib or matrix_code for telling me lol

	if(config.modules.illegalitemsE.enabled) {
		// items that are obtainable using commands
		if(!player.hasTag("op")) {
			let flagPlayer = false;

			// patch element blocks
			if(config.itemLists.elements && item.typeId.startsWith("minecraft:element_"))
				flagPlayer = true;

			// patch spawn eggs
			if(item.typeId.endsWith("_spawn_egg")) {
				if(config.itemLists.spawnEggs.clearVanillaSpawnEggs && item.typeId.startsWith("minecraft:"))
					flagPlayer = true;

				if(config.itemLists.spawnEggs.clearCustomSpawnEggs && !item.typeId.startsWith("minecraft:"))
					flagPlayer = true;
			}

			if(config.itemLists.items_semi_illegal.includes(item.typeId) || flagPlayer) {
				const checkGmc = world.getPlayers({
					excludeGameModes: [Minecraft.GameMode.creative],
					name: player.name
				});

				if([...checkGmc].length !== 0) {
					flag(player, "IllegalItems", "E", "Exploit", `block=${item.typeId}`, false, undefined, player.selectedSlot);
					beforeItemUseOn.cancel = true;
				}
			}
		}

		// items that cannot be obtained normally
		if(config.itemLists.items_very_illegal.includes(item.typeId)) {
			flag(player, "IllegalItems", "E", "Exploit", `item=${item.typeId}`, false, undefined, player.selectedSlot);
			beforeItemUseOn.cancel = true;
		}
	}

	if(player.hasTag("freeze")) beforeItemUseOn.cancel = true;
});
*/

world.afterEvents.playerSpawn.subscribe((playerJoin) => {
	const { initialSpawn, player } = playerJoin;
	if(!initialSpawn) return;

	// declare all needed variables in player
	if(config.modules.nukerA.enabled) player.blocksBroken = 0;
	if(config.modules.autoclickerA.enabled) {
		player.firstAttack = Date.now();
		player.cps = 0;
	}
	if(config.modules.fastuseA.enabled) player.lastThrow = Date.now();
	if(config.modules.killauraC.enabled) player.entitiesHit = [];
	if(config.modules.spammerE.enabled) player.lastMessageSent = Date.now();
	if(config.customcommands.report.enabled) player.reports = [];

	if(!data.loaded) {
		player.runCommandAsync("scoreboard players set scythe:config gametestapi 1");
		data.loaded = true;
	}

	// remove tags
	player.removeTag("attack");
	player.removeTag("hasGUIopen");
	player.removeTag("right");
	player.removeTag("left");
	player.removeTag("ground");
	player.removeTag("gliding");
	player.removeTag("sprinting");
	player.removeTag("moving");
	player.removeTag("sleeping");

	// fix a disabler method
	player.nameTag = player.nameTag.replace(/[^A-Za-z0-9_\-() ]/gm, "").trim();

	// load custom nametag
	const { mainColor, borderColor, playerNameColor } = config.customcommands.tag;

	for(const tag of player.getTags()) {
		if(!tag.startsWith("tag:")) continue;

		player.nameTag = `${borderColor}[§r${mainColor}${tag.slice(4)}${borderColor}]§r ${playerNameColor}${player.nameTag}`;
		break;
	}

	// Namespoof/A = username length check.
	if(config.modules.namespoofA.enabled) {
		// checks if 2 players are logged in with the same name
		// minecraft adds a suffix to the end of the name which we detect
		if(player.name.endsWith(")") && (player.name.length > config.modules.namespoofA.maxNameLength + 3 || player.name.length < config.modules.namespoofA.minNameLength))
			player.flagNamespoofA = true;

		if(!player.name.endsWith(")") && (player.name.length < config.modules.namespoofA.minNameLength || player.name.length > config.modules.namespoofA.maxNameLength))
			player.flagNamespoofA = true;

		if(player.flagNamespoofA) {
			const extraLength = player.name.length - config.modules.namespoofA.maxNameLength;
			player.nameTag = player.name.slice(0, -extraLength) + "...";
		}
	}

	// Namespoof/B = regex check
	if(config.modules.namespoofB.enabled && config.modules.namespoofB.regex.test(player.name))
		player.flagNamespoofB = true;

	// check if the player is in the global ban list
	if(banList.includes(player.name.toLowerCase())) player.isGlobalBanned = true;

	if(data.chatMuted && player.hasTag("op")) player.sendMessage(`§r§6[§aScythe§6]§r NOTE: Chat has been currently disabled by ${data.chatMuter}. Chat can be re-enabled by running the !globalmute command.`);

	if(config.misc_modules.welcomeMessage.enabled) player.sendMessage(config.misc_modules.welcomeMessage.message.replace(/\[@player]/g, player.name));
});

world.afterEvents.entitySpawn.subscribe((entitySpawn) => {
	const { entity } = entitySpawn;

	// If the entity dies right before this event triggers, an error will be thrown if any property is accessed
	// This fixes that
	if(!entity.isValid()) return;

	if(config.misc_modules.itemSpawnRateLimit.enabled) {
		data.entitiesSpawnedInLastTick++;

		if(data.entitiesSpawnedInLastTick > config.misc_modules.itemSpawnRateLimit.entitiesBeforeRateLimit) {
			if(config.debug) console.warn(`Killed "${entity.typeId}" due to entity spawn ratelimit reached.`);
			entity.kill();
		}
	}

	if(config.modules.commandblockexploitG.enabled) {
		if(config.modules.commandblockexploitG.entities.includes(entity.typeId.toLowerCase())) {
			flag(getClosestPlayer(entity), "CommandBlockExploit", "G", "Exploit", `entity=${entity.typeId}`);
			entity.kill();
		} else if(config.modules.commandblockexploitG.npc && entity.typeId === "minecraft:npc") {
			entity.runCommandAsync("scoreboard players operation @s npc = scythe:config npc");
			entity.runCommandAsync("testfor @s[scores={npc=1..}]")
				.then((commandResult) => {
					if(commandResult.successCount < 1) return;
					flag(getClosestPlayer(entity), "CommandBlockExploit", "G", "Exploit", `entity=${entity.typeId}`);
					entity.kill();
				});
		}

		/*
		if(config.modules.commandblockexploitG.blockSummonCheck.includes(entity.typeId)) {
			const pos1 = {x: entity.location.x + 2, y: entity.location.y + 2, z: entity.location.z + 2};
			const pos2 = {x: entity.location.x - 2, y: entity.location.y - 2, z: entity.location.z - 2};

			pos1.blocksBetween(pos2).some((block) => {
				const blockType = block.dimension.getBlock(block);
				if(!config.modules.commandblockexploitG.blockSummonCheck.includes(blockType.typeId)) return;

				blockType.setType(Minecraft.MinecraftBlockTypes.air);
				entity.kill();
			});
		}
		*/
	}

	if(entity.typeId === "minecraft:item") {
		// @ts-expect-error
		const item = entity.getComponent("item").itemStack;

		if(config.modules.illegalitemsB.enabled && (
			config.itemLists.items_very_illegal.includes(item.typeId) ||
			config.itemLists.items_semi_illegal.includes(item.typeId) ||
			config.itemLists.cbe_items.includes(item.typeId))
		) entity.kill();
	}

	// IllegalItems/K = checks if a player places a chest boat with items already inside it
	if(config.modules.illegalitemsK.enabled && config.modules.illegalitemsK.entities.includes(entity.typeId)) {
		Minecraft.system.runTimeout(() => {
			const player = getClosestPlayer(entity);
			if(!player) return;

			if(config.modules.illegalitemsK.exclude_scythe_op && player.hasTag("op")) return;

			// @ts-expect-error
			const container = entity.getComponent("inventory").container;

			if(container.size !== container.emptySlotsCount) {
				for (let i = 0; i < container.size; i++) {
					container.setItem(i, undefined);
				}

				flag(player, "IllegalItems", "K", "Exploit", `totalSlots=${container.size},emptySlots=${container.emptySlotsCount}`, false, undefined, player.selectedSlot);
				entity.kill();
			}
		}, 1);
	}

	if(config.misc_modules.antiArmorStandCluster.enabled && entity.typeId === "minecraft:armor_stand") {
		const entities = [...entity.dimension.getEntities({
			location: {x: entity.location.x, y: entity.location.y, z: entity.location.z},
			maxDistance: config.misc_modules.antiArmorStandCluster.radius,
			type: "armor_stand"
		})];

		if(entities.length > config.misc_modules.antiArmorStandCluster.max_armor_stand_count) {
			tellAllStaff(`§r§6[§aScythe§6]§r Potential lag machine detected at X: ${entity.location.x}, Y: ${entity.location.y}, Z: ${entity.location.z}. There are ${entities.length}/${config.misc_modules.antiArmorStandCluster.max_armor_stand_count} armor stands in this area.`, ["notify"]);

			for(const entityLoop of entities) {
				entityLoop.kill();
			}
		}
	}
});

world.afterEvents.entityHitEntity.subscribe((entityHit) => {
	const { hitEntity: entity, damagingEntity: player} = entityHit;

	if(player.typeId !== "minecraft:player") return;

	// killaura/C = checks for multi-aura
	if(config.modules.killauraC.enabled && !player.entitiesHit.includes(entity.id)) {
		player.entitiesHit.push(entity.id);

		if(player.entitiesHit.length >= config.modules.killauraC.entities) {
			flag(player, "KillAura", "C", "Combat", `entitiesHit=${player.entitiesHit.length}`);
		}
	}

	// reach/A = check if a player hits an entity more then 5.1 blocks away
	if(config.modules.reachA.enabled) {
		// get the difference between 2 three dimensional coordinates
		const distance = Math.sqrt(Math.pow(entity.location.x - player.location.x, 2) + Math.pow(entity.location.y - player.location.y, 2) + Math.pow(entity.location.z - player.location.z, 2));
		if(config.debug) console.warn(`${player.name} attacked ${entity.nameTag ?? entity.typeId} with a distance of ${distance}`);

		if(distance > config.modules.reachA.reach && entity.typeId.startsWith("minecraft:") && !config.modules.reachA.entities_blacklist.includes(entity.typeId)) {
			const checkGmc = world.getPlayers({
				excludeGameModes: [Minecraft.GameMode.creative],
				name: player.name
			});

			if([...checkGmc].length !== 0)
				flag(player, "Reach", "A", "Combat", `entity=${entity.typeId},distance=${distance}`);
		}
	}

	// badpackets[3] = checks if a player attacks themselves
	// some (bad) hacks use this to bypass anti-movement cheat checks
	if(config.modules.badpackets3.enabled && entity.id === player.id) flag(player, "BadPackets", "3", "Exploit");

	// check if the player was hit with the UI item, and if so open the UI for that player
	if(config.customcommands.ui.enabled && player.hasTag("op") && entity.typeId === "minecraft:player") {
		// @ts-expect-error
		const container = player.getComponent("inventory").container;

		const item = container.getItem(player.selectedSlot);
		if(item?.typeId === config.customcommands.ui.ui_item && item?.nameTag === config.customcommands.ui.ui_item_name) {
			playerSettingsMenuSelected(player, entity);
		}
	}

	// autoclicker/a = check for high cps. The rest of the handling is in the tick event
	if(config.modules.autoclickerA.enabled) player.cps++;

	// Check if the player attacks an entity while sleeping
	if(config.modules.killauraD.enabled && player.hasTag("sleeping")) {
		flag(player, "Killaura", "D", "Combat");
	}

	if(config.debug) console.warn(player.getTags());
});

world.afterEvents.entityHitBlock.subscribe((entityHit) => {
	const { damagingEntity: player} = entityHit;

	player.flagAutotoolA = false;
	player.lastSelectedSlot = player.selectedSlot;
	player.startBreakTime = Date.now();
	player.autotoolSwitchDelay = 0;
});

world.beforeEvents.itemUse.subscribe((itemUse) => {
	const { source: player } = itemUse;

	if(player.typeId !== "minecraft:player") return;

	if(config.modules.fastuseA.enabled) {
		const lastThrowTime = Date.now() - player.lastThrow;
		if(lastThrowTime > config.modules.fastuseA.min_use_delay && lastThrowTime < config.modules.fastuseA.max_use_delay) {
			// flag(player, "FastUse", "A", "Combat", `lastThrowTime=${lastThrowTime}`);
			itemUse.cancel = true;
		}
		player.lastThrow = Date.now();
	}

	// patch bypasses for the freeze system
	if(player.hasTag("freeze")) itemUse.cancel = true;
});

world.afterEvents.itemUse.subscribe((itemUse) => {
	const { itemStack: item, source: player } = itemUse;

	// itemUse can be triggered from entities
	if(player.typeId !== "minecraft:player") return;

	if(config.customcommands.ui.enabled && item.typeId === config.customcommands.ui.ui_item && item.nameTag === config.customcommands.ui.ui_item_name && player.hasTag("op")) {
		mainGui(player);
	}
});

Minecraft.system.beforeEvents.watchdogTerminate.subscribe((watchdogTerminate) => {
	// We try to stop any watchdog crashes incase malicious users try to make the scripts lag
	// and causing the server to crash
	watchdogTerminate.cancel = true;

	console.warn(`${new Date().toISOString()} | A Watchdog Exception has been detected and has been cancelled successfully. Reason: ${watchdogTerminate.terminateReason}`);
});

// when using /reload, the variables defined in playerJoin don't persist
if([...world.getPlayers()].length >= 1) {
	for(const player of world.getPlayers()) {
		if(config.modules.nukerA.enabled) player.blocksBroken = 0;
		if(config.modules.autoclickerA.enabled) {
			player.firstAttack = Date.now();
			player.cps = 0;
		}
		if(config.modules.fastuseA.enabled) player.lastThrow = Date.now() - 200;
		if(config.modules.killauraC.enabled) player.entitiesHit = [];
		if(config.modules.spammerE.enabled) player.lastMessageSent = Date.now();
		if(config.customcommands.report.enabled) player.reports = [];
	}
}