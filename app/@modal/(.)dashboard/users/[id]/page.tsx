/**
 * 拦截路由示例
 * 使用 (.) 前缀拦截路由
 * 当访问 /dashboard/users/[id] 时，会显示这个模态框而不是完整页面
 * 路径: /@modal/(.)dashboard/users/[id]/page.tsx
 * 
 * ⚠️ 注意：静态导出模式下，拦截路由可能无法正常工作
 * 客户端组件不能使用 generateStaticParams
 */

"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface PageProps {
  params: {
    id: string
  }
}

export default function UserModal({ params }: PageProps) {
  const router = useRouter()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">用户详情（模态框）</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-4">
          <p>
            <strong>用户 ID:</strong> {params.id}
          </p>
          <p className="text-muted-foreground">
            这是一个拦截路由示例。当访问 /dashboard/users/[id] 时，
            会显示这个模态框而不是完整页面。
          </p>
          <Button onClick={() => router.back()} className="w-full">
            关闭
          </Button>
        </div>
      </div>
    </div>
  )
}

