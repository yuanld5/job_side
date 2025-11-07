/**
 * Server Actions
 * Next.js 14+ 服务器操作
 * 注意：在静态导出模式下，Server Actions 不会工作
 * 如需使用，需要移除 next.config.js 中的 output: 'export'
 */

"use server"

import { revalidatePath } from "next/cache"

// 示例：表单提交操作
export async function submitForm(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string

  // 模拟数据验证
  if (!name || !email) {
    return {
      success: false,
      error: "姓名和邮箱都是必填项",
    }
  }

  // 模拟保存数据
  // 在实际应用中，这里会调用数据库或 API
  console.log("保存数据:", { name, email })

  // 重新验证路径
  revalidatePath("/")

  return {
    success: true,
    message: "表单提交成功",
  }
}

// 示例：删除操作
export async function deleteItem(id: string) {
  // 模拟删除操作
  console.log("删除项目:", id)

  // 重新验证路径
  revalidatePath("/dashboard")

  return {
    success: true,
    message: "删除成功",
  }
}

// 示例：更新操作
export async function updateItem(id: string, data: Record<string, any>) {
  // 模拟更新操作
  console.log("更新项目:", id, data)

  // 重新验证特定路径
  revalidatePath(`/dashboard/${id}`)

  return {
    success: true,
    message: "更新成功",
  }
}

