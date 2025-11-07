/**
 * Next.js Middleware
 * 
 * ⚠️ 重要提示：由于 next.config.js 中配置了 output: 'export'（静态导出），
 * Middleware 在构建后的静态文件中不会执行。
 * 
 * 静态导出模式适用于：
 * - Chrome Extension 等静态部署场景
 * - 不需要服务端功能的场景
 * 
 * 如果需要使用 Middleware，需要：
 * 1. 移除 next.config.js 中的 output: 'export' 配置
 * 2. 使用 Next.js 服务器模式部署
 * 
 * 当前项目为 Chrome Extension，使用静态导出模式，此文件仅供参考。
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
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
  
  // 示例：基于路径的重定向
  const { pathname } = request.nextUrl
  
  // 示例：认证检查（伪代码）
  // const token = request.cookies.get('token')
  // if (!token && pathname.startsWith('/dashboard')) {
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }
  
  // 示例：国际化重定向
  // if (pathname === '/') {
  //   const locale = request.headers.get('accept-language')?.split(',')[0] || 'zh'
  //   return NextResponse.redirect(new URL(`/${locale}`, request.url))
  // }
  
  // 示例：添加自定义头
  response.headers.set("X-Custom-Header", "Next.js-Middleware")
  
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

