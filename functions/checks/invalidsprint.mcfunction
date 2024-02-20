# Disabled due to false flag. When the player is about to finish eating food, the game makes the player sprint before making the player stop using the item
# execute @s[tag=right,scores={right=4..}] ~~~ function checks/alerts/invalidsprintB
execute @s[tag=sneak,m=!c,tag=!flying] ~~~ function checks/alerts/invalidsprintC
# Disabled due to false flags. If you press the W and CTRL button at the same time, the client makes you sprint for some dumb reason
# If this does get re-enabled, make sure to uncomment the /tag commands in detect_actions.json
# execute @s[tag=gliding] ~~~ function checks/alerts/invalidsprintD
execute @s[tag=riding,tag=!moving,scores={last_move=4..}] ~~~ function checks/alerts/invalidsprintE