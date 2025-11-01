import { zh } from "./zh"
import { en } from "./en"

export type Locale = "zh" | "en"

// 使用联合类型确保两种语言的结构一致
export type Translation = typeof zh & typeof en

export const translations = {
  zh,
  en,
} as const

export const defaultLocale: Locale = "zh"

export const supportedLocales: Locale[] = ["zh", "en"]

