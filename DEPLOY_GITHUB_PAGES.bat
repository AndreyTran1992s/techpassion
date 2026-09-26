@echo off
chcp 65001 >nul
title TECH PASSION - DEPLOY TO GITHUB PAGES
color 0B
echo ===========================================================================
echo   TECH PASSION - CONG CU DAY SOURCE CODE LEN GITHUB PAGES TU DONG
echo ===========================================================================
echo.

cd /d "%~dp0"

where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [LOI] May tinh chua cai dat Git! Vui long tai Git tai: https://git-scm.com/
    pause
    exit /b 1
)

if not exist ".git" (
    echo [1/4] Khoi tao Git Repository...
    git init
    git branch -M main
)

echo [2/4] Dong goi toan bo ma nguon Tech Passion...
git add .
git commit -m "Deploy Tech Passion Multi-Language Platform (EN/VI/ZH) to GitHub Pages"

echo.
echo ===========================================================================
echo   HUONG DAN KET NOI GITHUB REPOSITORY:
echo   1. Truy cap https://github.com/new va tao 1 Repository moi (Public)
echo      (Vi du: tech-passion)
echo   2. Copy duong link HTTPS cua Repo (Vi du: https://github.com/ten-ban/tech-passion.git)
echo ===========================================================================
echo.
set /p REPO_URL="Nhap link GitHub Repository cua ban (hoac nhan Enter neu da cai remote): "

if not "%REPO_URL%"=="" (
    git remote remove origin >nul 2>nul
    git remote add origin %REPO_URL%
)

echo.
echo [3/4] Dang day ma nguon len nhanh 'main' tren GitHub...
git push -u origin main

echo.
echo ===========================================================================
echo   [4/4] HOAN TAT! BUOC CUOI CUNG TREN GIAO DIEN GITHUB:
echo   1. Mo Repo cua ban tren GitHub -> Vao muc "Settings" -> Chon "Pages" (cot ben trai).
echo   2. Tai o "Source" (Build and deployment), doi tu "Deploy from a branch"
echo      sang: "GitHub Actions".
echo   3. Doi khoang 1 phut de GitHub Actions chay xong, website cua ban se
echo      hoat dong truc tuyen tai: https://ten-github-cua-ban.github.io/ten-repo/
echo ===========================================================================
pause
