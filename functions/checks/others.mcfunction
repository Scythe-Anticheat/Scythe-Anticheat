# other stuff
scoreboard players add @s[tag=right] right 1
scoreboard players add @s[scores={last_attack=1..}] last_attack 1
execute @s[tag=!left,scores={last_attack=10..}] ~~~ function checks/alerts/noswing

execute @s[tag=oldvanish] ~~~ function checks/assets/vanish

tp @s[tag=freeze,tag=moving] ~~~

# If the player is under y=-104 this teleports them back to y=-104
tp @s[y=-105,dy=-205] ~ -104 ~