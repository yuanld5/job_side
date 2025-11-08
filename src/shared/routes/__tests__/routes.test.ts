/**
 * 路由工具测试用例
 */

import { routes, routeUtils } from "../index"
import { describe, test, expect } from "@/tests/runner"
import { createModuleLogger } from "@/shared/logger"

const testLogger = createModuleLogger("routes-test")

describe("Routes", () => {
  test("应该定义路由常量", () => {
    expect(routes.home).toBe("/")
    expect(typeof routes.home).toBe("string")
    testLogger.info("路由常量测试通过", routes)
  })

  test("routeUtils.isActive 应该正确判断活动路由", () => {
    expect(routeUtils.isActive("/", routes.home)).toBe(true)
    expect(routeUtils.isActive("/about", routes.home)).toBe(false)
    testLogger.info("路由活动状态判断测试通过")
  })
})


