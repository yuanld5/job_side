/**
 * API Route 示例 - 健康检查
 * 注意：由于配置了 output: 'export'，API Routes 不会在静态导出时工作
 * 如果需要 API Routes，需要移除 output: 'export' 配置
 */

import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  })
}

