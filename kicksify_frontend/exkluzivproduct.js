// exkluzivproduct.js

// -------------------------------------------------------------
// 0) AUTH ICON → megnyitja a Bejelentkezés/Profil modalt
// -------------------------------------------------------------
const openAuthModalBtn = document.getElementById("openAuthModal");
const authModalEl      = document.getElementById("authModal");
const authModal        = new bootstrap.Modal(authModalEl);

openAuthModalBtn.addEventListener("click", () => {
  const user = localStorage.getItem("loggedInUser");
  if (user) {
    // Profilrész mutatása
    document.getElementById("profileSection").style.display    = "block";
    document.getElementById("loginSection").style.display      = "none";
    document.getElementById("registerSection").style.display   = "none";
    document.getElementById("authModalLabel").textContent      = "Profil";
    document.getElementById("profileUsername").textContent     = JSON.parse(user).felhasznalonev;
  } else {
    // Bejelentkezés mutatása
    document.getElementById("profileSection").style.display    = "none";
    document.getElementById("loginSection").style.display      = "block";
    document.getElementById("registerSection").style.display   = "none";
    document.getElementById("authModalLabel").textContent      = "Bejelentkezés";
  }
  authModal.show();
});

document.addEventListener("DOMContentLoaded", async function () {
  // -------------------------------
  // 1) Exkluzív termékadatok betöltése
  // -------------------------------
  const params = new URLSearchParams(window.location.search);
  const exId = params.get("id");
  if (!exId) {
    alert("Hiba: nem található exkluzív termék azonosító.");
    return;
  }

  try {
    const res = await fetch(`/api/exkluziv_cipok/${exId}`);
    const data = await res.json();
    if (data.error) {
      console.error(data.error);
      return;
    }
    // Alapadatok
    document.getElementById("product-brand").textContent   = data.marka;
    document.getElementById("product-name").textContent    = data.modell;
    document.getElementById("product-price").textContent   =
      `${Number(data.ar).toLocaleString("hu-HU")} Ft`;
    document.getElementById("product-description").textContent = data.leiras || "";

    // Galéria
    const mainImg = document.getElementById("main-image");
    const gallery = document.getElementById("image-gallery");
    gallery.innerHTML = "";
    mainImg.src = "no-image.png";
    if (data.kep) {
      const imgs = data.kep.split(",");
      mainImg.src = `/cipok/${imgs[0].trim()}`;
      imgs.forEach(src => {
        const imgEl = document.createElement("img");
        imgEl.src = `/cipok/${src.trim()}`;
        imgEl.className = "small";
        imgEl.style.cursor = "pointer";
        imgEl.addEventListener("click", () => mainImg.src = imgEl.src);
        gallery.appendChild(imgEl);
      });
    }

    // Méretek
    const resM = await fetch(`/api/exkluziv_cipok/${exId}/meretek`);
    const meretek = await resM.json();
    const sizeBox = document.getElementById("size-options");
    sizeBox.innerHTML = "";
    if (Array.isArray(meretek) && meretek.length) {
      meretek.forEach(m => {
        const btn = document.createElement("button");
        btn.className = "size-option";
        btn.textContent = m.meret_id;
        btn.addEventListener("click", () => {
          document.querySelectorAll(".size-option").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          document.getElementById("selected-size").textContent = m.meret_id;
        });
        sizeBox.appendChild(btn);
      });
    } else {
      sizeBox.textContent = "Nincsenek méretek.";
    }

    // Ár történelem
    loadPriceHistory(exId);

  } catch (err) {
    console.error("Betöltési hiba:", err);
  }

  // -------------------------------
  // 2) Kosárba rakás
  // -------------------------------
  document.getElementById("addToCartBtn").addEventListener("click", () => {
    const size = document.getElementById("selected-size").textContent;
    const qty  = parseInt(document.getElementById("quantity").value, 10);
    if (!size) {
      alert("Kérlek, válassz méretet!");
      return;
    }
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({
      id: exId,
      modell: document.getElementById("product-name").textContent,
      size,
      qty,
      price: parseInt(document.getElementById("product-price").textContent.replace(/\D/g, ""), 10),
      type: "exkluziv"
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Termék hozzáadva a kosárhoz!");
  });

  // -------------------------------
  // 3) Mennyiség kezelése
  // -------------------------------
  document.getElementById("quantity").value = 1;

  // -------------------------------------------------
  // 4) Keresőpanel
  // -------------------------------------------------
  const openSearchBtn   = document.getElementById("openSearch");
  const sideSearch      = document.getElementById("sideSearch");
  const closeSideSearch = document.getElementById("closeSideSearch");
  const searchOverlay   = document.getElementById("searchOverlay");
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
  document.getElementById("sideSearchInput").addEventListener("keyup", async function() {
    const query = this.value.trim();
    const results = document.getElementById("sideSearchResults");
    results.innerHTML = "";
    if (!query) return;
    try {
      const res = await fetch(`/api/cipok/search?query=${encodeURIComponent(query)}`);
      const arr = await res.json();
      if (!arr.length) {
        results.innerHTML = "<p>Nincs találat.</p>";
        return;
      }
      arr.forEach(i => {
        const div = document.createElement("div");
        div.className = "search-result-item d-flex align-items-center mb-2";
        div.style.cursor = "pointer";
        const img = document.createElement("img");
        img.src = i.kep ? `/cipok/${i.kep.split(",")[0].trim()}` : "no-image.png";
        img.style.width = "50px";
        img.style.height = "50px";
        img.style.objectFit = "cover";
        img.className = "me-2";
        const txt = document.createElement("div");
        txt.innerHTML = `<h6 class="mb-0">${i.marka} ${i.modell}</h6>`;
        div.append(img, txt);
        div.addEventListener("click", () => {
          window.location.href = `product.html?id=${i.cipo_id}`;
        });
        results.appendChild(div);
      });
    } catch (e) {
      console.error("Keresési hiba:", e);
      results.innerHTML = "<p>Hiba történt a keresés során.</p>";
    }
  });

  // -------------------------------------------------
  // 5) Kosárpanel és Fizetés
  // -------------------------------------------------
  const openCartBtn  = document.getElementById("openCart");
  const cartModalEl  = document.getElementById("cartModal");
  const closeCartBtn = document.querySelector(".cart-close-btn");
  const clearCartBtn = document.getElementById("clear-cart");
  const paymentBtn   = document.getElementById("paymentBtn");

  openCartBtn.addEventListener("click", () => {
    displayCart();
    checkCartForPayment();
    cartModalEl.classList.add("active");
  });
  closeCartBtn.addEventListener("click", () => cartModalEl.classList.remove("active"));
  clearCartBtn.addEventListener("click", () => {
    localStorage.removeItem("cart");
    displayCart();
    alert("A kosár kiürítve.");
    checkCartForPayment();
  });
  paymentBtn.addEventListener("click", () => {
    const user = localStorage.getItem("loggedInUser");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!user) {
      document.getElementById("loginSection").style.display = "block";
      document.getElementById("registerSection").style.display = "none";
      document.getElementById("authModalLabel").textContent = "Bejelentkezés";
      authModal.show();
      return;
    }
    if (!cart.length) {
      alert("A kosár üres!");
      return;
    }
    localStorage.removeItem("cart");
    displayCart();
    checkCartForPayment();
    document.getElementById("paymentModal").style.display = "block";
  });
  document.getElementById("closePaymentModal").addEventListener("click", () => {
    document.getElementById("paymentModal").style.display = "none";
  });

  // -------------------------------------------------
  // 6) Login / Register formok
  // -------------------------------------------------
  document.getElementById("showRegister").addEventListener("click", () => {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("registerSection").style.display = "block";
    document.getElementById("authModalLabel").textContent = "Regisztráció";
  });
  document.getElementById("showLogin").addEventListener("click", () => {
    document.getElementById("registerSection").style.display = "none";
    document.getElementById("loginSection").style.display = "block";
    document.getElementById("authModalLabel").textContent = "Bejelentkezés";
  });

  document.getElementById("loginForm").addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const pwd   = document.getElementById("loginPassword").value;
    fetch("http://localhost:5000/api/felhasznalok/login", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ email, jelszo_hash: pwd })
    })
    .then(r => r.json())
    .then(data => {
      if (data.success) {
        localStorage.setItem("loggedInUser", JSON.stringify(data.user));
        authModal.hide();
        alert("Sikeres bejelentkezés!");
      } else {
        alert("Hibás email vagy jelszó!");
      }
    });
  });

  document.getElementById("registerForm").addEventListener("submit", e => {
    e.preventDefault();
    const first = document.getElementById("registerFirstName").value;
    const last  = document.getElementById("registerLastName").value;
    const email = document.getElementById("registerEmail").value;
    const pwd   = document.getElementById("registerPassword").value;
    fetch("http://localhost:5000/api/felhasznalok", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({
        vezeteknev: last,
        keresztnev: first,
        felhasznalonev: email.split("@")[0],
        email,
        jelszo_hash: pwd
      })
    })
    .then(r => r.json())
    .then(data => {
      if (data.success) {
        alert("Sikeres regisztráció! Most már bejelentkezhetsz.");
        document.getElementById("registerSection").style.display = "none";
        document.getElementById("loginSection").style.display    = "block";
        document.getElementById("authModalLabel").textContent    = "Bejelentkezés";
      } else {
        alert("Regisztrációs hiba: " + data.error);
      }
    });
  });

});

// -------------------------------------------------------------
// Helper függvények
// -------------------------------------------------------------
function displayCart() {
  const cont = document.getElementById("cartItems");
  const cart = JSON.parse(localStorage.getItem("cart"))||[];
  cont.innerHTML = "";
  document.getElementById("cartEmptyText").style.display = cart.length ? "none" : "block";
  cart.forEach(item => {
    const div = document.createElement("div");
    div.innerHTML = `<strong>${item.modell}</strong> – Méret: ${item.size} – Menny.: ${item.qty}`;
    cont.appendChild(div);
  });
}

function checkCartForPayment() {
  const cart = JSON.parse(localStorage.getItem("cart"))||[];
  document.getElementById("paymentBtn").disabled = !cart.length;
}

async function loadPriceHistory(id) {
  try {
    const res  = await fetch(`/api/exkluziv_cipok/${id}/arvaltozas`);
    const data = await res.json();
    if (!data.length) throw new Error();
    const labels = data.map(e=>new Date(e.datum).toLocaleDateString("hu-HU"));
    const vals   = data.map(e=>e.ar);
    let minP = Math.min(...vals), maxP = Math.max(...vals);
    if (minP===maxP) maxP++;
    const ctx = document.getElementById("priceChart").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: { labels, datasets:[{ label:"Árváltozás", data:vals, borderColor:"#000", backgroundColor:"rgba(0,0,0,0.1)", fill:true }] },
      options:{ responsive:true, maintainAspectRatio:false, scales:{ y:{ min:minP, max:maxP } } }
    });
    const tbl = document.createElement("table");
    tbl.className = "table table-striped mt-3";
    tbl.innerHTML = `<thead><tr><th>Dátum</th><th>Ár (Ft)</th></tr></thead>`;
    const tb = document.createElement("tbody");
    data.forEach(e=>{
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${new Date(e.datum).toLocaleDateString("hu-HU")}</td>
                      <td>${Number(e.ar).toLocaleString("hu-HU")} Ft</td>`;
      tb.appendChild(tr);
    });
    tbl.appendChild(tb);
    const container = document.getElementById("priceTableContainer");
    container.innerHTML = "";
    container.appendChild(tbl);
  } catch {
    document.getElementById("price-history-container").innerHTML = "<p>Nincs elérhető ár történelem.</p>";
  }
}
