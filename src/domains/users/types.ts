/**
 * 用户相关类型定义
 */

export interface User {
  id: string
  name: string
  email: string
  createdAt: string
  updatedAt?: string
}

export interface CreateUserData {
  name: string
  email: string
}

export interface UpdateUserData {
  name?: string
  email?: string
}

export interface UserListResponse {
  data: User[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface UserResponse {
  data: User
}

