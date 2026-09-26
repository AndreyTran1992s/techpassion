@echo off
title TECH PASSION - AUTOMATED TEST RUNNER (VITEST + PLAYWRIGHT)
color 0A
echo =====================================================================
echo   TECH PASSION - AUTOMATED TESTING SUITE (VITEST + PLAYWRIGHT E2E)
echo =====================================================================
echo.

echo [1/3] Running Backend Unit ^& Security Tests (Vitest)...
cd /d "%~dp0backend"
call npx.cmd vitest run
if %errorlevel% neq 0 (
    echo [ERROR] Backend Unit Tests Failed!
    pause
    exit /b %errorlevel%
)
echo.

echo [2/3] Running Frontend Multi-Language i18n ^& Routing Tests (Vitest)...
cd /d "%~dp0frontend"
call npx.cmd vitest run
if %errorlevel% neq 0 (
    echo [ERROR] Frontend Unit Tests Failed!
    pause
    exit /b %errorlevel%
)
echo.

echo [3/3] Running Browser End-to-End Tests (Playwright Chromium)...
call npx.cmd playwright test
if %errorlevel% neq 0 (
    echo [ERROR] Playwright E2E Tests Failed!
    pause
    exit /b %errorlevel%
)

echo.
echo =====================================================================
echo   ALL 12 AUTOMATED TESTS PASSED SUCCESSFULLY (100%% PASS RATE)!
echo =====================================================================
pause
