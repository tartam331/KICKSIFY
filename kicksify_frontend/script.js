document.addEventListener("DOMContentLoaded", function() {
    /* ===== Bal oldali panel (CIPŐK & KOLLEKCIÓK) ===== */
    const openLeftPanelBtn = document.getElementById("openLeftPanel");
    const leftPanel = document.getElementById("leftPanel");
    const closeLeftPanelBtn = document.getElementById("closeLeftPanel");
    openLeftPanelBtn.addEventListener("click", () => {
      leftPanel.classList.add("active");
    });
    closeLeftPanelBtn.addEventListener("click", () => {
      leftPanel.classList.remove("active");
    });

    /* ===== Keresőpanel ===== */
    const openSearchBtn = document.getElementById("openSearch");
    const sideSearch = document.getElementById("sideSearch");
    const closeSideSearch = document.getElementById("closeSideSearch");
    const searchOverlay = document.getElementById("searchOverlay");
    const searchInput = document.getElementById("sideSearchInput");
    const searchResults = document.getElementById("sideSearchResults");

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

    /* ===== AUTH MODAL ===== */
    const userIcon = document.getElementById("openAuthModal");
    const authModalEl = document.getElementById("authModal");
    const authModal = new bootstrap.Modal(authModalEl);
    const profileSection = document.getElementById("profileSection");
    const editProfileSection = document.getElementById("editProfileSection");
    const loginSection = document.getElementById("loginSection");
    const registerSection = document.getElementById("registerSection");
    const authModalLabel = document.getElementById("authModalLabel");
    const showRegisterLink = document.getElementById("showRegister");
    const showLoginLink = document.getElementById("showLogin");
    const cancelEditElem = document.getElementById("cancelEdit");

    userIcon.addEventListener("click", function() {
      const loggedInUser = localStorage.getItem("loggedInUser");
      if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        profileSection.style.display = "block";
        loginSection.style.display = "none";
        registerSection.style.display = "none";
        editProfileSection.style.display = "none";
        authModalLabel.textContent = "Profil";
        document.getElementById("profileUsername").textContent = user.felhasznalonev || "Felhasználó";
      } else {
        loginSection.style.display = "block";
        registerSection.style.display = "none";
        profileSection.style.display = "none";
        editProfileSection.style.display = "none";
        authModalLabel.textContent = "Bejelentkezés";
      }
      authModal.show();
    });
    if (showRegisterLink) {
      showRegisterLink.addEventListener("click", () => {
        loginSection.style.display = "none";
        registerSection.style.display = "block";
        authModalLabel.textContent = "Regisztráció";
      });
    }
    if (showLoginLink) {
      showLoginLink.addEventListener("click", () => {
        registerSection.style.display = "none";
        loginSection.style.display = "block";
        authModalLabel.textContent = "Bejelentkezés";
      });
    }
    if (cancelEditElem) {
      cancelEditElem.addEventListener("click", () => {
        editProfileSection.style.display = "none";
        profileSection.style.display = "block";
        authModalLabel.textContent = "Profil";
      });
    }

    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;
      if (email && password) {
        const user = {
          felhasznalo_id: 1,
          vezeteknev: "Teszt",
          keresztnev: "User",
          felhasznalonev: "testUser",
          email: email
        };
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        authModal.hide();
        alert("Sikeres bejelentkezés!");
      } else {
        alert("Hibás email vagy jelszó!");
      }
    });

    const registerFormElem = document.getElementById("registerForm");
    registerFormElem.addEventListener("submit", function(e) {
      e.preventDefault();
      const vnev = document.getElementById("registerLastName").value;
      const knev = document.getElementById("registerFirstName").value;
      const uname = document.getElementById("registerUsername").value;
      const email = document.getElementById("registerEmail").value;
      const pass = document.getElementById("registerPassword").value;
      
      if (!vnev || !knev || !uname || !email || !pass) {
        alert("Kérlek, tölts ki minden mezőt!");
        return;
      }
      alert("Sikeres regisztráció! Most már bejelentkezhetsz.");
      registerSection.style.display = "none";
      loginSection.style.display = "block";
      authModalLabel.textContent = "Bejelentkezés";
    });

    const editProfileButton = document.getElementById("editProfileButton");
    if (editProfileButton) {
      editProfileButton.addEventListener("click", () => {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
        document.getElementById("editVezeteknev").value = loggedInUser.vezeteknev || "";
        document.getElementById("editKeresztnev").value = loggedInUser.keresztnev || "";
        document.getElementById("editFelhasznalonev").value = loggedInUser.felhasznalonev || "";
        document.getElementById("editEmail").value = loggedInUser.email || "";
        profileSection.style.display = "none";
        editProfileSection.style.display = "block";
        authModalLabel.textContent = "Profil szerkesztése";
      });
    }
    const editProfileForm = document.getElementById("editProfileForm");
    editProfileForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
      loggedInUser.vezeteknev = document.getElementById("editVezeteknev").value;
      loggedInUser.keresztnev = document.getElementById("editKeresztnev").value;
      loggedInUser.felhasznalonev = document.getElementById("editFelhasznalonev").value;
      loggedInUser.email = document.getElementById("editEmail").value;
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      alert("Profil frissítve!");
      editProfileSection.style.display = "none";
      profileSection.style.display = "block";
      authModalLabel.textContent = "Profil";
      document.getElementById("profileUsername").textContent = loggedInUser.felhasznalonev;
    });

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
    
    /* ===== Kosárpanel ===== */
    const openCartBtn = document.getElementById("openCart");
    const cartModal = document.getElementById("cartModal");
    const cartCloseBtn = document.querySelector(".cart-close-btn");
    const clearCartBtn = document.getElementById("clear-cart");
    const paymentBtn = document.getElementById("paymentBtn");
    const cartItemsContainer = document.getElementById("cart-items");
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
    paymentBtn.addEventListener("click", () => {
      alert("Fizetés (demo). Itt valós API-hívás és e-mailküldés történne.");
    });
    function renderCart() {
      cartItemsContainer.innerHTML = "";
      if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>A kosár üres.</p>";
        return;
      }
      cart.forEach(item => {
        const div = document.createElement("div");
        div.textContent = `Termék: ${item.name}, Mennyiség: ${item.qty}`;
        cartItemsContainer.appendChild(div);
      });
    }
  });