# Anti-Command Block Exploit
clear @s[tag=!op] beehive
clear @s[tag=!op] bee_nest

# Gets rid of beehives and beenests already placed
execute @e ~~~ fill ~-4 -64 ~-4 ~4 319 ~4 air 0 replace bee_nest -1
execute @e ~~~ fill ~-4 -64 ~-4 ~4 319 ~4 air 0 replace beehive -1

fill ~10 ~10 ~10 ~-10 ~-10 ~-10 air 0 replace bee_nest -1
fill ~10 ~10 ~10 ~-10 ~-10 ~-10 air 0 replace beehive -1