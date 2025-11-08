/**
 * App Store 测试用例
 */

import { useAppStore } from "../appStore"
import { describe, test, expect, beforeEach } from "@/tests/runner"
import { createModuleLogger } from "@/shared/logger"

const testLogger = createModuleLogger("appStore-test")

describe("App Store", () => {
  beforeEach(() => {
    // 重置 store 状态
    useAppStore.getState().clearRecentCommands()
    useAppStore.getState().setTheme("system")
  })

  test("应该设置主题", () => {
    useAppStore.getState().setTheme("dark")
    expect(useAppStore.getState().theme).toBe("dark")
    testLogger.info("主题设置测试通过")
  })

  test("应该更新设置", () => {
    useAppStore.getState().updateSettings({ autoSave: false })
    expect(useAppStore.getState().settings.autoSave).toBe(false)
    testLogger.info("设置更新测试通过")
  })

  test("应该添加最近命令", () => {
    useAppStore.getState().addRecentCommand("test-command")
    const commands = useAppStore.getState().recentCommands
    expect(commands.includes("test-command")).toBe(true)
    testLogger.info("添加最近命令测试通过")
  })

  test("应该限制最近命令数量", () => {
    for (let i = 0; i < 60; i++) {
      useAppStore.getState().addRecentCommand(`command-${i}`)
    }
    const commands = useAppStore.getState().recentCommands
    expect(commands.length).toBeLessThanOrEqual(50)
    testLogger.info("命令数量限制测试通过", { count: commands.length })
  })

  test("应该清除最近命令", () => {
    useAppStore.getState().addRecentCommand("command1")
    useAppStore.getState().clearRecentCommands()
    expect(useAppStore.getState().recentCommands.length).toBe(0)
    testLogger.info("清除命令测试通过")
  })
})

