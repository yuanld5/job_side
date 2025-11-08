export const zh = {
  common: {
    title: "网页操作助手",
    description: "输入指令来控制当前网页",
  },
  chat: {
    placeholder: "输入指令...",
    emptyState: "开始输入指令来控制网页操作",
    processing: "操作功能正在开发中...",
    error: "操作失败",
    unknownError: "未知错误",
  },
  metadata: {
    title: "Job Side - Chrome Extension",
    description: "Chrome侧边栏助手",
  },
  agent: {
    systemPrompt: `你是一个智能网页操作助手。用户会给你指令，你需要理解指令并使用工具来操作网页。

你可以使用的工具：
- click_element: 点击网页元素
- input_text: 在输入框中输入文本
- get_page_info: 获取页面信息
- wait: 等待指定时间

请根据用户的指令，选择合适的工具来完成任务。如果用户的指令不明确，请先使用 get_page_info 了解当前页面状态。

始终用中文回复用户。`,
  },
  tools: {
    clickElement: {
      description: "点击网页上的某个元素。需要提供元素的选择器或文本内容。",
      selector: "CSS选择器或元素文本内容",
      success: "已点击: {selector}",
    },
    inputText: {
      description: "在输入框中输入文本。需要提供目标输入框的选择器和要输入的文本。",
      selector: "目标输入框的CSS选择器",
      text: "要输入的文本",
      success: "已在 {selector} 中输入: {text}",
    },
    getPageInfo: {
      description: "获取当前页面的信息，如标题、URL等。",
      infoType: "要获取的信息类型：title、url或all",
      success: "获取页面信息: {infoType}",
      exampleTitle: "示例页面",
      exampleUrl: "https://example.com",
    },
    wait: {
      description: "等待指定的时间（毫秒）。用于等待页面加载或动画完成。",
      milliseconds: "等待时间（毫秒）",
      success: "已等待 {milliseconds} 毫秒",
    },
  },
  logger: {
    messages: {
      startInit: "开始初始化 Qwen 模型",
      apiKeyFound: "API key 已找到",
      usingDashScope: "使用 DashScope API",
      settingEnvVar: "设置 {key} 环境变量",
      importingModule: "导入 {module} 模块",
      creatingInstance: "创建 {name} 实例",
      initSuccess: "Qwen 模型创建成功",
      initSuccessOpenAI: "Qwen 模型创建成功（OpenAI 兼容模式）",
      initFailed: "创建 Qwen 模型失败",
      initFailedOpenAI: "创建 Qwen 模型失败（OpenAI 兼容模式）",
      apiKeyNotSet: "API key 未设置",
      cannotFindConstructor: "无法找到 ChatAlibabaTongyi 构造函数",
      creatingWebAgent: "创建 Web Agent",
      initializingModelTools: "初始化模型和工具",
      buildingPrompt: "构建提示模板",
      creatingAgent: "创建 Agent",
      creatingExecutor: "创建 Agent Executor",
      webAgentCreated: "Web Agent 创建成功",
      creatingWebAgentGraph: "创建 Web Agent Graph",
      executingAgentNode: "执行 Agent 节点",
      agentNodeSuccess: "Agent 节点执行成功",
      agentNodeFailed: "Agent 节点执行失败",
      creatingStateGraph: "创建状态图",
      addingNodesEdges: "添加节点和边",
      compilingGraph: "编译状态图",
      webAgentGraphCreated: "Web Agent Graph 创建成功",
      usingLangGraph: "使用 LangGraph",
      langGraphCreated: "LangGraph 创建成功，开始调用",
      langGraphCompleted: "LangGraph 调用完成",
      langGraphUnavailable: "LangGraph 不可用，降级到标准 Agent",
      usingStandardAgent: "使用标准 LangChain Agent",
      agentCreated: "Agent 创建成功，开始调用",
      agentCompleted: "Agent 调用完成",
      executingWebAction: "执行网页操作",
      webActionSuccess: "网页操作执行成功",
      webActionFailed: "网页操作执行失败",
    },
    errors: {
      expectedValue: "期望的值",
      expectedProperty: "期望对象具有属性",
      expectedReject: "期望 Promise 被拒绝",
      expectedError: "期望错误消息包含",
      apiKeyNotSet: "QWEN_API_KEY 或 DASHSCOPE_API_KEY 环境变量未设置",
      unableToFindConstructor: "无法在模块中找到 ChatAlibabaTongyi 构造函数",
    },
  },
  tests: {
    startRunning: "开始运行测试",
    testSuite: "测试套件",
    testPassed: "测试通过",
    testFailed: "测试失败",
    testComplete: "测试完成",
    someTestsFailed: "部分测试失败",
    total: "总计",
    passed: "通过",
    failed: "失败",
    duration: "耗时",
    testQwen: {
      start: "开始测试 Qwen 模型",
      init: "初始化 Qwen 模型",
      initSuccess: "模型初始化成功",
      testInvoke: "测试模型调用",
      invokeSuccess: "调用成功",
      testStream: "测试流式调用",
      streamStart: "流式调用开始",
      allPassed: "所有测试通过！Qwen 模型工作正常",
      testFailed: "测试失败",
      errorInfo: "错误信息",
      errorStack: "错误堆栈",
      unknownError: "未知错误",
      modelResponse: "模型回复",
      modelResponseStream: "模型回复 (流式)",
    },
  },
  labels: {
    chinese: "中文",
    english: "English",
  },
  settings: {
    title: "设置",
    theme: {
      title: "主题",
      light: "浅色",
      dark: "深色",
      system: "跟随系统",
    },
    language: {
      title: "语言",
    },
    preferences: {
      title: "偏好设置",
      autoSave: "自动保存",
      notifications: "通知",
      soundEnabled: "声音提示",
    },
    back: "返回",
  },
} as const

