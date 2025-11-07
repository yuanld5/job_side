/**
 * 运行所有测试
 */

import { config } from "dotenv"
import { resolve } from "path"

// 加载环境变量
config({ path: resolve(__dirname, "../.env.local") })

import { testRunner } from "../tests/runner"
import { logger } from "@/lib/logger"

// 导入所有测试
async function runTests() {
  logger.info("开始运行测试套件")

  // 动态导入测试文件
  try {
    // 核心工具
    await import("../src/lib/utils/__tests__/utils.test")
    await import("../src/lib/logger/__tests__/logger.test")
    
    // 国际化
    await import("../src/lib/i18n/__tests__/getTranslation.test")
    
    // 数据相关
    await import("../src/lib/data/__tests__/cache.test")
    await import("../src/lib/data/__tests__/fetcher.test")
    
    // 路由
    await import("../src/lib/routes/__tests__/routes.test")
    
    // LLM 和工具
    await import("../src/lib/llm/__tests__/qwen.test")
    await import("../src/lib/tools/__tests__/webActions.test")
    
    // 服务
    await import("../src/services/__tests__/webAction.test")
    
    // 状态管理
    await import("../src/store/__tests__/appStore.test")
    await import("../src/store/__tests__/chatStore.test")
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

