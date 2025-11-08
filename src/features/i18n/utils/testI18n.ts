/**
 * 测试相关国际化支持
 */

import { translations, type Locale } from "@/features/i18n/locales"

export function getTestTranslation(locale: Locale = "zh") {
  return translations[locale].tests
}

