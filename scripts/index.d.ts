import { Player, Entity, ItemStack, Vector2, Vector3, GameMode } from "@minecraft/server";

declare module "@minecraft/server" {
	interface Player {
		// Booleans
		lastSprintState: boolean
		isUsingItem: boolean

		// Strings
		heldItem: string

		// Numbers
		blocksBroken: number
		clicks: number
		firstAttack: number
		lastLeftClick: number
		lastMessageSent: number
		lastThrow: number
		startBreakTime: number
		movedAt: number
		itemUsedAt: number

		// Arrays
		entitiesHit: Set<String>
		reports: Set<String>
		
		// Objects
		lastCursorItem?: ItemStack
		lastOffhandItem?: ItemStack
		lastGoodPosition: Vector3

		// Custom functions
		addOp(initiator?: Player): void
		removeOp(initiator?: Player): void

		ban(initiator?: Player | null, reason?: String, time?: Number | null): void

		enableFly(initiator?: Player): void
		disableFly(initiator?: Player): void

		getMaxBlockPlaceDistance(): number

		freeze(initiator?: Player): void
		unfreeze(initiator?: Player): void

		kick(initiator?: Player | null, reason?: String, silent?: Boolean): void

		isMuted(): boolean
		mute(initiator?: Player | null, reason?: String): void
		unmute(initiator?: Player | null, reason?: String): void

		isUsingInputKeys(): boolean

		wipeEnderchest(initiator?: Player): void
	}

	interface Entity {
		// Custom functions
		getClosestPlayer(): Player
		getScore(objective: String, defaultValue?: number): number
		setScore(objectiveName: String, value: number): void
	}
}