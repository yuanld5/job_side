/**
 * Next.js Router Hook 封装
 * 提供类型安全的路由导航
 */

import { useRouter as useNextRouter, usePathname } from "next/navigation"
import { routes, dynamicRoutes, type Route } from "@/shared/routes"

export function useRouter() {
  const router = useNextRouter()
  const pathname = usePathname()

  return {
    ...router,
    pathname,
    routes,
    dynamicRoutes,
    navigate: (route: Route | string) => {
      router.push(route)
    },
    isActive: (route: Route | string) => {
      return pathname === route
    },
  }
}

