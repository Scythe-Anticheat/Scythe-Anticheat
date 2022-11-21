execute @s[tag=right,scores={right=4..}] ~~~ function checks/alerts/invalidsprintB
execute @s[tag=sneak,m=!c,tag=!flying] ~~~ function checks/alerts/invalidsprintC
execute @s[tag=gliding] ~~~ function checks/alerts/invalidsprintD
execute @s[tag=riding,tag=!moving,scores={last_move=4..}] ~~~ function checks/alerts/invalidsprintE