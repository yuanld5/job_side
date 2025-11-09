/**
 * 登出 API Route
 */

import { NextRequest, NextResponse } from 'next/server'
import { createModuleLogger } from '@/shared/logger'
import { authServerService } from '@/domains/auth/services/authServerService'
import { getServerTranslation } from '@/features/i18n/utils/serverI18n'

const logger = createModuleLogger('api-auth-logout')

/**
 * POST /api/auth/logout
 * 用户登出
 */
export async function POST(request: NextRequest) {
  const t = getServerTranslation(request)
  
  try {
    // 从请求头获取 token（可选）
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    logger.info('用户登出请求', { hasToken: !!token })

    // 调用服务器端认证服务处理登出
    await authServerService.handleLogout(token)

    return NextResponse.json({
      success: true,
      message: t.auth.logoutSuccess,
    })
  } catch (error) {
    logger.error('登出处理失败', error)
    return NextResponse.json(
      { success: false, message: t.auth.logoutFailed },
      { status: 500 }
    )
  }
}

