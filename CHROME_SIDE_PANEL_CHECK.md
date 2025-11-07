# Chrome Side Panel 支持检查

## ✅ 已配置的部分

### 1. Manifest 配置
- ✅ `manifest.json` 中已配置 `side_panel.default_path: "index.html"`
- ✅ 已声明 `sidePanel` 权限
- ✅ 已配置 `action` 用于打开侧边栏

### 2. Background Script
- ✅ `background.js` 已实现侧边栏打开逻辑
- ✅ 支持点击扩展图标打开侧边栏
- ✅ 支持通过消息打开侧边栏

### 3. Next.js 配置
- ✅ `next.config.js` 已配置 `output: 'export'`（静态导出）
- ✅ 已配置 `distDir: 'out'`（输出目录）

### 4. 构建脚本
- ✅ `scripts/build-extension.js` 会自动复制必要文件
- ✅ `package.json` 中有 `build:extension` 脚本

## 📋 使用步骤

### 1. 构建项目
```bash
npm run build:extension
```

这个命令会：
- 构建 Next.js 应用（输出到 `out/` 目录）
- 自动复制 `manifest.json` 和 `background.js` 到 `out/` 目录

### 2. 加载扩展
1. 打开 Chrome，访问 `chrome://extensions/`
2. 启用"开发者模式"（右上角开关）
3. 点击"加载已解压的扩展程序"
4. **选择 `out/` 目录**（不是项目根目录！）

### 3. 使用侧边栏
- 点击扩展图标（浏览器工具栏）
- 侧边栏会自动打开，显示 Next.js 应用界面

## ⚠️ 注意事项

1. **Chrome 版本要求**：Side Panel API 需要 Chrome 114+ 版本
2. **路径问题**：确保 `manifest.json` 中的 `default_path` 指向 `index.html`
3. **静态资源**：Next.js 构建的静态文件都在 `out/` 目录中
4. **权限**：已配置必要的权限（sidePanel, activeTab, tabs, scripting）

## 🔍 验证清单

- [ ] 已运行 `npm run build:extension`
- [ ] `out/` 目录中存在 `manifest.json`
- [ ] `out/` 目录中存在 `background.js`
- [ ] `out/` 目录中存在 `index.html`
- [ ] Chrome 版本 >= 114
- [ ] 已启用开发者模式
- [ ] 已加载扩展（选择 `out/` 目录）

## 🐛 常见问题

### 侧边栏无法打开
1. 检查 Chrome 版本是否 >= 114
2. 检查扩展是否已正确加载
3. 查看 `chrome://extensions/` 中是否有错误信息
4. 检查浏览器控制台是否有错误

### 页面显示空白
1. 检查 `out/index.html` 是否存在
2. 检查静态资源路径是否正确
3. 查看侧边栏的开发者工具（右键 -> 检查）

### 权限错误
1. 检查 `manifest.json` 中的权限配置
2. 确保已声明 `sidePanel` 权限
