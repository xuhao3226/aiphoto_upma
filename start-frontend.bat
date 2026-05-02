@echo off
chcp 65001 >nul
title AI Photo Frontend Service

echo ============================================
echo           AI 图片合成前端服务
echo ============================================
echo.

echo 正在启动前端服务...
echo 前端地址: http://localhost:8080
echo.

python -m http.server 8080

pause