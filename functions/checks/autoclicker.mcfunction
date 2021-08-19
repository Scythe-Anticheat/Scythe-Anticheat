# Logs all users who have over 15 CPS
# minecraft only logs once the hit animation is finished so this check isnt 100% effective

scoreboard players add @a leftclickvl 0
scoreboard players add @a interactusevl 0

execute @a[tag=!bypass,scores={leftclick=1..}] ~~~ scoreboard players add @s leftclick_timer 1
execute @a[tag=!bypass,scores={leftclick=15..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Combat) §4AutoClicker/A (CPS: "},{"score":{"name":"@s","objective":"leftclick"}},{"text":") VL= "},{"score":{"name":"@s","objective":"leftclickvl"}}]}
execute @a[tag=!bypass,scores={leftclick_timer=70..}] ~~~ scoreboard players add @s leftclickvl 1
execute @a[tag=!bypass,scores={leftclick_timer=70..}] ~~~ scoreboard players set @s leftclick 0
execute @a[tag=!bypass,scores={leftclick_timer=70..}] ~~~ scoreboard players set @s leftclick_timer 0
