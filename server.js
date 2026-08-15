/*
 * 本地预览服务器
 * 用法：node server.js （或双击 start.bat）
 * 说明：浏览器对 file:// 协议禁止加载本地 Markdown，必须通过 HTTP 访问本服务预览。
 * 发布到 GitHub Pages / EdgeOne Pages 时不需要此文件。
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const ROOT = __dirname;
const BASE_PORT = 8000;
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.json': 'application/json'
};

const server = http.createServer((req, res) => {
  let urlPath;
  try {
    urlPath = decodeURIComponent(req.url.split('?')[0]);
  } catch (e) {
    urlPath = '/';
  }
  if (urlPath === '/') urlPath = '/index.html';

  const filePath = path.resolve(ROOT, path.normalize(urlPath.replace(/^\/+/, '')));
  // 防目录穿越
  if (filePath !== ROOT && !filePath.startsWith(ROOT + path.sep)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

function tryListen(port) {
  server.once('error', (err) => {
    if (err.code === 'EADDRINUSE' && port < BASE_PORT + 10) {
      tryListen(port + 1);
    } else {
      console.error('启动失败：' + err.message);
      process.exit(1);
    }
  });
  server.listen(port, '127.0.0.1', () => {
    const url = 'http://localhost:' + port;
    // 注意：不要在此输出 emoji，cmd 控制台对 emoji 的字宽渲染不稳定会导致文字重叠
    console.log('');
    console.log('  博客本地预览已启动：' + url);
    console.log('  按 Ctrl+C 停止服务');
    console.log('');
    // 自动打开浏览器（仅本机预览用）
    try {
      if (process.platform === 'win32') exec('start "" "' + url + '"');
      else exec('open "' + url + '"');
    } catch (e) { /* 忽略 */ }
  });
}

tryListen(BASE_PORT);
