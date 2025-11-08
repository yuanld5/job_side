# API 路由和服务层架构指南

## 📚 两种路由的区别

### 1. 前端页面路由（当前 `src/shared/routes/index.ts`）

用于**页面导航**，不涉及 HTTP 方法：

```typescript
// ✅ 用于页面跳转
export const routes = {
  home: "/",
  dashboard: "/dashboard",
} as const

// 使用方式
router.navigate(routes.dashboard)
```

### 2. API 路由（Next.js API Routes）

用于**后端 API 端点**，支持 HTTP 方法（GET、POST、PUT、DELETE 等）：

```typescript
// app/api/users/route.ts
export async function GET(request: Request) {
  // 处理 GET 请求
}

export async function POST(request: Request) {
  // 处理 POST 请求
}
```

## ⚠️ 当前项目限制

项目配置了 `output: 'export'`（静态导出），这意味着：

- ❌ **不支持 Next.js API Routes**（`app/api/` 目录）
- ❌ **不支持 Server Actions**（在静态导出模式下）
- ✅ **支持 Service 层**（客户端调用外部 API）

## 🏗️ 推荐的架构方案

### 方案 1：Service 层 + 外部 API（当前架构）

适合静态导出项目，所有业务逻辑在客户端通过 Service 层处理：

```
┌─────────────┐
│   Component │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Service   │  ← 业务逻辑层
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Fetcher   │  ← 数据获取层
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ External API│  ← 外部 API 或 Chrome Extension API
└─────────────┘
```

**示例**：

```typescript
// 1. Service 层（src/features/xxx/services/xxx.ts）
export async function createUser(data: UserData) {
  // 业务逻辑处理
  const response = await fetcher('/api/users', {
    method: 'POST',
    body: JSON.stringify(data),
  })
  return response
}

// 2. 在组件中使用
import { createUser } from '@/domains/users/services/userService'

const handleSubmit = async () => {
  await createUser(formData)
}
```

### 方案 2：启用 API Routes（需要修改配置）

如果需要使用 Next.js API Routes，需要：

1. **移除静态导出配置**：

```javascript
// next.config.js
const nextConfig = {
  // ❌ 移除这行
  // output: 'export',
  
  // ✅ 保留其他配置
}
```

2. **创建 API 路由**：

```typescript
// src/app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { userService } from '@/domains/users/services/userService'

export async function GET(request: NextRequest) {
  const users = await userService.getAll()
  return NextResponse.json(users)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const user = await userService.create(body)
  return NextResponse.json(user, { status: 201 })
}
```

3. **在 Service 层调用**：

```typescript
// src/features/users/services/userService.ts
import { fetcher } from '@/shared/data/fetcher'

export const userService = {
  getAll: () => fetcher('/api/users'),
  create: (data: UserData) => fetcher('/api/users', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
}
```

## 📝 当前项目的 Service 层示例

项目已有 Service 层架构：

### 1. Fetcher（数据获取层）

```typescript
// src/shared/data/fetcher.ts
export async function fetcher<T>(
  url: string,
  options?: FetchOptions
): Promise<T> {
  // 支持 GET、POST、PUT、DELETE 等
  const response = await fetch(url, {
    method: options?.method || 'GET',
    body: options?.body,
    headers: options?.headers,
  })
  return response.json()
}
```

### 2. Service 层（业务逻辑）

```typescript
// src/features/ai/services/webAction.ts
export async function executeWebAction(
  request: WebActionRequest,
  locale: Locale
): Promise<WebActionResponse> {
  // 业务逻辑处理
  // 调用 AI Agent
  // 返回结果
}
```

### 3. 在组件中使用

```typescript
// src/features/chat/hooks/useChat.ts
import { executeWebAction } from '@/features/ai/services/webAction'

const sendMessage = async (content: string) => {
  const response = await executeWebAction({ command: content }, locale)
  // 处理响应
}
```

## 🎯 建议

### 对于 Chrome Extension 项目

**推荐使用方案 1**（Service 层 + 外部 API）：

1. ✅ 保持静态导出，适合 Chrome Extension
2. ✅ 使用 Service 层处理业务逻辑
3. ✅ 通过 `fetcher` 调用外部 API 或 Chrome Extension API
4. ✅ 代码结构清晰，易于维护

### 如果需要后端 API

如果确实需要 Next.js API Routes：

1. 移除 `output: 'export'` 配置
2. 创建 `src/app/api/` 目录
3. 实现 API 路由处理函数
4. 在 Service 层调用这些 API

## 📚 相关文件

- `src/shared/data/fetcher.ts` - 数据获取工具
- `src/features/ai/services/webAction.ts` - AI 服务示例
- `src/shared/actions/index.ts` - Server Actions（静态导出不可用）

