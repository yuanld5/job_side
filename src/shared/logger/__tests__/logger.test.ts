/**
 * Logger 测试用例
 */

import { logger, LogLevel, createModuleLogger } from "../index"
import { describe, test, expect, beforeEach } from "@/tests/runner"

describe("Logger", () => {
  beforeEach(() => {
    logger.clearLogs()
    logger.setLevel(LogLevel.DEBUG)
  })

  test("应该记录 INFO 级别的日志", () => {
    logger.clearLogs() // 确保清除之前的日志
    logger.info("测试信息", "test")
    const logs = logger.getLogs()
    expect(logs.length).toBe(1)
    expect(logs[0].level).toBe(LogLevel.INFO)
    expect(logs[0].message).toBe("测试信息")
  })

  test("应该记录 ERROR 级别的日志", () => {
    logger.clearLogs() // 确保清除之前的日志
    const error = new Error("测试错误")
    logger.error("错误信息", "test", error)
    const logs = logger.getLogs(LogLevel.ERROR)
    expect(logs.length).toBe(1)
    expect(logs[0].level).toBe(LogLevel.ERROR)
  })

  test("应该根据级别过滤日志", () => {
    logger.clearLogs() // 确保清除之前的日志
    logger.debug("调试信息", "test")
    logger.info("普通信息", "test")
    logger.warn("警告信息", "test")
    logger.error("错误信息", "test")

    const errorLogs = logger.getLogs(LogLevel.ERROR)
    expect(errorLogs.length).toBe(1)

    const warnLogs = logger.getLogs(LogLevel.WARN)
    expect(warnLogs.length).toBe(2) // WARN 和 ERROR
  })

  test("模块 logger 应该正确设置模块名", () => {
    logger.clearLogs() // 确保清除之前的日志
    const moduleLogger = createModuleLogger("test-module")
    moduleLogger.info("测试信息")
    const logs = logger.getLogs()
    expect(logs.length).toBe(1)
    expect(logs[0].module).toBe("test-module")
  })

  test("应该限制日志数量", () => {
    logger.clearLogs() // 确保清除之前的日志
    logger.setLevel(LogLevel.DEBUG)
    for (let i = 0; i < 1500; i++) {
      logger.debug(`日志 ${i}`)
    }
    const logs = logger.getLogs()
    expect(logs.length).toBeLessThanOrEqual(1000)
  })
})

