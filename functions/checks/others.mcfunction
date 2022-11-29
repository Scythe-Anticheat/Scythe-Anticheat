# other stuff
scoreboard players add @a[tag=right,scores={right=..1000}] right 1
scoreboard players add @a[scores={last_attack=1..1000}] last_attack 1
scoreboard players add @a[tag=!moving,scores={last_move=..1000}] last_move 1

execute @a[tag=!left,tag=!trident,scores={last_attack=10..}] ~~~ function checks/alerts/noswing

title @a[tag=vanish] actionbar §aYOU ARE VANISHED!