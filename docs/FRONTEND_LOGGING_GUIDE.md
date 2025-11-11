# 前端日志使用指南

## 概述

本项目使用统一的日志系统来记录前端应用的行为和错误。日志系统支持不同级别的日志输出，并且可以在浏览器和服务器环境中正常工作。

## 快速开始

### 1. 导入日志工具

```typescript
import { createModuleLogger } from "@/shared/logger"

// 为当前模块创建 logger
const logger = createModuleLogger("module-name")
```

### 2. 使用日志

```typescript
// 调试信息（开发环境可见）
logger.debug("调试信息", { data: "some data" })

// 一般信息
logger.info("用户操作", { action: "login", username: "user123" })

// 警告信息
logger.warn("潜在问题", { issue: "low memory" })

// 错误信息
logger.error("操作失败", error)
```

## 日志级别

日志系统支持 4 个级别（从低到高）：

1. **DEBUG** (0): 详细的调试信息，仅在开发环境显示
2. **INFO** (1): 一般信息，记录重要的操作和状态
3. **WARN** (2): 警告信息，表示潜在问题
4. **ERROR** (3): 错误信息，记录错误和异常

### 默认行为

- **开发环境**: 默认显示 DEBUG 及以上级别
- **生产环境**: 默认显示 INFO 及以上级别

## 配置日志级别

### 环境变量

在 `.env.local` 或 `.env` 文件中设置：

```bash
# 客户端日志级别（浏览器环境）
NEXT_PUBLIC_LOG_LEVEL=DEBUG

# 服务器端日志级别（API Routes）
LOG_LEVEL=INFO
```

可选值：`DEBUG`、`INFO`、`WARN`、`ERROR`

### 代码中动态设置

```typescript
import { logger, LogLevel } from "@/shared/logger"

// 设置日志级别
logger.setLevel(LogLevel.WARN)
```

## 使用场景

### 1. React 组件中

```typescript
"use client"

import { createModuleLogger } from "@/shared/logger"
import { useEffect } from "react"

const logger = createModuleLogger("my-component")

export function MyComponent() {
  useEffect(() => {
    logger.info("组件已挂载")
    
    return () => {
      logger.debug("组件即将卸载")
    }
  }, [])

  const handleClick = () => {
    logger.info("用户点击按钮")
    // ...
  }

  return (
    // ...
  )
}
```

### 2. React Hooks 中

```typescript
import { createModuleLogger } from "@/shared/logger"

const logger = createModuleLogger("use-my-hook")

export function useMyHook() {
  const doSomething = async () => {
    try {
      logger.info("开始执行操作")
      // ...
      logger.info("操作成功")
    } catch (error) {
      logger.error("操作失败", error)
      throw error
    }
  }

  return { doSomething }
}
```

### 3. 错误处理

```typescript
try {
  await someAsyncOperation()
} catch (error) {
  // 记录错误详情
  logger.error("操作失败", error)
  
  // 如果是 Error 对象，会自动记录堆栈信息
  if (error instanceof Error) {
    logger.error("错误详情", {
      message: error.message,
      stack: error.stack,
    })
  }
}
```

### 4. API 调用

```typescript
const handleLogin = async (credentials: LoginCredentials) => {
  logger.info("用户尝试登录", { username: credentials.username })
  
  try {
    const response = await authService.login(credentials)
    
    if (response.success) {
      logger.info("登录成功", { username: response.user.username })
    } else {
      logger.warn("登录失败", { reason: response.message })
    }
  } catch (error) {
    logger.error("登录异常", error)
  }
}
```

## 最佳实践

### ✅ 推荐做法

1. **为每个模块创建独立的 logger**
   ```typescript
   const logger = createModuleLogger("login-page")
   ```

2. **记录关键操作**
   ```typescript
   logger.info("用户提交表单", { formType: "login" })
   ```

3. **记录错误时包含上下文**
   ```typescript
   logger.error("API 调用失败", {
     endpoint: "/api/auth/login",
     status: response.status,
     error: error.message,
   })
   ```

4. **使用 DEBUG 记录详细调试信息**
   ```typescript
   logger.debug("状态更新", { 
     prevState, 
     nextState,
     action: "SET_USER" 
   })
   ```

5. **在 useEffect 中记录生命周期**
   ```typescript
   useEffect(() => {
     logger.debug("组件挂载")
     return () => logger.debug("组件卸载")
   }, [])
   ```

### ❌ 避免的做法

1. **不要记录敏感信息**
   ```typescript
   // ❌ 错误：记录密码
   logger.info("登录", { username, password })
   
   // ✅ 正确：只记录非敏感信息
   logger.info("登录", { username })
   ```

2. **不要过度使用 DEBUG**
   ```typescript
   // ❌ 错误：每个渲染都记录
   logger.debug("组件渲染")
   
   // ✅ 正确：只在关键点记录
   logger.debug("状态变化", { from: prev, to: next })
   ```

3. **不要在生产环境记录过多信息**
   - 生产环境默认只显示 INFO 及以上级别
   - 使用环境变量控制日志级别

4. **不要使用 console.log 替代 logger**
   ```typescript
   // ❌ 错误
   console.log("用户操作")
   
   // ✅ 正确
   logger.info("用户操作")
   ```

## 日志格式

日志输出格式：

```
[2024-01-15T10:30:45.123Z] INFO [module-name] 用户操作 {"action":"login","username":"user123"}
```

格式说明：
- `[时间戳]`: ISO 格式的时间戳
- `级别`: DEBUG/INFO/WARN/ERROR
- `[模块名]`: 创建 logger 时指定的模块名
- `消息`: 日志消息
- `数据`: 可选的 JSON 格式数据

## 查看日志

### 浏览器控制台

在浏览器开发者工具（F12）的 Console 标签页中查看：

- **DEBUG**: 使用 `console.debug()`，默认不显示（需要开启详细日志）
- **INFO**: 使用 `console.info()`，蓝色图标
- **WARN**: 使用 `console.warn()`，黄色图标
- **ERROR**: 使用 `console.error()`，红色图标

### 获取日志历史

```typescript
import { logger, LogLevel } from "@/shared/logger"

// 获取所有日志
const allLogs = logger.getLogs()

// 获取错误日志
const errorLogs = logger.getLogs(LogLevel.ERROR)

// 清空日志
logger.clearLogs()
```

## 示例

### 完整的组件示例

```typescript
"use client"

import { useState } from "react"
import { createModuleLogger } from "@/shared/logger"
import { authService } from "@/domains/auth"

const logger = createModuleLogger("login-form")

export function LoginForm() {
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    logger.info("表单提交", { username })
    setIsLoading(true)

    try {
      const response = await authService.login({ username, password })
      
      if (response.success) {
        logger.info("登录成功", { 
          username: response.user.username 
        })
      } else {
        logger.warn("登录失败", { 
          reason: response.message 
        })
      }
    } catch (error) {
      logger.error("登录异常", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* ... */}
    </form>
  )
}
```

## 与后端日志的区别

| 特性 | 前端日志 | 后端日志 |
|------|---------|---------|
| 环境变量 | `NEXT_PUBLIC_LOG_LEVEL` | `LOG_LEVEL` |
| 输出位置 | 浏览器控制台 | 服务器控制台/日志文件 |
| 可见性 | 用户可见（开发者工具） | 仅服务器可见 |
| 用途 | 调试前端问题 | 调试服务器问题 |

## 故障排查

### 日志不显示

1. 检查日志级别设置
   ```typescript
   // 临时降低级别
   logger.setLevel(LogLevel.DEBUG)
   ```

2. 检查环境变量
   ```bash
   # 确保设置了正确的环境变量
   NEXT_PUBLIC_LOG_LEVEL=DEBUG
   ```

3. 检查浏览器控制台设置
   - 确保开启了详细日志显示
   - 检查过滤器设置

### 性能问题

如果日志过多影响性能：

1. 提高日志级别（减少输出）
2. 使用环境变量控制生产环境日志
3. 避免在循环中记录日志

## 相关文件

- `src/shared/logger/index.ts`: 日志系统实现
- `src/app/login/page.tsx`: 登录页面日志示例
- `src/app/page.tsx`: 聊天页面日志示例
- `src/features/chat/hooks/useChat.ts`: Hook 日志示例

