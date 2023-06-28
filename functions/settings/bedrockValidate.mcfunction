# make sure they are allowed to use this command
tellraw @s[type=player,tag=!op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r §4§lHey! §rYou must be Scythe-Opped to use this function."}]}
execute @s[tag=!op] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has tried to toggle BedrockValidate without op permissions."}]}

# allow
execute @s[type=player,tag=op,scores={bedrock=..0,gametestapi=1..}] ~~~ scoreboard players set scythe:config bedrock 1
execute @s[type=player,tag=op,scores={bedrock=..0,gametestapi=1..}] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has enabled §aBedrockValidate."}]}

# deny
execute @s[type=player,tag=op,scores={bedrock=1..,gametestapi=1..}] ~~~ scoreboard players set scythe:config bedrock 0
execute @s[type=player,tag=op,scores={bedrock=1..,gametestapi=1..}] ~~~ tellraw @a[tag=op] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"selector":"@s"},{"text":" has disabled §4BedrockValidate."}]}

# gametest not enabled
tellraw @s[type=player,tag=op,scores={gametestapi=..0}] {"rawtext":[{"text":"§r§6[§aScythe§6]§r Error: Beta APIs are disabled, and this function relies on it. Please enable them in world settings."}]}

scoreboard players operation @a bedrock = scythe:config bedrock