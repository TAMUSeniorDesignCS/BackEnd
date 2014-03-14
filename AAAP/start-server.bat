@echo off
:start
echo Server Starting...
cd "\Program Files\nodejs"
C:\Users\Administrator\Documents\GitHub\BackEnd\AAAP\index.js
echo Server Crashed... Restarting...
goto start
PAUSE