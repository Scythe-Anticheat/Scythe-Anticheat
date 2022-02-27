# Prevents disabler hacks from possibly disabling the anticheat
gamerule randomtickspeed 1

# Run all the checks
function checks/angle
function checks/cbe
function checks/illegalitems
function checks/others

# Specific criteria checks
execute @s[type=player,scores={attacks=1..,autoclicker=..0}] ~~~ function checks/autoclicker
execute @s[type=player,tag=isBanned] ~~~ function checks/ban
execute @s[type=player,tag=moving,tag=!gliding,tag=!riding,tag=!vanish,scores={phase=..0}] ~~~ function checks/phase

# Optional checks
execute @s[type=player,tag=!op,m=a,scores={gma=1..}] ~~~ function checks/optional/gamemodeA
execute @s[type=player,tag=!op,m=c,scores={gmc=1..}] ~~~ function checks/optional/gamemodeC
execute @s[type=player,tag=!op,m=s,scores={gmc=1..}] ~~~ function checks/optional/gamemodeS
execute @s[scores={commandblocks=1..}] ~~~ function checks/optional/nocommandblocks
execute @s[scores={cmds=1..}] ~~~ function checks/optional/overridecommandblocksenabled
execute @s[type=player,tag=moving,scores={worldborder=1..,gametestapi=1..}] ~~~ function checks/optional/worldborder