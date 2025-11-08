import { translations, type Locale, type Translation } from "@/features/i18n/locales"

/**
 * 获取翻译文本的工具函数
 * 支持占位符替换
 */
export function getTranslation(locale: Locale): Translation {
  return translations[locale] as Translation
}

/**
 * 替换文本中的占位符
 * 例如: replacePlaceholders("Hello {name}", { name: "World" }) -> "Hello World"
 */
export function replacePlaceholders(
  text: string,
  params: Record<string, string | number>
): string {
  let result = text
  for (const [key, value] of Object.entries(params)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, "g"), String(value))
  }
  return result
}

