// 网页操作服务
// 使用 LangChain 和 LangGraph 处理网页操作

import { translations, type Locale } from "@/features/i18n/locales"
import { createWebAgent } from "@/features/ai/agents/webAgent"
import { createModuleLogger } from "@/shared/logger"

const logger = createModuleLogger("webAction")

// 动态导入 LangGraph
async function getWebAgentGraph() {
  const { createWebAgentGraph } = await import("@/features/ai/agents/webAgentGraph")
  return createWebAgentGraph
}

export interface WebActionRequest {
  command: string
  params?: Record<string, any>
  useLangGraph?: boolean // 是否使用 LangGraph（默认 true）
}

export interface WebActionResponse {
  success: boolean
  message: string
  data?: any
}

/**
 * 处理网页操作指令
 * 使用 LangChain Agent 或 LangGraph 来处理用户指令
 */
export async function executeWebAction(
  request: WebActionRequest,
  locale: Locale = "zh"
): Promise<WebActionResponse> {
  const t = translations[locale]
  const tLogger = t.logger.messages
  
  logger.info(tLogger.executingWebAction, { command: request.command, locale, useLangGraph: request.useLangGraph })
  
  // 是否使用 LangGraph（默认 false，可在请求中指定）
  const useLangGraph = request.useLangGraph ?? false

  try {
    let result: string

    if (useLangGraph && typeof window === "undefined") {
      // 仅在服务器端使用 LangGraph
      logger.debug(tLogger.usingLangGraph)
      try {
        const createWebAgentGraph = await getWebAgentGraph()
        const graph = await createWebAgentGraph(locale)
        logger.debug(tLogger.langGraphCreated)
        
        const response = await graph.invoke({
          messages: [
            {
              role: "user",
              content: request.command,
            },
          ],
          next: "continue",
        })

        result = response.messages[response.messages.length - 1]?.content || t.chat.processing
        logger.debug(tLogger.langGraphCompleted, { resultLength: result.length })
      } catch (graphError) {
        logger.warn(tLogger.langGraphUnavailable, graphError)
        // 降级到标准 Agent
        const agent = await createWebAgent(locale)
        const response = await agent.invoke({
          input: request.command,
        })
        result = response.output || t.chat.processing
      }
    } else {
      logger.debug(tLogger.usingStandardAgent)
      // 使用标准 LangChain Agent
      const agent = await createWebAgent(locale)
      logger.debug(tLogger.agentCreated)
      
      const response = await agent.invoke({
        input: request.command,
      })

      result = response.output || t.chat.processing
      logger.debug(tLogger.agentCompleted, { resultLength: result.length })
    }

    logger.info(tLogger.webActionSuccess)
    return {
      success: true,
      message: result,
    }
  } catch (error) {
    logger.error(tLogger.webActionFailed, error)
    return {
      success: false,
      message: `${t.chat.error}: ${error instanceof Error ? error.message : t.chat.unknownError}`,
    }
  }
}

/**
 * 解析用户指令
 * TODO: 实现指令解析逻辑
 */
export function parseCommand(input: string): WebActionRequest {
  // 将来可以实现指令解析，比如：
  // "点击登录按钮" -> { command: "click", params: { selector: "button.login" } }
  // "填写表单" -> { command: "fillForm", params: { ... } }
  
  return {
    command: input,
  }
}

