/**
 * Dashboard 首页
 * 路径: /dashboard
 */

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground">
        这是 Dashboard 页面，展示了嵌套布局的使用。
      </p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">统计卡片 1</h3>
          <p className="text-sm text-muted-foreground">示例内容</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">统计卡片 2</h3>
          <p className="text-sm text-muted-foreground">示例内容</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">统计卡片 3</h3>
          <p className="text-sm text-muted-foreground">示例内容</p>
        </div>
      </div>
    </div>
  )
}

