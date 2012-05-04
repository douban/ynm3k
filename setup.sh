#!/bin/bash


p="`pwd`/robot4ios/libs/"
js="${p}System.js"
otherjs="${p}System_bak.js"
echo $p
echo $js

sed -e "s#scriptPath:.*#scriptPath:\"${p}\"#" $js > $otherjs

mv $otherjs  $js
