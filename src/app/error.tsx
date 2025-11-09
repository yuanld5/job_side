"use client"

/**
 * 全局错误边界组件
 * Next.js App Router 错误处理
 */

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/features/i18n/context/I18nContext"
import { replacePlaceholders } from "@/features/i18n/utils/getTranslation"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  const { t } = useI18n()

  useEffect(() => {
    // 可以在这里记录错误到日志服务
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full text-center space-y-4">
        <h2 className="text-2xl font-bold">{t.error.title}</h2>
        <p className="text-muted-foreground">
          {error.message || t.error.unknownError}
        </p>
        {error.digest && (
          <p className="text-xs text-muted-foreground">
            {replacePlaceholders(t.error.errorId, { id: error.digest })}
          </p>
        )}
        <div className="flex gap-2 justify-center">
          <Button onClick={reset}>{t.error.retry}</Button>
          <Button variant="outline" onClick={() => window.location.href = "/"}>
            {t.error.backToHome}
          </Button>
        </div>
      </div>
    </div>
  )
}

