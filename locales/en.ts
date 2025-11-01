export const en = {
  common: {
    title: "Web Action Assistant",
    description: "Enter commands to control the current webpage",
  },
  chat: {
    placeholder: "Enter command...",
    emptyState: "Start typing commands to control web operations",
    processing: "Action feature is under development...",
    error: "Operation failed",
    unknownError: "Unknown error",
  },
  metadata: {
    title: "Job Side - Chrome Extension",
    description: "Chrome sidebar assistant",
  },
  agent: {
    systemPrompt: `You are an intelligent web action assistant. Users will give you commands, and you need to understand the commands and use tools to operate webpages.

Available tools:
- click_element: Click webpage elements
- input_text: Input text into input fields
- get_page_info: Get page information
- wait: Wait for a specified time

Please choose the appropriate tool based on user commands to complete tasks. If the user's command is unclear, first use get_page_info to understand the current page state.

Always reply to users in English.`,
  },
  tools: {
    clickElement: {
      description: "Click an element on the webpage. Requires a selector or text content.",
      selector: "CSS selector or element text content",
      success: "Clicked: {selector}",
    },
    inputText: {
      description: "Input text into an input field. Requires target selector and text to input.",
      selector: "CSS selector of the target input field",
      text: "Text to input",
      success: "Inputted {text} into {selector}",
    },
    getPageInfo: {
      description: "Get information about the current page, such as title and URL.",
      infoType: "Type of info to get: title, url, or all",
      success: "Getting page info: {infoType}",
      exampleTitle: "Example Page",
      exampleUrl: "https://example.com",
    },
    wait: {
      description: "Wait for a specified time in milliseconds. Used for waiting page load or animations.",
      milliseconds: "Wait time in milliseconds",
      success: "Waited {milliseconds} milliseconds",
    },
  },
  logger: {
    messages: {
      startInit: "Starting Qwen model initialization",
      apiKeyFound: "API key found",
      usingDashScope: "Using DashScope API",
      settingEnvVar: "Setting {key} environment variable",
      importingModule: "Importing {module} module",
      creatingInstance: "Creating {name} instance",
      initSuccess: "Qwen model created successfully",
      initSuccessOpenAI: "Qwen model created successfully (OpenAI compatible mode)",
      initFailed: "Failed to create Qwen model",
      initFailedOpenAI: "Failed to create Qwen model (OpenAI compatible mode)",
      apiKeyNotSet: "API key not set",
      cannotFindConstructor: "Cannot find ChatAlibabaTongyi constructor",
    },
    errors: {
      expectedValue: "Expected value",
      expectedProperty: "Expected object to have property",
      expectedReject: "Expected promise to reject",
      expectedError: "Expected error message to include",
      apiKeyNotSet: "QWEN_API_KEY or DASHSCOPE_API_KEY environment variable is not set",
      unableToFindConstructor: "Unable to find ChatAlibabaTongyi constructor in module",
    },
  },
  tests: {
    startRunning: "Start running tests",
    testSuite: "Test suite",
    testPassed: "Test passed",
    testFailed: "Test failed",
    testComplete: "Tests completed",
    someTestsFailed: "Some tests failed",
    total: "Total",
    passed: "Passed",
    failed: "Failed",
    duration: "Duration",
    testQwen: {
      start: "Start testing Qwen model",
      init: "Initialize Qwen model",
      initSuccess: "Model initialized successfully",
      testInvoke: "Test model invocation",
      invokeSuccess: "Invocation successful",
      testStream: "Test streaming",
      streamStart: "Streaming started",
      allPassed: "All tests passed! Qwen model is working properly",
      testFailed: "Test failed",
      errorInfo: "Error information",
      errorStack: "Error stack",
      unknownError: "Unknown error",
      modelResponse: "Model response",
      modelResponseStream: "Model response (streaming)",
    },
  },
  labels: {
    chinese: "中文",
    english: "English",
  },
} as const

