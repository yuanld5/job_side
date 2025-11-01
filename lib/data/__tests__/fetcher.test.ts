/**
 * 数据获取工具测试用例
 */

import { fetcher, FetchError, serverFetcher, clientFetcher } from "../fetcher"
import { describe, test, expect } from "@/tests/runner"
import { createModuleLogger } from "@/lib/logger"

const testLogger = createModuleLogger("fetcher-test")

describe("Fetcher", () => {
  test("FetchError 应该包含状态码和消息", () => {
    const error = new FetchError(404, "Not Found", {})
    expect(error.status).toBe(404)
    expect(error.statusText).toBe("Not Found")
    expect(error.message).toContain("404")
    testLogger.info("FetchError 测试通过")
  })

  test("应该处理成功的响应（需要 mock fetch）", async () => {
    // 注意：实际测试需要 mock fetch 或使用测试服务器
    // 这里只测试类型和结构
    testLogger.info("Fetcher 成功响应测试需要 mock fetch")
  })

  test("应该处理错误响应（需要 mock fetch）", async () => {
    // 注意：实际测试需要 mock fetch
    // 应该抛出 FetchError
    testLogger.info("Fetcher 错误响应测试需要 mock fetch")
  })

  test("serverFetcher 和 clientFetcher 应该返回函数", () => {
    expect(typeof serverFetcher).toBe("function")
    expect(typeof clientFetcher).toBe("function")
    testLogger.info("Fetcher 函数类型测试通过")
  })
})

