# Anti-Command Block Exploit

# patch falling blocks
kill @e[type=falling_block]

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
execute @e ~~~ fill ~-4 -64 ~-4 ~4 319 ~4 air 0 replace bee_nest -1
execute @e ~~~ fill ~-4 -64 ~-4 ~4 319 ~4 air 0 replace beehive -1

fill ~10 ~10 ~10 ~-10 ~-10 ~-10 air 0 replace bee_nest -1
fill ~10 ~10 ~10 ~-10 ~-10 ~-10 air 0 replace beehive -1