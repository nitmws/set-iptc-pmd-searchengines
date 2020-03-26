#!/bin/sh

echo This script requires an installed exiftool program

read -p "Press [Enter] key to continue ..."

# adding IPTC Photo Metadata Standard properties in the file myiptcpmd.json
exiftool -v -j=myiptcpmd.json ./images

echo DONE

read -p "Press [Enter] key to close"

