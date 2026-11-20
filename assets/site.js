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

/* ==========================================================
   年度时间进度（首页）  ·  每秒刷新，精确到秒
   ========================================================== */
(function () {
  var pctEl = document.getElementById('ypPct');
  if (!pctEl) return;
  var fill  = document.getElementById('ypFill');
  var left  = document.getElementById('ypLeft');
  var right = document.getElementById('ypRight');

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function tick() {
    var now   = new Date();
    var y     = now.getFullYear();
    var start = new Date(y, 0, 1);
    var end   = new Date(y + 1, 0, 1);
    var gone  = now - start;
    var total = end - start;
    var pct   = gone / total * 100;

    /* 大字百分比：5 位小数，肉眼可见地每几秒跳动一次 */
    pctEl.innerHTML = pct.toFixed(5) + '<span class="u">%</span>';

    /* 左下：已过百分比 + 周数 */
    var week = Math.min(52, Math.floor(gone / (7 * 86400000)) + 1);
    left.innerHTML = '<b>' + y + '</b> 年已过 <b>' + pct.toFixed(1) +
      '%</b> · 第 <b>' + week + '</b> 周 / 共 52 周';

    /* 右下：距明年倒计时 */
    var rest  = end - now;
    var d = Math.floor(rest / 86400000);
    var h = Math.floor(rest % 86400000 / 3600000);
    var m = Math.floor(rest % 3600000 / 60000);
    right.innerHTML = '距 <b>' + (y + 1) + '</b> 年还有 <b>' + d +
      '</b> 天 <b>' + pad(h) + '</b> 小时 <b>' + pad(m) + '</b> 分';

    /* 进度条 */
    if (fill) fill.style.width = Math.min(100, pct).toFixed(4) + '%';
  }

  tick();
  setInterval(tick, 1000);
})();
