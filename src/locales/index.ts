import { zh } from "./zh"
import { en } from "./en"

export type Locale = "zh" | "en"

// 使用 zh 的类型作为基础类型（两种语言的接口结构应该一致）
export type Translation = typeof zh

export const translations = {
  zh,
  en,
} as const

export const defaultLocale: Locale = "zh"

export const supportedLocales: Locale[] = ["zh", "en"]

