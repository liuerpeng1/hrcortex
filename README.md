# HRCortex

科技感 Landing Page — 展厅多媒体开发 · AI · UE5

## 技术栈

- **React 18** + **Vite 5**
- **Tailwind CSS 3**
- Canvas 神经网络动画背景

## 本地开发

```bash
npm install
npm run dev
```

## 构建部署

```bash
npm run build
```

构建产物位于 `dist/` 目录，可直接部署到 Cloudflare Pages。

### Cloudflare Pages 配置

| 设置项 | 值 |
|--------|-----|
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js version | 18+ |
