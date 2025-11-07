"use client"

import { I18nProvider } from "@/contexts/I18nContext"

export function I18nProviderWrapper({ children }: { children: React.ReactNode }) {
  return <I18nProvider>{children}</I18nProvider>
}

