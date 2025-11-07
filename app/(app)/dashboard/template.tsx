/**
 * 模板组件示例
 * template.tsx 与 layout.tsx 的区别：
 * - template 在导航时重新挂载（重新创建状态）
 * - layout 在导航时保持状态（不重新挂载）
 * 
 * 适用于需要重置状态或动画的场景
 */

"use client"

import { useEffect, useState } from "react"

export default function DashboardTemplate({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // 可以在这里添加进入动画等逻辑
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-muted-foreground">加载中...</div>
      </div>
    )
  }

  return (
    <div className="template-wrapper">
      {children}
    </div>
  )
}

