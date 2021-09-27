execute @s[tag=!op] ~ ~ ~ tell @a[tag=notify] §r§6[§aScythe§6] §r@s Has been banned!
tag @s[tag=!op] add banned
tellraw @s {"rawtext":[{"text":"To ban someone use this command \"execute [playername] ~~~ function ban"}]}