# 最完整的 Next.js + shadcn/ui 项目模板

## ✅ 已实现的所有 Next.js 功能

### 1. 核心路由系统
- ✅ **根布局** (`app/layout.tsx`) - 完整的 Metadata API 配置
- ✅ **嵌套布局** (`app/(app)/dashboard/layout.tsx`)
- ✅ **路由组** (`app/(app)/`, `app/(marketing)/`)
- ✅ **动态路由** (`app/[id]/page.tsx`, `app/api/users/[id]/route.ts`)
- ✅ **嵌套路由** (`app/(app)/dashboard/settings/page.tsx`)
- ✅ **并行路由** (`app/@modal/`)
- ✅ **拦截路由** (`app/@modal/(.)dashboard/users/[id]/page.tsx`)
- ✅ **模板组件** (`app/(app)/dashboard/template.tsx`)

### 2. 错误处理
- ✅ **页面级错误边界** (`app/error.tsx`)
- ✅ **根级错误边界** (`app/global-error.tsx`)
- ✅ **404 页面** (`app/not-found.tsx`)

### 3. 加载状态
- ✅ **全局加载状态** (`app/loading.tsx`)

### 4. Server Actions
- ✅ **Server Actions** (`src/lib/actions/index.ts`)
  - 表单提交
  - 删除操作
  - 更新操作
  - revalidatePath 使用

### 5. 数据获取
- ✅ **数据获取工具** (`src/lib/data/fetch/index.ts`)
  - 带缓存的 fetch
  - 带标签的 fetch
  - 不缓存的 fetch
  - 静态数据获取

### 6. API Routes
- ✅ **完整的 CRUD API** (`app/api/users/route.ts`)
  - GET - 获取数据
  - POST - 创建数据
  - PUT - 更新数据
  - DELETE - 删除数据
- ✅ **动态 API Routes** (`app/api/users/[id]/route.ts`)

### 7. 服务器组件
- ✅ **服务器组件示例** (`app/(app)/dashboard/users/page.tsx`)
- ✅ **动态元数据生成** (`app/(app)/dashboard/users/[id]/page.tsx`)

### 8. 客户端组件
- ✅ **客户端组件示例** (`app/(app)/dashboard/users/new/page.tsx`)
- ✅ **Server Actions 集成**

### 9. Middleware
- ✅ **增强的中间件** (`middleware.ts`)
  - 安全头设置
  - 路径重定向示例
  - 认证检查示例
  - 国际化重定向示例

### 10. 元数据配置
- ✅ **完整的 Metadata API**
  - 基础元数据
  - Open Graph
  - Twitter Cards
  - SEO 优化
  - 动态元数据生成

### 11. 类型安全
- ✅ **环境变量类型定义** (`src/types/env.d.ts`)
- ✅ **路由类型定义** (`src/lib/routes/index.ts`)

### 12. 路由管理
- ✅ **路由配置管理** (`src/lib/routes/index.ts`)
- ✅ **路由 Hook** (`src/lib/hooks/useRouter.ts`)

## 📁 完整项目结构

```
app/
├── (app)/                    # 应用路由组
│   ├── layout.tsx           # 应用布局
│   └── dashboard/
│       ├── layout.tsx       # 嵌套布局
│       ├── template.tsx     # 模板组件
│       ├── page.tsx        # /dashboard
│       ├── settings/
│       │   └── page.tsx    # /dashboard/settings
│       └── users/
│           ├── page.tsx    # /dashboard/users (服务器组件)
│           ├── new/
│           │   └── page.tsx # /dashboard/users/new (客户端组件 + Server Actions)
│           └── [id]/
│               └── page.tsx # /dashboard/users/[id] (动态路由 + 服务器组件)
├── (marketing)/             # 营销路由组
│   ├── layout.tsx          # 营销布局
│   └── about/
│       └── page.tsx        # /about
├── [id]/                    # 动态路由
│   └── page.tsx            # /[id]
├── @modal/                  # 并行路由
│   ├── default.tsx         # 默认插槽
│   └── (.)dashboard/users/[id]/
│       └── page.tsx        # 拦截路由
├── api/                     # API Routes
│   ├── health/
│   │   └── route.ts        # GET /api/health
│   └── users/
│       ├── route.ts        # CRUD /api/users
│       └── [id]/
│           └── route.ts    # CRUD /api/users/[id]
├── layout.tsx              # 根布局（支持并行路由）
├── page.tsx                 # 首页
├── error.tsx                # 页面级错误边界
├── global-error.tsx         # 根级错误边界
├── loading.tsx             # 全局加载状态
└── not-found.tsx           # 404 页面

src/
├── lib/
│   ├── actions/
│   │   └── index.ts        # Server Actions
│   ├── data/
│   │   └── fetch/
│   │       └── index.ts    # 数据获取工具
│   └── routes/
│       └── index.ts        # 路由配置
└── types/
    └── env.d.ts            # 环境变量类型定义
```

## 🎯 功能特性

### 路由功能
- ✅ 静态路由
- ✅ 动态路由
- ✅ 嵌套路由
- ✅ 路由组（不影响 URL）
- ✅ 并行路由
- ✅ 拦截路由

### 数据获取
- ✅ 服务器组件数据获取
- ✅ fetch 缓存策略
- ✅ revalidate 配置
- ✅ 标签缓存管理

### 表单处理
- ✅ Server Actions
- ✅ 表单验证
- ✅ 错误处理
- ✅ 重新验证路径

### API 功能
- ✅ RESTful API
- ✅ 动态 API Routes
- ✅ 请求验证
- ✅ 错误处理

### 性能优化
- ✅ 服务器组件（减少客户端 JS）
- ✅ 数据缓存
- ✅ 图片优化配置
- ✅ 字体优化

### 开发体验
- ✅ TypeScript 类型安全
- ✅ 环境变量类型定义
- ✅ 路由类型定义
- ✅ 完整的错误处理

## ⚠️ 注意事项

### 静态导出模式
项目配置了 `output: 'export'`（用于 Chrome Extension），因此：
- ❌ Server Actions 不会工作（需要服务器模式）
- ❌ API Routes 不会工作（需要服务器模式）
- ❌ Middleware 不会执行（需要服务器模式）
- ✅ 所有其他功能都可以正常使用

### 切换到服务器模式
如果需要使用 Server Actions、API Routes 和 Middleware：
1. 移除 `next.config.js` 中的 `output: 'export'`
2. 使用 Next.js 服务器模式部署

## 📚 使用示例

### Server Actions
```typescript
import { submitForm } from "@/lib/actions"

// 在客户端组件中使用
<form action={submitForm}>
  <input name="name" />
  <button type="submit">提交</button>
</form>
```

### 数据获取
```typescript
import { getData } from "@/lib/data/fetch"

// 在服务器组件中使用
export default async function Page() {
  const data = await getData()
  return <div>{data}</div>
}
```

### 动态路由
```typescript
// app/[id]/page.tsx
export default function Page({ params }: { params: { id: string } }) {
  return <div>ID: {params.id}</div>
}
```

### API Routes
```typescript
// app/api/users/route.ts
export async function GET() {
  return NextResponse.json({ users: [] })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  // 处理创建逻辑
  return NextResponse.json({ success: true })
}
```

## ✅ 总结

这是一个**最完整的 Next.js 14+ 项目模板**，包含了：
- ✅ 所有核心路由功能
- ✅ Server Actions
- ✅ 完整的 API Routes
- ✅ 数据获取最佳实践
- ✅ 服务器组件和客户端组件
- ✅ 并行路由和拦截路由
- ✅ 完整的错误处理
- ✅ 类型安全配置
- ✅ shadcn/ui 集成

可以作为生产级 Next.js 项目的起点！
