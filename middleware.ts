/**
 * Next.js Middleware
 * 在请求处理前执行
 * 注意：由于配置了 output: 'export'，Middleware 不会在静态导出时工作
 * 如果需要 Middleware，需要移除 output: 'export' 配置
 */

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // 示例：添加自定义响应头
  const response = NextResponse.next()
  
  // 添加安全头
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  
  // 可以根据需要进行路由重定向、认证检查等
  
  return response
}

// 配置 Middleware 匹配路径
export const config = {
  matcher: [
    /*
     * 匹配所有路径，除了：
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}

