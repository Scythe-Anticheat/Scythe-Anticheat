tag @s[tag=oldvanish] add oldnovanish
tag @s[tag=oldnovanish] remove oldvanish
event entity @s[tag=oldnovanish] unvanish
effect @s[tag=oldnovanish] clear
tellraw @s[tag=oldnovanish] {"rawtext":[{"text":"§6[§aScythe§6] §rYou are no longer in vanish!"}]}
execute @s[tag=oldnovanish] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" is no longer vanished."}]}

tag @s[tag=!oldnovanish] add oldvanish
event entity @s[tag=oldvanish,tag=!oldnovanish] vanish
tellraw @s[tag=oldvanish,tag=!oldnovanish] {"rawtext":[{"text":"§6[§aScythe§6] §rYou are now in vanish!"}]}
execute @s[tag=oldvanish,tag=!oldnovanish] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" is now vanished."}]}

tag @s[tag=oldnovanish] remove oldnovanish