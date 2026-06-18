emailjs.init("iPxqCrlDaf1OsTw3J");

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
} catch (e) {
  console.warn("Supabase init failed", e);
}

// ── DARK MODE ─────────────────────────────────────────────
const html     = document.documentElement;
const themeBtn = document.getElementById("themeBtn");
const iconSun  = document.getElementById("iconSun");
const iconMoon = document.getElementById("iconMoon");

function applyTheme(dark) {
  if (dark) {
    html.classList.add("dark");
    iconSun.classList.add("hidden");
    iconMoon.classList.remove("hidden");
  } else {
    html.classList.remove("dark");
    iconSun.classList.remove("hidden");
    iconMoon.classList.add("hidden");
  }
}

const savedTheme  = localStorage.getItem("gTheme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(savedTheme ? savedTheme === "dark" : prefersDark);

themeBtn.addEventListener("click", () => {
  const isDark = html.classList.contains("dark");
  applyTheme(!isDark);
  localStorage.setItem("gTheme", !isDark ? "dark" : "light");
});

// ── MOBILE MENU ───────────────────────────────────────────
const hamburger  = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
hamburger.addEventListener("click", (e) => {
  e.stopPropagation();
  mobileMenu.classList.toggle("hidden");
});
document.addEventListener("click", (e) => {
  if (!mobileMenu.contains(e.target) && e.target !== hamburger)
    mobileMenu.classList.add("hidden");
});

// ── CATEGORIES DROPDOWN (desktop) ─────────────────────────
(function () {
  const btn = document.getElementById("catNavBtn");
  const dd  = document.getElementById("catNavDropdown");
  const chv = document.getElementById("catNavChevron");
  const li  = document.getElementById("catNavItem");
  if (!btn || !dd) return;

  function openDd() {
    dd.classList.remove("opacity-0", "pointer-events-none", "-translate-y-[6px]", "-translate-y-1.5");
    dd.classList.add("opacity-100", "translate-y-0");
    chv.style.transform = "rotate(180deg)";
  }
  function closeDd() {
    dd.classList.add("opacity-0", "pointer-events-none");
    dd.classList.remove("opacity-100", "translate-y-0");
    chv.style.transform = "";
  }

  li.addEventListener("mouseenter", openDd);
  li.addEventListener("mouseleave", closeDd);
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    dd.classList.contains("opacity-0") ? openDd() : closeDd();
  });
  document.addEventListener("click", (e) => { if (!li.contains(e.target)) closeDd(); });

  if (!window.location.pathname.includes("shop.html")) {
    document.querySelectorAll(".cat-nav-link").forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        closeDd();
        mobileMenu.classList.add("hidden");
        if (typeof setFilter === "function") {
          setFilter(a.dataset.cat);
          document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }

  document.querySelectorAll(".mob-cat-btn").forEach((b) => {
    b.addEventListener("click", () => {
      if (typeof setFilter === "function") setFilter(b.dataset.cat);
      mobileMenu.classList.add("hidden");
    });
  });
})();

// ── CART HELPERS ──────────────────────────────────────────
function loadCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); }
  catch { return []; }
}
function saveCart(c) {
  localStorage.setItem(CART_KEY, JSON.stringify(c));
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
    grid.innerHTML = '<div class="col-span-full text-center py-16 px-5 text-gray-500 dark:text-gray-400 text-sm">No products found.</div>';
    return;
  }

  grid.innerHTML = list.map((p, i) => `
    <div class="product-card bg-white dark:bg-neutral-900 border-[1.5px] border-gray-200 dark:border-neutral-800 rounded-2xl overflow-hidden flex flex-col transition-all hover:shadow-xl hover:border-brand animate-fadeUp group" style="animation-delay:${i * 0.04}s">
      <div class="relative aspect-square overflow-hidden bg-gray-100 dark:bg-neutral-800">
        <img src="${p.img}" alt="${p.name}" loading="lazy" class="w-full h-full object-cover transition-transform duration-350 group-hover:scale-105">
        ${p.new_arrival ? '<span class="absolute top-2 left-2 bg-brand text-white text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">New</span>' : ""}
      </div>
      <div class="p-3.5 flex-1 flex flex-col">
        <div class="text-[10px] font-semibold uppercase tracking-[0.08em] text-brand mb-1">${p.cat}</div>
        <div class="text-[13px] font-semibold mb-1 whitespace-nowrap overflow-hidden text-ellipsis" title="${p.name}">${p.name}</div>
        <div class="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed mb-2.5 line-clamp-2 flex-1">${p.desc || ""}</div>
        <div class="text-[15px] font-bold text-brand mb-3">${fmt(p.price)}</div>
        <div class="flex gap-2">
          <button class="flex-1 px-1 py-2 rounded-full border-[1.5px] border-gray-200 dark:border-neutral-700 text-[12px] font-semibold hover:border-brand hover:text-brand transition-colors" data-id="${p.id}" data-action="details">Details</button>
          <button class="flex-1 px-1 py-2 rounded-full bg-brand text-white text-[12px] font-semibold hover:opacity-85 transition-opacity" data-id="${p.id}" data-action="cart">Add to Cart</button>
        </div>
      </div>
    </div>
  `).join("");
}

document.getElementById("productGrid").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;
  const id = +btn.dataset.id;
  if (btn.dataset.action === "cart") {
    const p = products.find((x) => x.id === id);
    if (p) addToCart(p, 1);
  } else {
    const p = products.find((x) => x.id === id);
    if (p) openProductDetail(p);
  }
});

// ── FILTERS ───────────────────────────────────────────────
const pillBase     = "px-[18px] py-2 rounded-full border-[1.5px] text-[13px] font-medium transition-all whitespace-nowrap";
const pillInactive = "border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100 hover:border-brand hover:text-brand";
const pillActive   = "bg-brand text-white border-brand";
const catCardBase  = "cat-card flex flex-col items-center gap-3 bg-white dark:bg-neutral-900 border-[1.5px] rounded-2xl py-7 px-4 text-[13px] font-medium hover:border-brand hover:shadow-[0_4px_20px_rgba(255,122,0,0.12)] transition-all";

function styleFilterPills() {
  document.querySelectorAll(".filter-pill").forEach((b) => {
    const active = b.dataset.cat === activeCat;
    b.className = pillBase + " " + (active ? pillActive : pillInactive);
  });
  document.querySelectorAll(".cat-card").forEach((b) => {
    const active = b.dataset.cat === activeCat;
    b.className = catCardBase + " " + (active
      ? "border-brand shadow-[0_4px_20px_rgba(255,122,0,0.12)]"
      : "border-gray-200 dark:border-neutral-800");
  });
}

function setFilter(cat) {
  activeCat = cat;
  styleFilterPills();
  renderProducts();
}

const filterRowEl = document.getElementById("filterRow");
if (filterRowEl) {
  filterRowEl.classList.remove("hidden");
  filterRowEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-pill");
    if (btn) setFilter(btn.dataset.cat);
  });
}

const catGrid = document.getElementById("catGrid");
if (catGrid) {
  catGrid.addEventListener("click", (e) => {
    const btn = e.target.closest(".cat-card");
    if (!btn) return;
    setFilter(btn.dataset.cat);
    document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
  });
}

document.querySelectorAll(".footer-cat").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    setFilter(a.dataset.cat);
    document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
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
  const shop = document.getElementById("shop");
  if (shop) shop.scrollIntoView({ behavior: "smooth" });
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
  searchMobile.addEventListener("keydown", (e) => { if (e.key === "Enter") { doSearch(e.target.value); mobileMenu.classList.add("hidden"); } });
}
const searchBtnM = document.getElementById("searchBtnM");
if (searchBtnM) searchBtnM.addEventListener("click", () => { doSearch(document.getElementById("searchMobile").value); mobileMenu.classList.add("hidden"); });

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
  const badge = document.getElementById("cartBadge");
  const total = document.getElementById("cartTotal");
  const items = document.getElementById("cartItems");
  if (!badge || !total || !items) return;

  const count = cartArr.reduce((s, i) => s + i.qty, 0);
  const sum   = cartArr.reduce((s, i) => s + i.price * i.qty, 0);
  badge.textContent = count;
  total.textContent = fmt(sum);

  if (!cartArr.length) {
    items.innerHTML = `<div class="flex flex-col items-center justify-center h-full text-gray-300 dark:text-gray-600 gap-2.5 text-center p-10">
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="opacity-40"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
      <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Your cart is empty</p>
      <span class="text-xs">Add some gadgets to get started</span>
    </div>`;
    return;
  }

  items.innerHTML = cartArr.map((item) => `
    <div class="flex gap-3 items-center p-2.5 bg-gray-100 dark:bg-neutral-800 rounded-[10px]">
      <img src="${item.img}" alt="${item.name}" class="w-[52px] h-[52px] object-cover rounded-lg shrink-0">
      <div class="flex-1 min-w-0">
        <div class="text-xs font-semibold whitespace-nowrap overflow-hidden text-ellipsis mb-0.5">${item.name}</div>
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

document.getElementById("cartItems").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn || !btn.dataset.id) return;
  const id      = btn.dataset.id;
  const cartArr = loadCart();
  const item    = cartArr.find((i) => String(i.id) === String(id));
  if (!item) return;
  if      (btn.dataset.action === "inc")    item.qty++;
  else if (btn.dataset.action === "dec")  { item.qty--; if (item.qty <= 0) cartArr.splice(cartArr.indexOf(item), 1); }
  else if (btn.dataset.action === "remove") cartArr.splice(cartArr.indexOf(item), 1);
  saveCart(cartArr);
  renderCart();
});

window.addEventListener("storage", (e) => { if (e.key === CART_KEY) renderCart(); });

const cartDrawer  = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");

function openCart()  {
  cartOverlay.classList.remove("hidden");
  requestAnimationFrame(() => cartDrawer.classList.remove("translate-x-full"));
}
function closeCart() {
  cartDrawer.classList.add("translate-x-full");
  cartOverlay.classList.add("hidden");
}

document.getElementById("cartBtn").addEventListener("click", openCart);
document.getElementById("cartClose").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

// ── CHECKOUT / PAYMENT MODAL ──────────────────────────────
function copyAcct() {
  navigator.clipboard.writeText("0230092228").then(() => showToast("Account number copied!"));
}

async function openPaymentModal() {
  const cartArr = loadCart();
  if (!cartArr.length) { showToast("Your cart is empty"); return; }
  if (!currentUser)    { showToast("Please sign in to checkout"); showAuthModal("signIn"); return; }

  const total        = cartArr.reduce((s, i) => s + i.price * i.qty, 0);
  const totalFmt     = fmt(total);
  const itemLines    = cartArr.map(i => `${i.name} x${i.qty} — ${fmt(i.price * i.qty)}`).join("\n");
  const itemsSummary = cartArr.map(i => `${i.name} x${i.qty}`).join(", ");

  document.getElementById("paymentTotal").textContent = totalFmt;

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
    } catch (err) {
      console.warn("Order save failed", err);
    }
  }

  const refTag = orderId ? ` (Ref: ${String(orderId).slice(0, 8).toUpperCase()})` : "";
  const msg = encodeURIComponent(
    `Hello Minipi NG! 👋\n\nI just made a payment for my order${refTag}:\n\n` +
    `🛒 *Items Ordered:*\n${itemLines}\n\n💰 *Total Paid: ${totalFmt}*\n\nPlease find my payment receipt attached. Kindly confirm my order. Thank you!`
  );
  document.getElementById("whatsappPayLink").href = `https://wa.me/2348034970248?text=${msg}`;

  closeCart();
  const ov = document.getElementById("paymentOverlay");
  ov.classList.remove("hidden");
  ov.classList.add("flex");
}

document.getElementById("checkoutBtn").addEventListener("click", openPaymentModal);

document.getElementById("paymentClose").addEventListener("click", () => {
  document.getElementById("paymentOverlay").classList.add("hidden");
  document.getElementById("paymentOverlay").classList.remove("flex");
});
document.getElementById("paymentOverlay").addEventListener("click", function (e) {
  if (e.target === this) { this.classList.add("hidden"); this.classList.remove("flex"); }
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
    <div class="bg-white dark:bg-neutral-900 border-[1.5px] border-gray-200 dark:border-neutral-800 rounded-2xl overflow-hidden flex flex-col group cursor-pointer hover:border-brand hover:shadow-lg transition-all"
         onclick='openProductDetail(${JSON.stringify(p).replace(/'/g, "&#39;")})'>
      <div class="relative aspect-square overflow-hidden bg-gray-100 dark:bg-neutral-800">
        <img src="${p.img}" alt="${p.name}" loading="lazy" class="w-full h-full object-cover transition-transform duration-350 group-hover:scale-105" />
        <span class="absolute top-2 left-2 bg-brand text-white text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">New</span>
      </div>
      <div class="p-3 flex-1 flex flex-col">
        <div class="text-[10px] font-semibold uppercase tracking-[0.08em] text-brand mb-0.5">${p.cat}</div>
        <div class="text-[12px] font-semibold mb-1 whitespace-nowrap overflow-hidden text-ellipsis">${p.name}</div>
        <div class="text-[13px] font-bold text-brand mt-auto pt-2">${fmt(p.price)}</div>
      </div>
    </div>`
  ).join("");
}

document.getElementById("arrLeft")?.addEventListener("click",  () => document.getElementById("arrivalsTrack")?.scrollBy({ left: -250, behavior: "smooth" }));
document.getElementById("arrRight")?.addEventListener("click", () => document.getElementById("arrivalsTrack")?.scrollBy({ left:  250, behavior: "smooth" }));

// ── SCROLL ANIMATION ──────────────────────────────────────
const fadeSections = document.querySelectorAll(".fade-section");
const observer = new IntersectionObserver(
  (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("show"); }),
  { threshold: 0.2 }
);
fadeSections.forEach((s) => observer.observe(s));

// ── PRODUCT DETAIL MODAL ──────────────────────────────────
let pdCurrent = null, pdQty = 1;

function openProductDetail(p) {
  pdCurrent = p;
  pdQty     = 1;
  document.getElementById("pdImg").src           = p.img;
  document.getElementById("pdImg").alt           = p.name;
  document.getElementById("pdCat").textContent   = (p.cat || "").toUpperCase();
  document.getElementById("pdName").textContent  = p.name;
  document.getElementById("pdDesc").textContent  = p.desc || "";
  document.getElementById("pdPrice").textContent = fmt(p.price);
  document.getElementById("pdQty").textContent   = 1;
  const ov = document.getElementById("pdOverlay");
  ov.classList.remove("hidden");
  ov.classList.add("flex");
}

document.getElementById("pdClose").addEventListener("click", () => {
  document.getElementById("pdOverlay").classList.add("hidden");
  document.getElementById("pdOverlay").classList.remove("flex");
});
document.getElementById("pdOverlay").addEventListener("click", (e) => {
  if (e.target === document.getElementById("pdOverlay")) {
    document.getElementById("pdOverlay").classList.add("hidden");
    document.getElementById("pdOverlay").classList.remove("flex");
  }
});
document.getElementById("pdInc").addEventListener("click", () => { pdQty++; document.getElementById("pdQty").textContent = pdQty; });
document.getElementById("pdDec").addEventListener("click", () => { if (pdQty > 1) { pdQty--; document.getElementById("pdQty").textContent = pdQty; } });
document.getElementById("pdAddCart").addEventListener("click", () => {
  if (pdCurrent) addToCart(pdCurrent, pdQty);
  document.getElementById("pdOverlay").classList.add("hidden");
  document.getElementById("pdOverlay").classList.remove("flex");
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
    document.getElementById("infoTitle").textContent = d.title;
    document.getElementById("infoBody").innerHTML    = d.body;
    const ov = document.getElementById("infoOverlay");
    ov.classList.remove("hidden");
    ov.classList.add("flex");
  });
});
document.getElementById("infoClose").addEventListener("click", () => {
  document.getElementById("infoOverlay").classList.add("hidden");
  document.getElementById("infoOverlay").classList.remove("flex");
});
document.getElementById("infoOverlay").addEventListener("click", (e) => {
  if (e.target === document.getElementById("infoOverlay")) {
    document.getElementById("infoOverlay").classList.add("hidden");
    document.getElementById("infoOverlay").classList.remove("flex");
  }
});

// ── TOAST ─────────────────────────────────────────────────
let toastT = null;
function showToast(msg, duration = 2500) {
  const t = document.getElementById("toast");
  document.getElementById("toastMsg").textContent = msg;
  t.classList.remove("opacity-0", "translate-y-20");
  t.classList.add("opacity-100", "translate-y-0");
  if (toastT) clearTimeout(toastT);
  toastT = setTimeout(() => {
    t.classList.add("opacity-0", "translate-y-20");
    t.classList.remove("opacity-100", "translate-y-0");
  }, duration);
}

// ── ABOUT TOGGLE ──────────────────────────────────────────
function toggleContent() {
  const content = document.getElementById("moreContent");
  const button  = document.getElementById("toggleBtn");
  content.classList.toggle("hidden");
  button.textContent = content.classList.contains("hidden") ? "See More" : "See Less";
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
        showToast(`🎉 Your order "${updated.items_summary.split(",")[0]}…" has been approved!`, 5000);
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

// ── refreshAuthUI ─────────────────────────────────────────
function refreshAuthUI() {
  const authDd    = document.getElementById("authDropdown");
  const userDd    = document.getElementById("userDropdown");
  const adminLink = document.getElementById("adminNavLink");

  authDd.classList.add("hidden");
  userDd.classList.add("hidden");

  if (currentUser) {
    document.getElementById("userName").textContent  = currentUser.name;
    document.getElementById("userEmail").textContent = currentUser.email;
    if (adminLink) {
      const isAdmin = ADMIN_EMAILS.map(e => e.toLowerCase()).includes(currentUser.email.toLowerCase());
      adminLink.classList.toggle("hidden", !isAdmin);
      adminLink.classList.toggle("flex",    isAdmin);
    }
    subscribeToUserOrders();
  } else {
    document.getElementById("userName").textContent  = "—";
    document.getElementById("userEmail").textContent = "—";
    if (adminLink) { adminLink.classList.add("hidden"); adminLink.classList.remove("flex"); }
    unsubscribeFromUserOrders();
  }
}

// ── ACCOUNT DROPDOWN ──────────────────────────────────────
const accountBtn = document.getElementById("accountBtn");
const authDd     = document.getElementById("authDropdown");
const userDd     = document.getElementById("userDropdown");

accountBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if (currentUser) {
    authDd.classList.add("hidden");
    userDd.classList.add("hidden");
    openMpModal();
  } else {
    const isHidden = authDd.classList.contains("hidden");
    authDd.classList.toggle("hidden", !isHidden);
    userDd.classList.add("hidden");
  }
});

document.addEventListener("click", (e) => {
  if (!accountBtn.contains(e.target)) {
    authDd.classList.add("hidden");
    userDd.classList.add("hidden");
  }
});

// ── AUTH MODALS ───────────────────────────────────────────
const authOverlay = document.getElementById("authOverlay");
const signInModal = document.getElementById("signInModal");
const signUpModal = document.getElementById("signUpModal");

function showAuthModal(which) {
  authOverlay.classList.remove("hidden");
  authOverlay.classList.add("flex");
  authDd.classList.add("hidden");
  userDd.classList.add("hidden");
  if (which === "signIn") {
    signInModal.classList.remove("hidden");
    signUpModal.classList.add("hidden");
  } else {
    signUpModal.classList.remove("hidden");
    signInModal.classList.add("hidden");
  }
  clearAuthAlerts();
}

function closeAuthModal() {
  authOverlay.classList.add("hidden");
  authOverlay.classList.remove("flex");
  signInModal.classList.add("hidden");
  signUpModal.classList.add("hidden");
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

document.getElementById("openSignIn").addEventListener("click", () => showAuthModal("signIn"));
document.getElementById("openSignUp").addEventListener("click", () => showAuthModal("signUp"));
document.getElementById("toSignUp").addEventListener("click",   () => showAuthModal("signUp"));
document.getElementById("toSignIn").addEventListener("click",   () => showAuthModal("signIn"));
document.querySelectorAll(".auth-close").forEach((btn) => btn.addEventListener("click", closeAuthModal));
authOverlay.addEventListener("click", (e) => { if (e.target === authOverlay) closeAuthModal(); });

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".toggle-pwd");
  if (!btn) return;
  const input = document.getElementById(btn.dataset.target);
  if (input) input.type = input.type === "password" ? "text" : "password";
});

document.getElementById("suPwd").addEventListener("input", (e) => {
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

document.getElementById("siEmail").addEventListener("keydown", (e) => { if (e.key === "Enter") document.getElementById("signInBtn").click(); });
document.getElementById("siPwd").addEventListener("keydown",   (e) => { if (e.key === "Enter") document.getElementById("signInBtn").click(); });
document.getElementById("suPwd").addEventListener("keydown",   (e) => { if (e.key === "Enter") document.getElementById("signUpBtn").click(); });

function setBusy(btn, busy, loadTxt, origTxt) {
  btn.disabled  = busy;
  btn.innerHTML = busy
    ? `<span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0"></span>${loadTxt}`
    : origTxt;
}

// ── SIGN UP ───────────────────────────────────────────────
document.getElementById("signUpBtn").addEventListener("click", async () => {
  clearAuthAlerts();
  const name  = document.getElementById("suName").value.trim();
  const email = document.getElementById("suEmail").value.trim().toLowerCase();
  const pwd   = document.getElementById("suPwd").value;
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
      document.getElementById("suName").value  = "";
      document.getElementById("suEmail").value = "";
      document.getElementById("suPwd").value   = "";
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
document.getElementById("signInBtn").addEventListener("click", async () => {
  clearAuthAlerts();
  const email = document.getElementById("siEmail").value.trim().toLowerCase();
  const pwd   = document.getElementById("siPwd").value;
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
// FIX: error was silently swallowed; now properly thrown and caught
document.getElementById("forgotBtn").addEventListener("click", async () => {
  clearAuthAlerts();
  const email = document.getElementById("siEmail").value.trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showAlert("siError", 'Enter your email address first, then click "Forgot password?".');
    return;
  }
  if (!sb) { showAlert("siError", "Feature unavailable right now."); return; }

  const fBtn = document.getElementById("forgotBtn");
  fBtn.textContent = "Sending…";
  fBtn.disabled    = true;
  try {
    const { error } = await sb.auth.resetPasswordForEmail(email, {
      redirectTo: "https://www.minipi.org/index.html",
    });
    if (error) throw error;
    showAlert("siSuccess", `Reset link sent to ${email}. Check your inbox (and spam folder).`);
  } catch (err) {
    showAlert("siError", err.message || "Could not send reset email. Please try again.");
  } finally {
    fBtn.textContent = "Forgot password?";
    fBtn.disabled    = false;
  }
});

// ── SIGN OUT ──────────────────────────────────────────────
document.getElementById("logoutBtn").addEventListener("click", async () => {
  userDd.classList.add("hidden");
  if (sb) { try { await sb.auth.signOut(); } catch (e) {} }
  currentUser = null;
  const mpOverlay = document.getElementById("mp-overlay");
  if (mpOverlay) mpOverlay.style.display = "none";
  closeCart();
  refreshAuthUI();
  showToast("Signed out successfully");
});

// ── RESET PASSWORD MODAL ──────────────────────────────────
// FIX: openResetModal and the submit handler were either missing or incomplete
function openResetModal() {
  // Close any open auth modal first
  authOverlay.classList.add("hidden");
  authOverlay.classList.remove("flex");
  signInModal.classList.add("hidden");
  signUpModal.classList.add("hidden");

  // Clear fields and alerts
  document.getElementById("rpPwd").value        = "";
  document.getElementById("rpPwdConfirm").value = "";
  ["rpError", "rpSuccess"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) { el.classList.add("hidden"); el.textContent = ""; }
  });
  document.getElementById("rpSubmitBtn").innerHTML = "Update Password";
  document.getElementById("rpSubmitBtn").disabled  = false;

  const ov = document.getElementById("resetOverlay");
  ov.classList.remove("hidden");
  ov.classList.add("flex");
}

function closeResetModal() {
  const ov = document.getElementById("resetOverlay");
  ov.classList.add("hidden");
  ov.classList.remove("flex");
}

document.getElementById("rpClose").addEventListener("click", closeResetModal);
document.getElementById("resetOverlay").addEventListener("click", (e) => {
  if (e.target === document.getElementById("resetOverlay")) closeResetModal();
});

// Allow Enter key in reset fields
document.getElementById("rpPwd").addEventListener("keydown",        (e) => { if (e.key === "Enter") document.getElementById("rpSubmitBtn").click(); });
document.getElementById("rpPwdConfirm").addEventListener("keydown", (e) => { if (e.key === "Enter") document.getElementById("rpSubmitBtn").click(); });

// FIX: This handler was completely missing in the broken version
document.getElementById("rpSubmitBtn").addEventListener("click", async () => {
  const pwd    = document.getElementById("rpPwd").value;
  const cnf    = document.getElementById("rpPwdConfirm").value;
  const errEl  = document.getElementById("rpError");
  const okEl   = document.getElementById("rpSuccess");
  const btn    = document.getElementById("rpSubmitBtn");

  // Clear previous alerts
  [errEl, okEl].forEach((el) => { if (el) { el.classList.add("hidden"); el.textContent = ""; } });

  if (!pwd || pwd.length < 6) {
    errEl.textContent = "Password must be at least 6 characters.";
    errEl.classList.remove("hidden");
    return;
  }
  if (pwd !== cnf) {
    errEl.textContent = "Passwords do not match.";
    errEl.classList.remove("hidden");
    return;
  }
  if (!sb) {
    errEl.textContent = "Auth service unavailable.";
    errEl.classList.remove("hidden");
    return;
  }

  setBusy(btn, true, "Updating…", "Update Password");
  try {
    const { error } = await sb.auth.updateUser({ password: pwd });
    if (error) throw error;

    // Show success then refresh session
    okEl.textContent = "Password updated! Signing you in…";
    okEl.classList.remove("hidden");

    // Refresh the session so currentUser is populated
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

    setTimeout(() => {
      closeResetModal();
      showToast("Password updated successfully! 🎉");
    }, 1800);
  } catch (err) {
    errEl.textContent = err.message || "Failed to update password. Please request a new reset link.";
    errEl.classList.remove("hidden");
  } finally {
    setBusy(btn, false, "", "Update Password");
  }
});

// ── SESSION / AUTH STATE ──────────────────────────────────
// FIX: onAuthStateChange was placed AFTER getSession in original — now properly ordered
// and PASSWORD_RECOVERY event correctly opens reset modal
if (sb) {
  sb.auth.onAuthStateChange((event, session) => {
    // User clicked the reset link in their email
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
      // Only close auth modal on explicit SIGNED_IN, not on TOKEN_REFRESHED etc.
      if (event === "SIGNED_IN") closeAuthModal();
    } else if (event === "SIGNED_OUT") {
      currentUser = null;
      refreshAuthUI();
    }
  });

  // Restore existing session on page load
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
const container     = document.getElementById("testimonialContainer");
const dotsContainer = document.getElementById("testimonialDots");
const progressFill  = document.getElementById("testimonialProgress");
const prevBtn       = document.getElementById("testimonialPrev");
const nextBtn       = document.getElementById("testimonialNext");
const wrap          = document.getElementById("testimonialWrap");

const pages = [];
for (let i = 0; i < testimonials.length; i += PAGE_SIZE) pages.push(testimonials.slice(i, i + PAGE_SIZE));

let currentPage = 0, timer = null;

function cardMarkup(item) {
  return `<div class="relative bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/30 hover:shadow-brand/70 hover:border-brand hover:-translate-y-2 transition-all duration-500">
    <span class="absolute top-3 right-5 text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-brand to-brand opacity-10 select-none">&rdquo;</span>
    <div class="flex mb-5 text-yellow-400 text-xl drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]">★★★★★</div>
    <p class="text-black dark:text-white/90 leading-relaxed mb-6 text-sm md:text-base">"${item.text}"</p>
    <div class="flex items-center gap-4">
      <div class="w-14 h-14 rounded-full bg-gradient-to-r from-white to-brand/40 flex items-center justify-center font-bold text-lg text-white shadow-lg shadow-brand/50">${item.name.charAt(0)}</div>
      <div><h4 class="font-semibold text-lg text-black dark:text-white">${item.name}</h4><p class="text-sm dark:text-gray-400">${item.role}</p></div>
    </div>
  </div>`;
}

function paint(index) { if (!container) return; container.innerHTML = pages[index].map(cardMarkup).join(""); }

function renderPage(index, animate = true) {
  if (!container) return;
  if (animate) {
    container.classList.add("opacity-0", "translate-y-2");
    setTimeout(() => { paint(index); container.classList.remove("opacity-0", "translate-y-2"); }, 260);
  } else {
    paint(index);
  }
  updateDots(index);
  restartProgress();
}

function buildDots() {
  if (!dotsContainer) return;
  dotsContainer.innerHTML = pages.map((_, i) =>
    `<button class="h-2 rounded-full transition-all duration-300 ${i === 0 ? "w-6 bg-gradient-to-r from-cyan-400 to-brand" : "w-2 bg-white/20 hover:bg-white/40"}" data-index="${i}" aria-current="${i === 0 ? "true" : "false"}"></button>`
  ).join("");
  dotsContainer.querySelectorAll("button").forEach((dot) => {
    dot.addEventListener("click", () => {
      currentPage = parseInt(dot.dataset.index, 10);
      renderPage(currentPage);
      restartAutoplay();
    });
  });
}

function updateDots(index) {
  if (!dotsContainer) return;
  dotsContainer.querySelectorAll("button").forEach((dot, i) => {
    dot.setAttribute("aria-current", i === index ? "true" : "false");
    dot.className = `h-2 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-gradient-to-r from-cyan-400 to-blue-600" : "w-2 bg-white/20 hover:bg-white/40"}`;
  });
}

function restartProgress() {
  if (!progressFill) return;
  progressFill.style.animation = "none";
  void progressFill.offsetHeight;
  progressFill.style.animation = `fillProgress ${AUTOPLAY_MS}ms linear`;
}

function goTo(index) { currentPage = (index + pages.length) % pages.length; renderPage(currentPage); }
function restartAutoplay() { clearInterval(timer); timer = setInterval(() => goTo(currentPage + 1), AUTOPLAY_MS); }

if (prevBtn) prevBtn.addEventListener("click", () => { goTo(currentPage - 1); restartAutoplay(); });
if (nextBtn) nextBtn.addEventListener("click", () => { goTo(currentPage + 1); restartAutoplay(); });
if (wrap) {
  wrap.addEventListener("mouseenter", () => { clearInterval(timer); if (progressFill) progressFill.style.animationPlayState = "paused"; });
  wrap.addEventListener("mouseleave", () => { if (progressFill) progressFill.style.animationPlayState = "running"; restartAutoplay(); });
}

buildDots();
paint(0);
restartProgress();
restartAutoplay();

// ── LOAD PRODUCTS FROM SUPABASE ───────────────────────────
async function loadProductsFromSupabase() {
  if (sb) {
    try {
      const { data, error } = await sb.from("products").select("*");
      if (!error && data && data.length) {
        products.length = 0;
        products.push(...data);
      }
    } catch (e) {
      console.warn("Could not load products from Supabase, using fallback data", e);
    }

    sb.channel("home-products-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "products" }, (payload) => {
        if      (payload.eventType === "INSERT") { products.unshift(payload.new); showToast(`🔥 New: ${payload.new.name}`); }
        else if (payload.eventType === "UPDATE") { const i = products.findIndex((p) => String(p.id) === String(payload.new.id)); if (i !== -1) products[i] = payload.new; }
        else if (payload.eventType === "DELETE") { const i = products.findIndex((p) => String(p.id) === String(payload.old.id)); if (i !== -1) products.splice(i, 1); }
        renderProducts();
        renderHomeArrivals();
      })
      .subscribe();
  }

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
  return `<div style="background:#f9fafb;border-radius:10px;border:.5px solid #e5e7eb;padding:.9rem 1rem;margin-bottom:.65rem;display:flex;gap:12px;align-items:center;">
    <div style="width:38px;height:38px;border-radius:8px;background:${c.bg};color:${c.color};display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;">${c.icon}</div>
    <div style="flex:1;min-width:0;">
      <div style="font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${o.items_summary}</div>
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
  document.getElementById("mp-overlay").style.display = "flex";
  const user = currentUser;

  document.querySelectorAll(".mp-tab").forEach((t) => {
    const is = t.dataset.tab === "overview";
    t.style.color        = is ? "#ff7a00" : "#6b7280";
    t.style.borderBottom = is ? "2px solid #ff7a00" : "2px solid transparent";
    t.style.fontWeight   = is ? "600" : "400";
  });
  ["overview", "history", "pending", "account"].forEach((id) => {
    document.getElementById("mp-tab-" + id).style.display = id === "overview" ? "block" : "none";
  });

  document.getElementById("mp-avatar").textContent     = (user.name || user.email || "U").charAt(0).toUpperCase();
  document.getElementById("mp-disp-name").textContent  = user.name  || "—";
  document.getElementById("mp-disp-email").textContent = user.email || "—";
  document.getElementById("mp-acc-name").textContent   = user.name  || "—";
  document.getElementById("mp-acc-email").textContent  = user.email || "—";

  if (sb && currentUser.id) {
    try {
      const { data: prof } = await sb.from("profiles").select("created_at").eq("id", currentUser.id).single();
      document.getElementById("mp-acc-since").textContent = prof?.created_at
        ? new Date(prof.created_at).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })
        : "—";
    } catch (e) {
      document.getElementById("mp-acc-since").textContent = "—";
    }
  } else {
    document.getElementById("mp-acc-since").textContent = "—";
  }

  let orders = [];
  if (sb && currentUser.id) {
    try {
      const { data, error } = await sb.from("orders").select("*").eq("user_id", currentUser.id).order("created_at", { ascending: false });
      if (!error && data) orders = data;
    } catch (e) { console.warn("Orders load failed", e); }
  }

  const successOrders   = orders.filter((o) => o.status === "success");
  const pendingOrders   = orders.filter((o) => o.status === "pending");
  const cancelledOrders = orders.filter((o) => o.status === "cancelled");

  document.getElementById("mp-stat-total").textContent   = orders.length;
  document.getElementById("mp-stat-success").textContent = successOrders.length;
  document.getElementById("mp-stat-pending").textContent = pendingOrders.length;

  const emptyMsg = (t) => `<div style="text-align:center;padding:1.5rem 0;font-size:12px;color:#9ca3af;">${t}</div>`;

  document.getElementById("mp-recent-list").innerHTML  = orders.length
    ? orders.slice(0, 5).map(mpOrderCard).join("")
    : emptyMsg("No orders yet. Start shopping! 🛍️");
  document.getElementById("mp-history-list").innerHTML = successOrders.length
    ? successOrders.map(mpOrderCard).join("")
    : emptyMsg("No completed orders yet");
  document.getElementById("mp-pending-list").innerHTML = [...pendingOrders, ...cancelledOrders].length
    ? [...pendingOrders, ...cancelledOrders].map(mpOrderCard).join("")
    : emptyMsg("No pending orders 🎉");
}

document.getElementById("mp-close-btn").addEventListener("click", () => {
  document.getElementById("mp-overlay").style.display = "none";
});
document.getElementById("mp-overlay").addEventListener("click", (e) => {
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
      document.getElementById("mp-tab-" + id).style.display = id === tab.dataset.tab ? "block" : "none";
    });
  });
});

// ── KICK OFF ──────────────────────────────────────────────
loadProductsFromSupabase();