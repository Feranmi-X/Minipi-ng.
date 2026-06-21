// ── EMAIL JS INIT ─────────────────────────────────────────
try { emailjs.init("iPxqCrlDaf1OsTw3J"); } catch(e) {}

// ── SHARED KEYS ───────────────────────────────────────────
const CART_KEY = "minipi_cart";

// ── SUPABASE ──────────────────────────────────────────────
const SB_URL = "https://sygdrjmjjxwxuczcnxjr.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5Z2Ryam1qanh3eHVjemNueGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzODI0MDIsImV4cCI6MjA5Njk1ODQwMn0.xp-zwipa_l-1JeYzyTqSNxeK1dwqGH-ilK35jIXSncg";
let sb = null;
try {
  if (window.supabase && typeof window.supabase.createClient === "function") {
    sb = window.supabase.createClient(SB_URL, SB_KEY);
  }
} catch (e) { console.warn("Supabase init failed", e); }

// ── DARK MODE ─────────────────────────────────────────────
const html     = document.documentElement;
const themeBtn = document.getElementById("themeBtn");
const iconSun  = document.getElementById("iconSun");
const iconMoon = document.getElementById("iconMoon");

function applyTheme(dark) {
  if (dark) {
    html.classList.add("dark");
    if (iconSun)  iconSun.classList.add("hidden");
    if (iconMoon) iconMoon.classList.remove("hidden");
  } else {
    html.classList.remove("dark");
    if (iconSun)  iconSun.classList.remove("hidden");
    if (iconMoon) iconMoon.classList.add("hidden");
  }
}

const savedTheme  = localStorage.getItem("gTheme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(savedTheme ? savedTheme === "dark" : prefersDark);

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const isDark = html.classList.contains("dark");
    applyTheme(!isDark);
    localStorage.setItem("gTheme", isDark ? "light" : "dark");
  });
}

// ── MOBILE MENU ───────────────────────────────────────────
const hamburger  = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle("hidden");
  });
  document.addEventListener("click", (e) => {
    if (!mobileMenu.contains(e.target) && e.target !== hamburger)
      mobileMenu.classList.add("hidden");
  });
}

// ── ABOUT TOGGLE ──────────────────────────────────────────
const toggleBtn = document.getElementById("toggleBtn");
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    const content = document.getElementById("moreContent");
    if (!content) return;
    content.classList.toggle("hidden");
    toggleBtn.textContent = content.classList.contains("hidden") ? "See More" : "See Less";
  });
}

// ── COPY ACCOUNT ──────────────────────────────────────────
function copyAcct() {
  navigator.clipboard.writeText("0230092228")
    .then(() => showToast("Account number copied!"))
    .catch(() => showToast("Copy failed — number: 0230092228"));
}
window.copyAcct = copyAcct;

// ── CATEGORIES DROPDOWN (desktop) ─────────────────────────
(function () {
  const btn = document.getElementById("catNavBtn");
  const dd  = document.getElementById("catNavDropdown");
  const chv = document.getElementById("catNavChevron");
  const li  = document.getElementById("catNavItem");
  if (!btn || !dd || !li) return;

  function openDd() {
    dd.style.opacity       = "1";
    dd.style.pointerEvents = "auto";
    dd.style.transform     = "translateX(-50%) translateY(0)";
    if (chv) chv.style.transform = "rotate(180deg)";
  }
  function closeDd() {
    dd.style.opacity       = "0";
    dd.style.pointerEvents = "none";
    dd.style.transform     = "translateX(-50%) translateY(-6px)";
    if (chv) chv.style.transform = "";
  }

  li.addEventListener("mouseenter", openDd);
  li.addEventListener("mouseleave", closeDd);
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    dd.style.opacity === "1" ? closeDd() : openDd();
  });
  document.addEventListener("click", (e) => { if (!li.contains(e.target)) closeDd(); });

  // On index page, cat nav links scroll to shop + filter
  if (!window.location.pathname.includes("shop.html")) {
    document.querySelectorAll(".cat-nav-link").forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        closeDd();
        if (mobileMenu) mobileMenu.classList.add("hidden");
        setFilter(a.dataset.cat);
        document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  document.querySelectorAll(".mob-cat-btn").forEach((b) => {
    b.addEventListener("click", () => {
      setFilter(b.dataset.cat);
      if (mobileMenu) mobileMenu.classList.add("hidden");
      document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
    });
  });
})();

// ── CART HELPERS ──────────────────────────────────────────
function loadCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); }
  catch { return []; }
}
function saveCart(c) { localStorage.setItem(CART_KEY, JSON.stringify(c)); }

// ── IMAGE URL OPTIMIZER ───────────────────────────────────
function optimizeImgUrl(url, w) {
  if (!url || typeof url !== "string") return url;
  if (!url.includes("images.unsplash.com")) return url;
  try {
    const u = new URL(url);
    u.searchParams.set("auto", "format");
    u.searchParams.set("fit",  "crop");
    u.searchParams.set("w",    String(w));
    u.searchParams.set("q",    "70");
    return u.toString();
  } catch { return url; }
}

// ── PRODUCTS DATA (fallback) ──────────────────────────────
const products = [
  // PHONES
  { id: 1,  name: "iPhone 15 Pro Max",          cat: "phone",  price: 1845000, new_arrival: false, img: "https://images.unsplash.com/photo-1696446702183-cbd13d3c1e0e?auto=format&fit=crop&w=400&q=80", desc: "A17 Pro chip, titanium design, 256GB storage, 48MP camera." },
  { id: 2,  name: "iPhone 15 Pro",               cat: "phone",  price: 1650000, new_arrival: false, img: "https://images.unsplash.com/photo-1592286927505-1def25115481?auto=format&fit=crop&w=400&q=80", desc: "Pro camera system with Dynamic Island, 128GB storage." },
  { id: 3,  name: "Samsung Galaxy S24 Ultra",    cat: "phone",  price: 1720000, new_arrival: false, img: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=400&q=80", desc: "200MP camera, built-in S Pen, 256GB storage." },
  { id: 4,  name: "Google Pixel 9 Pro",          cat: "phone",  price: 1380000, new_arrival: false, img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=400&q=80", desc: "AI-powered camera, clean Android, 7 years of updates." },
  { id: 5,  name: "Samsung Galaxy S23",          cat: "phone",  price: 980000,  new_arrival: false, img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80", desc: "Snapdragon 8 Gen 2, 50MP camera, 128GB." },
  { id: 6,  name: "iPhone 14",                   cat: "phone",  price: 1050000, new_arrival: false, img: "https://images.unsplash.com/photo-1574170609519-3e82a8fa1aad?auto=format&fit=crop&w=400&q=80", desc: "A15 Bionic chip, dual camera, 128GB storage." },
  { id: 25, name: "iPhone 15",                   cat: "phone",  price: 1180000, new_arrival: true,  img: "https://images.unsplash.com/photo-1697284960823-2a5e5e1bb524?auto=format&fit=crop&w=400&q=80", desc: "A16 Bionic chip, Dynamic Island, 48MP main camera, 128GB." },
  { id: 26, name: "Samsung Galaxy A55",          cat: "phone",  price: 520000,  new_arrival: true,  img: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=400&q=80", desc: "Exynos 1480, 50MP OIS camera, 256GB, 5000mAh battery." },
  { id: 27, name: "Xiaomi 14 Pro",               cat: "phone",  price: 980000,  new_arrival: true,  img: "https://images.unsplash.com/photo-1598965402089-897ce52e8355?auto=format&fit=crop&w=400&q=80", desc: "Snapdragon 8 Gen 3, Leica optics, 120W fast charging." },
  { id: 28, name: "OnePlus 12",                  cat: "phone",  price: 890000,  new_arrival: false, img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=400&q=80", desc: "Snapdragon 8 Gen 3, 50MP Hasselblad camera, 256GB." },
  { id: 29, name: "Tecno Phantom V Fold",        cat: "phone",  price: 1290000, new_arrival: false, img: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=400&q=80", desc: "Foldable AMOLED display, 50MP triple camera, 256GB." },
  { id: 30, name: "Infinix Zero 30",             cat: "phone",  price: 380000,  new_arrival: false, img: "https://images.unsplash.com/photo-1574170609519-3e82a8fa1aad?auto=format&fit=crop&w=400&q=80", desc: "Curved AMOLED display, 108MP OIS camera, 256GB." },
  // TABLETS
  { id: 7,  name: "iPad Pro M4 11-inch",         cat: "tablet", price: 1450000, new_arrival: false, img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=80", desc: "M4 chip, Liquid Retina XDR display, 256GB Wi-Fi." },
  { id: 8,  name: "Samsung Galaxy Tab S9",       cat: "tablet", price: 980000,  new_arrival: false, img: "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=400&q=80", desc: "AMOLED display, S Pen included, 128GB storage." },
  { id: 9,  name: "iPad Air 11-inch M2",         cat: "tablet", price: 850000,  new_arrival: false, img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=80", desc: "M2 chip, all-day battery, 128GB Wi-Fi, Touch ID." },
  { id: 10, name: "Lenovo Tab P12",              cat: "tablet", price: 540000,  new_arrival: false, img: "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?auto=format&fit=crop&w=400&q=80", desc: "12.7-inch display, LTPS, perfect for entertainment." },
  { id: 11, name: "Microsoft Surface Pro 9",     cat: "tablet", price: 1250000, new_arrival: false, img: "https://images.unsplash.com/photo-1593642533144-3d62aa4783ec?auto=format&fit=crop&w=400&q=80", desc: "Intel Core i5, 8GB RAM, 2-in-1 Windows tablet." },
  { id: 12, name: "Xiaomi Pad 6 Pro",            cat: "tablet", price: 620000,  new_arrival: false, img: "https://images.unsplash.com/photo-1587033411391-5d9e51cce126?auto=format&fit=crop&w=400&q=80", desc: "Snapdragon 8+, 144Hz display, 256GB storage." },
  { id: 31, name: "iPad Mini 7",                 cat: "tablet", price: 720000,  new_arrival: true,  img: "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=400&q=80", desc: "A17 Pro chip, 8.3-inch Liquid Retina display, 128GB." },
  { id: 32, name: "Samsung Galaxy Tab A9+",      cat: "tablet", price: 290000,  new_arrival: false, img: "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?auto=format&fit=crop&w=400&q=80", desc: "11-inch display, quad speakers, 64GB storage, budget pick." },
  { id: 33, name: "Huawei MatePad 11.5",         cat: "tablet", price: 480000,  new_arrival: false, img: "https://images.unsplash.com/photo-1593642533144-3d62aa4783ec?auto=format&fit=crop&w=400&q=80", desc: "144Hz PaperMatte display, Snapdragon chipset, 128GB." },
  { id: 34, name: "Amazon Fire Max 11",          cat: "tablet", price: 240000,  new_arrival: false, img: "https://images.unsplash.com/photo-1587033411391-5d9e51cce126?auto=format&fit=crop&w=400&q=80", desc: "11-inch display, octa-core processor, 64GB, great for media." },
  // LAPTOPS
  { id: 13, name: 'MacBook Pro 14" M4',          cat: "laptop", price: 3450000, new_arrival: false, img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80", desc: "M4 chip, 16GB RAM, 512GB SSD, Liquid Retina XDR." },
  { id: 14, name: "Dell XPS 13",                 cat: "laptop", price: 1980000, new_arrival: false, img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=400&q=80", desc: "Intel Core Ultra 7, 16GB RAM, 512GB SSD, OLED display." },
  { id: 15, name: "HP Spectre x360",             cat: "laptop", price: 2150000, new_arrival: false, img: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=400&q=80", desc: "2-in-1 convertible, OLED touchscreen, 1TB SSD." },
  { id: 16, name: "ASUS ROG Zephyrus G14",       cat: "laptop", price: 2890000, new_arrival: false, img: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=400&q=80", desc: "RTX 4060, Ryzen 9, 16GB RAM, 165Hz display." },
  { id: 17, name: "MacBook Air M2 15-inch",      cat: "laptop", price: 2250000, new_arrival: false, img: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=400&q=80", desc: "M2 chip, 8GB RAM, 256GB SSD, fanless design." },
  { id: 18, name: "Lenovo ThinkPad X1 Carbon",   cat: "laptop", price: 2400000, new_arrival: false, img: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=400&q=80", desc: "Intel Core i7, 16GB RAM, 512GB SSD, business-grade." },
  { id: 35, name: "MacBook Air M3 13-inch",      cat: "laptop", price: 1980000, new_arrival: true,  img: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=400&q=80", desc: "M3 chip, 8GB RAM, 256GB SSD, all-day battery life." },
  { id: 36, name: "Acer Swift Go 14",            cat: "laptop", price: 1150000, new_arrival: false, img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=400&q=80", desc: "Intel Core i5, 16GB RAM, 512GB SSD, OLED display." },
  { id: 37, name: "Microsoft Surface Laptop 6",  cat: "laptop", price: 2050000, new_arrival: false, img: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=400&q=80", desc: "Intel Core Ultra 5, 16GB RAM, touchscreen, 512GB SSD." },
  { id: 38, name: "ASUS VivoBook 16",            cat: "laptop", price: 850000,  new_arrival: false, img: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=400&q=80", desc: "AMD Ryzen 5, 8GB RAM, 512GB SSD, 16-inch FHD+ display." },
  { id: 39, name: "Lenovo Legion Pro 5",         cat: "laptop", price: 3150000, new_arrival: true,  img: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=400&q=80", desc: "RTX 4070, Ryzen 7, 32GB RAM, 240Hz display." },
  // GAMING
  { id: 19, name: "PlayStation 5 Slim",          cat: "gaming", price: 720000,  new_arrival: false, img: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&w=400&q=80", desc: "1TB SSD, 4K gaming, ultra-high-speed console." },
  { id: 20, name: "Xbox Series X",               cat: "gaming", price: 695000,  new_arrival: false, img: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=400&q=80", desc: "4K gaming, 1TB SSD, Game Pass compatible." },
  { id: 21, name: "Nintendo Switch OLED",        cat: "gaming", price: 410000,  new_arrival: false, img: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=400&q=80", desc: "7-inch OLED screen, enhanced audio, 64GB storage." },
  { id: 22, name: "Logitech G Pro Wireless",     cat: "gaming", price: 95000,   new_arrival: false, img: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=400&q=80", desc: "Ultra-lightweight wireless gaming mouse, HERO sensor." },
  { id: 23, name: "Razer BlackShark V2 Pro",     cat: "gaming", price: 185000,  new_arrival: false, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80", desc: "Wireless gaming headset, THX spatial audio, 70hr battery." },
  { id: 24, name: "PS5 DualSense Controller",    cat: "gaming", price: 85000,   new_arrival: false, img: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=400&q=80", desc: "Haptic feedback, adaptive triggers, built-in mic." },
  { id: 40, name: "Xbox Series S",               cat: "gaming", price: 420000,  new_arrival: false, img: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=400&q=80", desc: "All-digital 1440p gaming console, 512GB SSD." },
  { id: 41, name: "Steam Deck OLED",             cat: "gaming", price: 850000,  new_arrival: true,  img: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&w=400&q=80", desc: "7.4-inch HDR OLED, 1TB SSD, handheld PC gaming." },
  { id: 42, name: "Corsair K70 RGB Keyboard",    cat: "gaming", price: 165000,  new_arrival: false, img: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=400&q=80", desc: "Mechanical RGB keyboard, PBT keycaps, hyper-polling." },
  { id: 43, name: "Meta Quest 3",                cat: "gaming", price: 980000,  new_arrival: true,  img: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=400&q=80", desc: "Mixed reality VR headset, 128GB storage, Snapdragon XR2." },
  { id: 44, name: "SteelSeries Arctis Nova Pro", cat: "gaming", price: 295000,  new_arrival: false, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80", desc: "Active noise cancelling wireless gaming headset." },
];

const fmt = (n) => "₦" + Number(n).toLocaleString("en-NG");

// ── ACTIVE CATEGORY — default "all" so everything shows on load ──
let activeCat  = "all";
let searchTerm = "";

// ── RENDER PRODUCTS ───────────────────────────────────────
function renderProducts() {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  const list = products.filter((p) => {
    const okCat = activeCat === "all" || p.cat === activeCat;
    const q     = searchTerm.toLowerCase();
    const okQ   = !q ||
      (p.name || "").toLowerCase().includes(q) ||
      (p.cat  || "").toLowerCase().includes(q) ||
      (p.desc || "").toLowerCase().includes(q);
    return okCat && okQ;
  });

  if (!list.length) {
    grid.innerHTML = `<div class="col-span-full text-center py-16 px-5 text-gray-500 dark:text-gray-400 text-sm">No products found.</div>`;
    return;
  }

  grid.innerHTML = list.map((p, i) => `
    <div class="product-card bg-white dark:bg-neutral-900 border-[1.5px] border-gray-200 dark:border-neutral-800 rounded-2xl overflow-hidden flex flex-col transition-all hover:shadow-xl hover:border-brand group" style="animation:fadeUp 0.35s ease ${i * 0.04}s both">
      <div class="relative" style="padding-top:100%;background:#f3f4f6;">
        <img
          src="${optimizeImgUrl(p.img, 400)}"
          alt="${p.name}"
          width="400" height="400"
          loading="lazy" decoding="async"
          style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform 0.35s ease;"
          onmouseover="this.style.transform='scale(1.05)'"
          onmouseout="this.style.transform='scale(1)'"
        />
        ${p.new_arrival ? `<span style="position:absolute;top:8px;left:8px;background:#ff7a00;color:#fff;font-size:9px;font-weight:700;padding:3px 8px;border-radius:20px;text-transform:uppercase;letter-spacing:.06em;">New</span>` : ""}
      </div>
      <div class="p-3.5 flex-1 flex flex-col">
        <div class="text-[10px] font-semibold uppercase tracking-[0.08em] text-brand mb-1">${p.cat}</div>
        <div class="text-[13px] font-semibold mb-1 overflow-hidden" style="white-space:nowrap;text-overflow:ellipsis;" title="${p.name}">${p.name}</div>
        <div class="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed mb-2.5 line-clamp-2 flex-1">${p.desc || ""}</div>
        <div class="text-[15px] font-bold text-brand mb-3">${fmt(p.price)}</div>
        <div class="flex gap-2">
          <button
            class="flex-1 px-1 py-2 rounded-full border-[1.5px] border-gray-200 dark:border-neutral-700 text-[12px] font-semibold hover:border-brand hover:text-brand transition-colors"
            data-id="${p.id}" data-action="details">Details</button>
          <button
            class="flex-1 px-1 py-2 rounded-full bg-brand text-white text-[12px] font-semibold hover:opacity-85 transition-opacity"
            data-id="${p.id}" data-action="cart">Add to Cart</button>
        </div>
      </div>
    </div>
  `).join("");
}

// Delegate click events on product grid
const productGrid = document.getElementById("productGrid");
if (productGrid) {
  productGrid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const id = +btn.dataset.id;
    const p  = products.find((x) => x.id === id);
    if (!p) return;
    if (btn.dataset.action === "cart") addToCart(p, 1);
    else openProductDetail(p);
  });
}

// ── FILTERS ───────────────────────────────────────────────
const pillActive   = "bg-brand text-white border-brand";
const pillInactive = "border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100 hover:border-brand hover:text-brand";

function styleFilterPills() {
  // Style filter pills (above product grid)
  document.querySelectorAll(".filter-pill").forEach((b) => {
    const active = b.dataset.cat === activeCat;
    b.className = `filter-pill px-[18px] py-2 rounded-full border-[1.5px] text-[13px] font-medium transition-all whitespace-nowrap ${active ? pillActive : pillInactive}`;
  });

  // ✅ FIX: Style ALL cat-card buttons including the "All" card
  document.querySelectorAll(".cat-card").forEach((b) => {
    const active = b.dataset.cat === activeCat;
    b.style.borderColor = active ? "#ff7a00" : "";
    b.style.color       = active ? "#ff7a00" : "";
    b.style.boxShadow   = active ? "0 4px 20px rgba(255,122,0,0.12)" : "";
    b.style.fontWeight  = active ? "600" : "";
  });
}

function setFilter(cat) {
  activeCat = cat;
  styleFilterPills();
  renderProducts();
}

const filterRow = document.getElementById("filterRow");
if (filterRow) {
  filterRow.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-pill");
    if (btn) setFilter(btn.dataset.cat);
  });
}

// ✅ FIX: catGrid click handler now covers the All button since it's a cat-card
const catGrid = document.getElementById("catGrid");
if (catGrid) {
  catGrid.addEventListener("click", (e) => {
    const btn = e.target.closest(".cat-card");
    if (!btn) return;
    setFilter(btn.dataset.cat);
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  });
}

document.querySelectorAll(".footer-cat").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    setFilter(a.dataset.cat);
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  });
});

// ── SEARCH ────────────────────────────────────────────────
window.addEventListener("DOMContentLoaded", () => {
  const sd = document.getElementById("searchDesktop");
  const sm = document.getElementById("searchMobile");
  if (sd) sd.value = "";
  if (sm) sm.value = "";
});

function doSearch(val) {
  searchTerm = val.trim();
  renderProducts();
  document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
}

const searchDesktop = document.getElementById("searchDesktop");
if (searchDesktop) {
  searchDesktop.addEventListener("input",   (e) => { searchTerm = e.target.value; renderProducts(); });
  searchDesktop.addEventListener("keydown", (e) => { if (e.key === "Enter") doSearch(e.target.value); });
}
const searchBtnD = document.getElementById("searchBtnD");
if (searchBtnD) searchBtnD.addEventListener("click", () => doSearch(document.getElementById("searchDesktop").value));

const searchMobile = document.getElementById("searchMobile");
if (searchMobile) {
  searchMobile.addEventListener("input",   (e) => { searchTerm = e.target.value; renderProducts(); });
  searchMobile.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      doSearch(e.target.value);
      if (mobileMenu) mobileMenu.classList.add("hidden");
    }
  });
}
const searchBtnM = document.getElementById("searchBtnM");
if (searchBtnM) {
  searchBtnM.addEventListener("click", () => {
    doSearch(document.getElementById("searchMobile").value);
    if (mobileMenu) mobileMenu.classList.add("hidden");
  });
}

// ── CART ──────────────────────────────────────────────────
function addToCart(p, qty) {
  const cartArr = loadCart();
  const ex = cartArr.find((i) => String(i.id) === String(p.id));
  if (ex) ex.qty += qty;
  else cartArr.push({ id: p.id, name: p.name, price: p.price, img: p.img, cat: p.cat, qty });
  saveCart(cartArr);
  renderCart();
  showToast(`${p.name} added to cart`);
}

function renderCart() {
  const cartArr = loadCart();
  const badge   = document.getElementById("cartBadge");
  const total   = document.getElementById("cartTotal");
  const items   = document.getElementById("cartItems");
  if (!badge || !total || !items) return;

  const count = cartArr.reduce((s, i) => s + i.qty, 0);
  const sum   = cartArr.reduce((s, i) => s + i.price * i.qty, 0);
  badge.textContent = count;
  total.textContent = fmt(sum);

  if (!cartArr.length) {
    items.innerHTML = `
      <div class="flex flex-col items-center justify-center h-full text-gray-300 dark:text-gray-600 gap-2.5 text-center p-10">
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="opacity-40">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 01-8 0"/>
        </svg>
        <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Your cart is empty</p>
        <span class="text-xs">Add some gadgets to get started</span>
      </div>`;
    return;
  }

  items.innerHTML = cartArr.map((item) => `
    <div class="flex gap-3 items-center p-2.5 bg-gray-100 dark:bg-neutral-800 rounded-[10px]">
      <img src="${optimizeImgUrl(item.img, 104)}" alt="${item.name}" width="52" height="52" loading="lazy" decoding="async"
        style="width:52px;height:52px;object-fit:cover;border-radius:8px;flex-shrink:0;"/>
      <div class="flex-1 min-w-0">
        <div class="text-xs font-semibold mb-0.5" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${item.name}</div>
        <div class="text-xs text-brand font-semibold mb-1.5">${fmt(item.price)}</div>
        <div class="flex items-center gap-2">
          <button class="qty-btn w-6 h-6 rounded-full border-[1.5px] border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm flex items-center justify-center hover:border-brand transition-colors leading-none" data-id="${item.id}" data-action="dec">−</button>
          <span class="text-[13px] font-semibold min-w-[16px] text-center">${item.qty}</span>
          <button class="qty-btn w-6 h-6 rounded-full border-[1.5px] border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm flex items-center justify-center hover:border-brand transition-colors leading-none" data-id="${item.id}" data-action="inc">+</button>
        </div>
      </div>
      <button class="text-gray-300 dark:text-gray-600 w-7 h-7 flex items-center justify-center rounded-full shrink-0 hover:text-red-500 transition-colors" data-id="${item.id}" data-action="remove" title="Remove">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
    </div>
  `).join("");
}

const cartItemsEl = document.getElementById("cartItems");
if (cartItemsEl) {
  cartItemsEl.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn || !btn.dataset.id) return;
    const id      = btn.dataset.id;
    const cartArr = loadCart();
    const item    = cartArr.find((i) => String(i.id) === String(id));
    if (!item) return;
    if      (btn.dataset.action === "inc")    { item.qty++; }
    else if (btn.dataset.action === "dec")    { item.qty--; if (item.qty <= 0) cartArr.splice(cartArr.indexOf(item), 1); }
    else if (btn.dataset.action === "remove") { cartArr.splice(cartArr.indexOf(item), 1); }
    saveCart(cartArr);
    renderCart();
  });
}

window.addEventListener("storage", (e) => { if (e.key === CART_KEY) renderCart(); });

// ── CART DRAWER ───────────────────────────────────────────
const cartDrawer  = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");

function openCart() {
  if (!cartDrawer || !cartOverlay) return;
  cartOverlay.classList.remove("hidden");
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      cartDrawer.style.transform = "translateX(0)";
    });
  });
}

function closeCart() {
  if (!cartDrawer || !cartOverlay) return;
  cartDrawer.style.transform = "translateX(100%)";
  cartOverlay.classList.add("hidden");
}

document.getElementById("cartBtn")?.addEventListener("click", openCart);
document.getElementById("cartClose")?.addEventListener("click", closeCart);
cartOverlay?.addEventListener("click", closeCart);

// ── PAYMENT MODAL ─────────────────────────────────────────
function showOverlay(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove("hidden");
  el.style.display = "flex";
}
function hideOverlay(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add("hidden");
  el.style.display = "";
}

async function openPaymentModal() {
  const cartArr = loadCart();
  if (!cartArr.length) { showToast("Your cart is empty"); return; }
  if (!currentUser)    { showToast("Please sign in to checkout"); showAuthModal("signIn"); return; }

  const total        = cartArr.reduce((s, i) => s + i.price * i.qty, 0);
  const totalFmt     = fmt(total);
  const itemLines    = cartArr.map(i => `${i.name} x${i.qty} — ${fmt(i.price * i.qty)}`).join("\n");
  const itemsSummary = cartArr.map(i => `${i.name} x${i.qty}`).join(", ");

  const payTotal = document.getElementById("paymentTotal");
  if (payTotal) payTotal.textContent = totalFmt;

  let orderId = null;
  if (sb) {
    try {
      const { data, error } = await sb.from("orders").insert([{
        user_id:        currentUser.id,
        customer_name:  currentUser.name,
        customer_email: currentUser.email,
        items_summary:  itemsSummary,
        total,
        status:         "pending",
      }]).select().single();
      if (!error && data) orderId = data.id;
    } catch (err) { console.warn("Order save failed", err); }
  }

  const refTag = orderId ? ` (Ref: ${String(orderId).slice(0, 8).toUpperCase()})` : "";
  const msg    = encodeURIComponent(
    `Hello Minipi NG! 👋\n\nI just made a payment for my order${refTag}:\n\n` +
    `🛒 *Items Ordered:*\n${itemLines}\n\n💰 *Total Paid: ${totalFmt}*\n\nPlease find my payment receipt attached. Kindly confirm my order. Thank you!`
  );
  const waLink = document.getElementById("whatsappPayLink");
  if (waLink) waLink.href = `https://wa.me/2348034970248?text=${msg}`;

  closeCart();
  showOverlay("paymentOverlay");
}

document.getElementById("checkoutBtn")?.addEventListener("click", openPaymentModal);
document.getElementById("paymentClose")?.addEventListener("click", () => hideOverlay("paymentOverlay"));
document.getElementById("paymentOverlay")?.addEventListener("click", function(e) {
  if (e.target === this) hideOverlay("paymentOverlay");
});

// ── NEW ARRIVALS ──────────────────────────────────────────
function renderHomeArrivals() {
  const track = document.getElementById("arrivalsTrack");
  if (!track) return;

  let arrivals = products.filter((p) => p.new_arrival);
  if (!arrivals.length) arrivals = [...products].slice(-8);
  if (!arrivals.length) {
    const sec = document.getElementById("newArrivals");
    if (sec) sec.style.display = "none";
    return;
  }

  track.innerHTML = arrivals.map((p) => `
    <div class="bg-white dark:bg-neutral-900 border-[1.5px] border-gray-200 dark:border-neutral-800 rounded-2xl overflow-hidden flex flex-col cursor-pointer hover:border-brand hover:shadow-lg transition-all"
         style="width:220px;flex-shrink:0;"
         data-arrival-id="${p.id}">
      <div style="position:relative;padding-top:100%;background:#f3f4f6;">
        <img src="${optimizeImgUrl(p.img, 220)}" alt="${p.name}" width="220" height="220" loading="lazy" decoding="async"
          style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;"/>
        <span style="position:absolute;top:8px;left:8px;background:#ff7a00;color:#fff;font-size:9px;font-weight:700;padding:3px 8px;border-radius:20px;text-transform:uppercase;letter-spacing:.06em;">New</span>
      </div>
      <div class="p-3 flex-1 flex flex-col">
        <div class="text-[10px] font-semibold uppercase tracking-[0.08em] text-brand mb-0.5">${p.cat}</div>
        <div class="text-[12px] font-semibold mb-1" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${p.name}</div>
        <div class="text-[13px] font-bold text-brand mt-auto pt-2">${fmt(p.price)}</div>
      </div>
    </div>
  `).join("");

  track.addEventListener("click", (e) => {
    const card = e.target.closest("[data-arrival-id]");
    if (!card) return;
    const id = +card.dataset.arrivalId;
    const p  = products.find((x) => x.id === id);
    if (p) openProductDetail(p);
  });
}

document.getElementById("arrLeft")?.addEventListener("click", () => {
  document.getElementById("arrivalsTrack")?.scrollBy({ left: -250, behavior: "smooth" });
});
document.getElementById("arrRight")?.addEventListener("click", () => {
  document.getElementById("arrivalsTrack")?.scrollBy({ left: 250, behavior: "smooth" });
});

// ── SCROLL ANIMATION ──────────────────────────────────────
const fadeSections = document.querySelectorAll(".fade-section");
const sectionObserver = new IntersectionObserver(
  (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("show"); }),
  { threshold: 0.15 }
);
fadeSections.forEach((s) => sectionObserver.observe(s));

// ── PRODUCT DETAIL MODAL ──────────────────────────────────
let pdCurrent = null, pdQty = 1;

function openProductDetail(p) {
  pdCurrent = p;
  pdQty     = 1;
  const pdImg   = document.getElementById("pdImg");
  const pdCat   = document.getElementById("pdCat");
  const pdName  = document.getElementById("pdName");
  const pdDesc  = document.getElementById("pdDesc");
  const pdPrice = document.getElementById("pdPrice");
  const pdQtyEl = document.getElementById("pdQty");
  if (pdImg)   { pdImg.src = optimizeImgUrl(p.img, 560); pdImg.alt = p.name; }
  if (pdCat)   pdCat.textContent   = (p.cat || "").toUpperCase();
  if (pdName)  pdName.textContent  = p.name;
  if (pdDesc)  pdDesc.textContent  = p.desc || "";
  if (pdPrice) pdPrice.textContent = fmt(p.price);
  if (pdQtyEl) pdQtyEl.textContent = 1;
  showOverlay("pdOverlay");
}

document.getElementById("pdClose")?.addEventListener("click", () => hideOverlay("pdOverlay"));
document.getElementById("pdOverlay")?.addEventListener("click", (e) => { if (e.target === e.currentTarget) hideOverlay("pdOverlay"); });
document.getElementById("pdInc")?.addEventListener("click", () => {
  pdQty++;
  const el = document.getElementById("pdQty");
  if (el) el.textContent = pdQty;
});
document.getElementById("pdDec")?.addEventListener("click", () => {
  if (pdQty > 1) { pdQty--; const el = document.getElementById("pdQty"); if (el) el.textContent = pdQty; }
});
document.getElementById("pdAddCart")?.addEventListener("click", () => {
  if (pdCurrent) addToCart(pdCurrent, pdQty);
  hideOverlay("pdOverlay");
  openCart();
});

// ── INFO MODAL ────────────────────────────────────────────
const infoContent = {
  about: {
    title: "About Minipi NG",
    body: `<p>Minipi NG is Nigeria's go-to online store for the latest phones, tablets, laptops and gaming gear.</p>
           <p>We source authentic devices directly from trusted brands and deliver them to your doorstep, with prices always listed in Naira.</p>
           <p>Founded with one goal: make great technology accessible to everyone in Nigeria.</p>`,
  },
  faqs: {
    title: "Frequently Asked Questions",
    body: `
      <div class="faq-item"><div class="faq-q">Do products come with warranty?</div><p>Yes — all products carry a minimum 1-year manufacturer warranty.</p></div>
      <div class="faq-item"><div class="faq-q">How long does delivery take?</div><p>2–5 business days within Nigeria depending on your location.</p></div>
      <div class="faq-item"><div class="faq-q">Can I pay on delivery?</div><p>Yes, pay-on-delivery is available in select cities.</p></div>
      <div class="faq-item"><div class="faq-q">Do you ship outside Nigeria?</div><p>Currently we only ship within Nigeria.</p></div>
      <div class="faq-item"><div class="faq-q">Can I return a product?</div><p>Yes — within 7 days of delivery for any defective item.</p></div>`,
  },
};

document.querySelectorAll(".info-link").forEach((btn) => {
  btn.addEventListener("click", () => {
    const d = infoContent[btn.dataset.info];
    if (!d) return;
    const titleEl = document.getElementById("infoTitle");
    const bodyEl  = document.getElementById("infoBody");
    if (titleEl) titleEl.textContent = d.title;
    if (bodyEl)  bodyEl.innerHTML    = d.body;
    showOverlay("infoOverlay");
  });
});
document.getElementById("infoClose")?.addEventListener("click", () => hideOverlay("infoOverlay"));
document.getElementById("infoOverlay")?.addEventListener("click", (e) => { if (e.target === e.currentTarget) hideOverlay("infoOverlay"); });

// ── TOAST ─────────────────────────────────────────────────
let toastTimer = null;
function showToast(msg, duration = 2500) {
  const t      = document.getElementById("toast");
  const msg_el = document.getElementById("toastMsg");
  if (!t || !msg_el) return;
  msg_el.textContent = msg;
  t.style.opacity   = "1";
  t.style.transform = "translateX(-50%) translateY(0)";
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    t.style.opacity   = "0";
    t.style.transform = "translateX(-50%) translateY(80px)";
  }, duration);
}

// ── AUTH STATE ────────────────────────────────────────────
let currentUser = null;
const ADMIN_EMAILS = ["admin@minipi.ng", "maxwellikiriko@yahoo.co.uk"];

// ── ORDER REALTIME ────────────────────────────────────────
let orderChannel = null;

function subscribeToUserOrders() {
  if (!sb || !currentUser) return;
  unsubscribeFromUserOrders();
  orderChannel = sb
    .channel(`user-orders-${currentUser.id}`)
    .on("postgres_changes", {
      event: "UPDATE", schema: "public", table: "orders",
      filter: `user_id=eq.${currentUser.id}`,
    }, (payload) => {
      const updated = payload.new;
      if (updated.status === "success") {
        showToast(`🎉 Your order "${(updated.items_summary || "").split(",")[0]}…" has been approved!`, 5000);
        const mpOverlay = document.getElementById("mp-overlay");
        if (mpOverlay && mpOverlay.style.display !== "none") openMpModal();
      }
      if (updated.status === "cancelled") {
        showToast(`❌ Your order was cancelled. Contact support.`, 5000);
        const mpOverlay = document.getElementById("mp-overlay");
        if (mpOverlay && mpOverlay.style.display !== "none") openMpModal();
      }
    })
    .subscribe();
}

function unsubscribeFromUserOrders() {
  if (orderChannel && sb) { sb.removeChannel(orderChannel); orderChannel = null; }
}

// ── REFRESH AUTH UI ───────────────────────────────────────
function refreshAuthUI() {
  const authDd     = document.getElementById("authDropdown");
  const userDd     = document.getElementById("userDropdown");
  const adminLink  = document.getElementById("adminNavLink");
  const adminLinkM = document.getElementById("adminNavLinkMobile");

  if (authDd) authDd.classList.add("hidden");
  if (userDd) userDd.classList.add("hidden");

  if (currentUser) {
    const nameEl  = document.getElementById("userName");
    const emailEl = document.getElementById("userEmail");
    if (nameEl)  nameEl.textContent  = currentUser.name;
    if (emailEl) emailEl.textContent = currentUser.email;

    const isAdmin = ADMIN_EMAILS.map(e => e.toLowerCase()).includes(currentUser.email.toLowerCase());
    if (adminLink)  adminLink.style.display  = isAdmin ? "inline-flex" : "none";
    if (adminLinkM) adminLinkM.style.display = isAdmin ? "flex" : "none";
    subscribeToUserOrders();
  } else {
    const nameEl  = document.getElementById("userName");
    const emailEl = document.getElementById("userEmail");
    if (nameEl)  nameEl.textContent  = "—";
    if (emailEl) emailEl.textContent = "—";
    if (adminLink)  adminLink.style.display  = "none";
    if (adminLinkM) adminLinkM.style.display = "none";
    unsubscribeFromUserOrders();
  }
}

// ── ACCOUNT BUTTON ────────────────────────────────────────
const accountBtn = document.getElementById("accountBtn");
const authDd     = document.getElementById("authDropdown");
const userDd     = document.getElementById("userDropdown");

if (accountBtn) {
  accountBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (currentUser) {
      if (authDd) authDd.classList.add("hidden");
      if (userDd) userDd.classList.add("hidden");
      openMpModal();
    } else {
      if (authDd) {
        const isHidden = authDd.classList.contains("hidden");
        authDd.classList.toggle("hidden", !isHidden);
      }
      if (userDd) userDd.classList.add("hidden");
    }
  });
}

document.addEventListener("click", (e) => {
  if (accountBtn && !accountBtn.contains(e.target)) {
    if (authDd) authDd.classList.add("hidden");
    if (userDd) userDd.classList.add("hidden");
  }
});

// ── AUTH MODALS ───────────────────────────────────────────
const authOverlay = document.getElementById("authOverlay");
const signInModal = document.getElementById("signInModal");
const signUpModal = document.getElementById("signUpModal");

function showAuthModal(which) {
  if (!authOverlay) return;
  authOverlay.classList.remove("hidden");
  authOverlay.style.display = "flex";
  if (authDd) authDd.classList.add("hidden");
  if (userDd) userDd.classList.add("hidden");
  if (which === "signIn") {
    signInModal?.classList.remove("hidden");
    signUpModal?.classList.add("hidden");
  } else {
    signUpModal?.classList.remove("hidden");
    signInModal?.classList.add("hidden");
  }
  clearAuthAlerts();
}

function closeAuthModal() {
  if (!authOverlay) return;
  authOverlay.classList.add("hidden");
  authOverlay.style.display = "";
  signInModal?.classList.add("hidden");
  signUpModal?.classList.add("hidden");
  clearAuthAlerts();
}

function clearAuthAlerts() {
  ["siError", "siSuccess", "suError", "suSuccess"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) { el.classList.add("hidden"); el.textContent = ""; }
  });
}

function showAlert(id, msg) {
  const el = document.getElementById(id);
  if (el) { el.textContent = msg; el.classList.remove("hidden"); }
}

document.getElementById("openSignIn")?.addEventListener("click", () => showAuthModal("signIn"));
document.getElementById("openSignUp")?.addEventListener("click", () => showAuthModal("signUp"));
document.getElementById("toSignUp")?.addEventListener("click",   () => showAuthModal("signUp"));
document.getElementById("toSignIn")?.addEventListener("click",   () => showAuthModal("signIn"));
document.querySelectorAll(".auth-close").forEach((btn) => btn.addEventListener("click", closeAuthModal));
authOverlay?.addEventListener("click", (e) => { if (e.target === authOverlay) closeAuthModal(); });

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".toggle-pwd");
  if (!btn) return;
  const input = document.getElementById(btn.dataset.target);
  if (input) input.type = input.type === "password" ? "text" : "password";
});

document.getElementById("suPwd")?.addEventListener("input", (e) => {
  const v = e.target.value;
  let s = 0;
  if (v.length >= 6) s++;
  if (v.length >= 10) s++;
  if (/[A-Z]/.test(v) && /[0-9]/.test(v)) s++;
  if (/[^A-Za-z0-9]/.test(v)) s++;
  const colors = ["#ef4444", "#f97316", "#eab308", "#22c55e"];
  const labels = ["Weak", "Fair", "Good", "Strong"];
  for (let i = 1; i <= 4; i++) {
    const bar = document.getElementById(`sb${i}`);
    if (bar) bar.style.background = i <= s ? colors[s - 1] : "";
  }
  const lbl = document.getElementById("sbLabel");
  if (lbl) { lbl.textContent = v.length ? (labels[s - 1] || "") : ""; lbl.style.color = v.length && s > 0 ? colors[s - 1] : ""; }
});

document.getElementById("siEmail")?.addEventListener("keydown", (e) => { if (e.key === "Enter") document.getElementById("signInBtn")?.click(); });
document.getElementById("siPwd")?.addEventListener("keydown",   (e) => { if (e.key === "Enter") document.getElementById("signInBtn")?.click(); });
document.getElementById("suPwd")?.addEventListener("keydown",   (e) => { if (e.key === "Enter") document.getElementById("signUpBtn")?.click(); });

function setBusy(btn, busy, loadTxt, origTxt) {
  if (!btn) return;
  btn.disabled  = busy;
  btn.innerHTML = busy
    ? `<span style="width:16px;height:16px;border:2px solid rgba(255,255,255,0.3);border-top-color:white;border-radius:50%;animation:spin 0.7s linear infinite;display:inline-block;"></span>${loadTxt}`
    : origTxt;
}

// ── SIGN UP ───────────────────────────────────────────────
document.getElementById("signUpBtn")?.addEventListener("click", async () => {
  clearAuthAlerts();
  const name  = document.getElementById("suName")?.value.trim();
  const email = document.getElementById("suEmail")?.value.trim().toLowerCase();
  const pwd   = document.getElementById("suPwd")?.value;
  const btn   = document.getElementById("signUpBtn");

  if (!name)  { showAlert("suError", "Please enter your full name."); return; }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showAlert("suError", "Please enter a valid email address."); return; }
  if (!pwd || pwd.length < 6) { showAlert("suError", "Password must be at least 6 characters."); return; }
  if (!sb) { showAlert("suError", "Authentication service unavailable."); return; }

  setBusy(btn, true, "Creating account…", "Create Account");
  try {
    const { data, error } = await sb.auth.signUp({
      email,
      password: pwd,
      options: { data: { full_name: name } },
    });
    if (error) throw error;
    if (data.user && !data.session) {
      showAlert("suSuccess", `Account created! Check ${email} for a confirmation link.`);
      const suName  = document.getElementById("suName");
      const suEmail = document.getElementById("suEmail");
      const suPwd   = document.getElementById("suPwd");
      if (suName)  suName.value  = "";
      if (suEmail) suEmail.value = "";
      if (suPwd)   suPwd.value   = "";
    } else if (data.session) {
      currentUser = { id: data.user.id, name, email: data.user.email };
      refreshAuthUI();
      closeAuthModal();
      showToast(`Welcome, ${name}! 🎉`);
    }
  } catch (err) {
    let msg = err.message || "Sign up failed.";
    if (/already registered|already been registered/i.test(msg))
      msg = "An account with this email already exists. Try signing in.";
    showAlert("suError", msg);
  } finally {
    setBusy(btn, false, "", "Create Account");
  }
});

// ── SIGN IN ───────────────────────────────────────────────
document.getElementById("signInBtn")?.addEventListener("click", async () => {
  clearAuthAlerts();
  const email = document.getElementById("siEmail")?.value.trim().toLowerCase();
  const pwd   = document.getElementById("siPwd")?.value;
  const btn   = document.getElementById("signInBtn");

  if (!email) { showAlert("siError", "Please enter your email address."); return; }
  if (!pwd)   { showAlert("siError", "Please enter your password."); return; }
  if (!sb)    { showAlert("siError", "Authentication service unavailable."); return; }

  setBusy(btn, true, "Signing in…", "Sign In");
  try {
    const { data, error } = await sb.auth.signInWithPassword({ email, password: pwd });
    if (error) throw error;
    const u    = data.user;
    const name = u.user_metadata?.full_name || u.email.split("@")[0];
    currentUser = { id: u.id, name, email: u.email };
    refreshAuthUI();
    closeAuthModal();
    showToast(`Welcome back, ${name}!`);
  } catch (err) {
    let msg = err.message || "Sign in failed.";
    if (/Invalid login/i.test(msg))       msg = "Incorrect email or password.";
    if (/Email not confirmed/i.test(msg)) msg = "Please confirm your email first. Check your inbox.";
    if (/User not found/i.test(msg))      msg = "No account found. Please create one.";
    showAlert("siError", msg);
  } finally {
    setBusy(btn, false, "", "Sign In");
  }
});

// ── FORGOT PASSWORD ───────────────────────────────────────
document.getElementById("forgotBtn")?.addEventListener("click", async () => {
  clearAuthAlerts();
  const email = document.getElementById("siEmail")?.value.trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showAlert("siError", 'Enter your email address first, then click "Forgot password?".');
    return;
  }
  if (!sb) { showAlert("siError", "Feature unavailable right now."); return; }

  const fBtn = document.getElementById("forgotBtn");
  if (fBtn) { fBtn.textContent = "Sending…"; fBtn.disabled = true; }
  try {
    const { error } = await sb.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/index.html",
    });
    if (error) throw error;
    showAlert("siSuccess", `Reset link sent to ${email}. Check your inbox (and spam folder).`);
  } catch (err) {
    showAlert("siError", err.message || "Could not send reset email. Please try again.");
  } finally {
    if (fBtn) { fBtn.textContent = "Forgot password?"; fBtn.disabled = false; }
  }
});

// ── SIGN OUT ──────────────────────────────────────────────
document.getElementById("logoutBtn")?.addEventListener("click", async () => {
  if (userDd) userDd.classList.add("hidden");
  if (sb) { try { await sb.auth.signOut(); } catch (e) {} }
  currentUser = null;
  const mpOverlay = document.getElementById("mp-overlay");
  if (mpOverlay) mpOverlay.style.display = "none";
  closeCart();
  refreshAuthUI();
  showToast("Signed out successfully");
});

// ── RESET PASSWORD MODAL ──────────────────────────────────
function openResetModal() {
  closeAuthModal();
  const rpPwd     = document.getElementById("rpPwd");
  const rpConfirm = document.getElementById("rpPwdConfirm");
  if (rpPwd)     rpPwd.value     = "";
  if (rpConfirm) rpConfirm.value = "";
  ["rpError", "rpSuccess"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) { el.classList.add("hidden"); el.textContent = ""; }
  });
  const submitBtn = document.getElementById("rpSubmitBtn");
  if (submitBtn) { submitBtn.innerHTML = "Update Password"; submitBtn.disabled = false; }
  showOverlay("resetOverlay");
}

function closeResetModal() { hideOverlay("resetOverlay"); }

document.getElementById("rpClose")?.addEventListener("click", closeResetModal);
document.getElementById("resetOverlay")?.addEventListener("click", (e) => { if (e.target === e.currentTarget) closeResetModal(); });

document.getElementById("rpPwd")?.addEventListener("keydown",        (e) => { if (e.key === "Enter") document.getElementById("rpSubmitBtn")?.click(); });
document.getElementById("rpPwdConfirm")?.addEventListener("keydown", (e) => { if (e.key === "Enter") document.getElementById("rpSubmitBtn")?.click(); });

document.getElementById("rpSubmitBtn")?.addEventListener("click", async () => {
  const pwd   = document.getElementById("rpPwd")?.value;
  const cnf   = document.getElementById("rpPwdConfirm")?.value;
  const errEl = document.getElementById("rpError");
  const okEl  = document.getElementById("rpSuccess");
  const btn   = document.getElementById("rpSubmitBtn");

  [errEl, okEl].forEach((el) => { if (el) { el.classList.add("hidden"); el.textContent = ""; } });

  if (!pwd || pwd.length < 6) {
    if (errEl) { errEl.textContent = "Password must be at least 6 characters."; errEl.classList.remove("hidden"); }
    return;
  }
  if (pwd !== cnf) {
    if (errEl) { errEl.textContent = "Passwords do not match."; errEl.classList.remove("hidden"); }
    return;
  }
  if (!sb) {
    if (errEl) { errEl.textContent = "Auth service unavailable."; errEl.classList.remove("hidden"); }
    return;
  }

  setBusy(btn, true, "Updating…", "Update Password");
  try {
    const { error } = await sb.auth.updateUser({ password: pwd });
    if (error) throw error;
    if (okEl) { okEl.textContent = "Password updated! Signing you in…"; okEl.classList.remove("hidden"); }

    const { data } = await sb.auth.getSession();
    if (data?.session?.user) {
      const u = data.session.user;
      currentUser = {
        id:    u.id,
        name:  u.user_metadata?.full_name || u.email.split("@")[0],
        email: u.email,
      };
      refreshAuthUI();
    }
    setTimeout(() => { closeResetModal(); showToast("Password updated successfully! 🎉"); }, 1800);
  } catch (err) {
    if (errEl) { errEl.textContent = err.message || "Failed to update password. Please request a new reset link."; errEl.classList.remove("hidden"); }
  } finally {
    setBusy(btn, false, "", "Update Password");
  }
});

// ── SESSION / AUTH STATE CHANGE ───────────────────────────
if (sb) {
  sb.auth.onAuthStateChange((event, session) => {
    if (event === "PASSWORD_RECOVERY") {
      openResetModal();
      return;
    }
    if (session?.user) {
      const u = session.user;
      currentUser = {
        id:    u.id,
        name:  u.user_metadata?.full_name || u.email.split("@")[0],
        email: u.email,
      };
      refreshAuthUI();
      if (event === "SIGNED_IN") closeAuthModal();
    } else if (event === "SIGNED_OUT") {
      currentUser = null;
      refreshAuthUI();
    }
  });

  sb.auth.getSession().then(({ data }) => {
    if (data?.session?.user) {
      const u = data.session.user;
      currentUser = {
        id:    u.id,
        name:  u.user_metadata?.full_name || u.email.split("@")[0],
        email: u.email,
      };
      refreshAuthUI();
    }
  });
}

// ── TESTIMONIALS ──────────────────────────────────────────
const testimonials = [
  { name: "Iwari",         role: "Business Woman",  text: "I ordered an iPhone from Minipi and received it within 24 hours. The device was original, sealed, and exactly as advertised." },
  { name: "Ayofe",         role: "Content Creator", text: "Minipi saved me from buying fake gadgets online. Their customer support guided me perfectly and my MacBook arrived safely." },
  { name: "Charles",       role: "Business Man",    text: "The prices are amazing. I've purchased accessories, headphones, and a laptop. Every product exceeded expectations." },
  { name: "Chidi Monday",  role: "Business Owner",  text: "Their delivery speed shocked me. Ordered in the morning and got my smartwatch before evening." },
  { name: "Daniel Wilson", role: "Photographer",    text: "Bought a camera and accessories from Minipi. Everything was genuine and packaged professionally." },
  { name: "Amanda Okon",   role: "Student",         text: "Best gadget store I've used. Affordable prices, secure payment, and excellent after-sales support." },
];

const PAGE_SIZE   = 3;
const AUTOPLAY_MS = 6000;

let currentPage = 0;
let autoTimer   = null;

const pages = [];
for (let i = 0; i < testimonials.length; i += PAGE_SIZE) pages.push(testimonials.slice(i, i + PAGE_SIZE));

function cardMarkup(item) {
  return `
    <div class="testimonial-card relative bg-white border border-gray-100 rounded-3xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-500" style="animation:float 4s ease-in-out infinite;">
      <div class="flex mb-5 text-yellow-400 text-xl">★★★★★</div>
      <p class="text-gray-700 leading-relaxed mb-6 text-sm md:text-base">"${item.text}"</p>
      <div class="flex items-center gap-4">
        <div style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#ff7a00,#ff9d44);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:18px;color:#fff;flex-shrink:0;">
          ${item.name.charAt(0)}
        </div>
        <div>
          <h4 class="font-semibold text-base text-gray-900">${item.name}</h4>
          <p class="text-sm text-gray-500">${item.role}</p>
        </div>
      </div>
    </div>`;
}

function renderTestimonialPage(index) {
  const container = document.getElementById("testimonialContainer");
  if (!container) return;
  container.classList.add("fading");
  setTimeout(() => {
    container.innerHTML = pages[index].map(cardMarkup).join("");
    container.classList.remove("fading");
  }, 260);
}

function goToTestimonialPage(index) {
  currentPage = ((index % pages.length) + pages.length) % pages.length;
  renderTestimonialPage(currentPage);
}

function startTestimonialAutoplay() {
  if (autoTimer) clearInterval(autoTimer);
  autoTimer = setInterval(() => goToTestimonialPage(currentPage + 1), AUTOPLAY_MS);
}

renderTestimonialPage(0);
startTestimonialAutoplay();

// ── LOAD PRODUCTS FROM SUPABASE ───────────────────────────
async function loadProductsFromSupabase() {
  if (sb) {
    try {
      const { data, error } = await sb.from("products").select("*");
      if (!error && data && data.length) {
        products.splice(0, products.length, ...data);
      }
    } catch (e) {
      console.warn("Could not load products from Supabase, using fallback data", e);
    }

    sb.channel("home-products-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "products" }, (payload) => {
        if (payload.eventType === "INSERT") {
          products.unshift(payload.new);
          showToast(`🔥 New arrival: ${payload.new.name}`);
        } else if (payload.eventType === "UPDATE") {
          const i = products.findIndex((p) => String(p.id) === String(payload.new.id));
          if (i !== -1) products[i] = payload.new;
        } else if (payload.eventType === "DELETE") {
          const i = products.findIndex((p) => String(p.id) === String(payload.old.id));
          if (i !== -1) products.splice(i, 1);
        }
        renderProducts();
        renderHomeArrivals();
      })
      .subscribe();
  }

  // ✅ FIX: activeCat is "all" by default — styleFilterPills highlights the All card immediately on load
  styleFilterPills();
  renderProducts();
  renderHomeArrivals();
  renderCart();
}

// ── PROFILE MODAL ─────────────────────────────────────────
function mpFmt(n) { return "₦" + Number(n).toLocaleString("en-NG"); }

function mpOrderCard(o) {
  const statusMap = {
    success:   { bg: "#eaf3de", color: "#3B6D11", icon: "✓",  label: "Delivered" },
    pending:   { bg: "#faeeda", color: "#854F0B", icon: "⏳", label: "Pending"   },
    cancelled: { bg: "#fde8e8", color: "#9b1c1c", icon: "✕",  label: "Cancelled" },
  };
  const c       = statusMap[o.status] || statusMap.pending;
  const dateStr = o.created_at
    ? new Date(o.created_at).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })
    : "";
  return `
    <div style="background:#f9fafb;border-radius:10px;border:.5px solid #e5e7eb;padding:.9rem 1rem;margin-bottom:.65rem;display:flex;gap:12px;align-items:center;">
      <div style="width:38px;height:38px;border-radius:8px;background:${c.bg};color:${c.color};display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;">${c.icon}</div>
      <div style="flex:1;min-width:0;">
        <div style="font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${o.items_summary || "Order"}</div>
        <div style="font-size:11px;color:#6b7280;margin-top:1px;">#${String(o.id).slice(0, 8).toUpperCase()} · ${dateStr}</div>
      </div>
      <div style="text-align:right;flex-shrink:0;">
        <div style="font-size:13px;font-weight:600;">${mpFmt(o.total)}</div>
        <span style="display:inline-block;font-size:10px;padding:2px 8px;border-radius:20px;margin-top:3px;font-weight:600;background:${c.bg};color:${c.color};">${c.label}</span>
      </div>
    </div>`;
}

async function openMpModal() {
  if (!currentUser) return;
  const mpOverlay = document.getElementById("mp-overlay");
  if (mpOverlay) mpOverlay.style.display = "flex";

  document.querySelectorAll(".mp-tab").forEach((t) => {
    const is = t.dataset.tab === "overview";
    t.style.color        = is ? "#ff7a00" : "#6b7280";
    t.style.borderBottom = is ? "2px solid #ff7a00" : "2px solid transparent";
    t.style.fontWeight   = is ? "600" : "400";
  });
  ["overview", "history", "pending", "account"].forEach((id) => {
    const el = document.getElementById("mp-tab-" + id);
    if (el) el.style.display = id === "overview" ? "block" : "none";
  });

  const avatar    = document.getElementById("mp-avatar");
  const dispName  = document.getElementById("mp-disp-name");
  const dispEmail = document.getElementById("mp-disp-email");
  const accName   = document.getElementById("mp-acc-name");
  const accEmail  = document.getElementById("mp-acc-email");
  const accSince  = document.getElementById("mp-acc-since");

  if (avatar)    avatar.textContent    = (currentUser.name || currentUser.email || "U").charAt(0).toUpperCase();
  if (dispName)  dispName.textContent  = currentUser.name  || "—";
  if (dispEmail) dispEmail.textContent = currentUser.email || "—";
  if (accName)   accName.textContent   = currentUser.name  || "—";
  if (accEmail)  accEmail.textContent  = currentUser.email || "—";

  if (sb && currentUser.id && accSince) {
    try {
      const { data: prof } = await sb.from("profiles").select("created_at").eq("id", currentUser.id).single();
      accSince.textContent = prof?.created_at
        ? new Date(prof.created_at).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })
        : "—";
    } catch { accSince.textContent = "—"; }
  }

  let orders = [];
  if (sb && currentUser.id) {
    try {
      const { data, error } = await sb.from("orders").select("*")
        .eq("user_id", currentUser.id)
        .order("created_at", { ascending: false });
      if (!error && data) orders = data;
    } catch (e) { console.warn("Orders load failed", e); }
  }

  const successOrders   = orders.filter((o) => o.status === "success");
  const pendingOrders   = orders.filter((o) => o.status === "pending");
  const cancelledOrders = orders.filter((o) => o.status === "cancelled");

  const statTotal   = document.getElementById("mp-stat-total");
  const statSuccess = document.getElementById("mp-stat-success");
  const statPending = document.getElementById("mp-stat-pending");
  if (statTotal)   statTotal.textContent   = orders.length;
  if (statSuccess) statSuccess.textContent = successOrders.length;
  if (statPending) statPending.textContent = pendingOrders.length;

  const emptyMsg = (t) => `<div style="text-align:center;padding:1.5rem 0;font-size:12px;color:#9ca3af;">${t}</div>`;

  const recentList  = document.getElementById("mp-recent-list");
  const historyList = document.getElementById("mp-history-list");
  const pendingList = document.getElementById("mp-pending-list");

  if (recentList)  recentList.innerHTML  = orders.length         ? orders.slice(0, 5).map(mpOrderCard).join("") : emptyMsg("No orders yet. Start shopping! 🛍️");
  if (historyList) historyList.innerHTML = successOrders.length  ? successOrders.map(mpOrderCard).join("")       : emptyMsg("No completed orders yet");
  if (pendingList) pendingList.innerHTML = (pendingOrders.length || cancelledOrders.length)
    ? [...pendingOrders, ...cancelledOrders].map(mpOrderCard).join("")
    : emptyMsg("No pending orders 🎉");
}

document.getElementById("mp-close-btn")?.addEventListener("click", () => {
  const mpOverlay = document.getElementById("mp-overlay");
  if (mpOverlay) mpOverlay.style.display = "none";
});
document.getElementById("mp-overlay")?.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) e.target.style.display = "none";
});
document.querySelectorAll(".mp-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".mp-tab").forEach((t) => {
      t.style.color        = "#6b7280";
      t.style.borderBottom = "2px solid transparent";
      t.style.fontWeight   = "400";
    });
    tab.style.color        = "#ff7a00";
    tab.style.borderBottom = "2px solid #ff7a00";
    tab.style.fontWeight   = "600";
    ["overview", "history", "pending", "account"].forEach((id) => {
      const el = document.getElementById("mp-tab-" + id);
      if (el) el.style.display = id === tab.dataset.tab ? "block" : "none";
    });
  });
});

// ── KICK OFF ──────────────────────────────────────────────
loadProductsFromSupabase();