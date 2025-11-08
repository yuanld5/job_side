# API Routes 使用指南

## 🚀 启用 API Routes

### 1. 设置环境变量

在 `.env.local` 文件中添加：

```env
ENABLE_API_ROUTES=true
```

### 2. 重启开发服务器

```bash
npm run dev
```

## 📁 已创建的 API Routes

### 用户管理 API

#### 1. 获取用户列表
- **路径**: `GET /api/users`
- **查询参数**:
  - `search` (可选): 搜索关键词
  - `page` (可选): 页码，默认 1
  - `limit` (可选): 每页数量，默认 10

**示例**:
```typescript
// 使用 Service 层
import { userService } from '@/domains/users/services/userService'

const users = await userService.getUsers({
  search: '张三',
  page: 1,
  limit: 10
})
```

#### 2. 获取用户详情
- **路径**: `GET /api/users/[id]`

**示例**:
```typescript
const user = await userService.getUser('1')
```

#### 3. 创建用户
- **路径**: `POST /api/users`
- **请求体**:
```json
{
  "name": "张三",
  "email": "zhangsan@example.com"
}
```

**示例**:
```typescript
const newUser = await userService.createUser({
  name: '张三',
  email: 'zhangsan@example.com'
})
```

#### 4. 更新用户
- **路径**: `PUT /api/users/[id]`
- **请求体**:
```json
{
  "name": "李四",
  "email": "lisi@example.com"
}
```

**示例**:
```typescript
const updatedUser = await userService.updateUser('1', {
  name: '李四',
  email: 'lisi@example.com'
})
```

#### 5. 删除用户
- **路径**: `DELETE /api/users/[id]`

**示例**:
```typescript
await userService.deleteUser('1')
```

## 💻 在组件中使用

### 示例：用户列表组件

```typescript
'use client'

import { useState, useEffect } from 'react'
import { userService, type User } from '@/domains/users/services/userService'

export function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      setLoading(true)
      const response = await userService.getUsers()
      setUsers(response.data)
    } catch (error) {
      console.error('加载用户失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async () => {
    try {
      await userService.createUser({
        name: '新用户',
        email: 'newuser@example.com'
      })
      loadUsers() // 重新加载列表
    } catch (error) {
      console.error('创建用户失败:', error)
    }
  }

  if (loading) return <div>加载中...</div>

  return (
    <div>
      <button onClick={handleCreate}>创建用户</button>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  )
}
```

## 🔧 添加新的 API Route

### 步骤 1: 创建 API Route 文件

```typescript
// src/app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // 处理 GET 请求
  return NextResponse.json({ data: [] })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  // 处理 POST 请求
  return NextResponse.json({ data: body }, { status: 201 })
}
```

### 步骤 2: 创建 Service 层

```typescript
// src/features/posts/services/postService.ts
import { fetcher } from '@/shared/data/fetcher'

export const postService = {
  getPosts: () => fetcher('/api/posts'),
  createPost: (data: any) => fetcher('/api/posts', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
}
```

### 步骤 3: 更新路由配置

```typescript
// src/shared/routes/index.ts
export const apiRoutes = {
  users: "/api/users",
  userDetail: (id: string) => `/api/users/${id}`,
  posts: "/api/posts",  // 添加新路由
  postDetail: (id: string) => `/api/posts/${id}`,
} as const
```

## ⚠️ 注意事项

1. **API Routes**: 项目已启用 API Routes，可直接使用
2. **服务器模式**: 项目使用标准的 Next.js 服务器模式，支持完整的后端功能
3. **数据持久化**: 当前示例使用内存存储，实际项目中应该使用数据库
4. **错误处理**: Service 层已经包含错误处理，API Routes 中也应该处理错误

## 📚 相关文件

- `src/app/api/users/route.ts` - 用户列表 API
- `src/app/api/users/[id]/route.ts` - 用户详情 API
- `src/features/users/services/userService.ts` - 用户服务层
- `src/shared/routes/index.ts` - 路由配置
- `src/shared/data/fetcher.ts` - 数据获取工具

