/**
 * 应用路由组布局
 * 路由组使用括号 (app) 不会影响 URL 路径
 * 可以用于组织需要特定布局的路由
 */

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="app-layout">
      {/* 可以在这里添加应用特定的导航、侧边栏等 */}
      {children}
    </div>
  )
}

