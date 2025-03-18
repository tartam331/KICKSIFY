// nike.js

document.addEventListener("DOMContentLoaded", function() {
  /* ======================
     Cipők lekérése & megjelenítése
  ========================= */
  let allNikeShoes = []; 

  // Nike cipők lekérése az API-ból
  fetch("http://localhost:5000/api/cipok?marka=Nike")
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP error: " + response.status);
      }
      return response.json();
    })
    .then(data => {
      allNikeShoes = data; 
      console.log("✅ Betöltött Nike cipők:", allNikeShoes); 
      renderShoes(allNikeShoes);
    })
    .catch(error => {
      console.error("❌ Hiba a cipők betöltésekor:", error);
      document.getElementById("shoe-container").innerHTML = "<p>Hiba történt az adatok betöltésekor.</p>";
    });

  // Rendezés kezelése
  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", function() {
      const value = this.value;
      if (value === "asc") {
        allNikeShoes.sort((a, b) => a.ar - b.ar);
      } else if (value === "desc") {
        allNikeShoes.sort((a, b) => b.ar - a.ar);
      }
      // Ha "featured", az eredeti sorrend marad
      renderShoes(allNikeShoes);
    });
  }

  // Cipők megjelenítése
  function renderShoes(shoeArray) {
    const container = document.getElementById("shoe-container");
    container.innerHTML = "";
    if (!Array.isArray(shoeArray) || shoeArray.length === 0) {
      container.innerHTML = "<p>Nincs elérhető Nike cipő.</p>";
      return;
    }
    shoeArray.forEach(cip => {
      // Az első képfájl kiválasztása (a 'kep' mező vesszővel elválasztott listából)
      const firstImage = cip.kep.split(",")[0].trim();
      const imgSrc = `http://localhost:5000/cipok/${firstImage}`;
      console.log("🔍 Kép megjelenítéshez:", imgSrc);
      
      const col = document.createElement("div");
      col.className = "col-12 col-md-4 shoe-item";
      
      const arFormazott = Number(cip.ar).toLocaleString("hu-HU") + " Ft";
      
      // Ha a termékre kattintva a részletekhez szeretnél navigálni, akkor így:
      col.onclick = function() {
        window.location.href = `product.html?id=${cip.cipo_id}`;
      };

      col.innerHTML = `
        <img src="${imgSrc}" alt="${cip.modell}" class="shoe-image"
          onerror="this.onerror=null; this.src='images/default-image.jpg';"
          style="width: 100%; height: auto; display: block;">
        <p class="shoe-name">${cip.marka} ${cip.modell}</p>
        <p class="shoe-price">${arFormazott}</p>
      `;
      
      container.appendChild(col);
    });
  }

  /* ======================
     Kosár és Felhasználói (Auth) funkciók
     Ezeket a funkciókat most úgy integráltuk, hogy minden oldalon ugyanúgy működjenek.
  ========================= */
  
  // --- Kosár funkciók ---
  
  // Visszaadja a kosár tartalmát a localStorage-ból (JSON formátumban)
  function getCartItems() {
    const cart = localStorage.getItem("cartItems");
    return cart ? JSON.parse(cart) : [];
  }
  
  // Mentjük a kosár tartalmát a localStorage-ba
  function saveCartItems(cartItems) {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
  
  // Kosár tartalmának megjelenítése a kosár modalban
  function displayCart() {
    const cartItems = getCartItems();
    const cartItemsContainer = document.getElementById("cartItems");
    if (!cartItemsContainer) return;
    cartItemsContainer.innerHTML = "";
    if (cartItems.length === 0) {
      document.getElementById("cartEmptyText").style.display = "block";
      return;
    }
    document.getElementById("cartEmptyText").style.display = "none";
    cartItems.forEach(item => {
      const div = document.createElement("div");
      div.innerHTML = `<strong>${item.productName}</strong> - Méret: ${item.selectedSize} - Mennyiség: ${item.quantity}`;
      cartItemsContainer.appendChild(div);
    });
  }
  
  // Függvény a kosárba adáshoz
  // (Használhatod ezt a függvényt a termékoldalakon a "Kosárba" gombhoz)
  function addToCart(cipoId, cipoNev, meret, darabszam, ar, kepUrl) {
    let cartItems = getCartItems();
    // Ha már van ilyen termék adott mérettel, növeljük a mennyiséget
    const existingIndex = cartItems.findIndex(item => item.cipoId === cipoId && item.selectedSize === meret);
    if (existingIndex !== -1) {
      cartItems[existingIndex].quantity += darabszam;
    } else {
      cartItems.push({
        cipoId: cipoId,
        productName: cipoNev,
        selectedSize: meret,
        quantity: darabszam,
        price: ar,
        image: kepUrl
      });
    }
    saveCartItems(cartItems);
    displayCart();
  }
  
  // Ha a "Kosárba" gomb (addToCartBtn) az oldalon megtalálható, rögzítjük a click eseményt.
  const addToCartBtn = document.getElementById("addToCartBtn");
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", function() {
      const cipoNev = document.getElementById("product-name").textContent;
      const meret = document.getElementById("selected-size").textContent;
      const darabszam = parseInt(document.getElementById("quantity").value, 10);
      const arText = document.getElementById("product-price").textContent; // pl. "4 999 990 Ft"
      const ar = parseInt(arText.replace(/\D/g, ""), 10); // kiszedi a számokat
      const kepUrl = document.getElementById("main-image").src;
      // A termék azonosítóját itt például adatattribútumból is olvashatod
      const cipoId = addToCartBtn.getAttribute("data-cipo-id") || "0"; // Alapértelmezett érték, ha nincs beállítva
      if (!meret) {
        alert("Kérlek, válassz méretet!");
        return;
      }
      addToCart(cipoId, cipoNev, meret, darabszam, ar, kepUrl);
      alert("Termék hozzáadva a kosárhoz!");
    });
  }
  
  // Kosár modal események
  const openCartBtn = document.getElementById("openCart");
  const cartModal = document.getElementById("cartModal");
  const cartCloseBtn = document.querySelector(".cart-close-btn");
  const clearCartBtn = document.getElementById("clear-cart");
  if (openCartBtn) {
    openCartBtn.addEventListener("click", function() {
      displayCart();
      cartModal.classList.add("active");
    });
  }
  if (cartCloseBtn) {
    cartCloseBtn.addEventListener("click", function() {
      cartModal.classList.remove("active");
    });
  }
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", function() {
      localStorage.removeItem("cartItems");
      displayCart();
      alert("A kosár kiürült.");
    });
  }
  
  // --- Felhasználói (Auth) funkciók ---
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
  
  if (openAuthModalBtn) {
    openAuthModalBtn.addEventListener("click", function() {
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
  }
  
  if (showRegisterLink) {
    showRegisterLink.addEventListener("click", function() {
      loginSection.style.display = "none";
      registerSection.style.display = "block";
      authModalLabel.textContent = "Regisztráció";
    });
  }
  
  if (showLoginLink) {
    showLoginLink.addEventListener("click", function() {
      registerSection.style.display = "none";
      loginSection.style.display = "block";
      authModalLabel.textContent = "Bejelentkezés";
    });
  }
  
  if (cancelEditElem) {
    cancelEditElem.addEventListener("click", function() {
      editProfileSection.style.display = "none";
      profileSection.style.display = "block";
      authModalLabel.textContent = "Profil";
    });
  }
  
  // Bejelentkezés kezelése
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
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
  }
  
  // Regisztráció és profil frissítés kezelése itt hasonló módon implementálható…
  
  // Az oldal betöltésekor jelenítse meg a kosár tartalmát
  displayCart();
});
