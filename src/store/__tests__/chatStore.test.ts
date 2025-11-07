/**
 * Chat Store 测试用例
 */

import { useChatStore } from "../chatStore"
import { describe, test, expect, beforeEach } from "@/tests/runner"
import { createModuleLogger } from "@/lib/logger"

const testLogger = createModuleLogger("chatStore-test")

describe("Chat Store", () => {
  beforeEach(() => {
    // 重置 store 状态
    useChatStore.getState().clearMessages()
    useChatStore.getState().setIsProcessing(false)
  })

  test("应该添加消息", () => {
    useChatStore.getState().addMessage({
      role: "user",
      content: "Hello",
    })
    const messages = useChatStore.getState().messages
    expect(messages.length).toBe(1)
    expect(messages[0].role).toBe("user")
    expect(messages[0].content).toBe("Hello")
    testLogger.info("添加消息测试通过")
  })

  test("应该设置处理状态", () => {
    useChatStore.getState().setIsProcessing(true)
    expect(useChatStore.getState().isProcessing).toBe(true)
    useChatStore.getState().setIsProcessing(false)
    expect(useChatStore.getState().isProcessing).toBe(false)
    testLogger.info("处理状态设置测试通过")
  })

  test("应该清除消息", () => {
    useChatStore.getState().addMessage({ role: "user", content: "test" })
    useChatStore.getState().clearMessages()
    expect(useChatStore.getState().messages.length).toBe(0)
    testLogger.info("清除消息测试通过")
  })

  test("应该创建会话", () => {
    const sessionId = useChatStore.getState().createSession("Test Session")
    expect(sessionId).toBeDefined()
    expect(useChatStore.getState().currentSessionId).toBe(sessionId)
    testLogger.info("创建会话测试通过", { sessionId })
  })

  test("应该切换会话", () => {
    const session1 = useChatStore.getState().createSession("Session 1")
    useChatStore.getState().addMessage({ role: "user", content: "Message 1" })
    
    const session2 = useChatStore.getState().createSession("Session 2")
    useChatStore.getState().addMessage({ role: "user", content: "Message 2" })
    
    useChatStore.getState().switchSession(session1)
    const sessions = useChatStore.getState().sessions
    const session = sessions.find((s) => s.id === session1)
    expect(session).toBeDefined()
    expect(session?.messages.length).toBe(1)
    testLogger.info("切换会话测试通过")
  })

  test("应该删除会话", () => {
    const sessionId = useChatStore.getState().createSession("To Delete")
    useChatStore.getState().deleteSession(sessionId)
    const session = useChatStore.getState().sessions.find((s) => s.id === sessionId)
    expect(session).toBeUndefined()
    testLogger.info("删除会话测试通过")
  })

  test("应该更新会话标题", () => {
    const sessionId = useChatStore.getState().createSession("Old Title")
    useChatStore.getState().updateSessionTitle(sessionId, "New Title")
    const session = useChatStore.getState().sessions.find((s) => s.id === sessionId)
    expect(session?.title).toBe("New Title")
    testLogger.info("更新会话标题测试通过")
  })
})

