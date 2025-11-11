/**
 * 日志系统
 * 支持不同级别的日志输出
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

interface LogEntry {
  level: LogLevel
  message: string
  timestamp: Date
  module?: string
  data?: any
}

class Logger {
  private level: LogLevel
  private logs: LogEntry[] = []
  private maxLogs: number = 1000

  constructor(level: LogLevel = LogLevel.INFO) {
    this.level = level
    // 支持浏览器环境：使用 NEXT_PUBLIC_ 前缀的环境变量
    // 服务器端：使用 LOG_LEVEL
    // 客户端：使用 NEXT_PUBLIC_LOG_LEVEL
    const logLevel = 
      (typeof window !== 'undefined' 
        ? process.env.NEXT_PUBLIC_LOG_LEVEL 
        : process.env.LOG_LEVEL) || 
      process.env.NEXT_PUBLIC_LOG_LEVEL
    
    if (logLevel) {
      this.level = LogLevel[logLevel as keyof typeof LogLevel] || level
    }
  }

  private formatMessage(entry: LogEntry): string {
    const time = entry.timestamp.toISOString()
    const level = LogLevel[entry.level]
    const moduleName = entry.module ? `[${entry.module}]` : ""
    const data = entry.data ? ` ${JSON.stringify(entry.data)}` : ""
    return `[${time}] ${level} ${moduleName} ${entry.message}${data}`
  }

  private log(level: LogLevel, message: string, module?: string, data?: any) {
    if (level < this.level) return

    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date(),
      module,
      data,
    }

    // 保存日志
    this.logs.push(entry)
    if (this.logs.length > this.maxLogs) {
      this.logs.shift()
    }

    // 输出到控制台
    const formatted = this.formatMessage(entry)
    switch (level) {
      case LogLevel.DEBUG:
        console.debug(formatted)
        break
      case LogLevel.INFO:
        console.info(formatted)
        break
      case LogLevel.WARN:
        console.warn(formatted)
        break
      case LogLevel.ERROR:
        console.error(formatted)
        if (data instanceof Error) {
          console.error(data.stack)
        }
        break
    }
  }

  debug(message: string, module?: string, data?: any) {
    this.log(LogLevel.DEBUG, message, module, data)
  }

  info(message: string, module?: string, data?: any) {
    this.log(LogLevel.INFO, message, module, data)
  }

  warn(message: string, module?: string, data?: any) {
    this.log(LogLevel.WARN, message, module, data)
  }

  error(message: string, module?: string, data?: any) {
    this.log(LogLevel.ERROR, message, module, data)
  }

  getLogs(level?: LogLevel): LogEntry[] {
    if (level !== undefined) {
      return this.logs.filter((log) => log.level >= level)
    }
    return [...this.logs]
  }

  clearLogs() {
    this.logs = []
  }

  setLevel(level: LogLevel) {
    this.level = level
  }
}

// 获取默认日志级别（支持浏览器和服务器环境）
function getDefaultLogLevel(): LogLevel {
  // 开发环境默认 DEBUG，生产环境默认 INFO
  const isDev = 
    (typeof window !== 'undefined' 
      ? process.env.NODE_ENV === "development"
      : process.env.NODE_ENV !== "production")
  
  return isDev ? LogLevel.DEBUG : LogLevel.INFO
}

// 创建单例
export const logger = new Logger(getDefaultLogLevel())

// 创建模块特定的 logger
export function createModuleLogger(module: string) {
  return {
    debug: (message: string, data?: any) => logger.debug(message, module, data),
    info: (message: string, data?: any) => logger.info(message, module, data),
    warn: (message: string, data?: any) => logger.warn(message, module, data),
    error: (message: string, data?: any) => logger.error(message, module, data),
  }
}

