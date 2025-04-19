let allNikeShoes = []; 

document.addEventListener("DOMContentLoaded", function() { 
  fetch("http://localhost:5000/api/cipok?marka=Balenciaga") 
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP error: " + response.status);
      }
      return response.json();  
    })

      .then(data => {
      allNikeShoes = data; 
      console.log("✅ Betöltött Adidas cipők:", allNikeShoes); 
      renderShoes(allNikeShoes); // Kirajzolás
    })
    .catch(error => {
      console.error("❌ Hiba a cipők betöltésekor:", error);
      document.getElementById("shoe-container").innerHTML = "<p>Hiba történt az adatok betöltésekor.</p>";
    });

  document.getElementById("sortSelect").addEventListener("change", function() {
    const value = this.value;

    if (value === "asc") {
      allNikeShoes.sort((a, b) => a.ar - b.ar);
    } else if (value === "desc") {
      allNikeShoes.sort((a, b) => b.ar - a.ar);
    }

    renderShoes(allNikeShoes);
  });
});

/**
 * Cipők megjelenítése
 */
function renderShoes(shoeArray) {
  const container = document.getElementById("shoe-container");
  container.innerHTML = "";

  if (!Array.isArray(shoeArray) || shoeArray.length === 0) {
    container.innerHTML = "<p>Nincs elérhető Adidas cipő.</p>";
    return;
  }

  shoeArray.forEach(cip => {
    // Az első képfájl kiválasztása a listából
    const firstImage = cip.kep.split(",")[0].trim(); // Első kép kiválasztása
    const imgSrc = `http://localhost:5000/cipok/${firstImage}`;
    console.log("🔍 Kép megjelenítéshez:", imgSrc); // Ellenőrzés

    const col = document.createElement("div");
    col.className = "col-12 col-md-4 shoe-item";

    const arFormazott = Number(cip.ar).toLocaleString("hu-HU") + " Ft";

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

document.addEventListener("DOMContentLoaded", function() {
  // Bal oldali panel
  const openLeftPanelBtn = document.getElementById("openLeftPanel");
  const leftPanel = document.getElementById("leftPanel");
  const closeLeftPanelBtn = document.getElementById("closeLeftPanel");
  openLeftPanelBtn.addEventListener("click", () => {
    leftPanel.classList.add("active");
  });
  closeLeftPanelBtn.addEventListener("click", () => {
    leftPanel.classList.remove("active");
  });
  
  // Keresőpanel
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
  
  // Kosár
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
    localStorage.removeItem("cartItems");
    displayCart([]);
    alert("A kosár kiürült.");
  });
  
  // Auth modal
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
});