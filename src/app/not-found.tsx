"use client"

/**
 * 404 页面
 * Next.js App Router 自动处理 404
 */

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/features/i18n/context/I18nContext"

export default function NotFound() {
  const { t } = useI18n()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full text-center space-y-4">
        <h1 className="text-4xl font-bold">404</h1>
        <h2 className="text-2xl font-semibold">{t.notFound.title}</h2>
        <p className="text-muted-foreground">
          {t.notFound.message}
        </p>
        <Button asChild>
          <Link href="/">{t.notFound.backToHome}</Link>
        </Button>
      </div>
    </div>
  )
}

