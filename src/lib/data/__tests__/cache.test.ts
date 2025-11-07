/**
 * 缓存管理测试用例
 */

import { cacheManager } from "../cache"
import { describe, test, expect, beforeEach } from "@/tests/runner"
import { createModuleLogger } from "@/lib/logger"

const testLogger = createModuleLogger("cache-test")

describe("Cache Manager", () => {
  beforeEach(() => {
    cacheManager.clear()
  })

  test("应该设置和获取缓存", () => {
    cacheManager.set("test-key", "test-value", 60000)
    const value = cacheManager.get("test-key")
    expect(value).toBe("test-value")
    testLogger.info("缓存设置和获取测试通过")
  })

  test("应该检查缓存是否存在", () => {
    cacheManager.set("exists", "value", 60000)
    expect(cacheManager.has("exists")).toBe(true)
    expect(cacheManager.has("not-exists")).toBe(false)
    testLogger.info("缓存存在检查测试通过")
  })

  test("应该删除缓存", () => {
    cacheManager.set("delete-me", "value", 60000)
    cacheManager.delete("delete-me")
    expect(cacheManager.get("delete-me")).toBe(null)
    testLogger.info("缓存删除测试通过")
  })

  test("应该清理所有缓存", () => {
    cacheManager.set("key1", "value1", 60000)
    cacheManager.set("key2", "value2", 60000)
    cacheManager.clear()
    expect(cacheManager.get("key1")).toBe(null)
    expect(cacheManager.get("key2")).toBe(null)
    testLogger.info("缓存清理测试通过")
  })

  test("应该处理过期缓存", async () => {
    cacheManager.set("expired", "value", 100) // 100ms 过期
    await new Promise((resolve) => setTimeout(resolve, 150))
    cacheManager.cleanup()
    expect(cacheManager.get("expired")).toBe(null)
    testLogger.info("过期缓存清理测试通过")
  })

  test("应该支持不同数据类型的缓存", () => {
    cacheManager.set("string", "text", 60000)
    cacheManager.set("number", 42, 60000)
    cacheManager.set("object", { key: "value" }, 60000)
    cacheManager.set("array", [1, 2, 3], 60000)

    expect(cacheManager.get("string")).toBe("text")
    expect(cacheManager.get("number")).toBe(42)
    expect(cacheManager.get("object")).toHaveProperty("key")
    expect(Array.isArray(cacheManager.get("array"))).toBe(true)
    testLogger.info("不同类型缓存测试通过")
  })
})

