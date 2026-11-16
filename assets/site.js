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
   换肤面板（预览阶段存在，定稿后可整段删除）
   主题通过 <html data-theme="minimal|dark|classic"> 生效
   ========================================================== */
(function () {
  var KEY = 'wlgc-theme';
  var root = document.documentElement;
  var THEMES = [
    { id: 'minimal', name: '极简白', desc: '暖灰背景 · 深砖红字', bg: '#f4f2ee', accent: '#8a3a2b', text: '#6b3f33' },
    { id: 'dark',    name: '暗黑风', desc: '深黑背景 · 橙色点缀', bg: '#0d0e12', accent: '#ff7a3d', text: '#eae7e1' },
    { id: 'classic', name: '古典青', desc: '青灰背景 · 朱砂红',   bg: '#e9ede9', accent: '#a8382c', text: '#2a3a33' }
  ];

  function getTheme() {
    return root.getAttribute('data-theme') || localStorage.getItem(KEY) || 'minimal';
  }

  function sync() {
    var cur = getTheme();
    var opts = document.querySelectorAll('.skin-opt');
    for (var i = 0; i < opts.length; i++) {
      opts[i].classList.toggle('active', opts[i].getAttribute('data-theme') === cur);
    }
  }

  function apply(id, animate) {
    root.setAttribute('data-theme', id);
    try { localStorage.setItem(KEY, id); } catch (e) {}
    if (animate) {
      root.classList.add('skin-anim');
      setTimeout(function () { root.classList.remove('skin-anim'); }, 460);
    }
    sync();
  }

  /* ---------- 构建面板 ---------- */
  var box = document.createElement('div');
  box.className = 'skin';
  box.innerHTML =
    '<button class="skin-toggle" type="button" aria-expanded="false">' +
      '<span class="dot"></span><span class="lbl">换肤预览</span>' +
    '</button>' +
    '<div class="skin-panel" role="dialog" aria-label="选择配色">' +
      '<div class="title">一键换肤</div>' +
      '<div class="tip">随手点着看，选好后告诉我，我把选中的设为默认。</div>' +
      '<div class="opts"></div>' +
    '</div>';

  var optsWrap = box.querySelector('.opts');
  THEMES.forEach(function (t) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'skin-opt';
    b.setAttribute('data-theme', t.id);
    b.innerHTML =
      '<span class="sw" style="background:' + t.bg + '">' +
        '<i style="position:absolute;left:0;right:0;bottom:0;height:42%;background:' + t.accent + '"></i>' +
        '<i style="position:absolute;left:6px;top:6px;width:9px;height:9px;border-radius:50%;background:' + t.text + '"></i>' +
      '</span>' +
      '<span class="txt"><span class="nm">' + t.name + '</span>' +
      '<span class="ds">' + t.desc + '</span></span>' +
      '<span class="ck">✓</span>';
    b.addEventListener('click', function () { apply(t.id, true); });
    optsWrap.appendChild(b);
  });

  document.body.appendChild(box);

  var toggle = box.querySelector('.skin-toggle');
  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    var open = box.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  box.addEventListener('click', function (e) { e.stopPropagation(); });
  document.addEventListener('click', function () {
    box.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      box.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  sync();
})();
