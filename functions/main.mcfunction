# Prevents disabler hacks from possibly disabling the anticheat
gamerule randomtickspeed 1

# Runs All The Checks

function checks/angle
function checks/autoclicker
function checks/ban
function checks/cbe
function checks/epearlglitching
function checks/fly
function checks/gamemode
function checks/illegalitems
function checks/jesus
# function checks/killaura
function checks/others
function checks/phase
# function checks/speed
execute @s[scores={worldborder=1..}] ~~~ function checks/worldborder
