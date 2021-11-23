# Prevents disabler hacks from possibly disabling the anticheat
gamerule randomtickspeed 1

# Runs All The Checks
function checks/angle
# function checks/autoclicker
function checks/ban
function checks/cbe
function checks/epearlglitching
function checks/gamemode
function checks/illegalitems
function checks/jesus
function checks/others
function checks/phase

# optional checks.
execute @s[scores={commandblocks=1..}] ~~~ function checks/nocommandblocks
replaceitem entity @s[tag=!op,scores={frostwalker=1..}] slot.armor.feet 0 leather_boots 1 0 {"item_lock": {"mode": "lock_in_slot"},"keep_on_death":{}}
execute @s[scores={worldborder=1..}] ~~~ function checks/worldborder
