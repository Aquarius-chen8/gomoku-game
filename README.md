# 五子棋 (Gomoku)

一个基于 Canvas 的双人对战五子棋网页游戏，使用 TypeScript + Vite 构建。

## 功能

- 15×15 标准棋盘，带星位点标记
- 黑白双方交替落子
- 自动判定五连胜负与平局
- 棋子渐变光影效果
- 一键重新开始

## 技术栈

- TypeScript
- Vite
- HTML5 Canvas

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 项目结构

```
├── index.html          # 入口页面
├── src/
│   ├── main.ts         # 游戏主逻辑与事件绑定
│   ├── game.ts         # 棋盘数据、胜负判定
│   ├── renderer.ts     # Canvas 绘制（棋盘、棋子）
│   └── style.css       # 样式
├── package.json
└── tsconfig.json
```
