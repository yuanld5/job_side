/**
 * 动态 API Route - 单个用户操作
 * 路径: /api/users/[id]
 * 
 * ⚠️ 注意：静态导出模式下，API Routes 不会工作
 * 此文件仅作为示例，实际使用时需要移除 output: 'export' 配置
 */

import { NextRequest, NextResponse } from "next/server"

// 静态导出需要 generateStaticParams
export async function generateStaticParams() {
  // 返回空数组，因为 API Routes 在静态导出时不工作
  return []
}

// 模拟数据存储
let users: Array<{ id: string; name: string; email: string }> = [
  { id: "1", name: "张三", email: "zhangsan@example.com" },
  { id: "2", name: "李四", email: "lisi@example.com" },
]

// GET - 获取单个用户
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = users.find((u) => u.id === params.id)

    if (!user) {
      return NextResponse.json(
        { error: "用户不存在" },
        { status: 404 }
      )
    }

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json(
      { error: "获取用户失败" },
      { status: 500 }
    )
  }
}

// PUT - 更新单个用户
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { name, email } = body

    const userIndex = users.findIndex((u) => u.id === params.id)
    if (userIndex === -1) {
      return NextResponse.json(
        { error: "用户不存在" },
        { status: 404 }
      )
    }

    users[userIndex] = {
      ...users[userIndex],
      ...(name && { name }),
      ...(email && { email }),
    }

    return NextResponse.json(users[userIndex])
  } catch (error) {
    return NextResponse.json(
      { error: "更新用户失败" },
      { status: 500 }
    )
  }
}

// DELETE - 删除单个用户
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userIndex = users.findIndex((u) => u.id === params.id)
    if (userIndex === -1) {
      return NextResponse.json(
        { error: "用户不存在" },
        { status: 404 }
      )
    }

    users.splice(userIndex, 1)

    return NextResponse.json({ message: "用户已删除" })
  } catch (error) {
    return NextResponse.json(
      { error: "删除用户失败" },
      { status: 500 }
    )
  }
}

