@echo off
chcp 65001 >nul
title TECH PASSION - DEPLOY TO GITHUB PAGES
color 0B
echo ===========================================================================
echo   TECH PASSION - ĐẨY SOURCE CODE LÊN GITHUB REPOSITORY CỦA BẠN
echo ===========================================================================
echo.

cd /d "%~dp0"

echo [1/3] Kiểm tra Git Commit...
git add .
git commit -m "feat: complete Tech Passion multi-language platform with automated tests" >nul 2>nul
git branch -M main

echo [2/3] Cấu hình Remote: https://github.com/AndreyTran1992s/techpassion.git
git remote set-url origin https://github.com/AndreyTran1992s/techpassion.git >nul 2>nul

echo.
echo [3/3] Đang Push code lên GitHub (Nếu có cửa sổ Git Credential Manager hoặc trình duyệt hiện lên, vui lòng chọn Sign in with your browser)...
echo.
git push -u origin main --force

if %errorlevel% equ 0 (
    echo.
    echo ===========================================================================
    echo   [THÀNH CÔNG!] Toàn bộ mã nguồn đã được đưa lên GitHub!
    echo.
    echo   BƯỚC TIẾP THEO ĐỂ BẬT GITHUB PAGES (Chỉ mất 30 giây):
    echo   1. Mở link: https://github.com/AndreyTran1992s/techpassion/settings/pages
    echo   2. Tại mục "Build and deployment" -^> "Source", chọn: "GitHub Actions".
    echo   3. File ".github/workflows/deploy-gh-pages.yml" sẽ tự động chạy trong 1 phút
    echo      và website của bạn sẽ hoạt động tại:
    echo      👉 https://AndreyTran1992s.github.io/techpassion/
    echo ===========================================================================
) else (
    echo.
    echo [LƯU Ý] Quá trình push gặp lỗi xác thực. Vui lòng kiểm tra lại quyền truy cập tài khoản GitHub!
)
pause
