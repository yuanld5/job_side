/**
 * 获取当前用户信息 API Route
 */

import { NextRequest, NextResponse } from 'next/server'
import { createModuleLogger } from '@/shared/logger'
import { authServerService } from '@/domains/auth/services/authServerService'

const logger = createModuleLogger('api-auth-me')

// 标记为动态路由（使用 request.headers）
export const dynamic = 'force-dynamic'

/**
 * GET /api/auth/me
 * 获取当前用户信息
 */
export async function GET(request: NextRequest) {
  try {
    // 从请求头获取 token
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json(
        { error: '未提供认证 token' },
        { status: 401 }
      )
    }

    logger.debug('获取用户信息', { token: token.substring(0, 10) + '...' })

    // 调用服务器端认证服务获取用户信息
    const user = await authServerService.getUserByToken(token)

    if (!user) {
      return NextResponse.json(
        { error: '用户不存在或 token 无效' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      user,
    })
  } catch (error) {
    logger.error('获取用户信息失败', error)
    return NextResponse.json(
      { error: '获取用户信息失败' },
      { status: 500 }
    )
  }
}

