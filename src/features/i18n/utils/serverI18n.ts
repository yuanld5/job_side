/**
 * 服务端国际化工具
 * 用于 API Routes 和 Server Actions 中获取翻译
 */

import { translations, type Locale } from '../locales'
import type { Translation } from '../locales'

/**
 * 从请求头获取语言偏好
 */
export function getLocaleFromHeaders(headers: Headers): Locale {
  const acceptLanguage = headers.get('accept-language') || ''
  
  // 检查是否包含中文
  if (acceptLanguage.includes('zh')) {
    return 'zh'
  }
  
  // 默认返回英文
  return 'en'
}

/**
 * 从 NextRequest 获取翻译对象
 */
export function getServerTranslation(request: Request): Translation {
  const headers = new Headers(request.headers)
  const locale = getLocaleFromHeaders(headers)
  return translations[locale] as Translation
}

/**
 * 获取指定语言的翻译对象
 */
export function getServerTranslationByLocale(locale: Locale = 'zh'): Translation {
  return translations[locale] as Translation
}

