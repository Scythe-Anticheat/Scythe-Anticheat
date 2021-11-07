tag @s[tag=notify] add nonotify
tag @s[tag=nonotify] remove notify
tag @s[tag=nonotify] remove notify2
tellraw @s[tag=nonotify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §rhas disabled cheat notifications."}]}

tag @s[tag=!nonotify] add notify
tag @s[tag=!nonotify] add notify2
tellraw @s[tag=notify,tag=!nonotify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" §rhas enabled cheat notifications."}]}

tag @s[tag=nonotify] remove nonotify
