/**
 * 认证相关类型定义
 */

export interface User {
  id: string
  username: string
  email: string
  name?: string
  avatar?: string
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface LoginResponse {
  success: boolean
  message?: string
  user?: User
  token?: string
}

export interface AuthState {
  isAuthenticated: boolean
  user: User | null
  token: string | null
}

