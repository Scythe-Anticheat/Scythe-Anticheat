import { Player, Entity, ItemStack, Vector2, Vector3, GameMode } from "@minecraft/server";

declare module "@minecraft/server" {
	interface Player {
		// Booleans
		flagAutotoolA: boolean
		isMoving: boolean

		// Numbers
		blocksBroken: number
		startBreakTime: number
		lastSelectedSlot: number
		autotoolSwitchDelay: number
		cps: number
		firstAttack: number
		lastThrow: number
		lastMessageSent: number

		// Arrays
		entitiesHit: Array<String>
		reports: Array<String>
		
		// Objects
		lastGoodPosition: Vector3
		velocity: Vector3
		rotation: Vector2
		lastCursorItem?: ItemStack
	}

	interface Entity {
		// Booleans
		flagAutotoolA: boolean

		// Strings
		name: string
		gamemode: GameMode
		heldItem: string

		// Numbers
		cps: number,
		selectedSlotIndex: number
		lastThrow: number
		startBreakTime: number
		lastSelectedSlot: number
		autotoolSwitchDelay: number
		lastMessageSent: number
		lastLeftClick: number

		// Arrays
		entitiesHit: Array<String>
	}
}