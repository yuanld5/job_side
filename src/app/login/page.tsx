"use client"

/**
 * 登录页面
 */

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authService, useAuthStore } from "@/domains/auth"
import { useI18n } from "@/features/i18n/context/I18nContext"
import { createModuleLogger } from "@/shared/logger"

const logger = createModuleLogger("login-page")

export default function LoginPage() {
  const router = useRouter()
  const { t } = useI18n()
  const { login } = useAuthStore()
  
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      logger.info("用户尝试登录", { username })

      const response = await authService.login({
        username,
        password,
      })

      if (response.success && response.user && response.token) {
        // 保存登录状态
        login(response.user, response.token)
        
        // 保存到 localStorage（备用）
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_token', response.token)
          localStorage.setItem('auth_user', JSON.stringify(response.user))
        }

        logger.info("登录成功", { username: response.user.username })
        
        // 跳转到首页（聊天界面）
        router.push("/")
      } else {
        setError(response.message || "登录失败，请检查用户名和密码")
      }
    } catch (error) {
      logger.error("登录异常", error)
      setError(error instanceof Error ? error.message : "登录失败，请稍后重试")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">{t.common.title}</h1>
          <p className="text-muted-foreground mt-2">请登录以继续</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              用户名
            </label>
            <Input
              id="username"
              type="text"
              placeholder="请输入用户名"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              密码
            </label>
            <Input
              id="password"
              type="password"
              placeholder="请输入密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              minLength={6}
            />
          </div>

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "登录中..." : "登录"}
          </Button>
        </form>

        <div className="text-center text-sm text-muted-foreground">
          <p>提示：密码长度至少 6 位</p>
        </div>
      </div>
    </div>
  )
}

