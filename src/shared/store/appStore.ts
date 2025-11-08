/**
 * 应用全局状态管理
 * 管理应用的全局设置和状态
 */

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Locale } from "@/features/i18n/locales"

interface AppState {
  // 主题设置
  theme: "light" | "dark" | "system"
  
  // 应用设置
  settings: {
    autoSave: boolean
    notifications: boolean
    soundEnabled: boolean
  }
  
  // 历史记录
  recentCommands: string[]
  
  // Actions
  setTheme: (theme: "light" | "dark" | "system") => void
  updateSettings: (settings: Partial<AppState["settings"]>) => void
  addRecentCommand: (command: string) => void
  clearRecentCommands: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: "system",
      settings: {
        autoSave: true,
        notifications: true,
        soundEnabled: false,
      },
      recentCommands: [],
      
      setTheme: (theme) => set({ theme }),
      
      updateSettings: (settings) =>
        set((state) => ({
          settings: { ...state.settings, ...settings },
        })),
      
      addRecentCommand: (command) =>
        set((state) => ({
          recentCommands: [
            command,
            ...state.recentCommands.filter((c) => c !== command),
          ].slice(0, 50), // 最多保存 50 条
        })),
      
      clearRecentCommands: () => set({ recentCommands: [] }),
    }),
    {
      name: "app-storage",
      partialize: (state) => ({
        theme: state.theme,
        settings: state.settings,
        recentCommands: state.recentCommands,
      }),
    }
  )
)


