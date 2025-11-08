/**
 * 路由配置和导航工具
 * 集中管理应用路由
 */

export const routes = {
  home: "/",
  about: "/about",
  dashboard: "/dashboard",
  dashboardSettings: "/dashboard/settings",
  // 未来可以添加更多路由
  // history: "/history",
} as const

// 动态路由辅助函数
export const dynamicRoutes = {
  dynamic: (id: string) => `/${id}`,
  userDetail: (id: string) => `/dashboard/users/${id}`,
} as const

export type Route = (typeof routes)[keyof typeof routes]

/**
 * 路由工具函数
 */
export const routeUtils = {
  isActive: (pathname: string, route: Route): boolean => {
    return pathname === route
  },
  
  // 未来可以添加更多路由工具函数
}

