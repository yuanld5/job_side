/**
 * 动态路由示例
 * 路径: /[id] (例如: /123, /abc)
 * 使用方括号 [] 创建动态路由段
 */

import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface PageProps {
  params: {
    id: string
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

// 生成元数据（动态）
export async function generateMetadata({ params }: PageProps) {
  return {
    title: `详情 - ${params.id}`,
    description: `查看 ID 为 ${params.id} 的详情`,
  }
}

// 生成静态参数（静态导出模式需要）
export async function generateStaticParams() {
  // 返回空数组，表示不预生成任何页面
  // 如果需要预生成特定页面，可以返回具体的 id 列表
  return []
}

export default function DynamicPage({ params, searchParams }: PageProps) {
  // 示例：验证 ID 格式
  // if (!/^\d+$/.test(params.id)) {
  //   notFound()
  // }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold">动态路由示例</h1>
          <p className="text-muted-foreground mt-2">
            当前 ID: <code className="px-2 py-1 bg-muted rounded">{params.id}</code>
          </p>
        </div>

        <div className="p-6 border rounded-lg space-y-4">
          <h2 className="text-2xl font-semibold">路由参数</h2>
          <div className="space-y-2">
            <p>
              <strong>动态段 (id):</strong> {params.id}
            </p>
            {Object.keys(searchParams).length > 0 && (
              <div>
                <strong>查询参数:</strong>
                <pre className="mt-2 p-2 bg-muted rounded text-sm overflow-auto">
                  {JSON.stringify(searchParams, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <Button asChild>
            <Link href="/">返回首页</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/${parseInt(params.id) + 1}`}>
              下一个 ID
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

