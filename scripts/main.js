// @ts-check
import config from "./data/config.js";
import { world, system, Player, EquipmentSlot, GameMode } from "@minecraft/server";
import { flag, tellAllStaff } from "./util.js";
import { banMessage } from "./assets/ban.js";
import { mainGui, playerSettingsMenuSelected } from "./assets/ui.js";
import { commandHandler } from "./commands/handler.js";

world.beforeEvents.chatSend.subscribe((msg) => {
	const { sender: player, message } = msg;

	if(player.isMuted()) {
		player.sendMessage("§r§6[§aScythe§6]§r §a§lNOPE! §r§aYou have been muted.");
		msg.cancel = true;
	}

	commandHandler(msg);

	// @ts-expect-error
	const globalmute = JSON.parse(world.getDynamicProperty("globalmute"));
	if(!msg.cancel && globalmute.muted && !player.hasTag("op")) {
		player.sendMessage(`§r§6[§aScythe§6]§r Chat has been disabled by ${config.customcommands.globalmute.showModeratorName ? globalmute.muter : "a server admin"}.`);
		msg.cancel = true;
	}

	if(config.misc_modules.antiSpam.enabled && !player.hasTag("op")) {
		const now = Date.now();

		const messageDelay = now - player.lastMessageSent;
		if(messageDelay < config.misc_modules.antiSpam.messageRatelimit) {
			tellAllStaff(`§o§7<${player.name}> ${message}\n§r§6[§aScythe§6]§r ${player.name}'s message has been blocked due to spam. (delay=${messageDelay})`, ["notify"]);

			player.sendMessage("§r§6[§aScythe§6]§r Stop spamming! You are sending messages too fast.");
			msg.cancel = true;
		}

		player.lastMessageSent = now;
	}

	// Run if the player has a custom nametag or filter unicode chat is enabled
	if(!msg.cancel && (player.name !== player.nameTag || config.misc_modules.filterUnicodeChat.enabled)) {
		// Adds user custom tags to their messages and filter any non-ASCII characters
		const playerTag = player.name !== player.nameTag ? `${player.nameTag}§7:§r` : `<${player.nameTag}>`;
		const newMsg = config.misc_modules.filterUnicodeChat.enabled ? message.replace(/[^\x00-\xFF]/g, "") : message;

		world.sendMessage(`${playerTag} ${newMsg}`);
		msg.cancel = true;
	}
});

system.runInterval(() => {
	const now = Date.now();

	// Run as each player
	const players = world.getPlayers();
	// Oddly enough, this method of looping over all online player's is slightly more efficient than `for(const player of players)`
	for(let i = 0; i < players.length; i++) {
		const player = players[i];

		try {
			// --- Prerequisite variables that are used by checks later on ---
			player.velocity = player.getVelocity();
			player.rotation = player.getRotation();

			// Find the magnitude of the velocity vector
			const playerSpeed = Math.sqrt(player.velocity.x**2 + player.velocity.z**2);

			// Get the item that the player is holding in their cursor
			const cursorItem = player.getComponent("cursor_inventory")?.item;

			// Get the item in the player's offhand
			const offhandItem = player.getComponent("equippable")?.getEquipment(EquipmentSlot.Offhand);

			if(config.modules.nukerA.enabled && player.blocksBroken >= 1) player.blocksBroken = 0;
			if(config.modules.killauraC.enabled && player.entitiesHit.size >= 1) player.entitiesHit.clear();
			if(config.modules.autotoolA.enabled && now - player.startBreakTime < config.modules.autotoolA.startBreakDelay && player.lastSelectedSlot !== player.selectedSlotIndex) {
				player.flagAutotoolA = true;
				player.autotoolSwitchDelay = now - player.startBreakTime;
			}

			/*
			// Crasher/A = Invalid position check check
			// Horion's old crasher would teleport the player to the position 4,294.967,295 in each coordinate plane
			// This would result in the server crashing as it does not support such large player positions
			// The vanilla game has a border at 30,000,000 which cannot be passed normally, even with commands like /tp
			// If the player goes beyond that coordinate value, then we know an exploit, most likely Crasher, was being used
			if(
				config.modules.crasherA.enabled &&
				Math.abs(player.location.x) > 30000000 ||
				Math.abs(player.location.y) > 30000000 ||
				Math.abs(player.location.z) > 30000000
			) flag(player, "Crasher", "A", "Exploit", `x_pos=${player.location.x},y_pos=${player.location.y},z_pos=${player.location.z}`, true);
			*/

			/*
			A player's pitch has a range of -90 to 90, and the player's yaw has a range of -180 to 180
			There are some cheats and crash methods that make the player exceed these vanilla limits, which we can detect

			In a vanilla game, it is possible to to exceed this limit by using Full Desktop Gameplay and using the arrow keys to move your camera
			This will result in the player's pitch going beyond these limits, with a magnitude that is proportional to the rotation speed
			The Scripting API does not allow us to determine if this option is enabled, so there is no way to fix this false positive

			This check has a long history in Scythe. It was originally added somewhere in August 2020 ~ 2021, before the anticheat was public, as a function-based check
			In July 2022, this check was ported to use the Scripting API, however there was a bug where using boats would make the player's viewing angles exceed the limit by an absurd value
			It was reintroduced as a Scripting API after it was confirmed that the issue is no longer present
			*/
			if(
				config.modules.badpackets1.enabled &&
				(Math.abs(player.rotation.x) > 90 || Math.abs(player.rotation.y) > 180)
			) {
				flag(player, "BadPackets", "1", "Exploit", `xRot=${player.rotation.x},yRot=${player.rotation.y}`, true);
			}

			// NoSlow/A = Speed limit check
			if(
				config.modules.noslowA.enabled &&
				playerSpeed >= config.modules.noslowA.speed &&
				playerSpeed <= config.modules.noslowA.maxSpeed &&
				player.isOnGround &&
				!player.isJumping &&
				!player.isGliding &&
				player.heldItem !== "minecraft:trident" &&
				player.isUsingItem &&
				// Make sure the player has been using the item for at least 10 ticks
				now - player.itemUsedAt >= 500 &&
				player.isUsingInputKeys() &&
				!player.getEffect("speed") &&
				!player.hasTag("riding")
			) {
				const blockBelow = player.dimension.getBlock({x: player.location.x, y: player.location.y - 1, z: player.location.z});

				// Make sure there are no entities below the player to fix false positives with boats
				const nearbyEntities = player.dimension.getEntitiesAtBlockLocation(player.location);

				if(blockBelow && !nearbyEntities.find(entity => entity instanceof Player) && !blockBelow.typeId.includes("ice")) {
					flag(player, "NoSlow", "A", "Movement", `speed=${playerSpeed.toFixed(2)},heldItem=${player.heldItem},blockBelow=${blockBelow.typeId},timeUsingItem=${now - player.itemUsedAt}`, true);
				}
			}

			// Check if the player just started sprinting
			if(!player.lastSprintState && player.isSprinting) {
				/*
				InvalidSprint/A = Checks if a player sprints while they have the Blindness effect
				InvalidSprint/B = Checks if a player sprints while using an item
				InvalidSprint/C = Checks if a player sprints while sneaking
				InvalidSprint/D = Checks if a player sprints while using an elytra
				InvalidSprint/F = Checks if a player sprints while they do not have enough hunger
				*/

				if(config.modules.invalidsprintA.enabled && player.getEffect("blindness")) flag(player, "InvalidSprint", "A", "Movement", undefined, true);

				// This module is disabled due to false flags
				// When the player is about to finish eating food, the game makes the player sprint right before the player finishes eating
				if(
					config.modules.invalidsprintB.enabled &&
					player.isUsingItem &&
					// If a player uses a riptide trident, they will sprint right before the item is considered as not used
					player.heldItem !== "minecraft:trident" &&
					// Make sure the player has been using the item for at least four ticks
					now - player.itemUsedAt >= 200
				) flag(player, "InvalidSprint", "B", "Movement", `itemUsedFor=${now - player.itemUsedAt}`, true);

				if(
					config.modules.invalidsprintC.enabled &&
					player.isSneaking &&
					player.gamemode !== GameMode.Creative &&
					!player.isFlying
				) flag(player, "InvalidSprint", "C", "Movement", undefined, true);

				// This module is disabled due to false flags
				// If you press the W and CTRL button at the same time, the client makes you sprint while gliding
				if(config.modules.invalidsprintD.enabled && player.isGliding) flag(player, "InvalidSprint", "D", "Movement", undefined, true);

				if(
					config.modules.invalidsprintE.enabled &&
					player.isUsingInputKeys() &&
					player.hasTag("riding") &&
					// Make sure the player hasn't moved within the last four ticks (4 * 50)
					now - player.movedAt > 200
				) flag(player, "InvalidSprint", "E", "Movement", undefined, true);

				if(config.modules.invalidsprintF.enabled) {
					// Fallback incase the property is undefined
					const hunger = player.getComponent("player.hunger") ?? { currentValue: 20 };

					if(hunger.currentValue <= 6) flag(player, "InvalidSprint", "F", "Movement", `hunger=${hunger.currentValue}`, true);
				}
			}

			/*
			The Minecraft world has an invisible barrier at Y level -104 that is impossible to pass through.
			Using TP hacks or glitches, it is possible to go beyond that barrier
			Scythe automatically teleports the player back up if they ever go beyond it
			*/
			if(player.location.y < -104) player.tryTeleport({x: player.location.x, y: -104, z: player.location.z});

			// InventoryMods/B = Check if a player changes the item they are holding in their cursor slot while moving
			if(
				config.modules.inventorymodsB.enabled &&
				player.lastCursorItem?.typeId !== cursorItem?.typeId &&
				player.isUsingInputKeys()
			) flag(player, "InventoryMods", "B", "Inventory", `oldItem=${player.lastCursorItem?.typeId},newItem=${cursorItem?.typeId}`, true);

			// Check if an item was equipped to the offhand
			if(!player.lastOffhandItem && offhandItem) {
				// AutoOffhand/A = Checks if a player equips an item in their offhand while moving
				if(
					config.modules.autooffhandA.enabled &&
					player.isUsingInputKeys()
				) flag(player, "AutoOffhand", "A", "Inventory", `item=${offhandItem?.typeId}`, true);

				// AutoOffhand/B = Checks if a player equips an item in their offhand while using an item
				if(
					config.modules.autooffhandB.enabled &&
					player.isUsingItem
				) flag(player, "AutoOffhand", "B", "Inventory", `item=${offhandItem?.typeId}`);

				// AutoOffhand/C = Checks if a player equips an item in their offhand while swinging their hand
				if(
					config.modules.autooffhandC.enabled &&
					player.hasTag("left")
				) flag(player, "AutoOffhand", "C", "Inventory", `item=${offhandItem?.typeId}`);
			}

			if(config.misc_modules.worldborder.enabled && (Math.abs(player.location.x) > config.misc_modules.worldborder.max_x || Math.abs(player.location.z) > config.misc_modules.worldborder.max_z) && !player.hasTag("op")) {
				player.tryTeleport({
					x: player.location.x - (player.location.x >= 0 ? 1 : -1),
					y: player.location.y,
					z: player.location.z - (player.location.z >= 0 ? 1 : -1)
				}, {
					checkForBlocks: false
				});

				player.sendMessage("§r§6[§aScythe§6]§r You have reached the world border.");
			}

			if(player.getDynamicProperty("vanished")) player.onScreenDisplay.setActionBar("§aYOU ARE VANISHED!");

			player.lastCursorItem = cursorItem;
			player.lastOffhandItem = offhandItem;

			// Store the players last good position
			// When a movement-related check flags the player, they will be teleported to this position
			// xRot and yRot being 0 means the player position was modified from player.teleport, which we should ignore
			if(player.rotation.x !== 0 && player.rotation.y !== 0) player.lastGoodPosition = player.location;

			player.lastSprintState = player.isSprinting;
		} catch (error) {
			console.error(error.stack);
			if(player.hasTag("errorlogger")) tellAllStaff(`§r§6[§aScythe§6]§r There was an error while running the tick event. Please forward this message to https://discord.gg/9m9TbgJ973.\n-------------------------\n${error}\n${error.stack || "\n"}-------------------------`, ["errorlogger"]);
		}
	}
}, 1);

world.afterEvents.playerPlaceBlock.subscribe(({ block, player }) => {
	if(config.debug) console.warn(`${player.name} has placed ${block.typeId}`);

	// Reach/C = Checks if a player places a block farther than normally possible.
	if(config.modules.reachC.enabled) {
		// Use the Euclidean Distance Formula to determine the distance between two 3-dimensional objects
		const distance = Math.sqrt(
			(block.location.x - player.location.x)**2 +
			(block.location.y - player.location.y)**2 +
			(block.location.z - player.location.z)**2
		);

		if(config.debug) console.log(distance);

		const maxPlaceDistance = player.getMaxBlockPlaceDistance();

		if(distance > maxPlaceDistance) flag(player, "Reach", "C", "World", `distance=${distance},gamemode=${player.gamemode},inputMode=${player.inputInfo.lastInputModeUsed}`);
	}

	// Get block underneath the player
	const blockUnder = player.dimension.getBlock({x: Math.trunc(player.location.x), y: Math.trunc(player.location.y) - 1, z: Math.trunc(player.location.z)});

	/*
	Scaffold/A = Check for Tower-like behavior
	The tower module in hack clients allows a player to quickly build up
	When building up in a vanilla game, you place blocks while the decimal portion of the Y value is less than 35
	Tower modules in hack clients place blocks while the decimal portion of the Y value is greater than that value
	*/
	if(
		config.modules.scaffoldA.enabled &&
		blockUnder &&
		block.location.x === blockUnder.location.x &&
		block.location.y === blockUnder.location.y &&
		block.location.z === blockUnder.location.z &&
		!player.isFlying &&
		player.gamemode !== GameMode.Creative &&
		player.isJumping &&
		player.isFalling &&
		!player.getEffect("jump_boost") &&
		// Fence and wall blocks have a bigger Y hitbox
		!block.typeId.includes("fence") &&
		!block.typeId.includes("wall") &&
		// Standing on a shulker box and opening it pushes the player upwards
		!block.typeId.includes("_shulker_box")
	) {
		// Get the decimal portion of the Y position
		const yDecimal = Math.abs(player.location.y % 1);

		if(yDecimal > config.modules.scaffoldA.max_y_pos_diff) {
			flag(player, "Scaffold", "A", "World", `yPosDiff=${yDecimal},block=${block.typeId}`, true);
			block.setType("air");
		}
	}

	/*
	Scaffold/B = Checks for a flat X/Y rotations
	A way to detect scaffold is if the player is in view of the block they placed. Hack client owners know this, so an option to make the player aim at the placed block was added to these clients
	The problem however is some hack clients poorly implemented this workaround by setting the player's rotation to a flat XY value, which is impossible in vanilla gameplay

	This check was donated to me by the developer of Isolate Anticheat
	*/
	if(config.modules.scaffoldB.enabled && ((Number.isInteger(player.rotation.x) && player.rotation.x !== 0) || (Number.isInteger(player.rotation.y) && player.rotation.y !== 0))) {
		flag(player, "Scaffold", "B", "World", `xRot=${player.rotation.x},yRot=${player.rotation.y}`, true);
		block.setType("air");
	}

	// Scaffold/C = Check if a player placed a block under them whilst looking up
	// Make sure the players's y location is greater than the block placed's y location.
	if(
		config.modules.scaffoldC.enabled &&
		Math.trunc(player.location.y) > block.location.y &&
		player.rotation.x < config.modules.scaffoldC.min_x_rot &&
		!player.isSwimming &&
		block.isSolid &&
		!player.hasTag("riding")
	) {
		flag(player, "Scaffold", "C", "World", `xRot=${player.rotation.x},yPosPlayer=${player.location.y},yPosBlock=${block.location.y}`);
		block.setType("air");
	}

	// Scaffold/D = Check for downwards scaffold
	// This checks if a player places a block under the block they are currently standing on
	if(
		config.modules.scaffoldD.enabled &&
		blockUnder?.isSolid &&
		Math.trunc(player.location.x) === block.location.x &&
		Math.trunc(player.location.y) - 2 === block.location.y &&
		Math.trunc(player.location.z) === block.location.z
	) {
		flag(player, "Scaffold", "D", "World", `playerYpos=${player.location.y},blockXpos=${block.location.x},blockYpos=${block.location.y},blockZpos=${block.location.z}`);
		block.setType("air");
	}

	// Scaffold/E = Checks for placing blocks onto air or liquid tiles
	if(config.modules.scaffoldE.enabled) {
		const surroundingBlocks = [
			block.above(),
			block.below(),
			block.north(),
			block.east(),
			block.south(),
			block.west()
		];

		const validBlockPlace = surroundingBlocks.some(adjacentBlock =>
			// Check if block is valid
			adjacentBlock &&
			// Check if there is a nearby block that isn't air
			!adjacentBlock.isAir &&
			// Check if there is a nearby block that isn't a liquid and that the placed block isn't a lilypad
			(!adjacentBlock.isLiquid || block.typeId == "minecraft:waterlily")
		);

		if(!validBlockPlace) {
			flag(player, "Scaffold", "E", "World", `block=${block.typeId}`);
			block.setType("air");
		}
	}
});

world.beforeEvents.playerBreakBlock.subscribe((data) => {
	const { player, block } = data;

	if(config.debug) console.warn(`${player.name} has broken the block ${block.typeId}`);

	/*
	AutoTool/A = Checks for player slot mismatch

	When you mine a block with Horion's autotool, it starts mining the block without switching the item you're holding until 30-100ms later
	At that point, the player's selected slot is switched to the one that contains the item best fit to mine the block
	*/
	if(config.modules.autotoolA.enabled && player.flagAutotoolA && player.gamemode !== GameMode.Creative) {
		system.run(() => {
			flag(player, "AutoTool", "A", "World", `selectedSlot=${player.selectedSlotIndex},lastSelectedSlot=${player.lastSelectedSlot},switchDelay=${player.autotoolSwitchDelay}`);
		});

		data.cancel = true;
	}

	if(config.misc_modules.oreAlerts.enabled && config.misc_modules.oreAlerts.blocks.includes(block.typeId) && !player.hasTag("op")) {
		tellAllStaff(`§r§6[§aScythe§6]§r [Ore Alerts] ${player.name} has broken 1x ${block.typeId}`, ["notify"]);
	}
});

world.afterEvents.playerSpawn.subscribe(({ initialSpawn, player }) => {
	if(!initialSpawn) return;

	// Check if the player is banned, and if so show them the ban message
	if(player.getDynamicProperty("banInfo")) banMessage(player);

	// Declare all needed variables
	player.lastGoodPosition = player.location;

	// Remove tags from previous session
	player.removeTag("hasGUIopen");
	player.removeTag("left");

	// Load custom nametags
	const { mainColor, borderColor, playerNameColor, defaultTag } = config.customcommands.tag;

	let tag = player.getDynamicProperty("tag");

	// Add default tag if enabled
	if(!tag && defaultTag) tag = defaultTag;

	if(tag) player.nameTag = `${borderColor}[§r${mainColor}${tag}${borderColor}]§r ${playerNameColor}${player.nameTag}`;

	// This is used in the onJoin.json animation to check if Beta APIs are enabled
	player.setScore("gametestapi", 1);

	// @ts-expect-error
	const globalmute = JSON.parse(world.getDynamicProperty("globalmute"));
	if(globalmute.muted && player.hasTag("op")) player.sendMessage(`§r§6[§aScythe§6]§r NOTE: Chat has been currently disabled by ${globalmute.muter}. Chat can be re-enabled by running the !globalmute command.`);

	if(config.misc_modules.welcomeMessage.enabled) {
		player.sendMessage(config.misc_modules.welcomeMessage.message.replace(/\[@player]/g, player.name));
	}

	// If enabled from previous login then activate
	if(player.hasTag("flying") && player.gamemode !== GameMode.Creative) player.runCommand("ability @s mayfly true");
	if(player.isMuted()) player.runCommand("ability @s mute true");
	if(player.getDynamicProperty("frozen")) player.triggerEvent("scythe:freeze");
});

world.afterEvents.entitySpawn.subscribe(({ entity }) => {
	// If the entity dies right before this event triggers, an error will be thrown if any property is accessed
	if(!entity.isValid) return;

	// Detect a lag machine method that involves spamming armor stands in a close cluster
	if(config.misc_modules.antiArmorStandCluster.enabled && entity.typeId === "minecraft:armor_stand") {
		const entities = entity.dimension.getEntities({
			location: entity.location,
			maxDistance: config.misc_modules.antiArmorStandCluster.radius,
			type: "armor_stand"
		});

		if(entities.length > config.misc_modules.antiArmorStandCluster.max_armor_stand_count) {
			tellAllStaff(`§r§6[§aScythe§6]§r Potential lag machine detected at X: ${~entity.location.x}, Y: ${~entity.location.y}, Z: ${~entity.location.z}. There are ${entities.length}/${config.misc_modules.antiArmorStandCluster.max_armor_stand_count} armor stands in this area.`, ["notify"]);

			for(const entityLoop of entities) {
				entityLoop.remove();
			}
		}
	}
});

world.afterEvents.entityHitEntity.subscribe(({ hitEntity: entity, damagingEntity: player}) => {
	// Hitting an end crystal causes an error when trying to get the entity location, so we make sure the entity is valid to fix that
	if(!(player instanceof Player) || !entity.isValid) return;

	tellAllStaff(`§߈§r§6[§aScythe§6]§r §breceived §aATTACK§r action from: §g${player.name} §7(isSprinting=${player.isSprinting})`, ["actionlogger"]);

	/*
	Reach/A = Check if a player hits a player farther than normally possible

	This reach detection is rather annoying, as the vanilla client can attack an entity if their collision box is in range
	however this reach calculation doesn't account for the collision box but rather the entity's center
	This causes false positives when attacking entities with large collision boxes such as Ender Dragons
	To prevent any sort of false positives, we only check reach when the player attacks another player
	*/
	if(
		config.modules.reachA.enabled &&
		player.gamemode !== GameMode.Creative &&
		entity instanceof Player
	) {
		// Calculate reach from the player's head location
		const headLocation = player.getHeadLocation();

		// Use the Euclidean Distance Formula to determine the distance between two 3-dimensional objects
		const distance = Math.sqrt(
			(entity.location.x - headLocation.x)**2 +
			(entity.location.y - headLocation.y)**2 +
			(entity.location.z - headLocation.z)**2
		);

		if(config.debug) console.warn(`${player.name} attacked ${entity.nameTag ?? entity.typeId} with a distance of ${distance}`);

		if(
			distance > config.modules.reachA.reach &&
			!config.modules.reachA.excluded_items.includes(player.heldItem)
		) {
			flag(player, "Reach", "A", "Combat", `distance=${distance},item=${player.heldItem}`);
		}
	}

	// Check if the player was hit with the UI item, and if so open the UI for that player
	if(config.customcommands.ui.enabled && entity instanceof Player && !config.customcommands.ui.requiredTags.some(tag => !player.hasTag(tag))) {
		const container = player.getComponent("inventory")?.container;
		if(!container) return; // This should not happen

		const item = container.getItem(player.selectedSlotIndex);
		if(item?.typeId === config.customcommands.ui.ui_item && item.nameTag === config.customcommands.ui.ui_item_name) {
			playerSettingsMenuSelected(player, entity);
		}
	}

	/*
	Autoclicker/A = Check for high CPS

	To find the player's CPS, we divide the amount of times they have clicked between now and the last marked click, divided by the amount of time that has passed between those two points
	The time is measured in milliseconds, so we divide the time by 1000 to get the seconds between now and their last marked click.

	Propeling yourself towards a group of entities using a Riptide Trident will result in the trident attacking all the entities in the same tick.
	The AutoclickerA check will increment your clicks by the amount of entities in the group, which could result in a false flag if there are lots of entities in the group.
	To prevent this, we don't increment the player's clicks if the player is are holding a trident
	*/
	if(config.modules.autoclickerA.enabled && player.heldItem !== "minecraft:trident") {
		player.clicks++;

		const now = Date.now();
		if(now - player.firstAttack >= config.modules.autoclickerA.checkCPSAfter) {
			const cps = player.clicks / ((now - player.firstAttack) / 1000);

			if(cps > config.modules.autoclickerA.maxCPS) flag(player, "Autoclicker", "A", "Combat", `cps=${cps}`);

			player.firstAttack = now;
			player.clicks = 0;
		}
	}

	// Killaura/A = Check if a player attacks an entity while using an item
	if(
		config.modules.killauraA.enabled &&
		player.isUsingItem &&
		Date.now() - player.itemUsedAt > config.modules.killauraA.min_item_use_time
	) flag(player, "Killaura", "A", "Combat", `itemUsedFor=${Date.now() - player.itemUsedAt}`);

	/*
	Killaura/B = Check for no swing

	The playerSwingStart event fires after the entityHitEntity event is fired, so we have to implement some sort of delay
	When a player attacks, we wait 40 ticks (or two seconds) to compensate for the playerSwingStart event firing after entityHitEntity, and then check if the player has swung in the last 5 seconds
	If they have not swung, then we know they are using a no swing cheat and we can detect them
	*/
	if(
		config.modules.killauraB.enabled &&
		player.heldItem !== "minecraft:trident" &&
		// Mining fatigue increases how long the arm swing animation lasts, and if its in middle of an animation the playerSwingStart event will not trigger for attacks
		!player.getEffect("mining_fatigue")
	) {
		system.runTimeout(() => {
			const swingDelay = Date.now() - player.lastLeftClick;

			if(swingDelay > config.modules.killauraB.max_swing_delay) {
				flag(player, "Killaura", "B", "Combat", `swingDelay=${swingDelay}`);
			}
		}, config.modules.killauraB.wait_ticks);
	}

	/*
	Killaura/C = Check for attacking multiple entities in a single tick

	It is possible to attack the same entity more than one time in a single tick, so to avoid false positives we only count how many different entities were attacked

	Propeling yourself towards a group of entities using a Riptide Trident will result in the trident attacking all the entities in the same tick.
	The KillauraC check will see that the player attacked multiple entities at once, and falsely flag the player. To prevent this, we check if the player is holding a trident.
	*/
	if(config.modules.killauraC.enabled && player.heldItem !== "minecraft:trident") {
		player.entitiesHit.add(entity.id);

		if(player.entitiesHit.size >= config.modules.killauraC.entities) {
			flag(player, "KillAura", "C", "Combat", `entitiesHit=${player.entitiesHit.size}`);
		}
	}

	// Kilaura/D = Check if the player attacks an entity while sleeping
	if(config.modules.killauraD.enabled && player.isSleeping) {
		flag(player, "Killaura", "D", "Combat");
	}

	// Killaura/E = Check if the player attacks an entity while having a container open
	if(config.modules.killauraE.enabled && player.hasTag("hasGUIopen")) {
		flag(player, "Killaura", "E", "Combat");
	}
});

world.afterEvents.entityHitBlock.subscribe(({ damagingEntity: player }) => {
	if(!(player instanceof Player)) return;

	player.flagAutotoolA = false;
	player.lastSelectedSlot = player.selectedSlotIndex;
	player.startBreakTime = Date.now();
	player.autotoolSwitchDelay = 0;
});

world.beforeEvents.itemUse.subscribe((itemUse) => {
	const { source: player } = itemUse;

	if(!(player instanceof Player)) return;

	if(config.modules.fastuseA.enabled) {
		const now = Date.now();

		const lastThrowTime = now - player.lastThrow;
		if(lastThrowTime > config.modules.fastuseA.min_use_delay && lastThrowTime < config.modules.fastuseA.max_use_delay) {
			// flag(player, "FastUse", "A", "Combat", `lastThrowTime=${lastThrowTime}`);
			itemUse.cancel = true;
		}
		player.lastThrow = now;
	}

	// Patch bypasses for the freeze system
	if(player.getDynamicProperty("frozen")) itemUse.cancel = true;
});

world.afterEvents.itemUse.subscribe(({ itemStack: item, source: player }) => {
	// itemUse can be triggered from entities
	if(!(player instanceof Player)) return;

	// If the player is holding the UI axe and has the proper permissions, then open the UI
	if(
		config.customcommands.ui.enabled &&
		item.typeId === config.customcommands.ui.ui_item &&
		item.nameTag === config.customcommands.ui.ui_item_name &&
		!config.customcommands.ui.requiredTags.some(tag => !player.hasTag(tag))
	) {
		mainGui(player);
	}
});

world.afterEvents.playerGameModeChange.subscribe(({ fromGameMode, player, toGameMode }) => {
	player.gamemode = toGameMode;

	if(
		!config.misc_modules.antiGamemode.enabled ||
		// @ts-expect-error
		!config.misc_modules.antiGamemode.blockedGamemodes.includes(toGameMode.toLowerCase()) ||
		player.hasTag("op")
	) return;

	// Player entered a blocked gamemode
	player.setGameMode(fromGameMode);
	tellAllStaff(`§r§6[§aScythe§6]§r ${player.name}'s§r §4gamemode was updated to a blocked gamemode §7(oldGamemode=${fromGameMode},newGamemode=${toGameMode})§4.`, ["notify"]);
});

world.afterEvents.playerInventoryItemChange.subscribe(({ itemStack, player, slot }) => {
	// Check if the item in the player's current selected slot has changed
	if(slot === player.selectedSlotIndex) {
		player.heldItem = itemStack?.typeId ?? "minecraft:air";
	}
});

world.afterEvents.itemStartUse.subscribe(({ source: player, itemStack: item }) => {
	// Fishing rods is a special useable item as you do not get slowed down when using it, and it does not cancel actions such as sprinting
	// To avoid false positives, we simply don't count the player as using an item if the item they used is a fishing rod
	if(item?.typeId === "minecraft:fishing_rod") return;

	player.isUsingItem = true;
	player.itemUsedAt = Date.now();

	// Temporarily disabled due to false positives. The hasGUIopen tag can take around 500ms to be removed once the player closes a chest
	// To determine if a player has a GUI open, you need a environmental sensor in player.json, which are slow compared to animation controllers, causing the delay
	if(config.modules.inventorymodsA.enabled && player.hasTag("hasGUIopen")) flag(player, "InventoryMods", "A", "Inventory");
});

world.afterEvents.itemStopUse.subscribe(({ source: player }) => {
	player.isUsingItem = false;
});

world.afterEvents.playerHotbarSelectedSlotChange.subscribe(({ player, itemStack }) => {
	// Update the player's stored held item after changing their selected slot
	player.heldItem = itemStack?.typeId ?? "minecraft:air";
});

world.afterEvents.playerSwingStart.subscribe(({ player }) => {
	player.lastLeftClick = Date.now();
});

system.afterEvents.scriptEventReceive.subscribe(({ sourceEntity: player, id }) => {
	if(!(player instanceof Player) || !id.startsWith("scythe:")) return;

	const splitId = id.split(":");
	switch(splitId[1]) {
		case "startMove":
			player.movedAt = Date.now();
			break;

		// Backup command to reset the config in emergency cases
		case "resetconfig":
			// Nice try...
			if(!player.hasTag("op")) break;

			world.setDynamicProperty("config", undefined);
			player.sendMessage("§r§6[§aScythe§6]§r The scythe config has been reset. Run '/reload' to apply the changes.");
			break;
	}
});

system.beforeEvents.watchdogTerminate.subscribe((watchdogTerminate) => {
	// We try to stop any watchdog crashes incase malicious users try to make the scripts lag
	// and cause the server to crash
	watchdogTerminate.cancel = true;

	tellAllStaff(`§r§6[§aScythe§6]§r A ${watchdogTerminate.terminateReason} watch dog exception has been detected and has been automatically cancelled.`);
});

// When using /reload, the variables defined in playerSpawn event do not persist so we reapply them.
system.run(() => {
	const players = world.getPlayers();
	for(const player of players) {
		player.gamemode = player.getGameMode();
		player.lastGoodPosition = player.location;
		player.heldItem = player.getComponent("inventory")?.container?.getItem(player.selectedSlotIndex)?.typeId ?? "minecraft:air";
	}
});