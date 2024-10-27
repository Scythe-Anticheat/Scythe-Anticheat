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
To install this anticheat to your realm, you will need to install the .mcpack to your device, apply it to your realm/server, and enable Beta APIs in world settings. Once you have done that, the anticheat should be fully up and running!

> [!IMPORTANT]
> Scythe must be applied at the top of the behavior packs list to ensure all features work properly.

To be able to use any chat commands, you will need to be Scythe-Opped. You can gain Scythe-OP by running `/function op` in Minecraft chat.

By default, notifications for when players are cheating are not shown. To be able to see cheat notifications you will need to run the `!notify` command.

> [!TIP]
> Scythe contains a variety of additional commands that can be used to help moderate your Realm or server. You can see a list of these additional commands by running the `!help` command.

# Hacks detected by Scythe Anticheat
*\* indicates that the check requires Beta APIs to be enabled in world settings.*<br/>
  AutoClicker -><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks for high CPS.\*<br/>

  AutoOffhand -><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks if a player equips an item in their offhand while moving.\*<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(B) => Checks if a player equips an item in their offhand while using an item.\*<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(C) => Checks if a player equips an item in their offhand while swinging their hand.\*<br/>

  AutoTool -><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks if a player switches their slot right after they start breaking a block.\*<br/>

  BadPackets -><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(1) => Checks for invalid player head rotations.<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(2) => Checks if chat messages have abnormal message lengths.\*<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(3) => Checks for self-hurt.\*<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(4) => Checks for newlines or carriage returns characters in messages.\*<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(5) => Checks if the player has an invalid max render distance.\*<br/>

  FastUse -><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks for using/throwing items at a very fast rate.\*

  InstaBreak -><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks if a player breaks an unbreakable block whilst in survival.\*<br/>

  InvalidSprint -><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks for sprinting while having the blindness effect.\*<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(C) => Checks for sprinting while sneaking.<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(E) => Checks for sprinting while riding an entity.<br/>

  InventoryMods-><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks for using an item while having a chest open.<br/>

  Killaura -><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks for attacking while using an item.\*<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(B) => Checks for no swing. (Instantly detects toolbox killaura)\*<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(C) => Checks for multi-aura.\*<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(D) => Checks for attacking while sleeping.\*<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(E) => Checks for attacking while having a chest open.\*<br/>

  Namespoof -><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks if a player's name is longer than 16 characters.\*<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(B) => Checks for invalid characters in the player's name.\*<br/>

  NoSlow -><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks for high movement speeds while using or eating an item.\*

  Nuker -><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks if a player breaks more than 3 blocks in a single tick.\*

  Reach -><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks if a player hits an entity farther than normally possible.\*<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(B) => Checks if a player breaks a block farther than normally possible.\*<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(C) => Checks if a player places a block farther than normally possible.\*<br/>

  Spammer -><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Checks if a player sends a message while moving.\*<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(B) => Checks if a player sends a message while swinging their hand.\*<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(C) => Checks if a player sends a message while using an item.\*<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(D) => Checks if a player sends a message while having a chest opened.\*<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(E) => Checks if a player sends multiple messages too quick.\*<br/>

  Scaffold -><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(A) => Check for tower-like behavior.\*<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(B) => Checks for a flat X rotation or Y rotation (e.g. 10, 20, 30).\*<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(C) => Checks if a player places a block under them whilst looking upwards.\*<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(D) => Checks for downwards scaffold.\*<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(E) => Checks for placing blocks onto air or liquid tiles.\*<br/>

# FAQ
Q1: Does the AntiCheat auto-ban?<br/>
Yes. Currently only BadPackets[3] autoban.

Q2: Is it customizable?<br/>
A2: Yes you can edit the config.js file to disable or change the settings of certain checks. A guide can be found [here](https://github.com/Scythe-Anticheat/Scythe-AntiCheat/wiki/How-to-Setup) (Outdated)