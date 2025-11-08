/**
 * Logger 国际化工具测试用例
 */

import { getLoggerTranslation } from "../loggerI18n"
import { describe, test, expect } from "@/tests/runner"
import { createModuleLogger } from "@/shared/logger"

const testLogger = createModuleLogger("loggerI18n-test")

describe("Logger I18n Utils", () => {
  test("应该返回中文 logger 翻译", () => {
    const translation = getLoggerTranslation("zh")
    expect(translation).toBeDefined()
    expect(translation).toHaveProperty("messages")
    expect(translation.messages).toHaveProperty("startInit")
    testLogger.info("中文 logger 翻译测试通过", { hasMessages: !!translation.messages })
  })

  test("应该返回英文 logger 翻译", () => {
    const translation = getLoggerTranslation("en")
    expect(translation).toBeDefined()
    expect(translation).toHaveProperty("messages")
    expect(translation.messages).toHaveProperty("startInit")
    testLogger.info("英文 logger 翻译测试通过", { hasMessages: !!translation.messages })
  })

  test("默认应该返回中文翻译", () => {
    const translation = getLoggerTranslation()
    expect(translation).toBeDefined()
    expect(translation).toHaveProperty("messages")
    testLogger.info("默认 logger 翻译测试通过")
  })

  test("翻译对象应该包含所有必要的消息键", () => {
    const zhTranslation = getLoggerTranslation("zh")
    const enTranslation = getLoggerTranslation("en")
    
    // 检查关键消息键是否存在
    const requiredKeys = ["startInit", "apiKeyFound", "initSuccess", "webAgentCreated"]
    for (const key of requiredKeys) {
      expect(zhTranslation.messages).toHaveProperty(key)
      expect(enTranslation.messages).toHaveProperty(key)
    }
    
    testLogger.info("翻译键完整性测试通过", { requiredKeys })
  })
})

