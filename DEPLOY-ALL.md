# AI Photo Backend - 免费部署方案

## 方案对比

| 平台 | 免费额度 | 休眠 | GitHub 部署 | 支付要求 |
|------|---------|------|-----------|-----------|
| **Render** | 750小时/月 | 15分钟后休眠 | ✅ | 不需要 |
| **Railway** | $5/月 | 可能休眠 | ✅ | 不需要 |
| ~~Fly.io~~ | ~~3台VM | ~~不休眠~~ | ✅ | **需要** |

---

## 推荐方案：Render 部署（推荐）

### 步骤 1：访问 Render
https://render.com

### 步骤 2：用 GitHub 登录

### 步骤 3：创建 Web Service
1. 点击 "New +" -> "Web Service"
2. 连接仓库：`xuhao3226/aiphoto_upma`
3. 配置：
   - Name: `aiphoto-backend`
   - Region: `Singapore`
   - Branch: `master`
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. 点击 "Create Web Service"

### 步骤 4：等待部署

访问地址格式：`https://aiphoto-backend.onrender.com`

---

## 方案 B：Railway 部署

### 步骤 1：访问 Railway
https://railway.app

### 步骤 2：用 GitHub 登录

### 步骤 3：创建项目
1. 点击 "New Project"
2. 选择 "Deploy from GitHub repo"
3. 选择仓库：`xuhao3226/aiphoto_upma`
4. Railway 会自动检测 Node.js

### 步骤 4：部署
点击 "Deploy"

访问地址格式：`https://aiphoto-backend.railway.app`

---

## 本地测试（始终可用）

如果不想部署，也可以一直本地运行：

```bash
# 启动后端
npm start

# 启动前端
python3 -m http.server 8080
# 或
python -m SimpleHTTPServer 8080
```

访问：http://localhost:8080

---

## 已创建的文件

| 文件 | 说明 |
|------|------|
| `render.yaml` | Render 配置 |
| `fly.toml` | Fly.io 配置（需要支付） |
| `Dockerfile` | Docker 配置 |
| `server.js` | 服务器代码 |
| `index.html` | 前端页面 |

---

## 快速部署注意事项

### Render 注意事项
- ⚠️ 免费实例会在 15 分钟无活动后休眠
- 💡 可以用 UptimeRobot 或类似服务保持活跃

### Railway 注意事项
- 💵 $5 免费额度/月（足够小项目使用）
- 📊 有数据库可选免费 PostgreSQL 也免费

## 代码已推送到 GitHub
https://github.com/xuhao3226/aiphoto_upma