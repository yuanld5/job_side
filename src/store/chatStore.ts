/**
 * 聊天状态管理
 * 管理聊天消息、会话等状态
 */

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Message } from "@/components/chat/ChatMessage"

interface ChatState {
  // 当前会话消息
  messages: Message[]
  
  // 会话历史
  sessions: Array<{
    id: string
    title: string
    messages: Message[]
    createdAt: Date
    updatedAt: Date
  }>
  
  // 当前会话 ID
  currentSessionId: string | null
  
  // 是否正在处理
  isProcessing: boolean
  
  // Actions
  addMessage: (message: Omit<Message, "id" | "timestamp">) => void
  setMessages: (messages: Message[]) => void
  clearMessages: () => void
  setIsProcessing: (isProcessing: boolean) => void
  createSession: (title?: string) => string
  switchSession: (sessionId: string) => void
  deleteSession: (sessionId: string) => void
  updateSessionTitle: (sessionId: string, title: string) => void
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      messages: [],
      sessions: [],
      currentSessionId: null,
      isProcessing: false,
      
      addMessage: (message) => {
        const newMessage: Message = {
          ...message,
          id: Date.now().toString(),
          timestamp: new Date(),
        }
        
        set((state) => {
          const updatedMessages = [...state.messages, newMessage]
          
          // 如果当前有会话，更新会话消息
          if (state.currentSessionId) {
            const updatedSessions = state.sessions.map((session) =>
              session.id === state.currentSessionId
                ? {
                    ...session,
                    messages: updatedMessages,
                    updatedAt: new Date(),
                  }
                : session
            )
            return {
              messages: updatedMessages,
              sessions: updatedSessions,
            }
          }
          
          return { messages: updatedMessages }
        })
      },
      
      setMessages: (messages) => set({ messages }),
      
      clearMessages: () => set({ messages: [] }),
      
      setIsProcessing: (isProcessing) => set({ isProcessing }),
      
      createSession: (title) => {
        const sessionId = Date.now().toString()
        const newSession = {
          id: sessionId,
          title: title || "新会话",
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        
        set((state) => ({
          sessions: [newSession, ...state.sessions],
          currentSessionId: sessionId,
          messages: [],
        }))
        
        return sessionId
      },
      
      switchSession: (sessionId) => {
        const session = get().sessions.find((s) => s.id === sessionId)
        if (session) {
          set({
            currentSessionId: sessionId,
            messages: session.messages,
          })
        }
      },
      
      deleteSession: (sessionId) => {
        set((state) => ({
          sessions: state.sessions.filter((s) => s.id !== sessionId),
          currentSessionId:
            state.currentSessionId === sessionId ? null : state.currentSessionId,
          messages:
            state.currentSessionId === sessionId ? [] : state.messages,
        }))
      },
      
      updateSessionTitle: (sessionId, title) => {
        set((state) => ({
          sessions: state.sessions.map((session) =>
            session.id === sessionId ? { ...session, title } : session
          ),
        }))
      },
    }),
    {
      name: "chat-storage",
      partialize: (state) => ({
        sessions: state.sessions.map((session) => ({
          ...session,
          createdAt: session.createdAt.toISOString(),
          updatedAt: session.updatedAt.toISOString(),
          messages: session.messages.map((msg) => ({
            ...msg,
            timestamp: msg.timestamp.toISOString(),
          })),
        })),
        currentSessionId: state.currentSessionId,
      }),
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name)
          if (!str) return null
          const parsed = JSON.parse(str)
          if (parsed.state?.sessions) {
            parsed.state.sessions = parsed.state.sessions.map((s: any) => ({
              ...s,
              createdAt: new Date(s.createdAt),
              updatedAt: new Date(s.updatedAt),
              messages: s.messages.map((m: any) => ({
                ...m,
                timestamp: new Date(m.timestamp),
              })),
            }))
          }
          return parsed
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value))
        },
        removeItem: (name) => {
          localStorage.removeItem(name)
        },
      },
    }
  )
)

