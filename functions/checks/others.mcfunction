# other stuff
scoreboard players add @a[tag=right] right 1
scoreboard players add @a[scores={last_attack=1..}] last_attack 1
scoreboard players add @a[tag=!moving] last_move 1
execute @a[tag=!left,tag=!trident,scores={last_attack=10..}] ~~~ function checks/alerts/noswing

title @a[tag=vanish] actionbar §aYOU ARE VANISHED!