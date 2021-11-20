# clear command blocks
execute @s[scores={commandblocks=1}] ~~~ fill ~-5 0 ~-5 ~+5 255 ~+5 air 0 replace command_block -1
execute @s[scores={commandblocks=1}] ~~~ fill ~-5 0 ~-5 ~+5 255 ~+5 air 0 replace repeating_command_block -1
execute @s[scores={commandblocks=1}] ~~~ fill ~-5 0 ~-5 ~+5 255 ~+5 air 0 replace chain_command_block -1

fill ~+13 ~+5 ~+13 ~-13 ~-5 ~-13 air 0 replace command_block -1
fill ~+13 ~+5 ~+13 ~-13 ~-5 ~-13 air 0 replace repeating_command_block -1
fill ~+13 ~+5 ~+13 ~-13 ~-5 ~-13 air 0 replace chain_command_block -1