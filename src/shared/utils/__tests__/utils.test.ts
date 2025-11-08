/**
 * 工具函数测试用例
 */

import { cn } from "@/shared/utils/utils"
import { describe, test, expect, beforeEach } from "@/tests/runner"
import { createModuleLogger } from "@/shared/logger"

const testLogger = createModuleLogger("utils-test")

describe("Utils", () => {
  beforeEach(() => {
    // 每个测试前的准备（如果需要）
  })
  test("cn 函数应该正确合并类名", () => {
    const result = cn("foo", "bar")
    expect(result).toBe("foo bar")
    testLogger.info("cn 函数测试通过", { result })
  })

  test("cn 函数应该处理条件类名", () => {
    const isActive = true
    const result = cn("base", isActive && "active", "other")
    expect(result).toBe("base active other")
    testLogger.info("条件类名测试通过", { result })
  })

  test("cn 函数应该去重 Tailwind 类名", () => {
    // tailwind-merge 应该自动处理冲突的类名
    const result = cn("p-4", "p-2") // p-2 应该覆盖 p-4
    expect(result).toBe("p-2")
    testLogger.info("Tailwind 类名去重测试通过", { result })
  })

  test("cn 函数应该处理 undefined 和 null", () => {
    const result = cn("foo", undefined, null, "bar")
    expect(result).toBe("foo bar")
    testLogger.info("undefined/null 处理测试通过", { result })
  })

  test("cn 函数应该处理数组", () => {
    const result = cn(["foo", "bar"], "baz")
    expect(result).toBe("foo bar baz")
    testLogger.info("数组处理测试通过", { result })
  })
})

