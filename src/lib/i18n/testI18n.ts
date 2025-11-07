/**
 * 测试相关国际化支持
 */

import { translations, type Locale } from "@/locales"

export function getTestTranslation(locale: Locale = "zh") {
  return translations[locale].tests
}

