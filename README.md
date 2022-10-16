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

To receive anti-cheat alerts use: ```/function notify```

To run any chat commands or be able to use certian blocks run ```/function op```

# List of hacks detected by Scythe AntiCheat
*\* indicates that the check requires GameTest Framework to be enabled in world settings.*<br />
  AutoClicker -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks for high CPS.\*<br />

  AutoTool -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks if a player switches their slot right after they start breaking a block.\*<br />

  AutoShield -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks if a player equips a shield while moving.<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(B) => Checks if a player equips a shield while using an item.<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(C) => Checks if a player equips a shield while swinging their hand.<br />

  AutoTotem -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks if a player equips a totem while moving.<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(B) => Checks if a player equips a totem while using an item.<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(C) => Checks if a player equips a totem while swinging their hand.<br />

  BadEnchants -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks for enchantment levels exceeding vanilla limits.\*<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(B) => Checks for negative enchantment levels.\*<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(C) => Checks if an item is enchanted with an enchant that cant be applied to the item.\*<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(D) => Checks if an item has a lore.\*<br />

  BadPackets -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(1) => Checks for invalid player head rotations.<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(2) => Checks for invalid chat message lenghts.\*<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(3) => Checks for self-hurt.\*<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(4) => Checks for invalid selected slot.\*<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(5) => Checks for Horion Freecam.\*<br />

  Command Block Exploit -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Clears animal buckets/beehives.<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(B) => Replaces beehives and beenests with air.<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(C) => Kills all command block minecarts.<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(D) => Kills all NPC's. (to enable use /function settings/npc)<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(E) => Instant despawn time for command block minecarts.<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(F) => Prevents the placement of beehives, beenests and movingblocks.\*<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(G) => Additional killing check.\*<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(H) => Additional item clearing check.\*<br />

  Crasher -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks if a player's position is invalid.\*<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(B) => Checks for crash arrow items.\*<br />

  Fly -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks for fly-like motion.\*

  Illegal Items -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Clears illegal items from everybody's inventories.<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(B) => Clears dropped items.<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(C) => Checks for items that are stacked over 64.\*<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(D) => Additional item clearing check.\*<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(E) => Cancel placement of illegal items.\*<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(F) => Checks if an item has a name longer then 32 characters.\*<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(G) => Checks if a player used a fireworks rocket with flight duration greater then 3.<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(H) => Checks if a player places an invalid piston.<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(I) => Checks if a player places a chest with items already inside.<br />

  InvalidSprint -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks for sprinting while having the blindness effect.\*<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(B) => Checks for sprinting while using an item.<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(C) => Checks for sprinting while sneaking.<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(D) => Checks for sprinting while using an elytra.<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(D) => Checks for sprinting while not actually moving.\*<br />

  InventoryMods-><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks for using an item while having a chest open.<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(B) => Checks for attacking players while having a chest open.<br />

  Killaura -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks for attacking while using an item.<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(B) => Checks for no swing. (Instantly detects toolbox killaura)<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(C) => Checks for multi-aura.\*<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(C) => Checks for attacking while sleeping.\*<br />

  LiquidInteract -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks for breaking liquid source blocks.\*<br />

  NameSpoof -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks if a player's name is longer then 16 characters.\*<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(B) => Invalid characters check.\*<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(C) => Checks if the player name has changed.\*<br />

  NoSlow -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks for high movement speeds while using or eating an item.\*

  Nuker -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks if a player breaks more then 3 blocks in a tick.\*

  Spammer -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks if someone sends a message while moving.\*<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(B) => Checks if someone sends a message while swinging their hand.\*<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(C) => Checks if someone sends a message while using an item.\*<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(D) => Checks if someone sends a message while having a chest opened.\*<br />

  Reach -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Check if someone hits a player outside a 5 block radius.\*<br />

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
Yes. Currently only CommandBlockExploit/F, IllegalItems/C, IllegalItems/D, IllegalItems/E and Crasher/A autoban. To enable autobanning do /function settings/autoban

Q2: Is it customizable?<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A2: Yes using /function settings/<name> or by modifying the .mcfunction files

# Notes
When applying the pack to your world make sure the addon is at the top of the behavior pack list and GameTest Framework is enabled. This is to ensure all checks and systems work properly
