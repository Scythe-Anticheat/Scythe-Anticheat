# Anti-Command Block Exploit

scoreboard objectives add cbevl dummy
scoreboard objectives add npc dummy

# fish buckets no longer have NBT tags, but we will keep them just incase
clear @s[tag=!op] bucket 2
clear @s[tag=!op] bucket 3
clear @s[tag=!op] bucket 4
clear @s[tag=!op] bucket 5
clear @s[tag=!op] bucket 11
clear @s[tag=!op] bucket 12

clear @s[tag=!op] beehive
clear @s[tag=!op] bee_nest

# Gets rid of beehives and beenests already placed
execute @e ~~~ fill ~-5 0 ~-5 ~+5 255 ~+5 air 0 replace bee_nest -1
execute @e ~~~ fill ~-5 0 ~-5 ~+5 255 ~+5 air 0 replace beehive -1

fill ~+13 ~+5 ~+13 ~-13 ~-5 ~-13 air 0 replace bee_nest -1
fill ~+13 ~+5 ~+13 ~-13 ~-5 ~-13 air 0 replace beehive -1