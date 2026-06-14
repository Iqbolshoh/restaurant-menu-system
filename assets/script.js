// ========== THEME TOGGLE ==========
function toggleTheme() {
  const html = document.documentElement;
  if (html.classList.contains("light")) {
    html.classList.remove("light");
    html.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    html.classList.remove("dark");
    html.classList.add("light");
    localStorage.setItem("theme", "light");
  }
}

const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.classList.remove("light", "dark");
document.documentElement.classList.add(savedTheme);

document
  .getElementById("themeToggleBtn")
  .addEventListener("click", toggleTheme);

// ========== MOBILE MENU ==========
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const mobileMenuIcon = document.getElementById("mobileMenuIcon");

mobileMenuBtn.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("open");
  mobileMenuIcon.className = isOpen
    ? "fas fa-times text-xl sm:text-2xl transition-transform duration-300"
    : "fas fa-bars text-xl sm:text-2xl transition-transform duration-300";
});

// Close on overlay click
mobileMenu.addEventListener("click", (e) => {
  if (e.target === mobileMenu) {
    mobileMenu.classList.remove("open");
    mobileMenuIcon.className =
      "fas fa-bars text-xl sm:text-2xl transition-transform duration-300";
  }
});

// Close on link click
document.querySelectorAll(".mobile-nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    mobileMenuIcon.className =
      "fas fa-bars text-xl sm:text-2xl transition-transform duration-300";
  });
});

// ========== NAVBAR SCROLL ==========
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  navbar.classList.toggle("scrolled", window.scrollY > 50);

  // Active nav link
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active", "text-rose-500");
        if (link.getAttribute("href") === `#${section.id}`) {
          link.classList.add("active", "text-rose-500");
        }
      });
    }
  });
});

// ========== MENU DATA ==========
const menuItems = [
  {
    id: 1,
    name: "Osh",
    description: "An'anaviy o'zbek oshi, qo'y go'shti va za'faron bilan",
    price: 65000,
    oldPrice: 75000,
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop&q=80",
    category: "milliy",
    rating: 4.9,
    popular: true,
    isNew: false,
  },
  {
    id: 2,
    name: "Manti",
    description: "Bug'da pishirilgan qiyma go'shtli manti, qaymoq bilan",
    price: 45000,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop&q=80",
    category: "milliy",
    rating: 4.8,
    popular: true,
    isNew: false,
  },
  {
    id: 3,
    name: "Sho'rva",
    description: "Sabzavot va qo'y go'shtidan tayyorlangan boy sho'rva",
    price: 38000,
    image:
      "https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?w=400&h=300&fit=crop&q=80",
    category: "milliy",
    rating: 4.7,
    popular: false,
    isNew: true,
  },
  {
    id: 4,
    name: "Lavash",
    description: "Go'sht, pishloq, pomidor va maxsus sousli lavash",
    price: 32000,
    oldPrice: 38000,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop&q=80",
    category: "fastfood",
    rating: 4.6,
    popular: false,
    isNew: false,
  },
  {
    id: 5,
    name: "Gamburger",
    description: "Angus mol go'shti, cheddar pishlog'i, yangi sabzavotlar",
    price: 42000,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&q=80",
    category: "fastfood",
    rating: 4.5,
    popular: false,
    isNew: true,
  },
  {
    id: 6,
    name: "Pizza",
    description: "Italyancha yupqa pizza, mozzarella va rayhon bilan",
    price: 58000,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&q=80",
    category: "fastfood",
    rating: 4.9,
    popular: true,
    isNew: false,
  },
  {
    id: 7,
    name: "Limonad",
    description: "Yangi limon, yalpiz va tabiiy asal bilan tayyorlangan",
    price: 18000,
    image:
      "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=300&fit=crop&q=80",
    category: "ichimliklar",
    rating: 4.4,
    popular: false,
    isNew: false,
  },
  {
    id: 8,
    name: "Moxito",
    description: "Yangi yalpiz, laym va soda bilan tayyorlangan moxito",
    price: 25000,
    image:
      "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=300&fit=crop&q=80",
    category: "ichimliklar",
    rating: 4.7,
    popular: true,
    isNew: false,
  },
  {
    id: 9,
    name: "Choy",
    description: "Tanlangan premium choy, asal va limon bilan",
    price: 12000,
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop&q=80",
    category: "ichimliklar",
    rating: 4.3,
    popular: false,
    isNew: false,
  },
  {
    id: 10,
    name: "Medovik",
    description: "Yumshoq bol va qaymoqli qatlamli klassik desert",
    price: 35000,
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop&q=80",
    category: "shirinliklar",
    rating: 4.8,
    popular: false,
    isNew: false,
  },
  {
    id: 11,
    name: "Chizkeyk",
    description: "Nyu-York uslubidagi qaymoqli chizkeyk, berry sousi",
    price: 42000,
    oldPrice: 48000,
    image:
      "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop&q=80",
    category: "shirinliklar",
    rating: 4.9,
    popular: true,
    isNew: false,
  },
  {
    id: 12,
    name: "Dondurma",
    description: "Italyancha gelato - vanil, shokolad va pistachio",
    price: 22000,
    image:
      "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&h=300&fit=crop&q=80",
    category: "shirinliklar",
    rating: 4.6,
    popular: false,
    isNew: true,
  },
];

let cartCount = 0;

// ========== DISPLAY MENU - COMPACT CARDS ==========
function displayMenu(items) {
  const menuGrid = document.getElementById("menuGrid");
  menuGrid.innerHTML = "";

  if (items.length === 0) {
    menuGrid.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-utensils"></i>
        <p>Bu kategoriyada hozircha taom yo'q</p>
      </div>
    `;
    return;
  }

  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "menu-card";
    card.innerHTML = `
      <div class="card-image">
        <img src="${item.image}" alt="${item.name}" loading="lazy" />
        ${item.popular ? '<div class="popular-badge"><i class="fas fa-fire"></i> Mashhur</div>' : ""}
        ${item.isNew && !item.popular ? '<div class="new-badge"><i class="fas fa-sparkles"></i> Yangi</div>' : ""}
        ${item.oldPrice ? `<div class="discount-badge">-${Math.round((1 - item.price / item.oldPrice) * 100)}%</div>` : ""}
      </div>
      <div class="card-body">
        <div class="rating-row">
          <span class="stars">${"★".repeat(Math.floor(item.rating))}${item.rating % 1 >= 0.5 ? "½" : ""}</span>
          <span class="rating-value">${item.rating}</span>
        </div>
        <h3 class="card-title" style="color: var(--text)">${item.name}</h3>
        <p class="card-desc">${item.description}</p>
        <div class="price-row">
          <span class="current-price">${item.price.toLocaleString()}</span>
          <span class="currency">so'm</span>
          ${item.oldPrice ? `<span class="old-price">${item.oldPrice.toLocaleString()}</span>` : ""}
        </div>
        <button class="add-cart-btn" onclick="addToCart('${item.name}', ${item.price})">
          <i class="fas fa-shopping-bag"></i> Savatga qo'shish
        </button>
      </div>
    `;
    menuGrid.appendChild(card);
  });
}

// ========== ADD TO CART ==========
function addToCart(name, price) {
  cartCount++;
  const badge = document.getElementById("cartBadge");
  badge.textContent = cartCount;
  badge.classList.add("scale-125");
  setTimeout(() => badge.classList.remove("scale-125"), 200);

  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toastMessage");
  toastMessage.textContent = `${name} - ${price.toLocaleString()} so'm`;
  toast.classList.remove("hidden");
  requestAnimationFrame(() => {
    toast.classList.remove("translate-x-full");
  });
  setTimeout(() => {
    toast.classList.add("translate-x-full");
    setTimeout(() => toast.classList.add("hidden"), 400);
  }, 2200);
}

// ========== FILTER CATEGORY ==========
function handleCategoryFilter(category, buttonElement) {
  const buttons = document.querySelectorAll(".category-btn");
  buttons.forEach((btn) => btn.classList.remove("active"));
  buttonElement.classList.add("active");

  const filteredItems =
    category === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === category);

  displayMenu(filteredItems);
}

// ========== INIT ==========
window.onload = function () {
  displayMenu(menuItems);
};
