var currentSearch = '';
var currentTag = '';

/* 导航栏搜索：输入即过滤并跳回首页 */
function handleSearch(query) {
  currentSearch = query;
  if (window.location.hash === '#/' || window.location.hash === '' || window.location.hash === '#') {
    renderHome({ search: currentSearch, tag: currentTag });
  } else {
    window.location.hash = '#/';
  }
}

/* 移动端菜单 */
function toggleMobileMenu() {
  var menu = document.getElementById('navMenu');
  if (menu) menu.classList.toggle('open');
}

/* 回到顶部按钮显隐 */
window.addEventListener('scroll', function () {
  var btn = document.getElementById('backToTop');
  if (btn) {
    if (window.scrollY > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }
});

(function () {
  // marked 配置
  if (window.marked) {
    marked.use({ breaks: true, gfm: true });
  }

  Router.addRoute(/^#\/$/, function () {
    currentTag = '';
    renderHome({ search: currentSearch, tag: currentTag });
  });
  Router.addRoute(/^#\/\?tag=(.+)$/, function (tag) {
    currentTag = decodeURIComponent(tag);
    renderHome({ search: currentSearch, tag: currentTag });
  });
  Router.addRoute(/^#\/home$/, function () {
    currentTag = '';
    renderHome({ search: currentSearch, tag: currentTag });
  });
  Router.addRoute(/^#\/article\/(.+)$/, renderArticle);
  Router.addRoute(/^#\/about$/, renderAbout);

  // 解析初始 URL 中的标签参数
  var hash = window.location.hash || '#/';
  var tagMatch = hash.match(/^#\/\?tag=(.+)$/);
  if (tagMatch) {
    currentTag = decodeURIComponent(tagMatch[1]);
  }

  Router.start();
})();
