/**
 * 嵌套布局示例 - Dashboard 布局
 * 这个布局会嵌套在根布局和 (app) 路由组布局内
 */

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-full">
      {/* 侧边栏导航 */}
      <aside className="w-64 border-r bg-card p-4">
        <nav className="space-y-2">
          <h2 className="text-lg font-semibold mb-4">Dashboard</h2>
          <Link href="/dashboard">
            <Button variant="ghost" className="w-full justify-start">
              概览
            </Button>
          </Link>
          <Link href="/dashboard/settings">
            <Button variant="ghost" className="w-full justify-start">
              设置
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

