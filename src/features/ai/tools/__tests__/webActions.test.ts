/**
 * Web Actions 工具测试用例
 */

import { getWebActionTools, clickElementTool, inputTextTool } from "../webActions"
import { createModuleLogger } from "@/shared/logger"
import { describe, test, expect } from "@/tests/runner"

const testLogger = createModuleLogger("webActions-test")

describe("Web Actions Tools", () => {
  test("应该返回所有工具", () => {
    const tools = getWebActionTools("zh")
    expect(tools.length).toBe(4) // click, input, getPageInfo, wait
    testLogger.info("工具列表获取成功", { count: tools.length })
  })

  test("点击工具应该使用正确的 schema", async () => {
    const tool = clickElementTool("zh")
    expect(tool.name).toBe("click_element")
    
    // 测试工具调用
    try {
      const result = await tool.func({ selector: "button#test" })
      const parsed = JSON.parse(result)
      expect(parsed.success).toBe(true)
      testLogger.info("点击工具测试成功", parsed)
    } catch (error) {
      testLogger.error("点击工具测试失败", error)
      throw error
    }
  })

  test("输入工具应该使用正确的 schema", async () => {
    const tool = inputTextTool("en")
    expect(tool.name).toBe("input_text")
    
    try {
      const result = await tool.func({ selector: "input#test", text: "Hello" })
      const parsed = JSON.parse(result)
      expect(parsed.success).toBe(true)
      testLogger.info("输入工具测试成功", parsed)
    } catch (error) {
      testLogger.error("输入工具测试失败", error)
      throw error
    }
  })

  test("应该支持多语言工具", () => {
    const zhTools = getWebActionTools("zh")
    const enTools = getWebActionTools("en")
    
    expect(zhTools.length).toBe(enTools.length)
    testLogger.info("多语言工具测试通过")
  })
})

