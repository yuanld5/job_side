"use client"

/**
 * 根级全局错误边界
 * 这是 Next.js App Router 的根级错误处理组件
 * 用于捕获整个应用中的未处理错误
 */

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/features/i18n/context/I18nContext"
import { replacePlaceholders } from "@/features/i18n/utils/getTranslation"

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const { t } = useI18n()

  useEffect(() => {
    // 记录错误到日志服务
    console.error("Global application error:", error)
  }, [error])

  return (
    <html lang="zh">
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
          <div className="max-w-md w-full text-center space-y-4">
            <h1 className="text-3xl font-bold text-destructive">{t.error.globalTitle}</h1>
            <h2 className="text-xl font-semibold">{t.error.globalSubtitle}</h2>
            <p className="text-muted-foreground">
              {error.message || t.error.unknownGlobalError}
            </p>
            {error.digest && (
              <p className="text-xs text-muted-foreground font-mono">
                {replacePlaceholders(t.error.errorId, { id: error.digest })}
              </p>
            )}
            <div className="flex gap-2 justify-center pt-4">
              <Button onClick={reset}>{t.error.retry}</Button>
              <Button 
                variant="outline" 
                onClick={() => window.location.href = "/"}
              >
                {t.error.backToHome}
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}

