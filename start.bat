@echo off
chcp 65001 >nul
title AI Photo Backend Service

echo ============================================
echo           AI 图片合成后端服务
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
echo 服务地址: http://localhost:5001
echo.
npm start

pause