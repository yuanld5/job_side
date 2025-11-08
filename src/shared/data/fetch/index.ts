/**
 * 数据获取工具
 * Next.js 数据获取最佳实践
 */

// 示例：获取数据（带缓存）
export async function getData() {
  // Next.js 会自动缓存 fetch 请求
  const res = await fetch("https://api.example.com/data", {
    // 缓存选项
    next: {
      revalidate: 3600, // 每 3600 秒重新验证
      // 或者使用 tags
      // tags: ['data'],
    },
  })

  if (!res.ok) {
    throw new Error("获取数据失败")
  }

  return res.json()
}

// 示例：获取数据（带标签）
export async function getDataWithTag() {
  const res = await fetch("https://api.example.com/data", {
    next: {
      tags: ["data"], // 使用标签进行缓存管理
    },
  })

  if (!res.ok) {
    throw new Error("获取数据失败")
  }

  return res.json()
}

// 示例：获取数据（不缓存）
export async function getDataNoCache() {
  const res = await fetch("https://api.example.com/data", {
    cache: "no-store", // 不缓存
  })

  if (!res.ok) {
    throw new Error("获取数据失败")
  }

  return res.json()
}

// 示例：获取数据（仅在构建时）
export async function getStaticData() {
  const res = await fetch("https://api.example.com/data", {
    cache: "force-cache", // 强制缓存（仅在构建时获取）
  })

  if (!res.ok) {
    throw new Error("获取数据失败")
  }

  return res.json()
}

