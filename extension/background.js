// Background service worker for Chrome Extension
// 处理侧边栏的打开和管理

// 当扩展安装或更新时
chrome.runtime.onInstalled.addListener(() => {
  console.log('Job Side extension installed');
  
  // 注意：side_panel.default_path 已在 manifest.json 中配置
  // 这里不需要重复设置，但如果需要动态更改路径可以在这里设置
});

// 当用户点击扩展图标时，打开侧边栏
chrome.action.onClicked.addListener((tab) => {
  // 打开侧边栏（针对当前标签页）
  chrome.sidePanel.open({ tabId: tab.id });
});

// 可选：监听消息（用于从content script或popup通信）
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'openSidePanel') {
    // 确保 tabId 存在（消息必须来自标签页）
    if (sender.tab && sender.tab.id) {
      chrome.sidePanel.open({ tabId: sender.tab.id });
      sendResponse({ success: true });
    } else {
      // 如果没有 tabId，尝试获取当前活动标签页
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
          chrome.sidePanel.open({ tabId: tabs[0].id });
          sendResponse({ success: true });
        } else {
          sendResponse({ success: false, error: 'No active tab found' });
        }
      });
      return true; // 异步响应需要返回 true
    }
  }
  return true; // 保持消息通道开放以支持异步响应
});
