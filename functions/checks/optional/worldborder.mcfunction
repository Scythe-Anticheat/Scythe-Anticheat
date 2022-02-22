# requires gametest for player position stuff to work

# 1k
tag @s[scores={worldborder=1,xPos=1000..}] add worldborder
tag @s[scores={worldborder=1,zPos=1000..}] add worldborder
tag @s[scores={worldborder=1,xPos=..-1000}] add worldborder
tag @s[scores={worldborder=1,zPos=..-1000}] add worldborder

# 5k
tag @s[scores={worldborder=2,xPos=5000..}] add worldborder
tag @s[scores={worldborder=2,zPos=5000..}] add worldborder
tag @s[scores={worldborder=2,xPos=..-5000}] add worldborder
tag @s[scores={worldborder=2,zPos=..-5000}] add worldborder

# 10k
tag @s[scores={worldborder=3,xPos=10000..}] add worldborder
tag @s[scores={worldborder=3,zPos=10000..}] add worldborder
tag @s[scores={worldborder=3,xPos=..-10000}] add worldborder
tag @s[scores={worldborder=3,zPos=..-10000}] add worldborder

# 25k
tag @s[scores={worldborder=4,xPos=25000..}] add worldborder
tag @s[scores={worldborder=4,zPos=25000..}] add worldborder
tag @s[scores={worldborder=4,xPos=..-25000}] add worldborder
tag @s[scores={worldborder=4,zPos=..-25000}] add worldborder

# 50k
tag @s[scores={worldborder=5,xPos=50000..}] add worldborder
tag @s[scores={worldborder=5,zPos=50000..}] add worldborder
tag @s[scores={worldborder=5,xPos=..-50000}]  add worldborder
tag @s[scores={worldborder=5,zPos=..-50000}] add worldborder

# 100k
tag @s[scores={worldborder=6..,xPos=100000..}] add worldborder
tag @s[scores={worldborder=6..,zPos=100000..}] add worldborder
tag @s[scores={worldborder=6..,xPos=..-100000}] add worldborder
tag @s[scores={worldborder=6..,zPos=..-100000}] add worldborder

execute @s[tag=worldborder] ~~~ function checks/alerts/worldborder