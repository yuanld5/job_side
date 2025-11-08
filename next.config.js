/** @type {import('next').NextConfig} */
const nextConfig = {
  // 不再使用静态导出模式，启用 API Routes
  // 如果需要静态导出，可以设置 output: 'export'
  
  // 图片优化配置
  images: {
    // 可以启用图片优化（需要配置图片域名）
    // unoptimized: false,
  },
  
  // React 严格模式
  reactStrictMode: true,
  
  // 编译优化
  swcMinify: true,
  
  // 实验性功能（可选）
  experimental: {
    // 如果未来需要启用
    // serverActions: true,
    // serverComponentsExternalPackages: ['@langchain/core'],
  },
  
  // Webpack 配置（如果需要自定义）
  webpack: (config, { isServer }) => {
    // 如果需要处理 Node.js 模块
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
      
      // 排除 Node.js 专用模块在客户端打包
      // 注意：externals 数组格式需要是字符串或函数
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
  
  // 环境变量配置
  env: {
    // 可以在这里添加公共环境变量
  },
}

module.exports = nextConfig
