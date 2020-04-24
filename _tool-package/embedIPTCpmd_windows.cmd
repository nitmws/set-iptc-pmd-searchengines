@echo off

echo This script requires an installed exiftool program

pause

REM embedding IPTC Photo Metadata Standard properties in the file myiptcpmd.json
exiftool_windows -v -r -overwrite_original -ext jpg jpeg tif tiff png dng psd -j=myiptcpmd.json .\images

echo DONE

pause
