/* =========================================================
   app.js — theme, language, rendering, gallery, lightbox,
   mobile menu, page transitions, scroll reveals.
   Depends on `SITE` from data.js (loaded first).
   Runs on index.html, about.html and case-study.html —
   page-specific renderers bail out when their root element
   is not present.
   ========================================================= */
(function () {
  "use strict";

  const root = document.documentElement;          // <html data-theme="...">
  const STORE = { theme: "bs-theme", lang: "bs-lang" };
  const GALLERY_MAX = 9;                          // ./Framer/<Project>/1.webp … 9.webp

  /* ---------------------------------------------------------
     1. THEME  (default dark; toggles data-theme on <html>)
     --------------------------------------------------------- */
  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    document.body.classList.toggle("light", theme === "light");
    try { localStorage.setItem(STORE.theme, theme); } catch (e) {}
  }

  function initTheme() {
    let saved;
    try { saved = localStorage.getItem(STORE.theme); } catch (e) {}
    applyTheme(saved || "dark");

    document.getElementById("themeToggle").addEventListener("click", function () {
      applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
  }

  /* ---------------------------------------------------------
     2. LANGUAGE  (en / de) — swaps every [data-i18n] node
     --------------------------------------------------------- */
  let currentLang = "en";

  /* resolve a dot-path ("home.why.title") through a nested dictionary */
  function resolve(dict, key) {
    return key.split(".").reduce(function (o, k) {
      return (o == null) ? undefined : o[k];
    }, dict);
  }

  function t(key) {
    const val = resolve(SITE.text[currentLang], key);
    if (val != null) return val;
    const fallback = resolve(SITE.text.en, key);   // English fallback
    return fallback != null ? fallback : key;
  }

  /* pick a bilingual value: {en, de} object or plain string */
  function pick(val) {
    if (val == null) return "";
    if (typeof val === "string") return val;
    return val[currentLang] || val.en || "";
  }

  /* CV files (folder + filenames have literal spaces on disk — percent-encode
     them in the href; `download` supplies a clean save-as name instead) */
  const RESUME_FILES = {
    en: { href: "/CV/ENG_CV_%20Savchenko.pdf", name: "ENG_CV_Savchenko.pdf" },
    de: { href: "/CV/Lebenslauf_%20Savchenko%20DE.pdf", name: "Lebenslauf_Savchenko_DE.pdf" }
  };
  function updateResumeLink() {
    const btn = document.getElementById("resumeBtn");
    if (!btn) return;
    const file = RESUME_FILES[currentLang] || RESUME_FILES.en;
    btn.setAttribute("href", file.href);
    btn.setAttribute("download", file.name);
  }

  function applyLang(lang) {
    currentLang = SITE.text[lang] ? lang : "en";
    root.setAttribute("lang", currentLang);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });

    document.querySelectorAll(".lang-btn").forEach(function (b) {
      b.classList.toggle("is-active", b.dataset.lang === currentLang);
    });

    renderProjects();       // index page      (no-op elsewhere)
    renderExperience();     // about page      (no-op elsewhere)
    renderCaseStudy();      // case-study page (no-op elsewhere)
    renderTestimonials();   // index page      (no-op elsewhere)
    updateResumeLink();     // about page      (no-op elsewhere)
    buildHeroRepel();       // re-split the (just-updated) hero title into letters
    buildWordReveal();      // re-split scroll-reveal text into words
    try { localStorage.setItem(STORE.lang, currentLang); } catch (e) {}
  }

  function initLang() {
    let saved;
    try { saved = localStorage.getItem(STORE.lang); } catch (e) {}
    const browser = (navigator.language || "en").toLowerCase().startsWith("de") ? "de" : "en";
    applyLang(saved || browser);

    document.querySelectorAll(".lang-btn").forEach(function (b) {
      b.addEventListener("click", function () { applyLang(b.dataset.lang); });
    });
  }

  /* ---------------------------------------------------------
     3. MOBILE MENU (hamburger <-> dropdown panel)
     --------------------------------------------------------- */
  function initMenu() {
    const btn = document.getElementById("menuToggle");
    const nav = document.getElementById("mainNav");
    if (!btn || !nav) return;

    function setOpen(open) {
      nav.classList.toggle("open", open);
      btn.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
    }

    btn.addEventListener("click", function () {
      setOpen(!nav.classList.contains("open"));
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setOpen(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }

  /* ---------------------------------------------------------
     4. SHARED BUILDERS
     --------------------------------------------------------- */
  /* project card (used by the home grid and "other projects") */
  function buildCard(p) {
    const cat = pick(p.category);

    const card = document.createElement("a");
    card.className = "project-card";
    card.href = p.link || "#";
    card.setAttribute("aria-label", p.title + " — " + cat);

    const media = document.createElement("div");
    media.className = "project-media";
    media.dataset.label = p.title;

    const img = document.createElement("img");
    img.loading = "lazy";
    img.decoding = "async";
    img.alt = p.title + " project cover";
    img.src = p.image;
    img.addEventListener("error", function () {
      img.remove();
      media.classList.add("is-empty");
    });
    media.appendChild(img);

    const info = document.createElement("div");
    info.className = "project-info";
    const name = document.createElement("span");
    name.className = "project-name";
    name.textContent = p.title;
    const catEl = document.createElement("span");
    catEl.className = "project-cat";
    catEl.textContent = cat;
    info.appendChild(name);
    info.appendChild(catEl);

    card.appendChild(media);
    card.appendChild(info);
    attachTilt(media);
    return card;
  }

  /* 3D tilt-card effect (evade: tilts away from the cursor) + spotlight.
     Ported from the React TiltCard; pointer/motion-safe. */
  function attachTilt(el) {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const TILT = 12, SCALE = 1.05, PERSPECTIVE = 1200, DIR = -1;   // DIR -1 = "evade"
    const rest = "perspective(" + PERSPECTIVE + "px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";

    const spot = document.createElement("div");
    spot.className = "tilt-spotlight";
    spot.setAttribute("aria-hidden", "true");
    el.appendChild(spot);

    el.addEventListener("pointerenter", function () { el.classList.add("tilting"); });
    el.addEventListener("pointermove", function (e) {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const xRot = (py - 0.5) * (TILT * 2) * DIR;
      const yRot = (px - 0.5) * -(TILT * 2) * DIR;
      el.style.transform =
        "perspective(" + PERSPECTIVE + "px) rotateX(" + xRot + "deg) rotateY(" + yRot +
        "deg) scale3d(" + SCALE + "," + SCALE + "," + SCALE + ")";
      spot.style.setProperty("--sx", (px * 100) + "%");
      spot.style.setProperty("--sy", (py * 100) + "%");
    });
    el.addEventListener("pointerleave", function () {
      el.style.transform = rest;
      el.classList.remove("tilting");
    });
  }

  /* Lightweight 3D tilt for the desktop testimonial fan.
     Unlike attachTilt it never writes `transform` directly — it only feeds
     --tilt-x / --tilt-y custom properties, so the CSS keeps full control of the
     card's base fan rotation, arc offset, hover lift and scale. */
  function attachDeckTilt(el) {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const TILT = 8;
    el.addEventListener("pointermove", function (e) {
      if (!window.matchMedia("(min-width: 901px)").matches) return;   // fan is desktop-only
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.setProperty("--tilt-x", ((py - 0.5) * -(TILT * 2)) + "deg");
      el.style.setProperty("--tilt-y", ((px - 0.5) * (TILT * 2)) + "deg");
    });
    el.addEventListener("pointerleave", function () {
      el.style.removeProperty("--tilt-x");
      el.style.removeProperty("--tilt-y");
    });
  }

  /* fill a figure with an image; hide the figure if the file is missing */
  function setMedia(container, src, alt) {
    if (!container) return;
    container.innerHTML = "";
    container.classList.remove("is-hidden");

    // no loading="lazy": a lazy image inside display:none is never fetched
    const img = document.createElement("img");
    img.decoding = "async";
    img.alt = alt;
    img.src = src;
    img.tabIndex = 0;                       // lightbox: keyboard-operable
    img.setAttribute("role", "button");
    img.addEventListener("error", function () {
      container.classList.add("is-hidden");
    });
    container.appendChild(img);
  }

  /* ---------------------------------------------------------
     5. HOME — project grid + category filters
     --------------------------------------------------------- */
  let currentFilter = "all";              // "all" | "ux-ui" | "branding"

  function renderProjects() {
    const grid = document.getElementById("projectGrid");
    if (!grid) return;
    grid.innerHTML = "";
    SITE.projects
      .filter(function (p) { return currentFilter === "all" || p.filter === currentFilter; })
      .forEach(function (p) { grid.appendChild(buildCard(p)); });
    observeReveals();
  }

  function initFilters() {
    const buttons = document.querySelectorAll(".filter-btn");
    if (!buttons.length) return;
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (btn.dataset.filter === currentFilter) return;
        currentFilter = btn.dataset.filter;
        buttons.forEach(function (b) { b.classList.toggle("is-active", b === btn); });
        renderProjects();                 // cards re-enter with the reveal animation
      });
    });
  }

  /* ---------------------------------------------------------
     4b. TESTIMONIALS  (homepage — Upwork client reviews)
     --------------------------------------------------------- */
  function buildTestimonialCard(item) {
    const card = document.createElement("article");
    card.className = "testimonial-card";

    const head = document.createElement("div");
    head.className = "tc-head";
    const badge = document.createElement("img");
    badge.className = "tc-badge";
    badge.src = "/review/Up.svg";
    badge.alt = "";
    badge.setAttribute("aria-hidden", "true");
    const project = document.createElement("span");
    project.className = "tc-project";
    project.textContent = item.project;
    head.appendChild(badge);
    head.appendChild(project);

    const meta = document.createElement("div");
    meta.className = "tc-meta";
    const stars = document.createElement("img");
    stars.className = "tc-stars";
    stars.src = "/review/stars.svg";
    stars.alt = item.rating + " out of 5 stars";
    const rating = document.createElement("span");
    rating.className = "tc-rating";
    rating.textContent = item.rating;
    const sep = document.createElement("span");
    sep.className = "tc-sep";
    sep.textContent = "|";
    const date = document.createElement("span");
    date.className = "tc-date";
    date.textContent = item.date;
    meta.appendChild(stars);
    meta.appendChild(rating);
    meta.appendChild(sep);
    meta.appendChild(date);

    const review = document.createElement("p");
    review.className = "tc-review";
    review.textContent = "“" + item.review + "”";

    card.appendChild(head);
    card.appendChild(meta);
    card.appendChild(review);
    attachDeckTilt(card);
    return card;
  }

  function renderTestimonials() {
    const scroll = document.getElementById("testimonialScroll");
    if (!scroll) return;
    scroll.innerHTML = "";
    SITE.testimonials.forEach(function (item) {
      scroll.appendChild(buildTestimonialCard(item));
    });
  }

  /* ---------------------------------------------------------
     5b. SMOOTH CURSOR FOLLOWER
         A small dot that trails the pointer + a larger ring
         that lags further behind and grows over interactive
         elements. Ported from the React cursor-follower.
     --------------------------------------------------------- */
  function initCursor() {
    // pointer-only + motion-safe: keep the native cursor otherwise
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const wrap = document.createElement("div");
    wrap.className = "cursor-follower";
    wrap.setAttribute("aria-hidden", "true");
    wrap.innerHTML = '<div class="cursor-dot"></div><div class="cursor-ring"></div>';
    document.body.appendChild(wrap);
    document.body.classList.add("has-custom-cursor");   // hides the native arrow

    const dot = wrap.querySelector(".cursor-dot");
    const ring = wrap.querySelector(".cursor-ring");

    const DOT_SMOOTHNESS = 0.2;      // dot catches up quickly
    const RING_SMOOTHNESS = 0.1;     // ring lags further behind

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dotPos = { x: mouse.x, y: mouse.y };
    const ringPos = { x: mouse.x, y: mouse.y };
    let hovering = false;

    // grow the ring over anything the mouse can meaningfully interact with
    const INTERACTIVE = "a, button, img, input, textarea, select, [role='button'], .cs-figure";

    window.addEventListener("mousemove", function (e) {
      mouse.x = e.clientX; mouse.y = e.clientY;
    }, { passive: true });

    // event-delegated hover so it survives re-rendered cards / galleries
    document.addEventListener("mouseover", function (e) {
      if (e.target.closest(INTERACTIVE)) hovering = true;
    });
    document.addEventListener("mouseout", function (e) {
      if (e.target.closest(INTERACTIVE) &&
          !(e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest(INTERACTIVE))) {
        hovering = false;
      }
    });

    function lerp(start, end, factor) { return start + (end - start) * factor; }

    (function animate() {
      dotPos.x = lerp(dotPos.x, mouse.x, DOT_SMOOTHNESS);
      dotPos.y = lerp(dotPos.y, mouse.y, DOT_SMOOTHNESS);
      ringPos.x = lerp(ringPos.x, mouse.x, RING_SMOOTHNESS);
      ringPos.y = lerp(ringPos.y, mouse.y, RING_SMOOTHNESS);

      dot.style.transform  = "translate(" + dotPos.x + "px, " + dotPos.y + "px) translate(-50%, -50%)";
      ring.style.transform = "translate(" + ringPos.x + "px, " + ringPos.y + "px) translate(-50%, -50%)";
      ring.classList.toggle("is-hover", hovering);

      requestAnimationFrame(animate);
    })();
  }

  /* ---------------------------------------------------------
     5c. HERO TEXT — repel effect + fit-to-1440-width.
         Splits "Hi, I'm Bohdan" (or the German title) into
         letters that spring away from the cursor, and scales
         the font so the line fills the full container width.
         Ported from the framer-motion TextRepel component.
     --------------------------------------------------------- */
  const REPEL = { radius: 120, strength: 45, spring: 0.16, friction: 0.78 };
  let heroEl = null;
  let heroLetters = [];
  let heroMouse = { x: -9999, y: -9999, active: false };
  let heroReduced = false;
  let heroLoopStarted = false;

  /* natural text width (layout, ignores current transforms) */
  function heroTextWidth() {
    const range = document.createRange();
    range.selectNodeContents(heroEl);
    return range.getBoundingClientRect().width;
  }

  /* scale the font-size to fill the available text-column width, capped so
     the title stays balanced next to the hero photo (never stretches past
     HERO_MAX_FONT even though the text column itself is much wider) */
  const HERO_MAX_FONT = 96;   // px — matches .hero-title's CSS clamp() max
  function fitHeroTitle() {
    if (!heroEl) return;
    heroLetters.forEach(function (L) { L.x = L.y = L.vx = L.vy = 0; L.el.style.transform = ""; });
    const avail = heroEl.clientWidth;
    if (!avail) return;
    let cur = parseFloat(getComputedStyle(heroEl).fontSize) || 100;
    let w = heroTextWidth();
    if (!w) return;
    let next = Math.min(cur * (avail / w), HERO_MAX_FONT);
    heroEl.style.fontSize = next + "px";
    w = heroTextWidth();
    if (w > avail) heroEl.style.fontSize = (next * (avail / w)) + "px";   // narrow mobile column: shrink below the cap to avoid overflow
    measureHeroOrigins();
  }

  /* record each letter's rest centre relative to the container */
  function measureHeroOrigins() {
    if (!heroEl) return;
    const cr = heroEl.getBoundingClientRect();
    heroLetters.forEach(function (L) {
      const r = L.el.getBoundingClientRect();
      L.ox = r.left - cr.left + r.width / 2;
      L.oy = r.top - cr.top + r.height / 2;
    });
  }

  /* (re)build the per-letter spans from the current title text */
  function buildHeroRepel() {
    const el = document.querySelector(".hero-title");
    if (!el) return;
    heroEl = el;
    heroReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const text = el.textContent;              // plain text just set by applyLang
    el.textContent = "";
    el.setAttribute("data-text-repel", "");
    heroLetters = [];
    Array.prototype.forEach.call(text, function (ch) {
      const span = document.createElement("span");
      span.className = "repel-letter";
      span.textContent = ch === " " ? " " : ch;   // keep spaces measurable
      el.appendChild(span);
      heroLetters.push({ el: span, x: 0, y: 0, vx: 0, vy: 0, ox: 0, oy: 0 });
    });

    fitHeroTitle();

    if (heroReduced) return;                  // motion-off: fitted text, no repel

    // pointer handlers (idempotent — replace container each rebuild is fine,
    // listeners live on the persistent element, guard against double-binding)
    if (!el.dataset.repelBound) {
      el.dataset.repelBound = "1";
      el.addEventListener("mousemove", function (e) {
        const r = el.getBoundingClientRect();
        heroMouse.x = e.clientX - r.left;
        heroMouse.y = e.clientY - r.top;
        heroMouse.active = true;
      });
      el.addEventListener("mouseleave", function () {
        heroMouse.active = false; heroMouse.x = -9999; heroMouse.y = -9999;
      });
    }
    startHeroLoop();
  }

  function startHeroLoop() {
    if (heroLoopStarted) return;
    heroLoopStarted = true;
    (function tick() {
      for (let i = 0; i < heroLetters.length; i++) {
        const L = heroLetters[i];
        let tx = 0, ty = 0;
        if (heroMouse.active) {
          const dx = L.ox - heroMouse.x, dy = L.oy - heroMouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < REPEL.radius && dist > 0) {
            const force = Math.pow(1 - dist / REPEL.radius, 2) * REPEL.strength;  // quadratic falloff
            const ang = Math.atan2(dy, dx);
            tx = Math.cos(ang) * force;
            ty = Math.sin(ang) * force;
          }
        }
        // simple bouncy spring toward the target displacement
        L.vx = (L.vx + (tx - L.x) * REPEL.spring) * REPEL.friction;
        L.vy = (L.vy + (ty - L.y) * REPEL.spring) * REPEL.friction;
        L.x += L.vx; L.y += L.vy;
        L.el.style.transform = "translate(" + L.x + "px, " + L.y + "px) rotate(" + (L.x * 0.3) + "deg)";
      }
      requestAnimationFrame(tick);
    })();
  }

  /* ---------------------------------------------------------
     5e. SKILLS MARQUEE — infinite horizontal loop.
         Two identical groups so the -50% keyframe wraps
         seamlessly. Vanilla port of the Remotion marquee.
     --------------------------------------------------------- */
  function initMarquee() {
    const track = document.getElementById("marqueeTrack");
    if (!track || !SITE.marquee || !SITE.marquee.length) return;
    track.innerHTML = "";

    function buildGroup(hidden) {
      const group = document.createElement("div");
      group.className = "marquee-group";
      if (hidden) group.setAttribute("aria-hidden", "true");   // duplicate isn't announced
      SITE.marquee.forEach(function (item) {
        const label = document.createElement("span");
        label.className = "marquee-item";
        label.textContent = item;
        group.appendChild(label);
        const sep = document.createElement("span");
        sep.className = "marquee-sep";
        sep.setAttribute("aria-hidden", "true");
        sep.textContent = "✦";                            // ✦
        group.appendChild(sep);
      });
      return group;
    }

    track.appendChild(buildGroup(false));
    track.appendChild(buildGroup(true));   // second copy → seamless wrap at -50%
  }

  function initHero() {
    if (!document.querySelector(".hero-title")) return;   // only the homepage
    let rt = null;
    window.addEventListener("resize", function () {
      clearTimeout(rt);
      rt = setTimeout(fitHeroTitle, 150);                 // re-fit + re-measure on resize
    });
    // fonts can load after first paint → re-fit once they're ready
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitHeroTitle);
  }

  /* ---------------------------------------------------------
     5d. WORD-BY-WORD TEXT REVEAL on scroll (fade-in-blur).
         Any [data-reveal-words] element has its text split into
         staggered word spans that un-blur when scrolled into view.
         Ported from the motion/react TextReveal component.
     --------------------------------------------------------- */
  let wordObs = null;
  function buildWordReveal() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;   // text stays plain
    const els = document.querySelectorAll("[data-reveal-words]");
    if (!els.length) return;

    if (!wordObs) {
      wordObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("wr-in"); wordObs.unobserve(e.target); }
        });
      }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    }

    els.forEach(function (el) {
      const text = el.textContent;               // current-language plain text (set by applyLang)
      if (!text.trim()) return;
      el.setAttribute("aria-label", text);       // screen readers read the whole line
      el.classList.remove("wr-in");              // reset so it re-reveals on language change
      el.textContent = "";

      let wi = 0;
      text.split(/(\s+)/).forEach(function (part) {
        if (!part) return;
        if (/^\s+$/.test(part)) { el.appendChild(document.createTextNode(part)); return; }  // keep spacing
        const span = document.createElement("span");
        span.className = "reveal-word";
        span.setAttribute("aria-hidden", "true");
        span.style.setProperty("--wr-i", wi++);
        span.textContent = part;
        el.appendChild(span);
      });

      wordObs.observe(el);
    });
  }

  /* ---------------------------------------------------------
     6. ABOUT — experience timeline
     --------------------------------------------------------- */
  function renderExperience() {
    const items = document.getElementById("timelineItems");
    if (!items) return;
    items.innerHTML = "";

    SITE.experience.forEach(function (job, i) {
      const li = document.createElement("li");
      li.className = "timeline-item reveal " + (i % 2 === 0 ? "timeline-item--left" : "timeline-item--right");

      const dot = document.createElement("div");
      dot.className = "timeline-dot";

      const content = document.createElement("div");
      content.className = "timeline-content";

      const year = document.createElement("span");
      year.className = "timeline-year";
      year.textContent = job.period;

      const role = document.createElement("h3");
      role.className = "timeline-role";
      role.textContent = pick(job.role);

      const company = document.createElement("p");
      company.className = "timeline-company";
      company.textContent = job.company;

      const description = document.createElement("p");
      description.className = "timeline-description";
      description.textContent = pick(job.description);

      content.appendChild(year);
      content.appendChild(role);
      content.appendChild(company);
      content.appendChild(description);

      li.appendChild(dot);
      li.appendChild(content);
      items.appendChild(li);
    });

    observeReveals();     // fade-in each item, same as the rest of the site
    initTimelineScroll();
  }

  /* ---------------------------------------------------------
     6b. EXPERIENCE TIMELINE — scroll-linked fill line
         A fixed reference point (40% down the viewport) sweeps
         through the timeline as the page scrolls; the colored
         line's height tracks how far it has travelled, and each
         dot lights up once the fill line reaches it.
     --------------------------------------------------------- */
  let timelineBound = false;
  function updateTimelineFill() {
    const container = document.getElementById("expTimeline");
    const fill = document.getElementById("timelineFill");
    if (!container || !fill) return;

    const rect = container.getBoundingClientRect();
    const revealY = window.innerHeight * 0.4;
    const progress = Math.min(1, Math.max(0, (revealY - rect.top) / rect.height));
    fill.style.height = (progress * 100) + "%";

    const fillPx = progress * rect.height;
    document.querySelectorAll(".timeline-dot").forEach(function (dot) {
      const dotRect = dot.getBoundingClientRect();
      const dotOffset = (dotRect.top - rect.top) + dotRect.height / 2;
      dot.classList.toggle("is-active", fillPx >= dotOffset);
    });
  }

  function initTimelineScroll() {
    if (!document.getElementById("expTimeline")) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const fill = document.getElementById("timelineFill");
      if (fill) fill.style.height = "100%";
      document.querySelectorAll(".timeline-dot").forEach(function (dot) {
        dot.classList.add("is-active");
      });
      return;
    }

    updateTimelineFill();
    if (timelineBound) return;
    timelineBound = true;
    let ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        updateTimelineFill();
        ticking = false;
      });
    }, { passive: true });
    window.addEventListener("resize", updateTimelineFill);
  }

  /* ---------------------------------------------------------
     7. CASE STUDY  (case-study.html?project=<slug>)
     --------------------------------------------------------- */
  function renderCaseStudy() {
    const page = document.getElementById("caseStudy");
    if (!page) return;

    const slug = new URLSearchParams(window.location.search).get("project");
    const idx = SITE.projects.findIndex(function (p) { return p.slug === slug; });

    if (idx === -1) {
      page.innerHTML =
        '<p class="cs-notfound">' + t("cs.notfound") + "</p>" +
        '<a class="cs-back" href="/">← ' + t("cs.back") + "</a>";
      return;
    }

    const p = SITE.projects[idx];
    const cs = p.caseStudy || {};
    document.title = p.title + " — Bohdan Savchenko";

    document.getElementById("csTitle").textContent = p.title;
    document.getElementById("csType").textContent = pick(cs.type || p.category);
    document.getElementById("csYear").textContent = cs.year || "";
    document.getElementById("csRole").textContent = pick(cs.role);
    document.getElementById("csClient").textContent = pick(cs.client);

    ["overview", "problem", "research", "final"].forEach(function (key) {
      const el = document.getElementById("cs_" + key);
      if (el) el.textContent = pick(cs[key]);
    });

    // large hero image
    setMedia(document.getElementById("csCover"), p.image, p.title + " cover");

    renderGallery(p);
    renderOtherProjects(idx);
  }

  /* automated gallery: collects <folder>/1.webp … 9.webp (falling
     back to .gif per slot — e.g. Golden Draught ships 9.gif).
     Candidates are appended optimistically (keeps DOM order) and
     remove themselves if no file exists — gaps in numbering are fine.
     The slot already used as the page hero (p.image) is skipped.
     A cheap HEAD probe prunes missing slots immediately; the <img>
     keeps loading="lazy" so real pixels still load on demand. */
  function renderGallery(p) {
    const grid = document.getElementById("csGallery");
    if (!grid) return;
    grid.innerHTML = "";

    /* optional per-project horizontal groups (each becomes a side-by-side row,
       inserted in place at its lowest image number). Supports the legacy
       single `pair` too.
         { nums:[3,4], cols:"1fr 1fr", gap:"16px", ratio:"4 / 3" }  → equal blocks
         { nums:[9,8], cols:"1fr 2fr", gap:"40px" }                 → tall/fill    */
    const groups = p.groups || (p.pair ? [p.pair] : []);
    const numToGroup = {};       // image n -> group index
    const groupFigs = {};        // group index -> { n: figure }
    const groupRows = {};        // group index -> row element (placed in flow)
    const groupFirst = {};       // group index -> lowest n (insertion point)
    groups.forEach(function (g, gi) {
      groupFigs[gi] = {};
      groupFirst[gi] = Math.min.apply(null, g.nums);
      g.nums.forEach(function (n) { numToGroup[n] = gi; });
    });

    for (let n = 1; n <= GALLERY_MAX; n++) {
      const webp = p.folder + "/" + n + ".webp";
      const gif  = p.folder + "/" + n + ".gif";
      if (webp === p.image) continue;       // already shown as the hero

      const fig = document.createElement("figure");
      fig.className = "cs-figure";

      const img = document.createElement("img");
      img.loading = "lazy";
      img.decoding = "async";
      img.alt = p.title + " — gallery image " + n;
      img.src = webp;
      img.tabIndex = 0;                     // lightbox: keyboard-operable
      img.setAttribute("role", "button");
      // .webp missing -> try .gif once; if that fails too, drop the slot
      img.addEventListener("error", function () {
        if (img.src.indexOf(".gif") === -1) { img.src = gif; }
        else { fig.remove(); }
      });

      fig.appendChild(img);

      const gi = numToGroup[n];
      if (gi !== undefined) {
        groupFigs[gi][n] = fig;             // held for its horizontal row
        if (n === groupFirst[gi]) {         // place the (empty) row here, in order
          const row = document.createElement("div");
          row.className = "cs-gallery-pair";
          const g = groups[gi];
          if (g.cols) row.style.gridTemplateColumns = g.cols;
          if (g.gap) row.style.setProperty("--pair-gap", g.gap);
          if (g.ratio) { row.classList.add("is-equal"); row.style.setProperty("--pair-ratio", g.ratio); }
          else if (g.fit === "contain") { row.classList.add("is-contain"); }
          groupRows[gi] = row;
          grid.appendChild(row);
        }
      } else {
        grid.appendChild(fig);
      }

      // prune missing slots right away instead of waiting for the lazy
      // fetch; if HEAD itself fails (e.g. file://), the img error
      // handler above still covers it.
      fetch(webp, { method: "HEAD" })
        .then(function (r) {
          if (r.ok) return;
          return fetch(gif, { method: "HEAD" }).then(function (r2) {
            if (r2.ok) { img.src = gif; } else { fig.remove(); }
          });
        })
        .catch(function () {});
    }

    // fill each group's row in its configured order
    groups.forEach(function (g, gi) {
      const row = groupRows[gi];
      if (!row) return;
      let driverIdx = g.nums.length - 1;    // tall/fill mode: widest column drives height
      if (!g.ratio && g.cols) {
        const fr = g.cols.split(/\s+/).map(function (v) { return parseFloat(v) || 0; });
        driverIdx = fr.indexOf(Math.max.apply(null, fr));
      }
      g.nums.forEach(function (n, i) {
        const fig = groupFigs[gi][n];
        if (!fig) return;
        // tall/fill classes only for the default mode (not equal, not contain)
        if (!g.ratio && g.fit !== "contain") fig.classList.add(i === driverIdx ? "pair-tall" : "pair-fill");
        row.appendChild(fig);
      });
    });
  }

  /* "other projects" — up to 3 cards, excluding the current one */
  function renderOtherProjects(currentIdx) {
    const grid = document.getElementById("otherProjects");
    if (!grid) return;
    grid.innerHTML = "";

    for (let step = 1; step <= 3 && step < SITE.projects.length; step++) {
      const p = SITE.projects[(currentIdx + step) % SITE.projects.length];
      grid.appendChild(buildCard(p));
    }
    observeReveals();
  }

  /* ---------------------------------------------------------
     8. LIGHTBOX — click any .cs-figure image to zoom.
        Overlay is built once; opening is event-delegated so
        re-rendered figures keep working.
     --------------------------------------------------------- */
  function initLightbox() {
    const lb = document.createElement("div");
    lb.className = "lightbox";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.setAttribute("aria-label", "Image preview");
    lb.innerHTML =
      '<button type="button" class="lightbox-close" aria-label="Close image preview">' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>' +
      "</button>" +
      '<button type="button" class="lightbox-nav lightbox-prev" aria-label="Previous image">' +
      '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>' +
      "</button>" +
      '<img class="lightbox-img" alt="" />' +
      '<button type="button" class="lightbox-nav lightbox-next" aria-label="Next image">' +
      '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>' +
      "</button>";
    document.body.appendChild(lb);

    const imgEl = lb.querySelector(".lightbox-img");
    const closeBtn = lb.querySelector(".lightbox-close");
    const prevBtn = lb.querySelector(".lightbox-prev");
    const nextBtn = lb.querySelector(".lightbox-next");

    let images = [];      // snapshot of the current gallery's <img> nodes
    let index = -1;       // index within `images`
    let lastFocus = null;

    // load the image at position i and update arrow availability (no looping)
    function show(i) {
      if (i < 0 || i >= images.length) return;
      index = i;
      const img = images[i];
      imgEl.src = img.currentSrc || img.src;
      imgEl.alt = img.alt || "";
      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === images.length - 1;
      // never leave focus on a disabled arrow
      if (document.activeElement === prevBtn && prevBtn.disabled) focusSafe(nextBtn);
      if (document.activeElement === nextBtn && nextBtn.disabled) focusSafe(prevBtn);
    }

    function focusSafe(pref) {
      if (pref && !pref.disabled) pref.focus();
      else if (!nextBtn.disabled) nextBtn.focus();
      else if (!prevBtn.disabled) prevBtn.focus();
      else closeBtn.focus();
    }

    function next() { if (index < images.length - 1) show(index + 1); }
    function prev() { if (index > 0) show(index - 1); }

    function openFrom(clickedImg) {
      // snapshot the gallery at open time so the index maps to what's on screen
      images = Array.prototype.slice.call(document.querySelectorAll(".cs-gallery img"));
      let i = images.indexOf(clickedImg);
      if (i === -1) { images = [clickedImg]; i = 0; }   // fallback: standalone image
      lastFocus = document.activeElement;
      lb.classList.add("open");
      document.body.classList.add("no-scroll");
      show(i);
      closeBtn.focus();
    }

    function close() {
      lb.classList.remove("open");
      document.body.classList.remove("no-scroll");
      if (lastFocus && lastFocus.focus) lastFocus.focus();
      setTimeout(function () {
        if (!lb.classList.contains("open")) imgEl.removeAttribute("src");
      }, 320);
    }

    // backdrop / image click closes; the controls handle their own clicks
    lb.addEventListener("click", close);
    prevBtn.addEventListener("click", function (e) { e.stopPropagation(); prev(); focusSafe(prevBtn); });
    nextBtn.addEventListener("click", function (e) { e.stopPropagation(); next(); focusSafe(nextBtn); });

    // open: delegated, survives case-study re-renders
    document.addEventListener("click", function (e) {
      const img = e.target.closest(".cs-figure img");
      if (img) openFrom(img);
    });

    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) {
        // keyboard-open on a focused gallery image
        if ((e.key === "Enter" || e.key === " ") && e.target.matches(".cs-figure img")) {
          e.preventDefault();
          openFrom(e.target);
        }
        return;
      }
      // lightbox is active
      if (e.key === "Escape") { close(); return; }
      if (e.key === "ArrowRight") { e.preventDefault(); next(); return; }
      if (e.key === "ArrowLeft")  { e.preventDefault(); prev(); return; }
      if (e.key === "Tab") {       // trap focus among the enabled controls
        e.preventDefault();
        const focusables = [prevBtn, nextBtn, closeBtn].filter(function (b) { return !b.disabled; });
        const cur = focusables.indexOf(document.activeElement);
        const dir = e.shiftKey ? -1 : 1;
        focusables[(cur + dir + focusables.length) % focusables.length].focus();
      }
    });
  }

  /* ---------------------------------------------------------
     9. PAGE-TRANSITION FADE between internal pages
     --------------------------------------------------------- */
  function initPageFade() {
    window.addEventListener("pageshow", function () {
      document.body.classList.remove("page-exit");   // bfcache safety
    });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.addEventListener("click", function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const a = e.target.closest("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;

      const href = a.getAttribute("href") || "";
      if (!href || href.charAt(0) === "#" || href.indexOf("mailto:") === 0) return;

      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;                    // external
      if (url.pathname === window.location.pathname && url.hash) return;    // same-page anchor
      if (url.pathname === window.location.pathname &&
          url.search === window.location.search && !url.hash) return;       // same page

      e.preventDefault();
      document.body.classList.add("page-exit");
      setTimeout(function () { window.location.href = a.href; }, 220);
    });
  }

  /* ---------------------------------------------------------
     10. SCROLL REVEALS (Intersection Observer, staggered)
     --------------------------------------------------------- */
  let io;
  function observeReveals() {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = document.querySelectorAll(".reveal:not(.in-view), .project-card:not(.in-view)");

    if (prefersReduced || !("IntersectionObserver" in window)) {
      targets.forEach(function (el) { el.classList.add("in-view"); });
      return;
    }

    if (!io) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const siblings = Array.from(el.parentElement ? el.parentElement.children : []);
          const idx = el.classList.contains("project-card") ? siblings.indexOf(el) : 0;
          el.style.transitionDelay = ((idx % 2 === 0 ? 0 : 80) + (idx > 1 ? 40 : 0)) + "ms";
          el.classList.add("in-view");
          io.unobserve(el);
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    }
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---------------------------------------------------------
     11. Header border on scroll + footer year
     --------------------------------------------------------- */
  function initChrome() {
    const header = document.getElementById("header");
    const onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  /* ---------------------------------------------------------
     Boot
     --------------------------------------------------------- */
  function init() {
    initTheme();
    initLang();      // triggers the first render pass + builds the hero letters
    initFilters();
    initCursor();
    initHero();      // hero repel: resize/font re-fit (letters built via initLang)
    initMarquee();   // skills loop (homepage only)
    initMenu();
    initLightbox();
    initPageFade();
    initChrome();
    observeReveals();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
