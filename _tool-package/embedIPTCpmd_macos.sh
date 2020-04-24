#!/bin/sh

echo This script requires an installed exiftool program

read -p "Press [Enter] key to continue ..."

# embedding IPTC Photo Metadata Standard properties in the file myiptcpmd.json
exiftool -v -r -overwrite_original -ext jpg jpeg tif tiff png dng psd -j=myiptcpmd.json ./images

echo DONE

read -p "Press [Enter] key to close"

