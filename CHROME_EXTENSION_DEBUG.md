# Chrome 侧边栏扩展 - 部署和调试指南

## 🚀 快速部署

### 1. 构建扩展

```bash
npm run build:extension
```

构建完成后，所有文件都在 `out/` 目录。

### 2. 安装到 Chrome

1. **打开扩展管理页面**
   - 在 Chrome 地址栏输入：`chrome://extensions/`
   - 或：菜单 → 更多工具 → 扩展程序

2. **启用开发者模式**
   - 在页面右上角，打开"开发者模式"开关

3. **加载扩展**
   - 点击"加载已解压的扩展程序"按钮
   - 选择项目根目录下的 `out/` 文件夹
   - 点击"选择文件夹"

4. **验证安装**
   - 扩展图标应该出现在 Chrome 工具栏
   - 扩展卡片应该显示在扩展管理页面

### 3. 打开侧边栏

- **方法 1**: 点击扩展图标
- **方法 2**: 右键扩展图标 → "打开侧边栏"
- **方法 3**: 使用快捷键（如果配置了）

---

## 🐛 调试方法

### 1. 调试侧边栏页面

#### 方法 A: 从扩展管理页面

1. 打开 `chrome://extensions/`
2. 找到你的扩展
3. 点击"检查视图" → "side panel"
4. 开发者工具会打开，显示侧边栏页面的控制台

#### 方法 B: 在侧边栏中右键

1. 打开侧边栏
2. 在侧边栏内容区域右键
3. 选择"检查"或"审查元素"
4. 开发者工具会打开

#### 方法 C: 使用快捷键

- **Mac**: `Cmd + Option + I`
- **Windows/Linux**: `Ctrl + Shift + I`

### 2. 调试后台服务脚本 (Background Service Worker)

1. 打开 `chrome://extensions/`
2. 找到你的扩展
3. 点击"检查视图" → "service worker"
4. 开发者工具会打开，显示后台脚本的控制台

**查看日志**:
```javascript
// 在 background.js 中的 console.log 会显示在这里
console.log('Background script loaded');
```

### 3. 调试内容脚本 (Content Scripts)

如果扩展有内容脚本：

1. 打开任意网页
2. 按 `F12` 打开开发者工具
3. 在控制台中，内容脚本的日志会显示
4. 或者查看"Sources"标签页，找到扩展的脚本文件

---

## 🔍 常见调试场景

### 场景 1: 侧边栏无法打开

**检查清单**:

1. **检查 manifest.json**
   ```json
   {
     "side_panel": {
       "default_path": "index.html"  // 确保路径正确
     }
   }
   ```

2. **检查 background.js**
   ```javascript
   // 确保有正确的监听器
   chrome.action.onClicked.addListener((tab) => {
     chrome.sidePanel.open({ tabId: tab.id });
   });
   ```

3. **查看扩展错误**
   - 在 `chrome://extensions/` 中查看扩展卡片
   - 如果有错误，会显示红色错误信息

4. **检查控制台**
   - 打开后台脚本的控制台
   - 查看是否有错误信息

### 场景 2: 页面显示空白

**可能原因和解决方案**:

1. **资源路径错误**
   - 检查浏览器控制台的网络请求
   - 确保所有资源路径正确（相对路径或绝对路径）

2. **JavaScript 错误**
   - 打开侧边栏的开发者工具
   - 查看控制台的错误信息
   - 检查是否有未捕获的异常

3. **构建问题**
   - 重新运行 `npm run build:extension`
   - 确保 `out/` 目录包含所有必要文件

### 场景 3: 功能不工作

**调试步骤**:

1. **检查控制台错误**
   - 打开侧边栏开发者工具
   - 查看控制台的错误和警告

2. **检查网络请求**
   - 在开发者工具的"Network"标签页
   - 查看是否有失败的请求

3. **检查状态管理**
   - 如果使用 Zustand 或其他状态管理
   - 在控制台中检查 store 状态

4. **添加调试日志**
   ```javascript
   console.log('Current state:', store.getState());
   ```

### 场景 4: 样式问题

**调试方法**:

1. **检查元素样式**
   - 在开发者工具中选择元素
   - 查看"Computed"标签页
   - 检查 CSS 是否正确应用

2. **检查 Tailwind CSS**
   - 确保 Tailwind 类名正确
   - 检查是否有未生成的样式

3. **检查资源加载**
   - 在"Network"标签页
   - 查看 CSS 文件是否成功加载

---

## 📝 调试技巧

### 1. 使用 console.log

```javascript
// 在组件中
console.log('Component rendered', { props, state });

// 在后台脚本中
console.log('Background script event', event);
```

### 2. 使用断点

1. 在开发者工具的"Sources"标签页
2. 找到源代码文件
3. 点击行号设置断点
4. 刷新页面或触发操作

### 3. 使用 React DevTools

如果使用 React：

1. 安装 React DevTools 扩展
2. 在开发者工具中会看到"Components"和"Profiler"标签页
3. 可以检查组件树和状态

### 4. 使用 Network 标签页

- 查看所有网络请求
- 检查 API 调用是否成功
- 查看请求和响应内容

### 5. 使用 Application 标签页

- 查看 LocalStorage/SessionStorage
- 查看 IndexedDB
- 查看 Cookies

---

## 🔄 重新加载扩展

### 方法 1: 在扩展管理页面

1. 打开 `chrome://extensions/`
2. 找到你的扩展
3. 点击"重新加载"按钮（🔄图标）

### 方法 2: 重新构建和加载

```bash
# 1. 重新构建
npm run build:extension

# 2. 在扩展管理页面点击"重新加载"
```

### 方法 3: 完全重新安装

1. 在扩展管理页面，移除扩展
2. 重新运行 `npm run build:extension`
3. 重新加载扩展

---

## ⚠️ 注意事项

### 1. API Routes 不可用

Chrome 扩展使用静态文件，所以：
- ❌ API Routes (`/api/*`) 不可用
- ✅ 所有功能需要在客户端实现
- ✅ 可以使用外部 API

### 2. 每次修改后需要重新构建

```bash
npm run build:extension
```

然后在扩展管理页面点击"重新加载"。

### 3. 开发模式 vs 生产模式

- **开发模式**: 使用 `npm run dev`（用于开发，不支持扩展）
- **生产模式**: 使用 `npm run build:extension`（用于扩展构建）

### 4. 环境变量

扩展中无法使用服务端环境变量，需要：
- 使用 `NEXT_PUBLIC_` 前缀的环境变量
- 在构建时注入到客户端代码

---

## 🛠️ 开发工作流

### 推荐工作流

1. **开发阶段**
   ```bash
   npm run dev
   # 在浏览器中开发（http://localhost:3000）
   ```

2. **测试扩展**
   ```bash
   npm run build:extension
   # 在 Chrome 中加载扩展并测试
   ```

3. **调试**
   - 使用开发者工具调试
   - 查看控制台和网络请求
   - 检查状态和错误

4. **迭代**
   - 修改代码
   - 重新构建
   - 重新加载扩展
   - 测试功能

---

## 📚 有用的 Chrome API

### 侧边栏相关

```javascript
// 打开侧边栏
chrome.sidePanel.open({ tabId: tab.id });

// 设置侧边栏路径
chrome.sidePanel.setOptions({
  path: 'custom-page.html',
  enabled: true
});
```

### 存储相关

```javascript
// 保存数据
chrome.storage.local.set({ key: 'value' });

// 读取数据
chrome.storage.local.get(['key'], (result) => {
  console.log(result.key);
});
```

### 标签页相关

```javascript
// 获取当前标签页
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  console.log(tabs[0]);
});
```

---

## 🎯 快速参考

| 操作 | 命令/步骤 |
|------|----------|
| 构建扩展 | `npm run build:extension` |
| 打开扩展管理 | `chrome://extensions/` |
| 调试侧边栏 | 扩展卡片 → "检查视图" → "side panel" |
| 调试后台脚本 | 扩展卡片 → "检查视图" → "service worker" |
| 重新加载扩展 | 扩展卡片 → "重新加载"按钮 |

---

## 🆘 获取帮助

如果遇到问题：

1. 检查浏览器控制台的错误信息
2. 查看扩展管理页面的错误提示
3. 检查构建日志
4. 查看 Chrome 扩展文档：https://developer.chrome.com/docs/extensions/

---

**祝调试顺利！** 🎉

