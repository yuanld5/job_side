/**
 * 认证状态管理
 * 管理用户登录状态、用户信息等
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, AuthState } from '../types'

interface AuthStore extends AuthState {
  // Actions
  login: (user: User, token: string) => void
  logout: () => void
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,

      login: (user, token) => {
        set({
          isAuthenticated: true,
          user,
          token,
        })
      },

      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          token: null,
        })
      },

      setUser: (user) => {
        set((state) => ({
          user,
          isAuthenticated: !!user && !!state.token,
        }))
      },

      setToken: (token) => {
        set((state) => ({
          token,
          isAuthenticated: !!token && !!state.user,
        }))
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
      }),
    }
  )
)

