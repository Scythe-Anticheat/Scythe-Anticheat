execute @s[type=player,tag=!op] ~~~ tellraw @a[tag=notify] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":"'s warns has been reset."}]}
tellraw @s[tag=op] {"rawtext":[{"text":"To reset someone's warns please use this command \"/execute as [playername] run function tools/resetwarns\""}]}

execute @s[type=!player] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r §cA non player entity has tried to use the resetwarns command. §7("},{"selector":"@s"},{"text":")"}]}

scoreboard players set @s[type=player,tag=!op,scores={autoclickervl=1..}] autoclickervl 0
scoreboard players set @s[type=player,tag=!op,scores={autoshieldvl=1..}] autoshieldvl 0
scoreboard players set @s[type=player,tag=!op,scores={autototemvl=1..}] autototemvl 0
scoreboard players set @s[type=player,tag=!op,scores={badenchants=1..}] badenchants 0
scoreboard players set @s[type=player,tag=!op,scores={badpacketsvl=1..}] badpacketsvl 0
# scoreboard players set @s[type=player,tag=!op,scores={cbevl=1..}] cbevl 0
scoreboard players set @s[type=player,tag=!op,scores={crashervl=1..}] crashervl 0
scoreboard players set @s[type=player,tag=!op,scores={fastusevl=1..}] fastusevl 0
scoreboard players set @s[type=player,tag=!op,scores={flyvl=1..}] flyvl 0
scoreboard players set @s[type=player,tag=!op,scores={illegalitemsvl=1..}] illegalitemsvl 0
scoreboard players set @s[type=player,tag=!op,scores={invalidsprintvl=1..}] invalidsprintvl 0
scoreboard players set @s[type=player,tag=!op,scores={invmovevl=1..}] invmovevl 0
scoreboard players set @s[type=player,tag=!op,scores={killauravl=1..}] killauravl 0
scoreboard players set @s[type=player,tag=!op,scores={namespoofvl=1..}] namespoofvl 0
scoreboard players set @s[type=player,tag=!op,scores={noslowvl=1..}] noslowvl 0
scoreboard players set @s[type=player,tag=!op,scores={nukervl=1..}] nukervl 0
scoreboard players set @s[type=player,tag=!op,scores={reachvl=1..}] reachvl 0
scoreboard players set @s[type=player,tag=!op,scores={spammervl=1..}] spammervl 0
scoreboard players set @s[type=player,tag=!op,scores={towervl=1..}] towervl 0
scoreboard players set @s[type=player,tag=!op,scores={gamemodevl=1..}] gamemodevl 0