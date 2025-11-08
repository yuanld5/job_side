"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/features/i18n/context/I18nContext"
import { LanguageSwitcher } from "@/features/i18n/components/LanguageSwitcher"
import { useAppStore, type Theme } from "@/shared/store/appStore"
import { AuthGuard } from "@/shared/components/AuthGuard"

function SettingsPage() {
  const { t } = useI18n()
  const router = useRouter()
  const { theme, setTheme, settings, updateSettings } = useAppStore()

  const themes: { value: Theme; label: string }[] = [
    { value: "light", label: t.settings.theme.light },
    { value: "dark", label: t.settings.theme.dark },
    { value: "system", label: t.settings.theme.system },
  ]

  return (
    <main className="h-screen w-full flex flex-col bg-background">
      <header className="border-b px-4 py-3 bg-card">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">{t.settings.title}</h1>
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            {t.settings.back}
          </Button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* 主题设置 */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold">{t.settings.theme.title}</h2>
            <div className="flex gap-2">
              {themes.map(({ value, label }) => (
                <Button
                  key={value}
                  variant={theme === value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme(value)}
                  className="flex-1"
                >
                  {label}
                </Button>
              ))}
            </div>
          </section>

          {/* 语言设置 */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold">{t.settings.language.title}</h2>
            <div className="flex justify-start">
              <LanguageSwitcher />
            </div>
          </section>

          {/* 偏好设置 */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold">{t.settings.preferences.title}</h2>
            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-accent">
                <span className="text-sm">{t.settings.preferences.autoSave}</span>
                <input
                  type="checkbox"
                  checked={settings.autoSave}
                  onChange={(e) => updateSettings({ autoSave: e.target.checked })}
                  className="w-4 h-4"
                />
              </label>
              <label className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-accent">
                <span className="text-sm">{t.settings.preferences.notifications}</span>
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) => updateSettings({ notifications: e.target.checked })}
                  className="w-4 h-4"
                />
              </label>
              <label className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-accent">
                <span className="text-sm">{t.settings.preferences.soundEnabled}</span>
                <input
                  type="checkbox"
                  checked={settings.soundEnabled}
                  onChange={(e) => updateSettings({ soundEnabled: e.target.checked })}
                  className="w-4 h-4"
                />
              </label>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default function Settings() {
  return (
    <AuthGuard>
      <SettingsPage />
    </AuthGuard>
  )
}

