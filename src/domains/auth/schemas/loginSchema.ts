/**
 * 登录表单验证 Schema
 * 使用 Zod 进行数据验证
 */

import { z } from 'zod'

/**
 * 登录表单验证 Schema
 */
export const loginSchema = z.object({
  username: z
    .string()
    .min(1, 'usernameRequired')
    .min(3, 'usernameMinLength')
    .max(50, 'usernameMaxLength'),
  password: z
    .string()
    .min(1, 'passwordRequired')
    .min(6, 'passwordMinLength')
    .max(100, 'passwordMaxLength'),
})

/**
 * 登录表单类型
 */
export type LoginFormData = z.infer<typeof loginSchema>

