/**
 * 测试 Qwen 模型调用
 * 运行: npx tsx scripts/test-qwen.ts
 */

// 加载环境变量
import { config } from "dotenv"
import { resolve } from "path"

// 加载 .env.local 文件
config({ path: resolve(__dirname, "../.env.local") })

import { createQwenModel } from "../lib/llm/qwen"
import { logger, createModuleLogger } from "@/lib/logger"
import { getTestTranslation } from "@/lib/i18n/testI18n"

const testLogger = createModuleLogger("qwen-test")

// 获取当前 locale
function getCurrentLocale(): "zh" | "en" {
  return (process.env.LOCALE as "zh" | "en") || "zh"
}

async function testQwen() {
  const t = getTestTranslation(getCurrentLocale())
  testLogger.info(t.testQwen.start)
  
  try {
    // 创建模型实例
    testLogger.info(`1. ${t.testQwen.init}...`)
    const model = await createQwenModel()
    testLogger.info(`✓ ${t.testQwen.initSuccess}`)

    // 测试简单调用
    testLogger.info(`2. ${t.testQwen.testInvoke}...`)
    const response = await model.invoke("你好，请用一句话介绍一下你自己。")
    testLogger.info(`✓ ${t.testQwen.invokeSuccess}`)
    logger.info(`\n${t.testQwen.modelResponse}:`)
    logger.info("=".repeat(50))
    logger.info(response.content as string)
    logger.info("=".repeat(50))

    // 测试流式调用
    testLogger.info(`3. ${t.testQwen.testStream}...`)
    const stream = await model.stream("请用一句话说一个笑话。")
    testLogger.info(`✓ ${t.testQwen.streamStart}`)
    logger.info(`\n${t.testQwen.modelResponseStream}:`)
    logger.info("-".repeat(50))
    for await (const chunk of stream) {
      process.stdout.write(chunk.content)
    }
    logger.info("\n" + "-".repeat(50))

    testLogger.info(`✅ ${t.testQwen.allPassed}`)
  } catch (error) {
    testLogger.error(`❌ ${t.testQwen.testFailed}:`, error)
    if (error instanceof Error) {
      logger.error(`${t.testQwen.errorInfo}:`, error.message)
      logger.error(`${t.testQwen.errorStack}:`, error.stack)
    } else {
      logger.error(`${t.testQwen.unknownError}:`, error)
    }
    process.exit(1)
  }
}

testQwen()

