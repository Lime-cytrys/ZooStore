document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ========== Іконки (Lucide) ========== */
  const ICONS = {
    'paw-print': '<circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/><path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    'chevron-right': '<path d="m9 18 6-6-6-6"/>',
    'arrow-up-right': '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>',
    package: '<path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
    ball: '<circle cx="12" cy="12" r="10"/><path d="M5.2 4.6c3.6 1.6 5.8 4.5 6.3 8.4"/><path d="M18.8 19.4c-3.6-1.6-5.8-4.5-6.3-8.4"/>',
    home: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    message: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
    sparkles: '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>'
  };
  const icon = (name, cls = '') =>
    `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;
  const fillIcons = (root = document) =>
    root.querySelectorAll('i[data-icon]').forEach(el => el.replaceWith(
      Object.assign(document.createElement('span'), { innerHTML: icon(el.dataset.icon) }).firstElementChild
    ));

  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const money = n => `${Number(n).toLocaleString('uk-UA')} ₴`;
  const plural = (n, [one, few, many]) => {
    const a = Math.abs(n) % 100, b = a % 10;
    return a > 10 && a < 20 ? many : b > 1 && b < 5 ? few : b === 1 ? one : many;
  };

  /* ========== Конфіг сторінок ========== */
  const PAGE = document.body.dataset.page; // animals | goods | toys
  const KINDS = {
    animals: { source: 'data.json',  forms: ['тварина', 'тварини', 'тварин'],     noun: 'тварин' },
    goods:   { source: 'data1.json', forms: ['товар', 'товари', 'товарів'],       noun: 'товарів' },
    toys:    { source: 'data2.json', forms: ['іграшка', 'іграшки', 'іграшок'],    noun: 'іграшок' }
  };
  const KIND = KINDS[PAGE];

  /* ========== Шапка та підвал ========== */
  const NAV = [
    { id: 'animals', href: 'index.html',  label: 'Тварини',            icon: 'paw-print' },
    { id: 'goods',   href: 'index1.html', label: 'Зоотовари',          icon: 'package' },
    { id: 'toys',    href: 'index2.html', label: 'Іграшки для тварин', icon: 'ball' }
  ];

  const headerEl = document.getElementById('site-header');
  if (headerEl) {
    headerEl.innerHTML = `
      <div class="topbar"><div class="wrap">
        <b>ЩАСЛИВИЙ ХВІСТ — ЩАСЛИВИЙ ТИ</b>
        <span>Безкоштовна доставка замовлень від 1 500 ₴</span>
      </div></div>
      <header class="header"><div class="wrap">
        <div class="header-main">
          <a class="logo" href="index.html" aria-label="Хвіст — на головну">${icon('paw-print')}хвіст.</a>
          <label class="search" id="search-box">
            ${icon('search')}
            <input id="search" type="search" placeholder="Що потішить вашого улюбленця?" autocomplete="off" aria-label="Пошук">
            <button type="button" class="clear" id="search-clear" aria-label="Очистити пошук">${icon('x')}</button>
            <kbd>⌘ K</kbd>
          </label>
          <div class="header-actions">
            <button class="fav-btn" id="fav-toggle" type="button" aria-pressed="false" title="Показати лише обрані">
              ${icon('heart')}<span class="fav-label">Обрані</span><span class="fav-count" id="fav-count" data-n="0"></span>
            </button>
          </div>
        </div>
        <nav class="nav" aria-label="Основна навігація">
          <div class="nav-main">
            ${NAV.map(n => `<a href="${n.href}" ${n.id === PAGE ? 'aria-current="page"' : ''}>${icon(n.icon)}${n.label}</a>`).join('')}
          </div>
          <div class="nav-side">
            <a href="#guide">Гід із турботи</a>
            <a class="nav-phone" href="tel:+380800334567">${icon('phone')}<span>0 800 33 45 67</span></a>
          </div>
        </nav>
      </div></header>`;
  }

  const footerEl = document.getElementById('site-footer');
  if (footerEl) {
    footerEl.innerHTML = `
      <footer class="footer"><div class="wrap">
        <div class="footer-grid">
          <div>
            <div class="logo">${icon('paw-print')}хвіст.</div>
            <p class="footer-about">Місце, де маленькі лапи, крила та плавці знаходять велику турботу.</p>
          </div>
          <div>
            <h4>Для улюбленця</h4>
            <ul>
              ${NAV.map(n => `<li><a href="${n.href}">${n.label}</a></li>`).join('')}
              <li class="soft">Новинки</li>
            </ul>
          </div>
          <div>
            <h4>Для вас</h4>
            <ul>
              <li class="soft">Доставка й оплата</li>
              <li class="soft">Обмін і повернення</li>
              <li class="soft">Програма лояльності</li>
              <li class="soft">Питання та відповіді</li>
            </ul>
          </div>
          <div>
            <h4>Ми поруч</h4>
            <ul>
              <li><a href="tel:+380800334567">0 800 33 45 67</a></li>
              <li>Щодня, 9:00–20:00</li>
              <li>Кривий Ріг</li>
              <li><a href="mailto:hello@khvist.ua">hello@khvist.ua</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2026 Хвіст. Створено з любов’ю до тварин.</span>
          <span>Політика конфіденційності</span>
          <span>VISA &nbsp; Mastercard &nbsp; Apple Pay</span>
        </div>
      </div></footer>`;
  }

  fillIcons();

  /* ========== Каталог ========== */
  const grid = document.getElementById('products');
  if (!grid || !KIND) return;

  const countEl = document.getElementById('count');
  const searchEl = document.getElementById('search');
  const searchBox = document.getElementById('search-box');
  const favToggle = document.getElementById('fav-toggle');
  const favCountEl = document.getElementById('fav-count');
  const chipsEl = document.getElementById('chips');
  const dialog = document.getElementById('details');

  let products = [];
  let activeCategory = 'all';
  let query = '';
  let favsOnly = false;

  // Обрані зберігаємо в localStorage (якщо він доступний)
  const FAV_KEY = 'khvist:favs';
  const favs = new Set();
  try { JSON.parse(localStorage.getItem(FAV_KEY) || '[]').forEach(k => favs.add(k)); } catch (_) {}
  const saveFavs = () => { try { localStorage.setItem(FAV_KEY, JSON.stringify([...favs])); } catch (_) {} };
  const favKey = p => `${PAGE}:${p.id}`;
  const isFav = p => favs.has(favKey(p));

  const FALLBACK_IMG = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#284a2d" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' + ICONS['paw-print'] + '</svg>'
  );

  // ---- Дані ----
  async function fetchProducts() {
    showState('<b>Завантажуємо…</b>Лише мить');
    try {
      const response = await fetch(KIND.source);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      products = await response.json();
      render();
    } catch (err) {
      console.error(err);
      const local = location.protocol === 'file:';
      showState(local
        ? `<b>Не вдалося завантажити ${esc(KIND.source)}</b>Браузер не дозволяє читати JSON із файлу напряму. Запустіть сайт через локальний сервер, наприклад <code>python -m http.server</code> або Live Server у VS Code.`
        : `<b>Не вдалося завантажити дані</b>Перевірте, що файл ${esc(KIND.source)} лежить поруч зі сторінкою.<br><button type="button" id="retry">Спробувати ще раз</button>`);
      document.getElementById('retry')?.addEventListener('click', fetchProducts);
    }
  }

  function showState(html) { grid.innerHTML = `<div class="state">${html}</div>`; }

  // ---- Відбір ----
  function visibleProducts() {
    const q = query.trim().toLowerCase();
    return products.filter(p => {
      if (activeCategory !== 'all' && !(p.categories || []).includes(activeCategory)) return false;
      if (favsOnly && !isFav(p)) return false;
      if (!q) return true;
      return [p.title, p.description, p.eyebrow, ...(p.categories || [])].join(' ').toLowerCase().includes(q);
    });
  }

  // ---- Відображення ----
  function render() {
    const list = visibleProducts();
    countEl.textContent = `${list.length} ${plural(list.length, KIND.forms)}`;
    updateFavCount();

    if (!list.length) {
      showState(`<b>Нічого не знайдено</b>Спробуйте змінити запит або фільтр.<br><button type="button" id="reset">Скинути фільтри</button>`);
      document.getElementById('reset').addEventListener('click', resetFilters);
      return;
    }
    grid.innerHTML = list.map(createProductCard).join('');
  }

  function createProductCard(p) {
    const meta = PAGE === 'animals'
      ? `${esc(p.age)} міс. / живе ${esc(p.live)}`
      : esc(p.eyebrow || '');
    const rating = p.rating
      ? `<span class="rating">${icon('star')}${Number(p.rating).toFixed(1)} (${esc(p.reviews)})</span>` : '';
    const fav = isFav(p);
    return `
      <article class="card" data-id="${esc(p.id)}" tabindex="0" role="button" aria-label="${esc(p.title)} — детальніше">
        <div class="card-media">
          <img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy" referrerpolicy="no-referrer">
          ${p.badge ? `<span class="badge">${esc(p.badge)}</span>` : ''}
          <button class="heart" type="button" data-fav="${esc(p.id)}" aria-pressed="${fav}" aria-label="${fav ? 'Прибрати з обраних' : 'Додати в обрані'}">${icon('heart')}</button>
        </div>
        <div class="card-body">
          <div class="card-top"><span class="card-eyebrow">${meta}</span>${rating}</div>
          <h3>${esc(p.title)}</h3>
          <p class="card-desc">${esc(p.description)}</p>
          <div class="price-row">
            <span class="price">${money(p.price)}</span>
            ${p.oldPrice ? `<span class="old-price">${money(p.oldPrice)}</span>` : ''}
          </div>
        </div>
      </article>`;
  }

  // Якщо картинка не завантажилась — показуємо заглушку
  document.addEventListener('error', e => {
    const img = e.target;
    if (img.tagName === 'IMG' && img.closest('.card-media, .modal-media') && !img.classList.contains('is-fallback')) {
      img.classList.add('is-fallback');
      img.src = FALLBACK_IMG;
    }
  }, true);

  // ---- Обрані ----
  function toggleFav(id) {
    const p = products.find(x => String(x.id) === String(id));
    if (!p) return;
    const k = favKey(p);
    favs.has(k) ? favs.delete(k) : favs.add(k);
    saveFavs();
    render();
  }
  function updateFavCount() {
    const n = products.filter(isFav).length;
    favCountEl.textContent = n || '';
    favCountEl.dataset.n = n;
  }

  // ---- Деталі ----
  function openDetails(id) {
    const p = products.find(x => String(x.id) === String(id));
    if (!p || !dialog) return;
    const facts = PAGE === 'animals'
      ? [['Вік', `${p.age} міс.`], ['Тривалість життя', p.live], ['Група', (p.categories || []).join(', ')]]
      : [['Категорія', (p.categories || []).join(', ')], ['Рейтинг', p.rating ? `${Number(p.rating).toFixed(1)} (${p.reviews} відгуків)` : '—']];
    const fav = isFav(p);
    dialog.innerHTML = `
      <button class="modal-close" type="button" data-close aria-label="Закрити">${icon('x')}</button>
      <div class="modal">
        <div class="modal-media"><img src="${esc(p.image)}" alt="${esc(p.title)}" referrerpolicy="no-referrer"></div>
        <div class="modal-body">
          <span class="card-eyebrow">${PAGE === 'animals' ? 'Знайомство в магазині' : esc(p.eyebrow || '')}</span>
          <h3>${esc(p.title)}</h3>
          <p class="card-desc">${esc(p.description)}</p>
          <ul class="facts">${facts.map(([k, v]) => `<li><span>${esc(k)}</span><b>${esc(v)}</b></li>`).join('')}</ul>
          <div class="price-row">
            <span class="price">${money(p.price)}</span>
            ${p.oldPrice ? `<span class="old-price">${money(p.oldPrice)}</span>` : ''}
          </div>
          <div class="modal-actions">
            <a class="btn" href="tel:+380800334567">${icon('phone')}Уточнити наявність</a>
            <button class="btn ghost" type="button" data-fav-modal="${esc(p.id)}" aria-pressed="${fav}">${icon('heart')}${fav ? 'В обраних' : 'В обрані'}</button>
          </div>
        </div>
      </div>`;
    dialog.showModal();
  }

  // ---- Події ----
  grid.addEventListener('click', e => {
    const heart = e.target.closest('[data-fav]');
    if (heart) { e.stopPropagation(); toggleFav(heart.dataset.fav); return; }
    const card = e.target.closest('.card');
    if (card) openDetails(card.dataset.id);
  });
  grid.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('card')) {
      e.preventDefault();
      openDetails(e.target.dataset.id);
    }
  });

  dialog?.addEventListener('click', e => {
    if (e.target === dialog || e.target.closest('[data-close]')) { dialog.close(); return; }
    const f = e.target.closest('[data-fav-modal]');
    if (f) {
      toggleFav(f.dataset.favModal);
      const p = products.find(x => String(x.id) === String(f.dataset.favModal));
      f.setAttribute('aria-pressed', isFav(p));
      f.lastChild.textContent = isFav(p) ? 'В обраних' : 'В обрані';
    }
  });

  chipsEl?.addEventListener('click', e => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    activeCategory = chip.dataset.filter;
    chipsEl.querySelectorAll('.chip').forEach(c => c.setAttribute('aria-pressed', c === chip));
    render();
  });

  searchEl.addEventListener('input', () => {
    query = searchEl.value;
    searchBox.classList.toggle('has-value', !!query);
    render();
  });
  document.getElementById('search-clear').addEventListener('click', () => {
    searchEl.value = ''; query = ''; searchBox.classList.remove('has-value'); searchEl.focus(); render();
  });
  searchEl.addEventListener('keydown', e => { if (e.key === 'Escape') searchEl.blur(); });
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); searchEl.focus(); searchEl.select(); }
  });

  favToggle.addEventListener('click', () => {
    favsOnly = !favsOnly;
    favToggle.setAttribute('aria-pressed', favsOnly);
    render();
  });

  function resetFilters() {
    activeCategory = 'all'; query = ''; favsOnly = false;
    searchEl.value = ''; searchBox.classList.remove('has-value');
    favToggle.setAttribute('aria-pressed', false);
    chipsEl?.querySelectorAll('.chip').forEach(c => c.setAttribute('aria-pressed', c.dataset.filter === 'all'));
    render();
  }

  fetchProducts();
});
