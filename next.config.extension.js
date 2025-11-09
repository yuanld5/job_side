/** @type {import('next').NextConfig} */
/**
 * 扩展构建配置
 * 用于构建 Chrome 扩展，启用静态导出
 * 使用方式: NEXT_CONFIG=extension npm run build
 */

const nextConfig = {
  // 静态导出模式（Chrome 扩展需要）
  output: 'export',
  
  // 图片优化配置（静态导出需要禁用优化）
  images: {
    unoptimized: true,
  },
  
  // React 严格模式
  reactStrictMode: true,
  
  // 编译优化
  swcMinify: true,
  
  // Webpack 配置
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        "node:async_hooks": false,
        "node:events": false,
        "node:stream": false,
        "node:util": false,
        "node:path": false,
        "node:os": false,
        "node:crypto": false,
      }
      
      if (!Array.isArray(config.externals)) {
        config.externals = []
      }
      config.externals.push(({ request }, callback) => {
        if (request && (
          request.includes("@langchain/langgraph") ||
          request.includes("node:async_hooks") ||
          request.includes("node:events")
        )) {
          return callback(null, "commonjs " + request)
        }
        callback()
      })
    }
    
    return config
  },
}

module.exports = nextConfig

