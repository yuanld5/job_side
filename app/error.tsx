"use client"

/**
 * 全局错误边界组件
 * Next.js App Router 错误处理
 */

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // 可以在这里记录错误到日志服务
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full text-center space-y-4">
        <h2 className="text-2xl font-bold">出错了</h2>
        <p className="text-muted-foreground">
          {error.message || "发生了未知错误"}
        </p>
        {error.digest && (
          <p className="text-xs text-muted-foreground">
            错误 ID: {error.digest}
          </p>
        )}
        <div className="flex gap-2 justify-center">
          <Button onClick={reset}>重试</Button>
          <Button variant="outline" onClick={() => window.location.href = "/"}>
            返回首页
          </Button>
        </div>
      </div>
    </div>
  )
}

