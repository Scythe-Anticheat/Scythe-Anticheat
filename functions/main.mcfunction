# Prevents disabler hacks from possibly disabling the anticheat
gamerule randomtickspeed 1

# Runs All The Checks
function checks/angle
# function checks/autoclicker
function checks/ban
function checks/cbe
function checks/epearlglitching
function checks/fly
function checks/gamemode
function checks/illegalitems
function checks/jesus
function checks/others
function checks/phase

# optional checks.
execute @s[scores={commandblocks=1..}] ~~~ function checks/nocommandblocks
execute @s[tag=!op,scores={frostwalker=1..}] ~~~ function checks/nofrostwalker
execute @s[scores={worldborder=1..}] ~~~ function checks/worldborder
