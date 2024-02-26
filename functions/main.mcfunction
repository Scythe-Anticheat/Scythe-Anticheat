# Run all the checks
function checks/angle
function checks/others

execute @a[tag=isBanned,scores={gametestapi=..0}] ~~~ function checks/ban

# Optional checks
execute @r[scores={cmds=1..}] ~~~ function checks/optional/overridecommandblocksenabled