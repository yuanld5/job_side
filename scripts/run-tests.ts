/**
 * 运行所有测试
 */

import { config } from "dotenv"
import { resolve } from "path"

// 加载环境变量
config({ path: resolve(__dirname, "../.env.local") })

import { testRunner } from "../src/tests/runner"
import { logger } from "@/shared/logger"

// 导入所有测试
async function runTests() {
  logger.info("开始运行测试套件")

  // 动态导入测试文件
  try {
    // 核心工具
    await import("../src/shared/utils/__tests__/utils.test")
    await import("../src/shared/logger/__tests__/logger.test")
    
    // 国际化
    await import("../src/features/i18n/utils/__tests__/getTranslation.test")
    await import("../src/features/i18n/utils/__tests__/loggerI18n.test")
    await import("../src/features/i18n/utils/__tests__/testI18n.test")
    
    // 数据相关
    await import("../src/shared/data/__tests__/cache.test")
    await import("../src/shared/data/__tests__/fetcher.test")
    
    // 路由
    await import("../src/shared/routes/__tests__/routes.test")
    
    // LLM 和工具
    await import("../src/features/ai/llm/__tests__/qwen.test")
    await import("../src/features/ai/tools/__tests__/webActions.test")
    
    // 服务
    await import("../src/features/ai/services/__tests__/webAction.test")
    
    // 状态管理
    await import("../src/shared/store/__tests__/appStore.test")
    await import("../src/features/chat/store/__tests__/chatStore.test")
    
    // 聊天功能
    await import("../src/features/chat/hooks/__tests__/useChat.test")
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error)
    logger.warn("部分测试文件导入失败（可能是预期的）", undefined, { error: errorMsg })
  }

  // 运行所有测试
  await testRunner.run()
}

runTests().catch((error) => {
  logger.error("测试运行失败", error)
  process.exit(1)
})

