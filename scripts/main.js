// @ts-check
import config from "./data/config.js";
import { world, system, Player, EquipmentSlot } from "@minecraft/server";
import { flag, banMessage, getScore, tellAllStaff, setScore } from "./util.js";
import { mainGui, playerSettingsMenuSelected } from "./features/ui.js";
import { commandHandler } from "./commands/handler.js";

let entitiesSpawnedInLastTick = 0;

world.beforeEvents.chatSend.subscribe((msg) => {
	const { sender: player, message } = msg;

	if(player.getDynamicProperty("muted")) {
		player.sendMessage("§r§6[§aScythe§6]§r §a§lNOPE! §r§aYou have been muted.");
		msg.cancel = true;
	}

	// BadPackets[2] = Checks for invalid chat message length
	if(config.modules.badpackets2.enabled && (message.length === 0 || message.length > config.modules.badpackets2.maxLength)) {
		system.runTimeout(() => {
			flag(player, "BadPackets", "2", "Exploit", `messageLength=${message.length}`, undefined, msg);
		}, 1);
		msg.cancel = true;
	}

	// BadPackets[4] = Checks for newline or carriage return characters in messages
	if(config.modules.badpackets4.enabled && message.match(/\n|\r/)) {
		system.runTimeout(() => {
			flag(player, "BadPackets", "4", "Exploit", undefined, undefined, msg);
		}, 1);
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

	// Make sure that player has a custom nametag or filter unicode chat is enabled
	if(!msg.cancel && (player.name !== player.nameTag || config.misc_modules.filterUnicodeChat.enabled)) {
		// Adds user custom tags to their messages and filter any non-ASCII characters
		const playerTag = player.name !== player.nameTag ? `${player.nameTag}§7:§r` : `<${player.nameTag}>`;
		const message_ = config.misc_modules.filterUnicodeChat.enabled ? message.replace(/[^\x00-\xFF]/g, "") : message;

		world.sendMessage(`${playerTag} ${message_}`);
		msg.cancel = true;
	}
});

world.afterEvents.chatSend.subscribe(({ sender: player }) => {
	// Spammer/A = Checks if someone sends a message while moving and on ground
	const firstMoved = Date.now() - player.movedAt;
	if(
		config.modules.spammerA.enabled &&
		player.isMoving &&
		// Make sure that the player hasn't moved within the last two seconds
		// Jumping and sending a chat message at the exact time you hit the ground causes a false positive
		firstMoved > 2000 &&
		player.isOnGround &&
		!player.isJumping &&
		!player.hasTag("riding")
	) {
		flag(player, "Spammer", "A", "Movement", `firstMoved=${firstMoved}`, true);
		return;
	}

	/*
	Spammer/B = Checks if someone sends a message while swinging their hand
	Mining fatigue can make the arm swing animation last longer than normal so we ignore players with that effect
	*/
	if(config.modules.spammerB.enabled && player.hasTag("left") && !player.getEffect("mining_fatigue")) {
		flag(player, "Spammer", "B", "Combat");
		return;
	}

	// Spammer/C = Checks if someone sends a message while using an item
	if(config.modules.spammerC.enabled && player.hasTag("right")) {
		flag(player, "Spammer", "C", "Misc");
		return;
	}

	// Spammer/D = Checks if someone sends a message while having a GUI open
	if(config.modules.spammerD.enabled && player.hasTag("hasGUIopen")) {
		flag(player, "Spammer", "D", "Misc");
		return;
	}
});

system.runInterval(() => {
	const now = Date.now();
	if(config.misc_modules.itemSpawnRateLimit.enabled) entitiesSpawnedInLastTick = 0;

	// Run as each player
	for(const player of world.getPlayers()) {
		try {
			// --- Prerequisite variables that are used by checks later on ---
			player.velocity = player.getVelocity();
			player.rotation = player.getRotation();

			// Get the currently held item by the player
			player.heldItem = player.getComponent("inventory")?.container?.getItem(player.selectedSlotIndex)?.typeId ?? "minecraft:air";

			// Find the magnitude of the vector
			const playerSpeed = Number(Math.sqrt(player.velocity.x**2 + player.velocity.z**2).toFixed(2));
			player.isMoving = playerSpeed !== 0;

			const firstMoved = now - player.movedAt;

			// Get the item that the player is holding in their cursor
			const cursorItem = player.getComponent("cursor_inventory")?.item;

			// Get the item in the player's offhand
			const offhandItem = player.getComponent("equippable")?.getEquipment(EquipmentSlot.Offhand);

			if(config.modules.nukerA.enabled && player.blocksBroken >= 1) player.blocksBroken = 0;
			if(config.modules.killauraC.enabled && player.entitiesHit?.length >= 1) player.entitiesHit = [];
			if(config.modules.autotoolA.enabled && now - player.startBreakTime < config.modules.autotoolA.startBreakDelay && player.lastSelectedSlot !== player.selectedSlotIndex) {
				player.flagAutotoolA = true;
				player.autotoolSwitchDelay = now - player.startBreakTime;
			}

			// Sexy looking ban message
			if(player.getDynamicProperty("banInfo")) banMessage(player);

			/*
			// Crasher/A = Invalid pos check
			if(
				config.modules.crasherA.enabled &&
				Math.abs(player.location.x) > 30000000 ||
				Math.abs(player.location.y) > 30000000 ||
				Math.abs(player.location.z) > 30000000
			) flag(player, "Crasher", "A", "Exploit", `x_pos=${player.location.x},y_pos=${player.location.y},z_pos=${player.location.z}`, true);
			*/

			// NoSlow/A = Speed limit check
			if(
				config.modules.noslowA.enabled &&
				playerSpeed >= config.modules.noslowA.speed &&
				playerSpeed <= config.modules.noslowA.maxSpeed &&
				player.isOnGround &&
				!player.isJumping &&
				!player.isGliding &&
				player.heldItem !== "minecraft:trident" &&
				!player.getEffect("speed") &&
				player.hasTag("right") &&
				!player.hasTag("riding")
			) {
				const right = getScore(player, "right");
				const blockBelow = player.dimension.getBlock({x: player.location.x, y: player.location.y - 1, z: player.location.z});

				// Make sure there are no entities below the player
				const nearbyEntities = player.dimension.getEntitiesAtBlockLocation(player.location);

				if(blockBelow && right >= 10 && !nearbyEntities.find(entity => entity instanceof Player) && !blockBelow.typeId.includes("ice")) {
					flag(player, "NoSlow", "A", "Movement", `speed=${playerSpeed},heldItem=${player.heldItem},blockBelow=${blockBelow.typeId},rightTicks=${right}`, true);
				}
			}

			// InvalidSprint/A = Checks for sprinting with the blindness effect
			// TODO: Once 1.21.50 comes out, move this to the playerButtonInput event
			if(
				config.modules.invalidsprintA.enabled &&
				player.isSprinting &&
				player.getEffect("blindness")
			) {
				const blindTicks = Date.now() - player.blindedAt;
				// If a player is given the blindness effect while sprinting, they are able to continue sprinting which gives a false flag
				if(blindTicks < 100 || isNaN(blindTicks)) player.teleport(player.location);
					else flag(player, "InvalidSprint", "A", "Movement", `blindTicks=${blindTicks}`, true);
			}

			// Fly/a
			// This check no longer works.
			/*
			if(config.modules.flyA.enabled && Math.abs(player.velocity.y).toFixed(4) === "0.1552" && !player.isJumping && !player.isGliding && !player.hasTag("riding") && !player.getEffect("levitation") && player.isMoving) {
				const pos1 = {x: player.location.x - 2, y: player.location.y - 1, z: player.location.z - 2};
				const pos2 = {x: player.location.x + 2, y: player.location.y + 2, z: player.location.z + 2};

				const isInAir = !getBlocksBetween(pos1, pos2).some((block) => player.dimension.getBlock(block)?.typeId !== "minecraft:air");

				if(isInAir) flag(player, "Fly", "A", "Movement", `vertical_speed=${Math.abs(player.velocity.y).toFixed(4)}`, true);
					else if(config.debug) console.warn(`${player.name} was detected with flyA motion but was found near solid blocks.`);
			}
			*/

			if(config.modules.autoclickerA.enabled && player.cps > 0 && now - player.firstAttack >= config.modules.autoclickerA.checkCPSAfter) {
				const cps = player.cps / ((now - player.firstAttack) / config.modules.autoclickerA.checkCPSAfter);

				// Autoclicker/A = Check for high cps
				if(cps > config.modules.autoclickerA.maxCPS) flag(player, "Autoclicker", "A", "Combat", `cps=${cps}`);

				player.firstAttack = now;
				player.cps = 0;
			}

			// BadPackets[4] = checks for invalid selected slot
			// The handler for the player hotbar packet runs a function called PlayerInventory::selectSlot. This function checks for invalid selected slot
			// thus making this check useless.
			/*
			if(config.modules.badpackets4.enabled && selectedSlot < 0 || selectedSlot > 8) {
				flag(player, "BadPackets", "4", "Exploit", `selectedSlot=${selectedSlot}`);
				player.selectedSlotIndex = 0;
			}
			*/

			if(player.location.y < -104) player.tryTeleport({x: player.location.x, y: -104, z: player.location.z});

			/*
			// The 'fallDistance' property in Player has been removed.
			if(config.modules.flyB.enabled && player.fallDistance < -1 && !player.isSwimming && !player.isJumping && !player.holdingTrident) {
				flag(player, "Fly", "B", "Movement", `fallDistance=${player.fallDistance}`, true);
			}
			*/

			/*
			InventoryMods/B = Check if a player switches the item they selected in the inventory while moving
			The 'player.isMoving' property does not allow us to see if the player was moved from them pressing the move buttons, or if an external factor moved them.
			Because of that, we will have to check if a player was not moved by one of those external factors
			*/
			if(
				config.modules.inventorymodsB.enabled &&
				player.lastCursorItem?.typeId !== cursorItem?.typeId &&
				player.isMoving &&
				firstMoved > 2000 &&
				player.isOnGround &&
				playerSpeed > 0.10 &&
				!player.isGliding &&
				!player.isInWater &&
				!player.hasTag("riding")
			) flag(player, "InventoryMods", "B", "Inventory", `oldItem=${player.lastCursorItem?.typeId},newItem=${cursorItem?.typeId}`, true);

			// Check if an item was equipped to the offhand
			if(!player.lastOffhandItem && offhandItem) {
				// AutoOffhand/A = Checks if a player equips an item in their offhand while moving
				if(
					config.modules.autooffhandA.enabled &&
					player.isMoving &&
					firstMoved > 2000 &&
					player.isOnGround &&
					playerSpeed > 0.10 &&
					!player.isGliding &&
					!player.isInWater &&
					!player.hasTag("riding")
				) flag(player, "AutoOffhand", "A", "Inventory", `item=${offhandItem?.typeId}`, true);

				// AutoOffhand/B = Checks if a player equips an item in their offhand while using an item
				if(
					config.modules.autooffhandB.enabled &&
					player.hasTag("right")
				) flag(player, "AutoOffhand", "B", "Inventory", `item=${offhandItem?.typeId}`);

				// AutoOffhand/C = Checks if a player equips an item in their offhand while swinging their hand
				if(
					config.modules.autooffhandC.enabled &&
					player.hasTag("left")
				) flag(player, "AutoOffhand", "C", "Inventory", `item=${offhandItem?.typeId}`);
			}

			if(config.misc_modules.worldborder.enabled && (Math.abs(player.location.x) > config.misc_modules.worldborder.max_x || Math.abs(player.location.z) > config.misc_modules.worldborder.max_z) && !player.hasTag("op")) {
				player.tryTeleport({
					// Check if the number is greater than 0, if it is then subtract 1 else add 1
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
		} catch (error) {
			console.error(error, error.stack);
			if(player.hasTag("errorlogger")) tellAllStaff(`§r§6[§aScythe§6]§r There was an error while running the tick event. Please forward this message to https://discord.gg/9m9TbgJ973.\n-------------------------\n${error}\n${error.stack || "\n"}-------------------------`, ["errorlogger"]);
		}
	}
}, 1);

world.afterEvents.playerPlaceBlock.subscribe(({ block, player }) => {
	if(config.debug) console.warn(`${player.name} has placed ${block.typeId}. Player Tags: ${player.getTags()}`);

	/*
	Reach/C = Checks if a player places a block farther than normally possible.

	When in Survival, the place block reach can get up to ~5 blocks on all devices.
	When in Creative, the place block reach changes depending on the device:
		- Desktop: Reach limit remains the same
		- Mobile: Reach limit increases to ~11 blocks, depending on angle
		- Console: TODO
	*/
	if(config.modules.reachC.enabled) {
		// Use the Euclidean Distance Formula to determine the distance between two 3-dimensional objects
		const distance = Math.sqrt((block.location.x - player.location.x)**2 + (block.location.y - player.location.y)**2 + (block.location.z - player.location.z)**2);
		const platformType = player.clientSystemInfo.platformType;

		if(config.debug) console.log(distance);

		let reachLimit = NaN;
		switch(platformType) {
			case "Desktop":
				reachLimit = 5;
				break;

			case "Mobile":
				reachLimit = 11;
				break;

			case "Console":
				// TODO, setting this as 12 for now
				reachLimit = 12;
		}

		// To avoid visually unpleasing code we calculate reach limit based on device first and then gamemode
		if(player.gamemode === "survival") reachLimit = 5;

		if(reachLimit < distance) flag(player, "Reach", "C", "World", `distance=${distance},gamemode=${player.gamemode},device=${platformType}`);
	}

	// Get block under player
	const blockUnder = player.dimension.getBlock({x: Math.trunc(player.location.x), y: Math.trunc(player.location.y) - 1, z: Math.trunc(player.location.z)});

	// Scaffold/A = Check for Tower like behavior
	if(
		config.modules.scaffoldA.enabled &&
		block.location.x === blockUnder?.location.x &&
		block.location.y === blockUnder?.location.y &&
		block.location.z === blockUnder?.location.z &&
		!player.isFlying &&
		player.isJumping &&
		player.isFalling &&
		player.velocity.y < 1 &&
		!player.getEffect("jump_boost") &&
		!block.typeId.includes("fence") &&
		!block.typeId.includes("wall") &&
		!block.typeId.includes("_shulker_box")
	) {
		const yPosDiff = Math.abs(player.location.y % 1);

		if(yPosDiff > config.modules.scaffoldA.max_y_pos_diff && player.gamemode !== "creative" && !player.isFlying) {
			flag(player, "Scaffold", "A", "World", `yPosDiff=${yPosDiff},block=${block.typeId}`, true);
			block.setType("air");
		}
	}

	// Credit to the dev of Isolate Anticheat for giving me the idea of checking if a player x rotation is 60 to detect horion scaffold
	// The check was later updated to check if the x rotation or the y rotation is a flat number to further detect any other aim related hacks
	if(config.modules.scaffoldB.enabled && ((Number.isInteger(player.rotation.x) && player.rotation.x !== 0) || (Number.isInteger(player.rotation.y) && player.rotation.y !== 0))) {
		flag(player, "Scaffold", "B", "World", `xRot=${player.rotation.x},yRot=${player.rotation.y}`, true);
		block.setType("air");
	}

	// Scaffold/C = Check if a player placed a block under them whilst looking up
	// Make sure the players's y location is greater than the block placed's y location.
	if(config.modules.scaffoldC.enabled && Math.trunc(player.location.y) > Math.trunc(block.location.y) && player.rotation.x < config.modules.scaffoldC.min_x_rot && !player.isSwimming && block.isSolid && !player.hasTag("riding")) {
		flag(player, "Scaffold", "C", "World", `xRot=${player.rotation.x},yPosPlayer=${player.location.y},yPosBlock=${block.location.y}`);
		block.setType("air");
	}

	// Scaffold/D = Check for downwards scaffold
	// This checks if a player places a block under the block they are currently standing on
	if(
		config.modules.scaffoldD.enabled &&
		blockUnder?.isSolid &&
		Math.trunc(player.location.x) === block.location.x &&
		(Math.trunc(player.location.y) - 2) === block.location.y &&
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

world.afterEvents.playerBreakBlock.subscribe(({ player, dimension, block, brokenBlockPermutation }) => {
	const brokenBlockId = brokenBlockPermutation.type.id;

	let revertBlock = false;

	if(config.debug) console.warn(`${player.name} has broken the block ${brokenBlockId}`);

	// Nuker/a = checks if a player breaks more than 3 blocks in a tick
	if(config.modules.nukerA.enabled && ++player.blocksBroken > config.modules.nukerA.maxBlocks) {
		flag(player, "Nuker", "A", "World", `blocksBroken=${player.blocksBroken}`);
		revertBlock = true;
	}

	// Autotool/A = checks for player slot mismatch
	if(config.modules.autotoolA.enabled && player.flagAutotoolA && player.gamemode !== "creative") {
		flag(player, "AutoTool", "A", "World", `selectedSlot=${player.selectedSlotIndex},lastSelectedSlot=${player.lastSelectedSlot},switchDelay=${player.autotoolSwitchDelay}`);
		revertBlock = true;
	}

	/*
		InstaBreak/A = checks if a player in survival breaks an unbreakable block
		While the InstaBreak method used in Horion and Zephyr are patched, there are still some bypasses
		that can be used
	*/
	if(config.modules.instabreakA.enabled && config.modules.instabreakA.unbreakable_blocks.includes(brokenBlockId) && player.gamemode !== "creative") {
		flag(player, "InstaBreak", "A", "Exploit", `block=${brokenBlockId}`);
		revertBlock = true;
	}

	if(config.misc_modules.oreAlerts.enabled && config.misc_modules.oreAlerts.blocks.includes(brokenBlockId) && !player.hasTag("op")) {
		tellAllStaff(`§r§6[§aScythe§6]§r [Ore Alerts] ${player.name} has broken 1x ${brokenBlockId}`, ["notify"]);
	}

	if(revertBlock) {
		// Remove the dropped items
		const droppedItems = dimension.getEntities({
			location: block.location,
			minDistance: 0,
			maxDistance: 2,
			type: "item"
		});

		for(const item of droppedItems) item.remove();

		block.setPermutation(brokenBlockPermutation);
	}
});

world.afterEvents.playerSpawn.subscribe(({ initialSpawn, player }) => {
	if(!initialSpawn) return;

	// Declare all needed variables
	player.lastGoodPosition = player.location;

	// Remove tags from previous session
	player.removeTag("hasGUIopen");
	player.removeTag("right");
	player.removeTag("left");
	// player.removeTag("gliding");
	player.removeTag("sprinting");
	player.removeTag("moving");
	// player.removeTag("sleeping");

	// Patch a method of disabling anticheats
	player.nameTag = player.nameTag.replace(/[^A-Za-z0-9_\-() ]/gm, "").trim();

	// Load custom nametags
	const { mainColor, borderColor, playerNameColor, defaultTag } = config.customcommands.tag;

	// Backwards compatibility
	// This will be removed in Scythe v3.5.0
	let reason;
	let by;
	let time;

	for(const tag of player.getTags()) {
		switch(tag.split(":")[0]) {
			case "tag":
				player.setDynamicProperty("tag", tag.slice(4));
				player.removeTag(tag);
				break;

			case "reason":
				reason = tag;
				player.removeTag(tag);
				break;

			case "by":
				by = tag;
				player.removeTag(tag);
				break;

			case "time":
				time = tag;
				player.removeTag(tag);
				break;
		}
	}

	let tag = player.getDynamicProperty("tag");

	// Add default tag if enabled
	if(!tag && defaultTag) tag = defaultTag;

	if(tag) player.nameTag = `${borderColor}[§r${mainColor}${tag}${borderColor}]§r ${playerNameColor}${player.nameTag}`;

	if(reason && by && time) {
		player.setDynamicProperty("banInfo", JSON.stringify({
			by: by.slice(3),
			reason: reason.slice(7),
			time: time ? Number(time.slice(5)) : null
		}));
	}

	// Namespoof/A = Username length check
	if(config.modules.namespoofA.enabled) {
		let flagNamespoofA = false;
		// When a sub-client joins a world, their name has a suffix of (x), with x being a number between 1-3.
		// To prevent any false positives with this, we make sure to omit that suffix from being calculated in the length checks
		const maxLength = config.modules.namespoofA.maxNameLength + (player.name.endsWith(")") ? 3 : 0);
	
		if(player.name.length < config.modules.namespoofA.minNameLength || player.name.length > maxLength) {
			flagNamespoofA = true;
		}

		if(flagNamespoofA) {
			const extraLength = player.name.length - config.modules.namespoofA.maxNameLength;
			player.nameTag = player.name.slice(0, -extraLength) + "...";

			flag(player, "Namespoof", "A", "Exploit", `nameLength=${player.name.length}`);
		}
	}

	// Namespoof/B = Regex check
	if(config.modules.namespoofB.enabled && RegExp(config.modules.namespoofB.regex).test(player.name)) {
		flag(player, "Namespoof", "B", "Exploit");
	}

	/*
	BadPackets[5] = Checks if the player has an invalid max render distance.

	This value is *not* the player's current render distance, but rather the max the player could set their render distance to.
	Vanilla clients would have this value set to 6-96 according to https://minecraftbedrock-archive.fandom.com/wiki/Render_Distance
	*/
	if(
		config.modules.badpackets5.enabled &&
		(player.clientSystemInfo.maxRenderDistance < 6 || player.clientSystemInfo.maxRenderDistance > 96)
	) flag(player, "BadPackets", "5", "Exploit", `maxRenderDistance=${player.clientSystemInfo.maxRenderDistance}`);

	// This is used in the onJoin.json animation to check if Beta APIs are enabled
	setScore(player, "gametestapi", 1);

	// @ts-expect-error
	const globalmute = JSON.parse(world.getDynamicProperty("globalmute"));
	if(globalmute.muted && player.hasTag("op")) player.sendMessage(`§r§6[§aScythe§6]§r NOTE: Chat has been currently disabled by ${globalmute.muter}. Chat can be re-enabled by running the !globalmute command.`);

	if(config.misc_modules.welcomeMessage.enabled) {
		player.sendMessage(config.misc_modules.welcomeMessage.message.replace(/\[@player]/g, player.name));
	}

	// If enabled from previous login then activate
	if(player.hasTag("flying") && player.gamemode !== "creative") player.runCommandAsync("ability @s mayfly true");
	if(player.getDynamicProperty("muted")) player.runCommandAsync("ability @s mute true");
	if(player.hasTag("freeze")) player.triggerEvent("scythe:freeze");
});

world.afterEvents.entitySpawn.subscribe(({ entity }) => {
	// If the entity dies right before this event triggers, an error will be thrown if any property is accessed
	if(!entity.isValid()) return;

	if(config.misc_modules.itemSpawnRateLimit.enabled && ++entitiesSpawnedInLastTick > config.misc_modules.itemSpawnRateLimit.entitiesBeforeRateLimit) {
		if(config.debug) console.warn(`Killed "${entity.typeId}" due to entity spawn ratelimit reached.`);
		entity.remove();
	}

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
	// Hitting an end crystal causes an error when trying to get the entity location. isValid() fixes that
	if(!(player instanceof Player) || !entity.isValid()) return;

	tellAllStaff(`§߈§r§6[§aScythe§6]§r §breceived §aATTACK§r action from: §g${player.name} §7(isSprinting=${player.isSprinting})`, ["actionlogger"]);

	// Reach/A = Check if a player hits an entity farther than normally possible
	if(config.modules.reachA.enabled) {
		// Use the Euclidean Distance Formula to determine the distance between two 3-dimensional objects
		const distance = Math.sqrt((entity.location.x - player.location.x)**2 + (entity.location.y - player.location.y)**2 + (entity.location.z - player.location.z)**2);

		if(config.debug) console.warn(`${player.name} attacked ${entity.nameTag ?? entity.typeId} with a distance of ${distance}`);

		if(
			distance > config.modules.reachA.reach &&
			player.gamemode !== "creative" &&
			entity.typeId.startsWith("minecraft:") &&
			!config.modules.reachA.excluded_entities.includes(entity.typeId) &&
			!config.modules.reachA.excluded_items.includes(player.heldItem)
		) {
			flag(player, "Reach", "A", "Combat", `entity=${entity.typeId},distance=${distance},item=${player.heldItem}`);
		}
	}

	// BadPackets[3] = checks if a player attacks themselves
	// Some (bad) hacks use this to bypass anti-movement cheat checks
	if(config.modules.badpackets3.enabled && entity.id === player.id) flag(player, "BadPackets", "3", "Exploit");

	// Check if the player was hit with the UI item, and if so open the UI for that player
	if(config.customcommands.ui.enabled && entity instanceof Player && !config.customcommands.ui.requiredTags.some(tag => !player.hasTag(tag))) {
		const container = player.getComponent("inventory")?.container;
		if(!container) return; // This should not happen

		const item = container.getItem(player.selectedSlotIndex);
		if(item?.typeId === config.customcommands.ui.ui_item && item?.nameTag === config.customcommands.ui.ui_item_name) {
			playerSettingsMenuSelected(player, entity);
		}
	}

	/*
		Autoclicker/A = Check for high CPS. The rest of the handling for this check is in the tick event

		Propeling yourself towards a group of entities using a Riptide Trident will result in the trident attacking all the entities in the same tick.
		The AutoclickerA check will increment your CPS by the amount of entities in the group, which could result in a false flag if there are lots of entities in the group.
		To prevent this, we don't increment the player's CPS if they are holding a trident.
	*/
	if(config.modules.autoclickerA.enabled && player.heldItem !== "minecraft:trident") player.cps++;

	// Killaura/A = Check if a player attacks an entity while using an item
	if(config.modules.killauraA.enabled && player.hasTag("right")) {
		const rightTicks = getScore(player, "right");

		if(rightTicks > config.modules.killauraA.rightTicks) {
			flag(player, "Killaura", "A", "Combat", `ticks=${rightTicks}`);
		}
	}

	/**
	 * Killaura/B = Check for no swing
	 * For this check to work correctly Scythe has to be put at the top of the behavior packs list.
	 * Players with the haste effect are excluded as the effect can make players not swing their hand.
	 */
	if(config.modules.killauraB.enabled && player.heldItem !== "minecraft:trident" && !player.getEffect("haste")) {
		system.runTimeout(() => {
			const swingDelay = Date.now() - player.lastLeftClick;

			if(swingDelay > config.modules.killauraB.max_swing_delay) {
				flag(player, "Killaura", "B", "Combat", `swingDelay=${swingDelay}`);
			}
		}, config.modules.killauraB.wait_ticks);
	}

	/*
		Killaura/C = Check for multi-aura

		Propeling yourself towards a group of entities using a Riptide Trident will result in the trident attacking all the entities in the same tick.
		The KillauraC check will see that the player attacked multiple entities at once, and falsely flag the player. To prevent this, we check if the player is holding a trident.
	*/
	if(config.modules.killauraC.enabled && !player.entitiesHit.includes(entity.id) && player.heldItem !== "minecraft:trident") {
		player.entitiesHit.push(entity.id);

		if(player.entitiesHit.length >= config.modules.killauraC.entities) {
			flag(player, "KillAura", "C", "Combat", `entitiesHit=${player.entitiesHit.length}`);
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

	if(config.debug) console.warn(player.getTags());
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
	if(player.hasTag("freeze")) itemUse.cancel = true;
});

world.afterEvents.itemUse.subscribe(({ itemStack: item, source: player }) => {
	// itemUse can be triggered from entities
	if(!(player instanceof Player)) return;

	if(config.customcommands.ui.enabled && item.typeId === config.customcommands.ui.ui_item && item.nameTag === config.customcommands.ui.ui_item_name && !config.customcommands.ui.requiredTags.some(tag => !player.hasTag(tag))) {
		mainGui(player);
	}
});

world.afterEvents.playerGameModeChange.subscribe(({fromGameMode, player, toGameMode}) => {
	player.gamemode = toGameMode;

	if(
		!config.misc_modules.antiGamemode.enabled ||
		// @ts-expect-error
		!config.misc_modules.antiGamemode.blockedGamemodes.includes(toGameMode) ||
		player.hasTag("op")
	) return;

	// Player entered a blocked gamemode
	player.setGameMode(fromGameMode);
	tellAllStaff(`§r§6[§aScythe§6]§r ${player.name}§r §4tried changing their gamemode to a blocked gamemode §7(oldGamemode=${fromGameMode},newGamemode=${toGameMode})§4.`, ["notify"]);
});

world.afterEvents.effectAdd.subscribe(({ effect, entity: player}) => {
	if(!(player instanceof Player)) return;

	if(effect.typeId === "blindness") player.blindedAt = Date.now();
});

system.afterEvents.scriptEventReceive.subscribe(({ id, sourceEntity: player }) => {
	if(!(player instanceof Player) || !id.startsWith("scythe:")) return;

	const splitId = id.split(":");
	switch(splitId[1]) {
		case "left":
			player.lastLeftClick = Date.now();
			break;

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

	tellAllStaff(`§r§6[§aScythe§6]§r A Watchdog Exception has been detected and has been cancelled successfully. Reason: ${watchdogTerminate.terminateReason}`);
});

// When using /reload, the variables defined in playerSpawn event do not persist so we reapply them.
for(const player of world.getPlayers()) {
	player.gamemode = player.getGameMode();
	player.lastGoodPosition = player.location;
}