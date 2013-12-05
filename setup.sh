#!/bin/bash


if [  -d "ynm3k-reports" ]; then
    rm -rf ynm3k-reports
fi
mkdir ynm3k-reports


p="`pwd`/robot4ios/libs/"
js="${p}System.js"
otherjs="${p}System_bak.js"

shellp="`pwd`/robot4ios/libs/shells/"

sed -e "s#scriptPath:.*#scriptPath:\"${shellp}\",#" $js > $otherjs

mv $otherjs  $js

resultp="`pwd`/ynm3k-reports/"

sed -e "s#resultPath:.*#resultPath:\"${resultp}\",#" $js > $otherjs
mv $otherjs  $js

runtemp="`pwd`/ynm3k-tmp/"
sed -e "s#screenPath:.*#screenPath:\"${runtemp}\",#" $js > $otherjs
mv $otherjs  $js

echo "setUp finished!!"
