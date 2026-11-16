/* ==========================================================
   万里长城 · 共享脚本  assets/site.js
   ========================================================== */
(function () {
  /* ---------- 星空 ---------- */
  var box = document.getElementById('stars');
  if (box) {
    for (var i = 0; i < 130; i++) {
      var s = document.createElement('div');
      s.className = 'star';
      var size = (Math.random() * 1.8 + 0.6).toFixed(2);
      s.style.cssText =
        'left:' + (Math.random() * 100).toFixed(2) + '%;' +
        'top:' + (Math.random() * 92).toFixed(2) + '%;' +
        'width:' + size + 'px;height:' + size + 'px;' +
        'animation-delay:' + (Math.random() * 4).toFixed(2) + 's;' +
        'opacity:' + (0.2 + Math.random() * 0.7).toFixed(2);
      box.appendChild(s);
    }
  }

  /* ---------- 导航滚动态 + 回到顶部 ---------- */
  var nav = document.getElementById('nav');
  var toTop = document.getElementById('toTop');

  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    if (nav) nav.classList.toggle('scrolled', y > 8);
    if (toTop) toTop.classList.toggle('show', y > 500);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- 年度进度 ---------- */
  var yearProgress = document.getElementById('yearProgress');
  if (yearProgress) {
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 1);
    var end = new Date(now.getFullYear() + 1, 0, 1);
    var pct = Math.round((now - start) / (end - start) * 100);
    document.getElementById('yearLabel').textContent = now.getFullYear() + ' 年度';
    document.getElementById('yearPercent').textContent = pct + '%';
    setTimeout(function () { yearProgress.style.width = pct + '%'; }, 260);
  }

  /* ---------- 滚动入场 ---------- */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && items.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el, i) {
      el.style.transitionDelay = (i % 5) * 70 + 'ms';
      io.observe(el);
    });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }
})();
