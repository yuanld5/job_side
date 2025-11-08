import { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents"
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts"
import { createQwenModel } from "@/features/ai/llm/qwen"
import { getWebActionTools } from "@/features/ai/tools/webActions"
import type { Locale } from "@/features/i18n/locales"
import { getTranslation } from "@/features/i18n/utils/getTranslation"
import { createModuleLogger } from "@/shared/logger"

const logger = createModuleLogger("webAgent")

/**
 * 创建网页操作 Agent
 */
export async function createWebAgent(locale: Locale = "zh") {
  const t = getTranslation(locale)
  const tLogger = t.logger.messages
  
  logger.info(tLogger.creatingWebAgent, { locale })
  
  logger.debug(tLogger.initializingModelTools)
  const model = await createQwenModel()
  const tools = getWebActionTools(locale)

  logger.debug(tLogger.buildingPrompt)
  // 构建提示模板
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", t.agent.systemPrompt],
    ["human", "{input}"],
    new MessagesPlaceholder("agent_scratchpad"),
  ])

  logger.debug(tLogger.creatingAgent)
  // 创建 agent
  const agent = await createOpenAIFunctionsAgent({
    llm: model,
    tools,
    prompt,
  })

  logger.debug(tLogger.creatingExecutor)
  // 创建 executor
  const agentExecutor = new AgentExecutor({
    agent,
    tools,
    verbose: process.env.NODE_ENV === "development",
  })

  logger.info(tLogger.webAgentCreated)
  return agentExecutor
}

