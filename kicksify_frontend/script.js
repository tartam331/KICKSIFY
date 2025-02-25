document.addEventListener("DOMContentLoaded", () => {
  loadProducts();

  // Keresés ikon eseménykezelő
  const searchIcon = document.querySelector(".fa-search");
  searchIcon.addEventListener("click", () => {
      const searchModal = document.getElementById("searchModal");
      const modal = new bootstrap.Modal(searchModal);
      modal.show();
  });

  // Kereső űrlap kezelése
  const searchForm = document.getElementById("searchForm");
  searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const searchQuery = document.getElementById("searchInput").value.trim();
      searchProducts(searchQuery);
  });
});

// 🔄 Termékek betöltése
const loadProducts = () => {
  fetch("http://localhost:5000/api/cipok")
      .then(response => response.json())
      .then(data => {
          const productList = document.getElementById("product-list");
          if (productList) {
              productList.innerHTML = ""; // Tisztítás
              data.forEach(product => {
                  productList.innerHTML += `
                      <div class="col-md-4">
                          <div class="card">
                              <img src="${product.image}" class="card-img-top" alt="${product.modell}">
                              <div class="card-body">
                                  <h5 class="card-title">${product.marka} - ${product.modell}</h5>
                                  <p class="card-text">${product.leiras}</p>
                                  <p class="card-text"><strong>${product.ar} HUF</strong></p>
                                  <button class="btn btn-primary" onclick="addToCart(${product.cipo_id}, ${product.ar})">Kosárba</button>
                              </div>
                          </div>
                      </div>
                  `;
              });
          }
      })
      .catch(error => console.error("❌ Hiba a termékek betöltésekor:", error));
};

// 🔍 Keresés beállítása
document.addEventListener("DOMContentLoaded", () => {
  const searchIcon = document.querySelector(".fa-search");
  const sideSearch = document.getElementById("sideSearch");
  const closeSideSearch = document.getElementById("closeSideSearch");
  const searchInput = document.getElementById("sideSearchInput");

  searchIcon.addEventListener("click", () => {
      sideSearch.classList.add("active");
      searchInput.focus();
  });

  closeSideSearch.addEventListener("click", () => {
      sideSearch.classList.remove("active");
      document.getElementById("sideSearchResults").innerHTML = ""; // Törlés
  });

  searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim();
      if (query.length > 0) {
          searchProducts(query);
      } else {
          document.getElementById("sideSearchResults").innerHTML = "";
      }
  });
});

// 🔍 Keresés az adatbázisban
const searchProducts = (query) => {
  fetch(`http://localhost:5000/api/cipok?search=${query}`)
      .then(response => response.json())
      .then(data => {
          const results = document.getElementById("sideSearchResults");
          results.innerHTML = "";

          if (data.length === 0) {
              results.innerHTML = `<p>Nincs találat a "${query}" kifejezésre.</p>`;
          } else {
              data.forEach(product => {
                  results.innerHTML += `
                      <div class="search-result-item">
                          <img src="${product.image}" alt="${product.modell}">
                          <div>
                              <h6>${product.marka} - ${product.modell}</h6>
                              <p>${product.ar} HUF</p>
                          </div>
                      </div>
                  `;
              });
          }
      })
      .catch(error => console.error("❌ Hiba a keresés közben:", error));
};

document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.querySelector(".fa-shopping-cart");
  const cartModal = document.getElementById("cartModal");
  const closeBtn = document.querySelector(".cart-close-btn"); // 🔑 Helyesen megadott bezáró gomb
  const cartItemsContainer = document.getElementById("cart-items");
  const clearCartBtn = document.getElementById("clear-cart");
  const felhasznalo_id = 1; // Fix felhasználó ID

  // Kosár ikon kattintás esemény
  cartIcon.addEventListener("click", () => {
      fetch(`http://localhost:5000/api/kosar/${felhasznalo_id}`)
          .then(response => response.json())
          .then(data => {
              cartItemsContainer.innerHTML = "";

              if (data.length === 0) {
                  cartItemsContainer.innerHTML = "<p>A kosár üres.</p>";
              } else {
                  data.forEach(item => {
                      cartItemsContainer.innerHTML += `
                          <div class="cart-item">
                              <img src="${item.image}" alt="${item.modell}">
                              <div>
                                  <h5>${item.marka} - ${item.modell}</h5>
                                  <p>Méret: ${item.meret}</p>
                                  <p>Darabszám: ${item.darabszam}</p>
                                  <p>Ár: ${item.egysegar} Ft</p>
                                  <button class="btn btn-danger" onclick="removeFromCart(${item.kosar_id})">Törlés</button>
                              </div>
                          </div>
                      `;
                  });
              }
              cartModal.classList.add("active"); // Kosár megnyitása
          })
          .catch(err => console.error("❌ Hiba a kosár betöltésekor:", err));
  });

  // ✅ Kosár bezárása működőképesen
  closeBtn.addEventListener("click", () => {
      cartModal.classList.remove("active");
  });

  // Kosár ürítése
  clearCartBtn.addEventListener("click", () => {
      fetch(`http://localhost:5000/api/kosar/clear/${felhasznalo_id}`, {
          method: "DELETE"
      })
          .then(response => response.json())
          .then(() => {
              cartItemsContainer.innerHTML = "<p>A kosár üres.</p>";
          });
  });
});
