/**
 * 用户服务层
 * 处理用户相关的业务逻辑和数据操作
 */

import { fetcher } from '@/shared/data/fetcher'
import { createModuleLogger } from '@/shared/logger'
import type {
  User,
  CreateUserData,
  UpdateUserData,
  UserListResponse,
  UserResponse,
} from '../types'

const logger = createModuleLogger('userService')

/**
 * 用户服务
 */
export const userService = {
  /**
   * 获取用户列表
   * @param options 查询选项
   */
  getUsers: async (options?: {
    search?: string
    page?: number
    limit?: number
  }): Promise<UserListResponse> => {
    const params = new URLSearchParams()
    if (options?.search) params.append('search', options.search)
    if (options?.page) params.append('page', options.page.toString())
    if (options?.limit) params.append('limit', options.limit.toString())

    const queryString = params.toString()
    const url = `/api/users${queryString ? `?${queryString}` : ''}`

    logger.debug('获取用户列表', { options })
    return fetcher<UserListResponse>(url)
  },

  /**
   * 获取用户详情
   * @param id 用户 ID
   */
  getUser: async (id: string): Promise<UserResponse> => {
    logger.debug('获取用户详情', { userId: id })
    return fetcher<UserResponse>(`/api/users/${id}`)
  },

  /**
   * 创建用户
   * @param data 用户数据
   */
  createUser: async (data: CreateUserData): Promise<UserResponse> => {
    logger.debug('创建用户', { email: data.email })
    return fetcher<UserResponse>('/api/users', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  /**
   * 更新用户
   * @param id 用户 ID
   * @param data 更新数据
   */
  updateUser: async (
    id: string,
    data: UpdateUserData
  ): Promise<UserResponse> => {
    logger.debug('更新用户', { userId: id, data })
    return fetcher<UserResponse>(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  /**
   * 删除用户
   * @param id 用户 ID
   */
  deleteUser: async (id: string): Promise<void> => {
    logger.debug('删除用户', { userId: id })
    await fetcher(`/api/users/${id}`, {
      method: 'DELETE',
    })
  },
}

