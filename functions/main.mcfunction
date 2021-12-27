# Prevents disabler hacks from possibly disabling the anticheat
gamerule randomtickspeed 1

# Run all the checks
function checks/angle
function checks/autoclicker
function checks/cbe
function checks/gamemode
function checks/illegalitems
function checks/others

# Specific criteria checks
execute @s[type=player,tag=isBanned] ~~~ function checks/ban
execute @e[type=ender_pearl,r=5] ~~~ function checks/epearlglitching
execute @s[type=player,tag=moving,tag=!flying,m=!c,tag=!jump,tag=!riding,tag=!gliding,tag=!levitating,tag=!vanish] ~~~ function checks/jesus
execute @s[type=player,tag=moving,tag=!gliding,tag=!riding,tag=!vanish] ~~~ function checks/phase

# Optional checks
execute @s[scores={commandblocks=1..}] ~~~ function checks/optional/nocommandblocks
execute @s[scores={cmds=1..}] ~~~ function checks/optional/overridecommandblocksenabled
replaceitem entity @s[type=player,tag=!op,scores={frostwalker=1..}] slot.armor.feet 0 leather_boots 1 0 {"item_lock": {"mode": "lock_in_slot"},"keep_on_death":{}}
execute @s[type=player,scores={worldborder=1..}] ~~~ function checks/optional/worldborder
