# Logs all users who have over 15 CPS
# minecraft only logs once the hit animation is finished so this check isnt 100% effective

scoreboard objectives add leftclick dummy
scoreboard objectives add leftclickvl dummy
scoreboard objectives add leftclick_timer dummy

scoreboard players add @s[scores={leftclick=1..}] leftclick_timer 1
execute @s[scores={leftclick=15..,leftclick_timer=70..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Misc) §4AutoClicker/A §7(CPS: "},{"score":{"name":"@s","objective":"leftclick"}},{"text":")§4 VL= "},{"score":{"name":"@s","objective":"leftclickvl"}}]}

scoreboard players add @s[scores={leftclick_timer=70..}] leftclickvl 1
scoreboard players set @s[scores={leftclick_timer=70..}] leftclick 0
scoreboard players set @s[scores={leftclick_timer=70..}] leftclick_timer 0
