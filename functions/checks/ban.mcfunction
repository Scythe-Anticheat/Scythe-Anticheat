# Automatically kick banned users

event entity @a[scores={isBanned=1..}] scythe:kick

# kick @s[scores={isBanned=3}] "§cYOU ARE BANNED!\n§rReason: Sending Crash Packets\n Banned By: Console."
# kick @s[scores={isBanned=2}] "§cYOU ARE BANNED!\n§rReason: Hacking Or Abuse\n Banned By: Console."
# kick @s[scores={isBanned=1}] §cYOU ARE BANNED!{line}§rReason: Hacking Or Abuse{line} Banned By: An Operator.
