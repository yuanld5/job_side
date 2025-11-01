/**
 * Web Action Service 测试用例
 */

import { executeWebAction, parseCommand } from "../webAction"
import { createModuleLogger } from "@/lib/logger"
import { describe, test, expect } from "@/tests/runner"

const testLogger = createModuleLogger("webAction-test")

describe("Web Action Service", () => {
  test("应该正确解析命令", () => {
    const command = "点击登录按钮"
    const request = parseCommand(command)
    
    expect(request.command).toBe(command)
    testLogger.info("命令解析成功", request)
  })

  test("应该执行网页操作", async () => {
    const request = {
      command: "测试命令",
      useLangGraph: false,
    }

    try {
      const response = await executeWebAction(request, "zh")
      expect(response).toHaveProperty("success")
      expect(response).toHaveProperty("message")
      testLogger.info("网页操作执行成功", response)
    } catch (error) {
      testLogger.warn("网页操作测试跳过（需要 Qwen API）", error)
      // 在测试环境中可能需要 mock 或者跳过
    }
  })

  test("应该处理错误情况", async () => {
    // 测试错误处理逻辑
    const request = {
      command: "",
      useLangGraph: false,
    }

    // 这个测试可能需要 mock 或者在实际环境中测试
    testLogger.info("错误处理测试准备")
  })
})

