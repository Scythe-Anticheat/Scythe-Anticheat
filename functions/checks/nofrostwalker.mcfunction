# frostwalker lvl 32767 == the big lag
scoreboard players operation @s frostwalker = scythe:config frostwalker

replaceitem entity @s[tag=!op,scores={frostwalker=1..}] slot.armor.feet 0 leather_boots 1 0 {"item_lock": {"mode": "lock_in_slot"},"keep_on_death":{}}