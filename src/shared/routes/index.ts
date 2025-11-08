/**
 * 路由配置和导航工具
 * 集中管理应用路由
 */

// 页面路由（前端导航）
export const routes = {
  home: "/",
  login: "/login",
  about: "/about",
  dashboard: "/dashboard",
  dashboardSettings: "/dashboard/settings",
  // 添加新路由示例：
  // history: "/history",
  // settings: "/settings",
  // profile: "/profile",
} as const

// 动态路由辅助函数（前端导航）
export const dynamicRoutes = {
  dynamic: (id: string) => `/${id}`,
  userDetail: (id: string) => `/dashboard/users/${id}`,
  // 添加新动态路由示例：
  // postDetail: (id: string) => `/posts/${id}`,
  // categoryPosts: (category: string) => `/category/${category}`,
} as const

// API 路由配置
export const apiRoutes = {
  auth: {
    login: "/api/auth/login",
    logout: "/api/auth/logout",
    verify: "/api/auth/verify",
    me: "/api/auth/me",
  },
  users: "/api/users",
  userDetail: (id: string) => `/api/users/${id}`,
  // 添加新 API 路由示例：
  // posts: "/api/posts",
  // postDetail: (id: string) => `/api/posts/${id}`,
} as const

export type Route = (typeof routes)[keyof typeof routes]
export type ApiRoute = typeof apiRoutes[keyof typeof apiRoutes] | string

/**
 * 路由工具函数
 */
export const routeUtils = {
  isActive: (pathname: string, route: Route): boolean => {
    return pathname === route
  },
  
  // 未来可以添加更多路由工具函数
}

