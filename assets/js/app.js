/* ============================================================
   Handy Heroes Services — front-end
   ============================================================ */
(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- data ---------- */
  const SERVICES = [
    { icon: "💦", name: "Pressure Washing", blurb: "Driveways, patios, pool decks, roofs & siding — grime gone, curb appeal restored." },
    { icon: "🪵", name: "Dock & Deck Restoration", blurb: "Sand, seal and rebuild docks and decks so they look (and last) like new." },
    { icon: "🧱", name: "Patios & Hardscaping", blurb: "Pavers, walkways and outdoor living spaces built to enjoy for years." },
    { icon: "🔧", name: "Home Repairs", blurb: "Drywall, doors, fixtures, the honey-do list — the small stuff handled right." },
    { icon: "🏠", name: "Renovations", blurb: "Kitchens, baths and full refreshes managed by one trusted crew." },
    { icon: "🎨", name: "Painting & Finishing", blurb: "Interior & exterior painting with crisp lines and clean job sites." },
  ];

  const GALLERY = [
    { src: "assets/img/patio.jpg", cap: "Backyard patio & hardscape", cls: "wide" },
    { src: "assets/img/dock.jpg", cap: "Dock restoration · golden hour", cls: "tall" },
    { src: "assets/img/pressure.jpg", cap: "Driveway pressure washing", cls: "" },
    { src: "assets/img/villa.jpg", cap: "Full exterior refresh", cls: "" },
    { src: "assets/img/worker.jpg", cap: "Your friendly hero, on call", cls: "" },
    { src: "assets/img/after.jpg", cap: "Driveway · after", cls: "" },
  ];

  const QUOTES = [
    { t: "Our driveway looked brand new — and they were done before lunch. Unreal.", n: "Maria G.", w: "Coral Gables" },
    { t: "Rebuilt our dock and it's better than the original. Honest, on time, fair price.", n: "Dave R.", w: "Fort Lauderdale" },
    { t: "Booked a pressure wash, ended up having them do the whole patio. So glad I did.", n: "The Nguyens", w: "Pinecrest" },
  ];

  /* ---------- render ---------- */
  $("#servicesGrid").innerHTML = SERVICES.map((s) => `
    <article class="service" data-service="${s.name}" role="button" tabindex="0">
      <span class="service__icon">${s.icon}</span>
      <h3>${s.name}</h3>
      <p>${s.blurb}</p>
      <span class="service__add">+ Add to quote</span>
    </article>`).join("");

  $("#gallery").innerHTML = GALLERY.map((g) => `
    <figure class="${g.cls}">
      <img loading="lazy" src="${g.src}" alt="${g.cap}" onerror="this.parentElement.style.background='#1b3050'" />
      <figcaption>${g.cap}</figcaption>
    </figure>`).join("");

  $("#quotes").innerHTML = QUOTES.map((q) => `
    <div class="quote">
      <div class="quote__stars">★★★★★</div>
      <p>“${q.t}”</p>
      <div class="quote__who">${q.n}<span>${q.w}</span></div>
    </div>`).join("");

  $("#serviceChips").innerHTML = SERVICES.map((s) => `<button type="button" class="chip" data-chip="${s.name}">${s.name}</button>`).join("");

  /* ---------- year ---------- */
  $("#year").textContent = new Date().getFullYear();

  /* ---------- nav ---------- */
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 30);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  const burger = $("#burger"), links = $("#navLinks");
  burger.addEventListener("click", () => links.classList.toggle("is-open"));
  $$("#navLinks a").forEach((a) => a.addEventListener("click", () => links.classList.remove("is-open")));

  /* ---------- reveal on scroll ---------- */
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
  }), { threshold: 0.14, rootMargin: "0px 0px -6% 0px" });
  $$(".reveal").forEach((el) => io.observe(el));

  /* ---------- animated counters ---------- */
  const cio = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    const el = e.target, target = parseFloat(el.dataset.count), dec = target % 1 !== 0;
    let cur = 0; const step = target / 55;
    const tick = () => {
      cur += step;
      if (cur >= target) { el.textContent = dec ? target.toFixed(1) : Math.round(target).toLocaleString(); return; }
      el.textContent = dec ? cur.toFixed(1) : Math.round(cur).toLocaleString();
      requestAnimationFrame(tick);
    };
    tick(); cio.unobserve(el);
  }), { threshold: 0.6 });
  $$("[data-count]").forEach((c) => cio.observe(c));

  /* ---------- before/after slider ---------- */
  (function () {
    const ba = $("#ba"), before = $("#baBefore"), handle = $("#baHandle");
    if (!ba) return;
    let dragging = false;
    const set = (pct) => {
      pct = Math.max(0, Math.min(100, pct));
      before.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      handle.style.left = pct + "%";
      handle.setAttribute("aria-valuenow", Math.round(pct));
    };
    const fromEvent = (e) => {
      const rect = ba.getBoundingClientRect();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      set((x / rect.width) * 100);
    };
    const start = (e) => { dragging = true; fromEvent(e); };
    const move = (e) => { if (dragging) fromEvent(e); };
    const end = () => { dragging = false; };
    ba.addEventListener("mousedown", start);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", end);
    ba.addEventListener("touchstart", start, { passive: true });
    window.addEventListener("touchmove", move, { passive: true });
    window.addEventListener("touchend", end);
    handle.addEventListener("keydown", (e) => {
      const now = parseFloat(handle.getAttribute("aria-valuenow")) || 50;
      if (e.key === "ArrowLeft") { set(now - 4); e.preventDefault(); }
      if (e.key === "ArrowRight") { set(now + 4); e.preventDefault(); }
    });
    // gentle auto-hint on first view
    const hintIO = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      hintIO.disconnect();
      let p = 50, dir = 1, n = 0;
      const id = setInterval(() => {
        p += dir * 2; if (p >= 62 || p <= 38) { dir *= -1; n++; }
        set(p); if (n >= 2 && p === 50) clearInterval(id);
      }, 16);
      setTimeout(() => { clearInterval(id); set(50); }, 1400);
    }), { threshold: 0.5 });
    hintIO.observe(ba);
  })();

  /* ---------- quote: service chips + service-card → quote ---------- */
  const chosen = new Set();
  const field = $("#servicesField");
  const syncField = () => { field.value = [...chosen].join(", "); };
  $$(".chip").forEach((c) => c.addEventListener("click", () => {
    const v = c.dataset.chip;
    c.classList.toggle("on");
    c.classList.contains("on") ? chosen.add(v) : chosen.delete(v);
    syncField();
  }));
  // clicking a service card adds it and jumps to the quote form
  const addService = (name) => {
    const chip = $(`.chip[data-chip="${CSS.escape(name)}"]`);
    if (chip && !chip.classList.contains("on")) { chip.classList.add("on"); chosen.add(name); syncField(); }
    $("#contact").scrollIntoView({ behavior: "smooth" });
  };
  document.addEventListener("click", (e) => {
    const card = e.target.closest("[data-service]");
    if (card) addService(card.dataset.service);
  });
  document.addEventListener("keydown", (e) => {
    const card = e.target.closest && e.target.closest("[data-service]");
    if (card && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); addService(card.dataset.service); }
  });

  /* ---------- form: Netlify in prod, mailto fallback locally ---------- */
  const form = $(".form");
  if (form) {
    form.addEventListener("submit", (e) => {
      if (location.hostname.endsWith(".netlify.app") || location.hostname === "handyheroes.com") return; // native Netlify submit
      e.preventDefault();
      const d = new FormData(form);
      const subject = encodeURIComponent(`Quote request — ${d.get("name") || ""}`);
      const body = encodeURIComponent(
        `Name: ${d.get("name") || ""}\nPhone: ${d.get("phone") || ""}\nEmail: ${d.get("email") || ""}\nServices: ${d.get("services") || ""}\n\n${d.get("message") || ""}`
      );
      window.location.href = `mailto:HandyHeroesservices@yahoo.com?subject=${subject}&body=${body}`;
    });
  }
})();
