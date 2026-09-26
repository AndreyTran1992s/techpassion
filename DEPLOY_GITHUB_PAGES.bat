@echo off
title TECH PASSION - PUSH TO GITHUB
color 0B

cd /d "%~dp0"

echo ===================================================
echo   PUSH SOURCE CODE TO GITHUB (techpassion)
echo ===================================================
echo.

git branch -M main
git remote set-url origin https://github.com/AndreyTran1992s/techpassion.git

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
echo Cac buoc tiep theo de bat GitHub Pages:
echo.
echo 1. Mo link cai dat:
echo    https://github.com/AndreyTran1992s/techpassion/settings/pages
echo.
echo 2. Tai muc "Build and deployment" - "Source", chon:
echo    GitHub Actions
echo.
echo 3. Cho khoang 1 phut, website se hoat dong tai:
echo    https://AndreyTran1992s.github.io/techpassion/
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
