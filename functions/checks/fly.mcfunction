# Stops Fly Hackers
scoreboard objectives add flyvl dummy
# scoreboard objectives add currentYpos dummy
# scoreboard objectives add flycheck dummy

# execute @s[tag=!flying,m=!c,tag=!levitating,tag=!gliding,tag=!riding,tag=!dead] ~~~ detect ~ ~-1 ~ air -1 execute @s ~~~ detect ~1 ~-1 ~ air -1 execute @s ~~~ detect ~-1 ~-1 ~ air -1 execute @s ~~~ detect ~ ~-1 ~1 air -1 execute @s ~~~ detect ~ ~-1 ~-1 air -1 execute @s ~~~ detect ~1 ~-1 ~1 air -1 execute @s ~~~ detect ~1 ~-1 ~-1 air -1 execute @s ~~~ detect ~-1 ~-1 ~-1 air -1 execute @s ~~~ detect ~-1 ~-1 ~1 air -1 execute @s ~~~ detect ~ ~-2 ~ air -1 execute @s ~~~ detect ~1 ~-2 ~ air -1 execute @s ~~~ detect ~-1 ~-2 ~ air -1 execute @s ~~~ detect ~ ~-2 ~1 air -1 execute @s ~~~ detect ~ ~-2 ~-1 air -1 execute @s ~~~ detect ~1 ~-2 ~1 air -1 execute @s ~~~ detect ~1 ~-2 ~-1 air -1 execute @s ~~~ detect ~-1 ~-2 ~-1 air -1 execute @s ~~~ detect ~-1 ~-2 ~1 air -1 execute @s ~~~ detect ~ ~-3 ~ air -1 tag @s add isFlying

# execute @s[tag=isFlying] ~~~ scoreboard players add @s flycheck 1
# execute @s[tag=isFlying,scores={yPos=0..}] ~~~ tag @s[scores={flycheck=20}] add CheckFly

# execute @s[tag=CheckFly,scores={flycheck=20..}] ~~~ scoreboard players operation @s currentYpos = @s yPos

# execute @s[tag=CheckFly,scores={flycheck=20..}] ~~~ scoreboard players operation @s yPos -= @s currentYpos

# execute @s[tag=CheckFly,tag=!ground,scores={yPos=0..}] ~~~ execute @s[y=0,dy=256] ~~~ scoreboard players add @s flyvl 1
# execute @s[tag=CheckFly,tag=!ground,scores={yPos=0..}] ~~~ execute @s[y=0,dy=256] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Movement) §4Fly/A. VL= "},{"score":{"name":"@s","objective":"flyvl"}}]}

# execute @s[scores={flycheck=20..}] ~~~ tag @s remove CheckFly
# execute @s[scores={flycheck=20..}] ~~~ tag @s remove isFlying

# execute @s[scores={flycheck=20..}] ~~~ scoreboard players set @s yPos 0
# execute @s[scores={flycheck=20..}] ~~~ scoreboard players set @s currentYpos 0
# execute @s[scores={flycheck=20..}] ~~~ scoreboard players set @s flycheck 0
