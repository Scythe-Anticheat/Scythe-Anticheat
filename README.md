<div align="center">
  ⚠️ The Scythe Anticheat Repository is being transferred to https://github.com/Scythe-Anticheat/Scythe-Anticheat. Please update any links to the new URL.⚠️
  
  
  <b>Scythe Anticheat - The best anticheat designed for Minecraft Bedrock realms/worlds/servers.</b>
  
  <img src="https://raw.githubusercontent.com/MrDiamond64/image-assets/main/scythe%20pog%20anticheat.png" width="600" alt="Scythe AntiCheat"/>
</div>
<div align="center">
  <img src="https://img.shields.io/github/downloads/Scythe-Anticheat/Scythe-AntiCheat/total?style=for-the-badge" alt="Downloads"/>
  <img src="https://img.shields.io/github/issues/Scythe-Anticheat/Scythe-AntiCheat?label=ISSUES%20OPEN&style=for-the-badge" alt="Issues Open"/>
  <img src="https://img.shields.io/github/commit-activity/m/Scythe-Anticheat/Scythe-AntiCheat?style=for-the-badge" alt="Commits Per Week"/>
  <img src="https://img.shields.io/github/last-commit/Scythe-Anticheat/Scythe-AntiCheat?style=for-the-badge" alt="Last Commit"/>
</div>

# How To Setup
To install this anticheat to your realm, you wll need to install the .mcpack to your device, apply it to your server and enable Beta APIs in world settings. Once you have done that, the anticheat should be fully up and running.

To be able to receive anticheat alerts, run the command: ```!notify```.

To run any chat commands or be able to use certain blocks please type ```/function op``` in chat. This command requires you to have operator permissions on the server and have Beta APIs enabled.

# Hacks detected by Scythe Anticheat
*\* indicates that the check requires Beta APIs to be enabled in world settings.*<br />
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
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(C) => Checks if an item is enchanted with an enchant that can't be applied to the item.\*<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(D) => Checks if an item has a lore.\*<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(E) => Checks if an item has duplicated enchantments.\*<br />

  BadPackets -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(1) => Checks for invalid player head rotations.<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(3) => Checks for self-hurt.\*<br />

  Command Block Exploit -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(B) => Replaces beehives and beenests with air.<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(C) => Kill all spawned in command block minecarts.<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(D) => Kills all NPC's. (to enable use /function settings/npc)<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(E) => Instant despawn time for command block minecarts.<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(F) => Prevents the placement of beehives, beenests and movingblocks.\*<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(G) => Additional killing check.\*<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(H) => Additional item clearing check.\*<br />

  FastUse -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks for using/throwing items at a very fast rate.\*

  Fly -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks for fly-like motion.\*<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(B) => Checks for negative fall damage.\*

  Illegal Items -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(B) => Clears illegal dropped items.<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(C) => Checks for items that are stacked over 64.\*<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(D) => Additional item clearing check.\*<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(E) => Cancel placement of illegal items.\*<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(F) => Checks if an item has a name longer than 32 characters.\*<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(H) => Checks if a player places an invalid piston.\*<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(I) => Checks if a player places a chest with items already inside it.\*<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(J) => Checks if a player places a sign with text already inside it.\*<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(K) => Checks if a player places a chest boat/minecart with items already inside it\*.<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(L) => Checks for keep on death items.\*<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(N) => Checks for placing a shulker box with illegal items.\*<br />

  InstaBreak -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks if a player breaks an unbreakable block whilst in survival.\*<br />

  InvalidSprint -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks for sprinting while having the blindness effect.\*<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(B) => Checks for sprinting while using an item.<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(C) => Checks for sprinting while sneaking.<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(D) => Checks for sprinting while using an elytra.<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(E) => Checks for sprinting while riding an entity.<br />

  InventoryMods-><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks for using an item while having a chest open.<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(B) => Checks for attacking players while having a chest open.<br />

  Killaura -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks for attacking while using an item.<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(B) => Checks for no swing. (Instantly detects toolbox killaura)<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(C) => Checks for multi-aura.\*<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(D) => Checks for attacking while sleeping.\*<br />

  Namespoof -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks if a player's name is longer than 16 characters.\*<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(B) => Checks for invalid characters in the player's name.\*<br />

  NoSlow -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks for high movement speeds while using or eating an item.\*

  Nuker -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks if a player breaks more than 3 blocks in a single tick.\*

  Reach -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Check if a player hits a player outside a 5 block radius.\*<br />

  Spammer -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks if a player sends a message while moving.\*<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(B) => Checks if a player sends a message while swinging their hand.\*<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(C) => Checks if a player sends a message while using an item.\*<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(D) => Checks if a player sends a message while having a chest opened.\*<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(E) => Checks if a player sends multiple messages too quick.\*<br />

  Tower -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Check for tower-like behavior.\*<br />

  Xray -><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Alerts staff if a player finds a diamond or ancient debris.\* (Disabled by default)

# Extra Commands
To receive anti-cheat alerts use: ```!notify```

To ban a player use: ```!ban <player> [time] [reason]```

To freeze a player use: ```!freeze <player>```

To enter vanish use: ```!vanish```

To be able to fly in survival mode use: ```!fly [player]```

To view a players anticheat logs use: ```!stats <player>```

To clear someones ender chest use: ```!ecwipe <player>```

Additionally, there are custom features you can enable like anti-gamemode change to further enhance your realm security, these options can be listed with ```!modules```

# FAQ

Q1: Does the AntiCheat auto-ban?<br />
Yes. Currently only CommandBlockExploit/F, IllegalItems/C, IllegalItems/D, IllegalItems/E, and Crasher/A autoban. To enable autobanning do ```!autoban```

Q2: Is it customizable?<br />
A2: Yes you can edit the config.js file to disable or change the settings of certain checks. A guide can be found [here](https://github.com/Scythe-Anticheat/Scythe-AntiCheat/wiki/How-to-Setup) (Outdated)

# Notes
When applying the pack to your world, make sure the addon is at the top of the behavior packs list and Beta APIs are enabled. This is to ensure all checks work properly.
