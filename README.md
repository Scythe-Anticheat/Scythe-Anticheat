<div align="center">
  <b>Scythe AntiCheat - an AntiCheat designed for Minecraft Bedrock realms/worlds/servers.</b>

  <img src="https://raw.githubusercontent.com/MrDiamond64/image-assets/main/scythe%20pog%20anticheat.png" width="600" alt="Scythe AntiCheat"/>
</div>
<div align="center">
  <img src="https://img.shields.io/github/downloads/MrDiamond64/Scythe-AntiCheat/total?style=for-the-badge" alt="Downloads"/>
  <img src="https://img.shields.io/github/issues/MrDiamond64/Scythe-AntiCheat?label=ISSUES%20OPEN&style=for-the-badge" alt="Issues Open"/>
  <img src="https://img.shields.io/github/commit-activity/m/MrDiamond64/Scythe-AntiCheat?style=for-the-badge" alt="Commits Per Week"/>
  <img src="https://img.shields.io/github/last-commit/MrDiamond64/Scythe-AntiCheat?style=for-the-badge" alt="Last Commit"/>
</div>

# How To Setup
To install this anticheat to your realm/world you need to install the .mcpack and apply it to your world and it should be fully up and running

To receive anti-cheat alerts use this command: ```/function notify```

If your world contains NPC's, make sure to use the ```/function setting/npc``` command or they will be insta-killed

# List of hacks detected by Scythe AntiCheat

  AutoTotem -><br />
      (A) => Checks if a player equips a totem while moving<br />
      (B) => Checks if a player equips a totem while using an item<br />
      (C) => Checks if a player equips a totem while swinging their hand<br />
      
  BadPackets -><br />
      (1) => Checks for invalid player head rotations<br />
      (2) => Chat message length check (Requires GameTest Framework)
   
  Command Block Exploit -><br />
      (A) => Clears animal buckets/beehives<br />
      (B) => Replaces beehives with air<br />
      (C) => Kill all command block minecarts<br />
      (D) => Kills all NPC's (to disable use /function settings/npc)<br />
      (E) => Instant despawn time for command block minecarts
      
  Crasher -><br />
      (A) => Checks if a player's position is invalid. (Requires GameTest FrameWork)<br />
 
  Ender Pearl Glitching -><br />
      (A) => Checks if an ender pearl is inside a climbable block.
      
  Fly -><br />
      (B) => AirJump check (Requires GameTest FrameWork)
   
  Illegal Items -><br />
      (A) => Clears illegal items from everybody's inventories.<br />
      (B) => Clears dropped items.
      
  InventoryMods-><br />
      (A) => Checks for moving while having a chest open.<br />
      (B) => Checks for sneaking while having a chest open.<br />
      (C) => Checks for using an item while having a chest open.<br />
      (D) => Checks for attacking players while having a chest open.<br />
      
  InteractUse -><br />
      (A) => Checks if a player is using an item while swinging their hand
      
  Jesus -><br />
      (A) => Checks if the player is above water/lava blocks.<br />
      (B) => Motion check. (Requires GameTest FrameWork)

  NameSpoof -><br />
      (A) => Checks if a player's name is longer then 16 characters (Requires GameTest FrameWork)<br />
      (B) => Invalid characters check. (Requires GameTest FrameWork)<br />

  Phase -><br />
      (A) => Detect if someone moves inside a block
      
  Spammer -><br />
      (A) => Checks if someone sends a message while moving. (Requires GameTest FrameWork)<br />
      (B) => Checks if someone sends a message while swinging their hand. (Requires GameTest FrameWork)<br />
      (C) => Checks if someone sends a message while using an item. (Requires GameTest FrameWork)<br />
      (D) => Checks if someone sends a message while having a chest opened. (Requires GameTest FrameWork)<br />

  Reach -><br />
      (A) => Check if someone hits a player outside a 4.5 block radius. (Requires GameTest FrameWork)

  Xray -><br />
      (A) => Alerts staff if a player finds a diamond or ancient debris


# Extra Commands.

To receive anti-cheat alerts use this command: ```/function notify```

To ban a user use: ```/execute <playername> ~~~ function ban```

To freeze a player use: ```/execute <playername> ~~~ function tools/freeze```

To enter Vanish use: ```/function tools/vanish```

To be able to fly in survival mode use: ```/function tools/fly```

To view a players anticheat logs use: ```/execute <playername> ~~~ function tools/stats```

To clear someones ender chest use: ```/execute <playername> ~~~ function tools/ecwipe```

Additionally, there are custom features you can enable like anti gamemode change to further enhance your realm security, these options can be used by /function settings/<name>

# FAQ

Q1: Does the AntiCheat auto-ban?

A1: No.

Q2: Is it customizable?<br />
A2: Yes using /function settings/<name> or by modifying the .mcfunction files

# Notes:

When applying the pack to your world make sure it is at the top to make sure all checks work properly.

# License
**You MAY;**<br />
Modify it<br />
Use it (public/private use)<br />
Using its code (with permission)<br />

**YOU MAY NOT;**<br />
Steal code<br />
Claim it as your own<br />
Sell it<br />