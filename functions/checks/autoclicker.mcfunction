# Logs all users who have over 12 CPS
# This time around, we check how much times a player attacks another player

scoreboard players add @s[scores={attacks=1..}] attack_timer 1
execute @s[scores={attacks=8..,attack_timer=60..}] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §1has failed §7(Misc) §4AutoClicker/A §7(CPS: "},{"score":{"name":"@s","objective":"attacks"}},{"text":")§4 VL= "},{"score":{"name":"@s","objective":"autoclickervl"}}]}
scoreboard players add @s[scores={attacks=10..,attack_timer=60..}] autoclickervl 1

scoreboard players set @s[scores={attack_timer=60..}] attacks 0
tag @s[tag=attack,scores={attack_timer=60..}] remove attack
scoreboard players set @s[scores={attack_timer=60..}] attack_timer 0
