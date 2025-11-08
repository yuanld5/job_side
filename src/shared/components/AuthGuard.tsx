"use client"

/**
 * 认证守卫组件
 * 保护需要登录才能访问的页面
 */

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/domains/auth"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">正在跳转到登录页面...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

