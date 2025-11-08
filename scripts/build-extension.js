#!/usr/bin/env node

/**
 * 构建脚本：将Chrome扩展所需文件复制到out目录
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const outDir = path.join(rootDir, 'out');

// 需要复制的文件列表（从 extension 目录）
const extensionDir = path.join(rootDir, 'extension');
const filesToCopy = [
  { src: path.join(extensionDir, 'manifest.json'), dest: 'manifest.json' },
  { src: path.join(extensionDir, 'background.js'), dest: 'background.js' }
];

console.log('📦 准备Chrome扩展文件...');

// 确保out目录存在
if (!fs.existsSync(outDir)) {
  console.error('❌ out目录不存在！请先运行 npm run build');
  process.exit(1);
}

// 复制文件
filesToCopy.forEach(({ src, dest }) => {
  const destPath = path.join(outDir, dest);
  
  if (!fs.existsSync(src)) {
    console.warn(`⚠️  警告: ${src} 不存在，跳过`);
    return;
  }
  
  try {
    fs.copyFileSync(src, destPath);
    console.log(`✅ 已复制: ${path.basename(src)} -> out/${dest}`);
  } catch (error) {
    console.error(`❌ 复制失败 ${dest}:`, error.message);
    process.exit(1);
  }
});

console.log('\n✨ Chrome扩展文件准备完成！');
console.log('📂 扩展目录: out/');
console.log('\n📋 下一步:');
console.log('   1. 打开 Chrome，访问 chrome://extensions/');
console.log('   2. 启用"开发者模式"');
console.log('   3. 点击"加载已解压的扩展程序"');
console.log('   4. 选择 out/ 目录');
