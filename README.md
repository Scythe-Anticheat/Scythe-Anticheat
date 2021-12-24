<div align="center">
  <b>Scythe AntiCheat - The best anticheat designed for Minecraft Bedrock realms/worlds/servers.</b>
  
  <img src="https://raw.githubusercontent.com/MrDiamond64/image-assets/main/scythe%20pog%20anticheat.png" width="600" alt="Scythe AntiCheat"/>
</div>
<div align="center">
  <img src="https://img.shields.io/github/downloads/MrDiamond64/Scythe-AntiCheat/total?style=for-the-badge" alt="Downloads"/>
  <img src="https://img.shields.io/github/issues/MrDiamond64/Scythe-AntiCheat?label=ISSUES%20OPEN&style=for-the-badge" alt="Issues Open"/>
  <img src="https://img.shields.io/github/commit-activity/m/MrDiamond64/Scythe-AntiCheat?style=for-the-badge" alt="Commits Per Week"/>
  <img src="https://img.shields.io/github/last-commit/MrDiamond64/Scythe-AntiCheat?style=for-the-badge" alt="Last Commit"/>
</div>

# How To Setup
To install this anticheat to your realm/world you need to install the .mcpack, apply it to your world and enable GameTest Framework, once you have done this the anticheat should be fully up and running.

To receive anti-cheat alerts use this command: ```/function notify```

If your world contains NPC's, make sure to use the ```/function setting/npc``` command or they will be insta-killed

# List of hacks detected by Scythe AntiCheat

  AutoClicker -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Max CPS check.

  AutoTotem -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks if a player equips a totem while moving<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(B) => Checks if a player equips a totem while using an item<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(C) => Checks if a player equips a totem while swinging their hand<br />
      
  BadPackets -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(1) => Checks for invalid player head rotations<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(2) => Chat message length check (Requires GameTest Framework)
   
  Command Block Exploit -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Clears animal buckets/beehives<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(B) => Replaces beehives with air<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(C) => Kills all command block minecarts<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(D) => Kills all NPC's (to disable use /function settings/npc)<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(E) => Instant despawn time for command block minecarts<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(F) => Kills all falling block entities
      
  Crasher -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks if a player's position is invalid. (Requires GameTest FrameWork)<br />
 
  Disabler -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Detects Penguins Admin Giver by intercepting a function it runs.

  Ender Pearl Glitching -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks if an ender pearl is inside a climbable block.

  Fly -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks for creative fly while in survival.
   
  Illegal Items -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Clears illegal items from everybody's inventories.<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(B) => Clears dropped items.<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(C) => Checks for items that are stacked over 64. (Requires GameTest FrameWork)
      
  InvalidSprint -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks for sprinting while having the blindness effect. (Requires GameTest FrameWork)<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(B) => Checks for sprinting while using and item.<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(C) => Checks for sprinting while sneaking.<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(D) => Checks for sprinting while using an elytra.<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(E) => Checks for sprinting while not actually moving.<br />

  InventoryMods-><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks for moving while having a chest open.<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(B) => Checks for sneaking while having a chest open.<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(C) => Checks for using an item while having a chest open.<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(D) => Checks for attacking players while having a chest open.<br />

  InteractUse -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks if a player is using an item while swinging their hand.
      
  Jesus -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks if the player is above water/lava blocks.<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(B) => Motion check. (Requires GameTest FrameWork)>

  NameSpoof -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks if a player's name is longer then 16 characters. (Requires GameTest FrameWork)<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(B) => Invalid characters check. (Requires GameTest FrameWork)<br />

  NoSlow -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks for high movement speeds while using or eating an item. (Requires GameTest FrameWork)

  Phase -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Detect if someone moves inside a block.
      
  Spammer -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks if someone sends a message while moving. (Requires GameTest FrameWork)<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(B) => Checks if someone sends a message while swinging their hand. (Requires GameTest FrameWork)<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(C) => Checks if someone sends a message while using an item. (Requires GameTest FrameWork)<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(D) => Checks if someone sends a message while having a chest opened. (Requires GameTest FrameWork)<br />

  Reach -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Check if someone hits a player outside a 4.5 block radius. (Requires GameTest FrameWork)

  Xray -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Alerts staff if a player finds a diamond or ancient debris.


# Extra Commands
To receive anti-cheat alerts use: ```/function notify```

To ban a player use: ```/execute <playername> ~~~ function ban```

To freeze a player use: ```/execute <playername> ~~~ function tools/freeze```

To enter vanish use: ```/function tools/vanish```

To be able to fly in survival mode use: ```/function tools/fly```

To view a players anticheat logs use: ```/execute <playername> ~~~ function tools/stats```

To clear someones ender chest use: ```/execute <playername> ~~~ function tools/ecwipe```

Additionally, there are custom features you can enable like anti-gamemode change to further enhance your realm security, these options can be used by /function settings/<name>

# FAQ

Q1: Does the AntiCheat auto-ban?<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A1: No.

Q2: Is it customizable?<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A2: Yes using /function settings/<name> or by modifying the .mcfunction files

# Notes
When applying the pack to your world make sure the addon is at the top of the behavior pack list and GameTest Framework is enabled. This is to ensure all checks and systems work properly

# License
**You MAY;**<br />
Modify it<br />
Use it (public/private use)<br />
Using its code (with permission)<br />

**YOU MAY NOT;**<br />
Steal code<br />
Claim it as your own<br />
Sell it<br />