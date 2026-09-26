@echo off
title Tech Passion - Web Server
echo ===================================================
echo   KHOI DONG HE THONG TECH PASSION (PORT 3000 & 4000)
echo ===================================================

cd /d "d:\Vibe Coding\Tech Passion\backend"
start "Tech Passion Backend (Port 4000)" cmd /k "npm.cmd start"

cd /d "d:\Vibe Coding\Tech Passion\frontend"
if not exist ".next-app\BUILD_ID" (
    echo Dang build giao dien lan dau, vui long doi 20 giay...
    call npm.cmd run build
)
echo Dang khoi dong Frontend Server tai http://localhost:3000 ...
call npm.cmd start
pause
