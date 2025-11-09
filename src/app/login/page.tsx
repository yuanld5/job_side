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
import { loginSchema, type LoginFormData } from "@/domains/auth/schemas/loginSchema"

const logger = createModuleLogger("login-page")

export default function LoginPage() {
  const router = useRouter()
  const { t } = useI18n()
  const { login } = useAuthStore()
  
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<{
    username?: string
    password?: string
  }>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setFieldErrors({})

    // 使用 Zod 进行验证
    const result = loginSchema.safeParse({
      username,
      password,
    })

    if (!result.success) {
      // 处理验证错误
      const errors: { username?: string; password?: string } = {}
      result.error.errors.forEach((err) => {
        if (err.path[0] === "username") {
          errors.username = err.message
        } else if (err.path[0] === "password") {
          errors.password = err.message
        }
      })
      setFieldErrors(errors)
      return
    }

    setIsLoading(true)

    try {
      logger.info("用户尝试登录", { username })

      const response = await authService.login({
        username: result.data.username,
        password: result.data.password,
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
        setError(response.message || t.auth.loginFailedCheck)
      }
    } catch (error) {
      logger.error("登录异常", error)
      setError(error instanceof Error ? error.message : t.auth.loginFailedRetry)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">{t.common.title}</h1>
          <p className="text-muted-foreground mt-2">{t.auth.pleaseLogin}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              {t.auth.username}
            </label>
            <Input
              id="username"
              type="text"
              placeholder={t.auth.enterUsername}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                // 清除该字段的错误
                if (fieldErrors.username) {
                  setFieldErrors((prev) => ({ ...prev, username: undefined }))
                }
              }}
              disabled={isLoading}
              autoFocus
              className={fieldErrors.username ? "border-destructive" : ""}
            />
            {fieldErrors.username && (
              <p className="text-sm text-destructive">
                {t.auth[fieldErrors.username as keyof typeof t.auth] || fieldErrors.username}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              {t.auth.password}
            </label>
            <Input
              id="password"
              type="password"
              placeholder={t.auth.enterPassword}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                // 清除该字段的错误
                if (fieldErrors.password) {
                  setFieldErrors((prev) => ({ ...prev, password: undefined }))
                }
              }}
              disabled={isLoading}
              className={fieldErrors.password ? "border-destructive" : ""}
            />
            {fieldErrors.password && (
              <p className="text-sm text-destructive">
                {t.auth[fieldErrors.password as keyof typeof t.auth] || fieldErrors.password}
              </p>
            )}
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
            {isLoading ? t.auth.loggingIn : t.auth.login}
          </Button>
        </form>

        <div className="text-center text-sm text-muted-foreground">
          <p>{t.auth.passwordHint}</p>
        </div>
      </div>
    </div>
  )
}

