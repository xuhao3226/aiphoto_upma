# AI Photo Backend - Fly.io 部署指南

## 快速部署

### 方式一：使用部署脚本（推荐）

```bash
cd /Users/deman/Desktop/aiphoto/test3_upma

# 添加执行权限
chmod +x deploy-fly.sh

# 运行部署脚本
./deploy-fly.sh
```

### 方式二：手动部署

```bash
# 1. 安装 Fly CLI
brew install flyctl

# 2. 登录
flyctl auth login

# 3. 进入项目目录
cd /Users/deman/Desktop/aiphoto/test3_upma

# 4. 启动应用（首次）
flyctl launch --no-generate-hooks --copy-config

# 5. 部署
flyctl deploy

# 6. 查看信息
flyctl info
```

## 部署后访问

部署成功后，您将获得一个 `*.fly.dev` 域名，例如：
```
https://aiphoto-backend.fly.dev
```

## 自动部署

每次推送到 GitHub 后自动部署：

1. 访问 https://fly.io/dashboard
2. 连接 GitHub 仓库
3. 启用 Auto-Deploy

## 重要配置

### 端口配置
- 服务器端口: `8080`（在 `server.js` 中配置）
- Fly.io 配置: `fly.toml`

### 环境变量
如需设置环境变量：
```bash
flyctl secrets set KEY=VALUE
```

### 查看日志
```bash
flyctl logs
```

### SSH 进入容器
```bash
flyctl ssh console
```

## 项目结构

```
aiphoto_upma/
├── server.js          # Express 服务器
├── index.html         # 前端页面
├── app.js            # 前端脚本
├── style.css         # 样式文件
├── package.json      # Node.js 配置
├── Dockerfile        # Docker 配置
├── fly.toml          # Fly.io 配置
├── deploy-fly.sh     # 部署脚本
└── README.md         # 本文件
```

## 故障排除

### 部署失败
```bash
# 查看详细日志
flyctl logs

# 重新部署
flyctl deploy --verbose
```

### 应用无法启动
```bash
# 检查健康状态
flyctl health check

# 查看实时日志
flyctl logs -f
```

## 费用

- **免费额度**: 3台共享 CPU VM × 256MB RAM
- **流量**: 160GB/月
- **状态**: 永久不休眠 ✅

详细信息: https://fly.io/docs/about-pricing/