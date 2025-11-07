# 项目结构说明

本项目已按照标准 Next.js 项目结构进行组织。

## 目录结构

```
job_side/
├── app/                    # Next.js App Router
│   ├── (marketing)/        # 分组路由（可选，不影响URL路径）
│   ├── (app)/             # 分组路由（可选）
│   │   ├── dashboard/     # 示例：仪表板路由
│   │   └── api/           # API 路由
│   ├── global-error.tsx   # 根级错误边界（捕获整个应用的错误）
│   ├── error.tsx          # 页面级错误边界
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   ├── loading.tsx        # 加载状态
│   ├── not-found.tsx      # 404 页面
│   └── globals.css        # 全局样式（已移至 src/styles/）
│
├── src/                   # 源代码目录
│   ├── components/        # React 组件（"use client" 组件）
│   │   ├── ui/           # shadcn/ui 基础组件
│   │   ├── chat/         # 聊天相关组件
│   │   └── providers/     # Context Providers
│   ├── lib/              # 工具库
│   │   ├── agents/       # LangChain agents
│   │   ├── llm/          # LLM 集成
│   │   ├── tools/        # Web action tools
│   │   ├── data/         # 数据获取工具
│   │   ├── hooks/        # 自定义 Hooks
│   │   ├── routes/       # 路由管理
│   │   ├── i18n/         # 国际化
│   │   ├── logger/       # 日志系统
│   │   └── utils.ts      # 工具函数
│   ├── store/            # Zustand 状态管理
│   ├── contexts/         # React Context
│   ├── services/         # 业务逻辑服务
│   ├── locales/          # 国际化翻译文件
│   ├── types/            # TypeScript 类型定义
│   └── styles/           # 样式文件
│       └── globals.css   # 全局样式
│
├── public/                # 静态资源
├── scripts/               # 构建和工具脚本
├── tests/                 # 测试工具
└── ...                    # 配置文件
```

## 关键文件说明

### app/global-error.tsx
- 根级错误边界，用于捕获整个应用中的未处理错误
- 必须包含 `<html>` 和 `<body>` 标签
- 用于处理最严重的错误情况

### app/error.tsx
- 页面级错误边界
- 用于处理特定页面或布局中的错误

### src/ 目录
- 所有源代码文件都放在 `src/` 目录下
- 符合 Next.js 标准项目结构
- 使用 `@/` 别名引用（配置在 `tsconfig.json` 中）

## 路径别名

项目使用 `@/` 作为 `src/` 目录的别名：

- `@/components` → `src/components`
- `@/lib` → `src/lib`
- `@/store` → `src/store`
- `@/styles` → `src/styles`
- 等等...

## 路由组织

Next.js App Router 支持以下路由组织方式：

1. **普通路由**: `app/page.tsx` → `/`
2. **嵌套路由**: `app/dashboard/page.tsx` → `/dashboard`
3. **分组路由**: `app/(marketing)/page.tsx` → `/`（不影响URL）
4. **动态路由**: `app/[id]/page.tsx` → `/:id`
5. **API 路由**: `app/api/route.ts` → `/api`

## 注意事项

1. `app/` 目录下的文件使用 Next.js 的约定（layout, page, error 等）
2. `src/` 目录下的文件是普通的 TypeScript/React 代码
3. 所有组件导入使用 `@/` 别名，保持一致性
4. 样式文件统一放在 `src/styles/` 目录
