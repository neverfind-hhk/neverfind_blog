# 前端开发入门笔记：从 HTML 到构建工具

这是整理的前端入门知识地图，覆盖三条主线：**结构（HTML）→ 样式（CSS）→ 行为（JavaScript）**，最后聊聊现代开发离不开的构建工具。

## HTML：网页的骨架

HTML 决定内容的**结构**与**语义**。入门阶段要重点掌握：

- 常用标签：标题、段落、列表、链接、图片、表单
- 语义化标签：`header`、`nav`、`main`、`article`、`footer`
- 表单元素与输入校验

```html
<article>
  <h2>一篇文章的语义化结构</h2>
  <p>语义化标签让内容结构清晰，对 SEO 和无障碍也友好。</p>
  <time datetime="2026-08-15">2026-08-15</time>
</article>
```

## CSS：网页的皮肤

CSS 负责**表现与布局**。建议优先掌握三种布局方式：Flexbox、Grid、以及定位机制。

```css
/* 一个简单的两栏布局：Flexbox 版本 */
.layout {
  display: flex;
  gap: 1rem;
}
.layout .sidebar {
  width: 280px;
  flex-shrink: 0;
}
.layout .content {
  flex: 1;
}
```

> 现代 CSS 已经非常强大。能用 CSS 解决的问题，尽量不要引入额外依赖。

## JavaScript：网页的行为

JavaScript 是前端的核心，需要掌握的进阶点包括：

1. DOM 操作与事件委托
2. 异步请求（`fetch`）与错误处理
3. 模块化与 ES6+ 语法
4. 响应式与跨端适配的基础认知

```js
// 一个简单的防抖函数，用于搜索输入
function debounce(fn, delay = 300) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
```

## 构建工具：现代前端的地基

当项目变大，直接用浏览器打开 HTML 已经不够用了。这时需要构建工具帮你做**打包、转译、压缩**：

- **Vite**：开发体验极佳的现代构建工具，推荐首选
- **webpack**：生态成熟，历史包袱较重
- **esbuild / Rollup**：偏底层，适合工具链场景

入门不需要把工具链吃透，先会用 `npm create vite` 起一个项目、跑起来、看懂基础配置，就足够上路了。

## 小结

前端入门的关键路径：**HTML 结构 → CSS 布局 → JS 逻辑 → 构建工具**。每一步都要配合小练习，把「看得懂」变成「写得出」。
