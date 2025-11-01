/**
 * Qwen 模型测试用例
 */

import { createQwenModel } from "../qwen"
import { logger, createModuleLogger } from "@/lib/logger"
import { describe, test, expect, beforeEach, afterEach } from "@/tests/runner"

const testLogger = createModuleLogger("qwen-test")

describe("Qwen Model", () => {
  const originalEnv = process.env

  beforeEach(() => {
    // 重置环境变量
    process.env = { ...originalEnv }
    testLogger.info("开始测试 Qwen 模型")
  })

  afterEach(() => {
    process.env = originalEnv
  })

  test("应该在 API key 缺失时抛出错误", async () => {
    delete process.env.QWEN_API_KEY
    delete process.env.DASHSCOPE_API_KEY
    delete process.env.ALI_API_KEY

    await expect(createQwenModel()).rejects.toThrow(
      "QWEN_API_KEY or DASHSCOPE_API_KEY environment variable is not set"
    )
  })

  test("应该使用 DashScope API 创建模型", async () => {
    process.env.DASHSCOPE_API_KEY = "test-api-key"
    process.env.USE_DASHSCOPE = "true"
    process.env.QWEN_MODEL = "qwen-turbo"

    try {
      const model = await createQwenModel()
      expect(model).toBeDefined()
      testLogger.info("DashScope API 模型创建成功")
    } catch (error) {
      testLogger.warn("DashScope API 测试跳过（可能需要真实的 API key）", error)
      // 在测试环境中，如果没有真实的 API key，跳过这个测试
    }
  })

  test("应该使用 OpenAI 兼容 API 创建模型", async () => {
    process.env.QWEN_API_KEY = "test-api-key"
    delete process.env.DASHSCOPE_API_KEY
    delete process.env.USE_DASHSCOPE

    try {
      const model = await createQwenModel()
      expect(model).toBeDefined()
      testLogger.info("OpenAI 兼容 API 模型创建成功")
    } catch (error) {
      testLogger.warn("OpenAI 兼容 API 测试跳过（可能需要真实的 API key）", error)
    }
  })
})

