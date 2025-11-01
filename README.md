# Job Side - Chrome Extension

A Chrome sidebar assistant application built with Next.js, shadcn/ui, and Tailwind CSS.

## Features

- 💬 Chat-style interaction interface
- 🎨 Modern UI design
- 🏗️ Complete architecture for easy expansion
- 🔧 Built with Next.js 14
- 🌐 Internationalization (i18n) support
- 🤖 LLM integration with LangChain and Qwen
- 📦 Global state management with Zustand
- 🧪 Testing framework included

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **State Management**: Zustand
- **LLM Framework**: LangChain, LangGraph
- **LLM Model**: Qwen (Tongyi Qianwen)
- **Internationalization**: Custom i18n solution

## Project Structure

```
job_side/
├── app/                  # Next.js App Router
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   ├── error.tsx         # Error boundary
│   ├── loading.tsx       # Loading state
│   ├── not-found.tsx    # 404 page
│   └── globals.css      # Global styles
├── components/           # React components
│   ├── ui/              # shadcn/ui base components
│   ├── chat/            # Chat-related components
│   └── providers/       # Context providers
├── store/               # Zustand state management
│   ├── appStore.ts      # App global state
│   └── chatStore.ts     # Chat state
├── lib/                 # Utilities
│   ├── agents/          # LangChain agents
│   ├── llm/             # LLM integration
│   ├── tools/           # Web action tools
│   ├── data/            # Data fetching utilities
│   ├── hooks/           # Custom hooks
│   └── routes/          # Route management
├── locales/             # i18n translations
│   ├── en.ts            # English
│   └── zh.ts            # Chinese
├── services/            # Business logic
└── scripts/             # Utility scripts
```

## Installation

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env.local` file in the root directory:

```env
QWEN_API_KEY=your_api_key_here
# or
DASHSCOPE_API_KEY=your_api_key_here

# Optional: Configure Qwen model
QWEN_MODEL=qwen-turbo
QWEN_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1

# Optional: Use DashScope API directly
USE_DASHSCOPE=true

# Optional: Set log level
LOG_LEVEL=INFO
```

### 3. Development mode

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

The output files will be in the `out/` directory.

## Chrome Extension Integration

This project is designed as a Chrome Extension sidebar panel. Configure the sidebar panel in the Chrome Extension manifest.

See [CHROME_EXTENSION.md](./CHROME_EXTENSION.md) for detailed integration guide.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run all tests
- `npm run test:qwen` - Test Qwen model integration
- `npm run test:logger` - Test logger system

## Features

### Internationalization (i18n)

The application supports multiple languages:
- English
- Chinese (Simplified)

Switch languages using the language switcher in the header.

### State Management

- **Global State**: Managed with Zustand
  - App settings (theme, preferences)
  - Chat history and sessions
  - Recent commands
- **Local State**: React Hooks
- **Context API**: I18n context

### LLM Integration

- LangChain for agent orchestration
- Qwen (Tongyi Qianwen) as the LLM
- Support for web action tools
- Agent and graph-based workflows

### Testing

Custom testing framework included:
- Logger tests
- LLM integration tests
- Web actions tests
- Service tests

## Development

- All components are written in TypeScript for type safety
- Uses shadcn/ui component library for easy UI component addition
- Follows Next.js App Router best practices
- Includes comprehensive error handling and loading states

## Future Expansion

The architecture is designed for easy expansion:
- Web action functionality (TODO: in `ChatContainer`)
- Command history
- User preferences
- Support for more action types

## License

Private project
