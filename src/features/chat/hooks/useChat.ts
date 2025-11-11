import { useState, useCallback } from "react"
import type { Message } from "@/features/chat/types"
import { executeWebAction, parseCommand } from "@/features/ai/services/webAction"
import { useI18n } from "@/features/i18n/context/I18nContext"
import { createModuleLogger } from "@/shared/logger"

const logger = createModuleLogger("use-chat")

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const { t, locale } = useI18n()

  const addMessage = useCallback((message: Omit<Message, "id" | "timestamp">) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
    logger.debug("添加消息", { role: message.role, contentLength: message.content.length })
    return newMessage
  }, [])

  const sendMessage = useCallback(async (content: string) => {
    logger.info("发送消息", { contentLength: content.length })
    
    // 添加用户消息
    addMessage({
      role: "user",
      content,
    })

    setIsProcessing(true)

    try {
      // 解析指令并执行网页操作
      logger.debug("解析指令")
      const request = parseCommand(content)
      logger.debug("执行网页操作", { action: request.action })
      
      const response = await executeWebAction(request, locale)
      logger.info("操作执行成功", { message: response.message.substring(0, 50) })

      addMessage({
        role: "assistant",
        content: response.message,
      })
    } catch (error) {
      logger.error("操作执行失败", error)
      addMessage({
        role: "assistant",
        content: `${t.chat.error}: ${error instanceof Error ? error.message : t.chat.unknownError}`,
      })
    } finally {
      setIsProcessing(false)
    }
  }, [addMessage, t, locale])

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  return {
    messages,
    isProcessing,
    sendMessage,
    clearMessages,
  }
}
