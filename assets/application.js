/* =======================================================================
   Kymra Lighting — Shopify theme JS
   ======================================================================= */
(function () {
  'use strict';

  const routes = (window.theme && window.theme.routes) || {};
  const strings = (window.theme && window.theme.strings) || {};
  const currency = (window.theme && window.theme.shopCurrency) || 'GBP';

  function formatMoney(cents) {
    try {
      return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency,
        minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
        maximumFractionDigits: 2
      }).format(cents / 100);
    } catch (e) {
      return '£' + (cents / 100).toFixed(2);
    }
  }
  window.theme.formatMoney = formatMoney;

  // ====================================================================
  // Reveal on scroll
  // ====================================================================
  function initReveals() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.18 }
    );
    els.forEach((el) => io.observe(el));
  }

  // ====================================================================
  // Header — scrolled state
  // ====================================================================
  function initHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    let last = 0;
    function update() {
      const y = window.scrollY;
      header.classList.toggle('is-scrolled', y > 40);
      last = y;
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  // ====================================================================
  // Nav dropdowns
  // ====================================================================
  function initDropdowns() {
    const items = document.querySelectorAll('[data-nav-item][data-dropdown]');
    let openItem = null;
    let hoverTimeout = null;

    function openItemMenu(item) {
      if (openItem && openItem !== item) closeItemMenu(openItem);
      item.classList.add('is-open');
      const trigger = item.querySelector('.nav-link');
      if (trigger) trigger.setAttribute('aria-expanded', 'true');
      openItem = item;
    }
    function closeItemMenu(item) {
      item.classList.remove('is-open');
      const trigger = item.querySelector('.nav-link');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
      if (openItem === item) openItem = null;
    }

    items.forEach((item) => {
      const trigger = item.querySelector('.nav-link');
      if (!trigger) return;

      trigger.setAttribute('aria-expanded', 'false');

      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        if (item.classList.contains('is-open')) {
          closeItemMenu(item);
        } else {
          openItemMenu(item);
        }
      });

      item.addEventListener('mouseenter', () => {
        if (hoverTimeout) clearTimeout(hoverTimeout);
        openItemMenu(item);
      });
      item.addEventListener('mouseleave', () => {
        hoverTimeout = setTimeout(() => closeItemMenu(item), 140);
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && openItem) {
        closeItemMenu(openItem);
      }
    });
    document.addEventListener('mousedown', (e) => {
      if (!openItem) return;
      if (!openItem.contains(e.target)) closeItemMenu(openItem);
    });
  }

  // ====================================================================
  // Mobile menu
  // ====================================================================
  function initMobileMenu() {
    const menu = document.querySelector('[data-mobile-menu]');
    if (!menu) return;
    const triggers = document.querySelectorAll('[data-open-mobile-menu]');
    const closers = menu.querySelectorAll('[data-close-mobile-menu]');
    function open() {
      menu.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      menu.classList.remove('is-open');
      document.body.style.overflow = '';
    }
    triggers.forEach((t) => t.addEventListener('click', open));
    closers.forEach((c) => c.addEventListener('click', close));
    menu.addEventListener('click', (e) => {
      if (e.target.classList.contains('mobile-menu__overlay')) close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) close();
    });

    // Nested category toggles
    menu.querySelectorAll('[data-mobile-toggle]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.mobile-nav__item');
        if (item) item.classList.toggle('is-open');
      });
    });
  }

  // ====================================================================
  // Cart drawer + Add to cart
  // ====================================================================
  let cartCache = null;

  function getCart() {
    return fetch(routes.cart_url + '.js', {
      credentials: 'same-origin',
      headers: { Accept: 'application/json' }
    }).then((r) => r.json());
  }

  function addToCart(items) {
    return fetch(routes.cart_add_url + '.js', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ items: Array.isArray(items) ? items : [items] })
    }).then((r) => r.json());
  }

  function updateCartLine(line, quantity) {
    return fetch(routes.cart_change_url + '.js', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ line, quantity })
    }).then((r) => r.json());
  }

  function renderCartDrawer(cart) {
    cartCache = cart;
    const drawer = document.querySelector('[data-cart-drawer]');
    if (!drawer) return;
    const body = drawer.querySelector('[data-cart-body]');
    const foot = drawer.querySelector('[data-cart-foot]');
    const countEls = document.querySelectorAll('[data-cart-count]');

    countEls.forEach((el) => {
      el.textContent = cart.item_count;
      el.classList.remove('is-pulse');
      // trigger reflow then add pulse class
      // eslint-disable-next-line no-unused-expressions
      void el.offsetWidth;
      el.classList.add('is-pulse');
    });

    if (!body || !foot) return;

    if (cart.item_count === 0) {
      body.innerHTML =
        '<div class="cart-empty">' +
        '  <p class="cart-empty__title">Your room is still waiting for its first glow.</p>' +
        '  <p class="cart-empty__body">Browse our chandeliers, pendants, and wall lights — selected for considered interiors.</p>' +
        '  <a class="btn btn--primary btn--lg" href="' +
        routes.cart_url.replace('/cart', '/collections/all') +
        '">Explore collections</a>' +
        '</div>';
      foot.innerHTML = '';
      return;
    }

    body.innerHTML = cart.items
      .map((item) => {
        const img = item.image
          ? '<img class="cart-line__image" src="' + item.image + '" alt="' + (item.product_title || '') + '">'
          : '';
        const variantLine =
          item.variant_title && item.variant_title !== 'Default Title'
            ? '<p class="cart-line__variant">' + item.variant_title + '</p>'
            : '';
        return (
          '<div class="cart-line" data-cart-line="' + item.key + '">' +
          '  <a href="' + item.url + '" class="cart-line__media">' + img + '</a>' +
          '  <div class="cart-line__main">' +
          '    <a class="cart-line__title" href="' + item.url + '">' + item.product_title + '</a>' +
          variantLine +
          '    <div class="cart-line__row">' +
          '      <div class="qty">' +
          '        <button class="qty__btn" data-qty-down aria-label="Decrease">' +
          '          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>' +
          '        </button>' +
          '        <span class="qty__value" data-qty-value>' + item.quantity + '</span>' +
          '        <button class="qty__btn" data-qty-up aria-label="Increase">' +
          '          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>' +
          '        </button>' +
          '      </div>' +
          '      <span class="cart-line__price">' + formatMoney(item.final_line_price) + '</span>' +
          '    </div>' +
          '  </div>' +
          '  <button class="cart-line__remove" data-cart-remove aria-label="Remove">' +
          '    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>' +
          '  </button>' +
          '</div>'
        );
      })
      .join('');

    foot.innerHTML =
      '<div class="drawer__subtotal-row">' +
      '  <span class="drawer__subtotal-label">Subtotal</span>' +
      '  <span class="drawer__subtotal-amount">' + formatMoney(cart.total_price) + '</span>' +
      '</div>' +
      '<p class="drawer__hint">Delivery and any custom finishes calculated at checkout.</p>' +
      '<div class="drawer__buttons">' +
      '  <a class="btn btn--primary btn--lg" href="/checkout">' +
      '    Checkout · ' + formatMoney(cart.total_price) +
      '    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>' +
      '  </a>' +
      '  <a class="btn btn--glass" data-close-cart href="' + routes.cart_url + '">View cart</a>' +
      '</div>';

    // Wire line item buttons
    body.querySelectorAll('.cart-line').forEach((line) => {
      const key = line.getAttribute('data-cart-line');
      const valueEl = line.querySelector('[data-qty-value]');
      const up = line.querySelector('[data-qty-up]');
      const down = line.querySelector('[data-qty-down]');
      const rm = line.querySelector('[data-cart-remove]');
      function setQty(q) {
        updateCartLine(key, q).then(renderCartDrawer);
      }
      if (up && valueEl)
        up.addEventListener('click', () => setQty(parseInt(valueEl.textContent, 10) + 1));
      if (down && valueEl)
        down.addEventListener('click', () =>
          setQty(Math.max(0, parseInt(valueEl.textContent, 10) - 1))
        );
      if (rm) rm.addEventListener('click', () => setQty(0));
    });

    // Close button on view cart link should close the drawer
    foot.querySelectorAll('[data-close-cart]').forEach((el) => {
      el.addEventListener('click', () => closeCart());
    });
  }

  function openCart() {
    const drawer = document.querySelector('[data-cart-drawer]');
    if (!drawer) return;
    drawer.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    getCart().then(renderCartDrawer);
  }
  function closeCart() {
    const drawer = document.querySelector('[data-cart-drawer]');
    if (!drawer) return;
    drawer.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  window.theme.openCart = openCart;
  window.theme.closeCart = closeCart;

  function initCart() {
    const drawer = document.querySelector('[data-cart-drawer]');
    if (drawer) {
      drawer.querySelectorAll('[data-close-cart]').forEach((c) =>
        c.addEventListener('click', closeCart)
      );
      drawer.addEventListener('click', (e) => {
        if (e.target.classList.contains('drawer__overlay')) closeCart();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeCart();
      });
    }
    document.querySelectorAll('[data-open-cart]').forEach((t) =>
      t.addEventListener('click', openCart)
    );
    // Initial cart count fetch
    getCart()
      .then((cart) => {
        document.querySelectorAll('[data-cart-count]').forEach((el) => {
          el.textContent = cart.item_count;
        });
      })
      .catch(() => {});

    // Add-to-cart forms (PDP) and product card add buttons
    document.querySelectorAll('form[data-product-form]').forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('[data-add-to-cart]');
        const formData = new FormData(form);
        const items = {
          id: formData.get('id'),
          quantity: parseInt(formData.get('quantity') || '1', 10)
        };
        if (btn) {
          btn.disabled = true;
          btn.classList.add('is-loading');
        }
        addToCart(items)
          .then(() => getCart())
          .then((cart) => {
            renderCartDrawer(cart);
            openCart();
            if (btn) {
              btn.disabled = false;
              btn.classList.remove('is-loading');
              const orig = btn.getAttribute('data-orig-label') || btn.textContent;
              btn.setAttribute('data-orig-label', orig);
              btn.textContent = strings.added || 'Added';
              setTimeout(() => {
                btn.textContent = orig;
              }, 1600);
            }
          })
          .catch(() => {
            if (btn) {
              btn.disabled = false;
              btn.classList.remove('is-loading');
            }
          });
      });
    });

    document.querySelectorAll('[data-quick-add]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const id = btn.getAttribute('data-variant-id');
        if (!id) return;
        addToCart({ id: parseInt(id, 10), quantity: 1 })
          .then(() => getCart())
          .then((cart) => {
            renderCartDrawer(cart);
            openCart();
          });
      });
    });
  }

  // ====================================================================
  // Variant selector (PDP)
  // ====================================================================
  function initVariantSelectors() {
    document.querySelectorAll('[data-variant-options]').forEach((wrap) => {
      const product = JSON.parse(wrap.getAttribute('data-product') || 'null');
      if (!product) return;
      const idInput = wrap.querySelector('[data-selected-variant]');
      const priceEl = document.querySelector('[data-variant-price]');
      const compareEl = document.querySelector('[data-variant-compare]');
      const buyBtn = document.querySelector('[data-add-to-cart]');
      const optionGroups = wrap.querySelectorAll('[data-option-index]');

      function pickVariant() {
        const selectedOptions = [];
        optionGroups.forEach((g) => {
          const idx = parseInt(g.getAttribute('data-option-index'), 10);
          const active = g.querySelector('.variant-pill.is-active');
          if (active) selectedOptions[idx] = active.getAttribute('data-value');
        });
        const variant = product.variants.find((v) => {
          return v.options.every((opt, i) => opt === selectedOptions[i]);
        });
        if (variant) {
          if (idInput) idInput.value = variant.id;
          if (priceEl) priceEl.textContent = formatMoney(variant.price);
          if (compareEl) {
            if (variant.compare_at_price && variant.compare_at_price > variant.price) {
              compareEl.textContent = formatMoney(variant.compare_at_price);
              compareEl.style.display = '';
            } else {
              compareEl.style.display = 'none';
            }
          }
          if (buyBtn) {
            buyBtn.disabled = !variant.available;
            buyBtn.textContent = variant.available
              ? strings.addToCart || 'Add to cart'
              : 'Sold out';
          }
        }
      }

      optionGroups.forEach((g) => {
        g.querySelectorAll('.variant-pill').forEach((pill) => {
          pill.addEventListener('click', () => {
            g.querySelectorAll('.variant-pill').forEach((p) => p.classList.remove('is-active'));
            pill.classList.add('is-active');
            pickVariant();
          });
        });
      });
    });
  }

  // ====================================================================
  // Quantity selectors (PDP, cart page)
  // ====================================================================
  function initQty() {
    document.querySelectorAll('[data-qty-control]').forEach((wrap) => {
      const input = wrap.querySelector('input[type="number"]');
      const up = wrap.querySelector('[data-qty-up]');
      const down = wrap.querySelector('[data-qty-down]');
      if (!input) return;
      function clamp(v) {
        const min = parseInt(input.getAttribute('min') || '1', 10);
        const max = parseInt(input.getAttribute('max') || '99', 10);
        return Math.max(min, Math.min(max, v));
      }
      if (up)
        up.addEventListener('click', () => {
          input.value = clamp(parseInt(input.value || '1', 10) + 1);
          input.dispatchEvent(new Event('change', { bubbles: true }));
        });
      if (down)
        down.addEventListener('click', () => {
          input.value = clamp(parseInt(input.value || '1', 10) - 1);
          input.dispatchEvent(new Event('change', { bubbles: true }));
        });
    });
  }

  // ====================================================================
  // Search dialog (Predictive Search)
  // ====================================================================
  function initSearch() {
    const dlg = document.querySelector('[data-search-dialog]');
    if (!dlg) return;
    const input = dlg.querySelector('[data-search-input]');
    const body = dlg.querySelector('[data-search-body]');
    let timer = null;

    function open() {
      dlg.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      setTimeout(() => input && input.focus(), 80);
    }
    function close() {
      dlg.classList.remove('is-open');
      document.body.style.overflow = '';
      if (input) input.value = '';
      if (body) renderEmpty();
    }
    function renderEmpty() {
      if (!body) return;
      body.innerHTML =
        '<div class="search-dialog__suggest">' +
        '  <p class="eyebrow" style="padding:8px 12px">Try searching</p>' +
        '  <div style="display:flex;flex-wrap:wrap;gap:8px;padding:0 12px 12px">' +
        ['Chandelier', 'Brass', 'Smoked glass', 'Outdoor', 'Bedside', 'Switches']
          .map(
            (q) =>
              '<button data-suggest="' + q + '" class="variant-pill" type="button">' + q + '</button>'
          )
          .join('') +
        '  </div>' +
        '</div>';
      body.querySelectorAll('[data-suggest]').forEach((b) =>
        b.addEventListener('click', () => {
          if (input) {
            input.value = b.getAttribute('data-suggest');
            input.dispatchEvent(new Event('input'));
          }
        })
      );
    }
    function performSearch(q) {
      if (!q || q.length < 2) {
        renderEmpty();
        return;
      }
      const url =
        routes.predictive_search_url +
        '.json?q=' +
        encodeURIComponent(q) +
        '&resources[type]=product,collection,page,article&resources[limit]=6';
      fetch(url, { credentials: 'same-origin' })
        .then((r) => r.json())
        .then((data) => {
          const r = (data && data.resources && data.resources.results) || {};
          const products = r.products || [];
          const collections = r.collections || [];
          const html = [];
          if (products.length) {
            html.push('<p class="eyebrow" style="padding:8px 12px">Products</p>');
            products.forEach((p) => {
              html.push(
                '<a class="search-result" href="' + p.url + '">' +
                  '<span class="search-result__title">' + p.title + '</span>' +
                  '<span class="search-result__sub">' + (p.price ? formatMoney(p.price) : '') + '</span>' +
                  '</a>'
              );
            });
          }
          if (collections.length) {
            html.push('<p class="eyebrow" style="padding:12px 12px 8px">Collections</p>');
            collections.forEach((c) => {
              html.push(
                '<a class="search-result" href="' + c.url + '">' +
                  '<span class="search-result__title">' + c.title + '</span>' +
                  '</a>'
              );
            });
          }
          if (!products.length && !collections.length) {
            html.push(
              '<div style="padding:48px 24px;text-align:center"><p class="font-display" style="font-size:22px">Nothing matches "' +
                q.replace(/</g, '&lt;') +
                '"</p><p style="margin-top:8px;color:var(--color-cream-muted);font-size:13px">Try another keyword.</p></div>'
            );
          }
          body.innerHTML = html.join('');
        })
        .catch(() => {
          renderEmpty();
        });
    }

    document.querySelectorAll('[data-open-search]').forEach((b) =>
      b.addEventListener('click', open)
    );
    dlg.querySelectorAll('[data-close-search]').forEach((b) =>
      b.addEventListener('click', close)
    );
    dlg.addEventListener('click', (e) => {
      if (e.target.classList.contains('search-dialog__overlay')) close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && dlg.classList.contains('is-open')) close();
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (dlg.classList.contains('is-open')) close();
        else open();
      }
    });
    if (input) {
      input.addEventListener('input', () => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => performSearch(input.value.trim()), 180);
      });
    }
    renderEmpty();
  }

  // ====================================================================
  // Accordion
  // ====================================================================
  function initAccordions() {
    document.querySelectorAll('[data-accordion]').forEach((acc) => {
      acc.querySelectorAll('[data-accordion-trigger]').forEach((trig) => {
        trig.addEventListener('click', () => {
          const item = trig.closest('.accordion__item');
          if (!item) return;
          const expanded = item.getAttribute('aria-expanded') === 'true';
          if (acc.getAttribute('data-accordion') === 'single') {
            acc.querySelectorAll('.accordion__item').forEach((i) =>
              i.setAttribute('aria-expanded', 'false')
            );
          }
          item.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        });
      });
    });
  }

  // ====================================================================
  // Product gallery thumbs
  // ====================================================================
  function initGallery() {
    const gallery = document.querySelector('[data-gallery]');
    if (!gallery) return;
    const main = gallery.querySelector('[data-gallery-main]');
    const thumbs = gallery.querySelectorAll('[data-gallery-thumb]');
    thumbs.forEach((t) => {
      t.addEventListener('click', () => {
        thumbs.forEach((x) => x.classList.remove('is-active'));
        t.classList.add('is-active');
        const src = t.getAttribute('data-src');
        const alt = t.getAttribute('data-alt') || '';
        if (main && src) {
          main.querySelector('img').setAttribute('src', src);
          main.querySelector('img').setAttribute('alt', alt);
        }
      });
    });
  }

  // ====================================================================
  // Init
  // ====================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initReveals();
    initHeader();
    initDropdowns();
    initMobileMenu();
    initCart();
    initVariantSelectors();
    initQty();
    initSearch();
    initAccordions();
    initGallery();
  });
})();
