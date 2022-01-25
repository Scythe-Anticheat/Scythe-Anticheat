scoreboard players add @s[type=player,tag=attack,m=!c] reachvl 1
execute @s[type=player,tag=attack,m=!c] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Combat) §4Reach/A. VL= "},{"score":{"name":"@s","objective":"reachvl"}}]}

# fix a weird bug where attack tag doesnt get removed
event entity @s scythe:reset_skinid
tag @s remove attack