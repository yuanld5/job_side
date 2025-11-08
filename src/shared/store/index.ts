/**
 * 全局状态管理入口
 * 使用 Zustand 进行轻量级状态管理
 * 
 * 注意：chatStore 属于 features/chat，应从 @/features/chat/store/chatStore 直接导入
 */

export { useAppStore } from "./appStore"
export type { Theme } from "./appStore"

