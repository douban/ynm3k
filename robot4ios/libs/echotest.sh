#!/bin/sh

if  $3
then
 echo $1 >> $2
else
 echo $1 > $2
fi 
