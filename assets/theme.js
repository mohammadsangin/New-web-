/* ==========================================================================
   KYMRA LIGHTING — theme.js
   Vanilla JS, deferred. No framework, no jQuery.
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var routes = (window.Kymra && window.Kymra.routes) || {};
  var strings = (window.Kymra && window.Kymra.strings) || {};
  var moneyFormat = (window.Kymra && window.Kymra.moneyFormat) || '£{{amount}}';
  var freeShipThreshold = (window.Kymra && window.Kymra.freeShipThreshold) || 0;

  /* ----- helpers -------------------------------------------------------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  function formatMoney(cents) {
    var value = (cents / 100).toFixed(2);
    // Respect Shopify money_format placeholders; default 2-decimal GBP.
    if (moneyFormat.indexOf('amount_no_decimals') > -1) {
      value = Math.round(cents / 100).toString();
      return moneyFormat.replace(/\{\{\s*amount_no_decimals\s*\}\}/g, value);
    }
    return moneyFormat.replace(/\{\{\s*amount(_with_comma_separator)?\s*\}\}/g, value);
  }

  function trapFocus(container, e) {
    var focusables = $all('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])', container)
      .filter(function (el) { return el.offsetParent !== null; });
    if (!focusables.length) return;
    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ======================================================================
     DRAWER / OVERLAY CONTROLLER
     ====================================================================== */
  var Drawers = (function () {
    var overlay = null;
    var openId = null;        // track by id, never a (possibly re-rendered) element ref
    var lastFocus = null;
    var activeOpener = null;

    function ensureOverlay() {
      overlay = $('#drawer-overlay');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'drawer-overlay';
        overlay.className = 'overlay';
        document.body.appendChild(overlay);
      }
      overlay.addEventListener('click', function () { close(); });
    }

    function currentDrawer() { return openId ? document.getElementById(openId) : null; }

    function open(id, opener) {
      var drawer = document.getElementById(id);
      if (!drawer) return;
      // close any other open drawer without releasing the scroll lock
      $all('.drawer.is-open').forEach(function (d) {
        if (d !== drawer) { d.classList.remove('is-open'); d.setAttribute('aria-hidden', 'true'); }
      });
      lastFocus = opener || document.activeElement;
      activeOpener = opener || null;
      if (activeOpener && activeOpener.hasAttribute('aria-expanded')) activeOpener.setAttribute('aria-expanded', 'true');
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      overlay.classList.add('is-open');
      document.body.classList.add('no-scroll');
      openId = id;
      var focusTarget = drawer.querySelector('[data-drawer-focus]') || drawer.querySelector('.drawer__close');
      if (focusTarget) setTimeout(function () { try { focusTarget.focus(); } catch (e) {} }, 80);
      document.dispatchEvent(new CustomEvent('drawer:open', { detail: { id: id } }));
    }

    // Close whatever drawer is open. Robust to AJAX re-renders: works off the
    // live `.drawer.is-open` elements, not a cached reference.
    function close() {
      var any = $all('.drawer.is-open');
      any.forEach(function (d) { d.classList.remove('is-open'); d.setAttribute('aria-hidden', 'true'); });
      overlay && overlay.classList.remove('is-open');
      document.body.classList.remove('no-scroll');
      if (activeOpener && activeOpener.hasAttribute('aria-expanded')) activeOpener.setAttribute('aria-expanded', 'false');
      if (lastFocus && typeof lastFocus.focus === 'function') { try { lastFocus.focus(); } catch (e) {} }
      openId = null;
      activeOpener = null;
    }

    function init() {
      ensureOverlay();
      // Delegated on document, so it survives any drawer content re-render.
      document.addEventListener('click', function (e) {
        var opener = e.target.closest('[data-drawer-open]');
        if (opener) { e.preventDefault(); open(opener.getAttribute('data-drawer-open'), opener); return; }
        if (e.target.closest('[data-drawer-close]')) { e.preventDefault(); close(); }
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && openId) { close(); return; }
        if (e.key === 'Tab' && openId) { var d = currentDrawer(); if (d) trapFocus(d, e); }
      });
    }

    return { init: init, open: open, close: close, closeAll: close };
  })();

  /* ======================================================================
     REVEAL ON SCROLL
     ====================================================================== */
  function initReveal() {
    var els = $all('.reveal');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ======================================================================
     ANNOUNCEMENT BAR — auto-rotate + arrows + directional slide.
     Pauses on hover/focus and when the tab is hidden; under reduced motion
     it swaps instantly and does not auto-rotate (arrows still work).
     ====================================================================== */
  function initAnnouncement() {
    var bar = $('[data-announcement]');
    if (!bar) return;
    var items = $all('[data-ann-item]', bar);
    if (items.length < 2) return;

    var interval = parseInt(bar.getAttribute('data-interval'), 10) || 6000;
    if (interval < 5000) interval = 5000;
    var index = 0;
    var animating = false;
    var timer = null;

    function go(target, dir) {
      target = (target + items.length) % items.length;
      if (target === index) return;
      var current = items[index];
      var next = items[target];

      if (reduceMotion) {
        current.classList.remove('is-active');
        next.classList.add('is-active');
        index = target;
        return;
      }
      if (animating) return;
      animating = true;

      var fromY = dir >= 0 ? '100%' : '-100%'; // incoming enters from below (fwd) / above (back)
      var toY = dir >= 0 ? '-100%' : '100%';   // outgoing exits up (fwd) / down (back)

      next.style.transition = 'none';
      next.style.transform = 'translateY(' + fromY + ')';
      next.style.opacity = '0';
      next.classList.add('is-active');
      void next.offsetWidth; // commit start position before transitioning

      next.style.transition = '';
      next.style.transform = 'translateY(0)';
      next.style.opacity = '1';
      current.style.transform = 'translateY(' + toY + ')';
      current.style.opacity = '0';
      current.classList.remove('is-active');

      var leaving = current;
      index = target;
      setTimeout(function () {
        leaving.style.transition = 'none';
        leaving.style.transform = '';
        leaving.style.opacity = '';
        void leaving.offsetWidth;
        leaving.style.transition = '';
        next.style.transform = '';
        next.style.opacity = '';
        animating = false;
      }, 560);
    }

    function start() {
      if (reduceMotion || timer) return;
      timer = setInterval(function () { go(index + 1, 1); }, interval);
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }

    var prev = $('[data-ann-prev]', bar);
    var next = $('[data-ann-next]', bar);
    if (prev) prev.addEventListener('click', function () { go(index - 1, -1); });
    if (next) next.addEventListener('click', function () { go(index + 1, 1); });

    bar.addEventListener('mouseenter', stop);
    bar.addEventListener('mouseleave', start);
    bar.addEventListener('focusin', stop);
    bar.addEventListener('focusout', start);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else start();
    });

    start();
  }

  /* ======================================================================
     CART
     ====================================================================== */
  var Cart = (function () {

    function setLoading(state) {
      // Re-query every time — never trust a cached reference across re-renders.
      var drawer = $('#cart-drawer');
      if (drawer) drawer.classList.toggle('is-loading', state);
    }

    function updateCount(count) {
      $all('[data-cart-count]').forEach(function (el) {
        el.textContent = count;
        el.hidden = count < 1;
      });
    }

    function getSectionHTML(html, selector) {
      var doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.querySelector(selector);
    }

    // The `sections` bundle in Cart AJAX responses is keyed by section ID.
    // We request the filename 'cart-drawer', but be key-mismatch-proof: take
    // the exact key if present, otherwise the first rendered string value.
    function pickSectionHTML(sections) {
      if (!sections) return null;
      if (typeof sections['cart-drawer'] === 'string') return sections['cart-drawer'];
      var keys = Object.keys(sections);
      for (var i = 0; i < keys.length; i++) {
        if (typeof sections[keys[i]] === 'string') return sections[keys[i]];
      }
      return null;
    }

    // Swap the drawer's inner content from a rendered `cart-drawer` section.
    // Returns true if the swap happened. The #cart-drawer element itself is
    // never replaced, so the open state and delegated handlers stay intact.
    function renderDrawer(sectionHTML) {
      if (!sectionHTML) return false;
      var fresh = getSectionHTML(sectionHTML, '#cart-drawer .drawer__wrap');
      var current = $('#cart-drawer .drawer__wrap');
      if (fresh && current) {
        current.innerHTML = fresh.innerHTML;
        // If focus was lost with the replaced content, restore it into the drawer.
        var drawer = $('#cart-drawer');
        if (drawer && drawer.classList.contains('is-open') && document.activeElement === document.body) {
          var closeBtn = drawer.querySelector('.drawer__close');
          if (closeBtn) { try { closeBtn.focus(); } catch (e) {} }
        }
        // Upgrade the "More to love" strip to live recommendations for the new cart.
        refreshRecommendations();
        return true;
      }
      return false;
    }

    // "More to love" — cover EVERY distinct product in the bag. The drawer
    // server-renders one same-category candidate pool per distinct cart product
    // (in cart order) into a <template>; we round-robin interleave one candidate
    // from each pool at a time, globally deduped, evenly split (target 6, max 8).
    // Re-run on every cart change and drawer open so it stays current.
    var REC_TARGET = 6, REC_MAX = 8;

    // Round-robin selection across pools (arrays of .cross-card nodes, in cart
    // order), globally deduped by product id (first placement wins).
    function selectInterleaved(pools) {
      var n = pools.length;
      if (!n) return [];
      var perProduct = Math.ceil(REC_TARGET / n);
      var totalCap = Math.min(REC_MAX, n * perProduct);
      var used = {};
      var cursor = pools.map(function () { return 0; });      // next candidate index
      var taken = pools.map(function () { return 0; });        // picked from this pool
      var picked = [];
      var guard = 0;
      while (picked.length < totalCap && guard++ < 200) {
        var progressed = false;
        for (var p = 0; p < n && picked.length < totalCap; p++) {
          if (taken[p] >= perProduct) continue;
          var pool = pools[p];
          while (cursor[p] < pool.length) {
            var node = pool[cursor[p]++];
            var pid = node.getAttribute('data-product-id');
            if (!pid || used[pid]) continue;                   // global dedupe / in-bag
            used[pid] = true;
            picked.push(node);
            taken[p]++;
            progressed = true;
            break;
          }
        }
        if (!progressed) break;                                 // every pool exhausted
      }
      return picked;
    }

    function refreshRecommendations() {
      var host = $('#cart-drawer [data-cart-rec]');
      if (!host) return;
      var tpl = host.querySelector('template[data-rec-pools]');
      var list = $('[data-cart-rec-list]', host);
      if (!tpl || !list) return;
      // Read the same-category pools (in cart order) from the server-rendered template.
      var pools = $all('[data-rec-pool]', tpl.content).map(function (el) { return $all('.cross-card', el); });
      var picked = selectInterleaved(pools);
      if (picked.length) {
        var scroll = document.createElement('div');
        scroll.className = 'cart-cross__scroll';
        scroll.setAttribute('tabindex', '0');
        scroll.setAttribute('role', 'group');
        scroll.setAttribute('aria-label', host.getAttribute('data-rec-heading') || 'You may also like');
        // Clone so the template stays intact and re-runs stay idempotent.
        picked.forEach(function (node) { scroll.appendChild(node.cloneNode(true)); });
        list.innerHTML = '';
        list.appendChild(scroll);
        host.hidden = false;
      } else if (!list.querySelector('.cross-card')) {
        host.hidden = true;                                     // no candidates at all
      }
    }

    // Fallback: re-render the drawer via a standalone Section Rendering request
    // (the bare-HTML `section_id` variant — the most widely supported form).
    function refreshDrawer() {
      return fetch(routes.cart_url + '?section_id=cart-drawer', { headers: { 'Accept': 'text/html' }, cache: 'no-store' })
        .then(function (r) { return r.text(); })
        .then(function (html) { return renderDrawer(html); })
        .catch(function () { return false; });
    }

    function add(id, quantity, opener) {
      setLoading(true);
      // Ask Shopify to render the cart-drawer section IN the add response, so the
      // drawer reflects the new line item atomically — no second fetch, no race.
      return fetch(routes.cart_add_url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          items: [{ id: id, quantity: quantity || 1 }],
          sections: 'cart-drawer',
          sections_url: window.location.pathname
        })
      })
        .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, data: d }; }); })
        .then(function (res) {
          if (!res.ok) { throw res.data; }
          var ok = renderDrawer(pickSectionHTML(res.data.sections));
          var ready = ok ? Promise.resolve() : refreshDrawer();
          // Update the header count from the authoritative cart (add is committed).
          return ready.then(function () { return fetch(routes.cart_url + '.js', { cache: 'no-store' }).then(function (r) { return r.json(); }); });
        })
        .then(function (cart) {
          updateCount(cart.item_count);
          setLoading(false);
          Drawers.open('cart-drawer', opener); // open AFTER content is in place
        })
        .catch(function (err) {
          setLoading(false);
          var msg = (err && err.description) || strings.cartError || 'Could not add to bag.';
          alert(msg);
        });
    }

    function change(key, quantity) {
      setLoading(true);
      // change.js returns the full cart AND the requested sections in one shot.
      return fetch(routes.cart_change_url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          id: key,
          quantity: quantity,
          sections: 'cart-drawer',
          sections_url: window.location.pathname
        })
      })
        .then(function (r) {
          if (!r.ok) { throw new Error('cart change failed'); }
          return r.json();
        })
        .then(function (cart) {
          updateCount(cart.item_count);
          var ok = renderDrawer(pickSectionHTML(cart.sections));
          var ready = ok ? Promise.resolve(true) : refreshDrawer();
          return ready.then(function () {
            reloadCartPage(); // also refresh the cart page if we're on it
            setLoading(false);
            return cart;
          });
        })
        .catch(function () {
          // Even on failure, re-sync the drawer with the server's actual cart.
          refreshDrawer().then(function () { setLoading(false); });
        });
    }

    function reloadCartPage() {
      var page = $('#main-cart');
      if (!page) return;
      fetch(routes.cart_url + '?section_id=main-cart', { headers: { 'Accept': 'text/html' } })
        .then(function (r) { return r.text(); })
        .then(function (html) {
          var fresh = getSectionHTML(html, '#main-cart .cart-page__wrap');
          var current = $('#main-cart .cart-page__wrap');
          if (fresh && current) current.innerHTML = fresh.innerHTML;
        });
    }

    function init() {
      // Load fresh recommendations whenever the cart drawer opens.
      document.addEventListener('drawer:open', function (e) {
        if (e.detail && e.detail.id === 'cart-drawer') refreshRecommendations();
      });

      // Add to bag (delegated) — product forms + cross-sell buttons.
      document.addEventListener('submit', function (e) {
        var form = e.target.closest('[data-product-form]');
        if (!form) return;
        e.preventDefault();
        var idField = form.querySelector('[name="id"]');
        var qtyField = form.querySelector('[name="quantity"]');
        if (!idField || !idField.value) return;
        var btn = form.querySelector('[type="submit"]');
        if (btn) { btn.setAttribute('aria-disabled', 'true'); btn.dataset.label = btn.textContent; btn.textContent = strings.adding || 'Adding…'; }
        add(idField.value, qtyField ? parseInt(qtyField.value, 10) : 1, btn).then(function () {
          if (btn) { btn.removeAttribute('aria-disabled'); btn.textContent = btn.dataset.label; }
        });
      });

      document.addEventListener('click', function (e) {
        var addBtn = e.target.closest('[data-cart-add]');
        if (addBtn) {
          e.preventDefault();
          // Optional quantity from a quick-add group (e.g. the bulbs module).
          var qty = 1;
          var wrap = addBtn.closest('[data-quick-add]');
          if (wrap) {
            var qi = wrap.querySelector('[data-quick-qty]');
            if (qi) qty = Math.max(1, parseInt(qi.value, 10) || 1);
          }
          add(addBtn.getAttribute('data-cart-add'), qty, addBtn);
          return;
        }
        var remove = e.target.closest('[data-cart-remove]');
        if (remove) {
          e.preventDefault();
          change(remove.getAttribute('data-cart-remove'), 0);
          return;
        }
        var step = e.target.closest('[data-cart-step]');
        if (step) {
          e.preventDefault();
          var key = step.getAttribute('data-cart-key');
          var dir = parseInt(step.getAttribute('data-cart-step'), 10);
          var input = step.parentElement.querySelector('input');
          var next = Math.max(0, (parseInt(input.value, 10) || 0) + dir);
          input.value = next;
          change(key, next);
        }
      });

      document.addEventListener('change', function (e) {
        var qtyInput = e.target.closest('[data-cart-qty]');
        if (qtyInput) {
          var key = qtyInput.getAttribute('data-cart-key');
          change(key, Math.max(0, parseInt(qtyInput.value, 10) || 0));
        }
      });
    }

    return { init: init, add: add, updateCount: updateCount };
  })();

  /* ======================================================================
     QUANTITY STEPPERS (non-cart, e.g. PDP)
     ====================================================================== */
  function initQtySteppers() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-qty-step]');
      if (!btn) return;
      var wrap = btn.closest('.qty');
      var input = wrap && wrap.querySelector('input');
      if (!input) return;
      var min = parseInt(input.getAttribute('min'), 10) || 1;
      var next = Math.max(min, (parseInt(input.value, 10) || min) + parseInt(btn.getAttribute('data-qty-step'), 10));
      input.value = next;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }

  /* ======================================================================
     PRODUCT: variants, gallery, sticky bar
     ====================================================================== */
  function initProduct() {
    var root = $('[data-product]');
    if (!root) return;

    var variants = [];
    try { variants = JSON.parse($('[data-product-variants]', root).textContent); } catch (e) { variants = []; }

    var form = $('[data-product-form]', root);
    var idField = form && form.querySelector('[name="id"]');
    var priceMount = $('[data-price-mount]', root);
    var addBtn = form && form.querySelector('[type="submit"]');
    var addLabel = $('[data-add-label]', root);

    function currentOptions() {
      return $all('[data-option-index]', root)
        .reduce(function (acc, group) {
          var checked = group.querySelector('input:checked');
          acc[parseInt(group.getAttribute('data-option-index'), 10)] = checked ? checked.value : null;
          return acc;
        }, []);
    }

    function findVariant(opts) {
      return variants.find(function (v) {
        return v.options.every(function (o, i) { return o === opts[i]; });
      });
    }

    function updateAvailability(opts) {
      // Disable option values that produce no available variant given current selection.
      $all('[data-option-index]', root).forEach(function (group) {
        var idx = parseInt(group.getAttribute('data-option-index'), 10);
        $all('input', group).forEach(function (input) {
          var test = opts.slice();
          test[idx] = input.value;
          var match = variants.filter(function (v) {
            return v.options.every(function (o, i) { return i === idx ? o === input.value : (opts[i] == null || o === opts[i]); });
          });
          var anyAvail = match.some(function (v) { return v.available; });
          input.disabled = match.length > 0 && !anyAvail;
        });
      });
    }

    function render() {
      // No variant data (shouldn't happen) — leave the server-rendered state intact.
      if (!variants.length) return;

      var groups = $all('[data-option-index]', root);
      var variant;
      if (!groups.length) {
        // Single-variant product: no option picker is rendered. Use the sole variant.
        variant = variants[0];
      } else {
        var opts = currentOptions();
        updateAvailability(opts);
        variant = findVariant(opts);
      }

      if (!variant) {
        if (idField) idField.value = '';
        if (addBtn) { addBtn.setAttribute('aria-disabled', 'true'); }
        if (addLabel) addLabel.textContent = strings.unavailable || 'Unavailable';
        return;
      }
      if (idField) idField.value = variant.id;
      // URL update for shareable variant link
      if (history.replaceState) {
        var url = new URL(window.location.href);
        url.searchParams.set('variant', variant.id);
        history.replaceState({}, '', url);
      }
      if (priceMount && variant.price_html) priceMount.innerHTML = variant.price_html;
      if (addBtn) {
        if (variant.available) {
          addBtn.removeAttribute('aria-disabled');
          if (addLabel) addLabel.textContent = strings.addToBag || 'Add to bag';
        } else {
          addBtn.setAttribute('aria-disabled', 'true');
          if (addLabel) addLabel.textContent = strings.soldOut || 'Sold out';
        }
      }
      // sticky bar mirror
      var stickyPrice = $('[data-sticky-price]');
      if (stickyPrice && variant.price_html) stickyPrice.innerHTML = variant.price_html;
      // Switch the gallery to this variant's image (skip the initial render so we
      // don't fight the server-rendered/preloaded first slide). If a variant has
      // no dedicated image, leave the current one.
      if (galleryInit && variant.media_id != null) showSlideByMediaId(variant.media_id);
    }

    $all('[data-option-index] input', root).forEach(function (input) {
      input.addEventListener('change', render);
    });
    render();

    /* Gallery: thumbs switch the desktop view and scroll the mobile carousel */
    var galleryMain = $('[data-gallery-main]', root);
    var galleryInit = false;
    function setActiveThumb(idx) {
      $all('[data-gallery-thumb]', root).forEach(function (t) {
        t.setAttribute('aria-current', parseInt(t.getAttribute('data-gallery-thumb'), 10) === idx ? 'true' : 'false');
      });
    }
    function showSlideByIndex(idx) {
      $all('[data-gallery-slide]', root).forEach(function (s) {
        s.classList.toggle('is-active', parseInt(s.getAttribute('data-gallery-slide'), 10) === idx);
      });
      setActiveThumb(idx);
      if (galleryMain && galleryMain.scrollWidth > galleryMain.clientWidth) {
        galleryMain.scrollTo({ left: idx * galleryMain.clientWidth, behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    }
    // Activate the slide/thumb whose media id matches a chosen variant.
    function showSlideByMediaId(mediaId) {
      var slide = root.querySelector('[data-gallery-slide][data-media-id="' + mediaId + '"]');
      if (!slide) return; // variant has no dedicated image — leave current
      showSlideByIndex(parseInt(slide.getAttribute('data-gallery-slide'), 10));
    }
    $all('[data-gallery-thumb]', root).forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        showSlideByIndex(parseInt(thumb.getAttribute('data-gallery-thumb'), 10));
        // Keep the chosen thumb within the scrollable thumb strip.
        try { thumb.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' }); } catch (e) {}
      });
    });
    // Gallery wired — allow variant changes to drive image switching from here on.
    galleryInit = true;
    // Mobile: keep the active thumb in sync as the carousel is swiped.
    if (galleryMain) {
      var galleryTimer;
      galleryMain.addEventListener('scroll', function () {
        clearTimeout(galleryTimer);
        galleryTimer = setTimeout(function () {
          if (galleryMain.scrollWidth <= galleryMain.clientWidth) return;
          setActiveThumb(Math.round(galleryMain.scrollLeft / galleryMain.clientWidth));
        }, 90);
      }, { passive: true });
    }

    /* Sticky add-to-bag reveal */
    var sticky = $('[data-sticky-buy]');
    var anchor = $('[data-buy-anchor]', root);
    if (sticky && anchor && 'IntersectionObserver' in window) {
      var so = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          sticky.classList.toggle('is-visible', !entry.isIntersecting && entry.boundingClientRect.top < 0);
        });
      }, { threshold: 0 });
      so.observe(anchor);
      var stickyBtn = $('[data-sticky-add]', sticky);
      if (stickyBtn) stickyBtn.addEventListener('click', function () {
        if (form) form.requestSubmit ? form.requestSubmit() : form.querySelector('[type="submit"]').click();
      });
    }
  }

  /* ======================================================================
     COLLECTION FACETS — AJAX apply via the Section Rendering API.
     Updates the grid, count, chips and drawer counts in place (no reload,
     no scroll jump, drawer stays open). Degrades to normal form/link
     navigation when JS is unavailable or a request fails.
     ====================================================================== */
  function initCollection() {
    var root = $('[data-facets]');
    if (!root) return;
    var sectionId = root.getAttribute('data-section-id');
    var debounceTimer;

    function swapRegion(doc, selector, keepIfMissing) {
      var fresh = doc.querySelector(selector);
      var current = $(selector);
      if (current && fresh) current.innerHTML = fresh.innerHTML;
      // Only blank a region when the fresh fragment is genuinely absent AND the
      // caller allows it. The grid passes keepIfMissing so a partial/failed
      // render never wipes the products.
      else if (current && !fresh && !keepIfMissing) current.innerHTML = '';
    }

    function render(url, addToHistory) {
      var fetchUrl = new URL(url, window.location.origin);
      fetchUrl.searchParams.set('section_id', sectionId);
      root.classList.add('is-loading');
      fetch(fetchUrl.toString(), { headers: { 'Accept': 'text/html' } })
        .then(function (r) {
          if (!r.ok) throw new Error('facet fetch failed');
          return r.text();
        })
        .then(function (html) {
          var doc = new DOMParser().parseFromString(html, 'text/html');
          swapRegion(doc, '[data-facet-results]', true); // never blank the grid on a partial render
          swapRegion(doc, '[data-facet-count]');
          swapRegion(doc, '[data-facet-summary]');
          swapRegion(doc, '[data-facet-badge]');
          swapRegion(doc, '[data-facet-filters]');
          // Freshly swapped-in cards carry .reveal (opacity:0 until observed).
          // initReveal only watched the original nodes, so reveal the new ones
          // immediately — otherwise the grid reads empty after Clear all / Sort
          // until a manual refresh.
          var results = $('[data-facet-results]');
          if (results) $all('.reveal', results).forEach(function (el) { el.classList.add('is-visible'); });
          root.classList.remove('is-loading');
          if (addToHistory !== false) {
            var clean = new URL(url, window.location.origin);
            clean.searchParams.delete('section_id');
            window.history.pushState({ facets: true }, '', clean.toString());
          }
        })
        .catch(function () {
          // Hard fallback: let the browser navigate normally.
          window.location.href = url;
        });
    }

    function urlFromForm(form) {
      var action = form.getAttribute('action') || window.location.pathname;
      var params = new URLSearchParams();
      new FormData(form).forEach(function (value, key) {
        if (value !== '' && value != null) params.append(key, value);
      });
      var qs = params.toString();
      return qs ? action + '?' + qs : action;
    }

    // Filter form: apply as soon as a value changes (debounced for price typing).
    document.addEventListener('change', function (e) {
      var form = e.target.closest('[data-facet-form]');
      if (!form) return;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () { render(urlFromForm(form)); }, 250);
    });
    // Keep the Apply button working (and instant) without a full submit.
    document.addEventListener('submit', function (e) {
      var form = e.target.closest('[data-facet-form]');
      if (!form) return;
      e.preventDefault();
      clearTimeout(debounceTimer);
      render(urlFromForm(form));
      Drawers.closeAll();
    });

    // Sort select preserves active facets (rewrites sort_by on the current URL).
    var sort = $('[data-sort]');
    if (sort) sort.addEventListener('change', function () {
      var url = new URL(window.location.href);
      url.searchParams.set('sort_by', sort.value);
      url.searchParams.delete('page');
      render(url.toString());
    });

    // Chips (remove / clear-all) and drawer clear-all apply via AJAX.
    // Pagination is intentionally NOT intercepted — it navigates normally so
    // Shopify renders the requested page server-side.
    document.addEventListener('click', function (e) {
      var link = e.target.closest('[data-facet-link]');
      if (!link || !link.getAttribute('href')) return;
      if (link.closest('.pagination')) return; // let pagination navigate
      e.preventDefault();
      render(link.getAttribute('href'));
    });

    // Back / forward buttons re-render the matching state.
    window.addEventListener('popstate', function () {
      render(window.location.href, false);
    });
  }

  /* ======================================================================
     INIT
     ====================================================================== */
  /* ======================================================================
     EXCLUSIVE ACCORDIONS — opening one <details> closes its siblings.
     Progressive enhancement: without JS the rows still open/close, just not
     mutually exclusive.
     ====================================================================== */
  function initAccordions() {
    $all('[data-accordion-group]').forEach(function (group) {
      var items = $all('details', group);
      items.forEach(function (d) {
        d.addEventListener('toggle', function () {
          if (!d.open) return;
          items.forEach(function (other) { if (other !== d && other.open) other.open = false; });
        });
      });
    });
  }

  /* ======================================================================
     MEGA MENU — hover intent. Opens on enter; closes ~200ms after the cursor
     leaves BOTH the trigger and the panel, so moving down into the panel
     across the gap keeps it open. Entering an adjacent item closes the others
     immediately (no double panels). Keyboard focus keeps it open.
     ====================================================================== */
  function initMegaMenu() {
    var items = $all('.nav__item--has-mega');
    if (!items.length) return;
    var closeTimer;

    function openItem(item) {
      clearTimeout(closeTimer);
      items.forEach(function (o) {
        o.classList.toggle('is-open', o === item);
        var link = o.querySelector('.nav__link');
        if (link && link.hasAttribute('aria-expanded')) link.setAttribute('aria-expanded', o === item ? 'true' : 'false');
      });
    }
    function closeItem(item) {
      clearTimeout(closeTimer);
      item.classList.remove('is-open');
      var link = item.querySelector('.nav__link');
      if (link && link.hasAttribute('aria-expanded')) link.setAttribute('aria-expanded', 'false');
    }
    function scheduleClose() {
      clearTimeout(closeTimer);
      closeTimer = setTimeout(function () {
        items.forEach(closeItem);
      }, 200);
    }

    items.forEach(function (item) {
      item.addEventListener('mouseenter', function () { openItem(item); });
      item.addEventListener('mouseleave', scheduleClose);
      item.addEventListener('focusin', function () { openItem(item); });
      item.addEventListener('focusout', function (e) {
        if (!item.contains(e.relatedTarget)) scheduleClose();
      });

      // A parent WITH a dropdown toggles the panel instead of navigating.
      // The "View all …" link inside the panel is how you reach the collection.
      var trigger = item.querySelector('.nav__link');
      if (trigger) {
        var wasOpen = false;
        trigger.addEventListener('pointerdown', function () {
          wasOpen = item.classList.contains('is-open');
        });
        trigger.addEventListener('click', function (e) {
          e.preventDefault();
          if (wasOpen) closeItem(item); else openItem(item);
        });
        trigger.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault();
            if (item.classList.contains('is-open')) closeItem(item); else openItem(item);
          }
        });
      }
    });

    // Click/tap outside any dropdown closes them (touch has no mouseleave).
    document.addEventListener('click', function (e) {
      if (e.target.closest('.nav__item--has-mega')) return;
      items.forEach(closeItem);
    });
    // Escape closes any open panel and returns focus to its trigger.
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var open = items.filter(function (o) { return o.classList.contains('is-open'); })[0];
      if (!open) return;
      clearTimeout(closeTimer);
      open.classList.remove('is-open');
      var link = open.querySelector('.nav__link');
      if (link) { link.setAttribute('aria-expanded', 'false'); try { link.focus(); } catch (err) {} }
    });
  }

  /* ======================================================================
     BULBS MODULE — "Show more" reveals the remaining linked bulbs.
     ====================================================================== */
  function initBulbs() {
    $all('[data-bulbs-more]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var module = btn.closest('[data-bulbs]');
        if (!module) return;
        $all('.bulb-card--extra', module).forEach(function (card) { card.hidden = false; });
        btn.setAttribute('aria-expanded', 'true');
        btn.hidden = true;
      });
    });
  }

  function init() {
    Drawers.init();
    Cart.init();
    initReveal();
    initAnnouncement();
    initQtySteppers();
    initProduct();
    initCollection();
    initAccordions();
    initMegaMenu();
    initBulbs();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose a tiny API for inline use if ever needed.
  window.Kymra = window.Kymra || {};
  window.Kymra.cartAdd = Cart.add;
})();
