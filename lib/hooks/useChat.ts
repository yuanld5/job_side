import { useState, useCallback } from "react"
import { Message } from "@/components/chat/ChatMessage"
import { executeWebAction, parseCommand } from "@/services/webAction"

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

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
      const response = await executeWebAction(request)

      addMessage({
        role: "assistant",
        content: response.message,
      })
    } catch (error) {
      addMessage({
        role: "assistant",
        content: `操作失败: ${error instanceof Error ? error.message : "未知错误"}`,
      })
    } finally {
      setIsProcessing(false)
    }
  }, [addMessage])

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
