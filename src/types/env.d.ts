/**
 * 环境变量类型定义
 * 为 process.env 提供类型安全
 */

declare namespace NodeJS {
  interface ProcessEnv {
    // Next.js 公共环境变量
    readonly NEXT_PUBLIC_BASE_URL?: string
    readonly NEXT_PUBLIC_API_URL?: string

    // Qwen API 配置
    readonly QWEN_API_KEY?: string
    readonly DASHSCOPE_API_KEY?: string
    readonly QWEN_MODEL?: string
    readonly QWEN_BASE_URL?: string
    readonly USE_DASHSCOPE?: string

    // 应用配置
    readonly LOCALE?: "zh" | "en"
    readonly LOG_LEVEL?: "DEBUG" | "INFO" | "WARN" | "ERROR"

    // 数据库配置（示例）
    readonly DATABASE_URL?: string
    readonly DATABASE_HOST?: string
    readonly DATABASE_PORT?: string
    readonly DATABASE_NAME?: string
    readonly DATABASE_USER?: string
    readonly DATABASE_PASSWORD?: string

    // 认证配置（示例）
    readonly NEXTAUTH_URL?: string
    readonly NEXTAUTH_SECRET?: string

    // 第三方服务（示例）
    readonly REDIS_URL?: string
    readonly S3_BUCKET?: string
    readonly S3_REGION?: string
    readonly S3_ACCESS_KEY?: string
    readonly S3_SECRET_KEY?: string
  }
}

