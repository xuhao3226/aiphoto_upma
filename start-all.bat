@echo off
chcp 65001 >nul
title AI Photo Composition App

echo ============================================
echo           AI 图片合成应用
echo ============================================
echo.

if not exist "node_modules" (
    echo 正在安装依赖...
    npm install
    if %errorlevel% neq 0 (
        echo 依赖安装失败！
        pause
        exit /b 1
    )
    echo 依赖安装成功！
    echo.
)

echo 正在启动后端服务...
start "AI Photo Backend" cmd /k "npm start"

timeout /t 3 /nobreak >nul

echo 正在启动前端服务...
start "AI Photo Frontend" cmd /k "python -m http.server 8080"

timeout /t 2 /nobreak >nul

echo.
echo ============================================
echo 服务已启动！
echo.
echo 后端服务: http://localhost:5001
echo 前端页面: http://localhost:8080
echo ============================================
echo.

start http://localhost:8080

pause