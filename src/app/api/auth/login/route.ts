/**
 * 登录 API Route
 * 处理用户登录请求
 */

import { NextRequest, NextResponse } from 'next/server'
import { createModuleLogger } from '@/shared/logger'
import { authServerService } from '@/domains/auth/services/authServerService'

const logger = createModuleLogger('api-auth-login')

/**
 * POST /api/auth/login
 * 用户登录
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    logger.info('用户登录请求', { username })

    // 调用服务器端认证服务
    const result = await authServerService.validateLogin({
      username,
      password,
    })

    // 根据结果返回相应的 HTTP 状态码
    const status = result.success ? 200 : 401

    return NextResponse.json(result, { status })
  } catch (error) {
    logger.error('登录处理失败', error)
    return NextResponse.json(
      { success: false, message: '登录失败，请稍后重试' },
      { status: 500 }
    )
  }
}

