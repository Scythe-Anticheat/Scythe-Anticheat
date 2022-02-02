# Automatically kick banned users

execute @s[tag=isBanned] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§߈§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" was kicked for: You are banned!"}]}
event entity @s[tag=isBanned] scythe:kick

# kick @s[scores={isBanned=3}] "§cYOU ARE BANNED!\n§rReason: Sending Crash Packets\n Banned By: Console."
# kick @s[scores={isBanned=2}] "§cYOU ARE BANNED!\n§rReason: Hacking Or Abuse\n Banned By: Console."
# kick @s[scores={isBanned=1}] §cYOU ARE BANNED!{line}§rReason: Hacking Or Abuse{line} Banned By: An Operator.
