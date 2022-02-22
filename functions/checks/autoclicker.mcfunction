# Logs all users who have over 12 CPS
# This time around, we check how much times a player attacks another player

scoreboard players add @s[scores={attacks=1..}] attack_timer 1
execute @s[scores={attack_timer=60..}] ~~~ function checks/alerts/autoclicker