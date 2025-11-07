"use client"

import { Button } from "@/components/ui/button"
import { useI18n } from "@/contexts/I18nContext"
import { Locale, supportedLocales } from "@/locales"

const localeLabelKeys: Record<Locale, "chinese" | "english"> = {
  zh: "chinese",
  en: "english",
}

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n()

  return (
    <div className="flex gap-1">
      {supportedLocales.map((loc) => (
        <Button
          key={loc}
          variant={locale === loc ? "default" : "ghost"}
          size="sm"
          onClick={() => setLocale(loc)}
          className="h-8 px-2 text-xs"
        >
          {t.labels[localeLabelKeys[loc]]}
        </Button>
      ))}
    </div>
  )
}
