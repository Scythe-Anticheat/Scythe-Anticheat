# Run all the checks
function checks/angle
execute @a ~~~ function checks/cbe
function checks/illegalitems
function checks/others

execute @a[tag=isBanned,scores={gametestapi=..0}] ~~~ function checks/ban

# Optional checks
execute @a[tag=!op,m=a,scores={gma=1..}] ~~~ function checks/optional/gamemodeA
execute @a[tag=!op,m=c,scores={gmc=1..}] ~~~ function checks/optional/gamemodeC
execute @a[tag=!op,m=s,scores={gmc=1..}] ~~~ function checks/optional/gamemodeS
execute @a[scores={commandblocks=1..}] ~~~ function checks/optional/nocommandblocks
execute @r[scores={cmds=1..}] ~~~ function checks/optional/overridecommandblocksenabled