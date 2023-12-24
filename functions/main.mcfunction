# Run all the checks
function checks/angle
function checks/others

execute @a[tag=isBanned,scores={gametestapi=..0}] ~~~ function checks/ban

# Optional checks
execute @a[tag=!op,m=a,scores={gma=1..}] ~~~ function checks/optional/gamemodeA
execute @a[tag=!op,m=c,scores={gmc=1..}] ~~~ function checks/optional/gamemodeC
execute @a[tag=!op,m=s,scores={gms=1..}] ~~~ function checks/optional/gamemodeS
execute @r[scores={cmds=1..}] ~~~ function checks/optional/overridecommandblocksenabled