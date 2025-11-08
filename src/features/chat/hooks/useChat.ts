import { useState, useCallback } from "react"
import type { Message } from "@/features/chat/types"
import { executeWebAction, parseCommand } from "@/features/ai/services/webAction"
import { useI18n } from "@/features/i18n/context/I18nContext"

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
    return newMessage
  }, [])

  const sendMessage = useCallback(async (content: string) => {
    // 添加用户消息
    addMessage({
      role: "user",
      content,
    })

    setIsProcessing(true)

    try {
      // 解析指令并执行网页操作
      const request = parseCommand(content)
      const response = await executeWebAction(request, locale)

      addMessage({
        role: "assistant",
        content: response.message,
      })
    } catch (error) {
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
