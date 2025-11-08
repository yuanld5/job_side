/**
 * 用户管理 API Routes
 * 支持 GET（列表）、POST（创建）
 */

import { NextRequest, NextResponse } from 'next/server'
import { createModuleLogger } from '@/shared/logger'

const logger = createModuleLogger('api-users')

// 模拟数据存储（实际项目中应该使用数据库）
let users = [
  { id: '1', name: '张三', email: 'zhangsan@example.com', createdAt: new Date().toISOString() },
  { id: '2', name: '李四', email: 'lisi@example.com', createdAt: new Date().toISOString() },
]

/**
 * GET /api/users
 * 获取用户列表，支持搜索和分页
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get('search') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    logger.info('获取用户列表', { search, page, limit })

    // 搜索过滤
    let filteredUsers = users
    if (search) {
      filteredUsers = users.filter(
        (user) =>
          user.name.includes(search) || user.email.includes(search)
      )
    }

    // 分页
    const start = (page - 1) * limit
    const end = start + limit
    const paginatedUsers = filteredUsers.slice(start, end)

    return NextResponse.json({
      data: paginatedUsers,
      pagination: {
        page,
        limit,
        total: filteredUsers.length,
        totalPages: Math.ceil(filteredUsers.length / limit),
      },
    })
  } catch (error) {
    logger.error('获取用户列表失败', error)
    return NextResponse.json(
      { error: '获取用户列表失败' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/users
 * 创建新用户
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email } = body

    // 验证必填字段
    if (!name || !email) {
      return NextResponse.json(
        { error: '姓名和邮箱是必填项' },
        { status: 400 }
      )
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '邮箱格式不正确' },
        { status: 400 }
      )
    }

    // 检查邮箱是否已存在
    if (users.some((user) => user.email === email)) {
      return NextResponse.json(
        { error: '邮箱已存在' },
        { status: 409 }
      )
    }

    // 创建新用户
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)

    logger.info('创建用户成功', { userId: newUser.id, email })

    return NextResponse.json(
      { data: newUser },
      { status: 201 }
    )
  } catch (error) {
    logger.error('创建用户失败', error)
    return NextResponse.json(
      { error: '创建用户失败' },
      { status: 500 }
    )
  }
}

