var app = document.getElementById('app');

function escapeHtml(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function formatDate(dateStr) {
  var parts = dateStr.split('-');
  return parts[0] + '-' + parts[1] + '-' + parts[2];
}

function estimateReadingTime(text) {
  var chineseChars = (text.match(/[一-鿿]/g) || []).length;
  var words = (text.replace(/[一-鿿]/g, ' ').match(/[a-zA-Z0-9]+/g) || []).length;
  var minutes = Math.max(1, Math.ceil(chineseChars / 400 + words / 200));
  return minutes + ' min';
}

function renderLoading() {
  return '<div class="loading"><div class="spinner"></div></div>';
}

function getCategories() {
  var cats = {};
  SITE_CONFIG.posts.forEach(function (p) {
    if (p.published && p.category) cats[p.category] = (cats[p.category] || 0) + 1;
  });
  return cats;
}

/* ===== 侧边栏 ===== */
function renderSidebar(searchQuery, selectedTag) {
  var html = '<div class="sidebar">';

  // 作者卡片
  html += '<div class="sidebar-card author-card">';
  html += '  <div class="author-avatar">' + escapeHtml(SITE_CONFIG.author.charAt(0)) + '</div>';
  html += '  <h3 class="author-name">' + escapeHtml(SITE_CONFIG.author) + '</h3>';
  html += '  <span class="author-title">' + escapeHtml(SITE_CONFIG.title) + '</span>';
  html += '  <p class="author-bio">' + escapeHtml(SITE_CONFIG.bio) + '</p>';
  html += '  <div class="author-stats">';
  html += '    <div class="author-stat"><span class="author-stat-label">文章</span><span class="author-stat-value">' + SITE_CONFIG.posts.length + '</span></div>';
  var cats = getCategories();
  html += '    <div class="author-stat"><span class="author-stat-label">分类</span><span class="author-stat-value">' + Object.keys(cats).length + '</span></div>';
  html += '    <div class="author-stat"><span class="author-stat-label">标签</span><span class="author-stat-value">' + SITE_CONFIG.globalTags.length + '</span></div>';
  html += '  </div>';
  if (SITE_CONFIG.socials && SITE_CONFIG.socials.length) {
    html += '  <div class="author-socials">';
    SITE_CONFIG.socials.forEach(function (s) {
      html += '<a href="' + escapeHtml(s.url) + '" target="_blank" rel="noopener" class="social-btn">' + escapeHtml(s.name) + '</a>';
    });
    html += '  </div>';
  }
  html += '</div>';

  // 标签云
  html += '<div class="sidebar-card">';
  html += '  <h4 class="sidebar-card-title"><span class="sidebar-card-title-bar indigo"></span>标签</h4>';
  html += '  <div class="tag-cloud">';
  SITE_CONFIG.globalTags.forEach(function (tag) {
    var cls = selectedTag === tag ? ' style="background:#eff6ff;color:#2563eb;border-color:#bfdbfe;"' : '';
    html += '<a href="#/?tag=' + encodeURIComponent(tag) + '" class="tag"' + cls + '>#' + escapeHtml(tag) + '</a>';
  });
  html += '  </div>';
  html += '</div>';

  html += '</div>';
  return html;
}

/* ===== 首页 ===== */
function renderHome(params) {
  var searchQuery = (params && params.search) || '';
  var selectedTag = (params && params.tag) || '';

  var posts = SITE_CONFIG.posts
    .filter(function (p) { return p.published; })
    .sort(function (a, b) { return b.date.localeCompare(a.date); });

  // 过滤：搜索词
  if (searchQuery) {
    var q = searchQuery.toLowerCase();
    posts = posts.filter(function (p) {
      return p.title.toLowerCase().indexOf(q) >= 0 ||
             p.excerpt.toLowerCase().indexOf(q) >= 0 ||
             (p.tags && p.tags.some(function (t) { return t.toLowerCase().indexOf(q) >= 0; }));
    });
  }
  // 过滤：标签
  if (selectedTag) {
    posts = posts.filter(function (p) {
      return p.tags && p.tags.indexOf(selectedTag) >= 0;
    });
  }

  var html = '<div class="container">';
  html += '<div class="home-layout">';

  // 左列：文章列表
  html += '<div>';

  // 过滤提示条
  if (searchQuery || selectedTag) {
    html += '<div class="filter-bar">';
    html += '  <div>';
    html += '    <span class="filter-bar-label">当前过滤:</span>';
    if (selectedTag) html += '<span class="filter-bar-badge">#' + escapeHtml(selectedTag) + '</span>';
    if (searchQuery) html += '<span class="filter-bar-badge">"' + escapeHtml(searchQuery) + '"</span>';
    html += '  </div>';
    html += '  <a href="#/" class="filter-bar-clear">重置</a>';
    html += '</div>';
  }

  // 板块标题
  html += '<div class="section-heading">';
  html += '  <div class="section-heading-left"><span class="section-heading-bar"></span>';
  html += selectedTag ? '# ' + escapeHtml(selectedTag) + ' 的文章' : '最新文章';
  html += ' <span style="color:var(--color-text-muted);font-weight:400;font-size:14px;">(' + posts.length + ')</span></div>';
  html += '</div>';

  // 文章卡片
  html += '<div class="card-list">';
  for (var i = 0; i < posts.length; i++) {
    var post = posts[i];
    html += '<div class="card" onclick="window.location.hash=\'#/article/' + escapeHtml(post.slug) + '\'">';
    html += '  <div class="card-meta">';
    if (post.category) html += '<span class="card-category">' + escapeHtml(post.category) + '</span>';
    html += '    <span>' + formatDate(post.date) + '</span>';
    html += '  </div>';
    html += '  <h3 class="card-title"><a href="#/article/' + escapeHtml(post.slug) + '">' + escapeHtml(post.title) + '</a></h3>';
    html += '  <p class="card-excerpt">' + escapeHtml(post.excerpt) + '</p>';
    html += '  <div class="card-bottom">';
    html += '    <div class="card-tags">';
    if (post.tags) {
      for (var j = 0; j < Math.min(post.tags.length, 4); j++) {
        html += '<span class="tag">#' + escapeHtml(post.tags[j]) + '</span>';
      }
    }
    html += '    </div>';
    html += '    <a href="#/article/' + escapeHtml(post.slug) + '" class="card-read-more">查看详情 &rarr;</a>';
    html += '  </div>';
    html += '</div>';
  }
  if (posts.length === 0) {
    html += '<div class="empty-state">';
    html += '  <p style="font-size:14px;">暂无匹配的文章</p>';
    html += '  <a href="#/" style="font-size:12px;margin-top:8px;display:inline-block;">清除检索条件</a>';
    html += '</div>';
  }
  html += '</div>';

  html += '</div>';

  // 右列：侧边栏
  html += renderSidebar(searchQuery, selectedTag);

  html += '</div></div>';

  app.innerHTML = html;
  document.title = SITE_CONFIG.title;
  window.scrollTo(0, 0);
}

/* ===== 文章详情 ===== */
function renderArticle(slug) {
  var post = null;
  for (var i = 0; i < SITE_CONFIG.posts.length; i++) {
    if (SITE_CONFIG.posts[i].slug === slug && SITE_CONFIG.posts[i].published) {
      post = SITE_CONFIG.posts[i];
      break;
    }
  }
  if (!post) {
    render404();
    return;
  }

  app.innerHTML = renderLoading();

  fetch(SITE_CONFIG.baseUrl + 'posts/' + slug + '.md')
    .then(function (res) {
      if (!res.ok) throw new Error('Not found');
      return res.text();
    })
    .then(function (md) {
      var html = '<div class="container container--narrow">';
      html += '<article class="article-detail">';

      // 面包屑
      html += '<div class="article-breadcrumb">';
      html += '  <a href="#/" class="back-link">&larr; 返回首页</a>';
      html += '  <div class="breadcrumb-path">';
      html += '    <span>首页</span><span class="breadcrumb-sep">/</span>';
      if (post.category) html += '<span>' + escapeHtml(post.category) + '</span><span class="breadcrumb-sep">/</span>';
      html += '    <span class="breadcrumb-current">' + escapeHtml(post.title) + '</span>';
      html += '  </div>';
      html += '</div>';

      // 标题
      html += '<h1 class="article-title">' + escapeHtml(post.title) + '</h1>';

      // 元信息
      html += '<div class="article-meta">';
      html += '  <span class="article-meta-item article-meta-item--author">' + escapeHtml(SITE_CONFIG.author) + '</span>';
      html += '  <span class="meta-separator">|</span>';
      html += '  <span class="article-meta-item">' + formatDate(post.date) + '</span>';
      html += '  <span class="meta-separator">|</span>';
      html += '  <span class="article-meta-item">' + estimateReadingTime(md) + '</span>';
      html += '</div>';

      // 正文
      html += '<div class="article-content">' + marked.parse(md) + '</div>';

      // 标签
      if (post.tags && post.tags.length) {
        html += '<div class="article-tags">';
        html += '  <span class="article-tags-label">标签：</span>';
        for (var k = 0; k < post.tags.length; k++) {
          html += '<a href="#/?tag=' + encodeURIComponent(post.tags[k]) + '" class="tag">#' + escapeHtml(post.tags[k]) + '</a>';
        }
        html += '</div>';
      }

      html += '</article>';
      html += '</div>';

      app.innerHTML = html;
      document.title = post.title + ' - ' + SITE_CONFIG.title;
      window.scrollTo(0, 0);
      // 高亮失败绝不能影响文章显示（若抛错会落入 .catch 把整页换成错误页）
      try {
        if (window.hljs) hljs.highlightAll();
      } catch (e) { /* 忽略高亮错误，文章照常显示 */ }
    })
    .catch(function () {
      renderLoadError();
    });
}

/* ===== 关于 ===== */
function renderAbout() {
  app.innerHTML = renderLoading();

  fetch(SITE_CONFIG.baseUrl + 'about.md')
    .then(function (res) {
      if (!res.ok) throw new Error('Not found');
      return res.text();
    })
    .then(function (md) {
      var html = '<div class="container container--narrow">';
      html += '<article class="article-detail">';
      html += '<div class="article-content">' + marked.parse(md) + '</div>';
      html += '</article>';
      html += '</div>';

      app.innerHTML = html;
      document.title = '关于 - ' + SITE_CONFIG.title;
      window.scrollTo(0, 0);
    })
    .catch(function () {
      renderLoadError();
    });
}

/* ===== 加载失败提示 ===== */
function renderLoadError() {
  if (window.location.protocol === 'file:') {
    // file:// 协议下浏览器禁止 fetch 本地 Markdown，给出明确指引
    app.innerHTML =
      '<div class="container container--narrow">' +
      '  <div class="error-page">' +
      '    <div class="error-code">提示</div>' +
      '    <p class="error-text">直接双击打开 HTML 文件时，浏览器会禁止加载本地 Markdown 内容。</p>' +
      '    <p class="error-text" style="font-size:13px;">请双击项目根目录的 <b>start.bat</b> 启动本地预览，' +
      '或手动运行 <b>node server.js</b> 后访问 http://localhost:8000</p>' +
      '    <a href="#/" class="error-link">返回首页</a>' +
      '  </div>' +
      '</div>';
    document.title = '提示 - ' + SITE_CONFIG.title;
    window.scrollTo(0, 0);
  } else {
    render404();
  }
}

/* ===== 404 ===== */
function render404() {
  app.innerHTML =
    '<div class="container container--narrow">' +
    '  <div class="error-page">' +
    '    <div class="error-code">404</div>' +
    '    <p class="error-text">抱歉，你要找的页面不存在。</p>' +
    '    <a href="#/" class="error-link">返回首页</a>' +
    '  </div>' +
    '</div>';
  document.title = '404 - ' + SITE_CONFIG.title;
  window.scrollTo(0, 0);
}
