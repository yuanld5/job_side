# 功能说明文档

## 项目概述

这是一个 **Chrome 侧边栏扩展项目**，提供智能网页操作助手功能。用户可以通过自然语言指令与网页交互，支持多语言界面和大模型驱动的智能操作。

## 核心功能

### 1. 💬 聊天界面

#### 功能特点
- **实时对话**：支持用户与 AI 助手进行实时对话
- **消息展示**：清晰的消息气泡设计，区分用户和助手消息
- **输入体验**：
  - 支持 Enter 键快速发送
  - 输入框禁用状态（处理中时）
  - 发送按钮图标提示
- **加载状态**：处理中显示动画加载提示

#### 组件结构
```
src/components/chat/
├── ChatContainer.tsx    # 聊天容器（主组件）
├── ChatInput.tsx        # 输入框组件
└── ChatMessage.tsx      # 消息展示组件
```

#### 使用示例
```tsx
import { ChatContainer } from "@/components/chat/ChatContainer"

export default function Page() {
  return <ChatContainer />
}
```

### 2. 🌐 国际化支持

#### 支持的语言
- **中文（简体）** (`zh`) - 默认语言
- **英文** (`en`)

#### 功能特点
- **语言切换器**：页面顶部提供快速切换按钮
- **持久化存储**：语言选择保存在 localStorage
- **完整翻译**：所有界面文本都支持多语言
- **动态切换**：切换语言后界面立即更新

#### 实现方式
```tsx
// 使用国际化 Hook
import { useI18n } from "@/contexts/I18nContext"

function Component() {
  const { t, locale, setLocale } = useI18n()
  
  return (
    <div>
      <h1>{t.common.title}</h1>
      <button onClick={() => setLocale("en")}>English</button>
    </div>
  )
}
```

#### 翻译文件结构
```
src/locales/
├── zh.ts      # 中文翻译
├── en.ts      # 英文翻译
└── index.ts   # 导出和类型定义
```

#### 翻译内容覆盖
- 通用文本（标题、描述）
- 聊天界面（占位符、错误提示）
- Agent 系统提示词
- 工具描述和提示
- 日志消息

### 3. 🤖 大模型集成

#### 支持的模型
- **Qwen（通义千问）** - 主要模型
  - 支持 DashScope API
  - 支持 OpenAI 兼容 API

#### 技术栈
- **LangChain** - Agent 编排框架
- **LangGraph** - 图工作流（服务器模式）
- **@langchain/openai** - OpenAI 兼容接口
- **@langchain/community** - 社区模型支持

#### Agent 架构
```
用户指令
  ↓
parseCommand() - 解析指令
  ↓
executeWebAction() - 执行网页操作
  ↓
createWebAgent() - 创建 LangChain Agent
  ↓
createQwenModel() - 初始化 Qwen 模型
  ↓
getWebActionTools() - 获取操作工具
  ↓
Agent 执行 → 返回结果
```

#### 网页操作工具
1. **click_element** - 点击网页元素
2. **input_text** - 在输入框中输入文本
3. **get_page_info** - 获取页面信息
4. **wait** - 等待指定时间

#### 配置方式

##### 环境变量
```env
# API Key（必需）
QWEN_API_KEY=your_api_key_here
# 或
DASHSCOPE_API_KEY=your_api_key_here

# 模型配置（可选）
QWEN_MODEL=qwen-turbo
QWEN_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1

# API 选择（可选）
USE_DASHSCOPE=true  # 使用 DashScope API
```

##### 代码示例
```typescript
import { executeWebAction } from "@/services/webAction"

// 执行网页操作
const response = await executeWebAction({
  command: "点击登录按钮",
  locale: "zh"
})

if (response.success) {
  console.log(response.message)
}
```

## 技术架构

### 前端架构
- **Next.js 14** (App Router) - React 框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **shadcn/ui** - UI 组件库
- **Zustand** - 状态管理

### 后端/服务架构
- **LangChain** - AI Agent 框架
- **Qwen** - 大语言模型
- **Chrome Extension API** - 浏览器扩展能力

### 数据流
```
用户输入
  ↓
ChatInput → useChat Hook
  ↓
executeWebAction() 服务
  ↓
LangChain Agent + Qwen Model
  ↓
网页操作工具执行
  ↓
返回结果 → ChatMessage 显示
```

## 使用流程

### 1. 安装和配置

```bash
# 安装依赖
npm install

# 配置环境变量
cp .env.example .env.local
# 编辑 .env.local，添加 QWEN_API_KEY

# 构建项目
npm run build
npm run build:extension
```

### 2. 加载扩展

1. 打开 Chrome，访问 `chrome://extensions/`
2. 启用"开发者模式"
3. 点击"加载已解压的扩展程序"
4. 选择 `out/` 目录

### 3. 使用聊天界面

1. 点击扩展图标，打开侧边栏
2. 在输入框中输入指令（如："点击登录按钮"）
3. AI 助手会理解指令并执行相应操作
4. 查看操作结果和反馈

### 4. 切换语言

1. 点击页面顶部的语言切换按钮
2. 选择"中文"或"English"
3. 界面立即切换语言

## 功能限制

### 静态导出模式
由于项目使用 `output: 'export'` 配置（Chrome Extension 需要），以下功能受限：

1. **API Routes** - 不工作（已移除）
2. **Middleware** - 不工作（仅开发时有效）
3. **Server Actions** - 不工作
4. **LangGraph** - 不工作（使用标准 Agent）
5. **动态路由** - 需要 `generateStaticParams()`

### 当前工作模式
- ✅ 客户端组件
- ✅ 静态页面生成
- ✅ LangChain Agent（客户端）
- ✅ 国际化
- ✅ 聊天界面

## 未来扩展

### 计划功能
1. **网页操作实现** - 实际执行点击、输入等操作
2. **指令历史** - 保存和查看历史指令
3. **用户偏好** - 保存用户设置和偏好
4. **更多操作类型** - 支持更多网页操作
5. **流式响应** - 实时显示 AI 响应

### 技术优化
1. **服务器模式** - 移除静态导出，使用服务器模式
2. **LangGraph 支持** - 启用图工作流
3. **缓存优化** - 优化模型响应缓存
4. **错误处理** - 增强错误处理和重试机制

## 相关文档

- [项目结构说明](./PROJECT_STRUCTURE.md)
- [README（中文）](./README.zh.md)
- [README（English）](./README.md)

