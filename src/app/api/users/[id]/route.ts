/**
 * 用户详情 API Routes
 * 支持 GET（获取）、PUT（更新）、DELETE（删除）
 */

import { NextRequest, NextResponse } from 'next/server'
import { createModuleLogger } from '@/shared/logger'

const logger = createModuleLogger('api-user-detail')

// 模拟数据存储（实际项目中应该使用数据库）
// 注意：这里应该从共享的数据源获取，为了示例简化，使用全局变量
// 实际项目中应该使用数据库或状态管理
let users = [
  { id: '1', name: '张三', email: 'zhangsan@example.com', createdAt: new Date().toISOString() },
  { id: '2', name: '李四', email: 'lisi@example.com', createdAt: new Date().toISOString() },
]

/**
 * GET /api/users/[id]
 * 获取用户详情
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    logger.info('获取用户详情', { userId: id })

    const user = users.find((u) => u.id === id)

    if (!user) {
      return NextResponse.json(
        { error: '用户不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: user })
  } catch (error) {
    logger.error('获取用户详情失败', error)
    return NextResponse.json(
      { error: '获取用户详情失败' },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/users/[id]
 * 更新用户信息
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    const { name, email } = body

    logger.info('更新用户', { userId: id, data: body })

    const userIndex = users.findIndex((u) => u.id === id)

    if (userIndex === -1) {
      return NextResponse.json(
        { error: '用户不存在' },
        { status: 404 }
      )
    }

    // 验证邮箱格式
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: '邮箱格式不正确' },
          { status: 400 }
        )
      }

      // 检查邮箱是否被其他用户使用
      if (users.some((u) => u.id !== id && u.email === email)) {
        return NextResponse.json(
          { error: '邮箱已被其他用户使用' },
          { status: 409 }
        )
      }
    }

    // 更新用户信息
    const updatedUser = {
      ...users[userIndex],
      ...(name && { name }),
      ...(email && { email }),
      updatedAt: new Date().toISOString(),
    }

    users[userIndex] = updatedUser

    logger.info('更新用户成功', { userId: id })

    return NextResponse.json({ data: updatedUser })
  } catch (error) {
    logger.error('更新用户失败', error)
    return NextResponse.json(
      { error: '更新用户失败' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/users/[id]
 * 删除用户
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    logger.info('删除用户', { userId: id })

    const userIndex = users.findIndex((u) => u.id === id)

    if (userIndex === -1) {
      return NextResponse.json(
        { error: '用户不存在' },
        { status: 404 }
      )
    }

    users.splice(userIndex, 1)

    logger.info('删除用户成功', { userId: id })

    return NextResponse.json(
      { message: '用户删除成功' },
      { status: 200 }
    )
  } catch (error) {
    logger.error('删除用户失败', error)
    return NextResponse.json(
      { error: '删除用户失败' },
      { status: 500 }
    )
  }
}

