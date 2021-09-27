tag @s[tag=notify] add nonotify
tag @s[tag=nonotify] remove notify
tag @s[tag=nonotify] remove notify
tellraw @s[tag=nonotify] {"rawtext":[{"text":"Disabled Cheat Notifications."}]}

tag @s[tag=!nonotify] add notify
tag @s[tag=!nonotify] add notify
tellraw @s[tag=notify,tag=!nonotify] {"rawtext":[{"text":"Enabled Cheat Notifications"}]}

tag @s[tag=nonotify] remove nonotify