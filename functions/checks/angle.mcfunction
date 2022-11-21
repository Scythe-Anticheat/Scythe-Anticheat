# Blocks invalid viewing angles

tag @a[tag=noBadAngle] remove noBadAngle

tag @a[rxm=-90,rx=90,rym=-180,ry=180] add noBadAngle

execute @a[tag=!noBadAngle] ~~~ function checks/alerts/anglenotif
