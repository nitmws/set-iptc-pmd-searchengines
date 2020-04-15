@echo off

echo This script requires an installed exiftool program

pause

REM adding IPTC Photo Metadata Standard properties in the file myiptcpmd.json
exiftool_windows -v -r -overwrite_original -j=myiptcpmd.json .\images

echo DONE

pause
