"use client"

import { ChatContainer } from "@/features/chat/components/ChatContainer"
import { LanguageSwitcher } from "@/features/i18n/components/LanguageSwitcher"
import { useI18n } from "@/features/i18n/context/I18nContext"
import { AuthGuard } from "@/shared/components/AuthGuard"
import { useAuthStore } from "@/domains/auth"
import { Button } from "@/components/ui/button"
import { authService } from "@/domains/auth"
import { useRouter } from "next/navigation"

function ChatPage() {
  const { t } = useI18n()
  const { user, logout } = useAuthStore()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await authService.logout()
      logout()
      router.push("/login")
    } catch (error) {
      console.error("登出失败", error)
      // 即使 API 调用失败，也清除本地状态
      logout()
      router.push("/login")
    }
  }

  return (
    <main className="h-screen w-full flex flex-col bg-background">
      <header className="border-b px-4 py-3 bg-card flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-lg font-semibold">{t.common.title}</h1>
            <p className="text-xs text-muted-foreground mt-1">
              {t.common.description}
            </p>
          </div>
          {user && (
            <div className="text-sm text-muted-foreground">
              欢迎，{user.name || user.username}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
          >
            登出
          </Button>
        </div>
      </header>
      <div className="flex-1 overflow-hidden">
        <ChatContainer />
      </div>
    </main>
  )
}

export default function Home() {
  return (
    <AuthGuard>
      <ChatPage />
    </AuthGuard>
  )
}

