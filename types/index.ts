// 应用类型定义

export interface Command {
  id: string
  type: string
  params: Record<string, any>
  timestamp: Date
}

export interface Action {
  type: string
  payload: any
}

// 未来可以在这里扩展更多类型

