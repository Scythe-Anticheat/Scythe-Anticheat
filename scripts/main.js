// @ts-check
import config from "./data/config.js";
import checks from "./checks/registry.js";
import modules from "./modules/registry.js";
import { world, system, Player, EquipmentSlot, GameMode } from "@minecraft/server";
import { tellAllStaff } from "./util.js";
import { banMessage } from "./assets/ban.js";
import { mainGui, playerSettingsMenuSelected } from "./assets/ui.js";
import { commandHandler } from "./commands/handler.js";

world.beforeEvents.chatSend.subscribe((msg) => {
	const { sender: player } = msg;

	if(player.isMuted()) {
		player.sendMessage("§r§6[§aScythe§6]§r Your message was not sent as you are currently muted.");
		msg.cancel = true;
	}

	commandHandler(msg);

	// @ts-expect-error
	const globalmute = JSON.parse(world.getDynamicProperty("globalmute"));
	if(!msg.cancel && globalmute.muted && !player.hasTag("op")) {
		player.sendMessage(`§r§6[§aScythe§6]§r Your message was not sent as the chat is disabled by ${config.commands.globalmute.showModeratorName ? globalmute.muter : "a server admin"}.`);
		msg.cancel = true;
	}
});

system.runInterval(() => {
	// Run as each player
	const players = world.getPlayers();
	// Oddly enough, this method of looping over all online player's is slightly more efficient than `for(const player of players)`
	for(let i = 0; i < players.length; i++) {
		const player = players[i];

		try {
			// Get the item in the player's offhand
			const offhandItem = player.getComponent("equippable")?.getEquipment(EquipmentSlot.Offhand);

			if(config.modules.nukerA.enabled && player.blocksBroken >= 1) checks.nukerA.tick(player);
			if(config.modules.killauraC.enabled && player.entitiesHit.size >= 1) checks.killauraC.tick(player);

			if(config.modules.badpackets1.enabled) checks.badpackets1.tick(player);

			// Check if the player just started sprinting
			if(!player.lastSprintState && player.isSprinting) {
				if(config.modules.invalidsprintA.enabled) checks.invalidsprintA.tick(player);
				if(config.modules.invalidsprintB.enabled) checks.invalidsprintB.tick(player);
				if(config.modules.invalidsprintC.enabled) checks.invalidsprintC.tick(player);
				if(config.modules.invalidsprintD.enabled) checks.invalidsprintD.tick(player);
				if(config.modules.invalidsprintE.enabled) checks.invalidsprintE.tick(player);
				if(config.modules.invalidsprintF.enabled) checks.invalidsprintF.tick(player);
			}

			// Check if an item was equipped to the offhand
			if(!player.lastOffhandItem && offhandItem) {
				if(config.modules.autooffhandA.enabled) checks.autooffhandA.tick(player);
			}

			/*
			The Minecraft world has an invisible barrier at Y level -104 that is impossible to pass through
			Using TP hacks or glitches, it is possible to go beyond that barrier, so we bring the player back to -104 if they go beyond it
			*/
			if(player.location.y < -104) player.tryTeleport({ x: player.location.x, y: -104, z: player.location.z });

			if(config.misc_modules.worldborder.enabled) modules.WorldBorder.tick(player);

			if(player.getDynamicProperty("vanished")) player.onScreenDisplay.setActionBar("§aYOU ARE VANISHED!");

			player.lastOffhandItem = offhandItem;

			// Store the players last good position
			// When a movement-related check flags the player, they will be teleported to this position
			// xRot and yRot being 0 means the player position was modified from player.teleport, which we should ignore
			const rotation = player.getRotation();
			if(rotation.x !== 0 && rotation.y !== 0) player.lastGoodPosition = player.location;

			player.lastSprintState = player.isSprinting;
		} catch (/** @type {any} */ error) {
			console.error(error.stack);
			if(player.hasTag("errorlogger")) tellAllStaff(`§r§6[§aScythe§6]§r There was an error while running the tick event. Please forward this message to https://discord.gg/9m9TbgJ973.\n-------------------------\n${error}\n${error.stack || "\n"}-------------------------`, ["errorlogger"]);
		}
	}
}, 1);

world.beforeEvents.playerBreakBlock.subscribe((data) => {
	const { player, block } = data;

	if(config.debug) console.warn(`${player.name} has broken the block ${block.typeId}`);
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

	// This is used in the onJoin.json animation to check if Beta APIs are enabled
	player.setScore("gametestapi", 1);

	// @ts-expect-error
	const globalmute = JSON.parse(world.getDynamicProperty("globalmute"));
	if(globalmute.muted && player.hasTag("op")) player.sendMessage(`§r§6[§aScythe§6]§r NOTE: Chat has been currently disabled by ${globalmute.muter}. Chat can be re-enabled by running the !globalmute command.`);

	// If enabled from previous login then activate
	if(player.hasTag("flying") && player.getGameMode() !== GameMode.Creative) player.runCommand("ability @s mayfly true");
	if(player.isMuted()) player.runCommand("ability @s mute true");
	if(player.getDynamicProperty("frozen")) player.triggerEvent("scythe:freeze");
});

world.afterEvents.entityHitEntity.subscribe(({ hitEntity: entity, damagingEntity: player }) => {
	// Hitting an end crystal causes an error when trying to get the entity location, so we make sure the entity is valid to fix that
	if(!(player instanceof Player) || !entity.isValid) return;

	tellAllStaff(`§߈§r§6[§aScythe§6]§r §breceived §aATTACK§r action from: §g${player.name} §7(isSprinting=${player.isSprinting})`, ["actionlogger"]);

	// Check if the player was hit with the UI item, and if so open the UI for that player
	if(config.commands.ui.enabled && entity instanceof Player && !config.commands.ui.requiredTags.some(tag => !player.hasTag(tag))) {
		const container = player.getComponent("inventory")?.container;
		if(!container) return; // This should not happen

		const item = container.getItem(player.selectedSlotIndex);
		if(item?.typeId === config.commands.ui.ui_item && item.nameTag === config.commands.ui.ui_item_name) {
			playerSettingsMenuSelected(player, entity);
		}
	}
});

world.beforeEvents.itemUse.subscribe((itemUse) => {
	const { source: player } = itemUse;
	if(!(player instanceof Player)) return;

	// Patch bypasses for the freeze system
	if(player.getDynamicProperty("frozen")) itemUse.cancel = true;
});

world.afterEvents.itemUse.subscribe(({ itemStack: item, source: player }) => {
	// itemUse can be triggered from entities
	if(!(player instanceof Player)) return;

	// If the player is holding the UI axe and has the proper permissions, then open the UI
	if(
		config.commands.ui.enabled &&
		item.typeId === config.commands.ui.ui_item &&
		item.nameTag === config.commands.ui.ui_item_name &&
		!config.commands.ui.requiredTags.some(tag => !player.hasTag(tag))
	) {
		mainGui(player);
	}
});

world.afterEvents.playerInventoryItemChange.subscribe(({ itemStack, player, slot }) => {
	// Check if the item in the player's current selected slot has changed
	if(slot === player.selectedSlotIndex) {
		player.heldItem = itemStack?.typeId ?? "minecraft:air";
	}
});

world.afterEvents.itemStartUse.subscribe(({ source: player }) => {
	player.isUsingItem = true;
	player.itemUsedAt = Date.now();
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
	// Prevent malicious users from purposely lagging out scripts in order to force the world to crash from the Scripting API's Watchdog
	watchdogTerminate.cancel = true;

	tellAllStaff(`§r§6[§aScythe§6]§r A ${watchdogTerminate.terminateReason} watch dog exception has been detected and has been automatically cancelled.`);
});

// When using /reload, the variables defined in playerSpawn event do not persist so we reapply them
system.run(() => {
	const players = world.getPlayers();
	for(const player of players) {
		player.lastGoodPosition = player.location;
		player.heldItem = player.getComponent("inventory")?.container?.getItem(player.selectedSlotIndex)?.typeId ?? "minecraft:air";
	}
});