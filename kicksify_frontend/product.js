document.addEventListener("DOMContentLoaded", async function () {
  // -------------------------------
  // 1) Termékadatok betöltése
  // -------------------------------
  const urlParams = new URLSearchParams(window.location.search);
  const cipoId = urlParams.get("id");
  if (!cipoId) {
    alert("Hiba: Nem található termék az azonosító alapján.");
    return;
  }
  try {
    const resCipo = await fetch(`/api/cipok/${cipoId}`);
    const dataCipo = await resCipo.json();
    if (dataCipo.error) {
      console.error("Hiba:", dataCipo.error);
      return;
    }
    // Képgaléria beállítása
    const mainImage = document.getElementById("main-image");
    const gallery = document.getElementById("image-gallery");
    mainImage.src = "no-image.png";
    gallery.innerHTML = "";
    if (dataCipo.kep) {
      const images = dataCipo.kep.split(",");
      mainImage.src = `/cipok/${images[0].trim()}`;
      images.forEach(img => {
        const imgElem = document.createElement("img");
        imgElem.src = `/cipok/${img.trim()}`;
        imgElem.className = "small";
        imgElem.addEventListener("click", () => {
          mainImage.src = imgElem.src;
        });
        gallery.appendChild(imgElem);
      });
    }
    // Termék adatok beállítása
    document.getElementById("product-brand").textContent = dataCipo.marka;
    document.getElementById("product-name").textContent = dataCipo.modell;
    document.getElementById("product-price").textContent =
      Number(dataCipo.ar).toLocaleString("hu-HU") + " Ft";
    // A leírást az accordion belsejébe tesszük:
    document.getElementById("product-description").textContent = dataCipo.leiras || "";
    
    // -------------------------------
    // 2) Méretek betöltése
    // -------------------------------
    const resSizes = await fetch(`/api/cipok/${cipoId}/meretek`);
    const sizesData = await resSizes.json();
    const sizeContainer = document.getElementById("size-options");
    sizeContainer.innerHTML = "";
    sizesData.forEach(sizeObj => {
      const sizeBtn = document.createElement("button");
      sizeBtn.className = "size-option";
      sizeBtn.textContent = sizeObj.meret;
      sizeBtn.addEventListener("click", () => {
        document.querySelectorAll(".size-option").forEach(btn => btn.classList.remove("active"));
        sizeBtn.classList.add("active");
        document.getElementById("selected-size").textContent = sizeObj.meret;
      });
      sizeContainer.appendChild(sizeBtn);
    });
    
    // -------------------------------
    // 3) Ár történelem betöltése
    // -------------------------------
    loadPriceHistory(cipoId);
  } catch (err) {
    console.error("Hiba a termékadatok betöltésekor:", err);
  }
  
  // -------------------------------
  // 4) Kosárba rakás esemény
  // -------------------------------
  document.getElementById("addToCartBtn").addEventListener("click", function() {
    const productName = document.getElementById("product-name").textContent;
    const selectedSize = document.getElementById("selected-size").textContent;
    const quantity = parseInt(document.getElementById("quantity").value, 10);
    const priceText = document.getElementById("product-price").textContent;
    const price = parseInt(priceText.replace(/\D/g, ""), 10);
    const imageUrl = document.getElementById("main-image").src;
    
    // Itt a termék id a normál cipo_id, típus "product"
    addToCart(cipoId, productName, selectedSize, quantity, price, imageUrl, "product");
  });
  
  // -------------------------------
  // 5) Bal oldali panel kezelése
  // -------------------------------
  const openLeftPanelBtn = document.getElementById("openLeftPanel");
  const leftPanel = document.getElementById("leftPanel");
  const closeLeftPanelBtn = document.getElementById("closeLeftPanel");
  openLeftPanelBtn.addEventListener("click", () => {
    leftPanel.classList.add("active");
  });
  closeLeftPanelBtn.addEventListener("click", () => {
    leftPanel.classList.remove("active");
  });
  
  // -------------------------------
  // 6) Keresőpanel kezelése
  // -------------------------------
  const openSearchBtn = document.getElementById("openSearch");
  const sideSearch = document.getElementById("sideSearch");
  const closeSideSearch = document.getElementById("closeSideSearch");
  const searchOverlay = document.getElementById("searchOverlay");
  openSearchBtn.addEventListener("click", () => {
    sideSearch.classList.add("active");
    searchOverlay.classList.add("active");
  });
  closeSideSearch.addEventListener("click", () => {
    sideSearch.classList.remove("active");
    searchOverlay.classList.remove("active");
  });
  searchOverlay.addEventListener("click", () => {
    sideSearch.classList.remove("active");
    searchOverlay.classList.remove("active");
  });
  
  // <-- Új keresési funkció: keyup esemény a kereső inputon -->
  const searchInput = document.getElementById("sideSearchInput");
  const searchResults = document.getElementById("sideSearchResults");
  searchInput.addEventListener("keyup", async () => {
    const query = searchInput.value.trim();
    searchResults.innerHTML = "";
    if (!query) return;
    try {
      const res = await fetch(`/api/cipok/search?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (!data.length) {
        searchResults.innerHTML = "<p>Nincs találat.</p>";
        return;
      }
      data.forEach(item => {
        const div = document.createElement("div");
        div.className = "search-result-item";
        div.style.display = "flex";
        div.style.alignItems = "center";
        div.style.marginBottom = "10px";
        div.style.cursor = "pointer";
        const img = document.createElement("img");
        img.style.width = "50px";
        img.style.height = "50px";
        img.style.objectFit = "cover";
        img.style.marginRight = "10px";
        if (item.kep) {
          const kepek = item.kep.split(",");
          img.src = `/cipok/${kepek[0].trim()}`;
        } else {
          img.src = "no-image.png";
        }
        const textDiv = document.createElement("div");
        const nameH6 = document.createElement("h6");
        nameH6.textContent = `${item.marka} ${item.modell}`;
        textDiv.appendChild(nameH6);
        div.appendChild(img);
        div.appendChild(textDiv);
        div.addEventListener("click", () => {
          window.location.href = `product.html?id=${item.cipo_id}`;
        });
        searchResults.appendChild(div);
      });
    } catch (err) {
      console.error("Keresési hiba:", err);
      searchResults.innerHTML = "<p>Hiba történt a keresés során.</p>";
    }
  });
  
  // -------------------------------
  // 7) Kosár modal kezelése
  // -------------------------------
  const openCartBtn = document.getElementById("openCart");
  const cartModal = document.getElementById("cartModal");
  const cartCloseBtn = document.querySelector(".cart-close-btn");
  const clearCartBtn = document.getElementById("clear-cart");
  
  openCartBtn.addEventListener("click", () => {
    cartModal.classList.add("active");
    displayCart();
  });
  cartCloseBtn.addEventListener("click", () => {
    cartModal.classList.remove("active");
  });
  clearCartBtn.addEventListener("click", () => {
    localStorage.removeItem("cart");
    displayCart();
    alert("A kosár kiürült.");
  });
  
  // -------------------------------
  // 8) Bejelentkezés, regisztráció, profil kezelése
  // -------------------------------
  const openAuthModalBtn = document.getElementById("openAuthModal");
  const authModalEl = document.getElementById("authModal");
  const authModal = new bootstrap.Modal(authModalEl);
  
  openAuthModalBtn.addEventListener("click", () => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      document.getElementById("profileSection").style.display = "block";
      document.getElementById("loginSection").style.display = "none";
      document.getElementById("registerSection").style.display = "none";
      document.getElementById("editProfileSection").style.display = "none";
      document.getElementById("authModalLabel").textContent = "Profil";
      document.getElementById("profileUsername").textContent = user.felhasznalonev;
    } else {
      document.getElementById("loginSection").style.display = "block";
      document.getElementById("registerSection").style.display = "none";
      document.getElementById("profileSection").style.display = "none";
      document.getElementById("editProfileSection").style.display = "none";
      document.getElementById("authModalLabel").textContent = "Bejelentkezés";
    }
    authModal.show();
  });
  
  // Login form
  const loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    fetch("http://localhost:5000/api/felhasznalok/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, jelszo_hash: password })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        localStorage.setItem("loggedInUser", JSON.stringify(data.user));
        authModal.hide();
        alert("Sikeres bejelentkezés!");
      } else {
        alert("Hibás email vagy jelszó!");
      }
    })
    .catch(err => {
      console.error("Bejelentkezési hiba:", err);
      alert("Hiba történt a bejelentkezéskor.");
    });
  });
  
  // Register form
  const registerForm = document.getElementById("registerForm");
  registerForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const vezeteknev = document.getElementById("registerLastName").value;
    const keresztnev = document.getElementById("registerFirstName").value;
    const felhasznalonev = document.getElementById("registerUsername").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    fetch("http://localhost:5000/api/felhasznalok", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vezeteknev, keresztnev, felhasznalonev, email, jelszo_hash: password })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("Sikeres regisztráció! Most már bejelentkezhetsz.");
        document.getElementById("registerSection").style.display = "none";
        document.getElementById("loginSection").style.display = "block";
        document.getElementById("authModalLabel").textContent = "Bejelentkezés";
      } else {
        alert("Hiba történt a regisztrációkor: " + data.error);
      }
    })
    .catch(err => {
      console.error("Regisztrációs hiba:", err);
      alert("Hiba történt a regisztrációkor.");
    });
  });
  
  // Profile edit: megjelenítés
  const editProfileButton = document.getElementById("editProfileButton");
  if (editProfileButton) {
    editProfileButton.addEventListener("click", () => {
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      document.getElementById("editVezeteknev").value = user.vezeteknev;
      document.getElementById("editKeresztnev").value = user.keresztnev;
      document.getElementById("editFelhasznalonev").value = user.felhasznalonev;
      document.getElementById("editEmail").value = user.email;
      document.getElementById("profileSection").style.display = "none";
      document.getElementById("editProfileSection").style.display = "block";
      document.getElementById("authModalLabel").textContent = "Profil szerkesztése";
    });
  }
  const editProfileForm = document.getElementById("editProfileForm");
  editProfileForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const userId = user.felhasznalonev ? user.felhasznalo_id : null;
    const vezeteknev = document.getElementById("editVezeteknev").value;
    const keresztnev = document.getElementById("editKeresztnev").value;
    const felhasznalonev = document.getElementById("editFelhasznalonev").value;
    const email = document.getElementById("editEmail").value;
    fetch(`http://localhost:5000/api/felhasznalok/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vezeteknev, keresztnev, felhasznalonev, email })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("Profil frissítve!");
        user.vezeteknev = vezeteknev;
        user.keresztnev = keresztnev;
        user.felhasznalonev = felhasznalonev;
        user.email = email;
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        document.getElementById("editProfileSection").style.display = "none";
        document.getElementById("profileSection").style.display = "block";
        document.getElementById("authModalLabel").textContent = "Profil";
        document.getElementById("profileUsername").textContent = felhasznalonev;
      } else {
        alert("Profil frissítési hiba: " + data.error);
      }
    })
    .catch(err => {
      console.error("Profil frissítési hiba:", err);
      alert("Hiba történt a profil frissítésekor.");
    });
  });
  
  // Logout
  const logoutButton = document.getElementById("logoutButton");
  logoutButton.addEventListener("click", function() {
    localStorage.removeItem("loggedInUser");
    alert("Kijelentkezve!");
    document.getElementById("profileSection").style.display = "none";
    document.getElementById("loginSection").style.display = "block";
    document.getElementById("authModalLabel").textContent = "Bejelentkezés";
    const authModalInstance = bootstrap.Modal.getInstance(authModalEl);
    authModalInstance.hide();
  });
});

// -------------------------------
// Függvények
// -------------------------------

// Mennyiség frissítése
function updateQuantity(change) {
  const quantityInput = document.getElementById("quantity");
  let newVal = parseInt(quantityInput.value, 10) + change;
  if (newVal < 1) newVal = 1;
  quantityInput.value = newVal;
}

// Ár történelem betöltése
async function loadPriceHistory(cipoId) {
  try {
    const res = await fetch(`/api/cipok/${cipoId}/arvaltozas`);
    const priceData = await res.json();
    if (!priceData.length) {
      document.getElementById("price-history-container").innerHTML = "<p>Nincs elérhető ár történelem.</p>";
      return;
    }
    const labels = priceData.map(e => new Date(e.datum).toLocaleDateString("hu-HU"));
    const prices = priceData.map(e => e.ar);
    let minPrice = Math.min(...prices);
    let maxPrice = Math.max(...prices);
    if (minPrice === maxPrice) { maxPrice = minPrice + 1; }
    const ctx = document.getElementById("priceChart").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [{
          label: "Árváltozás",
          data: prices,
          borderColor: "#000",
          backgroundColor: "rgba(0,0,0,0.1)",
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false,
            min: minPrice,
            max: maxPrice
          }
        }
      }
    });
    
    // Ár történelem táblázat
    const table = document.createElement("table");
    table.className = "table table-striped mt-3";
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const dateHeader = document.createElement("th");
    dateHeader.textContent = "Dátum";
    const priceHeader = document.createElement("th");
    priceHeader.textContent = "Ár (Ft)";
    headerRow.appendChild(dateHeader);
    headerRow.appendChild(priceHeader);
    thead.appendChild(headerRow);
    table.appendChild(thead);
    const tbody = document.createElement("tbody");
    priceData.forEach(entry => {
      const row = document.createElement("tr");
      const dateCell = document.createElement("td");
      dateCell.textContent = new Date(entry.datum).toLocaleDateString("hu-HU");
      const priceCell = document.createElement("td");
      priceCell.textContent = Number(entry.ar).toLocaleString("hu-HU") + " Ft";
      row.appendChild(dateCell);
      row.appendChild(priceCell);
      tbody.appendChild(row);
    });
    table.appendChild(tbody);
    const tableContainer = document.getElementById("priceTableContainer");
    tableContainer.innerHTML = "";
    tableContainer.appendChild(table);
    
  } catch (err) {
    console.error("Hiba az ár történelem betöltésekor:", err);
  }
}

// Kosárba rakás: adatok a localStorage-ban
function addToCart(id, name, size, qty, price, imgUrl, type) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.id === id && item.size === size && item.type === type);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, name, size, qty, price, imgUrl, type });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Termék hozzáadva a kosárhoz!");
}

// Kosár tartalmának megjelenítése
function displayCart() {
  const cartItemsContainer = document.getElementById("cartItems");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItemsContainer.innerHTML = "";
  if (cart.length === 0) {
    document.getElementById("cartEmptyText").style.display = "block";
    return;
  }
  document.getElementById("cartEmptyText").style.display = "none";
  cart.forEach(item => {
    const div = document.createElement("div");
    div.innerHTML = `<strong>${item.name}</strong> - Méret: ${item.size} - Mennyiség: ${item.qty}`;
    cartItemsContainer.appendChild(div);
  });
}
