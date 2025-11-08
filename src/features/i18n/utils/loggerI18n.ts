/**
 * Logger 国际化支持
 * 为 logger 提供国际化消息
 */

import { translations, type Locale } from "@/features/i18n/locales"

export function getLoggerTranslation(locale: Locale = "zh") {
  return translations[locale].logger
}

