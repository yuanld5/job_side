/**
 * 动态路由 + 服务器组件示例
 * 路径: /dashboard/users/[id]
 */

import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface PageProps {
  params: {
    id: string
  }
}

// 生成静态参数（静态导出模式需要）
export async function generateStaticParams() {
  // 返回空数组，表示不预生成任何页面
  return []
}

// 生成元数据（动态）
export async function generateMetadata({ params }: PageProps) {
  // 在实际应用中，这里会从数据库获取用户信息
  return {
    title: `用户详情 - ${params.id}`,
    description: `查看用户 ID 为 ${params.id} 的详细信息`,
  }
}

export default async function UserDetailPage({ params }: PageProps) {
  // 模拟从数据库获取用户信息
  // 在实际应用中，这里会使用 fetch 或数据库查询
  const user = {
    id: params.id,
    name: "示例用户",
    email: "user@example.com",
    createdAt: "2024-01-01",
  }

  if (!user) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground mt-2">用户详情</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/dashboard/users">返回列表</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-6 border rounded-lg">
          <h3 className="font-semibold mb-2">基本信息</h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-muted-foreground">ID:</span> {user.id}
            </div>
            <div>
              <span className="text-muted-foreground">邮箱:</span> {user.email}
            </div>
            <div>
              <span className="text-muted-foreground">创建时间:</span>{" "}
              {user.createdAt}
            </div>
          </div>
        </div>

        <div className="p-6 border rounded-lg">
          <h3 className="font-semibold mb-2">操作</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/users/${user.id}/edit`}>编辑</Link>
            </Button>
            <Button variant="destructive" size="sm">
              删除
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

