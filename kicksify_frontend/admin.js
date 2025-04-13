// admin.js

document.addEventListener("DOMContentLoaded", () => {
  // Navigációs tabok kezelése
  const tabs = document.querySelectorAll("#adminTabs .nav-link");
  tabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const selectedTab = tab.dataset.tab;
      if (selectedTab === "users") {
        loadUsersSection();
      } else if (selectedTab === "cipok") {
        loadCipokSection();
      } else if (selectedTab === "exkluziv") {
        loadExkluzivSection();
      }
    });
  });
  // Alapesetben a felhasználók szekciójának betöltése
  loadUsersSection();
});

/* =====================================
   FELHASZNÁLÓK SZEKCIÓ
===================================== */
async function loadUsersSection() {
  const tabContent = document.getElementById("tabContent");
  tabContent.innerHTML = `
    <h2>Felhasználók</h2>
    <div id="usersTableContainer"></div>
    <hr>
    <h3>Új Felhasználó Hozzáadása</h3>
    <form id="addUserForm" class="mb-4">
      <div class="mb-3">
        <label for="vezeteknev" class="form-label">Vezetéknév</label>
        <input type="text" id="vezeteknev" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="keresztnev" class="form-label">Keresztnév</label>
        <input type="text" id="keresztnev" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="felhasznalonev" class="form-label">Felhasználónév</label>
        <input type="text" id="felhasznalonev" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" id="email" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="jelszo" class="form-label">Jelszó</label>
        <input type="password" id="jelszo" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="szerep" class="form-label">Szerep</label>
        <select id="szerep" class="form-select">
          <option value="Vásárló">Vásárló</option>
          <option value="Adminisztrátor">Adminisztrátor</option>
          <option value="Raktáros">Raktáros</option>
          <option value="Bolti eladó">Bolti eladó</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Felhasználó hozzáadása</button>
    </form>
  `;

  try {
    const res = await fetch("/api/felhasznalok");
    const users = await res.json();
    renderUsersTable(users);
  } catch (err) {
    console.error("Felhasználók betöltése hiba:", err);
  }

  document.getElementById("addUserForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const newUser = {
      vezeteknev: document.getElementById("vezeteknev").value.trim(),
      keresztnev: document.getElementById("keresztnev").value.trim(),
      felhasznalonev: document.getElementById("felhasznalonev").value.trim(),
      email: document.getElementById("email").value.trim(),
      jelszo_hash: document.getElementById("jelszo").value,
      szerep: document.getElementById("szerep").value
    };

    try {
      const res = await fetch("/api/felhasznalok", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
      });
      const data = await res.json();
      if (data.success) {
        alert("Felhasználó hozzáadva!");
        loadUsersSection();
      } else {
        alert("Hiba történt a felhasználó hozzáadásakor.");
      }
    } catch (err) {
      console.error("Felhasználó hozzáadása hiba:", err);
    }
  });
}

function renderUsersTable(users) {
  const container = document.getElementById("usersTableContainer");
  if (!users.length) {
    container.innerHTML = "<p>Nincs felhasználó.</p>";
    return;
  }
  let html = `
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Vezetéknév</th>
          <th>Keresztnév</th>
          <th>Felhasználónév</th>
          <th>Email</th>
          <th>Szerep</th>
          <th>Műveletek</th>
        </tr>
      </thead>
      <tbody>
  `;
  users.forEach(user => {
    html += `
      <tr data-id="${user.felhasznalo_id}">
        <td>${user.felhasznalo_id}</td>
        <td>${user.vezeteknev}</td>
        <td>${user.keresztnev}</td>
        <td>${user.felhasznalonev}</td>
        <td>${user.email}</td>
        <td>${user.szerep}</td>
        <td>
          <button class="btn btn-sm btn-secondary editUserBtn">Szerkesztés</button>
          <button class="btn btn-sm btn-danger deleteUserBtn">Törlés</button>
        </td>
      </tr>
    `;
  });
  html += `</tbody></table>`;
  container.innerHTML = html;

  // Törlés gomb
  document.querySelectorAll(".deleteUserBtn").forEach(btn => {
    btn.addEventListener("click", async (e) => {
      const row = e.target.closest("tr");
      const userId = row.dataset.id;
      if (!confirm("Biztos törlöd ezt a felhasználót?")) return;
      try {
        const res = await fetch(`/api/felhasznalok/${userId}`, { method: "DELETE" });
        const data = await res.json();
        if (data.success) {
          alert("Felhasználó törölve!");
          loadUsersSection();
        } else {
          alert("Hiba történt a törlés során.");
        }
      } catch (err) {
        console.error("Felhasználó törlése hiba:", err);
      }
    });
  });

  // Szerkesztés gomb – inline űrlap megjelenítése
  document.querySelectorAll(".editUserBtn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const row = e.target.closest("tr");
      const userId = row.dataset.id;
      // Olvassuk ki az aktuális adatokat
      const vezeteknev = row.children[1].textContent;
      const keresztnev = row.children[2].textContent;
      const felhasznalonev = row.children[3].textContent;
      const email = row.children[4].textContent;
      const szerep = row.children[5].textContent;
      openEditUserForm(userId, { vezeteknev, keresztnev, felhasznalonev, email, szerep });
    });
  });
}

function openEditUserForm(userId, data) {
  const row = document.querySelector(`tr[data-id="${userId}"]`);
  const oldForm = document.getElementById(`editUserForm-${userId}`);
  if (oldForm) oldForm.remove();

  const formRow = document.createElement("tr");
  formRow.id = `editUserForm-${userId}`;
  formRow.innerHTML = `
    <td colspan="7">
      <form>
        <div class="row g-2">
          <div class="col-md-2">
            <input type="text" name="vezeteknev" class="form-control" placeholder="Vezetéknév" value="${data.vezeteknev}" required>
          </div>
          <div class="col-md-2">
            <input type="text" name="keresztnev" class="form-control" placeholder="Keresztnév" value="${data.keresztnev}" required>
          </div>
          <div class="col-md-2">
            <input type="text" name="felhasznalonev" class="form-control" placeholder="Felhasználónév" value="${data.felhasznalonev}" required>
          </div>
          <div class="col-md-2">
            <input type="email" name="email" class="form-control" placeholder="Email" value="${data.email}" required>
          </div>
          <div class="col-md-2">
            <select name="szerep" class="form-select" required>
              <option ${data.szerep==="Vásárló"?"selected":""} value="Vásárló">Vásárló</option>
              <option ${data.szerep==="Adminisztrátor"?"selected":""} value="Adminisztrátor">Adminisztrátor</option>
              <option ${data.szerep==="Raktáros"?"selected":""} value="Raktáros">Raktáros</option>
              <option ${data.szerep==="Bolti eladó"?"selected":""} value="Bolti eladó">Bolti eladó</option>
            </select>
          </div>
          <div class="col-md-2">
            <button type="submit" class="btn btn-sm btn-success">Mentés</button>
          </div>
        </div>
      </form>
    </td>
  `;
  row.parentNode.insertBefore(formRow, row.nextSibling);
  
  formRow.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updated = {
      vezeteknev: formData.get("vezeteknev").trim(),
      keresztnev: formData.get("keresztnev").trim(),
      felhasznalonev: formData.get("felhasznalonev").trim(),
      email: formData.get("email").trim(),
      szerep: formData.get("szerep")
    };
    try {
      const res = await fetch(`/api/felhasznalok/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
      });
      const data = await res.json();
      if (data.success) {
        alert("Felhasználó frissítve!");
        loadUsersSection();
      } else {
        alert("Hiba történt a frissítés során.");
      }
    } catch (err) {
      console.error("Felhasználó frissítése hiba:", err);
    }
  });
}

/* =====================================
   NORMÁL CIPŐK SZEKCIÓ
===================================== */
async function loadCipokSection() {
  const tabContent = document.getElementById("tabContent");
  tabContent.innerHTML = `
    <h2>Normál Cipők</h2>
    <div class="mb-3">
      <label for="filterMarca" class="form-label">Szűrés márka szerint:</label>
      <input type="text" id="filterMarca" class="form-control" placeholder="Pl. Nike">
    </div>
    <div id="cipokTableContainer"></div>
    <hr>
    <h3>Új Cipő Hozzáadása</h3>
    <form id="addCipoForm" class="mb-4">
      <div class="mb-3">
        <label for="marka" class="form-label">Márka</label>
        <input type="text" id="marka" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="modell" class="form-label">Modell</label>
        <input type="text" id="modell" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="ar" class="form-label">Ár</label>
        <input type="number" step="0.01" id="ar" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="leiras" class="form-label">Leírás</label>
        <textarea id="leiras" class="form-control" rows="3" required></textarea>
      </div>
      <div class="mb-3">
        <label for="kep" class="form-label">Képek (vesszővel elválasztva)</label>
        <input type="text" id="kep" class="form-control" placeholder="pl.: kep1.jpg,kep2.jpg,kep3.jpg">
      </div>
      <button type="submit" class="btn btn-primary">Cipő hozzáadása</button>
    </form>
  `;
  try {
    const res = await fetch("/api/cipok");
    let cipok = await res.json();
    const filterInput = document.getElementById("filterMarca");
    filterInput.addEventListener("input", () => {
      const filterValue = filterInput.value.trim().toLowerCase();
      const filtered = cipok.filter(cipo => cipo.marka.toLowerCase().includes(filterValue));
      renderCipokTable(filtered);
    });
    renderCipokTable(cipok);
  } catch (err) {
    console.error("Cipők betöltése hiba:", err);
  }
  document.getElementById("addCipoForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const newCipo = {
      marka: document.getElementById("marka").value.trim(),
      modell: document.getElementById("modell").value.trim(),
      ar: parseFloat(document.getElementById("ar").value),
      leiras: document.getElementById("leiras").value.trim(),
      kep: document.getElementById("kep").value.trim() || "default.jpg"
    };
    try {
      const res = await fetch("/api/cipok", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCipo)
      });
      const data = await res.json();
      if (data.success) {
        alert("Cipő hozzáadva!");
        loadCipokSection();
      } else {
        alert("Hiba történt a cipő hozzáadásakor.");
      }
    } catch (err) {
      console.error("Cipő hozzáadása hiba:", err);
    }
  });
}

function renderCipokTable(cipok) {
  const container = document.getElementById("cipokTableContainer");
  if (!cipok.length) {
    container.innerHTML = "<p>Nincs cipő.</p>";
    return;
  }
  let html = `
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Márka</th>
          <th>Modell</th>
          <th>Ár</th>
          <th>Leírás</th>
          <th>Képek</th>
          <th>Műveletek</th>
        </tr>
      </thead>
      <tbody>
  `;
  cipok.forEach(cipo => {
    // Képek: vesszővel elválasztott képek listázása
    const kepLista = cipo.kep.split(",").map(nev =>
      `<img src="/cipok/${nev.trim()}" alt="${cipo.modell}" style="max-width:60px; margin-right:5px;">`
    ).join("");
    html += `
      <tr data-id="${cipo.cipo_id}">
        <td>${cipo.cipo_id}</td>
        <td>${cipo.marka}</td>
        <td>${cipo.modell}</td>
        <td>${cipo.ar}</td>
        <td>${cipo.leiras.substring(0, 50)}...</td>
        <td>${kepLista}</td>
        <td>
          <button class="btn btn-sm btn-secondary editCipoBtn">Szerkesztés</button>
          <button class="btn btn-sm btn-info toggleDetailsBtn">Részletek</button>
          <button class="btn btn-sm btn-danger deleteCipoBtn">Törlés</button>
        </td>
      </tr>
    `;
  });
  html += `</tbody></table>`;
  container.innerHTML = html;

  // Törlés
  document.querySelectorAll(".deleteCipoBtn").forEach(btn => {
    btn.addEventListener("click", async (e) => {
      const row = e.target.closest("tr");
      const cipoId = row.dataset.id;
      if (!confirm("Biztos törlöd ezt a cipőt?")) return;
      try {
        const res = await fetch(`/api/cipok/${cipoId}`, { method: "DELETE" });
        const data = await res.json();
        if (data.success) {
          alert("Cipő törölve!");
          loadCipokSection();
        } else {
          alert("Hiba történt a törlés során.");
        }
      } catch (err) {
        console.error("Cipő törlése hiba:", err);
      }
    });
  });

  // Szerkesztés
  document.querySelectorAll(".editCipoBtn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const row = e.target.closest("tr");
      const cipoId = row.dataset.id;
      const marka = row.children[1].textContent;
      const modell = row.children[2].textContent;
      const ar = row.children[3].textContent;
      const leirasPreview = row.children[4].textContent;
      const kep = row.children[5].textContent;
      openEditCipoForm(cipoId, { marka, modell, ar, leiras: leirasPreview, kep });
    });
  });
  
  // Részletek (méretek és ártörténet) megjelenítése
  document.querySelectorAll(".toggleDetailsBtn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const row = e.target.closest("tr");
      const cipoId = row.dataset.id;
      toggleCipoDetails(cipoId, row);
    });
  });
}

function openEditCipoForm(cipoId, data) {
  const row = document.querySelector(`tr[data-id="${cipoId}"]`);
  const oldForm = document.getElementById(`editCipoForm-${cipoId}`);
  if (oldForm) oldForm.remove();

  const formRow = document.createElement("tr");
  formRow.id = `editCipoForm-${cipoId}`;
  formRow.innerHTML = `
    <td colspan="7">
      <form>
        <div class="row g-2">
          <div class="col-md-2">
            <input type="text" name="marka" class="form-control" placeholder="Márka" value="${data.marka}" required>
          </div>
          <div class="col-md-2">
            <input type="text" name="modell" class="form-control" placeholder="Modell" value="${data.modell}" required>
          </div>
          <div class="col-md-1">
            <input type="number" step="0.01" name="ar" class="form-control" placeholder="Ár" value="${data.ar}" required>
          </div>
          <div class="col-md-3">
            <input type="text" name="kep" class="form-control" placeholder="Képek (vesszővel)" value="${data.kep}" required>
          </div>
          <div class="col-md-3">
            <input type="text" name="leiras" class="form-control" placeholder="Leírás" value="${data.leiras}" required>
          </div>
          <div class="col-md-1">
            <button type="submit" class="btn btn-sm btn-success">Mentés</button>
          </div>
        </div>
      </form>
    </td>
  `;
  row.parentNode.insertBefore(formRow, row.nextSibling);

  formRow.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updated = {
      marka: formData.get("marka").trim(),
      modell: formData.get("modell").trim(),
      ar: parseFloat(formData.get("ar")),
      kep: formData.get("kep").trim(),
      leiras: formData.get("leiras").trim()
    };
    try {
      const res = await fetch(`/api/cipok/${cipoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
      });
      const data = await res.json();
      if (data.success) {
        alert("Cipő frissítve!");
        loadCipokSection();
      } else {
        alert("Hiba történt a frissítés során.");
      }
    } catch (err) {
      console.error("Cipő frissítése hiba:", err);
    }
  });
}

// Részletek megjelenítése egy normál cipőhöz: méretek és ártörténet
async function toggleCipoDetails(cipoId, baseRow) {
  // Ellenőrizzük, ha már van részlet sor (toggle)
  const existing = document.getElementById(`cipoDetails-${cipoId}`);
  if (existing) {
    existing.remove();
    return;
  }

  // Létrehozunk egy sort, amely két oszlopban jeleníti meg a méreteket és az ártörténetet
  const detailsRow = document.createElement("tr");
  detailsRow.id = `cipoDetails-${cipoId}`;
  detailsRow.innerHTML = `<td colspan="7">
    <div class="row">
      <div class="col-md-6" id="cipoSizes-${cipoId}">
        <h5>Méretek</h5>
        <div id="sizesList-${cipoId}"></div>
        <form id="addSizeForm-${cipoId}" class="mt-2">
          <div class="input-group">
            <input type="number" step="0.1" name="meret" class="form-control" placeholder="Új méret" required>
            <button type="submit" class="btn btn-sm btn-primary">Hozzáadás</button>
          </div>
        </form>
      </div>
      <div class="col-md-6" id="cipoPriceHistory-${cipoId}">
        <h5>Ártörténet</h5>
        <div id="priceHistoryList-${cipoId}"></div>
        <form id="addPriceForm-${cipoId}" class="mt-2">
          <div class="input-group">
            <input type="text" name="datum" class="form-control" placeholder="Dátum (YYYY-MM-DD HH:MM:SS)" required>
            <input type="number" step="0.01" name="ar" class="form-control" placeholder="Ár" required>
            <button type="submit" class="btn btn-sm btn-primary">Hozzáadás</button>
          </div>
        </form>
      </div>
    </div>
  </td>`;
  // Beszúrjuk közvetlenül a baseRow után
  baseRow.parentNode.insertBefore(detailsRow, baseRow.nextSibling);

  // Betöltjük a méreteket
  loadCipoSizes(cipoId);
  // Betöltjük az ártörténetet
  loadCipoPriceHistory(cipoId);

  // Új méret hozzáadása
  document.getElementById(`addSizeForm-${cipoId}`).addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const meret = parseFloat(formData.get("meret"));
    try {
      const res = await fetch("/api/meretek", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cipo_id: parseInt(cipoId), meret })
      });
      const data = await res.json();
      if (data.success) {
        alert("Méretegység hozzáadva!");
        loadCipoSizes(cipoId);
      } else {
        alert("Hiba történt a méret hozzáadásakor.");
      }
    } catch (err) {
      console.error("Méretegység hozzáadása hiba:", err);
    }
  });

  // Új ártörténet hozzáadása
  document.getElementById(`addPriceForm-${cipoId}`).addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const datum = formData.get("datum").trim();
    const ar = parseFloat(formData.get("ar"));
    try {
      // Feltételezzük, hogy normál cipők esetén a POST /api/arvaltozas használható, 
      // küldjük a cipo_id-t is (a backendnek úgy kell beillesztenie, hogy exkluziv_id = NULL)
      const res = await fetch("/api/arvaltozas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cipo_id: parseInt(cipoId), datum, ar })
      });
      const data = await res.json();
      if (data.success) {
        alert("Ártörténet bejegyzés hozzáadva!");
        loadCipoPriceHistory(cipoId);
      } else {
        alert("Hiba történt az ár bejegyzés hozzáadásakor.");
      }
    } catch (err) {
      console.error("Ártörténet hozzáadása hiba:", err);
    }
  });
}

async function loadCipoSizes(cipoId) {
  try {
    const res = await fetch(`/api/cipok/${cipoId}/meretek`);
    const sizes = await res.json();
    const listContainer = document.getElementById(`sizesList-${cipoId}`);
    if (!sizes.length) {
      listContainer.innerHTML = "<p>Nincsenek méretek.</p>";
      return;
    }
    let html = `<ul class="list-group">`;
    sizes.forEach(size => {
      html += `<li class="list-group-item d-flex justify-content-between align-items-center">
        ${size.meret}
        <button class="btn btn-sm btn-danger deleteSizeBtn" data-sizeid="${size.meret_id}">Törlés</button>
      </li>`;
    });
    html += "</ul>";
    listContainer.innerHTML = html;
    // Törlés gombok a méreteknél
    document.querySelectorAll(`#sizesList-${cipoId} .deleteSizeBtn`).forEach(btn => {
      btn.addEventListener("click", async (e) => {
        const meretId = e.target.dataset.sizeid;
        if (!confirm("Biztos törlöd ezt a méretet?")) return;
        try {
          const res = await fetch(`/api/meretek/${meretId}`, { method: "DELETE" });
          const data = await res.json();
          if (data.success) {
            alert("Méret törölve!");
            loadCipoSizes(cipoId);
          } else {
            alert("Hiba történt a törlés során.");
          }
        } catch (err) {
          console.error("Méret törlése hiba:", err);
        }
      });
    });
  } catch (err) {
    console.error("Méretek betöltése hiba:", err);
  }
}

async function loadCipoPriceHistory(cipoId) {
  try {
    const res = await fetch(`/api/cipok/${cipoId}/arvaltozas`);
    const history = await res.json();
    const listContainer = document.getElementById(`priceHistoryList-${cipoId}`);
    if (!history.length) {
      listContainer.innerHTML = "<p>Nincs ártörténet.</p>";
      return;
    }
    let html = `<ul class="list-group">`;
    history.forEach(rec => {
      html += `<li class="list-group-item d-flex justify-content-between align-items-center">
        ${rec.datum} - ${rec.ar}
        <button class="btn btn-sm btn-danger deletePriceBtn" data-priceid="${rec.arvaltozas_id}">Törlés</button>
      </li>`;
    });
    html += "</ul>";
    listContainer.innerHTML = html;
    // Törlés az ártörténetben
    document.querySelectorAll(`#priceHistoryList-${cipoId} .deletePriceBtn`).forEach(btn => {
      btn.addEventListener("click", async (e) => {
        const priceId = e.target.dataset.priceid;
        if (!confirm("Biztos törlöd ezt az ártörténeti bejegyzést?")) return;
        try {
          const res = await fetch(`/api/arvaltozas/${priceId}`, { method: "DELETE" });
          const data = await res.json();
          if (data.success) {
            alert("Ártörténeti bejegyzés törölve!");
            loadCipoPriceHistory(cipoId);
          } else {
            alert("Hiba történt a törlés során.");
          }
        } catch (err) {
          console.error("Ártörténet törlése hiba:", err);
        }
      });
    });
  } catch (err) {
    console.error("Ártörténet betöltése hiba:", err);
  }
}

/* ======================================
   EXKLUZÍV CIPŐK SZEKCIÓ
======================================== */
async function loadExkluzivSection() {
  const tabContent = document.getElementById("tabContent");
  tabContent.innerHTML = `
    <h2>Exkluzív Cipők</h2>
    <div id="exkluzivTableContainer"></div>
    <hr>
    <h3>Új Exkluzív Cipő Hozzáadása</h3>
    <form id="addExkluzivForm" class="mb-4">
      <div class="mb-3">
        <label for="ex_szin" class="form-label">Szín</label>
        <input type="text" id="ex_szin" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="ex_cikkszam" class="form-label">Cikkszám</label>
        <input type="text" id="ex_cikkszam" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="ex_marka" class="form-label">Márka</label>
        <input type="text" id="ex_marka" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="ex_modell" class="form-label">Modell</label>
        <input type="text" id="ex_modell" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="ex_ar" class="form-label">Ár</label>
        <input type="number" step="0.01" id="ex_ar" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="ex_leiras" class="form-label">Leírás</label>
        <textarea id="ex_leiras" class="form-control" rows="3" required></textarea>
      </div>
      <div class="mb-3">
        <label for="ex_kep" class="form-label">Képek (vesszővel elválasztva, akár 3)</label>
        <input type="text" id="ex_kep" class="form-control" placeholder="pl.: ex1.jpg, ex2.jpg, ex3.jpg">
      </div>
      <button type="submit" class="btn btn-primary">Exkluzív Cipő hozzáadása</button>
    </form>
  `;
  try {
    const res = await fetch("/api/exkluziv_cipok");
    const exCipok = await res.json();
    renderExkluzivTable(exCipok);
  } catch (err) {
    console.error("Exkluzív cipők betöltése hiba:", err);
  }
  document.getElementById("addExkluzivForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const newEx = {
      szin: document.getElementById("ex_szin").value.trim(),
      cikkszam: document.getElementById("ex_cikkszam").value.trim(),
      marka: document.getElementById("ex_marka").value.trim(),
      modell: document.getElementById("ex_modell").value.trim(),
      ar: parseFloat(document.getElementById("ex_ar").value),
      leiras: document.getElementById("ex_leiras").value.trim(),
      kep: document.getElementById("ex_kep").value.trim() || "default.jpg"
    };
    try {
      const res = await fetch("/api/exkluziv_cipok", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEx)
      });
      const data = await res.json();
      if (data.success) {
        alert("Exkluzív cipő hozzáadva!");
        loadExkluzivSection();
      } else {
        alert("Hiba történt az exkluzív cipő hozzáadásakor.");
      }
    } catch (err) {
      console.error("Exkluzív cipő hozzáadása hiba:", err);
    }
  });
}

function renderExkluzivTable(exCipok) {
  const container = document.getElementById("exkluzivTableContainer");
  if (!exCipok.length) {
    container.innerHTML = "<p>Nincs exkluzív cipő.</p>";
    return;
  }
  let html = `
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Szín</th>
          <th>Cikkszám</th>
          <th>Márka</th>
          <th>Modell</th>
          <th>Ár</th>
          <th>Leírás</th>
          <th>Képek</th>
          <th>Műveletek</th>
        </tr>
      </thead>
      <tbody>
  `;
  exCipok.forEach(item => {
    const kepLista = item.kep.split(",").map(nev =>
      `<img src="/cipok/${nev.trim()}" alt="${item.modell}" style="max-width:60px; margin-right:5px;">`
    ).join("");
    html += `
      <tr data-id="${item.exkluziv_id}">
        <td>${item.exkluziv_id}</td>
        <td>${item.szin}</td>
        <td>${item.cikkszam}</td>
        <td>${item.marka}</td>
        <td>${item.modell}</td>
        <td>${item.ar}</td>
        <td>${item.leiras.substring(0, 50)}...</td>
        <td>${kepLista}</td>
        <td>
          <button class="btn btn-sm btn-secondary editExBtn">Szerkesztés</button>
          <button class="btn btn-sm btn-info toggleExDetailsBtn">Részletek</button>
          <button class="btn btn-sm btn-danger deleteExBtn">Törlés</button>
        </td>
      </tr>
    `;
  });
  html += `</tbody></table>`;
  container.innerHTML = html;

  // Törlés
  document.querySelectorAll(".deleteExBtn").forEach(btn => {
    btn.addEventListener("click", async (e) => {
      const row = e.target.closest("tr");
      const exId = row.dataset.id;
      if (!confirm("Biztos törlöd ezt az exkluzív cipőt?")) return;
      try {
        const res = await fetch(`/api/exkluziv_cipok/${exId}`, { method: "DELETE" });
        const data = await res.json();
        if (data.success) {
          alert("Exkluzív cipő törölve!");
          loadExkluzivSection();
        } else {
          alert("Hiba történt a törlés során.");
        }
      } catch (err) {
        console.error("Exkluzív cipő törlése hiba:", err);
      }
    });
  });

  // Szerkesztés
  document.querySelectorAll(".editExBtn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const row = e.target.closest("tr");
      const exId = row.dataset.id;
      const szin = row.children[1].textContent;
      const cikkszam = row.children[2].textContent;
      const marka = row.children[3].textContent;
      const modell = row.children[4].textContent;
      const ar = row.children[5].textContent;
      const leirasPreview = row.children[6].textContent;
      const kep = row.children[7].textContent;
      openEditExForm(exId, { szin, cikkszam, marka, modell, ar, leiras: leirasPreview, kep });
    });
  });
  
  // Részletek megjelenítése exkluzív cipőhöz
  document.querySelectorAll(".toggleExDetailsBtn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const row = e.target.closest("tr");
      const exId = row.dataset.id;
      toggleExDetails(exId, row);
    });
  });
}

function openEditExForm(exId, data) {
  const row = document.querySelector(`tr[data-id="${exId}"]`);
  const oldForm = document.getElementById(`editExForm-${exId}`);
  if (oldForm) oldForm.remove();

  const formRow = document.createElement("tr");
  formRow.id = `editExForm-${exId}`;
  formRow.innerHTML = `
    <td colspan="9">
      <form>
        <div class="row g-2">
          <div class="col-md-1">
            <input type="text" name="szin" class="form-control" placeholder="Szín" value="${data.szin}" required>
          </div>
          <div class="col-md-1">
            <input type="text" name="cikkszam" class="form-control" placeholder="Cikkszám" value="${data.cikkszam}" required>
          </div>
          <div class="col-md-2">
            <input type="text" name="marka" class="form-control" placeholder="Márka" value="${data.marka}" required>
          </div>
          <div class="col-md-2">
            <input type="text" name="modell" class="form-control" placeholder="Modell" value="${data.modell}" required>
          </div>
          <div class="col-md-1">
            <input type="number" step="0.01" name="ar" class="form-control" placeholder="Ár" value="${data.ar}" required>
          </div>
          <div class="col-md-3">
            <input type="text" name="kep" class="form-control" placeholder="Képek (vesszővel)" value="${data.kep}" required>
          </div>
          <div class="col-md-2">
            <input type="text" name="leiras" class="form-control" placeholder="Leírás" value="${data.leiras}" required>
          </div>
          <div class="col-md-1">
            <button type="submit" class="btn btn-sm btn-success">Mentés</button>
          </div>
        </div>
      </form>
    </td>
  `;
  row.parentNode.insertBefore(formRow, row.nextSibling);
  
  formRow.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updated = {
      szin: formData.get("szin").trim(),
      cikkszam: formData.get("cikkszam").trim(),
      marka: formData.get("marka").trim(),
      modell: formData.get("modell").trim(),
      ar: parseFloat(formData.get("ar")),
      kep: formData.get("kep").trim(),
      leiras: formData.get("leiras").trim()
    };
    try {
      const res = await fetch(`/api/exkluziv_cipok/${exId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
      });
      const data = await res.json();
      if (data.success) {
        alert("Exkluzív cipő frissítve!");
        loadExkluzivSection();
      } else {
        alert("Hiba történt a frissítés során.");
      }
    } catch (err) {
      console.error("Exkluzív cipő frissítése hiba:", err);
    }
  });
}

// Részletek exkluzív cipőhöz: méretek és ártörténet
async function toggleExDetails(exId, baseRow) {
  const existing = document.getElementById(`exDetails-${exId}`);
  if (existing) {
    existing.remove();
    return;
  }
  const detailsRow = document.createElement("tr");
  detailsRow.id = `exDetails-${exId}`;
  detailsRow.innerHTML = `<td colspan="9">
    <div class="row">
      <div class="col-md-6" id="exSizes-${exId}">
        <h5>Méretek</h5>
        <div id="exSizesList-${exId}"></div>
        <form id="addExSizeForm-${exId}" class="mt-2">
          <div class="input-group">
            <input type="number" step="0.1" name="meret" class="form-control" placeholder="Új méret" required>
            <button type="submit" class="btn btn-sm btn-primary">Hozzáadás</button>
          </div>
        </form>
      </div>
      <div class="col-md-6" id="exPriceHistory-${exId}">
        <h5>Ártörténet</h5>
        <div id="exPriceHistoryList-${exId}"></div>
        <form id="addExPriceForm-${exId}" class="mt-2">
          <div class="input-group">
            <input type="text" name="datum" class="form-control" placeholder="Dátum (YYYY-MM-DD HH:MM:SS)" required>
            <input type="number" step="0.01" name="ar" class="form-control" placeholder="Ár" required>
            <button type="submit" class="btn btn-sm btn-primary">Hozzáadás</button>
          </div>
        </form>
      </div>
    </div>
  </td>`;
  baseRow.parentNode.insertBefore(detailsRow, baseRow.nextSibling);

  // Betöltjük az exkluzív méreteket
  loadExSizes(exId);
  // Betöltjük az exkluzív ártörténetet
  loadExPriceHistory(exId);

  // Új méret hozzáadása exkluzív cipőhöz
  document.getElementById(`addExSizeForm-${exId}`).addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const meret = parseFloat(formData.get("meret"));
    try {
      const res = await fetch(`/api/exkluziv_cipok/${exId}/meretek`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ meret, keszlet: 0 })
      });
      const data = await res.json();
      if (data.success) {
        alert("Méret hozzáadva!");
        loadExSizes(exId);
      } else {
        alert("Hiba történt a méret hozzáadásakor.");
      }
    } catch (err) {
      console.error("Exkluzív méret hozzáadása hiba:", err);
    }
  });

  // Új ártörténet hozzáadása exkluzív cipőhöz
  document.getElementById(`addExPriceForm-${exId}`).addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const datum = formData.get("datum").trim();
    const ar = parseFloat(formData.get("ar"));
    try {
      const res = await fetch(`/api/exkluziv_cipok/${exId}/arvaltozas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ datum, ar })
      });
      const data = await res.json();
      if (data.success) {
        alert("Ártörténet bejegyzés hozzáadva!");
        loadExPriceHistory(exId);
      } else {
        alert("Hiba történt az ártörténet hozzáadásakor.");
      }
    } catch (err) {
      console.error("Exkluzív ártörténet hozzáadása hiba:", err);
    }
  });
}

async function loadExSizes(exId) {
  try {
    const res = await fetch(`/api/exkluziv_cipok/${exId}/meretek`);
    const sizes = await res.json();
    const container = document.getElementById(`exSizesList-${exId}`);
    if (!sizes.length) {
      container.innerHTML = "<p>Nincsenek méretek.</p>";
      return;
    }
    let html = `<ul class="list-group">`;
    sizes.forEach(size => {
      html += `<li class="list-group-item d-flex justify-content-between align-items-center">
        ${size.meret} (Készlet: ${size.keszlet})
        <button class="btn btn-sm btn-danger deleteExSizeBtn" data-sizeid="${size.meret_id}">Törlés</button>
      </li>`;
    });
    html += "</ul>";
    container.innerHTML = html;
    document.querySelectorAll(`#exSizesList-${exId} .deleteExSizeBtn`).forEach(btn => {
      btn.addEventListener("click", async (e) => {
        const sizeId = e.target.dataset.sizeid;
        if (!confirm("Biztos törlöd ezt a méretet?")) return;
        try {
          const res = await fetch(`/api/exkluziv_cipo_meretek/${sizeId}`, { method: "DELETE" });
          const data = await res.json();
          if (data.success) {
            alert("Méret törölve!");
            loadExSizes(exId);
          } else {
            alert("Hiba történt a törlés során.");
          }
        } catch (err) {
          console.error("Exkluzív méret törlése hiba:", err);
        }
      });
    });
  } catch (err) {
    console.error("Exkluzív méretek betöltése hiba:", err);
  }
}

async function loadExPriceHistory(exId) {
  try {
    const res = await fetch(`/api/exkluziv_cipok/${exId}/arvaltozas`);
    const history = await res.json();
    const container = document.getElementById(`exPriceHistoryList-${exId}`);
    if (!history.length) {
      container.innerHTML = "<p>Nincs ártörténet.</p>";
      return;
    }
    let html = `<ul class="list-group">`;
    history.forEach(rec => {
      html += `<li class="list-group-item d-flex justify-content-between align-items-center">
        ${rec.datum} - ${rec.ar}
        <button class="btn btn-sm btn-danger deleteExPriceBtn" data-priceid="${rec.arvaltozas_id}">Törlés</button>
      </li>`;
    });
    html += "</ul>";
    container.innerHTML = html;
    document.querySelectorAll(`#exPriceHistoryList-${exId} .deleteExPriceBtn`).forEach(btn => {
      btn.addEventListener("click", async (e) => {
        const priceId = e.target.dataset.priceid;
        if (!confirm("Biztos törlöd ezt az ártörténeti bejegyzést?")) return;
        try {
          const res = await fetch(`/api/arvaltozas/${priceId}`, { method: "DELETE" });
          const data = await res.json();
          if (data.success) {
            alert("Ártörténet bejegyzés törölve!");
            loadExPriceHistory(exId);
          } else {
            alert("Hiba történt a törlés során.");
          }
        } catch (err) {
          console.error("Exkluzív ártörténet törlése hiba:", err);
        }
      });
    });
  } catch (err) {
    console.error("Exkluzív ártörténet betöltése hiba:", err);
  }
}
