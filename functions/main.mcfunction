# Prevents disabler hacks from possibly disabling the anticheat
gamerule functioncommandlimit 10000
gamerule randomtickspeed 1
gamerule commandblocksenabled true

gamerule commandblockoutput false
tickingarea add circle ~~~ 1 AntiCheat

# Runs All The Checks

# function checks/crasher
function checks/angle
function checks/ban
function checks/cbe
function checks/illegalitems
function checks/phase
function checks/others
function checks/jesus
# execute @a ~~~ function checks/fly
function checks/speed
function checks/killaura
function checks/epearlglitching
function checks/autoclicker
