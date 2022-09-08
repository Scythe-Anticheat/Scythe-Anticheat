# other stuff
scoreboard players add @s[tag=right] right 1
scoreboard players add @s[scores={last_attack=1..}] last_attack 1
execute @s[tag=!left,tag=!trident,scores={last_attack=10..}] ~~~ function checks/alerts/noswing