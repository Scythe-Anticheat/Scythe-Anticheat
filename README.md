<div align="center">
  <b>Scythe AntiCheat - an AntiCheat designed for Minecraft Bedrock realms/worlds/servers.</b>

  <img src="https://raw.githubusercontent.com/MrDiamond64/image-assets/main/scythe%20pog%20anticheat.png" width="600" alt="Scythe AntiCheat" />
   
</div>

# How To Setup
To install this anticheat to your realm/world you need to install the .mcpack and apply it to your world and it should be fully up and running

To receive anti-cheat alerts use this command: ```/function notify```

If your world contains NPC's, make sure to use the ```/function setting/npc``` command or they will be insta-killed

# List of hacks detected by Scythe AntiCheat

  AutoTotem -><br />
      (A) = Checks if a player equips a totem while moving<br />
      (B) = Checks if a player equips a totem while using an item<br />
      (C) = Checks if a player equips a totem while sneaking<br />
      
  BadPackets -><br />
      (1) = Checks if the players yaw/pitch is greater than normal<br />
      (2) = Chat message length check (Requires GameTest Framework)
   
  Command Block Exploit -><br />
      (A) = Clears animal buckets/beehives<br />
      (B) = Replaces beehives with air<br />
      (C) = Kill all command block minecarts<br />
      (D) = Kills all NPC's (to disable use /function settings/npc)<br />
      (E) = Instant despawn time for command block minecarts
      
  Crasher -><br />
      (A) = Checks if a player's position is invalid. (Requires GameTest FrameWork)<br />
 
  Ender Pearl Glitching -><br />
      (A) => Checks if an ender pearl is inside a climbable block.
      
  Fly -><br />
      (B) => AirJump check (Requires GameTest FrameWork)
   
  Illegal Items -><br />
      (A) => Clears illegal items from everybody's inventories.<br />
      (B) => Clears dropped items.
      
  InteractUse -><br />
      (A) => Checks if a player is using an item white hitting/interacting with items
      
  Jesus -><br />
      (A) => Checks if the player is above water/lava blocks.<br />
      (B) => Motion check.

  NameSpoof -><br />
      (A) => Checks if a player's name is longer then 16 characters (Requires GameTest FrameWork)<br />
      (B) => Invalid characters check. (Requires GameTest FrameWork)<br />

  Phase -><br />
      (A) => Detect if someone moves inside a block
      
  Spammer -><br />
      (A) => Checks if someone sends a message while moving<br />
      (B) => Checks if someone sends a message while sneaking<br />
      (C) => Checks if someone sends a message while swinging their hand<br />
      (D) => Checks if someone sends a message while using an item<br />

  Reach -><br />
      (A) => Check if someone hits a player outside a 5 block radius


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
Redistribute it without proper credit.
