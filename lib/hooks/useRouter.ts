/**
 * Next.js Router Hook 封装
 * 提供类型安全的路由导航
 */

import { useRouter as useNextRouter, usePathname } from "next/navigation"
import { routes, type Route } from "@/lib/routes"

export function useRouter() {
  const router = useNextRouter()
  const pathname = usePathname()

  return {
    ...router,
    pathname,
    routes,
    navigate: (route: Route) => {
      router.push(route)
    },
    isActive: (route: Route) => {
      return pathname === route
    },
  }
}

