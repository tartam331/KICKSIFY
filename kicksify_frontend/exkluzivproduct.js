document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const exkluzivId = urlParams.get("id");
  if (!exkluzivId) {
    alert("Hiba: Nem található exkluzív termék az azonosító alapján.");
    return;
  }
  
  try {
    // Exkluzív cipő adatok lekérése
    const resCipo = await fetch(`/api/exkluziv_cipok/${exkluzivId}`);
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
    
    // Termék adatok beállítása
    document.getElementById("product-brand").textContent = dataCipo.marka;
    document.getElementById("product-name").textContent = dataCipo.modell;
    document.getElementById("product-price").textContent =
      `${Number(dataCipo.ar).toLocaleString("hu-HU")} Ft`;
    document.getElementById("product-description").textContent = dataCipo.leiras || "";
    
    // Méretek lekérése exkluzív termékhez
    const resMeretek = await fetch(`/api/exkluziv_cipok/${exkluzivId}/meretek`);
    const dataMeretek = await resMeretek.json();
    const sizeContainer = document.getElementById("size-options");
    sizeContainer.innerHTML = "";
    if (Array.isArray(dataMeretek) && dataMeretek.length > 0) {
      dataMeretek.forEach(item => {
        const sizeBtn = document.createElement("button");
        sizeBtn.className = "size-option";
        // A táblában a 'meret_id' tartalmazza a méretet (például 42, 43 stb.)
        sizeBtn.textContent = item.meret_id;
        sizeBtn.addEventListener("click", () => {
          document.querySelectorAll(".size-option").forEach(btn => btn.classList.remove("active"));
          sizeBtn.classList.add("active");
          document.getElementById("selected-size").textContent = item.meret_id;
        });
        sizeContainer.appendChild(sizeBtn);
      });
    } else {
      sizeContainer.innerHTML = "<p>Nincsenek méretek.</p>";
    }
    
    // Ár történelem lekérése
    loadPriceHistory(exkluzivId);
    
  } catch (err) {
    console.error("Hiba az exkluzív termék betöltésekor:", err);
  }
  
  // Inicializáljuk a mennyiséget 1-re
  document.getElementById("quantity").value = 1;
});

// Mennyiség kezelése
function updateQuantity(change) {
  const quantityInput = document.getElementById("quantity");
  let newValue = parseInt(quantityInput.value) + change;
  if (newValue < 1) newValue = 1;
  quantityInput.value = newValue;
}

// Ár történelem betöltése
async function loadPriceHistory(exkluzivId) {
  try {
    const res = await fetch(`/api/exkluziv_cipok/${exkluzivId}/arvaltozas`);
    if (!res.ok) {
      document.getElementById("price-history-container").innerHTML = "<p>Nincs elérhető ár történelem.</p>";
      return;
    }
    const priceData = await res.json();
    if (!priceData.length) {
      document.getElementById("price-history-container").innerHTML = "<p>Nincs elérhető ár történelem.</p>";
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
    document.getElementById("price-history-container").innerHTML = "<p>Nincs elérhető ár történelem.</p>";
  }
}

// Dummy kosár és egyéb funkciók
document.addEventListener("DOMContentLoaded", function() {
  // Dummy kosár tömb (ez később cserélhető szerver oldali megoldásra)
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
    const cartItem = { productName, quantity, selectedSize, productType: "exkluziv" };
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
  
  // Keresőpanel események
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
