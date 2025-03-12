document.addEventListener("DOMContentLoaded", async function () {
    // URL paraméterek: pl. exkluzivproduct.html?id=1
    const urlParams = new URLSearchParams(window.location.search);
    const exkluzivId = urlParams.get("id");
    if (!exkluzivId) {
      alert("Hiba: Nem található exkluzív termék az azonosító alapján.");
      return;
    }
  
    try {
      // 1) Exkluzív termék adatainak lekérése az API-ból
      // Feltételezzük, hogy létezik pl. GET /api/exkluziv_cipok/:id
      const resCipo = await fetch(`/api/exkluziv_cipok/${exkluzivId}`);
      const dataCipo = await resCipo.json();
      if (dataCipo.error) {
        console.error("Hiba:", dataCipo.error);
        return;
      }
  
      // 2) Képgaléria beállítása
      const mainImage = document.getElementById("main-image");
      const gallery = document.getElementById("image-gallery");
      mainImage.src = "no-image.png";
      gallery.innerHTML = "";
  
      if (dataCipo.kep) {
        const kepek = dataCipo.kep.split(",");
        // A képek a /cipok/ mappában vannak, de teheted máshova is
        mainImage.src = `/cipok/${kepek[0].trim()}`;
        kepek.forEach(img => {
          const imgElem = document.createElement("img");
          imgElem.src = `/cipok/${img.trim()}`;
          imgElem.className = "small";
          imgElem.style.cursor = "pointer";
          imgElem.addEventListener("click", () => {
            mainImage.src = imgElem.src;
          });
          gallery.appendChild(imgElem);
        });
      }
  
      // 3) Termék adatok megjelenítése
      document.getElementById("product-brand").textContent = dataCipo.marka || "";
      document.getElementById("product-name").textContent = dataCipo.modell || "";
      document.getElementById("product-price").textContent =
        `${Number(dataCipo.ar).toLocaleString("hu-HU")} Ft`;
      document.getElementById("product-description").textContent = dataCipo.leiras || "";
  
      // 4) Méretek lekérése
      // Feltételezzük, hogy van pl. GET /api/exkluziv_cipok/:id/meretek
      // Ha nincs, hagyd ki vagy statikusan jelenítsd meg
      try {
        const resMeretek = await fetch(`/api/exkluziv_cipok/${exkluzivId}/meretek`);
        if (resMeretek.ok) {
          const dataMeretek = await resMeretek.json();
          const sizeContainer = document.getElementById("size-options");
          sizeContainer.innerHTML = "";
          dataMeretek.forEach(sizeObj => {
            const sizeBtn = document.createElement("button");
            sizeBtn.className = "size-option";
            sizeBtn.textContent = sizeObj.meret;
            sizeBtn.addEventListener("click", () => {
              document
                .querySelectorAll(".size-option")
                .forEach(btn => btn.classList.remove("active"));
              sizeBtn.classList.add("active");
              document.getElementById("selected-size").textContent = sizeObj.meret;
            });
            sizeContainer.appendChild(sizeBtn);
          });
        }
      } catch (err) {
        console.warn("Nincs /meretek végpont vagy hiba történt a méretek lekérdezésekor:", err);
      }
  
      // 5) Ár történelem betöltése – Ha NINCS exkluzív ár-történelem táblád, 
      // egyszerűen jelezd, hogy nincs adat.
      loadPriceHistory(); // Csak demó
  
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
  
  // Ár történelem (ha nincs, csak kiírjuk, hogy nincs)
  function loadPriceHistory() {
    // Példa: egyszerűen kiírjuk, hogy "Nincs elérhető ár történelem"
    document.getElementById("priceChart").style.display = "none";
    document.getElementById("priceTableContainer").innerHTML = "<p>Nincs elérhető ár történelem.</p>";
  }
  
  /* Keresőpanel események és keresés kezelése (opcionális) */
  document.addEventListener("DOMContentLoaded", function() {
    // ... Kereső, kosár, auth modal, stb. – ha szeretnéd, adaptálhatod a korábbi product.js logikát ...
    // Alább egy minimalista példa:
  
    const openCartBtn = document.getElementById("openCart");
    const cartModal = document.getElementById("cartModal");
    const cartCloseBtn = document.querySelector(".cart-close-btn");
    const clearCartBtn = document.getElementById("clear-cart");
    const cartItemsContainer = document.getElementById("cartItems");
    let cart = [];
  
    openCartBtn.addEventListener("click", () => {
      cartModal.classList.add("active");
    });
    cartCloseBtn.addEventListener("click", () => {
      cartModal.classList.remove("active");
    });
    clearCartBtn.addEventListener("click", () => {
      cart = [];
      renderCart();
      alert("A kosár kiürült.");
    });
  
    function renderCart() {
      cartItemsContainer.innerHTML = "";
      if (cart.length === 0) {
        document.getElementById("cartEmptyText").style.display = "block";
        return;
      }
      document.getElementById("cartEmptyText").style.display = "none";
      cart.forEach(item => {
        const div = document.createElement("div");
        div.textContent = `Termék: ${item.name}, Mennyiség: ${item.qty}, Méret: ${item.size}`;
        cartItemsContainer.appendChild(div);
      });
    }
  
    // "Kosárba" gomb
    const addToCartBtn = document.getElementById("addToCartBtn");
    addToCartBtn.addEventListener("click", function() {
      const productName = document.getElementById("product-name").textContent;
      const quantity = parseInt(document.getElementById("quantity").value);
      const selectedSize = document.getElementById("selected-size").textContent;
      if (!selectedSize) {
        alert("Kérlek, válassz méretet!");
        return;
      }
      cart.push({
        name: productName,
        qty: quantity,
        size: selectedSize
      });
      renderCart();
      alert("Termék hozzáadva a kosárhoz!");
    });
  
    // Kereső (ha kell)
    const openSearchBtn = document.getElementById("openSearch");
    const sideSearch = document.getElementById("sideSearch");
    const closeSideSearch = document.getElementById("closeSideSearch");
    const searchOverlay = document.getElementById("searchOverlay");
  
    if (openSearchBtn && sideSearch && closeSideSearch && searchOverlay) {
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
    }
  });
  