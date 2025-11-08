# 认证功能使用指南

## 概述

本项目实现了完整的用户认证功能，包括登录、登出、路由保护等。认证接口设计为可随时替换，支持模拟接口和真实 API。

## 功能特性

- ✅ 登录界面
- ✅ 登录状态管理（Zustand + 持久化）
- ✅ 路由保护（未登录自动跳转）
- ✅ 登出功能
- ✅ Token 验证
- ✅ 用户信息获取
- ✅ 接口可替换（支持模拟和真实 API）

## 目录结构

```
src/
├── domains/
│   └── auth/                    # 认证领域
│       ├── types.ts             # 类型定义
│       ├── services/
│       │   └── authService.ts   # 认证服务层
│       ├── store/
│       │   └── authStore.ts     # 认证状态管理
│       └── index.ts             # 导出
├── app/
│   ├── login/
│   │   └── page.tsx             # 登录页面
│   └── api/
│       └── auth/                # 认证 API Routes
│           ├── login/
│           ├── logout/
│           ├── verify/
│           └── me/
└── shared/
    └── components/
        └── AuthGuard.tsx        # 路由保护组件
```

## 使用方法

### 1. 登录页面

访问 `/login` 进入登录页面。用户输入用户名和密码后，系统会：

1. 调用 `authService.login()` 进行认证
2. 成功后保存用户信息和 token 到状态管理
3. 自动跳转到首页（聊天界面）

### 2. 路由保护

使用 `AuthGuard` 组件保护需要登录的页面：

```tsx
import { AuthGuard } from "@/shared/components/AuthGuard"

export default function ProtectedPage() {
  return (
    <AuthGuard>
      <YourContent />
    </AuthGuard>
  )
}
```

未登录用户访问受保护页面时，会自动跳转到 `/login`。

### 3. 使用认证状态

```tsx
import { useAuthStore } from "@/domains/auth"

function MyComponent() {
  const { isAuthenticated, user, token, login, logout } = useAuthStore()
  
  // 检查登录状态
  if (!isAuthenticated) {
    return <div>请先登录</div>
  }
  
  // 显示用户信息
  return <div>欢迎，{user?.name}</div>
}
```

### 4. 登出

```tsx
import { authService, useAuthStore } from "@/domains/auth"
import { useRouter } from "next/navigation"

function LogoutButton() {
  const { logout } = useAuthStore()
  const router = useRouter()
  
  const handleLogout = async () => {
    await authService.logout()
    logout()
    router.push("/login")
  }
  
  return <button onClick={handleLogout}>登出</button>
}
```

## 接口配置

### 模式 1：使用 Next.js API Routes（默认，推荐）

项目已启用 Next.js API Routes，默认使用项目内的 API Routes：

```env
NEXT_PUBLIC_USE_MOCK_AUTH=false
```

这样会：
- 使用 Next.js API Routes（`/api/auth/*`）
- 使用项目内的 API Routes 进行认证
- 支持完整的服务器端功能

### 模式 2：使用模拟接口（开发测试）

如果需要使用模拟接口，在 `.env.local` 中设置：

```env
NEXT_PUBLIC_USE_MOCK_AUTH=true
```

模拟接口会：
- 接受任意用户名和密码（密码长度 >= 6）
- 返回模拟的用户信息和 token
- 不进行真实的认证验证
- **适用于开发测试**

### 模式 3：使用外部真实 API

如果需要调用外部真实 API，在 `.env.local` 中设置：

```env
NEXT_PUBLIC_USE_MOCK_AUTH=false
NEXT_PUBLIC_AUTH_API_URL=https://your-auth-api.com/api/auth
```

这样会：
- 在 API Routes 中调用外部真实 API
- 或者直接在 `authService` 中调用外部 API

### 替换接口实现

#### 方式 1：修改环境变量

修改 `src/domains/auth/services/authService.ts` 中的 `AUTH_CONFIG`：

```typescript
const AUTH_CONFIG = {
  useMockApi: process.env.NEXT_PUBLIC_USE_MOCK_AUTH === 'true',
  apiBaseUrl: process.env.NEXT_PUBLIC_AUTH_API_URL || '/api/auth',
}
```

#### 方式 2：修改 API Route

修改 `src/app/api/auth/login/route.ts` 中的登录逻辑：

```typescript
export async function POST(request: NextRequest) {
  const { username, password } = await request.json()
  
  // 替换为真实的认证逻辑
  // 例如：调用外部 API
  const response = await fetch('https://your-auth-api.com/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })
  const data = await response.json()
  
  return NextResponse.json(data)
}
```

#### 方式 3：直接修改服务层

在 `authService.loginWithApi()` 中直接调用外部 API：

```typescript
loginWithApi: async (credentials: LoginCredentials) => {
  const response = await fetch('https://your-auth-api.com/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  })
  return await response.json()
}
```

## API 接口规范

### POST /api/auth/login

**请求体：**
```json
{
  "username": "user",
  "password": "password123"
}
```

**响应：**
```json
{
  "success": true,
  "user": {
    "id": "1",
    "username": "user",
    "email": "user@example.com",
    "name": "User"
  },
  "token": "token_xxx",
  "message": "登录成功"
}
```

### POST /api/auth/logout

**响应：**
```json
{
  "success": true,
  "message": "登出成功"
}
```

### POST /api/auth/verify

**请求体：**
```json
{
  "token": "token_xxx"
}
```

**响应：**
```json
{
  "valid": true
}
```

### GET /api/auth/me

**请求头：**
```
Authorization: Bearer token_xxx
```

**响应：**
```json
{
  "user": {
    "id": "1",
    "username": "user",
    "email": "user@example.com",
    "name": "User"
  }
}
```

## 状态管理

认证状态使用 Zustand 管理，并持久化到 localStorage：

- `isAuthenticated`: 是否已登录
- `user`: 当前用户信息
- `token`: 认证 token
- `login(user, token)`: 设置登录状态
- `logout()`: 清除登录状态

## 注意事项

1. **Token 存储**：Token 存储在 Zustand store 和 localStorage 中
2. **路由保护**：所有需要登录的页面都应使用 `AuthGuard` 包裹
3. **接口替换**：替换接口时，确保返回的数据格式符合 `LoginResponse` 和 `User` 类型定义
4. **错误处理**：所有 API 调用都包含错误处理，失败时会返回相应的错误信息
5. **安全性**：生产环境应使用 HTTPS，并实现 CSRF 保护、XSS 防护等安全措施
6. **服务器模式**：
   - 项目使用标准的 Next.js 服务器模式
   - API Routes 已启用，可直接使用
   - 支持完整的服务器端功能

## 示例：替换为真实 API

假设你的真实 API 地址是 `https://api.example.com/auth`：

1. 修改 `.env.local`：
```env
NEXT_PUBLIC_USE_MOCK_AUTH=false
NEXT_PUBLIC_AUTH_API_URL=https://api.example.com/auth
```

2. 或者直接修改 `authService.ts`：
```typescript
const AUTH_CONFIG = {
  useMockApi: false,
  apiBaseUrl: 'https://api.example.com/auth',
}
```

3. 确保真实 API 返回的数据格式符合类型定义，或调整类型定义以匹配真实 API。

