/**
 * 认证服务层
 * 处理登录、登出等认证相关的业务逻辑
 * 
 * 注意：接口实现可以随时替换，只需要修改 fetcher 调用的 URL
 */

import { fetcher } from '@/shared/data/fetcher'
import { createModuleLogger } from '@/shared/logger'
import type { LoginCredentials, LoginResponse, User } from '../types'

const logger = createModuleLogger('authService')

// 配置：可以随时修改接口地址
const AUTH_CONFIG = {
  // 使用模拟接口（开发环境）
  useMockApi: process.env.NEXT_PUBLIC_USE_MOCK_AUTH === 'true',
  
  // 真实 API 地址（可以随时替换）
  apiBaseUrl: process.env.NEXT_PUBLIC_AUTH_API_URL || '/api/auth',
  
  // 模拟 API 地址（用于开发测试）
  mockApiUrl: 'https://jsonplaceholder.typicode.com', // 示例网站
}

/**
 * 认证服务
 */
export const authService = {
  /**
   * 用户登录
   * @param credentials 登录凭据
   */
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    logger.debug('用户登录', { username: credentials.username })

    try {
      if (AUTH_CONFIG.useMockApi) {
        // 使用模拟接口（示例网站）
        return await authService.loginWithMockApi(credentials)
      } else {
        // 使用真实 API
        return await authService.loginWithApi(credentials)
      }
    } catch (error) {
      logger.error('登录失败', error)
      return {
        success: false,
        message: error instanceof Error ? error.message : '登录失败，请稍后重试',
      }
    }
  },

  /**
   * 使用真实 API 登录
   */
  loginWithApi: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await fetcher<LoginResponse>(`${AUTH_CONFIG.apiBaseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
    return response
  },

  /**
   * 使用模拟 API 登录（示例网站）
   * 注意：这只是示例，实际应该替换为真实的认证接口
   */
  loginWithMockApi: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    // 模拟登录逻辑
    // 这里使用 jsonplaceholder 作为示例，实际应该替换为真实的认证接口
    
    // 简单的验证逻辑（实际项目中应该调用真实 API）
    if (credentials.username && credentials.password) {
      // 模拟成功响应
      const mockUser: User = {
        id: '1',
        username: credentials.username,
        email: `${credentials.username}@example.com`,
        name: credentials.username,
      }

      logger.info('模拟登录成功', { username: credentials.username })

      return {
        success: true,
        user: mockUser,
        token: `mock_token_${Date.now()}`,
        message: '登录成功',
      }
    }

    return {
      success: false,
      message: '用户名或密码错误',
    }
  },

  /**
   * 用户登出
   */
  logout: async (): Promise<void> => {
    logger.debug('用户登出')
    
    try {
      if (!AUTH_CONFIG.useMockApi) {
        // 调用登出 API
        await fetcher(`${AUTH_CONFIG.apiBaseUrl}/logout`, {
          method: 'POST',
        })
      }
      // 清除本地存储的 token
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_user')
      }
    } catch (error) {
      logger.error('登出失败', error)
      // 即使 API 调用失败，也清除本地存储
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_user')
      }
    }
  },

  /**
   * 验证 token 是否有效
   */
  verifyToken: async (token: string): Promise<boolean> => {
    try {
      if (AUTH_CONFIG.useMockApi) {
        // 模拟验证
        return true
      }

      const response = await fetcher<{ valid: boolean }>(`${AUTH_CONFIG.apiBaseUrl}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })
      return response.valid
    } catch (error) {
      logger.error('Token 验证失败', error)
      return false
    }
  },

  /**
   * 获取当前用户信息
   */
  getCurrentUser: async (token?: string): Promise<User | null> => {
    try {
      if (AUTH_CONFIG.useMockApi) {
        // 从 localStorage 读取
        const userStr = localStorage.getItem('auth_user')
        return userStr ? JSON.parse(userStr) : null
      }

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }

      const response = await fetcher<{ user: User }>(`${AUTH_CONFIG.apiBaseUrl}/me`, {
        method: 'GET',
        headers,
      })
      return response.user
    } catch (error) {
      logger.error('获取用户信息失败', error)
      return null
    }
  },
}

