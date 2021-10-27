# Stops Phase/Noclip hacks

scoreboard objectives add phasevl dummy

tag @s[tag=PhaseDetected] remove PhaseDetected

execute @s[tag=moving,tag=!gliding,tag=!riding,tag=!dead] ~~~ detect ~~~ grass -1 function checks/alerts/phase
execute @s[tag=moving,tag=!gliding,tag=!riding,tag=!dead] ~~~ detect ~~~ dirt -1 function checks/alerts/phase
execute @s[tag=moving,tag=!gliding,tag=!riding,tag=!dead] ~~~ detect ~~~ cobblestone 0 function checks/alerts/phase
execute @s[tag=moving,tag=!gliding,tag=!riding,tag=!dead] ~~~ detect ~~~ stone -1 function checks/alerts/phase
execute @s[tag=moving,tag=!gliding,tag=!riding,tag=!dead] ~~~ detect ~~~ obsidian -1 function checks/alerts/phase
execute @s[tag=moving,tag=!gliding,tag=!riding,tag=!dead] ~~~ detect ~~~ netherrack -1 function checks/alerts/phase
execute @s[tag=moving,tag=!gliding,tag=!riding,tag=!dead] ~~~ detect ~~~ bedrock -1 function checks/alerts/phase