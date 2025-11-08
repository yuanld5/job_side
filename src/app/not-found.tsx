/**
 * 404 页面
 * Next.js App Router 自动处理 404
 */

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full text-center space-y-4">
        <h1 className="text-4xl font-bold">404</h1>
        <h2 className="text-2xl font-semibold">页面未找到</h2>
        <p className="text-muted-foreground">
          抱歉，您访问的页面不存在。
        </p>
        <Button asChild>
          <Link href="/">返回首页</Link>
        </Button>
      </div>
    </div>
  )
}

