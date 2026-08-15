/*
 * 极简 hash 路由器
 * 路由格式：#/ 、#/home 、#/?tag=xxx 、#/article/<slug> 、#/about
 */
var Router = (function () {
  var routes = [];

  function addRoute(pattern, handler) {
    routes.push({ pattern: pattern, handler: handler });
  }

  function navigate() {
    var hash = window.location.hash || '#/';
    for (var i = 0; i < routes.length; i++) {
      var match = hash.match(routes[i].pattern);
      if (match) {
        routes[i].handler(match[1]);
        updateActiveNav(hash);
        return;
      }
    }
    if (typeof render404 === 'function') {
      render404();
    }
  }

  function updateActiveNav(hash) {
    var links = document.querySelectorAll('.nav-link');
    for (var i = 0; i < links.length; i++) {
      links[i].classList.remove('active');
    }
    var activePage = '';
    if (hash === '#/' || hash === '#/home' || hash === '' || hash === '#' || hash.match(/^#\/\?tag=/)) {
      activePage = 'home';
    } else if (hash === '#/about') {
      activePage = 'about';
    }
    if (activePage) {
      var activeLink = document.querySelector('.nav-link[data-page="' + activePage + '"]');
      if (activeLink) activeLink.classList.add('active');
    }

    // Close mobile menu on navigation
    var menu = document.getElementById('navMenu');
    if (menu) menu.classList.remove('open');
  }

  function start() {
    window.addEventListener('hashchange', navigate);
    navigate();
  }

  return {
    addRoute: addRoute,
    start: start
  };
})();
