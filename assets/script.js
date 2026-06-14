// Initialize core logic when the Document Object Model is completely loaded
document.addEventListener("DOMContentLoaded", () => {
  // --- Theme Configuration Logic ---
  const htmlRootElement = document.documentElement;
  const themeToggleBtnElement = document.getElementById("themeToggleBtn");
  const savedThemePreference = localStorage.getItem("theme") || "light";

  // Apply saved theme state on initial page load
  htmlRootElement.className = savedThemePreference;

  // Attach event listener for toggling light/dark theme modes
  themeToggleBtnElement.addEventListener("click", () => {
    if (htmlRootElement.classList.contains("light")) {
      htmlRootElement.classList.remove("light");
      htmlRootElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      htmlRootElement.classList.remove("dark");
      htmlRootElement.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  });

  // --- Mobile Navigation Logic ---
  const mobileNavigationBtn = document.getElementById("mobileMenuBtn");
  const mobileNavigationIcon = document.getElementById("mobileMenuIcon");
  const mobileNavigationContainer = document.getElementById("mobileMenu");
  const mobileNavigationLinks = document.querySelectorAll(".mobile-nav-link");

  // Helper function to manage mobile menu toggle state safely
  const toggleMobileMenuState = (forceClose = false) => {
    const isMenuCurrentlyOpen =
      mobileNavigationContainer.classList.contains("open");

    if (isMenuCurrentlyOpen || forceClose) {
      mobileNavigationContainer.classList.remove("open");
      mobileNavigationIcon.classList.remove("fa-times");
      mobileNavigationIcon.classList.add("fa-bars");
    } else {
      mobileNavigationContainer.classList.add("open");
      mobileNavigationIcon.classList.remove("fa-bars");
      mobileNavigationIcon.classList.add("fa-times");
    }
  };

  // Toggle mobile navigation sidebar and swap FontAwesome icon classes
  mobileNavigationBtn.addEventListener("click", () => {
    toggleMobileMenuState();
  });

  // Collapse mobile navigation when a background area click is detected
  mobileNavigationContainer.addEventListener("click", (event) => {
    if (event.target === mobileNavigationContainer) {
      toggleMobileMenuState(true);
    }
  });

  // Collapse mobile navigation automatically when a route link is selected
  mobileNavigationLinks.forEach((navigationLink) => {
    navigationLink.addEventListener("click", () => {
      toggleMobileMenuState(true);
    });
  });

  // --- Window Scroll Tracking Logic ---
  const primaryNavigationBar = document.getElementById("navbar");
  const pageSectionsElements = document.querySelectorAll("section[id]");
  const desktopNavigationLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    // Adjust navigation bar aesthetics when scrolling down
    if (window.scrollY > 50) {
      primaryNavigationBar.classList.add("scrolled");
    } else {
      primaryNavigationBar.classList.remove("scrolled");
    }

    // Apply active styling to the navigation link correlating with current scroll position
    const currentWindowScrollY = window.scrollY;

    pageSectionsElements.forEach((pageSection) => {
      const sectionTopOffsetPosition = pageSection.offsetTop - 100;
      const sectionTotalHeightValue = pageSection.offsetHeight;

      if (
        currentWindowScrollY >= sectionTopOffsetPosition &&
        currentWindowScrollY <
          sectionTopOffsetPosition + sectionTotalHeightValue
      ) {
        desktopNavigationLinks.forEach((navLinkItem) => {
          navLinkItem.classList.remove("active", "text-rose-500");
          if (navLinkItem.getAttribute("href") === `#${pageSection.id}`) {
            navLinkItem.classList.add("active", "text-rose-500");
          }
        });
      }
    });
  });

  // --- Restaurant Product Menu Logic ---
  const restaurantMenuGridContainer = document.getElementById("menuGrid");
  const categoryFilterButtonsList = document.querySelectorAll(".category-btn");
  let shoppingCartTotalItems = 0;

  // Static data defining all available restaurant dishes
  const restaurantMenuItemsCollection = [
    {
      id: 1,
      name: "Osh",
      description: "An'anaviy o'zbek oshi, qo'y go'shti va za'faron bilan",
      price: 65000,
      oldPrice: 75000,
      image:
        "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&h=400&fit=crop&q=80",
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
        "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=400&fit=crop&q=80",
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
        "https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?w=500&h=400&fit=crop&q=80",
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
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=400&fit=crop&q=80",
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
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=400&fit=crop&q=80",
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
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=400&fit=crop&q=80",
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
        "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=500&h=400&fit=crop&q=80",
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
        "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&h=400&fit=crop&q=80",
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
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&h=400&fit=crop&q=80",
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
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=400&fit=crop&q=80",
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
        "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&h=400&fit=crop&q=80",
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
        "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=500&h=400&fit=crop&q=80",
      category: "shirinliklar",
      rating: 4.6,
      popular: false,
      isNew: true,
    },
  ];

  // Core function dedicated to rendering product items directly into HTML elements
  window.renderRestaurantMenuItems = function (productsToRenderArray) {
    restaurantMenuGridContainer.innerHTML = "";

    // Render fallback visual when filtered category possesses no records
    if (productsToRenderArray.length === 0) {
      restaurantMenuGridContainer.innerHTML = `
        <div class="col-span-full text-center py-12 sm:py-20">
          <i class="fas fa-utensils text-4xl sm:text-6xl mb-4 opacity-20"></i>
          <p class="text-base sm:text-xl" style="color: var(--text-secondary)">Bu kategoriyada hozircha taom yo'q</p>
        </div>
      `;
      return;
    }

    // Generate structured DOM components for every existing item in the array
    productsToRenderArray.forEach((menuProduct) => {
      const productCardHtmlElement = document.createElement("div");
      productCardHtmlElement.className =
        "menu-card flex flex-col h-full justify-between";

      const calculatedDiscountValue = menuProduct.oldPrice
        ? Math.round((1 - menuProduct.price / menuProduct.oldPrice) * 100)
        : 0;

      const fullStarCharacterRender = "★".repeat(
        Math.floor(menuProduct.rating),
      );
      const halfStarCharacterRender = menuProduct.rating % 1 >= 0.5 ? "½" : "";
      const finalStarRatingOutput = `${fullStarCharacterRender}${halfStarCharacterRender}`;

      productCardHtmlElement.innerHTML = `
        <div class="card-image relative h-48 sm:h-56 lg:h-64 overflow-hidden">
          <img src="${menuProduct.image}" alt="${menuProduct.name}" class="w-full h-full object-cover">
          ${menuProduct.popular ? `<div class="popular-badge absolute top-3 right-3 sm:top-4 sm:right-4 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold flex items-center space-x-1 sm:space-x-1.5"><i class="fas fa-fire"></i><span>Mashhur</span></div>` : ""}
          ${menuProduct.isNew ? `<div class="new-badge absolute top-3 right-3 sm:top-4 sm:right-4 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold flex items-center space-x-1 sm:space-x-1.5"><i class="fas fa-sparkles"></i><span>Yangi</span></div>` : ""}
          ${menuProduct.oldPrice ? `<div class="discount-badge absolute top-3 left-3 sm:top-4 sm:left-4 text-white px-2 sm:px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold">-${calculatedDiscountValue}%</div>` : ""}
        </div>
        <div class="p-4 sm:p-6 flex flex-col h-full">
          <div class="mb-auto">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-lg sm:text-xl font-bold font-playfair" style="color: var(--text)">${menuProduct.name}</h3>
              <div class="flex items-center space-x-1">
                <span class="stars text-xs sm:text-sm">${finalStarRatingOutput}</span>
                <span class="text-xs sm:text-sm font-bold text-yellow-500">${menuProduct.rating}</span>
              </div>
            </div>
            <p class="text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed" style="color: var(--text-secondary)">${menuProduct.description}</p>
          </div>
          <div class="mt-4">
            <div class="flex items-center justify-between mb-3 sm:mb-4">
              <div class="flex items-baseline space-x-2">
                <span class="text-xl sm:text-2xl font-bold text-rose-500">${menuProduct.price.toLocaleString()}</span>
                <span class="text-xs sm:text-sm" style="color: var(--text-secondary)">so'm</span>
                ${menuProduct.oldPrice ? `<span class="text-xs sm:text-sm line-through" style="color: var(--text-secondary)">${menuProduct.oldPrice.toLocaleString()}</span>` : ""}
              </div>
            </div>
            <button onclick="handleAddToCartEvent('${menuProduct.name.replace(/'/g, "\\'")}', ${menuProduct.price})" class="add-cart-btn text-white text-sm sm:text-base flex items-center justify-center space-x-2">
              <i class="fas fa-shopping-bag"></i>
              <span>Savatga qo'shish</span>
            </button>
          </div>
        </div>
      `;
      restaurantMenuGridContainer.appendChild(productCardHtmlElement);
    });
  };

  // Function exposed to window specifically handling the logic for item filtering
  window.handleCategoryFilter = function (
    targetCategoryReference,
    activatedButtonDomElement,
  ) {
    // Reset styling for all menu filter buttons
    categoryFilterButtonsList.forEach((navigationBtn) =>
      navigationBtn.classList.remove("active"),
    );
    // Assign active CSS styling properties to clicked button
    activatedButtonDomElement.classList.add("active");

    let dynamicallyFilteredProducts;
    if (targetCategoryReference === "all") {
      dynamicallyFilteredProducts = restaurantMenuItemsCollection;
    } else {
      dynamicallyFilteredProducts = restaurantMenuItemsCollection.filter(
        (specificItem) => specificItem.category === targetCategoryReference,
      );
    }

    renderRestaurantMenuItems(dynamicallyFilteredProducts);
  };

  // Function exposed to window designed to process cart modifications
  window.handleAddToCartEvent = function (
    selectedItemNameValue,
    selectedItemPriceValue,
  ) {
    shoppingCartTotalItems++;

    // Manipulate UI elements displaying cart item quantities
    const applicationCartBadgeElement = document.getElementById("cartBadge");
    applicationCartBadgeElement.textContent = shoppingCartTotalItems;
    applicationCartBadgeElement.classList.add("scale-125");
    setTimeout(
      () => applicationCartBadgeElement.classList.remove("scale-125"),
      200,
    );

    // Configure toast notification textual elements and visual state
    const uiToastNotificationWrapper = document.getElementById("toast");
    const uiToastNotificationMessage = document.getElementById("toastMessage");

    uiToastNotificationMessage.textContent = `${selectedItemNameValue} - ${selectedItemPriceValue.toLocaleString()} so'm`;
    uiToastNotificationWrapper.classList.remove("hidden");

    // Initialize DOM animation state transition delays
    setTimeout(
      () => uiToastNotificationWrapper.classList.remove("translate-x-full"),
      100,
    );

    setTimeout(() => {
      uiToastNotificationWrapper.classList.add("translate-x-full");
      setTimeout(() => uiToastNotificationWrapper.classList.add("hidden"), 500);
    }, 2500);
  };

  // Trigger foundational rendering routine upon initial script parsing completion
  renderRestaurantMenuItems(restaurantMenuItemsCollection);
});
