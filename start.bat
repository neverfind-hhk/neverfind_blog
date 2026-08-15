@echo off
REM ===== IMPORTANT: keep this file ASCII-only (no Chinese).
REM Chinese characters in UTF-8 get garbled by Windows cmd on GBK systems
REM and break the batch. Use English here; node output stays UTF-8 via chcp.
chcp 65001 >nul
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Node.js not found. Please install it first:
  echo         https://nodejs.org/
  pause
  exit /b 1
)

echo Starting local blog preview...
echo (Press Ctrl+C in the window to stop the server.)
node server.js
pause
