document.addEventListener("DOMContentLoaded", function() {
  // Csak akkor futtatjuk a kódot, ha az adminisztrációs oldalon vagyunk.
  const adminTabs = document.querySelectorAll("#adminTabs .nav-link");
  const tabContent = document.getElementById("tabContent");

  if (!tabContent) {
    console.warn("Nincs tabContent elem az oldalon – ez a kód csak adminisztrációs oldalon fut.");
    return;
  }

  // Globális változók a normál és exkluzív cipők aktuális azonosítójához
  window.currentCipoId = null;
  window.currentExId = null;

  // --- TAB VÁLTÁS ---
  if (adminTabs.length) {
    adminTabs.forEach(tab => {
      tab.addEventListener("click", function(e) {
        e.preventDefault();
        adminTabs.forEach(t => t.classList.remove("active"));
        this.classList.add("active");
        const tabName = this.getAttribute("data-tab");
        if (tabName === "users") {
          loadUsers();
        } else if (tabName === "cipok") {
          loadCipokBrands();
        } else if (tabName === "exkluziv") {
          loadExkluziv();
        }
      });
    });
  }

  // Alapértelmezett: betöltjük a felhasználókat
  loadUsers();


  // ============================================================
  // FELHASZNÁLÓK KEZELÉSE
  // ============================================================
  async function loadUsers() {
    try {
      const res = await fetch(`/api/felhasznalok`);
      const users = await res.json();
      renderUsers(users);
    } catch (err) {
      console.error("Hiba a felhasználók betöltésekor:", err);
      tabContent.innerHTML = "<p>Hiba a felhasználók betöltésekor.</p>";
    }
  }

  function renderUsers(users) {
    let html = `
      <h2>Felhasználók</h2>
      <table class="table table-striped" id="usersTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Vezetéknév</th>
            <th>Keresztnév</th>
            <th>Felhasználónév</th>
            <th>Email</th>
            <th>Jelszó Hash</th>
            <th>Szerep</th>
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          ${users.map(user => `
            <tr id="user-${user.felhasznalo_id}">
              <td>${user.felhasznalo_id}</td>
              <td>${user.vezeteknev}</td>
              <td>${user.keresztnev}</td>
              <td>${user.felhasznalonev || ""}</td>
              <td>${user.email}</td>
              <td>${user.jelszo_hash || ""}</td>
              <td>${user.szerep || "Vásárló"}</td>
              <td>
                <button class="btn btn-sm btn-primary" onclick="editUser(${user.felhasznalo_id})">Szerkesztés</button>
                <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.felhasznalo_id})">Törlés</button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
      <h3>Új felhasználó hozzáadása</h3>
      <form id="addUserForm">
        <div class="mb-2"><input type="text" class="form-control" id="newVezeteknev" placeholder="Vezetéknév" required></div>
        <div class="mb-2"><input type="text" class="form-control" id="newKeresztnev" placeholder="Keresztnév" required></div>
        <div class="mb-2"><input type="text" class="form-control" id="newFelhasznalonev" placeholder="Felhasználónév" required></div>
        <div class="mb-2"><input type="email" class="form-control" id="newEmail" placeholder="Email" required></div>
        <div class="mb-2"><input type="password" class="form-control" id="newJelszo" placeholder="Jelszó" required></div>
        <div class="mb-2">
          <select class="form-select" id="newSzerep">
            <option value="Vásárló">Vásárló</option>
            <option value="Adminisztrátor">Adminisztrátor</option>
            <option value="Raktáros">Raktáros</option>
            <option value="Bolti eladó">Bolti eladó</option>
          </select>
        </div>
        <button type="submit" class="btn btn-success">Hozzáadás</button>
      </form>
      <div id="editUserContainer" style="display:none;">
        <h3>Felhasználó szerkesztése</h3>
        <form id="editUserForm">
          <input type="hidden" id="editUserId">
          <div class="mb-2"><input type="text" class="form-control" id="editVezeteknev" placeholder="Vezetéknév" required></div>
          <div class="mb-2"><input type="text" class="form-control" id="editKeresztnev" placeholder="Keresztnév" required></div>
          <div class="mb-2"><input type="text" class="form-control" id="editFelhasznalonev" placeholder="Felhasználónév" required></div>
          <div class="mb-2"><input type="email" class="form-control" id="editEmail" placeholder="Email" required></div>
          <div class="mb-2">
            <select class="form-select" id="editSzerep">
              <option value="Vásárló">Vásárló</option>
              <option value="Adminisztrátor">Adminisztrátor</option>
              <option value="Raktáros">Raktáros</option>
              <option value="Bolti eladó">Bolti eladó</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">Mentés</button>
          <button type="button" class="btn btn-secondary" onclick="cancelEditUser()">Mégse</button>
        </form>
      </div>
    `;
    tabContent.innerHTML = html;

    // Csatoljuk az eseménykezelőket, ha léteznek az elemek.
    const addUserForm = document.getElementById("addUserForm");
    if (addUserForm) {
      addUserForm.addEventListener("submit", addUser);
    }
    const editUserForm = document.getElementById("editUserForm");
    if (editUserForm) {
      editUserForm.addEventListener("submit", updateUser);
    }
  }

  async function addUser(e) {
    e.preventDefault();
    const newData = {
      vezeteknev: document.getElementById("newVezeteknev").value,
      keresztnev: document.getElementById("newKeresztnev").value,
      felhasznalonev: document.getElementById("newFelhasznalonev").value,
      email: document.getElementById("newEmail").value,
      jelszo_hash: document.getElementById("newJelszo").value,
      szerep: document.getElementById("newSzerep").value
    };
    try {
      const res = await fetch(`/api/felhasznalok`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData)
      });
      const data = await res.json();
      if (data.success) {
        loadUsers();
      } else {
        alert("Hiba a felhasználó hozzáadásakor");
      }
    } catch (err) {
      console.error(err);
      alert("Hiba történt a felhasználó hozzáadásakor");
    }
  }

  async function editUser(userId) {
    try {
      const res = await fetch(`/api/felhasznalok/${userId}`);
      const user = await res.json();
      if(user.error) {
        alert("Nincs ilyen felhasználó");
        return;
      }
      document.getElementById("editUserId").value = user.felhasznalo_id;
      document.getElementById("editVezeteknev").value = user.vezeteknev;
      document.getElementById("editKeresztnev").value = user.keresztnev;
      document.getElementById("editFelhasznalonev").value = user.felhasznalonev || "";
      document.getElementById("editEmail").value = user.email;
      document.getElementById("editSzerep").value = user.szerep || "Vásárló";
      document.getElementById("editUserContainer").style.display = "block";
    } catch (err) {
      console.error(err);
      alert("Hiba történt a felhasználó betöltésekor");
    }
  }

  async function updateUser(e) {
    e.preventDefault();
    const userId = document.getElementById("editUserId").value;
    const updatedData = {
      vezeteknev: document.getElementById("editVezeteknev").value,
      keresztnev: document.getElementById("editKeresztnev").value,
      felhasznalonev: document.getElementById("editFelhasznalonev").value,
      email: document.getElementById("editEmail").value,
      szerep: document.getElementById("editSzerep").value
    };
    try {
      const res = await fetch(`/api/felhasznalok/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData)
      });
      const data = await res.json();
      if (data.success) {
        // Frissítjük a sort
        const resUser = await fetch(`/api/felhasznalok/${userId}`);
        const updatedUser = await resUser.json();
        updateUserRow(updatedUser);
        document.getElementById("editUserContainer").style.display = "none";
      } else {
        alert("Hiba a felhasználó frissítésekor");
      }
    } catch (err) {
      console.error(err);
      alert("Hiba történt a felhasználó frissítésekor");
    }
  }

  function updateUserRow(user) {
    const row = document.getElementById(`user-${user.felhasznalo_id}`);
    if (row) {
      row.innerHTML = `
        <td>${user.felhasznalo_id}</td>
        <td>${user.vezeteknev}</td>
        <td>${user.keresztnev}</td>
        <td>${user.felhasznalonev || ""}</td>
        <td>${user.email}</td>
        <td>${user.jelszo_hash || ""}</td>
        <td>${user.szerep || "Vásárló"}</td>
        <td>
          <button class="btn btn-sm btn-primary" onclick="editUser(${user.felhasznalo_id})">Szerkesztés</button>
          <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.felhasznalo_id})">Törlés</button>
        </td>
      `;
    }
  }

  async function deleteUser(userId) {
    if (!confirm("Biztosan törlöd a felhasználót?")) return;
    try {
      const res = await fetch(`/api/felhasznalok/${userId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        const row = document.getElementById(`user-${userId}`);
        if (row) row.remove();
      } else {
        alert("Hiba a felhasználó törlésekor");
      }
    } catch (err) {
      console.error(err);
      alert("Hiba történt a felhasználó törlésekor");
    }
  }

  function cancelEditUser() {
    document.getElementById("editUserContainer").style.display = "none";
  }


  // ============================================================
  // NORMAL CIPŐK KEZELÉSE (Márkák, lista, méretek, ártörténet)
  // ============================================================
  async function loadCipokBrands() {
    try {
      const res = await fetch(`/api/cipok/brands`);
      const brands = await res.json();
      renderCipokBrandFilter(brands);
    } catch (err) {
      console.error("Hiba a márkák betöltésekor:", err);
      tabContent.innerHTML = "<p>Hiba a márkák betöltésekor.</p>";
    }
  }

  function renderCipokBrandFilter(brands) {
    let html = `
      <h2>Cipők szűrése márka alapján</h2>
      <div class="mb-3">
        <label for="brandSelect" class="form-label">Válassz márkát:</label>
        <select id="brandSelect" class="form-select" style="max-width:300px; display:inline-block;">
          <option value="">Minden márka</option>
          ${brands.map(b => `<option value="${b}">${b}</option>`).join("")}
        </select>
      </div>
      <div id="cipokContainer"></div>
    `;
    tabContent.innerHTML = html;
    const brandSelect = document.getElementById("brandSelect");
    if (brandSelect) {
      brandSelect.addEventListener("change", function() {
        const selected = brandSelect.value;
        loadCipok(selected);
      });
      loadCipok(brandSelect.value);
    }
  }

  async function loadCipok(brand = "") {
    try {
      let url = `/api/cipok`;
      if (brand) {
        url += `?marka=${encodeURIComponent(brand)}`;
      }
      const res = await fetch(url);
      const cipok = await res.json();
      renderCipokTable(cipok);
    } catch (err) {
      console.error("Hiba a cipők betöltésekor:", err);
      document.getElementById("cipokContainer").innerHTML = "<p>Hiba a cipők betöltésekor.</p>";
    }
  }

  function renderCipokTable(cipok) {
    let html = `
      <button class="btn btn-success mb-3" id="addCipoBtn">Új cipő hozzáadása</button>
      <table class="table table-striped" id="cipokTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Márka</th>
            <th>Modell</th>
            <th>Ár</th>
            <th>Leírás</th>
            <th>Méretek</th>
            <th>Képek</th>
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          ${cipok.map(cipo => {
            const meretek = cipo.meretek ? cipo.meretek.split(",").join(", ") : "";
            const kepekHTML = cipo.kep ? cipo.kep.split(",").map(fn => {
              const trimmed = fn.trim();
              return `<img src="/cipok/${trimmed}" alt="${trimmed}" style="height:40px; margin-right:4px;">`;
            }).join("") : "";
            return `
              <tr id="cipo-${cipo.cipo_id}">
                <td>${cipo.cipo_id}</td>
                <td>${cipo.marka}</td>
                <td>${cipo.modell}</td>
                <td>${Number(cipo.ar).toLocaleString("hu-HU")} Ft</td>
                <td>${cipo.leiras.substring(0,50)}...</td>
                <td>${meretek}</td>
                <td>${kepekHTML}</td>
                <td>
                  <button class="btn btn-sm btn-primary" onclick="editCipo(${cipo.cipo_id})">Szerkesztés</button>
                  <button class="btn btn-sm btn-danger" onclick="deleteCipo(${cipo.cipo_id})">Törlés</button>
                  <button class="btn btn-sm btn-secondary" onclick="showCipoMeretek(${cipo.cipo_id})">Méretek</button>
                  <button class="btn btn-sm btn-info" onclick="showCipokArvaltozas(${cipo.cipo_id})">Ártörténet</button>
                </td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
      <div id="addCipoContainer" style="display:none;">
        <h3>Új cipő hozzáadása</h3>
        <form id="addCipoForm">
          <div class="mb-2"><input type="text" class="form-control" id="newMarka" placeholder="Márka" required></div>
          <div class="mb-2"><input type="text" class="form-control" id="newModell" placeholder="Modell" required></div>
          <div class="mb-2"><input type="number" class="form-control" id="newAr" placeholder="Ár" required></div>
          <div class="mb-2"><textarea class="form-control" id="newLeiras" placeholder="Leírás" required></textarea></div>
          <div class="mb-2">
            <input type="text" class="form-control" id="newKep" placeholder="Képek (pl. balenciaga1.jpg, balenciaga2.jpg)">
          </div>
          <button type="submit" class="btn btn-success">Mentés</button>
          <button type="button" class="btn btn-secondary" onclick="cancelAddCipo()">Mégse</button>
        </form>
      </div>
      <div id="editCipoContainer" style="display:none;">
        <h3>Cipő szerkesztése</h3>
        <form id="editCipoForm">
          <input type="hidden" id="editCipoId">
          <div class="mb-2"><input type="text" class="form-control" id="editMarka" placeholder="Márka" required></div>
          <div class="mb-2"><input type="text" class="form-control" id="editModell" placeholder="Modell" required></div>
          <div class="mb-2"><input type="number" class="form-control" id="editAr" placeholder="Ár" required></div>
          <div class="mb-2"><textarea class="form-control" id="editLeiras" placeholder="Leírás" required></textarea></div>
          <div class="mb-2">
            <input type="text" class="form-control" id="editKep" placeholder="Képek (pl. balenciaga1.jpg, balenciaga2.jpg)">
          </div>
          <button type="submit" class="btn btn-primary">Mentés</button>
          <button type="button" class="btn btn-secondary" onclick="cancelEditCipo()">Mégse</button>
        </form>
      </div>
      <!-- Méretek és ártörténet konténer -->
      <div id="meretekContainer" style="display:none;"></div>
    `;
    document.getElementById("cipokContainer").innerHTML = html;
    // Események csatolása
    const addCipoBtn = document.getElementById("addCipoBtn");
    if (addCipoBtn) {
      addCipoBtn.addEventListener("click", () => {
        document.getElementById("addCipoContainer").style.display = "block";
      });
    }
    const addCipoForm = document.getElementById("addCipoForm");
    if (addCipoForm) {
      addCipoForm.addEventListener("submit", addCipo);
    }
    const editCipoForm = document.getElementById("editCipoForm");
    if (editCipoForm) {
      editCipoForm.addEventListener("submit", updateCipo);
    }
  }

  async function addCipo(e) {
    e.preventDefault();
    const newData = {
      marka: document.getElementById("newMarka").value,
      modell: document.getElementById("newModell").value,
      ar: document.getElementById("newAr").value,
      leiras: document.getElementById("newLeiras").value,
      kep: document.getElementById("newKep").value.trim()
    };
    try {
      const res = await fetch(`/api/cipok`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData)
      });
      const data = await res.json();
      if (data.success) {
        // Ha van márka szűrő (brandSelect) akkor újratöltjük a jelenlegi márkát; különben az összes cipőt.
        const brandSelect = document.getElementById("brandSelect");
        const currentBrand = brandSelect ? brandSelect.value : "";
        loadCipok(currentBrand);
      } else {
        alert("Hiba a cipő hozzáadásakor");
      }
    } catch (err) {
      console.error(err);
      alert("Hiba történt a cipő hozzáadásakor");
    }
  }

  async function editCipo(cipoId) {
    try {
      const res = await fetch(`/api/cipok/${cipoId}`);
      const cipo = await res.json();
      document.getElementById("editCipoId").value = cipo.cipo_id;
      document.getElementById("editMarka").value = cipo.marka;
      document.getElementById("editModell").value = cipo.modell;
      document.getElementById("editAr").value = cipo.ar;
      document.getElementById("editLeiras").value = cipo.leiras;
      document.getElementById("editKep").value = cipo.kep || "";
      document.getElementById("editCipoContainer").style.display = "block";
    } catch (err) {
      console.error(err);
      alert("Hiba a cipő betöltésekor");
    }
  }

  async function updateCipo(e) {
    e.preventDefault();
    const cipoId = document.getElementById("editCipoId").value;
    const updatedData = {
      marka: document.getElementById("editMarka").value,
      modell: document.getElementById("editModell").value,
      ar: document.getElementById("editAr").value,
      leiras: document.getElementById("editLeiras").value,
      kep: document.getElementById("editKep").value.trim()
    };
    try {
      const res = await fetch(`/api/cipok/${cipoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData)
      });
      const data = await res.json();
      if (data.success) {
        const resCipo = await fetch(`/api/cipok/${cipoId}`);
        const updatedCipo = await resCipo.json();
        updateCipoRow(updatedCipo);
        document.getElementById("editCipoContainer").style.display = "none";
      } else {
        alert("Hiba a cipő frissítésekor");
      }
    } catch (err) {
      console.error(err);
      alert("Hiba történt a cipő frissítésekor");
    }
  }

  function updateCipoRow(cipo) {
    const row = document.getElementById(`cipo-${cipo.cipo_id}`);
    if (row) {
      const meretek = cipo.meretek ? cipo.meretek.split(",").join(", ") : "";
      const kepekHTML = cipo.kep ? cipo.kep.split(",").map(fn => {
        const trimmed = fn.trim();
        return `<img src="/cipok/${trimmed}" alt="${trimmed}" style="height:40px; margin-right:4px;">`;
      }).join("") : "";
      row.innerHTML = `
        <td>${cipo.cipo_id}</td>
        <td>${cipo.marka}</td>
        <td>${cipo.modell}</td>
        <td>${Number(cipo.ar).toLocaleString("hu-HU")} Ft</td>
        <td>${cipo.leiras.substring(0,50)}...</td>
        <td>${meretek}</td>
        <td>${kepekHTML}</td>
        <td>
          <button class="btn btn-sm btn-primary" onclick="editCipo(${cipo.cipo_id})">Szerkesztés</button>
          <button class="btn btn-sm btn-danger" onclick="deleteCipo(${cipo.cipo_id})">Törlés</button>
          <button class="btn btn-sm btn-secondary" onclick="showCipoMeretek(${cipo.cipo_id})">Méretek</button>
          <button class="btn btn-sm btn-info" onclick="showCipokArvaltozas(${cipo.cipo_id})">Ártörténet</button>
        </td>
      `;
    }
  }

  async function deleteCipo(cipoId) {
    if (!confirm("Biztosan törlöd ezt a cipőt?")) return;
    try {
      const res = await fetch(`/api/cipok/${cipoId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        const row = document.getElementById(`cipo-${cipoId}`);
        if (row) row.remove();
        else {
          const brandSelect = document.getElementById("brandSelect");
          const currentBrand = brandSelect ? brandSelect.value : "";
          loadCipok(currentBrand);
        }
      } else {
        alert("Hiba a cipő törlésekor");
      }
    } catch (err) {
      console.error(err);
      alert("Hiba történt a cipő törlésekor");
    }
  }

  function cancelAddCipo() {
    const addContainer = document.getElementById("addCipoContainer");
    if (addContainer) addContainer.style.display = "none";
  }
  function cancelEditCipo() {
    const editContainer = document.getElementById("editCipoContainer");
    if (editContainer) editContainer.style.display = "none";
  }

  // ----- NORMAL CIPŐK: MÉRETEK KEZELÉSE -----
  async function showCipoMeretek(cipoId) {
    window.currentCipoId = cipoId;
    try {
      const res = await fetch(`/api/cipok/${cipoId}/meretek`);
      const meretek = await res.json();
      renderCipoMeretek(meretek, cipoId);
    } catch (err) {
      console.error("Hiba a normál cipő méretek betöltésekor:", err);
      alert("Hiba a normál cipő méretek betöltésekor");
    }
  }

  function renderCipoMeretek(meretek, cipoId) {
    let html = `
      <h3>Méretek (Cipő ID: ${cipoId})</h3>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Méret</th>
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          ${meretek.map(m => `
            <tr id="norm-meret-${m.meret_id}">
              <td>${m.meret_id}</td>
              <td>${m.meret}</td>
              <td>
                <button class="btn btn-sm btn-primary" onclick="editNormMeret(${m.meret_id}, ${cipoId})">Szerkesztés</button>
                <button class="btn btn-sm btn-danger" onclick="deleteNormMeret(${m.meret_id}, ${cipoId})">Törlés</button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
      <h4>Új méret hozzáadása</h4>
      <form id="addNormMeretForm">
        <div class="mb-2">
          <input type="text" class="form-control" id="newNormMeret" placeholder="Méret (pl. 42)" required>
        </div>
        <button type="submit" class="btn btn-success">Hozzáadás</button>
      </form>
      <div id="editNormMeretContainer" style="display:none;">
        <h4>Méret szerkesztése</h4>
        <form id="editNormMeretForm">
          <input type="hidden" id="editNormMeretId">
          <div class="mb-2">
            <input type="text" class="form-control" id="editNormMeret" placeholder="Méret" required>
          </div>
          <button type="submit" class="btn btn-primary">Mentés</button>
          <button type="button" class="btn btn-secondary" onclick="cancelEditNormMeret()">Mégse</button>
        </form>
      </div>
      <button class="btn btn-light mt-3" onclick="closeCipoMeretek()">Vissza</button>
    `;
    const meretekContainer = document.getElementById("meretekContainer");
    meretekContainer.innerHTML = html;
    meretekContainer.style.display = "block";
    const addNormMeretForm = document.getElementById("addNormMeretForm");
    if (addNormMeretForm) {
      addNormMeretForm.addEventListener("submit", function(e) {
        e.preventDefault();
        addNormMeret(cipoId);
      });
    }
    const editNormMeretForm = document.getElementById("editNormMeretForm");
    if (editNormMeretForm) {
      editNormMeretForm.addEventListener("submit", updateNormMeret);
    }
  }

  async function addNormMeret(cipoId) {
    const meret = document.getElementById("newNormMeret").value;
    try {
      const res = await fetch(`/api/meretek`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cipo_id: cipoId, meret })
      });
      const data = await res.json();
      if (data.success) {
        showCipoMeretek(cipoId);
      } else {
        alert("Hiba a méret hozzáadásakor");
      }
    } catch (err) {
      console.error(err);
      alert("Hiba történt a méret hozzáadásakor");
    }
  }

  async function editNormMeret(meretId, cipoId) {
    try {
      const res = await fetch(`/api/meretek/${meretId}`);
      const meretObj = await res.json();
      if (meretObj.error) {
        alert("Nincs ilyen méret");
        return;
      }
      document.getElementById("editNormMeretId").value = meretObj.meret_id;
      document.getElementById("editNormMeret").value = meretObj.meret;
      document.getElementById("editNormMeretContainer").style.display = "block";
    } catch (err) {
      console.error(err);
      alert("Hiba a méret betöltésekor");
    }
  }

  async function updateNormMeret(e) {
    e.preventDefault();
    const meretId = document.getElementById("editNormMeretId").value;
    const meret = document.getElementById("editNormMeret").value;
    try {
      const res = await fetch(`/api/meretek/${meretId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cipo_id: window.currentCipoId, meret })
      });
      const data = await res.json();
      if (data.success) {
        document.getElementById("editNormMeretContainer").style.display = "none";
        showCipoMeretek(window.currentCipoId);
      } else {
        alert("Hiba a méret frissítésekor");
      }
    } catch (err) {
      console.error(err);
      alert("Hiba történt a méret frissítésekor");
    }
  }

  async function deleteNormMeret(meretId, cipoId) {
    if (!confirm("Biztosan törlöd ezt a méretet?")) return;
    try {
      const res = await fetch(`/api/meretek/${meretId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showCipoMeretek(cipoId);
      } else {
        alert("Hiba a méret törlésekor");
      }
    } catch (err) {
      console.error(err);
      alert("Hiba történt a méret törlésekor");
    }
  }

  function cancelEditNormMeret() {
    const editContainer = document.getElementById("editNormMeretContainer");
    if (editContainer) editContainer.style.display = "none";
  }

  function closeCipoMeretek() {
    const container = document.getElementById("meretekContainer");
    if (container) container.style.display = "none";
  }

  // ----- NORMAL CIPŐK: ÁRTÖRTÉNET KEZELÉSE -----
  async function showCipokArvaltozas(cipoId) {
    window.currentCipoId = cipoId;
    try {
      const res = await fetch(`/api/cipok/${cipoId}/arvaltozas`);
      const arvaltozas = await res.json();
      renderCipokArvaltozas(arvaltozas, cipoId);
    } catch (err) {
      console.error("Hiba a normál cipő ártörténet betöltésekor:", err);
      alert("Hiba a normál cipő ártörténet betöltésekor");
    }
  }

  function renderCipokArvaltozas(arvaltozas, cipoId) {
    let html = `
      <h3>Ártörténet (Cipő ID: ${cipoId})</h3>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Dátum</th>
            <th>Ár (Ft)</th>
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          ${arvaltozas.map(record => `
            <tr id="price-${record.arvaltozas_id}">
              <td>${record.arvaltozas_id}</td>
              <td>${new Date(record.datum).toLocaleString("hu-HU")}</td>
              <td>${Number(record.ar).toLocaleString("hu-HU")} Ft</td>
              <td>
                <button class="btn btn-sm btn-primary" onclick="editCipokAr(${record.arvaltozas_id}, ${cipoId})">Szerkesztés</button>
                <button class="btn btn-sm btn-danger" onclick="deleteCipokAr(${record.arvaltozas_id}, ${cipoId})">Törlés</button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
      <h4>Új ár hozzáadása</h4>
      <form id="addCipokArForm">
         <div class="mb-2">
            <label>Új ár (Ft):</label>
            <input type="number" class="form-control" id="newCipokAr" placeholder="Új ár" required>
         </div>
         <div class="mb-2">
            <label>Dátum:</label>
            <input type="datetime-local" class="form-control" id="newCipokDatum" required>
         </div>
         <button type="submit" class="btn btn-success">Hozzáadás</button>
      </form>
      <div id="editCipokArContainer" style="display:none;">
         <h4>Ár szerkesztése</h4>
         <form id="editCipokArForm">
            <input type="hidden" id="editCipokArId">
            <div class="mb-2">
               <label>Új ár (Ft):</label>
               <input type="number" class="form-control" id="editCipokArInput" required>
            </div>
            <div class="mb-2">
               <label>Dátum:</label>
               <input type="datetime-local" class="form-control" id="editCipokDatumInput" required>
            </div>
            <button type="submit" class="btn btn-primary">Mentés</button>
            <button type="button" class="btn btn-secondary" onclick="cancelEditCipokAr()">Mégse</button>
         </form>
      </div>
      <button class="btn btn-light mt-3" onclick="closeCipokArvaltozas()">Vissza</button>
    `;
    const meretekContainer = document.getElementById("meretekContainer");
    meretekContainer.innerHTML = html;
    meretekContainer.style.display = "block";
    const addCipokArForm = document.getElementById("addCipokArForm");
    if (addCipokArForm) {
      addCipokArForm.addEventListener("submit", function(e) {
        e.preventDefault();
        addCipokAr(cipoId);
      });
    }
    const editCipokArForm = document.getElementById("editCipokArForm");
    if (editCipokArForm) {
      editCipokArForm.addEventListener("submit", updateCipokAr);
    }
  }

  async function addCipokAr(cipoId) {
    let ar = document.getElementById("newCipokAr").value;
    ar = parseFloat(ar);
    const datum = document.getElementById("newCipokDatum").value;
    try {
      const res = await fetch(`/api/cipok/${cipoId}/arvaltozas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ datum, ar })
      });
      const data = await res.json();
      if (data.success) {
        showCipokArvaltozas(cipoId);
      } else {
        alert("Hiba az ár hozzáadásakor");
      }
    } catch (err) {
      console.error(err);
      alert("Hiba történt az ár hozzáadásakor");
    }
  }

  async function editCipokAr(arId, cipoId) {
    try {
      const res = await fetch(`/api/arvaltozas/${arId}`);
      const record = await res.json();
      if (record.error) {
        alert("Nincs ilyen ártörténeti bejegyzés");
        return;
      }
      document.getElementById("editCipokArId").value = record.arvaltozas_id;
      document.getElementById("editCipokArInput").value = record.ar;
      let d = new Date(record.datum);
      const pad = (n) => n.toString().padStart(2, '0');
      const formatted = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
      document.getElementById("editCipokDatumInput").value = formatted;
      document.getElementById("editCipokArContainer").style.display = "block";
    } catch (err) {
      console.error(err);
      alert("Hiba az ár bejegyzés betöltésekor");
    }
  }

  async function updateCipokAr(e) {
    e.preventDefault();
    const arId = document.getElementById("editCipokArId").value;
    let ar = document.getElementById("editCipokArInput").value;
    ar = parseFloat(ar);
    const datum = document.getElementById("editCipokDatumInput").value;
    try {
      const res = await fetch(`/api/arvaltozas/${arId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ datum, ar })
      });
      const data = await res.json();
      if (data.success) {
        document.getElementById("editCipokArContainer").style.display = "none";
        showCipokArvaltozas(window.currentCipoId);
      } else {
        alert("Hiba az ár frissítésekor");
      }
    } catch (err) {
      console.error(err);
      alert("Hiba történt az ár frissítésekor");
    }
  }

  async function deleteCipokAr(arId, cipoId) {
    if (!confirm("Biztosan törlöd ezt az ártörténeti bejegyzést?")) return;
    try {
      const res = await fetch(`/api/arvaltozas/${arId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showCipokArvaltozas(cipoId);
      } else {
        alert("Hiba az ár bejegyzés törlésekor");
      }
    } catch (err) {
      console.error(err);
      alert("Hiba történt az ár bejegyzés törlésekor");
    }
  }

  function cancelEditCipokAr() {
    const editContainer = document.getElementById("editCipokArContainer");
    if (editContainer) editContainer.style.display = "none";
  }

  function closeCipokArvaltozas() {
    const meretekContainer = document.getElementById("meretekContainer");
    if (meretekContainer) meretekContainer.style.display = "none";
  }

  // ============================================================
  // EXKLUZÍV CIPŐK KEZELÉSE
  // ============================================================
  async function loadExkluziv() {
    try {
      const res = await fetch(`/api/exkluziv_cipok`);
      const exkluziv = await res.json();
      renderExkluziv(exkluziv);
    } catch (err) {
      console.error("Hiba az exkluzív cipők betöltésekor:", err);
      tabContent.innerHTML = "<p>Hiba az exkluzív cipők betöltésekor.</p>";
    }
  }

  function renderExkluziv(exkluziv) {
    let html = `
      <h2>Exkluzív Cipők</h2>
      <button class="btn btn-success mb-3" id="addExkluzivBtn">Új exkluzív cipő hozzáadása</button>
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
          ${exkluziv.map(cipo => `
            <tr id="exkluziv-${cipo.exkluziv_id}">
              <td>${cipo.exkluziv_id}</td>
              <td>${cipo.marka}</td>
              <td>${cipo.modell}</td>
              <td>${Number(cipo.ar).toLocaleString("hu-HU")} Ft</td>
              <td>${cipo.leiras.substring(0,50)}...</td>
              <td>${cipo.kep ? cipo.kep.split(",").map(fn => {
                const trimmed = fn.trim();
                return `<img src="/cipok/${trimmed}" alt="${trimmed}" style="height:40px; margin-right:4px;">`;
              }).join("") : ""}</td>
              <td>
                <button class="btn btn-sm btn-primary" onclick="editExkluziv(${cipo.exkluziv_id})">Szerkesztés</button>
                <button class="btn btn-sm btn-danger" onclick="deleteExkluziv(${cipo.exkluziv_id})">Törlés</button>
                <button class="btn btn-sm btn-secondary" onclick="showExkluzivMeretek(${cipo.exkluziv_id})">Méretek</button>
                <button class="btn btn-sm btn-info" onclick="showExkluzivArvaltozas(${cipo.exkluziv_id})">Ártörténet</button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
      <div id="addExkluzivContainer" style="display:none;">
        <h3>Új exkluzív cipő hozzáadása</h3>
        <form id="addExkluzivForm">
          <div class="mb-2"><input type="text" class="form-control" id="newExMarka" placeholder="Márka" required></div>
          <div class="mb-2"><input type="text" class="form-control" id="newExModell" placeholder="Modell" required></div>
          <div class="mb-2"><input type="number" class="form-control" id="newExAr" placeholder="Ár" required></div>
          <div class="mb-2"><textarea class="form-control" id="newExLeiras" placeholder="Leírás" required></textarea></div>
          <button type="submit" class="btn btn-success">Mentés</button>
          <button type="button" class="btn btn-secondary" onclick="cancelAddExkluziv()">Mégse</button>
        </form>
      </div>
      <div id="editExkluzivContainer" style="display:none;">
        <h3>Exkluzív cipő szerkesztése</h3>
        <form id="editExkluzivForm">
          <input type="hidden" id="editExId">
          <div class="mb-2"><input type="text" class="form-control" id="editExMarka" placeholder="Márka" required></div>
          <div class="mb-2"><input type="text" class="form-control" id="editExModell" placeholder="Modell" required></div>
          <div class="mb-2"><input type="number" class="form-control" id="editExAr" placeholder="Ár" required></div>
          <div class="mb-2"><textarea class="form-control" id="editExLeiras" placeholder="Leírás" required></textarea></div>
          <button type="submit" class="btn btn-primary">Mentés</button>
          <button type="button" class="btn btn-secondary" onclick="cancelEditExkluziv()">Mégse</button>
        </form>
      </div>
      <div id="exArContainer" style="display:none;"></div>
    `;
    tabContent.innerHTML = html;
    const addExkluzivBtn = document.getElementById("addExkluzivBtn");
    if (addExkluzivBtn) {
      addExkluzivBtn.addEventListener("click", () => {
        document.getElementById("addExkluzivContainer").style.display = "block";
      });
    }
    const addExkluzivForm = document.getElementById("addExkluzivForm");
    if (addExkluzivForm) {
      addExkluzivForm.addEventListener("submit", addExkluziv);
    }
    const editExkluzivForm = document.getElementById("editExkluzivForm");
    if (editExkluzivForm) {
      editExkluzivForm.addEventListener("submit", updateExkluziv);
    }
  }

  async function addExkluziv(e) {
    e.preventDefault();
    const newData = {
      marka: document.getElementById("newExMarka").value,
      modell: document.getElementById("newExModell").value,
      ar: document.getElementById("newExAr").value,
      leiras: document.getElementById("newExLeiras").value
    };
    try {
      const res = await fetch(`/api/exkluziv_cipok`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData)
      });
      const data = await res.json();
      if (data.success) {
        loadExkluziv();
      } else {
        alert("Hiba az exkluzív cipő hozzáadásakor");
      }
    } catch (err) {
      console.error(err);
      alert("Hiba történt az exkluzív cipő hozzáadásakor");
    }
  }

  async function editExkluziv(exId) {
    try {
      const res = await fetch(`/api/exkluziv_cipok/${exId}`);
      const ex = await res.json();
      document.getElementById("editExId").value = ex.exkluziv_id;
      document.getElementById("editExMarka").value = ex.marka;
      document.getElementById("editExModell").value = ex.modell;
      document.getElementById("editExAr").value = ex.ar;
      document.getElementById("editExLeiras").value = ex.leiras;
      document.getElementById("editExkluzivContainer").style.display = "block";
    } catch (err) {
      console.error(err);
      alert("Hiba az exkluzív cipő betöltésekor");
    }
  }

  async function updateExkluziv(e) {
    e.preventDefault();
    const exId = document.getElementById("editExId").value;
    const updatedData = {
      marka: document.getElementById("editExMarka").value,
      modell: document.getElementById("editExModell").value,
      ar: document.getElementById("editExAr").value,
      leiras: document.getElementById("editExLeiras").value
    };
    try {
      const res = await fetch(`/api/exkluziv_cipok/${exId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData)
      });
      const data = await res.json();
      if (data.success) {
        document.getElementById("editExkluzivContainer").style.display = "none";
        loadExkluziv();
      } else {
        alert("Hiba az exkluzív cipő frissítésekor");
      }
    } catch (err) {
      console.error(err);
      alert("Hiba történt az exkluzív cipő frissítésekor");
    }
  }

  async function deleteExkluziv(exId) {
    if (!confirm("Biztosan törlöd az exkluzív cipőt?")) return;
    try {
      const res = await fetch(`/api/exkluziv_cipok/${exId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        const row = document.getElementById(`exkluziv-${exId}`);
        if (row) row.remove();
        else loadExkluziv();
      } else {
        alert("Hiba az exkluzív cipő törlésekor");
      }
    } catch (err) {
      console.error(err);
      alert("Hiba történt az exkluzív cipő törlésekor");
    }
  }

  function cancelAddExkluziv() {
    const addContainer = document.getElementById("addExkluzivContainer");
    if (addContainer) addContainer.style.display = "none";
  }
  function cancelEditExkluziv() {
    const editContainer = document.getElementById("editExkluzivContainer");
    if (editContainer) editContainer.style.display = "none";
  }

  // ----- EXKLUZÍV CIPŐK: MÉRETEK KEZELÉSE -----
  async function showExkluzivMeretek(exId) {
    window.currentExId = exId;
    try {
      const res = await fetch(`/api/exkluziv_cipok/${exId}/meretek`);
      const meretek = await res.json();
      renderExkluzivMeretek(meretek, exId);
    } catch (err) {
      console.error("Hiba az exkluzív méretek betöltésekor:", err);
      alert("Hiba az exkluzív méretek betöltésekor");
    }
  }

  function renderExkluzivMeretek(meretek, exId) {
    const container = document.getElementById("meretekContainer");
    let html = `
      <h3>Méretek (Exkluzív cipő ID: ${exId})</h3>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Méret</th>
            <th>Készlet</th>
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          ${meretek.map(m => `
            <tr id="ex-meret-${m.meret_id}">
              <td>${m.meret_id}</td>
              <td>${m.meret}</td>
              <td>${m.keszlet}</td>
              <td>
                <button class="btn btn-sm btn-primary" onclick="editExMeret(${m.meret_id}, ${exId})">Szerkesztés</button>
                <button class="btn btn-sm btn-danger" onclick="deleteExMeret(${m.meret_id}, ${exId})">Törlés</button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
      <h4>Új méret hozzáadása</h4>
      <form id="addExMeretForm">
        <div class="mb-2">
          <input type="text" class="form-control" id="newExMeret" placeholder="Méret (pl. 42)" required>
        </div>
        <div class="mb-2">
          <input type="number" class="form-control" id="newExKeszlet" placeholder="Készlet" required>
        </div>
        <button type="submit" class="btn btn-success">Hozzáadás</button>
      </form>
      <div id="editExMeretContainer" style="display:none;">
        <h4>Méret szerkesztése</h4>
        <form id="editExMeretForm">
          <input type="hidden" id="editExMeretId">
          <div class="mb-2">
            <input type="text" class="form-control" id="editExMeret" placeholder="Méret" required>
          </div>
          <div class="mb-2">
            <input type="number" class="form-control" id="editExKeszlet" placeholder="Készlet" required>
          </div>
          <button type="submit" class="btn btn-primary">Mentés</button>
          <button type="button" class="btn btn-secondary" onclick="cancelEditExMeret()">Mégse</button>
        </form>
      </div>
      <button class="btn btn-light mt-3" onclick="closeExkluzivMeretek()">Vissza</button>
    `;
    container.innerHTML = html;
    container.style.display = "block";
    const addExMeretForm = document.getElementById("addExMeretForm");
    if (addExMeretForm) {
      addExMeretForm.addEventListener("submit", function(e) {
        e.preventDefault();
        addExMeretForEx(exId);
      });
    }
    const editExMeretForm = document.getElementById("editExMeretForm");
    if (editExMeretForm) {
      editExMeretForm.addEventListener("submit", updateExMeret);
    }
  }

  async function addExMeretForEx(exId) {
    const meret = document.getElementById("newExMeret").value;
    const keszlet = parseInt(document.getElementById("newExKeszlet").value, 10);
    try {
      const res = await fetch(`/api/exkluziv_cipok/${exId}/meretek`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ meret, keszlet })
      });
      const data = await res.json();
      if (data.success) {
        showExkluzivMeretek(exId);
      } else {
        alert("Hiba a méret hozzáadásakor");
      }
    } catch (err) {
      console.error(err);
      alert("Hiba történt a méret hozzáadásakor");
    }
  }

  async function editExMeret(meretId, exId) {
    try {
      // Feltételezzük, hogy az exkluzív méretekhez tartozó GET végpont: /api/exkluziv_cipok/meretek/:meret_id
      const res = await fetch(`/api/exkluziv_cipok/meretek/${meretId}`);
      const meretObj = await res.json();
      if (meretObj.error) {
        alert("Nincs ilyen méret");
        return;
      }
      document.getElementById("editExMeretId").value = meretObj.meret_id;
      document.getElementById("editExMeret").value = meretObj.meret;
      document.getElementById("editExKeszlet").value = meretObj.keszlet;
      document.getElementById("editExMeretContainer").style.display = "block";
    } catch (err) {
      console.error(err);
      alert("Hiba a méret betöltésekor");
    }
  }

  async function updateExMeret(e) {
    e.preventDefault();
    const meretId = document.getElementById("editExMeretId").value;
    const meret = document.getElementById("editExMeret").value;
    const keszlet = parseInt(document.getElementById("editExKeszlet").value, 10);
    try {
      const res = await fetch(`/api/exkluziv_cipok/meretek/${meretId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ meret, keszlet })
      });
      const data = await res.json();
      if (data.success) {
        document.getElementById("editExMeretContainer").style.display = "none";
        showExkluzivMeretek(window.currentExId);
      } else {
        alert("Hiba a méret frissítésekor");
      }
    } catch (err) {
      console.error(err);
      alert("Hiba történt a méret frissítésekor");
    }
  }

  async function deleteExMeret(meretId, exId) {
    if (!confirm("Biztosan törlöd ezt a méretet?")) return;
    try {
      const res = await fetch(`/api/exkluziv_cipok/meretek/${meretId}?exkluziv_id=${exId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showExkluzivMeretek(exId);
      } else {
        alert("Hiba a méret törlésekor");
      }
    } catch (err) {
      console.error(err);
      alert("Hiba történt a méret törlésekor");
    }
  }

  function cancelEditExMeret() {
    const editContainer = document.getElementById("editExMeretContainer");
    if (editContainer) editContainer.style.display = "none";
  }

  function closeExkluzivMeretek() {
    const container = document.getElementById("meretekContainer");
    if (container) container.style.display = "none";
    loadExkluziv();
  }

  // ----- EXKLUZÍV CIPŐK: ÁRTÖRTÉNET KEZELÉSE -----
  async function showExkluzivArvaltozas(exId) {
    window.currentExId = exId;
    try {
      const res = await fetch(`/api/exkluziv_cipok/${exId}/arvaltozas`);
      const arvaltozas = await res.json();
      renderExkluzivArvaltozas(arvaltozas, exId);
    } catch (err) {
      console.error("Hiba az exkluzív ártörténet betöltésekor:", err);
      alert("Hiba az exkluzív ártörténet betöltésekor");
    }
  }

  function renderExkluzivArvaltozas(arvaltozas, exId) {
    const container = document.getElementById("exArContainer");
    let html = `
      <h3>Ártörténet (Exkluzív cipő ID: ${exId})</h3>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Dátum</th>
            <th>Ár (Ft)</th>
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          ${arvaltozas.map(record => `
            <tr id="ar-${record.arvaltozas_id}">
              <td>${record.arvaltozas_id}</td>
              <td>${new Date(record.datum).toLocaleString("hu-HU")}</td>
              <td>${Number(record.ar).toLocaleString("hu-HU")} Ft</td>
              <td>
                <button class="btn btn-sm btn-primary" onclick="editExAr(${record.arvaltozas_id}, ${exId})">Szerkesztés</button>
                <button class="btn btn-sm btn-danger" onclick="deleteExAr(${record.arvaltozas_id}, ${exId})">Törlés</button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
      <h4>Új ár hozzáadása</h4>
      <form id="addExArForm">
        <div class="mb-2">
          <label>Új ár (Ft):</label>
          <input type="number" class="form-control" id="newExAr" placeholder="Új ár" required>
        </div>
        <div class="mb-2">
          <label>Dátum:</label>
          <input type="datetime-local" class="form-control" id="newExDatum" required>
        </div>
        <button type="submit" class="btn btn-success">Hozzáadás</button>
      </form>
      <div id="editExArContainer" style="display:none;">
        <h4>Ár szerkesztése</h4>
        <form id="editExArForm">
          <input type="hidden" id="editExArId">
          <div class="mb-2">
            <label>Új ár (Ft):</label>
            <input type="number" class="form-control" id="editExArInput" required>
          </div>
          <div class="mb-2">
            <label>Dátum:</label>
            <input type="datetime-local" class="form-control" id="editExDatumInput" required>
          </div>
          <button type="submit" class="btn btn-primary">Mentés</button>
          <button type="button" class="btn btn-secondary" onclick="cancelEditExAr()">Mégse</button>
        </form>
      </div>
      <button class="btn btn-light mt-3" onclick="closeExAr()">Vissza</button>
    `;
    container.innerHTML = html;
    container.style.display = "block";
    const addExArForm = document.getElementById("addExArForm");
    if (addExArForm) {
      addExArForm.addEventListener("submit", function(e) {
        e.preventDefault();
        addExAr(window.currentExId);
      });
    }
    const editExArForm = document.getElementById("editExArForm");
    if (editExArForm) {
      editExArForm.addEventListener("submit", updateExAr);
    }
  }

  async function addExAr(exId) {
    let ar = document.getElementById("newExAr").value;
    ar = parseFloat(ar);
    const datum = document.getElementById("newExDatum").value;
    try {
      const res = await fetch(`/api/arvaltozas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exkluziv_id: exId, datum, ar })
      });
      const data = await res.json();
      if (data.success) {
        showExkluzivArvaltozas(exId);
      } else {
        alert("Hiba az új ár hozzáadásakor");
      }
    } catch (err) {
      console.error(err);
      alert("Hiba történt az új ár hozzáadásakor");
    }
  }

  async function editExAr(arId, exId) {
    try {
      const res = await fetch(`/api/arvaltozas/${arId}`);
      const record = await res.json();
      if (record.error) {
        alert("Nincs ilyen ártörténeti bejegyzés");
        return;
      }
      document.getElementById("editExArId").value = record.arvaltozas_id;
      document.getElementById("editExArInput").value = record.ar;
      let d = new Date(record.datum);
      const pad = (n) => n.toString().padStart(2, '0');
      const formatted = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
      document.getElementById("editExDatumInput").value = formatted;
      document.getElementById("editExArContainer").style.display = "block";
    } catch (err) {
      console.error(err);
      alert("Hiba az ár bejegyzés betöltésekor");
    }
  }

  async function updateExAr(e) {
    e.preventDefault();
    const arId = document.getElementById("editExArId").value;
    let ar = document.getElementById("editExArInput").value;
    ar = parseFloat(ar);
    const datum = document.getElementById("editExDatumInput").value;
    try {
      const res = await fetch(`/api/arvaltozas/${arId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ datum, ar })
      });
      const data = await res.json();
      if (data.success) {
        document.getElementById("editExArContainer").style.display = "none";
        showExkluzivArvaltozas(window.currentExId);
      } else {
        alert("Hiba az ár frissítésekor");
      }
    } catch (err) {
      console.error(err);
      alert("Hiba történt az ár frissítésekor");
    }
  }

  async function deleteExAr(arId, exId) {
    if (!confirm("Biztosan törlöd ezt az ártörténeti bejegyzést?")) return;
    try {
      const res = await fetch(`/api/arvaltozas/${arId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showExkluzivArvaltozas(exId);
      } else {
        alert("Hiba az ár bejegyzés törlésekor");
      }
    } catch (err) {
      console.error(err);
      alert("Hiba történt az ár bejegyzés törlésekor");
    }
  }

  function cancelEditExAr() {
    const editContainer = document.getElementById("editExArContainer");
    if (editContainer) editContainer.style.display = "none";
  }

  function closeExAr() {
    const container = document.getElementById("exArContainer");
    if (container) container.style.display = "none";
    loadExkluziv();
  }

  // ============================================================
  // Bal oldali panel kezelése
  // ============================================================
  const openLeftPanelBtn = document.getElementById("openLeftPanel");
  const leftPanel = document.getElementById("leftPanel");
  const closeLeftPanelBtn = document.getElementById("closeLeftPanel");
  if (openLeftPanelBtn && leftPanel && closeLeftPanelBtn) {
    openLeftPanelBtn.addEventListener("click", () => {
      leftPanel.classList.add("active");
    });
    closeLeftPanelBtn.addEventListener("click", () => {
      leftPanel.classList.remove("active");
    });
  }

  // ============================================================
  // Globális függvények exportálása, hogy inline onclick-ok elérjék őket
  // ============================================================
  window.editUser = editUser;
  window.deleteUser = deleteUser;
  window.editCipo = editCipo;
  window.deleteCipo = deleteCipo;
  window.showCipoMeretek = showCipoMeretek;
  window.showCipokArvaltozas = showCipokArvaltozas;
  window.editExkluziv = editExkluziv;
  window.deleteExkluziv = deleteExkluziv;
  window.showExkluzivMeretek = showExkluzivMeretek;
  window.editExMeret = editExMeret;
  window.deleteExMeret = deleteExMeret;
  window.showExkluzivArvaltozas = showExkluzivArvaltozas;
  window.editExAr = editExAr;
  window.deleteExAr = deleteExAr;
  window.cancelEditUser = cancelEditUser;
  window.cancelAddCipo = cancelAddCipo;
  window.cancelEditCipo = cancelEditCipo;
  window.cancelAddExkluziv = cancelAddExkluziv;
  window.cancelEditExkluziv = cancelEditExkluziv;
  window.cancelEditExMeret = cancelEditExMeret;
  window.editNormMeret = editNormMeret;
  window.deleteNormMeret = deleteNormMeret;
  window.cancelEditNormMeret = cancelEditNormMeret;
});
