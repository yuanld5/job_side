# Chrome Extension 集成指南

## 构建步骤

1. **构建 Next.js 应用**
   ```bash
   npm run build
   ```
   构建完成后，输出文件在 `out/` 目录。

2. **准备 Chrome Extension 文件**
   - 将 `out/` 目录中的文件复制到 Chrome Extension 项目目录
   - 将 `manifest.json` 放在扩展根目录

3. **加载扩展**
   - 打开 Chrome，访问 `chrome://extensions/`
   - 启用"开发者模式"
   - 点击"加载已解压的扩展程序"
   - 选择项目根目录

## 使用侧边栏

在 Chrome Extension 的 background script 中：

```javascript
chrome.action.onClicked.addListener((tab) => {
  chrome.sidePanel.open({ tabId: tab.id });
});
```

或者在特定条件下自动打开：

```javascript
chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setOptions({
    path: 'index.html',
    enabled: true
  });
});
```

## 与网页交互

将来可以在 `services/webAction.ts` 中使用 Chrome Extension API：

```typescript
// 示例：注入脚本到当前标签页
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.scripting.executeScript({
    target: { tabId: tabs[0].id! },
    func: () => {
      // 操作网页的代码
    }
  });
});
```

## 注意事项

- Next.js 构建输出为静态文件，适合作为 Chrome Extension 的页面
- 确保 `next.config.js` 中 `output: 'export'` 配置正确
- Chrome Extension 的侧边栏面板宽度有限，UI 已针对此优化

