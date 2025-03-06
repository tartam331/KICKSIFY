// product.js

document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const cipoId = urlParams.get("id");
  if (!cipoId) {
    alert("Hiba: Nem található termék az azonosító alapján.");
    return;
  }
  try {
    // Cipő adatok lekérése az API-ból
    const resCipo = await fetch(`/api/cipok/${cipoId}`);
    const dataCipo = await resCipo.json();
    if (dataCipo.error) {
      console.error("Hiba:", dataCipo.error);
      return;
    }

    // Fő kép és galéria beállítása
    const mainImage = document.getElementById("main-image");
    const gallery = document.getElementById("image-gallery");
    mainImage.src = "no-image.png";
    gallery.innerHTML = "";
    if (dataCipo.kep) {
      const kepek = dataCipo.kep.split(",");
      // A képek a /cipok/ mappában vannak
      mainImage.src = `/cipok/${kepek[0].trim()}`;
      kepek.forEach(img => {
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
      `${Number(dataCipo.ar).toLocaleString("hu-HU")} Ft`;
    document.getElementById("product-description").textContent = dataCipo.leiras || "";

    // Méretek lekérése
    const resMeretek = await fetch(`/api/cipok/${cipoId}/meretek`);
    const dataMeretek = await resMeretek.json();
    const sizeContainer = document.getElementById("size-options");
    sizeContainer.innerHTML = "";
    dataMeretek.forEach(sizeObj => {
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

    // Ár történelem betöltése
    loadPriceHistory(cipoId);
  } catch (err) {
    console.error("Hiba a termék adatok betöltésekor:", err);
  }
});

// Mennyiség kezelése
function updateQuantity(change) {
  const quantityInput = document.getElementById("quantity");
  let newValue = parseInt(quantityInput.value) + change;
  if (newValue < 1) newValue = 1;
  quantityInput.value = newValue;
}

// Ár történelem: diagram és táblázat
async function loadPriceHistory(cipoId) {
  try {
    const res = await fetch(`/api/cipok/${cipoId}/arvaltozas`);
    const priceData = await res.json();
    if (!priceData.length) {
      document.getElementById("price-history-container").innerHTML =
        "<p>Nincs elérhető ár történet.</p>";
      return;
    }
    const labels = priceData.map(e => new Date(e.datum).toLocaleDateString("hu-HU"));
    const prices = priceData.map(e => e.ar);
    let minPrice = Math.min(...prices);
    let maxPrice = Math.max(...prices);
    if (minPrice === maxPrice) {
      maxPrice = minPrice + 1;
    }
    const ctx = document.getElementById("priceChart").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [{
          label: "Árváltozás",
          data: prices,
          borderColor: "#000",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
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

    // Táblázat létrehozása az ár történelemről
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

/* Keresőpanel események és keresés kezelése */
document.addEventListener("DOMContentLoaded", function() {
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

  const searchInput = document.getElementById("sideSearchInput");
  searchInput.addEventListener("keyup", async function () {
    const query = searchInput.value.trim();
    const resultsContainer = document.getElementById("sideSearchResults");
    resultsContainer.innerHTML = "";
    if (query.length === 0) {
      return;
    }
    try {
      // Keresés az API végponton: /api/cipok/search?query=...
      const res = await fetch(`/api/cipok/search?query=${encodeURIComponent(query)}`);
      const searchResults = await res.json();
      if (!searchResults || searchResults.length === 0) {
        resultsContainer.innerHTML = "<p>Nincs találat.</p>";
        return;
      }
      searchResults.forEach(item => {
        const resultDiv = document.createElement("div");
        resultDiv.className = "search-result-item";
        const img = document.createElement("img");
        if (item.kep) {
          const imgs = item.kep.split(",");
          // A cipők képei a /cipok mappában vannak
          img.src = `/cipok/${imgs[0].trim()}`;
        } else {
          img.src = "no-image.png";
        }
        const textDiv = document.createElement("div");
        const nameHeading = document.createElement("h6");
        nameHeading.textContent = `${item.marka} ${item.modell}`;
        textDiv.appendChild(nameHeading);
        resultDiv.appendChild(img);
        resultDiv.appendChild(textDiv);
        resultDiv.addEventListener("click", () => {
          window.location.href = `product.html?id=${item.cipo_id}`;
        });
        resultsContainer.appendChild(resultDiv);
      });
    } catch (err) {
      console.error("Keresési hiba:", err);
      resultsContainer.innerHTML = "<p>Hiba történt a keresés során.</p>";
    }
  });
});

/* Kosár és bejelentkezés, regisztráció, profil kezelése */
document.addEventListener("DOMContentLoaded", function() {
  // Kosár tárolása (dummy megoldás)
  const cart = [];
  const addToCartBtn = document.getElementById("addToCartBtn");
  addToCartBtn.addEventListener("click", function() {
    const productName = document.getElementById("product-name").textContent;
    const quantity = parseInt(document.getElementById("quantity").value);
    const selectedSize = document.getElementById("selected-size").textContent;
    if (!selectedSize) {
      alert("Kérlek, válassz méretet!");
      return;
    }
    const cartItem = { productName, quantity, selectedSize };
    cart.push(cartItem);
    displayCart(cart);
    alert("Termék hozzáadva a kosárhoz!");
  });

  function displayCart(cartItems) {
    const cartItemsContainer = document.getElementById("cartItems");
    cartItemsContainer.innerHTML = "";
    if (cartItems.length === 0) {
      document.getElementById("cartEmptyText").style.display = "block";
      return;
    }
    document.getElementById("cartEmptyText").style.display = "none";
    cartItems.forEach((item) => {
      const div = document.createElement("div");
      div.innerHTML = `<strong>${item.productName}</strong> - Méret: ${item.selectedSize} - Mennyiség: ${item.quantity}`;
      cartItemsContainer.appendChild(div);
    });
  }

  const openCartBtn = document.getElementById("openCart");
  const cartModal = document.getElementById("cartModal");
  const cartCloseBtn = document.querySelector(".cart-close-btn");
  const clearCartBtn = document.getElementById("clear-cart");

  openCartBtn.addEventListener("click", () => {
    cartModal.classList.add("active");
  });
  cartCloseBtn.addEventListener("click", () => {
    cartModal.classList.remove("active");
  });
  clearCartBtn.addEventListener("click", () => {
    cart.length = 0;
    displayCart(cart);
    alert("A kosár kiürült.");
  });

  // Bejelentkezés / regisztráció / profil kezelése
  const openAuthModalBtn = document.getElementById("openAuthModal");
  const authModalEl = document.getElementById("authModal");
  const authModal = new bootstrap.Modal(authModalEl);
  const loginSection = document.getElementById("loginSection");
  const registerSection = document.getElementById("registerSection");
  const profileSection = document.getElementById("profileSection");
  const editProfileSection = document.getElementById("editProfileSection");
  const authModalLabel = document.getElementById("authModalLabel");
  const showRegisterLink = document.getElementById("showRegister");
  const showLoginLink = document.getElementById("showLogin");
  const cancelEditElem = document.getElementById("cancelEdit");

  openAuthModalBtn.addEventListener("click", () => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      profileSection.style.display = "block";
      loginSection.style.display = "none";
      registerSection.style.display = "none";
      editProfileSection.style.display = "none";
      authModalLabel.textContent = "Profil";
      document.getElementById("profileUsername").textContent = user.felhasznalonev;
    } else {
      loginSection.style.display = "block";
      registerSection.style.display = "none";
      profileSection.style.display = "none";
      editProfileSection.style.display = "none";
      authModalLabel.textContent = "Bejelentkezés";
    }
    authModal.show();
  });

  showRegisterLink.addEventListener("click", () => {
    loginSection.style.display = "none";
    registerSection.style.display = "block";
    authModalLabel.textContent = "Regisztráció";
  });
  showLoginLink.addEventListener("click", () => {
    registerSection.style.display = "none";
    loginSection.style.display = "block";
    authModalLabel.textContent = "Bejelentkezés";
  });
  if (cancelEditElem) {
    cancelEditElem.addEventListener("click", () => {
      editProfileSection.style.display = "none";
      profileSection.style.display = "block";
      authModalLabel.textContent = "Profil";
    });
  }

  // Bejelentkezés
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

  // Regisztráció
  const registerFormElem = document.getElementById("registerForm");
  registerFormElem.addEventListener("submit", function(e) {
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
        registerSection.style.display = "none";
        loginSection.style.display = "block";
        authModalLabel.textContent = "Bejelentkezés";
      } else {
        alert("Hiba történt a regisztrációkor: " + data.error);
      }
    })
    .catch(err => {
      console.error("Regisztrációs hiba:", err);
      alert("Hiba történt a regisztrációkor.");
    });
  });

  // Profil szerkesztése
  const editProfileButton = document.getElementById("editProfileButton");
  if (editProfileButton) {
    editProfileButton.addEventListener("click", () => {
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      document.getElementById("editVezeteknev").value = loggedInUser.vezeteknev;
      document.getElementById("editKeresztnev").value = loggedInUser.keresztnev;
      document.getElementById("editFelhasznalonev").value = loggedInUser.felhasznalonev;
      document.getElementById("editEmail").value = loggedInUser.email;
      profileSection.style.display = "none";
      editProfileSection.style.display = "block";
      authModalLabel.textContent = "Profil szerkesztése";
    });
  }
  const editProfileForm = document.getElementById("editProfileForm");
  editProfileForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const userId = loggedInUser.felhasznalo_id;
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
        loggedInUser.vezeteknev = vezeteknev;
        loggedInUser.keresztnev = keresztnev;
        loggedInUser.felhasznalonev = felhasznalonev;
        loggedInUser.email = email;
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        editProfileSection.style.display = "none";
        profileSection.style.display = "block";
        authModalLabel.textContent = "Profil";
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

  // Kijelentkezés
  const logoutButton = document.getElementById("logoutButton");
  logoutButton.addEventListener("click", function() {
    localStorage.removeItem("loggedInUser");
    alert("Kijelentkezve!");
    profileSection.style.display = "none";
    loginSection.style.display = "block";
    authModalLabel.textContent = "Bejelentkezés";
    const authModalBootstrap = bootstrap.Modal.getInstance(authModalEl);
    authModalBootstrap.hide();
  });
});


// Példa: a "TERMÉKEK" és "KOLLEKCIÓK" szekciók megjelenítése a keresőpanelben
document.addEventListener("DOMContentLoaded", function() {
  const openSearchBtn = document.getElementById("openSearch");
  const sideSearch = document.getElementById("sideSearch");
  const closeSideSearch = document.getElementById("closeSideSearch");
  const searchOverlay = document.getElementById("searchOverlay");

  // Keresőpanel nyit/zár
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

  // Kereső input esemény
  const searchInput = document.getElementById("sideSearchInput");
  const resultsContainer = document.getElementById("sideSearchResults");

  // Itt csináljunk egy kis sablont a „Termékek” és „Kollekciók” részeknek
  function renderSearchResults(products, collections) {
    // Töröljük az előző tartalmat
    resultsContainer.innerHTML = "";

    // 1) "TERMÉKEK" fül
    const productsDiv = document.createElement("div");
    const productsTitle = document.createElement("h5");
    productsTitle.textContent = "TERMÉKEK";
    productsDiv.appendChild(productsTitle);

    if (!products || products.length === 0) {
      // Ha nincs találat
      const noProd = document.createElement("p");
      noProd.textContent = "Nincs találat.";
      productsDiv.appendChild(noProd);
    } else {
      products.forEach(item => {
        // Konténer
        const resultDiv = document.createElement("div");
        resultDiv.className = "search-result-item";
        resultDiv.style.display = "flex";
        resultDiv.style.marginBottom = "10px";
        resultDiv.style.cursor = "pointer";

        // Kép
        const img = document.createElement("img");
        img.style.width = "50px";
        img.style.height = "50px";
        img.style.objectFit = "cover";
        img.style.marginRight = "10px";

        if (item.kep) {
          const imgs = item.kep.split(",");
          img.src = `/cipok/${imgs[0].trim()}`; // a /cipok/ mappában
        } else {
          img.src = "no-image.png";
        }

        // Szöveges rész
        const textDiv = document.createElement("div");
        
        // Név: márka + modell
        const nameHeading = document.createElement("h6");
        nameHeading.textContent = `${item.marka} ${item.modell}`;
        nameHeading.style.margin = "0";

        // Árak
        const priceP = document.createElement("p");
        priceP.style.margin = "0";
        // Ha van ar_eredeti és az kisebb a "ar" mezőnél, feltételezzük akció:
        if (item.ar_eredeti && item.ar_eredeti > item.ar) {
          // Akciós ár
          const akciosSpan = document.createElement("span");
          akciosSpan.style.color = "red";
          akciosSpan.textContent = `${Number(item.ar).toLocaleString("hu-HU")} Ft`;

          // Eredeti ár
          const eredetiSpan = document.createElement("span");
          eredetiSpan.style.textDecoration = "line-through";
          eredetiSpan.style.marginLeft = "8px";
          eredetiSpan.textContent = `${Number(item.ar_eredeti).toLocaleString("hu-HU")} Ft`;

          priceP.appendChild(akciosSpan);
          priceP.appendChild(eredetiSpan);
        } else {
          // Nincs akció
          priceP.textContent = `${Number(item.ar).toLocaleString("hu-HU")} Ft`;
        }

        // Összeállítjuk
        textDiv.appendChild(nameHeading);
        textDiv.appendChild(priceP);
        resultDiv.appendChild(img);
        resultDiv.appendChild(textDiv);

        // Kattintás: product.html?id=<cipo_id>
        resultDiv.addEventListener("click", () => {
          window.location.href = `product.html?id=${item.cipo_id}`;
        });

        productsDiv.appendChild(resultDiv);
      });
    }

    resultsContainer.appendChild(productsDiv);

    // 2) "KOLLEKCIÓK" fül (opcionális)
    const collectionsDiv = document.createElement("div");
    const collectionsTitle = document.createElement("h5");
    collectionsTitle.textContent = "KOLLEKCIÓK";
    collectionsDiv.appendChild(collectionsTitle);

    // Ha van valamilyen logikád a kollekciókhoz, ide beillesztheted:
    if (!collections || collections.length === 0) {
      const noColl = document.createElement("p");
      noColl.textContent = "Nincsenek kollekciók.";
      collectionsDiv.appendChild(noColl);
    } else {
      collections.forEach(coll => {
        const collDiv = document.createElement("div");
        collDiv.textContent = coll; // Pl. "Nike Air Max kollekció"
        collectionsDiv.appendChild(collDiv);
      });
    }
    resultsContainer.appendChild(collectionsDiv);
  }

  // Keresés: keyup
  searchInput.addEventListener("keyup", async function () {
    const query = searchInput.value.trim();
    resultsContainer.innerHTML = "";
    if (query.length === 0) {
      return;
    }
    try {
      // 1) Termékek keresése
      const res = await fetch(`/api/cipok/search?query=${encodeURIComponent(query)}`);
      const searchResults = await res.json();

      // 2) Kollekciók (opcionális) – ha van ilyen végpont
      // const collRes = await fetch(`/api/kollekciok/search?query=${encodeURIComponent(query)}`);
      // const collResults = await collRes.json();

      // Példa: ha nincs kollekció, átadhatsz üres tömböt
      const collResults = []; 

      // Eredmények megjelenítése
      renderSearchResults(searchResults, collResults);

    } catch (err) {
      console.error("Keresési hiba:", err);
      resultsContainer.innerHTML = "<p>Hiba történt a keresés során.</p>";
    }
  });
});
