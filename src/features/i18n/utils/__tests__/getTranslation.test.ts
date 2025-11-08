/**
 * 国际化工具函数测试用例
 */

import { getTranslation, replacePlaceholders } from "../getTranslation"
import { describe, test, expect } from "@/tests/runner"
import { createModuleLogger } from "@/shared/logger"

const testLogger = createModuleLogger("i18n-test")

describe("I18n Utils", () => {
  test("应该获取中文翻译", () => {
    const t = getTranslation("zh")
    expect(t.common.title).toBe("网页操作助手")
    expect(t.common.description).toBeDefined()
    testLogger.info("中文翻译获取成功")
  })

  test("应该获取英文翻译", () => {
    const t = getTranslation("en")
    expect(t.common.title).toBe("Web Action Assistant")
    expect(t.common.description).toBeDefined()
    testLogger.info("英文翻译获取成功")
  })

  test("replacePlaceholders 应该正确替换占位符", () => {
    const result = replacePlaceholders("Hello {name}", { name: "World" })
    expect(result).toBe("Hello World")
    testLogger.info("占位符替换测试通过", { result })
  })

  test("replacePlaceholders 应该处理多个占位符", () => {
    const result = replacePlaceholders("Hello {name}, you have {count} messages", {
      name: "Alice",
      count: 5,
    })
    expect(result).toBe("Hello Alice, you have 5 messages")
    testLogger.info("多占位符替换测试通过", { result })
  })

  test("replacePlaceholders 应该处理数字占位符", () => {
    const result = replacePlaceholders("Count: {count}", { count: 42 })
    expect(result).toBe("Count: 42")
    testLogger.info("数字占位符测试通过", { result })
  })

  test("replacePlaceholders 应该处理重复占位符", () => {
    const result = replacePlaceholders("{name} says {name}", { name: "John" })
    expect(result).toBe("John says John")
    testLogger.info("重复占位符测试通过", { result })
  })
})


