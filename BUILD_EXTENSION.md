# Chrome 扩展构建和安装指南

## 📦 构建扩展

### 方法 1: 使用构建脚本（推荐）

```bash
npm run build:extension
```

这个命令会：
1. 自动使用 `next.config.extension.js` 配置（启用静态导出）
2. 构建 Next.js 应用
3. 复制扩展文件（manifest.json, background.js）到 `out/` 目录

### 方法 2: 手动构建

如果需要手动控制构建过程：

```bash
# 1. 构建 Next.js 应用（需要静态导出配置）
npm run build

# 2. 复制扩展文件
cp extension/manifest.json out/
cp extension/background.js out/
```

## 🔧 安装到 Chrome

### 步骤 1: 打开 Chrome 扩展管理页面

1. 打开 Chrome 浏览器
2. 在地址栏输入：`chrome://extensions/`
3. 或者：菜单 → 更多工具 → 扩展程序

### 步骤 2: 启用开发者模式

1. 在扩展管理页面右上角，找到"开发者模式"开关
2. 点击开关，启用开发者模式

### 步骤 3: 加载扩展

1. 点击"加载已解压的扩展程序"按钮
2. 选择项目根目录下的 `out/` 文件夹
3. 点击"选择文件夹"

### 步骤 4: 使用扩展

1. 安装成功后，扩展图标会出现在 Chrome 工具栏
2. 点击扩展图标，侧边栏会自动打开
3. 或者右键点击扩展图标 → "打开侧边栏"

## 📁 构建输出目录

构建完成后，所有扩展文件都在 `out/` 目录：

```
out/
├── _next/          # Next.js 构建文件
├── index.html      # 侧边栏入口页面
├── manifest.json   # 扩展清单文件
└── background.js   # 后台服务脚本
```

## ⚠️ 注意事项

1. **静态导出限制**: Chrome 扩展需要静态文件，所以构建时会使用静态导出模式
   - API Routes 在扩展中不可用
   - 所有功能需要在客户端实现

2. **每次修改后**: 需要重新构建和重新加载扩展
   ```bash
   npm run build:extension
   ```
   然后在 Chrome 扩展页面点击"重新加载"按钮

3. **开发调试**: 
   - 打开 Chrome 开发者工具（F12）
   - 在扩展页面点击"检查视图" → "service worker" 查看后台脚本日志
   - 在侧边栏中右键 → "检查" 查看侧边栏页面

## 🐛 常见问题

### 问题 1: 构建失败，提示需要静态导出

**解决方案**: 确保 `next.config.extension.js` 文件存在，构建脚本会自动使用它。

### 问题 2: 扩展加载后侧边栏无法打开

**检查清单**:
- 确保 `manifest.json` 中的 `side_panel.default_path` 指向正确的 HTML 文件
- 检查 `background.js` 是否正确复制到 `out/` 目录
- 查看 Chrome 扩展页面的错误信息

### 问题 3: 页面显示空白

**可能原因**:
- 资源路径不正确
- 检查浏览器控制台的错误信息
- 确保所有静态资源都已正确构建

## 📚 相关文件

- `extension/manifest.json` - Chrome 扩展清单文件
- `extension/background.js` - 后台服务脚本
- `next.config.extension.js` - 扩展构建配置
- `scripts/build-extension.js` - 构建脚本
