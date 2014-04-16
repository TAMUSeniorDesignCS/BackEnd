@echo off
:start
echo Server Listeners Starting...
cd "C:\Program Files\nodejs"
C:\Users\Administrator\Documents\GitHub\BackEnd\AAAP\index.js
echo Server Listeners Crashed... Restarting...
goto start
PAUSE