"use client"

import { ChatContainer } from "@/features/chat/components/ChatContainer"
import { LanguageSwitcher } from "@/features/i18n/components/LanguageSwitcher"
import { useI18n } from "@/features/i18n/context/I18nContext"
import { replacePlaceholders } from "@/features/i18n/utils/getTranslation"
import { AuthGuard } from "@/shared/components/AuthGuard"
import { useAuthStore } from "@/domains/auth"
import { Button } from "@/components/ui/button"
import { authService } from "@/domains/auth"
import { useRouter } from "next/navigation"
import { createModuleLogger } from "@/shared/logger"

const logger = createModuleLogger("chat-page")

function ChatPage() {
  const { t } = useI18n()
  const { user, logout } = useAuthStore()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      logger.info("用户尝试登出")
      await authService.logout()
      logout()
      logger.info("登出成功")
      router.push("/login")
    } catch (error) {
      logger.error("登出失败", error)
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
              {replacePlaceholders(t.auth.welcome, { name: user.name || user.username })}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/settings")}
            className="h-8 w-8 p-0"
            title={t.auth.settings}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </Button>
          <LanguageSwitcher />
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
          >
            {t.auth.logout}
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

