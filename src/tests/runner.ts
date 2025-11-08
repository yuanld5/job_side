/**
 * 简单的测试运行器
 * 运行所有测试用例
 */

import { logger } from "@/shared/logger"
import { getTestTranslation } from "@/features/i18n/utils/testI18n"
import { getLoggerTranslation } from "@/features/i18n/utils/loggerI18n"

// 获取当前 locale
function getCurrentLocale(): "zh" | "en" {
  return (process.env.LOCALE as "zh" | "en") || "zh"
}

interface TestResult {
  name: string
  passed: boolean
  error?: Error
  duration: number
}

class TestRunner {
  private tests: Array<{ name: string; fn: () => void | Promise<void> }> = []

  test(name: string, fn: () => void | Promise<void>) {
    this.tests.push({ name, fn })
  }

  async run() {
    const t = getTestTranslation(getCurrentLocale())
    logger.info(t.startRunning, undefined, { testCount: this.tests.length })
    
    const results: TestResult[] = []
    
    for (const test of this.tests) {
      const startTime = Date.now()
      try {
        await test.fn()
        const duration = Date.now() - startTime
        results.push({ name: test.name, passed: true, duration })
        logger.info(`✓ ${test.name}`, undefined, { duration: `${duration}ms` })
      } catch (error) {
        const duration = Date.now() - startTime
        results.push({
          name: test.name,
          passed: false,
          error: error instanceof Error ? error : new Error(String(error)),
          duration,
        })
        logger.error(`✗ ${test.name}`, undefined, error instanceof Error ? error : { error: String(error) })
      }
    }

    this.summary(results)
    return results
  }

  private summary(results: TestResult[]) {
    const t = getTestTranslation(getCurrentLocale())
    const passed = results.filter((r) => r.passed).length
    const failed = results.filter((r) => !r.passed).length
    const totalDuration = results.reduce((sum, r) => sum + r.duration, 0)

    logger.info(t.testComplete, undefined, {
      [t.total]: results.length,
      [t.passed]: passed,
      [t.failed]: failed,
      [t.duration]: `${totalDuration}ms`,
    })

    if (failed > 0) {
      logger.error(t.someTestsFailed)
      process.exit(1)
    }
  }
}

// 全局 expect 函数
export function expect(actual: any) {
  const t = getLoggerTranslation(getCurrentLocale())
  
  return {
    toBe: (expected: any) => {
      if (actual !== expected) {
        throw new Error(`${t.errors.expectedValue}: ${actual} to be ${expected}`)
      }
    },
    toBeDefined: () => {
      if (actual === undefined) {
        throw new Error(`${t.errors.expectedValue} to be defined`)
      }
    },
    toHaveProperty: (prop: string) => {
      if (!(prop in actual)) {
        throw new Error(`${t.errors.expectedProperty} ${prop}`)
      }
    },
    toBeLessThanOrEqual: (max: number) => {
      if (actual > max) {
        throw new Error(`${t.errors.expectedValue}: ${actual} to be less than or equal to ${max}`)
      }
    },
    rejects: {
      toThrow: async (message?: string) => {
        try {
          await actual
          throw new Error(t.errors.expectedReject)
        } catch (error) {
          if (message && !String(error).includes(message)) {
            throw new Error(`${t.errors.expectedError} "${message}"`)
          }
        }
      },
    },
  }
}

export const testRunner = new TestRunner()

// 存储 beforeEach 和 afterEach 钩子
let beforeEachHooks: Array<() => void | Promise<void>> = []
let afterEachHooks: Array<() => void | Promise<void>> = []

// 导出 describe, test 函数（类似 Jest 风格）
export function describe(suite: string, fn: () => void) {
  const t = getTestTranslation(getCurrentLocale())
  logger.info(`${t.testSuite}: ${suite}`)
  
  // 保存当前的 hooks
  const prevBeforeEach = [...beforeEachHooks]
  const prevAfterEach = [...afterEachHooks]
  beforeEachHooks = []
  afterEachHooks = []
  
  fn()
  
  // 恢复 hooks
  beforeEachHooks = prevBeforeEach
  afterEachHooks = prevAfterEach
}

export function test(name: string, fn: () => void | Promise<void>) {
  const wrappedFn = async () => {
    // 执行 beforeEach
    for (const hook of beforeEachHooks) {
      await hook()
    }
    
    try {
      // 执行测试
      await fn()
    } finally {
      // 执行 afterEach
      for (const hook of afterEachHooks) {
        await hook()
      }
    }
  }
  
  testRunner.test(name, wrappedFn)
}

export function beforeEach(fn: () => void | Promise<void>) {
  beforeEachHooks.push(fn)
}

export function afterEach(fn: () => void | Promise<void>) {
  afterEachHooks.push(fn)
}

