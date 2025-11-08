# src 目录重组方案

## 当前问题分析

### 1. `lib/` 目录过于杂乱
- 包含了太多不同类型的内容：actions、agents、data、hooks、i18n、llm、logger、routes、tools、utils
- 职责不清晰，难以快速定位代码

### 2. 职责边界模糊
- `services/` 和 `lib/` 都有业务逻辑
- `contexts/` 和 `components/providers/` 功能重复
- `hooks/` 在 `lib/` 下，但 hooks 是 React 相关的

### 3. 缺少功能域分组
- 相关功能分散在不同目录
- 例如：聊天相关的 hooks、store、types 分散在不同地方

## 重组方案

### 新结构设计原则
1. **按功能域分组** - 相关功能放在一起
2. **明确职责边界** - 每个目录有清晰的职责
3. **减少嵌套层级** - 避免过深的目录结构
4. **便于扩展** - 新功能容易添加

### 建议的新结构

```
src/
├── app/                    # Next.js App Router（保持不变）
│   ├── layout.tsx
│   ├── page.tsx
│   └── ...
│
├── components/             # React 组件
│   ├── ui/                # UI 基础组件（shadcn/ui）
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── chat/              # 聊天相关组件
│   │   ├── ChatContainer.tsx
│   │   ├── ChatInput.tsx
│   │   └── ChatMessage.tsx
│   └── providers/         # Context Providers
│       ├── I18nProvider.tsx
│       └── StoreProvider.tsx
│
├── features/              # 功能模块（按业务功能分组）
│   ├── chat/              # 聊天功能模块
│   │   ├── hooks/         # 聊天相关 hooks
│   │   │   └── useChat.ts
│   │   ├── store/         # 聊天状态管理
│   │   │   └── chatStore.ts
│   │   └── types.ts       # 聊天相关类型
│   │
│   ├── i18n/              # 国际化功能模块
│   │   ├── context/       # I18n Context
│   │   │   └── I18nContext.tsx
│   │   ├── locales/       # 翻译文件
│   │   │   ├── zh.ts
│   │   │   ├── en.ts
│   │   │   └── index.ts
│   │   ├── components/    # 国际化相关组件
│   │   │   └── LanguageSwitcher.tsx
│   │   └── utils/         # 国际化工具
│   │       ├── getTranslation.ts
│   │       └── loggerI18n.ts
│   │
│   └── ai/                # AI 功能模块
│       ├── agents/        # LangChain Agents
│       │   ├── webAgent.ts
│       │   └── webAgentGraph.ts
│       ├── llm/           # LLM 集成
│       │   └── qwen.ts
│       ├── tools/         # Web 操作工具
│       │   └── webActions.ts
│       └── services/      # AI 服务
│           └── webAction.ts
│
├── shared/                # 共享代码（跨功能模块使用）
│   ├── hooks/             # 通用 React Hooks
│   │   └── useRouter.ts
│   ├── utils/             # 通用工具函数
│   │   └── utils.ts
│   ├── logger/            # 日志工具
│   │   └── index.ts
│   ├── data/              # 数据获取工具
│   │   ├── cache.ts
│   │   ├── fetcher.ts
│   │   └── fetch/
│   ├── routes/            # 路由配置
│   │   └── index.ts
│   ├── actions/          # Server Actions
│   │   └── index.ts
│   └── types/             # 通用类型定义
│       ├── env.d.ts
│       └── index.ts
│
└── styles/                # 样式文件
    └── globals.css
```

## 重组优势

### 1. 功能域清晰
- **features/** - 按业务功能分组，相关代码集中
- **shared/** - 跨功能模块的共享代码
- **components/** - 纯 UI 组件

### 2. 职责明确
- `features/chat/` - 所有聊天相关代码
- `features/i18n/` - 所有国际化相关代码
- `features/ai/` - 所有 AI 相关代码
- `shared/` - 通用工具和类型

### 3. 易于扩展
- 添加新功能：在 `features/` 下新建目录
- 添加新工具：在 `shared/` 下添加
- 添加新组件：在 `components/` 下添加

### 4. 导入路径更清晰
```typescript
// 功能模块导入
import { useChat } from "@/features/chat/hooks/useChat"
import { useChatStore } from "@/features/chat/store/chatStore"
import { useI18n } from "@/features/i18n/context/I18nContext"

// 共享代码导入
import { logger } from "@/shared/logger"
import { cn } from "@/shared/utils/utils"

// 组件导入
import { Button } from "@/components/ui/button"
import { ChatContainer } from "@/features/chat/components/ChatContainer"
```

## 迁移步骤

1. **创建新目录结构**
2. **移动文件到新位置**
3. **更新所有导入路径**
4. **运行测试确保功能正常**
5. **更新文档**

## 注意事项

- 保持 `app/` 目录不变（Next.js 要求）
- 逐步迁移，确保每一步都能编译通过
- 更新所有相关的导入路径
- 更新文档和注释

