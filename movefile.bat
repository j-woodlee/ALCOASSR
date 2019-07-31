set /p city="Enter city name: "?:

set /p year="Enter Year: "?:

set /p month="Enter Month: "?:


xcopy "P:\Permits List\Files Received From Unit Supervisors\%city%\%year%\%year%-%month% %city% Permits to write.xlsm" "V:\Support\%city%\"

xcopy "P:\Permits List\Files Received From Unit Supervisors\%city%\%year%\%year%-%month% %city% Permits to write.xlsm" "P:\Permits List\Upload Files\Testing\%city%\%year%\"

set /p temp="Hit Enter to close"
