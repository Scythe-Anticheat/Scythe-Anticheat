# Scythe-AntiCheat
Scythe AntiCheat - a simple, basic anticheat for Minecraft Bedrock Edition realms or servers.


# How To Use?
To install this anticheat to your realm/world you need to install the .mcaddon and apply it to your world, once you do that join that world and use "/function setup/init". This will give you a command block which then you need to add this command: "function main".

To recieve anti-cheat alerts use this command: ```/function notify```

# List of checks detected by Scythe AntiCheat

   Angle -><br />
      (A) = checks if the players yaw/pitch is greater than normal
   
   AutoClicker -><br />
      (A) = checks how much left clicks the player sends
   
   Command Block Exploit -><br />
      (A) = Clears animal buckets/beehives
      (B) = Replaces beehives with air
      (C) = Kill all command block minecarts
      (D) = Kills all NPC's (to disable edit the cbe check)
      (E) = Instant despawn time for command block minecarts
 
  Ender Pearl Glitching -><br />
      (A) => Checks if an ender pearl is inside a climable block.
   
  Illegal Items -><br />
      (A) => Clears illegal items from everybodys inventories.
      
  InteractUse -><br />
      (A) => Checks if a player is using an item white hitting/interacting with items
 
  Jesus -><br />
      (A) => Checks if the player is above water/lava blocks.
 
  KillAura -><br />
      (A) => Spawns a fake entity behind the player and checks if they hit it.
 
  Phase -><br />
      (A) => Detect if someone moves inside a block
 
  Speed -><br />
      (A) = spawns in an entity and sees how far the player moves away from it.

# Extra Commands.

To recieve anti-cheat alerts use this command: ```/function notify```

To ban a user use: ```/execute <playername> ~~~ function ban```

To freeze a player use: ```/tag <playername> add freeze```

To make a player bypass all checks use: ```/tag <playername> add bypass```

To enter Vanish use: ```/function tools/vanish```

To be able to fly in survival use: ```/function tools/fly```

To view a players anticheat logs use: ```/execute <playername> ~~~ function tools/stats```

# FAQ

Q1: Does the AntiCheat auto-ban?<br />
A1: No.

Q2: Is it customizable?<br />
A2: Yes but you need to modify the .mcfunction files

# Notes:

When applying the pack to your world make sure it is at the top to ensure all checks work properly.
