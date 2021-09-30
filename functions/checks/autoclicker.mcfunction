# Logs all users who have over 15 CPS
# minecraft only logs once the hit animation is finished so this check isnt 100% effective

scoreboard objectives add leftclick dummy
scoreboard objectives add leftclickvl dummy
scoreboard objectives add leftclick_timer dummy
scoreboard objectives add interactusevl dummy

scoreboard players add @s leftclick 0
scoreboard players add @s leftclick_timer 0

execute @s[scores={leftclick=1..}] ~~~ scoreboard players add @s leftclick_timer 1
execute @s[scores={leftclick=15..,leftclick_timer=70..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Misc) §4AutoClicker/A (CPS: "},{"score":{"name":"@s","objective":"leftclick"}},{"text":") VL= "},{"score":{"name":"@s","objective":"leftclickvl"}}]}
execute @s[scores={leftclick_timer=70..}] ~~~ scoreboard players add @s leftclickvl 1
execute @s[scores={leftclick_timer=70..}] ~~~ scoreboard players set @s leftclick 0
execute @s[scores={leftclick_timer=70..}] ~~~ scoreboard players set @s leftclick_timer 0
