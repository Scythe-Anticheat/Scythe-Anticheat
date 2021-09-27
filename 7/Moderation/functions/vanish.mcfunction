tag @s[tag=vanish] add novanish
tag @s[tag=novanish] remove vanish
effect @s[tag=novanish] clear
tellraw @s[tag=novanish] {"rawtext":[{"text":"You are no longer in vanish!"}]}

effect @s[tag=!novanish] invisibility 9999 250 true
tag @s[tag=!novanish] add vanish
tellraw @s[tag=vanish,tag=!novanish] {"rawtext":[{"text":"You are now in vanish!"}]}

tag @s[tag=novanish] remove novanish