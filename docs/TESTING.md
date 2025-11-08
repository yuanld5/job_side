# 测试文档

## 测试框架

项目使用自定义的测试框架，位于 `src/tests/runner.ts`。测试框架提供了类似 Jest 的 API：

- `describe()` - 测试套件
- `test()` - 测试用例
- `expect()` - 断言
- `beforeEach()` - 每个测试前的钩子
- `afterEach()` - 每个测试后的钩子

## 运行测试

```bash
npm test
```

## 测试覆盖

### ✅ 已完成的测试

#### 核心工具
- ✅ `src/shared/utils/__tests__/utils.test.ts` - 工具函数测试
- ✅ `src/shared/logger/__tests__/logger.test.ts` - Logger 测试

#### 国际化
- ✅ `src/features/i18n/utils/__tests__/getTranslation.test.ts` - 翻译工具测试
- ✅ `src/features/i18n/utils/__tests__/loggerI18n.test.ts` - Logger 国际化测试
- ✅ `src/features/i18n/utils/__tests__/testI18n.test.ts` - 测试国际化测试

#### 数据管理
- ✅ `src/shared/data/__tests__/cache.test.ts` - 缓存管理测试
- ✅ `src/shared/data/__tests__/fetcher.test.ts` - 数据获取测试

#### 路由
- ✅ `src/shared/routes/__tests__/routes.test.ts` - 路由管理测试

#### AI 功能
- ✅ `src/features/ai/llm/__tests__/qwen.test.ts` - Qwen 模型测试
- ✅ `src/features/ai/tools/__tests__/webActions.test.ts` - Web Actions 工具测试
- ✅ `src/features/ai/services/__tests__/webAction.test.ts` - Web Action 服务测试

#### 状态管理
- ✅ `src/shared/store/__tests__/appStore.test.ts` - 应用状态测试
- ✅ `src/shared/store/__tests__/chatStore.test.ts` - 聊天状态测试（已补充）

#### 聊天功能
- ✅ `src/features/chat/hooks/__tests__/useChat.test.ts` - 聊天 Hook 测试（基础）

## 测试统计

- **总测试数**: 52
- **通过**: 52
- **失败**: 0
- **覆盖率**: 核心功能模块已覆盖

## 测试结构

```
src/
├── tests/
│   └── runner.ts          # 测试运行器
├── features/
│   ├── chat/
│   │   └── hooks/
│   │       └── __tests__/
│   │           └── useChat.test.ts
│   ├── i18n/
│   │   └── utils/
│   │       └── __tests__/
│   │           ├── getTranslation.test.ts
│   │           ├── loggerI18n.test.ts
│   │           └── testI18n.test.ts
│   └── ai/
│       ├── llm/
│       │   └── __tests__/
│       │       └── qwen.test.ts
│       ├── tools/
│       │   └── __tests__/
│       │       └── webActions.test.ts
│       └── services/
│           └── __tests__/
│               └── webAction.test.ts
└── shared/
    ├── utils/
    │   └── __tests__/
    │       └── utils.test.ts
    ├── logger/
    │   └── __tests__/
    │       └── logger.test.ts
    ├── data/
    │   └── __tests__/
    │       ├── cache.test.ts
    │       └── fetcher.test.ts
    ├── routes/
    │   └── __tests__/
    │       └── routes.test.ts
    └── store/
        └── __tests__/
            ├── appStore.test.ts
            └── chatStore.test.ts
```

## 编写测试

### 基本示例

```typescript
import { describe, test, expect, beforeEach } from "@/tests/runner"
import { createModuleLogger } from "@/shared/logger"

const testLogger = createModuleLogger("my-test")

describe("My Feature", () => {
  beforeEach(() => {
    // 每个测试前的准备
  })

  test("应该执行某个操作", () => {
    const result = myFunction()
    expect(result).toBe(expected)
    testLogger.info("测试通过")
  })
})
```

### 异步测试

```typescript
test("应该处理异步操作", async () => {
  const result = await asyncFunction()
  expect(result).toBeDefined()
})
```

### 错误测试

```typescript
test("应该抛出错误", async () => {
  try {
    await functionThatThrows()
    throw new Error("应该抛出错误")
  } catch (error) {
    expect(error).toBeDefined()
  }
})
```

## 注意事项

1. **React Hooks 测试**: `useChat` 等 React Hooks 需要 React 测试环境。当前测试只验证函数导出，完整测试需要使用 React Testing Library。

2. **API 测试**: 需要 mock 外部 API 调用的测试（如 `fetcher.test.ts`）标记为需要 mock，实际测试需要额外的 mock 设置。

3. **环境变量**: 某些测试（如 `qwen.test.ts`）需要环境变量，测试会自动处理环境变量的设置和清理。

4. **localStorage**: Zustand persist middleware 在测试环境中可能无法访问 localStorage，这是预期的警告，不影响测试结果。

## 未来改进

- [ ] 添加 React Testing Library 支持，完善 React Hooks 测试
- [ ] 添加覆盖率报告
- [ ] 添加 E2E 测试
- [ ] 添加性能测试
- [ ] 完善 mock 支持

