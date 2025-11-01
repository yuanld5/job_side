"use client"

import { ChatMessage } from "./ChatMessage"
import { ChatInput } from "./ChatInput"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useChat } from "@/lib/hooks/useChat"
import { useI18n } from "@/contexts/I18nContext"

export function ChatContainer() {
  const { messages, isProcessing, sendMessage } = useChat()
  const { t } = useI18n()

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p className="text-sm">{t.chat.emptyState}</p>
          </div>
        ) : (
          <div>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isProcessing && (
              <div className="flex justify-start mb-4">
                <div className="bg-muted rounded-lg px-4 py-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-foreground rounded-full animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>
      <ChatInput onSendMessage={sendMessage} disabled={isProcessing} />
    </div>
  )
}

