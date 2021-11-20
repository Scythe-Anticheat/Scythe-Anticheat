# requires gametest for player position stuff to work

# 1k
execute @s[scores={worldborder=1}] ~~~ tag @s[scores={xPos=1000..}] add worldborder
execute @s[scores={worldborder=1}] ~~~ tag @s[scores={zPos=1000..}] add worldborder
execute @s[scores={worldborder=1}] ~~~ tag @s[scores={xPos=..-1000}] add worldborder
execute @s[scores={worldborder=1}] ~~~ tag @s[scores={zPos=..-1000}] add worldborder

# 5k
execute @s[scores={worldborder=2}] ~~~ tag @s[scores={xPos=5000..}] add worldborder
execute @s[scores={worldborder=2}] ~~~ tag @s[scores={zPos=5000..}] add worldborder
execute @s[scores={worldborder=2}] ~~~ tag @s[scores={xPos=..-5000}] add worldborder
execute @s[scores={worldborder=2}] ~~~ tag @s[scores={zPos=..-5000}] add worldborder

# 10k
execute @s[scores={worldborder=3}] ~~~ tag @s[scores={xPos=10000..}] add worldborder
execute @s[scores={worldborder=3}] ~~~ tag @s[scores={zPos=10000..}] add worldborder
execute @s[scores={worldborder=3}] ~~~ tag @s[scores={xPos=..-10000}] add worldborder
execute @s[scores={worldborder=3}] ~~~ tag @s[scores={zPos=..-10000}] add worldborder

# 25k
execute @s[scores={worldborder=4}] ~~~ tag @s[scores={xPos=25000..}] add worldborder
execute @s[scores={worldborder=4}] ~~~ tag @s[scores={zPos=25000..}] add worldborder
execute @s[scores={worldborder=4}] ~~~ tag @s[scores={xPos=..-25000}] add worldborder
execute @s[scores={worldborder=4}] ~~~ tag @s[scores={zPos=..-25000}] add worldborder

# 50k
execute @s[scores={worldborder=5}] ~~~ tag @s[scores={xPos=50000..}] add worldborder
execute @s[scores={worldborder=5}] ~~~ tag @s[scores={zPos=50000..}] add worldborder
execute @s[scores={worldborder=5}] ~~~ tag @s[scores={xPos=..-50000}] add worldborder
execute @s[scores={worldborder=5}] ~~~ tag @s[scores={zPos=..-50000}] add worldborder

# 100k
execute @s[scores={worldborder=6..}] ~~~ tag @s[scores={xPos=100000..}] add worldborder
execute @s[scores={worldborder=6..}] ~~~ tag @s[scores={zPos=100000..}] add worldborder
execute @s[scores={worldborder=6..}] ~~~ tag @s[scores={xPos=..-100000}] add worldborder
execute @s[scores={worldborder=6..}] ~~~ tag @s[scores={zPos=..-100000}] add worldborder

tellraw @s[tag=worldborder] {"rawtext":[{"text":"§r§6[§aScythe§6]§r "},{"text":"§4§lHey!§r You have reached the world border."}]}
effect @s[tag=worldborder] slow_falling 30 1 true
spreadplayers 0 0 1 999 @s[tag=worldborder]

tag @s[tag=worldborder] remove worldborder