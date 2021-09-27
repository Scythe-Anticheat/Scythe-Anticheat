scoreboard objectives add flyvl dummy
scoreboard objectives add flycheck dummy
scoreboard objectives add jesusvl dummy
scoreboard objectives add phasevl dummy
scoreboard objectives add xrayvl dummy
scoreboard objectives add timer dummy
gamerule commandblockoutput false
gamerule sendcommandfeedback false
tag @s add op
give @s repeating_command_block 1
tellraw @s {"rawtext":[{"text":"§6[§aScythe§6] §r Thanks For Using Scythe Anticheat! Place the command block and write this command: \"checks/main\" then set it to \"Always Active\". To enable cheat notifications do /function notify."}]}