<div align="center">
  <b>Scythe Anticheat - The best anticheat designed for Minecraft Bedrock realms/worlds/servers.</b>

  <img src="https://raw.githubusercontent.com/MrDiamond64/image-assets/main/scythe%20pog%20anticheat.png" width="600" alt="Scythe Anticheat"/>
</div>
<div align="center">
  <img src="https://img.shields.io/github/downloads/Scythe-Anticheat/Scythe-AntiCheat/total?style=for-the-badge" alt="Downloads"/>
  <img src="https://img.shields.io/github/issues/Scythe-Anticheat/Scythe-AntiCheat?label=ISSUES%20OPEN&style=for-the-badge" alt="Issues Open"/>
  <img src="https://img.shields.io/github/commit-activity/m/Scythe-Anticheat/Scythe-AntiCheat?style=for-the-badge" alt="Commits Per Week"/>
  <img src="https://img.shields.io/github/last-commit/Scythe-Anticheat/Scythe-AntiCheat?style=for-the-badge" alt="Last Commit"/>
</div>

# Introduction
Scythe Anticheat is a Minecraft Bedrock anticheat for vanilla Realms and Servers. It utilizes the Scripting API to observe player behavior and check if such behaviors are possible in the vanilla game. Scythe is designed to be plug-and-play, so you just need to apply the pack to your world, upload it to your realm or server, and it should be up and ready.

# How To Setup
To install this anticheat to your realm, you will need to download the .mcpack to your device, apply it to your realm/server (make sure that Scythe is at the top of the behavior packs list), and enable Beta APIs in world settings. Once you have done that, the anticheat should be fully up and running!

# Custom Commands
To assist with server moderation, Scythe comes pre-included with a variety of commands. The most important ones are `!help`, `!notify`, `!stats`.

By default, cheat alert notifications are not shown. To be able to see these notifications, run the command `!notify`. Running the command again toggles your notify state, so you will no longer be shown cheat notifications.

The `!stats` command allows you to get an overview of a player's history with Scythe. Information such as their current device, any flagged checks, and whether they have Scythe-Op status are shown. You can rountinely check player history to see what kind of hacks they are using on your realm or server.

For a full list of commands, you can run the `!help` command. This output a list of all Scythe commands, organized by category, which you can use. Along with the command names, the syntax of the command and a description is included to better allow you to understand how each command functions. For a more technical overview of a command, you can run `!help` with a command name as an argument.

> [!NOTE]
> To be able to utilize most of these custom commands, you must have Scythe-Op. You can run `/function op` to gain the proper permissions to use the commands.


# Hacks detected by Scythe Anticheat
  AutoClicker -><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks for high CPS.<br/>

  AutoOffhand -><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks if a player equips an item in their offhand while moving.<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(B) => Checks if a player equips an item in their offhand while using an item.<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(C) => Checks if a player equips an item in their offhand while swinging their hand.<br/>

  AutoTool -><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks if a player switches their slot right after they start breaking a block.<br/>

  BadPackets -><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(1) => Checks for invalid player head rotations.<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(2) => Checks if chat messages have abnormal message lengths.<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(3) => Checks for self-hurt.<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(4) => Checks for newline or carriage return characters in messages.<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(5) => Checks if the player has an invalid max render distance.<br/>

  FastUse -><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks for using/throwing items at a very fast rate.

  InstaBreak -><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks if a player breaks an unbreakable block whilst in survival.<br/>

  InvalidSprint -><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks for sprinting while having the blindness effect.<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(C) => Checks for sprinting while sneaking.<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(E) => Checks for sprinting while riding an entity.<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(F) => Checks if a player sprints while they do not have enough hunger.<br/>

  InventoryMods-><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(B) => Check if a player switches the item they have selected in the inventory while moving.<br/>

  Killaura -><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks for attacking while using an item.<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(B) => Checks for no swing. (Instantly detects toolbox killaura)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(C) => Checks for multi-aura.<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(D) => Checks for attacking while sleeping.<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(E) => Checks for attacking while having a chest open.<br/>

  Namespoof -><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks if a player's name is longer than 16 characters.<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(B) => Checks for invalid characters in the player's name.<br/>

  NoSlow -><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks for high movement speeds while using or eating an item.

  Nuker -><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks if a player breaks more than 3 blocks in a single tick.

  Reach -><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks if a player hits an entity farther than normally possible.<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(B) => Checks if a player breaks a block farther than normally possible.<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(C) => Checks if a player places a block farther than normally possible.<br/>

  Spammer -><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks if a player sends a message while moving.<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(B) => Checks if a player sends a message while swinging their hand.<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(C) => Checks if a player sends a message while using an item.<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(D) => Checks if a player sends a message while having a chest opened.<br/>

  Scaffold -><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Check for tower-like behavior.<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(B) => Checks for a flat X/Y rotations (e.g. 10, 20, 30).<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(C) => Checks if a player places a block under them whilst looking upwards.<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(D) => Checks for downwards scaffold.<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(E) => Checks for placing blocks onto air or liquid tiles.<br/>

# FAQ
Q1: Does the AntiCheat auto-ban?<br/>
A1: Yes. Currently only the BadPackets[1], BadPackets[2], BadPackets[3], BadPackets[4], and BadPackets[5] checks autoban.

Q2: Is it customizable?<br/>
A2: Yes you can edit the config.js file to disable or change the settings of certain checks. A guide can be found [here](https://github.com/Scythe-Anticheat/Scythe-AntiCheat/wiki/How-to-Setup) (Outdated)