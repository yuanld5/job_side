import { DynamicStructuredTool } from "@langchain/core/tools"
import { z } from "zod"
import type { Locale } from "@/locales"
import { getTranslation, replacePlaceholders } from "@/lib/i18n/getTranslation"

/**
 * 网页操作工具集合
 * 这些工具将被 LangChain Agent 调用来执行实际的网页操作
 */

// 点击元素工具
export const clickElementTool = (locale: Locale = "zh") => {
  const t = getTranslation(locale)
  return new DynamicStructuredTool({
    name: "click_element",
    description: t.tools.clickElement.description,
    schema: z.object({
      selector: z.string().describe(t.tools.clickElement.selector),
    }),
    func: async ({ selector }) => {
      // TODO: 实现实际的点击操作
      // 这里可以通过 Chrome Extension API 执行
      return JSON.stringify({
        success: true,
        message: replacePlaceholders(t.tools.clickElement.success, { selector }),
      })
    },
  })
}

// 输入文本工具
export const inputTextTool = (locale: Locale = "zh") => {
  const t = getTranslation(locale)
  return new DynamicStructuredTool({
    name: "input_text",
    description: t.tools.inputText.description,
    schema: z.object({
      selector: z.string().describe(t.tools.inputText.selector),
      text: z.string().describe(t.tools.inputText.text),
    }),
    func: async ({ selector, text }) => {
      // TODO: 实现实际的输入操作
      return JSON.stringify({
        success: true,
        message: replacePlaceholders(t.tools.inputText.success, { selector, text }),
      })
    },
  })
}

// 获取页面信息工具
export const getPageInfoTool = (locale: Locale = "zh") => {
  const t = getTranslation(locale)
  return new DynamicStructuredTool({
    name: "get_page_info",
    description: t.tools.getPageInfo.description,
    schema: z.object({
      infoType: z
        .enum(["title", "url", "all"])
        .optional()
        .describe(t.tools.getPageInfo.infoType),
    }),
    func: async ({ infoType = "all" }) => {
      // TODO: 实现实际的页面信息获取
      return JSON.stringify({
        success: true,
        message: replacePlaceholders(t.tools.getPageInfo.success, { infoType }),
        data: {
          title: t.tools.getPageInfo.exampleTitle,
          url: t.tools.getPageInfo.exampleUrl,
        },
      })
    },
  })
}

// 等待工具
export const waitTool = (locale: Locale = "zh") => {
  const t = getTranslation(locale)
  return new DynamicStructuredTool({
    name: "wait",
    description: t.tools.wait.description,
    schema: z.object({
      milliseconds: z.number().describe(t.tools.wait.milliseconds),
    }),
    func: async ({ milliseconds }) => {
      await new Promise((resolve) => setTimeout(resolve, milliseconds))
      return JSON.stringify({
        success: true,
        message: replacePlaceholders(t.tools.wait.success, { milliseconds }),
      })
    },
  })
}

/**
 * 获取所有工具
 */
export function getWebActionTools(locale: Locale = "zh") {
  return [
    clickElementTool(locale),
    inputTextTool(locale),
    getPageInfoTool(locale),
    waitTool(locale),
  ]
}

