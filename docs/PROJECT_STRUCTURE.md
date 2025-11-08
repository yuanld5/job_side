# 项目结构说明

## 📁 目录结构

```
job_side/
├── src/                          # 所有源代码（统一管理）
│   ├── app/                      # Next.js App Router（路由和页面）
│   │   ├── (app)/                # 路由组：应用相关路由
│   │   │   ├── dashboard/        # Dashboard 页面
│   │   │   │   ├── layout.tsx   # Dashboard 布局
│   │   │   │   ├── page.tsx     # Dashboard 首页
│   │   │   │   └── template.tsx # Dashboard 模板
│   │   │   └── layout.tsx       # 应用路由组布局
│   │   ├── layout.tsx           # 根布局
│   │   ├── page.tsx             # 首页
│   │   ├── error.tsx            # 错误边界
│   │   ├── global-error.tsx    # 全局错误边界
│   │   ├── loading.tsx          # 加载状态
│   │   └── not-found.tsx        # 404 页面
│   │
│   ├── components/              # React UI 组件
│   │   ├── ui/                  # shadcn/ui 基础组件
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   └── scroll-area.tsx
│   │   ├── chat/                # 聊天 UI 组件
│   │   │   ├── ChatContainer.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   └── ChatMessage.tsx
│   │   └── providers/           # Context Providers
│   │       ├── I18nProviderWrapper.tsx
│   │       └── StoreProvider.tsx
│   │
│   ├── features/                 # 功能模块（按业务功能分组）
│   │   ├── chat/                # 聊天功能模块
│   │   │   ├── hooks/           # 聊天相关 hooks
│   │   │   │   └── useChat.ts
│   │   │   ├── store/           # 聊天状态管理
│   │   │   │   └── chatStore.ts
│   │   │   └── types.ts         # 聊天相关类型
│   │   │
│   │   ├── i18n/                # 国际化功能模块
│   │   │   ├── context/         # I18n Context
│   │   │   │   └── I18nContext.tsx
│   │   │   ├── components/      # 国际化相关组件
│   │   │   │   └── LanguageSwitcher.tsx
│   │   │   ├── locales/         # 翻译文件
│   │   │   │   ├── zh.ts        # 中文
│   │   │   │   ├── en.ts        # 英文
│   │   │   │   └── index.ts
│   │   │   └── utils/           # 国际化工具
│   │   │       ├── getTranslation.ts
│   │   │       ├── loggerI18n.ts
│   │   │       └── testI18n.ts
│   │   │
│   │   └── ai/                  # AI 功能模块
│   │       ├── agents/          # LangChain Agents
│   │       │   ├── webAgent.ts
│   │       │   └── webAgentGraph.ts
│   │       ├── llm/             # LLM 集成
│   │       │   └── qwen.ts
│   │       ├── tools/           # Web 操作工具
│   │       │   └── webActions.ts
│   │       └── services/        # AI 服务
│   │           └── webAction.ts
│   │
│   ├── shared/                  # 共享代码（跨功能模块使用）
│   │   ├── hooks/               # 通用 React Hooks
│   │   │   └── useRouter.ts
│   │   ├── utils/               # 通用工具函数
│   │   │   └── utils.ts
│   │   ├── logger/              # 日志工具
│   │   │   └── index.ts
│   │   ├── data/                # 数据获取工具
│   │   │   ├── cache.ts
│   │   │   ├── fetcher.ts
│   │   │   └── fetch/
│   │   ├── routes/              # 路由配置
│   │   │   └── index.ts
│   │   ├── actions/             # Server Actions
│   │   │   └── index.ts
│   │   ├── store/               # 全局状态管理
│   │   │   ├── appStore.ts
│   │   │   └── index.ts
│   │   └── types/               # 通用类型定义
│   │       ├── env.d.ts
│   │       └── index.ts
│   │
│   └── styles/                  # 样式文件
│       └── globals.css         # 全局样式
│
├── extension/                  # Chrome Extension 相关文件
│   ├── manifest.json           # Extension 清单文件
│   └── background.js          # Service Worker
├── public/                      # 静态资源
├── scripts/                     # 构建和工具脚本
│   ├── build-extension.js      # 构建 Extension 脚本
│   ├── run-tests.ts           # 运行测试脚本
│   └── test-qwen.ts            # Qwen 测试脚本
├── docs/                        # 项目文档
│   ├── README.md               # 英文 README
│   ├── README.zh.md            # 中文 README
│   ├── PROJECT_STRUCTURE.md    # 项目结构说明
│   ├── FEATURES.md             # 功能说明
│   └── REFACTOR_PLAN.md        # 重组方案
├── tests/                       # 测试工具
│   └── runner.ts               # 测试运行器
├── middleware.ts               # Next.js 中间件
├── next.config.js              # Next.js 配置
├── tailwind.config.ts          # Tailwind CSS 配置
├── postcss.config.js           # PostCSS 配置
├── tsconfig.json               # TypeScript 配置
├── components.json             # shadcn/ui 配置
└── package.json                # 项目依赖
```

## 🎯 结构说明

### 为什么使用新的结构？

1. **功能域清晰**：按业务功能分组（chat、i18n、ai），相关代码集中
2. **职责明确**：每个目录有清晰的职责边界
3. **易于扩展**：新功能在 `features/` 下新建目录即可
4. **便于维护**：相关代码在一起，修改时容易找到

### 目录职责

#### `src/app/` - Next.js App Router
- **路由定义**：所有页面和 API 路由
- **布局系统**：根布局、嵌套布局、路由组布局
- **特殊文件**：`error.tsx`、`loading.tsx`、`not-found.tsx`

#### `src/components/` - React UI 组件
- **UI 基础组件**：shadcn/ui 组件（button、input 等）
- **业务组件**：ChatContainer、ChatInput、ChatMessage
- **Providers**：Context Providers 包装器

#### `src/features/` - 功能模块（按业务功能分组）

##### `features/chat/` - 聊天功能
- **hooks/**：`useChat` - 聊天逻辑 Hook
- **store/**：`chatStore` - 聊天状态管理
- **types.ts**：聊天相关类型定义

##### `features/i18n/` - 国际化功能
- **context/**：`I18nContext` - 国际化 Context
- **components/**：`LanguageSwitcher` - 语言切换器
- **locales/**：翻译文件（zh.ts、en.ts）
- **utils/**：国际化工具函数

##### `features/ai/` - AI 功能
- **agents/**：LangChain Agents（webAgent、webAgentGraph）
- **llm/**：LLM 集成（qwen.ts）
- **tools/**：Web 操作工具（webActions.ts）
- **services/**：AI 服务（webAction.ts）

#### `src/shared/` - 共享代码（跨功能模块使用）
- **hooks/**：通用 React Hooks（useRouter）
- **utils/**：通用工具函数（cn、utils）
- **logger/**：日志工具
- **data/**：数据获取工具（cache、fetcher）
- **routes/**：路由配置
- **actions/**：Server Actions
- **store/**：全局状态管理（appStore）
- **types/**：通用类型定义

## 📝 导入路径

项目使用 `@/` 作为 `src/` 的别名：

```typescript
// ✅ 功能模块导入
import { useChat } from "@/features/chat/hooks/useChat"
import { useChatStore } from "@/features/chat/store/chatStore"
import { useI18n } from "@/features/i18n/context/I18nContext"
import { executeWebAction } from "@/features/ai/services/webAction"

// ✅ 共享代码导入
import { logger } from "@/shared/logger"
import { cn } from "@/shared/utils/utils"
import { useRouter } from "@/shared/hooks/useRouter"

// ✅ 组件导入
import { Button } from "@/components/ui/button"
import { ChatContainer } from "@/components/chat/ChatContainer"

// ❌ 错误：不要使用相对路径
import { useChat } from "../../features/chat/hooks/useChat"
```

## 🔄 结构对比

### 旧结构（不推荐）
```
src/
├── lib/          # 所有工具和业务逻辑混在一起
├── components/   # 组件
├── services/     # 服务
├── store/        # 状态
├── contexts/     # Context
└── locales/      # 翻译
```

**问题**：
- `lib/` 目录过于杂乱
- 相关功能分散在不同目录
- 难以快速定位代码

### 新结构（推荐）✅
```
src/
├── features/     # 按功能分组
│   ├── chat/    # 聊天功能（hooks、store、types）
│   ├── i18n/    # 国际化（context、locales、utils）
│   └── ai/      # AI 功能（agents、llm、tools、services）
├── shared/       # 共享代码
└── components/   # UI 组件
```

**优势**：
- 功能域清晰，相关代码集中
- 职责明确，易于理解
- 便于扩展和维护

## 🚀 Next.js 路由说明

### 路由类型

1. **静态路由**：`src/app/page.tsx` → /
2. **嵌套路由**：`src/app/(app)/dashboard/page.tsx` → /dashboard
3. **路由组**：`(app)` 不影响 URL，只用于组织代码

### 当前可用路由

- `/` - 首页（聊天界面）
- `/dashboard` - Dashboard 页面
- `/not-found` - 404 页面

## 📚 更多信息

- [Next.js App Router 文档](https://nextjs.org/docs/app)
- [功能说明](./FEATURES.md)
- [项目 README](./README.zh.md)
