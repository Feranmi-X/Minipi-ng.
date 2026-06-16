emailjs.init("iPxqCrlDaf1OsTw3J");

// ── SUPABASE ──────────────────────────────────────────────
const SB_URL = "https://sygdrjmjjxwxuczcnxjr.supabase.co";
const SB_KEY = "sb_publishable_lAqlBUViE_Jcq7PbVALyLg_b-X9YQvO";
let sb = null;
try {
  if (window.supabase && typeof window.supabase.createClient === "function") {
    sb = window.supabase.createClient(SB_URL, SB_KEY);
  }
} catch (e) {
  console.warn("Supabase init failed", e);
}

// ── DARK MODE ─────────────────────────────────────────────
const html = document.documentElement;
const themeBtn = document.getElementById("themeBtn");
const iconSun = document.getElementById("iconSun");
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

const savedTheme = localStorage.getItem("gTheme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(savedTheme ? savedTheme === "dark" : prefersDark);

themeBtn.addEventListener("click", () => {
  const isDark = html.classList.contains("dark");
  applyTheme(!isDark);
  localStorage.setItem("gTheme", !isDark ? "dark" : "light");
});

// ── MOBILE MENU ───────────────────────────────────────────
 const hamburger = document.getElementById("hamburger");
      const mobileMenu = document.getElementById("mobileMenu");
      hamburger.addEventListener("click", (e) => {
        e.stopPropagation();
        mobileMenu.classList.toggle("hidden");
      });
      document.addEventListener("click", (e) => {
        if (!mobileMenu.contains(e.target) && e.target !== hamburger)
          mobileMenu.classList.add("hidden");
      });

      // ── CATEGORIES DROPDOWN (desktop) ─────────────────────────────
      (function () {
        const btn = document.getElementById("catNavBtn");
        const dd = document.getElementById("catNavDropdown");
        const chv = document.getElementById("catNavChevron");
        const li = document.getElementById("catNavItem");
        if (!btn || !dd) return;
        function openDd() {
          dd.classList.remove(
            "opacity-0",
            "pointer-events-none",
            "-translate-y-1.5",
          );
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
        document.addEventListener("click", (e) => {
          if (!li.contains(e.target)) closeDd();
        });
        document.querySelectorAll(".dd-cat-link").forEach((b) => {
          b.addEventListener("click", () => {
            setFilter(b.dataset.cat);
            closeDd();
            mobileMenu.classList.add("hidden");
          });
        });
        document.querySelectorAll(".mob-cat-btn").forEach((b) => {
          b.addEventListener("click", () => {
            setFilter(b.dataset.cat);
            mobileMenu.classList.add("hidden");
          });
        });
      })();

// ── PRODUCTS DATA ─────────────────────────────────────────
const products = [
  // ===== PHONES =====
  { id: 1, name: "iPhone 15 Pro Max", cat: "phone", price: 1845000, img: "https://images.unsplash.com/photo-1696446702183-cbd13d3c1e0e?auto=format&fit=crop&w=400&q=80", desc: "A17 Pro chip, titanium design, 256GB storage, 48MP camera." },
  { id: 2, name: "iPhone 15 Pro", cat: "phone", price: 1650000, img: "https://images.unsplash.com/photo-1592286927505-1def25115481?auto=format&fit=crop&w=400&q=80", desc: "Pro camera system with Dynamic Island, 128GB storage." },
  { id: 3, name: "Samsung Galaxy S24 Ultra", cat: "phone", price: 1720000, img: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=400&q=80", desc: "200MP camera, built-in S Pen, 256GB storage." },
  { id: 4, name: "Google Pixel 9 Pro", cat: "phone", price: 1380000, img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=400&q=80", desc: "AI-powered camera, clean Android, 7 years of updates." },
  { id: 5, name: "Samsung Galaxy S23", cat: "phone", price: 980000, img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80", desc: "Snapdragon 8 Gen 2, 50MP camera, 128GB." },
  { id: 6, name: "iPhone 14", cat: "phone", price: 1050000, img: "https://images.unsplash.com/photo-1574170609519-3e82a8fa1aad?auto=format&fit=crop&w=400&q=80", desc: "A15 Bionic chip, dual camera, 128GB storage." },
  { id: 25, name: "iPhone 15", cat: "phone", price: 1180000, img: "https://images.unsplash.com/photo-1697284960823-2a5e5e1bb524?auto=format&fit=crop&w=400&q=80", desc: "A16 Bionic chip, Dynamic Island, 48MP main camera, 128GB." },
  { id: 26, name: "Samsung Galaxy A55", cat: "phone", price: 520000, img: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=400&q=80", desc: "Exynos 1480, 50MP OIS camera, 256GB, 5000mAh battery." },
  { id: 27, name: "Xiaomi 14 Pro", cat: "phone", price: 980000, img: "https://images.unsplash.com/photo-1598965402089-897ce52e8355?auto=format&fit=crop&w=400&q=80", desc: "Snapdragon 8 Gen 3, Leica optics, 120W fast charging." },
  { id: 28, name: "OnePlus 12", cat: "phone", price: 890000, img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=400&q=80", desc: "Snapdragon 8 Gen 3, 50MP Hasselblad camera, 256GB." },
  { id: 29, name: "Tecno Phantom V Fold", cat: "phone", price: 1290000, img: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=400&q=80", desc: "Foldable AMOLED display, 50MP triple camera, 256GB." },
  { id: 30, name: "Infinix Zero 30", cat: "phone", price: 380000, img: "https://images.unsplash.com/photo-1574170609519-3e82a8fa1aad?auto=format&fit=crop&w=400&q=80", desc: "Curved AMOLED display, 108MP OIS camera, 256GB." },

  // ===== TABLETS =====
  { id: 7, name: "iPad Pro M4 11-inch", cat: "tablet", price: 1450000, img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=80", desc: "M4 chip, Liquid Retina XDR display, 256GB Wi-Fi." },
  { id: 8, name: "Samsung Galaxy Tab S9", cat: "tablet", price: 980000, img: "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=400&q=80", desc: "AMOLED display, S Pen included, 128GB storage." },
  { id: 9, name: "iPad Air 11-inch M2", cat: "tablet", price: 850000, img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=80", desc: "M2 chip, all-day battery, 128GB Wi-Fi, Touch ID." },
  { id: 10, name: "Lenovo Tab P12", cat: "tablet", price: 540000, img: "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?auto=format&fit=crop&w=400&q=80", desc: "12.7-inch display, LTPS, perfect for entertainment." },
  { id: 11, name: "Microsoft Surface Pro 9", cat: "tablet", price: 1250000, img: "https://images.unsplash.com/photo-1593642533144-3d62aa4783ec?auto=format&fit=crop&w=400&q=80", desc: "Intel Core i5, 8GB RAM, 2-in-1 Windows tablet." },
  { id: 12, name: "Xiaomi Pad 6 Pro", cat: "tablet", price: 620000, img: "https://images.unsplash.com/photo-1587033411391-5d9e51cce126?auto=format&fit=crop&w=400&q=80", desc: "Snapdragon 8+, 144Hz display, 256GB storage." },
  { id: 31, name: "iPad Mini 7", cat: "tablet", price: 720000, img: "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=400&q=80", desc: "A17 Pro chip, 8.3-inch Liquid Retina display, 128GB." },
  { id: 32, name: "Samsung Galaxy Tab A9+", cat: "tablet", price: 290000, img: "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?auto=format&fit=crop&w=400&q=80", desc: "11-inch display, quad speakers, 64GB storage, budget pick." },
  { id: 33, name: "Huawei MatePad 11.5", cat: "tablet", price: 480000, img: "https://images.unsplash.com/photo-1593642533144-3d62aa4783ec?auto=format&fit=crop&w=400&q=80", desc: "144Hz PaperMatte display, Snapdragon chipset, 128GB." },
  { id: 34, name: "Amazon Fire Max 11", cat: "tablet", price: 240000, img: "https://images.unsplash.com/photo-1587033411391-5d9e51cce126?auto=format&fit=crop&w=400&q=80", desc: "11-inch display, octa-core processor, 64GB, great for media." },

  // ===== LAPTOPS =====
  { id: 13, name: 'MacBook Pro 14" M4', cat: "laptop", price: 3450000, img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80", desc: "M4 chip, 16GB RAM, 512GB SSD, Liquid Retina XDR." },
  { id: 14, name: "Dell XPS 13", cat: "laptop", price: 1980000, img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=400&q=80", desc: "Intel Core Ultra 7, 16GB RAM, 512GB SSD, OLED display." },
  { id: 15, name: "HP Spectre x360", cat: "laptop", price: 2150000, img: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=400&q=80", desc: "2-in-1 convertible, OLED touchscreen, 1TB SSD." },
  { id: 16, name: "ASUS ROG Zephyrus G14", cat: "laptop", price: 2890000, img: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=400&q=80", desc: "RTX 4060, Ryzen 9, 16GB RAM, 165Hz display." },
  { id: 17, name: "MacBook Air M2 15-inch", cat: "laptop", price: 2250000, img: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=400&q=80", desc: "M2 chip, 8GB RAM, 256GB SSD, fanless design." },
  { id: 18, name: "Lenovo ThinkPad X1 Carbon", cat: "laptop", price: 2400000, img: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=400&q=80", desc: "Intel Core i7, 16GB RAM, 512GB SSD, business-grade." },
  { id: 35, name: "MacBook Air M3 13-inch", cat: "laptop", price: 1980000, img: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=400&q=80", desc: "M3 chip, 8GB RAM, 256GB SSD, all-day battery life." },
  { id: 36, name: "Acer Swift Go 14", cat: "laptop", price: 1150000, img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=400&q=80", desc: "Intel Core i5, 16GB RAM, 512GB SSD, OLED display." },
  { id: 37, name: "Microsoft Surface Laptop 6", cat: "laptop", price: 2050000, img: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=400&q=80", desc: "Intel Core Ultra 5, 16GB RAM, touchscreen, 512GB SSD." },
  { id: 38, name: "ASUS VivoBook 16", cat: "laptop", price: 850000, img: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=400&q=80", desc: "AMD Ryzen 5, 8GB RAM, 512GB SSD, 16-inch FHD+ display." },
  { id: 39, name: "Lenovo Legion Pro 5", cat: "laptop", price: 3150000, img: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=400&q=80", desc: "RTX 4070, Ryzen 7, 32GB RAM, 240Hz display." },

  // ===== GAMING =====
  { id: 19, name: "PlayStation 5 Slim", cat: "gaming", price: 720000, img: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&w=400&q=80", desc: "1TB SSD, 4K gaming, ultra-high-speed console." },
  { id: 20, name: "Xbox Series X", cat: "gaming", price: 695000, img: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=400&q=80", desc: "4K gaming, 1TB SSD, Game Pass compatible." },
  { id: 21, name: "Nintendo Switch OLED", cat: "gaming", price: 410000, img: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=400&q=80", desc: "7-inch OLED screen, enhanced audio, 64GB storage." },
  { id: 22, name: "Logitech G Pro Wireless", cat: "gaming", price: 95000, img: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=400&q=80", desc: "Ultra-lightweight wireless gaming mouse, HERO sensor." },
  { id: 23, name: "Razer BlackShark V2 Pro", cat: "gaming", price: 185000, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80", desc: "Wireless gaming headset, THX spatial audio, 70hr battery." },
  { id: 24, name: "PS5 DualSense Controller", cat: "gaming", price: 85000, img: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=400&q=80", desc: "Haptic feedback, adaptive triggers, built-in mic." },
  { id: 40, name: "Xbox Series S", cat: "gaming", price: 420000, img: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=400&q=80", desc: "All-digital 1440p gaming console, 512GB SSD." },
  { id: 41, name: "Steam Deck OLED", cat: "gaming", price: 850000, img: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&w=400&q=80", desc: "7.4-inch HDR OLED, 1TB SSD, handheld PC gaming." },
  { id: 42, name: "Corsair K70 RGB Keyboard", cat: "gaming", price: 165000, img: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=400&q=80", desc: "Mechanical RGB keyboard, PBT keycaps, hyper-polling." },
  { id: 43, name: "Meta Quest 3", cat: "gaming", price: 980000, img: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=400&q=80", desc: "Mixed reality VR headset, 128GB storage, Snapdragon XR2." },
  { id: 44, name: "SteelSeries Arctis Nova Pro", cat: "gaming", price: 295000, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80", desc: "Active noise cancelling wireless gaming headset." },
];

const fmt = (n) => "₦" + n.toLocaleString("en-NG");
let activeCat = "all";
let searchTerm = "";

function renderProducts() {
  const grid = document.getElementById("productGrid");
  const list = products.filter((p) => {
    const okCat = activeCat === "all" || p.cat === activeCat;
    const q = searchTerm.toLowerCase();
    const okQ =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.cat.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q);
    return okCat && okQ;
  });

  if (!list.length) {
    grid.innerHTML =
      '<div class="col-span-full text-center py-16 px-5 text-gray-500 dark:text-gray-400 text-sm">No products found. Try a different search or category.</div>';
    return;
  }

  grid.innerHTML = list
    .map(
      (p, i) => `
    <div class="product-card bg-white dark:bg-neutral-900 border-[1.5px] border-gray-200 dark:border-neutral-800 rounded-2xl overflow-hidden flex flex-col transition-all hover:shadow-xl hover:border-brand animate-fadeUp group" style="animation-delay:${i * 0.04}s">
      <div class="aspect-square overflow-hidden bg-gray-100 dark:bg-neutral-800">
        <img src="${p.img}" alt="${p.name}" loading="lazy" class="w-full h-full object-cover transition-transform duration-350 group-hover:scale-105">
      </div>
      <div class="p-3.5 flex-1 flex flex-col">
        <div class="text-[10px] font-semibold uppercase tracking-[0.08em] text-brand mb-1">${p.cat}</div>
        <div class="text-[13px] font-semibold mb-1 whitespace-nowrap overflow-hidden text-ellipsis" title="${p.name}">${p.name}</div>
        <div class="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed mb-2.5 line-clamp-2 flex-1">${p.desc}</div>
        <div class="text-[15px] font-bold text-brand mb-3">${fmt(p.price)}</div>
        <div class="flex gap-2">
          <button class="flex-1 px-1 py-2 rounded-full border-[1.5px] border-gray-200 dark:border-neutral-700 text-[12px] font-semibold hover:border-brand hover:text-brand transition-colors" data-id="${p.id}" data-action="details">Details</button>
          <button class="flex-1 px-1 py-2 rounded-full bg-brand text-white text-[12px] font-semibold hover:opacity-85 transition-opacity" data-id="${p.id}" data-action="cart">Add to Cart</button>
        </div>
      </div>
    </div>
  `,
    )
    .join("");
}

// Product grid delegated clicks
document.getElementById("productGrid").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;
  const id = +btn.dataset.id;
  if (btn.dataset.action === "cart") {
    addToCart(id, 1);
  } else {
    const p = products.find((x) => x.id === id);
    if (p) openProductDetail(p);
  }
});

// ── FILTERS ───────────────────────────────────────────────
const pillBase =
  "px-[18px] py-2 rounded-full border-[1.5px] text-[13px] font-medium transition-all whitespace-nowrap";
const pillInactive =
  "border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100 hover:border-brand hover:text-brand";
const pillActive = "bg-brand text-white border-brand";

const catCardBase =
  "cat-card flex flex-col items-center gap-3 bg-white dark:bg-neutral-900 border-[1.5px] rounded-2xl py-7 px-4 text-[13px] font-medium hover:border-brand hover:shadow-[0_4px_20px_rgba(255,122,0,0.12)] transition-all";

function styleFilterPills() {
  document.querySelectorAll(".filter-pill").forEach((b) => {
    const isActive = b.dataset.cat === activeCat;
    b.className = pillBase + " " + (isActive ? pillActive : pillInactive);
  });
  document.querySelectorAll(".cat-card").forEach((b) => {
    const isActive = b.dataset.cat === activeCat;
    b.className =
      catCardBase +
      " " +
      (isActive
        ? "border-brand shadow-[0_4px_20px_rgba(255,122,0,0.12)]"
        : "border-gray-200 dark:border-neutral-800");
  });
}

function setFilter(cat) {
  activeCat = cat;
  styleFilterPills();
  renderProducts();
}

document.getElementById("filterRow").addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-pill");
  if (btn) setFilter(btn.dataset.cat);
});

document.getElementById("catGrid").addEventListener("click", (e) => {
  const btn = e.target.closest(".cat-card");
  if (!btn) return;
  setFilter(btn.dataset.cat);
  document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
});

document.querySelectorAll(".footer-cat").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    setFilter(a.dataset.cat);
    document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
  });
});

// ── SEARCH ────────────────────────────────────────────────
function doSearch(val) {
  searchTerm = val.trim();
  renderProducts();
  document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
}

document.getElementById("searchDesktop").addEventListener("input", (e) => {
  searchTerm = e.target.value;
  renderProducts();
});
document.getElementById("searchDesktop").addEventListener("keydown", (e) => {
  if (e.key === "Enter") doSearch(e.target.value);
});
document.getElementById("searchBtnD").addEventListener("click", () =>
  doSearch(document.getElementById("searchDesktop").value),
);
document.getElementById("searchMobile").addEventListener("input", (e) => {
  searchTerm = e.target.value;
  renderProducts();
});
document.getElementById("searchMobile").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    doSearch(e.target.value);
    mobileMenu.classList.add("hidden");
  }
});
document.getElementById("searchBtnM").addEventListener("click", () => {
  doSearch(document.getElementById("searchMobile").value);
  mobileMenu.classList.add("hidden");
});

// ── CART ──────────────────────────────────────────────────
let cart = [];

function addToCart(id, qty) {
  const p = products.find((x) => x.id === id);
  if (!p) return;
  const ex = cart.find((i) => i.id === id);
  if (ex) ex.qty += qty;
  else cart.push({ ...p, qty });
  renderCart();
  showToast(`${p.name} added to cart`);
}

function renderCart() {
  const badge = document.getElementById("cartBadge");
  const total = document.getElementById("cartTotal");
  const items = document.getElementById("cartItems");
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const sum = cart.reduce((s, i) => s + i.price * i.qty, 0);
  badge.textContent = count;
  total.textContent = fmt(sum);

  if (!cart.length) {
    items.innerHTML = `<div class="flex flex-col items-center justify-center h-full text-gray-300 dark:text-gray-600 gap-2.5 text-center p-10">
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="opacity-40"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
      <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Your cart is empty</p>
      <span class="text-xs">Add some gadgets to get started</span>
    </div>`;
    return;
  }

  items.innerHTML = cart
    .map(
      (item) => `
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
  `,
    )
    .join("");
}

document.getElementById("cartItems").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn || !btn.dataset.id) return;
  const id = +btn.dataset.id;
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  if (btn.dataset.action === "inc") item.qty++;
  else if (btn.dataset.action === "dec") {
    item.qty--;
    if (item.qty <= 0) cart = cart.filter((i) => i.id !== id);
  } else if (btn.dataset.action === "remove")
    cart = cart.filter((i) => i.id !== id);
  renderCart();
});

// Cart open/close
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");

function openCart() {
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

// ── ADMIN EMAIL NOTIFICATION ──────────────────────────────
async function notifyAdminEmail(order) {
  try {
    await emailjs.send("service_or50hnb", "template_34c24y4", {
      order_id: order.id,
      paystack_ref: order.ref || order.id,
      customer_name: currentUser.name,
      customer_email: currentUser.email,
      items: order.items,
      total: "₦" + order.price.toLocaleString("en-NG"),
      date: order.date,
      to_email: "minipiNG5575@gmail.com",
    });
    console.log("Admin notified by email");
  } catch (e) {
    console.warn("Email notification failed", e);
  }
}

// ── CHECKOUT ──────────────────────────────────────────────
document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (!cart.length) {
    showToast("Your cart is empty");
    return;
  }
  if (!currentUser) {
    closeCart();
    showToast("Please sign in to checkout");
    setTimeout(() => showAuthModal("signIn"), 300);
    return;
  }

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const orderId = "ORD-" + Date.now();
  const orderItems = cart.map((i) => i.name).join(", ");

  closeCart();

  const handler = PaystackPop.setup({
    key: "pk_test_73bc91943a47d7b63b92e1be863495563806be50",
    email: currentUser.email,
    amount: total * 100,
    currency: "NGN",
    ref: orderId,
    metadata: {
      custom_fields: [
        { display_name: "Customer Name", variable_name: "customer_name", value: currentUser.name },
        { display_name: "Items", variable_name: "items", value: orderItems },
      ],
    },
    onClose() {
      showToast("Payment cancelled");
    },
    callback(response) {
      const order = {
        id: orderId,
        ref: response.reference,
        items: orderItems,
        price: total,
        status: "success",
        date: new Date().toISOString().slice(0, 10),
      };

      const saved = JSON.parse(localStorage.getItem("mp_orders") || "[]");
      saved.unshift(order);
      localStorage.setItem("mp_orders", JSON.stringify(saved));

      notifyAdminEmail(order);

      showToast(`Payment successful! Ref: ${response.reference} 🎉`);
      cart = [];
      renderCart();
    },
  });

  handler.openIframe();
});

// ── SCROLL ANIMATION ──────────────────────────────────────
const sections = document.querySelectorAll(".fade-section");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  },
  { threshold: 0.2 },
);
sections.forEach((section) => observer.observe(section));

// ── PRODUCT DETAIL MODAL ──────────────────────────────────
let pdCurrent = null, pdQty = 1;

function openProductDetail(p) {
  pdCurrent = p;
  pdQty = 1;
  document.getElementById("pdImg").src = p.img;
  document.getElementById("pdImg").alt = p.name;
  document.getElementById("pdCat").textContent = p.cat.toUpperCase();
  document.getElementById("pdName").textContent = p.name;
  document.getElementById("pdDesc").textContent = p.desc;
  document.getElementById("pdPrice").textContent = fmt(p.price);
  document.getElementById("pdQty").textContent = 1;
  const ov = document.getElementById("pdOverlay");
  ov.classList.remove("hidden");
  ov.classList.add("flex");
}

document.getElementById("pdClose").addEventListener("click", () => {
  const ov = document.getElementById("pdOverlay");
  ov.classList.add("hidden");
  ov.classList.remove("flex");
});
document.getElementById("pdOverlay").addEventListener("click", (e) => {
  const ov = document.getElementById("pdOverlay");
  if (e.target === ov) { ov.classList.add("hidden"); ov.classList.remove("flex"); }
});
document.getElementById("pdInc").addEventListener("click", () => {
  pdQty++;
  document.getElementById("pdQty").textContent = pdQty;
});
document.getElementById("pdDec").addEventListener("click", () => {
  if (pdQty > 1) { pdQty--; document.getElementById("pdQty").textContent = pdQty; }
});
document.getElementById("pdAddCart").addEventListener("click", () => {
  addToCart(pdCurrent.id, pdQty);
  const ov = document.getElementById("pdOverlay");
  ov.classList.add("hidden");
  ov.classList.remove("flex");
});

// ── INFO MODAL ────────────────────────────────────────────
const infoContent = {
  about: {
    title: "About Gadgets.",
    body: `<p>Gadgets is Nigeria's go-to online store for the latest phones, tablets, laptops and gaming gear.</p>
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
    document.getElementById("infoTitle").textContent = d.title;
    document.getElementById("infoBody").innerHTML = d.body;
    const ov = document.getElementById("infoOverlay");
    ov.classList.remove("hidden");
    ov.classList.add("flex");
  });
});
document.getElementById("infoClose").addEventListener("click", () => {
  const ov = document.getElementById("infoOverlay");
  ov.classList.add("hidden");
  ov.classList.remove("flex");
});
document.getElementById("infoOverlay").addEventListener("click", (e) => {
  const ov = document.getElementById("infoOverlay");
  if (e.target === ov) { ov.classList.add("hidden"); ov.classList.remove("flex"); }
});

// ── TOAST ─────────────────────────────────────────────────
let toastT = null;
function showToast(msg) {
  const t = document.getElementById("toast");
  document.getElementById("toastMsg").textContent = msg;
  t.classList.remove("opacity-0", "translate-y-20");
  t.classList.add("opacity-100", "translate-y-0");
  if (toastT) clearTimeout(toastT);
  toastT = setTimeout(() => {
    t.classList.add("opacity-0", "translate-y-20");
    t.classList.remove("opacity-100", "translate-y-0");
  }, 2500);
}

// ── AUTH STATE ────────────────────────────────────────────
let currentUser = null;

function refreshAuthUI() {
  const authDd = document.getElementById("authDropdown");
  const userDd = document.getElementById("userDropdown");
  if (currentUser) {
    document.getElementById("userName").textContent = currentUser.name;
    document.getElementById("userEmail").textContent = currentUser.email;
    authDd.classList.add("hidden");
    userDd.classList.add("hidden");
  }
}

// ── ACCOUNT DROPDOWN ──────────────────────────────────────
const accountBtn = document.getElementById("accountBtn");
const authDd = document.getElementById("authDropdown");
const userDd = document.getElementById("userDropdown");

accountBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if (currentUser) {
    openMpModal();
  } else {
    authDd.classList.toggle("hidden");
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
    el.classList.add("hidden");
    el.textContent = "";
  });
}

function showAlert(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg;
  el.classList.remove("hidden");
}

document.getElementById("openSignIn").addEventListener("click", () => showAuthModal("signIn"));
document.getElementById("openSignUp").addEventListener("click", () => showAuthModal("signUp"));
document.getElementById("toSignUp").addEventListener("click", () => showAuthModal("signUp"));
document.getElementById("toSignIn").addEventListener("click", () => showAuthModal("signIn"));

document.querySelectorAll(".auth-close").forEach((btn) => btn.addEventListener("click", closeAuthModal));
authOverlay.addEventListener("click", (e) => { if (e.target === authOverlay) closeAuthModal(); });

// Password visibility toggles — covers all modals including reset
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".toggle-pwd");
  if (!btn) return;
  const input = document.getElementById(btn.dataset.target);
  if (input) input.type = input.type === "password" ? "text" : "password";
});

// Password strength
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
    bar.style.background = i <= s ? colors[s - 1] : "";
    if (i > s) bar.style.removeProperty("background");
  }
  const lbl = document.getElementById("sbLabel");
  lbl.textContent = v.length ? labels[s - 1] || "" : "";
  lbl.style.color = v.length && s > 0 ? colors[s - 1] : "";
});

// Enter key support
document.getElementById("siEmail").addEventListener("keydown", (e) => { if (e.key === "Enter") document.getElementById("signInBtn").click(); });
document.getElementById("siPwd").addEventListener("keydown", (e) => { if (e.key === "Enter") document.getElementById("signInBtn").click(); });
document.getElementById("suPwd").addEventListener("keydown", (e) => { if (e.key === "Enter") document.getElementById("signUpBtn").click(); });

// Loading state helpers
function setBusy(btn, busy, loadTxt, origTxt) {
  btn.disabled = busy;
  btn.innerHTML = busy
    ? `<span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0"></span>${loadTxt}`
    : origTxt;
}

// ── SIGN UP ───────────────────────────────────────────────
document.getElementById("signUpBtn").addEventListener("click", async () => {
  clearAuthAlerts();
  const name = document.getElementById("suName").value.trim();
  const email = document.getElementById("suEmail").value.trim().toLowerCase();
  const pwd = document.getElementById("suPwd").value;
  const btn = document.getElementById("signUpBtn");

  if (!name) { showAlert("suError", "Please enter your full name."); return; }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showAlert("suError", "Please enter a valid email address."); return; }
  if (!pwd || pwd.length < 6) { showAlert("suError", "Password must be at least 6 characters."); return; }
  if (!sb) { showAlert("suError", "Authentication service unavailable. Please try again later."); return; }

  setBusy(btn, true, "Creating account…", "Create Account");
  try {
    const { data, error } = await sb.auth.signUp({
      email,
      password: pwd,
      options: { data: { full_name: name } },
    });
    if (error) throw error;
    if (data.user && !data.session) {
      showAlert("suSuccess", `Account created! Check ${email} for a confirmation link before signing in.`);
      document.getElementById("suName").value = "";
      document.getElementById("suEmail").value = "";
      document.getElementById("suPwd").value = "";
    } else if (data.session) {
      currentUser = { name, email: data.user.email };
      refreshAuthUI();
      closeAuthModal();
      showToast(`Welcome, ${name}! 🎉`);
    }
  } catch (err) {
    let msg = err.message || "Sign up failed. Please try again.";
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
  const pwd = document.getElementById("siPwd").value;
  const btn = document.getElementById("signInBtn");

  if (!email) { showAlert("siError", "Please enter your email address."); return; }
  if (!pwd) { showAlert("siError", "Please enter your password."); return; }
  if (!sb) { showAlert("siError", "Authentication service unavailable."); return; }

  setBusy(btn, true, "Signing in…", "Sign In");
  try {
    const { data, error } = await sb.auth.signInWithPassword({ email, password: pwd });
    if (error) throw error;
    const name = data.user.user_metadata?.full_name || data.user.email.split("@")[0];
    currentUser = { name, email: data.user.email };
    refreshAuthUI();
    closeAuthModal();
    showToast(`Welcome back, ${name}!`);
  } catch (err) {
    let msg = err.message || "Sign in failed.";
    if (/Invalid login/i.test(msg)) msg = "Incorrect email or password. Please try again.";
    if (/Email not confirmed/i.test(msg)) msg = "Please confirm your email first. Check your inbox.";
    showAlert("siError", msg);
  } finally {
    setBusy(btn, false, "", "Sign In");
  }
});

// ── FORGOT PASSWORD ───────────────────────────────────────
document.getElementById("forgotBtn").addEventListener("click", async () => {
  clearAuthAlerts();
  const email = document.getElementById("siEmail").value.trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showAlert("siError", 'Enter your email address first, then click "Forgot password?".'); return;
  }
  if (!sb) { showAlert("siError", "Feature unavailable right now."); return; }

  const forgotBtn = document.getElementById("forgotBtn");
  forgotBtn.textContent = "Sending…";
  forgotBtn.disabled = true;

  try {
    // Use whatever is currently in the browser address bar as the redirect
    const redirectTo = window.location.origin + window.location.pathname;
    const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo });
    if (error) throw error;
    showAlert("siSuccess", `Reset link sent to ${email}. Check your inbox and spam folder.`);
  } catch (err) {
    showAlert("siError", err.message || "Could not send reset email. Try again.");
  } finally {
    forgotBtn.textContent = "Forgot password?";
    forgotBtn.disabled = false;
  }
});

// ── ABOUT TOGGLE ──────────────────────────────────────────
  function toggleContent() {
    const content = document.getElementById("moreContent");
    const button = document.getElementById("toggleBtn");

    content.classList.toggle("hidden");

    if (content.classList.contains("hidden")) {
      button.textContent = "See More";
    } else {
      button.textContent = "See Less";
    }
  }

// ── SIGN OUT ──────────────────────────────────────────────
document.getElementById("logoutBtn").addEventListener("click", async () => {
  userDd.classList.add("hidden");
  if (sb) { try { await sb.auth.signOut(); } catch (e) {} }
  currentUser = null;
  refreshAuthUI();
  showToast("Signed out successfully");
});

// ── RESET PASSWORD MODAL ──────────────────────────────────
function openResetModal() {
  // Close any other open modals first
  closeAuthModal();
  const ov = document.getElementById("resetOverlay");
  document.getElementById("rpPwd").value = "";
  document.getElementById("rpPwdConfirm").value = "";
  document.getElementById("rpError").classList.add("hidden");
  document.getElementById("rpError").textContent = "";
  document.getElementById("rpSuccess").classList.add("hidden");
  document.getElementById("rpSuccess").textContent = "";
  document.getElementById("rpSubmitBtn").innerHTML = "Update Password";
  document.getElementById("rpSubmitBtn").disabled = false;
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

// Enter key on reset fields
document.getElementById("rpPwd").addEventListener("keydown", (e) => { if (e.key === "Enter") document.getElementById("rpSubmitBtn").click(); });
document.getElementById("rpPwdConfirm").addEventListener("keydown", (e) => { if (e.key === "Enter") document.getElementById("rpSubmitBtn").click(); });

document.getElementById("rpSubmitBtn").addEventListener("click", async () => {
  const pwd = document.getElementById("rpPwd").value;
  const confirm = document.getElementById("rpPwdConfirm").value;
  const errEl = document.getElementById("rpError");
  const okEl = document.getElementById("rpSuccess");
  const btn = document.getElementById("rpSubmitBtn");

  errEl.classList.add("hidden");
  errEl.textContent = "";
  okEl.classList.add("hidden");
  okEl.textContent = "";

  if (!pwd || pwd.length < 6) {
    errEl.textContent = "Password must be at least 6 characters.";
    errEl.classList.remove("hidden");
    return;
  }
  if (pwd !== confirm) {
    errEl.textContent = "Passwords do not match. Please try again.";
    errEl.classList.remove("hidden");
    return;
  }
  if (!sb) {
    errEl.textContent = "Authentication service unavailable.";
    errEl.classList.remove("hidden");
    return;
  }

  setBusy(btn, true, "Updating password…", "Update Password");

  try {
    const { error } = await sb.auth.updateUser({ password: pwd });
    if (error) throw error;

    okEl.textContent = "Password updated! You are now signed in.";
    okEl.classList.remove("hidden");

    setTimeout(() => {
      closeResetModal();
      showToast("Password updated successfully 🎉");
    }, 2000);
  } catch (err) {
    let msg = err.message || "Failed to update password. Please request a new reset link.";
    if (/same password/i.test(msg)) msg = "New password must be different from your old one.";
    errEl.textContent = msg;
    errEl.classList.remove("hidden");
  } finally {
    setBusy(btn, false, "", "Update Password");
  }
});

// ── SESSION RESTORE + PASSWORD RECOVERY DETECTION ────────
if (sb) {
  sb.auth.onAuthStateChange((event, session) => {
    if (event === "PASSWORD_RECOVERY") {
      // User clicked the reset link in their email — show the new password form
      openResetModal();
      return;
    }
    if (session?.user) {
      const u = session.user;
      const name = u.user_metadata?.full_name || u.email.split("@")[0];
      currentUser = { name, email: u.email };
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
        name: u.user_metadata?.full_name || u.email.split("@")[0],
        email: u.email,
      };
      refreshAuthUI();
    }
  });
}

// ── TESTIMONIALS ──────────────────────────────────────────
const testimonials = [
  { name: "Iwari", role: "Bussiness Woman", text: "I ordered an iPhone from Minipi and received it within 24 hours. The device was original, sealed, and exactly as advertised." },
  { name: "Ayofe", role: "Content Creator", text: "Minipi saved me from buying fake gadgets online. Their customer support guided me perfectly and my MacBook arrived safely." },
  { name: "charles", role: "business man", text: "The prices are amazing. I've purchased accessories, headphones, and a laptop. Every product exceeded expectations." },
  { name: "Chidi Monday", role: "Business Owner", text: "Their delivery speed shocked me. Ordered in the morning and got my smartwatch before evening." },
  { name: "Daniel Wilson", role: "Photographer", text: "Bought a camera and accessories from Minipi. Everything was genuine and packaged professionally." },
  { name: "Amanda Okon", role: "Student", text: "Best gadget store I've used. Affordable prices, secure payment, and excellent after-sales support." },
];

let currentIndex = 0;
const container = document.getElementById("testimonialContainer");

function renderTestimonials() {
  container.innerHTML = "";
  const currentSet = testimonials.slice(currentIndex, currentIndex + 3);
  currentSet.forEach((item) => {
    container.innerHTML += `
      <div class="bg-brand/60 border border-gray-800 rounded-3xl p-8 hover:border-cyan-500 transition duration-500 hover:-translate-y-2">
        <div class="flex mb-5 text-yellow-400 text-xl">★★★★★</div>
        <p class="text-black dark:text-white leading-relaxed mb-6">"${item.text}"</p>
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-lg">${item.name.charAt(0)}</div>
          <div>
            <h4 class="font-semibold text-lg">${item.name}</h4>
            <p class="text-sm text-gray-400">${item.role}</p>
          </div>
        </div>
      </div>`;
  });
  currentIndex += 3;
  if (currentIndex >= testimonials.length) currentIndex = 0;
}

renderTestimonials();
setInterval(renderTestimonials, 60000);

// ── INIT ──────────────────────────────────────────────────
styleFilterPills();

async function loadProductsFromSupabase() {
  if (!sb) { renderProducts(); return; }
  const { data, error } = await sb.from("products").select("*");
  if (!error && data && data.length) {
    products.length = 0;
    products.push(...data);
  }
  renderProducts();
}

loadProductsFromSupabase();
renderCart();

// ── CUSTOMER PROFILE MODAL ────────────────────────────────
function mpFmt(n) { return "₦" + Number(n).toLocaleString("en-NG"); }

function mpOrderCard(o) {
  const colors = {
    success: { bg: "#eaf3de", color: "#3B6D11", icon: "✓", label: "Delivered" },
    pending: { bg: "#faeeda", color: "#854F0B", icon: "⏳", label: "Pending" },
  };
  const c = colors[o.status] || colors.pending;
  return `<div style="background:#f9fafb;border-radius:10px;border:.5px solid #e5e7eb;padding:.9rem 1rem;margin-bottom:.65rem;display:flex;align-items:flex-start;gap:12px;">
    <div style="width:38px;height:38px;border-radius:8px;background:${c.bg};color:${c.color};display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;">${c.icon}</div>
    <div style="flex:1;min-width:0;">
      <div style="font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${o.items}</div>
      <div style="font-size:11px;color:#6b7280;margin-top:1px;">${o.id} · ${o.date}</div>
    </div>
    <div style="text-align:right;flex-shrink:0;">
      <div style="font-size:13px;font-weight:600;">${mpFmt(o.price)}</div>
      <span style="display:inline-block;font-size:10px;padding:2px 8px;border-radius:20px;margin-top:3px;font-weight:600;background:${c.bg};color:${c.color};">${c.label}</span>
    </div>
  </div>`;
}

function openMpModal() {
  const overlay = document.getElementById("mp-overlay");
  overlay.style.display = "flex";
  const user = currentUser || { name: "Guest", email: "" };
  const orders = JSON.parse(localStorage.getItem("mp_orders") || "[]");
  const done = orders.filter((o) => o.status === "success");
  const pending = orders.filter((o) => o.status === "pending");

  document.getElementById("mp-avatar").textContent = (user.name || "U")[0].toUpperCase();
  document.getElementById("mp-disp-name").textContent = user.name || "—";
  document.getElementById("mp-disp-email").textContent = user.email || "—";
  document.getElementById("mp-acc-name").textContent = user.name || "—";
  document.getElementById("mp-acc-email").textContent = user.email || "—";
  document.getElementById("mp-acc-since").textContent = new Date().toLocaleDateString("en-NG", { year: "numeric", month: "long" });
  document.getElementById("mp-stat-total").textContent = orders.length;
  document.getElementById("mp-stat-success").textContent = done.length;
  document.getElementById("mp-stat-pending").textContent = pending.length;

  const recent = [...orders].slice(0, 3);
  const empty = (msg) => `<div style="text-align:center;padding:2rem;color:#6b7280;font-size:13px;">${msg}</div>`;
  document.getElementById("mp-recent-list").innerHTML = recent.length ? recent.map(mpOrderCard).join("") : empty("No activity yet");
  document.getElementById("mp-history-list").innerHTML = done.length ? done.map(mpOrderCard).join("") : empty("No completed orders yet");
  document.getElementById("mp-pending-list").innerHTML = pending.length ? pending.map(mpOrderCard).join("") : empty("No pending orders");

  document.querySelectorAll(".mp-tab").forEach((t) => {
    const isFirst = t.dataset.tab === "overview";
    t.style.color = isFirst ? "#ff7a00" : "#6b7280";
    t.style.borderBottom = isFirst ? "2px solid #ff7a00" : "2px solid transparent";
    t.style.fontWeight = isFirst ? "600" : "400";
  });
  ["overview", "history", "pending", "account"].forEach((id) => {
    document.getElementById("mp-tab-" + id).style.display = id === "overview" ? "block" : "none";
  });
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
      t.style.color = "#6b7280";
      t.style.borderBottom = "2px solid transparent";
      t.style.fontWeight = "400";
    });
    tab.style.color = "#ff7a00";
    tab.style.borderBottom = "2px solid #ff7a00";
    tab.style.fontWeight = "600";
    ["overview", "history", "pending", "account"].forEach((id) => {
      document.getElementById("mp-tab-" + id).style.display = id === tab.dataset.tab ? "block" : "none";
    });
  });
});

(function () {
        const btn = document.getElementById("catNavBtn");
        const dd = document.getElementById("catNavDropdown");
        const chv = document.getElementById("catNavChevron");
        if (!btn || !dd) return;

        function openDd() {
          dd.classList.remove(
            "opacity-0",
            "pointer-events-none",
            "-translate-y-[6px]",
          );
          dd.classList.add("opacity-100", "translate-y-0");
          chv.style.transform = "rotate(180deg)";
        }
        function closeDd() {
          dd.classList.add("opacity-0", "pointer-events-none");
          dd.classList.remove("opacity-100", "translate-y-0");
          chv.style.transform = "";
        }

        // hover (desktop)
        const li = document.getElementById("catNavItem");
        li.addEventListener("mouseenter", openDd);
        li.addEventListener("mouseleave", closeDd);

        // click toggle (keyboard / touch)
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          dd.classList.contains("opacity-0") ? openDd() : closeDd();
        });

        // close on outside click
        document.addEventListener("click", (e) => {
          if (!li.contains(e.target)) closeDd();
        });

        // if on index page, category links filter in-place instead of navigating
        if (!window.location.pathname.includes("shop.html")) {
          document.querySelectorAll(".cat-nav-link").forEach((a) => {
            a.addEventListener("click", (e) => {
              e.preventDefault();
              const cat = a.dataset.cat;
              closeDd();
              // call setFilter if main.js is loaded
              if (typeof setFilter === "function") {
                setFilter(cat);
                document
                  .getElementById("shop")
                  .scrollIntoView({ behavior: "smooth" });
              }
            });
          });
        }
      })();

