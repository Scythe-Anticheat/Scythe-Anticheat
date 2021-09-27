tag @s[tag=vanish] add novanish
tag @s[tag=novanish] remove vanish
effect @s[tag=novanish] clear
tellraw @s[tag=novanish] {"rawtext":[{"text":"§6[§aScythe§6] §rYou are no longer in vanish!"}]}
execute @s[tag=novanish] ~ ~ ~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §ris no longer in Vanish."}]}

effect @s[tag=!novanish] invisibility 9999 250 true
tag @s[tag=!novanish] add vanish
tellraw @s[tag=vanish,tag=!novanish] {"rawtext":[{"text":"§6[§aScythe§6] §rYou are now in vanish!"}]}
execute @s[tag=vanish,tag=!novanish] ~ ~ ~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §ris now in Vanish."}]}

tag @s[tag=novanish] remove novanish