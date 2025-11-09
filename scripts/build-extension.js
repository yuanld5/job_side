#!/usr/bin/env node

/**
 * 构建脚本：将Chrome扩展所需文件复制到构建目录
 * 注意：Chrome扩展需要静态文件，所以需要先构建静态导出版本
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const outDir = path.join(rootDir, 'out');
const extensionDir = path.join(rootDir, 'extension');

// 需要复制的文件列表（从 extension 目录）
const filesToCopy = [
  { src: path.join(extensionDir, 'manifest.json'), dest: 'manifest.json' },
  { src: path.join(extensionDir, 'background.js'), dest: 'background.js' }
];

console.log('📦 开始构建 Chrome 扩展...\n');

// 步骤1: 检查是否需要静态导出配置
console.log('📝 步骤 1: 检查构建配置...');
const nextConfigPath = path.join(rootDir, 'next.config.js');
let nextConfig = fs.readFileSync(nextConfigPath, 'utf8');

// 检查是否已配置静态导出
if (!nextConfig.includes('output: \'export\'')) {
  console.log('⚠️  警告: next.config.js 未配置静态导出');
  console.log('   为了构建 Chrome 扩展，需要临时启用静态导出模式');
  console.log('   建议：创建一个专门的扩展构建配置\n');
}

// 步骤2: 构建 Next.js 应用（静态导出）
console.log('🔨 步骤 2: 构建 Next.js 应用...');
try {
  // 如果 out 目录已存在，先删除
  if (fs.existsSync(outDir)) {
    fs.rmSync(outDir, { recursive: true, force: true });
    console.log('   已清理旧的构建目录');
  }
  
  // 临时移动 API Routes 目录（静态导出不支持 API Routes）
  // 必须移到 src/app 之外，否则 Next.js 仍会扫描
  const apiDir = path.join(rootDir, 'src/app/api');
  const apiBackupDir = path.join(rootDir, '.api-backup-temp');
  const hasApiDir = fs.existsSync(apiDir);
  
  if (hasApiDir) {
    console.log('   临时移动 API Routes 目录（静态导出不支持）');
    if (fs.existsSync(apiBackupDir)) {
      fs.rmSync(apiBackupDir, { recursive: true, force: true });
    }
    fs.renameSync(apiDir, apiBackupDir);
  }
  
  // 检查是否有扩展专用配置文件
  const extensionConfigPath = path.join(rootDir, 'next.config.extension.js');
  const useExtensionConfig = fs.existsSync(extensionConfigPath);
  
  let configBackupPath = null;
  
  try {
    if (useExtensionConfig) {
      console.log('   使用扩展构建配置 (next.config.extension.js)');
      // 临时重命名配置文件
      const originalConfigPath = path.join(rootDir, 'next.config.js');
      configBackupPath = path.join(rootDir, 'next.config.js.backup');
      
      // 备份原配置
      if (fs.existsSync(originalConfigPath)) {
        fs.copyFileSync(originalConfigPath, configBackupPath);
      }
      
      // 使用扩展配置
      fs.copyFileSync(extensionConfigPath, originalConfigPath);
    } else {
      console.log('   使用默认配置（需要 output: \'export\'）');
    }
    
    // 运行构建
    execSync('npm run build', { 
      cwd: rootDir, 
      stdio: 'inherit'
    });
    
    console.log('   ✅ Next.js 构建完成\n');
  } finally {
    // 恢复 API Routes 目录
    if (hasApiDir && fs.existsSync(apiBackupDir)) {
      if (fs.existsSync(apiDir)) {
        fs.rmSync(apiDir, { recursive: true, force: true });
      }
      fs.renameSync(apiBackupDir, apiDir);
      console.log('   已恢复 API Routes 目录');
    }
    
    // 恢复原配置
    if (configBackupPath && fs.existsSync(configBackupPath)) {
      const originalConfigPath = path.join(rootDir, 'next.config.js');
      fs.copyFileSync(configBackupPath, originalConfigPath);
      fs.unlinkSync(configBackupPath);
      console.log('   已恢复原配置文件');
    }
  }
} catch (error) {
  console.error('❌ 构建失败:', error.message);
  console.error('\n💡 提示:');
  console.error('   1. 确保 next.config.js 中配置了 output: \'export\'');
  console.error('   2. 或者创建 next.config.extension.js 用于扩展构建');
  console.error('   3. API Routes 在静态导出中不可用，已自动排除');
  process.exit(1);
}

// 步骤3: 复制扩展文件
console.log('📋 步骤 3: 复制扩展文件...');
if (!fs.existsSync(outDir)) {
  console.error('❌ out 目录不存在！构建可能失败');
  process.exit(1);
}

filesToCopy.forEach(({ src, dest }) => {
  const destPath = path.join(outDir, dest);
  
  if (!fs.existsSync(src)) {
    console.warn(`   ⚠️  警告: ${src} 不存在，跳过`);
    return;
  }
  
  try {
    fs.copyFileSync(src, destPath);
    console.log(`   ✅ 已复制: ${path.basename(src)}`);
  } catch (error) {
    console.error(`   ❌ 复制失败 ${dest}:`, error.message);
    process.exit(1);
  }
});

console.log('\n✨ Chrome 扩展构建完成！');
console.log(`📂 扩展目录: ${outDir}`);
console.log('\n📋 安装到 Chrome 的步骤:');
console.log('   1. 打开 Chrome 浏览器');
console.log('   2. 访问 chrome://extensions/');
console.log('   3. 启用右上角的"开发者模式"开关');
console.log('   4. 点击"加载已解压的扩展程序"按钮');
console.log(`   5. 选择目录: ${outDir}`);
console.log('\n🎉 安装完成后，点击扩展图标即可打开侧边栏！');
