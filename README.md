# 储能医生官方网站

## 项目简介
"储能医生"品牌官方网站，专业解决储能柜断连问题，提供DTU即插即连、零改造、4G上云等解决方案。

## 技术栈
- Vue 3.5 + TypeScript
- Vite 5 + Element Plus 2.5
- Tailwind CSS 3.4 + Pinia
- Vue Router 4 + ECharts 5

## 功能特性
- ✅ 响应式设计（PC/Pad/Mobile三端适配）
- ✅ Canvas粒子背景动画（已修复初始化bug）
- ✅ 登录弹窗全局组件
- ✅ 产品中心、案例展示、救援申请
- ✅ SEO优化 + 预渲染配置

## 本地启动

### 开发环境
```bash
npm install
npm run dev
```
访问: http://localhost:5173/

### 生产构建
```bash
npm run build
npm run preview
```

## 项目结构
```
src/
├── components/     # 全局组件（LoginDialog等）
├── views/         # 页面组件（Home、Products、Case等）
├── stores/        # Pinia状态管理
├── router/        # 路由配置
└── assets/        # 静态资源
```

## 动画修复说明
**问题**: Canvas背景动画在页面加载时不立即显示，需要点击其他页面再返回才能看到

**修复方案**:
1. 使用`nextTick`确保DOM完全渲染
2. 粒子初始透明度从0提高到0.3
3. 淡入时间从120帧缩短到60帧
4. Canvas尺寸双重刷新机制
5. 路由监听自动重启动画

**效果**: 动画现在在页面加载时立即显示，无需路由切换

## 部署说明
- 支持Vercel、Netlify等静态托管平台
- 包含vercel.json配置
- 预渲染优化SEO

## 演示地址
开发服务器: http://localhost:5173/