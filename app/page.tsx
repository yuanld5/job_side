import { ChatContainer } from "@/components/chat/ChatContainer"

export default function Home() {
  return (
    <main className="h-screen w-full flex flex-col bg-background">
      <header className="border-b px-4 py-3 bg-card">
        <h1 className="text-lg font-semibold">网页操作助手</h1>
        <p className="text-xs text-muted-foreground mt-1">
          输入指令来控制当前网页
        </p>
      </header>
      <div className="flex-1 overflow-hidden">
        <ChatContainer />
      </div>
    </main>
  )
}

