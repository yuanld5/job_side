"use client"

import { ChatContainer } from "@/features/chat/components/ChatContainer"
import { LanguageSwitcher } from "@/features/i18n/components/LanguageSwitcher"
import { useI18n } from "@/features/i18n/context/I18nContext"

export default function Home() {
  const { t } = useI18n()

  return (
    <main className="h-screen w-full flex flex-col bg-background">
      <header className="border-b px-4 py-3 bg-card flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">{t.common.title}</h1>
          <p className="text-xs text-muted-foreground mt-1">
            {t.common.description}
          </p>
        </div>
        <LanguageSwitcher />
      </header>
      <div className="flex-1 overflow-hidden">
        <ChatContainer />
      </div>
    </main>
  )
}

