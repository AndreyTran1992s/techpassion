@echo off
title TECH PASSION - PUSH TO GITHUB
color 0B

cd /d "%~dp0"

echo ===================================================
echo   PUSH SOURCE CODE TO GITHUB (andreytran1992s.github.io)
echo ===================================================
echo.

git branch -M main
git remote set-url origin https://github.com/AndreyTran1992s/andreytran1992s.github.io.git

echo Dang thuc hien git push len GitHub...
echo (Neu co hop thoai hien len, hay chon Sign in with your browser)
echo.

git push -u origin main --force

if %errorlevel% neq 0 goto ERROR_PUSH

:SUCCESS
echo.
echo ===================================================
echo   [THANH CONG] SOURCE CODE DA DUOC PUSH LEN GITHUB!
echo ===================================================
echo.
echo Website se hoat dong tai dia chi ngan gon:
echo    https://andreytran1992s.github.io/
echo ===================================================
pause
exit /b 0

:ERROR_PUSH
echo.
echo ===================================================
echo   [LOI] Khong the push len GitHub!
echo   Vui long kiem tra lai dang nhap tai khoan GitHub.
echo ===================================================
pause
exit /b 1
