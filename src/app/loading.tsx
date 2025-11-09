"use client"

/**
 * 全局加载状态组件
 * Next.js App Router 自动处理加载状态
 */

import { useI18n } from "@/features/i18n/context/I18nContext"

export default function Loading() {
  const { t } = useI18n()

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">{t.loading.message}</p>
      </div>
    </div>
  )
}

