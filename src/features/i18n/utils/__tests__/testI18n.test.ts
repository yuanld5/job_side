/**
 * 测试相关国际化工具测试用例
 */

import { getTestTranslation } from "../testI18n"
import { describe, test, expect } from "@/tests/runner"
import { createModuleLogger } from "@/shared/logger"

const testLogger = createModuleLogger("testI18n-test")

describe("Test I18n Utils", () => {
  test("应该返回中文测试翻译", () => {
    const translation = getTestTranslation("zh")
    expect(translation).toBeDefined()
    expect(translation).toHaveProperty("startRunning")
    expect(translation).toHaveProperty("testComplete")
    testLogger.info("中文测试翻译测试通过", { hasStartRunning: !!translation.startRunning })
  })

  test("应该返回英文测试翻译", () => {
    const translation = getTestTranslation("en")
    expect(translation).toBeDefined()
    expect(translation).toHaveProperty("startRunning")
    expect(translation).toHaveProperty("testComplete")
    testLogger.info("英文测试翻译测试通过", { hasStartRunning: !!translation.startRunning })
  })

  test("默认应该返回中文翻译", () => {
    const translation = getTestTranslation()
    expect(translation).toBeDefined()
    expect(translation).toHaveProperty("startRunning")
    testLogger.info("默认测试翻译测试通过")
  })

  test("翻译对象应该包含所有必要的测试消息键", () => {
    const zhTranslation = getTestTranslation("zh")
    const enTranslation = getTestTranslation("en")
    
    // 检查关键消息键是否存在
    const requiredKeys = ["startRunning", "testComplete", "total", "passed", "failed", "duration", "someTestsFailed"]
    for (const key of requiredKeys) {
      expect(zhTranslation).toHaveProperty(key)
      expect(enTranslation).toHaveProperty(key)
    }
    
    testLogger.info("测试翻译键完整性测试通过", { requiredKeys })
  })
})

