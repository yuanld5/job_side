"use client"

/**
 * Dashboard 布局
 * 这个布局会嵌套在根布局内
 */

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/features/i18n/context/I18nContext"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { t } = useI18n()

  return (
    <div className="flex h-full">
      {/* 侧边栏导航 */}
      <aside className="w-64 border-r bg-card p-4">
        <nav className="space-y-2">
          <h2 className="text-lg font-semibold mb-4">{t.dashboard.title}</h2>
          <Link href="/dashboard">
            <Button variant="ghost" className="w-full justify-start">
              {t.dashboard.overview}
            </Button>
          </Link>
          <Link href="/dashboard/settings">
            <Button variant="ghost" className="w-full justify-start">
              {t.dashboard.settings}
            </Button>
          </Link>
        </nav>
      </aside>
      
      {/* 主内容区域 */}
      <main className="flex-1 overflow-auto p-6">
        {children}
      </main>
    </div>
  )
}

