"use client"

/**
 * 状态管理 Provider
 * 在需要时初始化全局状态
 */

import { ReactNode } from "react"

export function StoreProvider({ children }: { children: ReactNode }) {
  // Zustand 不需要 Provider，但可以在这里初始化其他需要 Provider 的状态管理
  
  return <>{children}</>
}

