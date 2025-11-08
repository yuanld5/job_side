/**
 * Next.js Middleware
 * 
 * 在服务器模式下，Middleware 会在每个请求时执行。
 * 可以用于：
 * - 添加安全响应头
 * - 路由重定向
 * - 认证检查
 * - 国际化处理
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

