# Stops Phase/Noclip hacks

execute @s[tag=moving,tag=!gliding,tag=!riding] ~~~ detect ~~~ grass -1 function checks/alerts/phase
execute @s[tag=moving,tag=!gliding,tag=!riding] ~~~ detect ~~~ dirt -1 function checks/alerts/phase
execute @s[tag=moving,tag=!gliding,tag=!riding] ~~~ detect ~~~ cobblestone 0 function checks/alerts/phase
execute @s[tag=moving,tag=!gliding,tag=!riding] ~~~ detect ~~~ stone -1 function checks/alerts/phase
execute @s[tag=moving,tag=!gliding,tag=!riding] ~~~ detect ~~~ obsidian -1 function checks/alerts/phase
execute @s[tag=moving,tag=!gliding,tag=!riding] ~~~ detect ~~~ netherrack -1 function checks/alerts/phase
execute @s[tag=moving,tag=!gliding,tag=!riding] ~~~ detect ~~~ bedrock -1 function checks/alerts/phase
