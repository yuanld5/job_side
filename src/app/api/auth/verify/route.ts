/**
 * Token 验证 API Route
 */

import { NextRequest, NextResponse } from 'next/server'
import { createModuleLogger } from '@/shared/logger'
import { authServerService } from '@/domains/auth/services/authServerService'
import { getServerTranslation } from '@/features/i18n/utils/serverI18n'

const logger = createModuleLogger('api-auth-verify')

/**
 * POST /api/auth/verify
 * 验证 token 是否有效
 */
export async function POST(request: NextRequest) {
  const t = getServerTranslation(request)
  
  try {
    const body = await request.json()
    const { token } = body

    if (!token) {
      return NextResponse.json(
        { valid: false, message: t.auth.tokenEmpty },
        { status: 400 }
      )
    }

    logger.debug('验证 token', { token: token.substring(0, 10) + '...' })

    // 调用服务器端认证服务验证 token
    const isValid = await authServerService.validateToken(token)

    return NextResponse.json({
      valid: isValid,
    })
  } catch (error) {
    logger.error('Token 验证失败', error)
    return NextResponse.json(
      { valid: false, message: t.auth.tokenVerifyFailed },
      { status: 500 }
    )
  }
}

