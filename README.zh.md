# Job Side - Chrome 扩展

一个基于 Next.js、shadcn/ui 和 Tailwind CSS 开发的 Chrome 侧边栏助手应用。

## 功能特性

- 💬 聊天式交互界面
- 🎨 现代化的 UI 设计
- 🏗️ 完整的架构设计，便于扩展
- 🔧 基于 Next.js 14 构建
- 🌐 国际化（i18n）支持
- 🤖 集成 LangChain 和 Qwen 大语言模型
- 📦 使用 Zustand 进行全局状态管理
- 🧪 包含测试框架

## 技术栈

- **框架**: Next.js 14 (App Router)
- **UI 组件**: shadcn/ui
- **样式**: Tailwind CSS
- **语言**: TypeScript
- **状态管理**: Zustand
- **LLM 框架**: LangChain, LangGraph
- **LLM 模型**: Qwen (通义千问)
- **国际化**: 自定义 i18n 方案

## 项目结构

```
job_side/
├── app/                  # Next.js App Router
│   ├── layout.tsx       # 根布局
│   ├── page.tsx         # 主页面
│   ├── error.tsx         # 错误边界
│   ├── loading.tsx       # 加载状态
│   ├── not-found.tsx    # 404 页面
│   └── globals.css      # 全局样式
├── components/           # React 组件
│   ├── ui/              # shadcn/ui 基础组件
│   ├── chat/            # 聊天相关组件
│   └── providers/       # Context 提供者
├── store/               # Zustand 状态管理
│   ├── appStore.ts      # 应用全局状态
│   └── chatStore.ts     # 聊天状态
├── lib/                 # 工具库
│   ├── agents/          # LangChain 代理
│   ├── llm/             # LLM 集成
│   ├── tools/           # 网页操作工具
│   ├── data/            # 数据获取工具
│   ├── hooks/           # 自定义 Hooks
│   └── routes/          # 路由管理
├── locales/             # i18n 翻译文件
│   ├── en.ts            # 英文
│   └── zh.ts            # 中文
├── services/            # 业务逻辑
└── scripts/             # 工具脚本
```

## 安装

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

在项目根目录创建 `.env.local` 文件：

```env
QWEN_API_KEY=your_api_key_here
# 或
DASHSCOPE_API_KEY=your_api_key_here

# 可选：配置 Qwen 模型
QWEN_MODEL=qwen-turbo
QWEN_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1

# 可选：直接使用 DashScope API
USE_DASHSCOPE=true

# 可选：设置日志级别
LOG_LEVEL=INFO
```

### 3. 开发模式

```bash
npm run dev
```

### 4. 构建生产版本

```bash
npm run build
```

构建完成后，输出文件在 `out/` 目录。

## Chrome Extension 集成

这个项目设计为 Chrome Extension 的侧边栏面板。需要在 Chrome Extension manifest 中配置侧边栏面板。

详细集成指南请参见 [CHROME_EXTENSION.md](./CHROME_EXTENSION.md)。

## 可用脚本

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run start` - 启动生产服务器
- `npm run lint` - 运行 ESLint
- `npm test` - 运行所有测试
- `npm run test:qwen` - 测试 Qwen 模型集成
- `npm run test:logger` - 测试日志系统

## 功能说明

### 国际化（i18n）

应用支持多种语言：
- 英文
- 中文（简体）

使用页面顶部的语言切换器来切换语言。

### 状态管理

- **全局状态**: 使用 Zustand 管理
  - 应用设置（主题、偏好）
  - 聊天历史和会话
  - 最近使用的命令
- **本地状态**: React Hooks
- **Context API**: I18n 上下文

### LLM 集成

- LangChain 用于代理编排
- Qwen（通义千问）作为 LLM
- 支持网页操作工具
- 基于 Agent 和图的工作流

### 测试

包含自定义测试框架：
- 日志测试
- LLM 集成测试
- 网页操作测试
- 服务测试

## 开发说明

- 所有组件都采用 TypeScript 编写，提供类型安全
- 使用 shadcn/ui 组件库，可轻松添加更多 UI 组件
- 遵循 Next.js App Router 最佳实践
- 包含完整的错误处理和加载状态

## 未来扩展

当前架构已为以下功能预留了扩展空间：
- 网页操作功能实现（TODO: 在 `ChatContainer` 中）
- 指令历史记录
- 用户偏好设置
- 更多操作类型支持

## 许可证

私有项目

