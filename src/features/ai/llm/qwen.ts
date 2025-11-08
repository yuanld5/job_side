import { ChatOpenAI } from "@langchain/openai"
import { createModuleLogger } from "@/shared/logger"
import { getLoggerTranslation } from "@/features/i18n/utils/loggerI18n"

const logger = createModuleLogger("qwen")

// 获取当前 locale（从环境变量或默认值）
function getCurrentLocale(): "zh" | "en" {
  return (process.env.LOCALE as "zh" | "en") || "zh"
}

/**
 * 初始化 Qwen 模型
 * 支持两种方式：
 * 1. 通过 DashScope (Tongyi) API
 * 2. 通过 OpenAI 兼容的 API
 */
export async function createQwenModel() {
  const locale = getCurrentLocale()
  const t = getLoggerTranslation(locale)
  
  logger.info(t.messages.startInit)
  
  const apiKey = process.env.QWEN_API_KEY || process.env.DASHSCOPE_API_KEY

  if (!apiKey) {
    logger.error(t.messages.apiKeyNotSet)
    throw new Error(t.errors.apiKeyNotSet)
  }

  logger.debug(t.messages.apiKeyFound, { hasApiKey: !!apiKey })

  // 优先使用 DashScope API
  if (process.env.USE_DASHSCOPE === "true" || process.env.DASHSCOPE_API_KEY) {
    logger.info(t.messages.usingDashScope)
    
    // ChatAlibabaTongyi 会从环境变量 DASHSCOPE_API_KEY 或 ALI_API_KEY 读取
    // 确保环境变量已设置（使用类型断言，因为 process.env 在 TypeScript 中是只读的）
    if (!process.env.DASHSCOPE_API_KEY) {
      ;(process.env as any).DASHSCOPE_API_KEY = apiKey
      logger.debug(t.messages.settingEnvVar.replace("{key}", "DASHSCOPE_API_KEY"))
    }
    if (!process.env.ALI_API_KEY) {
      ;(process.env as any).ALI_API_KEY = apiKey
      logger.debug(t.messages.settingEnvVar.replace("{key}", "ALI_API_KEY"))
    }
    
    // 动态导入 ChatAlibabaTongyi（实际导出名称是 ChatAlibabaTongyi）
    logger.debug(t.messages.importingModule.replace("{module}", "ChatAlibabaTongyi"))
    const TongyiModule = await import("@langchain/community/chat_models/alibaba_tongyi")
    const ChatTongyi = TongyiModule.ChatAlibabaTongyi || (TongyiModule as any).default
    
    if (!ChatTongyi || typeof ChatTongyi !== 'function') {
      logger.error(t.messages.cannotFindConstructor)
      throw new Error(t.errors.unableToFindConstructor)
    }
    
    const modelName = process.env.QWEN_MODEL || "qwen-turbo"
    logger.info(t.messages.creatingInstance.replace("{name}", "ChatAlibabaTongyi"), { model: modelName })
    
    try {
      const model = new ChatTongyi({
        model: modelName,
        temperature: 0.7,
        // ChatAlibabaTongyi 会自动从环境变量读取 API key
      } as any)
      logger.info(t.messages.initSuccess)
      return model
    } catch (error) {
      logger.error(t.messages.initFailed, error)
      throw error
    }
  }

  // 使用 OpenAI 兼容的 API
  logger.info("Using OpenAI compatible API")
  const baseURL = process.env.QWEN_BASE_URL || "https://dashscope.aliyuncs.com/compatible-mode/v1"
  const modelName = process.env.QWEN_MODEL || "qwen-turbo"

  logger.debug(t.messages.creatingInstance.replace("{name}", "ChatOpenAI"), { model: modelName, baseURL })
  
  try {
    const model = new ChatOpenAI({
      modelName,
      openAIApiKey: apiKey,
      configuration: {
        baseURL,
      },
      temperature: 0.7,
    })
    logger.info(t.messages.initSuccessOpenAI)
    return model
  } catch (error) {
    logger.error(t.messages.initFailedOpenAI, error)
    throw error
  }
}
