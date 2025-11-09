"use client"

/**
 * Dashboard 首页
 * 路径: /dashboard
 */

import { useI18n } from "@/features/i18n/context/I18nContext"

export default function DashboardPage() {
  const { t } = useI18n()

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t.dashboard.title}</h1>
      <p className="text-muted-foreground">
        {t.dashboard.description}
      </p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">{t.dashboard.statCard1}</h3>
          <p className="text-sm text-muted-foreground">{t.dashboard.exampleContent}</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">{t.dashboard.statCard2}</h3>
          <p className="text-sm text-muted-foreground">{t.dashboard.exampleContent}</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">{t.dashboard.statCard3}</h3>
          <p className="text-sm text-muted-foreground">{t.dashboard.exampleContent}</p>
        </div>
      </div>
    </div>
  )
}

