import { StateGraph, END, START } from "@langchain/langgraph"
import { createQwenModel } from "@/lib/llm/qwen"
import { getWebActionTools } from "@/lib/tools/webActions"
import { ChatPromptTemplate } from "@langchain/core/prompts"
import { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents"
import type { Locale } from "@/locales"
import { getTranslation } from "@/lib/i18n/getTranslation"
import { createModuleLogger } from "@/lib/logger"

const logger = createModuleLogger("webAgentGraph")

/**
 * Agent 状态定义
 */
export interface AgentState {
  messages: Array<{ role: string; content: string }>
  next: string
}

/**
 * 使用 LangGraph 创建网页操作 Agent
 * LangGraph 提供了更强大的状态管理和流程控制
 */
export async function createWebAgentGraph(locale: Locale = "zh") {
  const t = getTranslation(locale)
  const tLogger = t.logger.messages
  
  logger.info(tLogger.creatingWebAgentGraph, { locale })
  
  logger.debug(tLogger.initializingModelTools)
  const model = await createQwenModel()
  const tools = getWebActionTools(locale)

  logger.debug(tLogger.buildingPrompt)
  // 构建提示模板
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", t.agent.systemPrompt],
    ["human", "{input}"],
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

  // 定义节点
  const callAgent = async (state: AgentState) => {
    logger.debug(tLogger.executingAgentNode, { messageCount: state.messages.length })
    const lastMessage = state.messages[state.messages.length - 1]
    
    try {
      const result = await agentExecutor.invoke({
        input: lastMessage.content,
        chat_history: state.messages.slice(0, -1),
      })

      logger.debug(tLogger.agentNodeSuccess)
      return {
        messages: [
          ...state.messages,
          {
            role: "assistant",
            content: result.output,
          },
        ],
        next: "end",
      }
    } catch (error) {
      logger.error(tLogger.agentNodeFailed, error)
      throw error
    }
  }

  logger.debug(tLogger.creatingStateGraph)
  // 创建状态图
  // 注意：LangGraph StateGraph API 可能有变化，这里使用简化的方式
  const workflow = new StateGraph<AgentState>({
    channels: {
      messages: {
        reducer: (x: AgentState["messages"], y: AgentState["messages"]) => [
          ...x,
          ...y,
        ],
      },
      next: {
        reducer: (x: string, y: string) => y || x,
      },
    },
  })

  logger.debug(tLogger.addingNodesEdges)
  // 添加节点和边
  workflow.addNode("agent", callAgent)
  workflow.addEdge(START as "__start__", "agent" as any)
  workflow.addEdge("agent" as any, END as "__end__")

  logger.debug(tLogger.compilingGraph)
  // 编译图
  const app = workflow.compile()

  logger.info(tLogger.webAgentGraphCreated)
  return app
}

