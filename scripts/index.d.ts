import { Player, Entity, ItemStack, Vector2, Vector3, GameMode } from "@minecraft/server";

declare module "@minecraft/server" {
	interface Player {
		// Booleans
		flagAutotoolA: boolean
		lastSprintState: boolean
		isUsingItem: boolean

		// Strings
		gamemode: GameMode
		heldItem: string

		// Numbers
		autotoolSwitchDelay: number
		blocksBroken: number
		clicks: number
		firstAttack: number
		lastLeftClick: number
		lastMessageSent: number
		lastSelectedSlot: number
		lastThrow: number
		selectedSlotIndex: number
		startBreakTime: number
		movedAt: number
		itemUsedAt: number

		// Arrays
		entitiesHit: Set<String>
		reports: Array<String>
		
		// Objects
		lastOffhandItem?: ItemStack
		lastGoodPosition: Vector3
		rotation: Vector2
		velocity: Vector3

		// Custom functions
		addOp(initiator?: Player): void
		removeOp(initiator?: Player): void
		ban(initiator?: Player | null, reason?: String, time?: Number | null): void
		enableFly(initiator?: Player): void
		disableFly(initiator?: Player): void
		freeze(initiator?: Player): void
		unfreeze(initiator?: Player): void
		isUsingInputKeys(): boolean
		wipeEnderchest(initiator?: Player): void
	}

	interface Entity {
		// Custom functions
		getScore(objective: String, defaultValue?: number): number
		setScore(objectiveName: String, value: number): void
	}
}