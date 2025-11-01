# 测试文档

## 日志系统

项目集成了日志系统，支持不同级别的日志输出。

### 日志级别

- `DEBUG`: 调试信息（仅在开发环境显示）
- `INFO`: 一般信息
- `WARN`: 警告信息
- `ERROR`: 错误信息

### 使用方式

```typescript
import { logger, createModuleLogger } from "@/lib/logger"

// 使用全局 logger
logger.info("这是一条信息")
logger.error("错误信息", error)

// 使用模块特定的 logger
const moduleLogger = createModuleLogger("my-module")
moduleLogger.debug("调试信息")
moduleLogger.info("模块信息")
```

### 环境变量配置

通过 `LOG_LEVEL` 环境变量控制日志级别：

```bash
LOG_LEVEL=DEBUG  # 显示所有日志
LOG_LEVEL=INFO   # 显示 INFO 及以上级别
LOG_LEVEL=WARN   # 显示 WARN 及以上级别
LOG_LEVEL=ERROR  # 仅显示错误
```

## 测试用例

### 运行所有测试

```bash
npm test
```

### 运行特定测试

```bash
# 测试 Qwen 模型
npm run test:qwen

# 测试 Logger
npm run test:logger
```

### 测试文件位置

- `lib/logger/__tests__/logger.test.ts` - Logger 测试
- `lib/llm/__tests__/qwen.test.ts` - Qwen 模型测试
- `lib/tools/__tests__/webActions.test.ts` - Web Actions 工具测试
- `services/__tests__/webAction.test.ts` - Web Action Service 测试

### 编写测试

测试使用类似 Jest 的 API：

```typescript
import { describe, test, expect } from "../tests/runner"

describe("我的测试套件", () => {
  test("应该通过测试", () => {
    expect(1 + 1).toBe(2)
    expect({ a: 1 }).toHaveProperty("a")
  })
})
```

### 测试工具函数

- `expect(value).toBe(expected)` - 相等断言
- `expect(value).toBeDefined()` - 已定义断言
- `expect(value).toHaveProperty(prop)` - 属性存在断言
- `expect(value).toBeLessThanOrEqual(max)` - 数值比较
- `expect(promise).rejects.toThrow(message?)` - 异常断言

## 日志查看

日志会自动输出到控制台，格式如下：

```
[2025-11-01T00:00:00.000Z] INFO [module] 日志消息 {"data": "value"}
```

在开发环境中，可以通过查看控制台输出来跟踪程序执行流程。

