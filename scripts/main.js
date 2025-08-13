// @ts-check
import config from "./data/config.js";
import { world, system, Player, EquipmentSlot, PlayerInventoryType, GameMode, InputMode } from "@minecraft/server";
import { flag, banMessage, tellAllStaff } from "./util.js";
import { mainGui, playerSettingsMenuSelected } from "./features/ui.js";
import { commandHandler } from "./commands/handler.js";

world.beforeEvents.chatSend.subscribe((msg) => {
	const { sender: player, message } = msg;

	if(player.getDynamicProperty("muted")) {
		player.sendMessage("§r§6[§aScythe§6]§r §a§lNOPE! §r§aYou have been muted.");
		msg.cancel = true;
	}

	// BadPackets[2] = Checks for invalid chat message length
	if(config.modules.badpackets2.enabled && (message.length === 0 || message.length > config.modules.badpackets2.maxLength)) {
		system.run(() => {
			flag(player, "BadPackets", "2", "Exploit", `messageLength=${message.length}`);
		});
		msg.cancel = true;
	}

	// BadPackets[4] = Checks for newline or carriage return characters in messages
	if(config.modules.badpackets4.enabled && message.match(/\n|\r/)) {
		system.run(() => {
			flag(player, "BadPackets", "4", "Exploit");
		});
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

world.afterEvents.chatSend.subscribe(({ sender: player }) => {
	/*
	Each of these Spammer modules are designed to detect the Spammer module in hack clients such as Horion, which automatically sends messages on the behalf of the player
	If you are looking for something to prevent people sending too many messages in chat, then use the antispam misc module

	Spammer/A = Checks if someone sends a message while moving
	Spammer/B = Checks if someone sends a message while swinging their hand
	Spammer/C = Checks if someone sends a message while using an item
	Spammer/D = Checks if someone sends a message while having a GUI open
	*/

	const moveVector = player.inputInfo.getMovementVector();
	if(
		config.modules.spammerA.enabled &&
		moveVector.x !== 0 &&
		moveVector.y !== 0
	) {
		flag(player, "Spammer", "A", "Movement", undefined, true);
		return;
	}

	// Mining fatigue can make the arm swing animation last longer than normal so we ignore players with that effect
	if(config.modules.spammerB.enabled && player.hasTag("left") && !player.getEffect("mining_fatigue")) {
		flag(player, "Spammer", "B", "Combat");
		return;
	}

	if(config.modules.spammerC.enabled && player.hasTag("right")) {
		flag(player, "Spammer", "C", "Misc");
		return;
	}

	if(config.modules.spammerD.enabled && player.hasTag("hasGUIopen")) {
		flag(player, "Spammer", "D", "Misc");
		return;
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

			// Get the currently held item by the player
			player.heldItem = player.getComponent("inventory")?.container?.getItem(player.selectedSlotIndex)?.typeId ?? "minecraft:air";

			// Find the magnitude of the velocity vector
			const playerSpeed = Math.sqrt(player.velocity.x**2 + player.velocity.z**2);

			const moveVector = player.inputInfo.getMovementVector();

			// Get the item in the player's offhand
			const offhandItem = player.getComponent("equippable")?.getEquipment(EquipmentSlot.Offhand);

			if(config.modules.nukerA.enabled && player.blocksBroken >= 1) player.blocksBroken = 0;
			if(config.modules.killauraC.enabled && player.entitiesHit.size >= 1) player.entitiesHit.clear();
			if(config.modules.autotoolA.enabled && now - player.startBreakTime < config.modules.autotoolA.startBreakDelay && player.lastSelectedSlot !== player.selectedSlotIndex) {
				player.flagAutotoolA = true;
				player.autotoolSwitchDelay = now - player.startBreakTime;
			}

			// Sexy looking ban message
			if(player.getDynamicProperty("banInfo")) banMessage(player);

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
				moveVector.x !== 0 &&
				moveVector.y !== 0 &&
				player.isOnGround &&
				!player.isJumping &&
				!player.isGliding &&
				player.heldItem !== "minecraft:trident" &&
				!player.getEffect("speed") &&
				player.hasTag("right") &&
				!player.hasTag("riding")
			) {
				const right = player.getScore("right");
				const blockBelow = player.dimension.getBlock({x: player.location.x, y: player.location.y - 1, z: player.location.z});

				// Make sure there are no entities below the player to fix false positives with boats
				const nearbyEntities = player.dimension.getEntitiesAtBlockLocation(player.location);

				if(blockBelow && right >= 10 && !nearbyEntities.find(entity => entity instanceof Player) && !blockBelow.typeId.includes("ice")) {
					flag(player, "NoSlow", "A", "Movement", `speed=${playerSpeed.toFixed(2)},heldItem=${player.heldItem},blockBelow=${blockBelow.typeId},rightTicks=${right}`, true);
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
				if(config.modules.invalidsprintB.enabled && player.hasTag("right")) {
					const rightTicks = player.getScore("right");

					if(rightTicks > 4) flag(player, "InvalidSprint", "B", "Movement", undefined, true);
				}

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
					moveVector.x === 0 &&
					moveVector.y === 0 &&
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

			// Check if an item was equipped to the offhand
			if(!player.lastOffhandItem && offhandItem) {
				// AutoOffhand/A = Checks if a player equips an item in their offhand while moving
				if(
					config.modules.autooffhandA.enabled &&
					player.isOnGround &&
					// Move vector allows us to check whether or not the player moved by pressing input keys and not other ways (such as water)
					moveVector.x !== 0 &&
					moveVector.y !== 0
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

			player.lastOffhandItem = offhandItem;

			// Store the players last good position
			// When a movement-related check flags the player, they will be teleported to this position
			// xRot and yRot being 0 means the player position was modified from player.teleport, which we should ignore
			if(player.rotation.x !== 0 && player.rotation.y !== 0) player.lastGoodPosition = player.location;

			player.lastSprintState = player.isSprinting;
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
		- Console: Reach liit can vary around 5-6.5 blocks, depending on device
	*/
	if(config.modules.reachC.enabled) {
		// Use the Euclidean Distance Formula to determine the distance between two 3-dimensional objects
		const distance = Math.sqrt(
			(block.location.x - player.location.x)**2 +
			(block.location.y - player.location.y)**2 +
			(block.location.z - player.location.z)**2
		);
		const inputMode = player.inputInfo.lastInputModeUsed;

		if(config.debug) console.log(distance);

		let reachLimit = NaN;
		switch(inputMode) {
			case InputMode.KeyboardAndMouse:
				reachLimit = 5;
				break;

			case InputMode.Touch:
				reachLimit = 11.5;
				break;

			case InputMode.Gamepad:
				// Xbox consoles have a reach limit of ~5 blocks, meanwhile Switch consoles have a reach limit of ~6.5 blocks
				// We can't differentiate between the two platforms so the Switch reach limit is used.
				reachLimit = 6.5;
		}

		// To avoid visually unpleasing code we calculate reach limit based on device first and then gamemode
		if(player.gamemode === GameMode.Survival) reachLimit = 5;

		if(reachLimit < distance) flag(player, "Reach", "C", "World", `distance=${distance},gamemode=${player.gamemode},inputMode=${inputMode}`);
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
		player.isJumping &&
		player.isFalling &&
		player.velocity.y < 1 &&
		!player.getEffect("jump_boost") &&
		// Fence and wall blocks have a bigger Y hitbox
		!block.typeId.includes("fence") &&
		!block.typeId.includes("wall") &&
		// Standing on a shulker box and opening it pushes the player upwards
		!block.typeId.includes("_shulker_box")
	) {
		// Get the decimal portion of the Y position
		const yDecimal = Math.abs(player.location.y % 1);

		if(yDecimal > config.modules.scaffoldA.max_y_pos_diff && player.gamemode !== "Creative" && !player.isFlying) {
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
		Math.trunc(player.location.y) > Math.trunc(block.location.y) &&
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

world.afterEvents.playerBreakBlock.subscribe(({ player, dimension, block, brokenBlockPermutation }) => {
	const brokenBlockId = brokenBlockPermutation.type.id;

	let revertBlock = false;

	if(config.debug) console.warn(`${player.name} has broken the block ${brokenBlockId}`);

	// Nuker/A = Check if a player breaks more than 3 blocks in a tick
	if(config.modules.nukerA.enabled && ++player.blocksBroken > config.modules.nukerA.maxBlocks) {
		flag(player, "Nuker", "A", "World", `blocksBroken=${player.blocksBroken}`);
		revertBlock = true;
	}

	/*
	AutoTool/A = Checks for player slot mismatch

	When you mine a block with Horion's autotool, it starts mining the block without switching the item you're holding until 30-100ms later
	At that point, the player's selected slot is switched to the one that contains the item best fit to mine the block
	*/
	if(config.modules.autotoolA.enabled && player.flagAutotoolA && player.gamemode !== "Creative") {
		flag(player, "AutoTool", "A", "World", `selectedSlot=${player.selectedSlotIndex},lastSelectedSlot=${player.lastSelectedSlot},switchDelay=${player.autotoolSwitchDelay}`);
		revertBlock = true;
	}

	/*
		InstaBreak/A = Checks if a player in survival breaks an unbreakable block

		While the InstaBreak method used in Horion and Zephyr are patched, there are still some bypasse that exist
	*/
	if(
		config.modules.instabreakA.enabled &&
		player.gamemode !== "Creative" && 
		config.modules.instabreakA.unbreakable_blocks.includes(brokenBlockId)
	) {
		flag(player, "InstaBreak", "A", "Exploit", `block=${brokenBlockId}`);
		revertBlock = true;
	}

	if(config.misc_modules.oreAlerts.enabled && config.misc_modules.oreAlerts.blocks.includes(brokenBlockId) && !player.hasTag("op")) {
		tellAllStaff(`§r§6[§aScythe§6]§r [Ore Alerts] ${player.name} has broken 1x ${brokenBlockId}`, ["notify"]);
	}

	// Revert the broken block if a check was trigged
	if(revertBlock) {
		// Remove the item the block dropped when broken
		const droppedItems = dimension.getEntities({
			location: block.location,
			minDistance: 0,
			maxDistance: 2,
			type: "item"
		});

		for(const item of droppedItems) item.remove();

		// Restore the block back to its original state
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

	// Load custom nametags
	const { mainColor, borderColor, playerNameColor, defaultTag } = config.customcommands.tag;

	let tag = player.getDynamicProperty("tag");

	// Add default tag if enabled
	if(!tag && defaultTag) tag = defaultTag;

	if(tag) player.nameTag = `${borderColor}[§r${mainColor}${tag}${borderColor}]§r ${playerNameColor}${player.nameTag}`;

	// Namespoof/A = Username length check
	if(config.modules.namespoofA.enabled) {
		// When a sub-client joins a world, their name has a suffix of (x), with x being a number between 1-3.
		// To prevent any false positives with this, we make sure to omit that suffix from being calculated in the length checks
		const maxLength = config.modules.namespoofA.maxNameLength + ((/\([1-3]\)$/).test(player.name) ? 3 : 0);

		if(player.name.length < config.modules.namespoofA.minNameLength || player.name.length > maxLength) {
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
	BadPackets[5] = Checks if the player has an invalid max render distance


	This value is *not* the player's current render distance, but rather the max the player could set their render distance to.
	Vanilla clients would have this value set to 6-96 according to https://minecraftbedrock-archive.fandom.com/wiki/Render_Distance
	The article is slightly outdated as it is possible for really low-end devices to have a max render distance of 5.
	*/
	if(
		config.modules.badpackets5.enabled &&
		(player.clientSystemInfo.maxRenderDistance < 5 || player.clientSystemInfo.maxRenderDistance > 96)
	) flag(player, "BadPackets", "5", "Exploit", `maxRenderDistance=${player.clientSystemInfo.maxRenderDistance}`);

	// This is used in the onJoin.json animation to check if Beta APIs are enabled
	player.setScore("gametestapi", 1);

	// @ts-expect-error
	const globalmute = JSON.parse(world.getDynamicProperty("globalmute"));
	if(globalmute.muted && player.hasTag("op")) player.sendMessage(`§r§6[§aScythe§6]§r NOTE: Chat has been currently disabled by ${globalmute.muter}. Chat can be re-enabled by running the !globalmute command.`);

	if(config.misc_modules.welcomeMessage.enabled) {
		player.sendMessage(config.misc_modules.welcomeMessage.message.replace(/\[@player]/g, player.name));
	}

	// If enabled from previous login then activate
	if(player.hasTag("flying") && player.gamemode !== "Creative") player.runCommand("ability @s mayfly true");
	if(player.getDynamicProperty("muted")) player.runCommand("ability @s mute true");
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
		player.gamemode !== "Creative" &&
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

	// BadPackets[3] = Checks if a player attacks themselves
	// Some (bad) hacks use this to bypass anti-movement cheat checks
	if(config.modules.badpackets3.enabled && entity.id === player.id) flag(player, "BadPackets", "3", "Exploit");

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
	if(config.modules.killauraA.enabled && player.hasTag("right")) {
		const rightTicks = player.getScore("right");

		if(rightTicks > config.modules.killauraA.rightTicks) {
			flag(player, "Killaura", "A", "Combat", `ticks=${rightTicks}`);
		}
	}

	/*
	Killaura/B = Check for no swing
	For this check to work correctly Scythe has to be put at the top of the behavior packs list.
	Players with the haste effect are excluded as the effect can make players not swing their hand.
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

world.afterEvents.playerInventoryItemChange.subscribe(({ beforeItemStack: oldItemStack, itemStack, player, slot, inventoryType }) => {
	const moveVector = player.inputInfo.getMovementVector();

	// InventoryMods/B = Check if a player switches their selected item in the inventory while moving
	if(
		config.modules.inventorymodsB.enabled &&
		// This event can be trigged when equipping items in your hotbar by long-pressing
		inventoryType === PlayerInventoryType.Inventory &&
		player.isOnGround &&
		// Make sure the item was not previously air to avoid false positives when picking up items
		oldItemStack &&
		// Move vector allows us to check whether or not the player moved by pressing input keys and not other ways (such as water)
		moveVector.x !== 0 &&
		moveVector.y !== 0
	) flag(player, "InventoryMods", "B", "Inventory", `slot=${slot},oldItem=${oldItemStack?.typeId},newItem=${itemStack?.typeId}`, true);
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

	tellAllStaff(`§r§6[§aScythe§6]§r A ${watchdogTerminate.terminateReason} watch dog exception has been detected and has been automatically cancelled.`);
});

// When using /reload, the variables defined in playerSpawn event do not persist so we reapply them.
system.run(() => {
	const players = world.getPlayers();
	for(const player of players) {
		player.gamemode = player.getGameMode();
		player.lastGoodPosition = player.location;
	}
});