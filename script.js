/* ================================================================
   EDIT ME: everything personal lives here.
   Leave `projects` empty to fill the Dex from github.com/<github>.
   ================================================================ */
const PROFILE = {
  name: "Tanay Joshi",
  handle: "TANAY",
  github: "TanayJoshi-XR",
  id: "00427",
  role: "ML Student",
  location: "India",
  tagline: "Training models. Catching bugs.",
  bio: "Machine learning student working my way from Python and data structures up to models that learn. " +
       "I like turning messy data into something useful and I'm building my foundations in C++, DSA and AI, one repo at a time.",
  email: "tanayjoshi2@gmail.com",
  links: [
    // { label: "LinkedIn", url: "https://www.linkedin.com/in/..." },
  ],
  badges: ["PYTHON", "ML", "C++", "DSA", "GIT"],   // shown as pixel gems on the trainer card
  skills: [                                         // name, type, level 0-100
    { name: "Python", type: "CODE", level: 75 },
    { name: "Machine Learning", type: "AI", level: 60 },
    { name: "Data Structures & Algorithms", type: "LOGIC", level: 60 },
    { name: "C++", type: "CODE", level: 60 },
    { name: "Git & GitHub", type: "TOOL", level: 55 },
  ],
  // Leave empty to fill the Dex straight from github.com/<github>
  projects: [
    { title: "Alien Invasion", description: "A 2D arcade shooter in Python with Pygame: a ship, a game loop, keyboard controls and sprites.",
      tech: ["Python", "Pygame"], github: "https://github.com/TanayJoshi-XR/Python", live: "" },
    { title: "C-plus-plus", description: "C++ lessons, working up from the basics one program at a time.",
      tech: ["C++"], github: "https://github.com/TanayJoshi-XR/C-plus-plus", live: "" },
    { title: "DSA", description: "A home for data structures and algorithms practice. Just getting started.",
      tech: ["DSA"], github: "https://github.com/TanayJoshi-XR/DSA", live: "" },
  ],
};

/* ============ PIXEL ART (original) ============
   Each letter is a CSS variable or hex colour; "." is transparent. */
const SPRITES = {
  dex: {
    map: { R: "accent", K: "bg2", S: "screen-fg", W: "#f4f1e6", Y: "accent2" },
    rows: [
      ".RRRRRRRR.",
      "RRRRRRRRRR",
      "RKKKKKKKKR",
      "RKSSSSSSKR",
      "RKSSSSSSKR",
      "RKSSSSSSKR",
      "RKKKKKKKKR",
      "RRRRRRRRRR",
      "RKRRRRWRRR",
      "KKKRRRRRWR",
      "RKRRRRYRRR",
      "RRRRRRRRRR",
    ],
  },
  trainer: {
    map: { C: "accent", c: "#8f1d24", H: "#2b1d16", S: "#f2c79a", s: "#c99a70", K: "#101010",
           J: "accent3", j: "#1d7f6c", P: "#2b3a55", B: "#f4f1e6", W: "#ffffff" },
    rows: [
      "....CCCCC...",
      "...CCCCCCC..",
      "..CCCCCCCCcc",
      "..HHSSSSSH..",
      "..HSKSSKSH..",
      "...SSSSSS...",
      "...SssssS...",
      "..JJJWWJJJ..",
      ".JJJJWWJJJJ.",
      ".SJJJJJJJJS.",
      ".S.jJJJJj.S.",
      "...PPPPPP...",
      "...PP..PP...",
      "...PP..PP...",
      "..BBB..BBB..",
    ],
  },
  gem: {
    map: { L: "#ffffff", A: "accent2", D: "accent" },
    rows: [
      "..AA..",
      ".ALAA.",
      "AALAAA",
      "AAAAAD",
      ".AAAD.",
      "..DD..",
    ],
  },
  scroll: {
    map: { P: "#f4f1e6", p: "#c9c2a8", K: "bg2", A: "accent" },
    rows: [
      "AAAAAAAA",
      "PPPPPPPP",
      "PKKKKKpP",
      "PPPPPPPP",
      "PKKKKpPP",
      "PPPPPPPP",
      "PKKKpPPP",
      "AAAAAAAA",
    ],
  },
};

/* ============ HELPERS ============ */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const cssVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim();
const colour = (key) => (key.startsWith("#") ? key : cssVar(key));

function drawSprite(canvas, name, scale) {
  const def = SPRITES[name];
  const w = def.rows[0].length, h = def.rows.length;
  canvas.width = w * scale;
  canvas.height = h * scale;
  const ctx = canvas.getContext("2d");
  def.rows.forEach((row, y) => [...row].forEach((ch, x) => {
    if (ch === ".") return;
    ctx.fillStyle = colour(def.map[ch]);
    ctx.fillRect(x * scale, y * scale, scale, scale);
  }));
}

function spriteEl(name, scale) {
  const c = document.createElement("canvas");
  c.className = "sprite";
  c.setAttribute("aria-hidden", "true");
  c.dataset.sprite = name;
  c.dataset.scale = scale;
  drawSprite(c, name, scale);
  return c;
}

function paintSprites() {
  $$("canvas[data-sprite]").forEach((c) => drawSprite(c, c.dataset.sprite, Number(c.dataset.scale || 4)));
}

function el(tag, props = {}, ...kids) {
  const n = document.createElement(tag);
  Object.assign(n, props);
  kids.flat().forEach((k) => n.append(k));
  return n;
}

/* ============ PROFILE FIELDS ============ */
function fillFields() {
  const values = { ...PROFILE, year: new Date().getFullYear() };
  $$("[data-field]").forEach((n) => {
    if (n.dataset.field !== "tagline") n.textContent = values[n.dataset.field] ?? "";
  });
  const badges = $(".badges");
  PROFILE.badges.forEach((b) => {
    const g = spriteEl("gem", 4);
    g.setAttribute("title", b);
    badges.append(g);
  });
  badges.setAttribute("aria-label", `Badges: ${PROFILE.badges.join(", ")}`);

  const links = $(".contact__links");
  const all = [...PROFILE.links];
  if (PROFILE.github) all.unshift({ label: "GitHub", url: `https://github.com/${PROFILE.github}` });
  all.forEach((l) => links.append(el("li", {}, el("a", { href: l.url, target: "_blank", rel: "noopener", textContent: `▶ ${l.label}` }))));
}

/* ============ TYPEWRITER ============ */
function typewriter() {
  const n = $(".typewriter");
  const text = PROFILE.tagline;
  if (reduceMotion) { n.textContent = text; return; }
  let i = 0;
  (function tick() {
    n.textContent = text.slice(0, ++i);
    if (i < text.length) setTimeout(tick, 55);
  })();
}

/* ============ MOVES ============ */
function renderMoves() {
  const list = $(".moves");
  PROFILE.skills.forEach((s) => {
    const fill = el("div", { className: "move__fill" });
    fill.dataset.level = s.level;
    list.append(el("li", { className: "card move" },
      el("div", { className: "move__top" },
        el("span", { className: "move__name", textContent: s.name }),
        el("span", { className: "move__type", textContent: s.type })),
      el("div", { className: "move__bar", role: "meter", ariaLabel: `${s.name} ${s.level} out of 100`,
        ariaValueMin: 0, ariaValueMax: 100, ariaValueNow: s.level }, fill),
      el("p", { className: "move__pp", textContent: `PP ${Math.round(s.level / 5)}/20` })));
  });
  // bars fill when they scroll into view
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    $$(".move__fill", e.target).forEach((f) => (f.style.width = `${f.dataset.level}%`));
    io.unobserve(e.target);
  }), { threshold: 0.3 });
  io.observe(list);
}

/* ============ PROJECT DEX ============ */
const dexState = { query: "", tech: new Set(), projects: [] };

async function loadProjects() {
  if (PROFILE.projects.length || !PROFILE.github) return PROFILE.projects;
  try {
    const r = await fetch(`https://api.github.com/users/${PROFILE.github}/repos?sort=updated&per_page=30`);
    if (!r.ok) throw new Error(r.status);
    const repos = await r.json();
    return repos.filter((x) => !x.fork && !x.archived).map((x) => ({
      title: x.name.replace(/[-_]/g, " "),
      description: x.description || "No description yet.",
      tech: [x.language, ...(x.topics || []).slice(0, 3)].filter(Boolean),
      github: x.html_url,
      live: x.homepage || "",
    }));
  } catch (e) {
    $(".dex-count").textContent = "Could not reach GitHub right now. Try again later.";
    return [];
  }
}

function renderChips() {
  const techs = [...new Set(dexState.projects.flatMap((p) => p.tech))].sort();
  const box = $(".chips");
  box.replaceChildren(...techs.map((t) => {
    const b = el("button", { className: "chip", type: "button", textContent: t });
    b.setAttribute("aria-pressed", "false");
    b.addEventListener("click", () => {
      dexState.tech.has(t) ? dexState.tech.delete(t) : dexState.tech.add(t);
      b.setAttribute("aria-pressed", String(dexState.tech.has(t)));
      renderDex();
    });
    return b;
  }));
}

function renderDex() {
  const q = dexState.query.trim().toLowerCase();
  const shown = dexState.projects.filter((p) => {
    const hay = `${p.title} ${p.description} ${p.tech.join(" ")}`.toLowerCase();
    const matchesQuery = !q || hay.includes(q);
    const matchesTech = [...dexState.tech].every((t) => p.tech.includes(t));
    return matchesQuery && matchesTech;
  });
  $(".dex").replaceChildren(...shown.map((p) => {
    const no = String(dexState.projects.indexOf(p) + 1).padStart(3, "0");
    const links = el("div", { className: "entry__links" });
    if (p.github) links.append(el("a", { className: "btn", href: p.github, target: "_blank", rel: "noopener", textContent: "CODE" }));
    if (p.live) links.append(el("a", { className: "btn btn--primary", href: p.live, target: "_blank", rel: "noopener", textContent: "LIVE" }));
    return el("li", { className: "card entry" },
      el("div", { className: "entry__head" },
        el("div", { className: "entry__screen" }, spriteEl("scroll", 5)),
        el("div", {}, el("p", { className: "entry__no", textContent: `No. ${no}` }),
          el("h3", { className: "entry__title", textContent: p.title }))),
      el("p", { className: "entry__desc", textContent: p.description }),
      el("ul", { className: "entry__tags" }, p.tech.map((t) => el("li", { textContent: t }))),
      links);
  }));
  const total = dexState.projects.length;
  $(".dex-empty").hidden = !(total && !shown.length);
  if (total) $(".dex-count").textContent = `SEEN ${shown.length} / ${total}`;
  else if (!$(".dex-count").textContent) $(".dex-count").textContent = "Projects coming soon.";
}

async function initDex() {
  dexState.projects = await loadProjects();
  renderChips();
  renderDex();
  $(".search input").addEventListener("input", (e) => { dexState.query = e.target.value; renderDex(); });
  $("[data-action=clear]").addEventListener("click", () => {
    dexState.query = "";
    dexState.tech.clear();
    $(".search input").value = "";
    $$(".chip").forEach((c) => c.setAttribute("aria-pressed", "false"));
    renderDex();
  });
}

/* ============ TITLE SCENE: rolling hills, tall grass, sky ============ */
function rng(seed) {
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

let scene = null;
function paintScene(frame = 0) {
  const c = $(".title__scene");
  const ctx = c.getContext("2d");
  const W = c.width, H = c.height;
  const night = document.documentElement.dataset.theme === "night";
  const sky = night ? ["#070a14", "#0d1426", "#16213b"] : ["#c4d86a", "#9bbc0f", "#9bbc0f"];
  sky.forEach((s, i) => { ctx.fillStyle = s; ctx.fillRect(0, (i * H) / 3, W, H / 3 + 1); });

  const r = rng(9);
  if (night) {  // stars
    for (let i = 0; i < 70; i++) {
      const x = Math.floor(r() * W), y = Math.floor(r() * H * 0.55);
      if ((i + Math.floor(frame / 8)) % 7) { ctx.fillStyle = i % 5 ? "#8b97ab" : "#eef2f7"; ctx.fillRect(x, y, 1, 1); }
    }
  }
  // sun or moon
  ctx.fillStyle = night ? "#eef2f7" : "#e6f0a0";
  const cx = W - 52, cy = 30, R = 12;
  for (let y = -R; y <= R; y++) for (let x = -R; x <= R; x++) {
    if (x * x + y * y > R * R) continue;
    if (night && (x - 5) ** 2 + (y + 3) ** 2 < (R - 2) ** 2) continue;
    ctx.fillRect(cx + x, cy + y, 1, 1);
  }
  // drifting clouds
  ctx.fillStyle = night ? "#1d2a47" : "#e9f3b8";
  for (let i = 0; i < 4; i++) {
    const x = ((i * 97 + frame * (0.15 + i * 0.05)) % (W + 60)) - 40, y = 16 + i * 14;
    ctx.fillRect(x, y, 30, 4); ctx.fillRect(x + 6, y - 3, 16, 3); ctx.fillRect(x + 4, y + 4, 22, 2);
  }
  // two hill layers
  const hills = night ? ["#10241e", "#0b1a15"] : ["#8bac0f", "#306230"];
  hills.forEach((col, k) => {
    ctx.fillStyle = col;
    for (let x = 0; x < W; x++) {
      const h = Math.round(H * (0.62 + k * 0.1) + Math.sin(x / (24 - k * 6) + k) * (6 - k));
      ctx.fillRect(x, h, 1, H - h);
    }
  });
  // tall grass tufts that sway
  ctx.fillStyle = night ? "#1d7f6c" : "#0f380f";
  const g = rng(4);
  for (let i = 0; i < 46; i++) {
    const x = Math.floor(g() * W), base = H - 2 - Math.floor(g() * 22);
    const sway = (Math.floor(frame / 12) + i) % 2;
    ctx.fillRect(x, base - 5, 1, 5);
    ctx.fillRect(x + 2 + sway, base - 7, 1, 7);
    ctx.fillRect(x + 4, base - 4, 1, 4);
  }
}

function startScene() {
  paintScene(0);
  if (reduceMotion) return;
  let f = 0;
  clearInterval(scene);
  scene = setInterval(() => paintScene(++f), 120);  // ~8 fps is plenty for pixel art
}

/* ============ THEME ============ */
function setTheme(t) {
  document.documentElement.dataset.theme = t;
  try { localStorage.setItem("tj-theme", t); } catch (e) {}
  $(".theme-btn__label").textContent = t === "day" ? "DAY" : "NIGHT";
  paintSprites();
  paintScene();
}

/* ============ NAV, COPY EMAIL ============ */
function initUI() {
  const toggle = $(".nav__toggle"), links = $(".nav__links");
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  $$(".nav__links a").forEach((a) => a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }));
  $(".theme-btn").addEventListener("click", () =>
    setTheme(document.documentElement.dataset.theme === "day" ? "night" : "day"));
  $(".theme-btn__label").textContent = document.documentElement.dataset.theme === "day" ? "DAY" : "NIGHT";

  $("[data-action=copy-email]").addEventListener("click", async () => {
    const status = $(".contact__status");
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      status.textContent = "Email copied! It's super effective.";
    } catch (e) {
      status.textContent = `Copy failed. The email is ${PROFILE.email}`;
    }
  });
}

/* ============ START ============ */
fillFields();
paintSprites();
typewriter();
renderMoves();
initUI();
startScene();
initDex();
