/**
 * 数据获取工具
 * 提供统一的数据获取接口，支持缓存、错误处理等
 */

import { logger, createModuleLogger } from "@/lib/logger"

const fetcherLogger = createModuleLogger("fetcher")

export interface FetchOptions extends RequestInit {
  cache?: RequestCache
  next?: { revalidate?: number }
}

export class FetchError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data?: any
  ) {
    super(`Fetch failed: ${status} ${statusText}`)
    this.name = "FetchError"
  }
}

/**
 * 带错误处理和日志的数据获取函数
 */
export async function fetcher<T = any>(
  url: string,
  options?: FetchOptions
): Promise<T> {
  fetcherLogger.debug("Fetching data", { url, method: options?.method || "GET" })

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new FetchError(
        response.status,
        response.statusText,
        errorData
      )
    }

    const data = await response.json()
    fetcherLogger.debug("Fetch successful", { url })
    return data as T
  } catch (error) {
    if (error instanceof FetchError) {
      fetcherLogger.error("Fetch error", error)
      throw error
    }
    
    fetcherLogger.error("Unknown fetch error", error)
    throw new Error(`Failed to fetch: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

/**
 * 服务器端数据获取（Next.js App Router）
 * 支持缓存和重新验证
 */
export async function serverFetcher<T = any>(
  url: string,
  options?: FetchOptions
): Promise<T> {
  return fetcher<T>(url, {
    ...options,
    cache: options?.cache || "default",
    next: options?.next || { revalidate: 60 }, // 默认缓存 60 秒
  })
}

/**
 * 客户端数据获取
 */
export async function clientFetcher<T = any>(
  url: string,
  options?: FetchOptions
): Promise<T> {
  return fetcher<T>(url, {
    ...options,
    cache: "no-store", // 客户端不缓存
  })
}

