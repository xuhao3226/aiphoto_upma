#!/bin/bash

echo "========================================"
echo "  AI Photo Backend - Fly.io 部署脚本"
echo "========================================"

# 1. 检查 flyctl 是否安装
echo ""
echo "[1/5] 检查 Fly CLI..."
if command -v flyctl &> /dev/null; then
    echo "✅ Fly CLI 已安装: $(flyctl --version)"
else
    echo "❌ Fly CLI 未安装"
    echo "请先安装: brew install flyctl"
    exit 1
fi

# 2. 登录
echo ""
echo "[2/5] 登录 Fly.io..."
echo "请在浏览器中完成登录授权"
flyctl auth login

# 3. 部署
echo ""
echo "[3/5] 启动应用..."
echo "首次部署会自动创建应用"

cd "$(dirname "$0")"

flyctl launch --copy-config --yes

# 4. 查看状态
echo ""
echo "[4/5] 获取应用信息..."
flyctl info

# 5. 获取访问地址
echo ""
echo "[5/5] 访问地址..."
APP_NAME=$(grep 'app = ' fly.toml | cut -d'"' -f2)
echo "https://${APP_NAME}.fly.dev"

echo ""
echo "========================================"
echo "✅ 部署完成!"
echo "========================================"