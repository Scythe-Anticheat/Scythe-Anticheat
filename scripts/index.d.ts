import { Player, Entity, ItemStack, Vector2, Vector3, GameMode } from "@minecraft/server";

declare module "@minecraft/server" {
	interface Player {
		// Booleans
		flagAutotoolA: boolean
		isMoving: boolean

		// Strings
		gamemode: GameMode
		heldItem: string

		// Numbers
		autotoolSwitchDelay: number
		blocksBroken: number
		cps: number
		firstAttack: number
		lastLeftClick: number
		lastMessageSent: number
		lastSelectedSlot: number
		lastThrow: number
		selectedSlotIndex: number
		startBreakTime: number
		movedAt: number
		blindedAt: number

		// Arrays
		entitiesHit: Array<String>
		reports: Array<String>
		
		// Objects
		lastCursorItem?: ItemStack
		lastOffhandItem?: ItemStack
		lastGoodPosition: Vector3
		rotation: Vector2
		velocity: Vector3
	}
}