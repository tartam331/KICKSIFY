document.addEventListener("DOMContentLoaded", function() {
  const adminTabs = document.querySelectorAll("#adminTabs .nav-link");
  const tabContent = document.getElementById("tabContent");

  // Tabváltás: data-tab => "users", "cipok", "exkluziv"
  adminTabs.forEach(tab => {
    tab.addEventListener("click", function(e) {
      e.preventDefault();
      adminTabs.forEach(t => t.classList.remove("active"));
      this.classList.add("active");
      const tabName = this.getAttribute("data-tab");
      if (tabName === "users") {
        loadUsers();
      } else if (tabName === "cipok") {
        loadCipok();
      } else if (tabName === "exkluziv") {
        loadExkluziv();
      }
    });
  });

  // Alapértelmezett: felhasználók
  loadUsers();

  // ============================
  // 1) FELHASZNÁLÓK KEZELÉSE
  // ============================
  async function loadUsers() {
    try {
      const res = await fetch("/api/felhasznalok");
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
      <table class="table table-striped">
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
    `;
    users.forEach(user => {
      html += `
        <tr id="user-${user.felhasznalo_id}">
          <td>${user.felhasznalo_id}</td>
          <td>${user.vezeteknev}</td>
          <td>${user.keresztnev}</td>
          <td>${user.felhasznalonev || ""}</td>
          <td>${user.email}</td>
          <td>${user.jelszo_hash || ""}</td>
          <td>${user.szerep}</td>
          <td>
            <button class="btn btn-sm btn-primary" onclick="editUser(${user.felhasznalo_id})">Szerkesztés</button>
            <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.felhasznalo_id})">Törlés</button>
          </td>
        </tr>
      `;
    });
    html += `
        </tbody>
      </table>
      <h3>Új felhasználó hozzáadása</h3>
      <form id="addUserForm">
        <div class="mb-2">
          <input type="text" class="form-control" id="newVezeteknev" placeholder="Vezetéknév" required>
        </div>
        <div class="mb-2">
          <input type="text" class="form-control" id="newKeresztnev" placeholder="Keresztnév" required>
        </div>
        <div class="mb-2">
          <input type="text" class="form-control" id="newFelhasznalonev" placeholder="Felhasználónév" required>
        </div>
        <div class="mb-2">
          <input type="email" class="form-control" id="newEmail" placeholder="Email" required>
        </div>
        <div class="mb-2">
          <input type="password" class="form-control" id="newJelszo" placeholder="Jelszó" required>
        </div>
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
          <div class="mb-2">
            <input type="text" class="form-control" id="editVezeteknev" placeholder="Vezetéknév" required>
          </div>
          <div class="mb-2">
            <input type="text" class="form-control" id="editKeresztnev" placeholder="Keresztnév" required>
          </div>
          <div class="mb-2">
            <input type="text" class="form-control" id="editFelhasznalonev" placeholder="Felhasználónév" required>
          </div>
          <div class="mb-2">
            <input type="email" class="form-control" id="editEmail" placeholder="Email" required>
          </div>
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
    document.getElementById("addUserForm").addEventListener("submit", addUser);
    document.getElementById("editUserForm").addEventListener("submit", updateUser);
  }

  async function addUser(e) {
    e.preventDefault();
    const vezeteknev = document.getElementById("newVezeteknev").value;
    const keresztnev = document.getElementById("newKeresztnev").value;
    const felhasznalonev = document.getElementById("newFelhasznalonev").value;
    const email = document.getElementById("newEmail").value;
    const jelszo_hash = document.getElementById("newJelszo").value;
    const szerep = document.getElementById("newSzerep").value;
    try {
      const res = await fetch("/api/felhasznalok", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vezeteknev, keresztnev, felhasznalonev, email, jelszo_hash, szerep })
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

  window.editUser = async function(userId) {
    try {
      const res = await fetch(`/api/felhasznalok/${userId}`);
      const user = await res.json();
      document.getElementById("editUserId").value = user.felhasznalo_id;
      document.getElementById("editVezeteknev").value = user.vezeteknev;
      document.getElementById("editKeresztnev").value = user.keresztnev;
      document.getElementById("editFelhasznalonev").value = user.felhasznalonev || "";
      document.getElementById("editEmail").value = user.email;
      document.getElementById("editSzerep").value = user.szerep;
      document.getElementById("editUserContainer").style.display = "block";
    } catch (err) {
      console.error(err);
      alert("Hiba történt a felhasználó betöltésekor");
    }
  };

  async function updateUser(e) {
    e.preventDefault();
    const userId = document.getElementById("editUserId").value;
    const vezeteknev = document.getElementById("editVezeteknev").value;
    const keresztnev = document.getElementById("editKeresztnev").value;
    const felhasznalonev = document.getElementById("editFelhasznalonev").value;
    const email = document.getElementById("editEmail").value;
    const szerep = document.getElementById("editSzerep").value;
    try {
      const res = await fetch(`/api/felhasznalok/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vezeteknev, keresztnev, felhasznalonev, email, szerep })
      });
      const data = await res.json();
      if (data.success) {
        document.getElementById("editUserContainer").style.display = "none";
        loadUsers();
      } else {
        alert("Hiba a felhasználó frissítésekor");
      }
    } catch (err) {
      console.error(err);
      alert("Hiba történt a felhasználó frissítésekor");
    }
  }

  window.deleteUser = async function(userId) {
    if (!confirm("Biztosan törlöd a felhasználót?")) return;
    try {
      const res = await fetch(`/api/felhasznalok/${userId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        loadUsers();
      } else {
        alert("Hiba a felhasználó törlésekor");
      }
    } catch (err) {
      console.error(err);
      alert("Hiba történt a felhasználó törlésekor");
    }
  };

  // ============================
  // 2) CIPŐK + MÉRETEK KEZELÉSE
  // ============================
  async function loadCipok() {
    try {
      const res = await fetch("/api/cipok");
      const cipok = await res.json();
      renderCipok(cipok);
    } catch (err) {
      console.error("Hiba a cipők betöltésekor:", err);
      tabContent.innerHTML = "<p>Hiba a cipők betöltésekor.</p>";
    }
  }

  function renderCipok(cipok) {
    let html = `
      <h2>Cipők</h2>
      <button class="btn btn-success mb-3" id="addCipoBtn">Új cipő hozzáadása</button>
      <table class="table table-striped">
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
    `;
    cipok.forEach(cipo => {
      // A backend GROUP_CONCAT-tal adja vissza a cipo.meretek mezőt
      const meretek = cipo.meretek ? cipo.meretek.split(",").join(", ") : "";
      // A "kep" mezőben a képek vesszővel elválasztva
      // Minden egyes képre /cipok/<fájlnév> hivatkozást teszünk
      const kepekHTML = cipo.kep
        ? cipo.kep.split(",").map(fn => {
            const trimmed = fn.trim();
            return `<img src="/cipok/${trimmed}" alt="${trimmed}" style="height:40px; margin-right:4px;">`;
          }).join("")
        : "";
      html += `
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
          </td>
        </tr>
      `;
    });
    html += `
        </tbody>
      </table>
      
      <!-- Új cipő űrlap -->
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
      
      <!-- Cipő szerkesztése űrlap -->
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

      <!-- A kiválasztott cipő méretei itt jelennek meg -->
      <div id="meretekContainer" style="display:none;"></div>
    `;
    tabContent.innerHTML = html;

    document.getElementById("addCipoBtn").addEventListener("click", () => {
      document.getElementById("addCipoContainer").style.display = "block";
    });
    document.getElementById("addCipoForm").addEventListener("submit", addCipo);
    document.getElementById("editCipoForm").addEventListener("submit", updateCipo);
  }

  async function addCipo(e) {
    e.preventDefault();
    const marka = document.getElementById("newMarka").value;
    const modell = document.getElementById("newModell").value;
    const ar = document.getElementById("newAr").value;
    const leiras = document.getElementById("newLeiras").value;
    const kep = document.getElementById("newKep").value.trim();
    try {
      const res = await fetch("/api/cipok", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ marka, modell, ar, leiras, kep })
      });
      const data = await res.json();
      if (data.success) {
        loadCipok();
      } else {
        alert("Hiba a cipő hozzáadásakor");
      }
    } catch (err) {
      console.error(err);
      alert("Hiba történt a cipő hozzáadásakor");
    }
  }

  window.editCipo = async function(cipoId) {
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
  };

  async function updateCipo(e) {
    e.preventDefault();
    const cipoId = document.getElementById("editCipoId").value;
    const marka = document.getElementById("editMarka").value;
    const modell = document.getElementById("editModell").value;
    const ar = document.getElementById("editAr").value;
    const leiras = document.getElementById("editLeiras").value;
    const kep = document.getElementById("editKep").value.trim();
    try {
      const res = await fetch(`/api/cipok/${cipoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ marka, modell, ar, leiras, kep })
      });
      const data = await res.json();
      if (data.success) {
        document.getElementById("editCipoContainer").style.display = "none";
        loadCipok();
      } else {
        alert("Hiba a cipő frissítésekor");
      }
    } catch (err) {
      console.error(err);
      alert("Hiba történt a cipő frissítésekor");
    }
  }

  window.deleteCipo = async function(cipoId) {
    if (!confirm("Biztosan törlöd ezt a cipőt?")) return;
    try {
      const res = await fetch(`/api/cipok/${cipoId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        const row = document.getElementById(`cipo-${cipoId}`);
        if (row) row.remove();
        else loadCipok();
      } else {
        alert("Hiba a cipő törlésekor");
      }
    } catch (err) {
      console.error(err);
      alert("Hiba történt a cipő törlésekor");
    }
  };

  function cancelAddCipo() {
    document.getElementById("addCipoContainer").style.display = "none";
  }
  function cancelEditCipo() {
    document.getElementById("editCipoContainer").style.display = "none";
  }

  // === MÉRETEK EGY CIPŐHÖZ ===
  window.showCipoMeretek = async function(cipoId) {
    try {
      const meretekContainer = document.getElementById("meretekContainer");
      meretekContainer.style.display = "block";
      const res = await fetch(`/api/cipok/${cipoId}/meretek`);
      const meretek = await res.json();
      renderMeretekForCipo(meretek, cipoId);
    } catch (err) {
      console.error("Hiba a méretek betöltésekor:", err);
      alert("Hiba a méretek betöltésekor");
    }
  };

  function renderMeretekForCipo(meretek, cipoId) {
    const meretekContainer = document.getElementById("meretekContainer");
    let html = `
      <h3>Méretek ehhez a cipőhöz (ID: ${cipoId})</h3>
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
    `;
    meretek.forEach(m => {
      html += `
        <tr id="meret-${m.meret_id}">
          <td>${m.meret_id}</td>
          <td>${m.meret}</td>
          <td>${m.keszlet}</td>
          <td>
            <button class="btn btn-sm btn-primary" onclick="editMeret(${m.meret_id})">Szerkesztés</button>
            <button class="btn btn-sm btn-danger" onclick="deleteMeret(${m.meret_id}, ${cipoId})">Törlés</button>
          </td>
        </tr>
      `;
    });
    html += `
        </tbody>
      </table>
      <h4>Új méret hozzáadása</h4>
      <form id="addMeretForm">
        <div class="mb-2">
          <input type="text" class="form-control" id="newMeretMeret" placeholder="Méret (pl. 42)" required>
        </div>
        <div class="mb-2">
          <input type="number" class="form-control" id="newMeretKeszlet" placeholder="Készlet" required>
        </div>
        <button type="submit" class="btn btn-success">Hozzáadás</button>
      </form>
      <div id="editMeretContainer" style="display:none;">
        <h4>Méret szerkesztése</h4>
        <form id="editMeretForm">
          <input type="hidden" id="editMeretId">
          <div class="mb-2">
            <input type="text" class="form-control" id="editMeretMeret" placeholder="Méret" required>
          </div>
          <div class="mb-2">
            <input type="number" class="form-control" id="editMeretKeszlet" placeholder="Készlet" required>
          </div>
          <button type="submit" class="btn btn-primary">Mentés</button>
          <button type="button" class="btn btn-secondary" onclick="cancelEditMeret()">Mégse</button>
        </form>
      </div>
      <button class="btn btn-light mt-3" onclick="closeMeretek()">Vissza a cipők listájához</button>
    `;
    meretekContainer.innerHTML = html;

    // Új méret
    const addMeretForm = document.getElementById("addMeretForm");
    addMeretForm.addEventListener("submit", function(e) {
      e.preventDefault();
      addMeretForCipo(cipoId);
    });
    // Méret szerkesztése
    const editMeretForm = document.getElementById("editMeretForm");
    editMeretForm.addEventListener("submit", updateMeret);
  }

  async function addMeretForCipo(cipoId) {
    const meret = document.getElementById("newMeretMeret").value;
    const keszlet = document.getElementById("newMeretKeszlet").value;
    try {
      const res = await fetch("/api/meretek", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cipo_id: cipoId, meret, keszlet })
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

  window.editMeret = async function(meretId) {
    try {
      const res = await fetch(`/api/meretek/${meretId}`);
      const meretObj = await res.json();
      document.getElementById("editMeretId").value = meretObj.meret_id;
      document.getElementById("editMeretMeret").value = meretObj.meret;
      document.getElementById("editMeretKeszlet").value = meretObj.keszlet;
      document.getElementById("editMeretContainer").style.display = "block";
    } catch (err) {
      console.error(err);
      alert("Hiba a méret betöltésekor");
    }
  };

  async function updateMeret(e) {
    e.preventDefault();
    const meretId = document.getElementById("editMeretId").value;
    const meret = document.getElementById("editMeretMeret").value;
    const keszlet = document.getElementById("editMeretKeszlet").value;
    try {
      const res = await fetch(`/api/meretek/${meretId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ meret, keszlet })
      });
      const data = await res.json();
      if (data.success) {
        document.getElementById("editMeretContainer").style.display = "none";
        // Cipő ID lekérése, hogy frissítsük a listát
        const res2 = await fetch(`/api/meretek/${meretId}`);
        const updatedM = await res2.json();
        showCipoMeretek(updatedM.cipo_id);
      } else {
        alert("Hiba a méret frissítésekor");
      }
    } catch (err) {
      console.error(err);
      alert("Hiba történt a méret frissítésekor");
    }
  }

  window.deleteMeret = async function(meretId, cipoId) {
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
  };

  function cancelEditMeret() {
    document.getElementById("editMeretContainer").style.display = "none";
  }
  function closeMeretek() {
    document.getElementById("meretekContainer").style.display = "none";
    loadCipok();
  }

  // ============================
  // 3) EXKLUZÍV CIPŐK KEZELÉSE
  // ============================
  async function loadExkluziv() {
    try {
      const res = await fetch("/api/exkluziv_cipok");
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
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
    `;
    exkluziv.forEach(cipo => {
      html += `
        <tr id="exkluziv-${cipo.exkluziv_id}">
          <td>${cipo.exkluziv_id}</td>
          <td>${cipo.marka}</td>
          <td>${cipo.modell}</td>
          <td>${Number(cipo.ar).toLocaleString("hu-HU")} Ft</td>
          <td>${cipo.leiras.substring(0,50)}...</td>
          <td>
            <button class="btn btn-sm btn-primary" onclick="editExkluziv(${cipo.exkluziv_id})">Szerkesztés</button>
            <button class="btn btn-sm btn-danger" onclick="deleteExkluziv(${cipo.exkluziv_id})">Törlés</button>
          </td>
        </tr>
      `;
    });
    html += `
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
    `;
    tabContent.innerHTML = html;
    document.getElementById("addExkluzivBtn").addEventListener("click", () => {
      document.getElementById("addExkluzivContainer").style.display = "block";
    });
    document.getElementById("addExkluzivForm").addEventListener("submit", addExkluziv);
    document.getElementById("editExkluzivForm").addEventListener("submit", updateExkluziv);
  }

  async function addExkluziv(e) {
    e.preventDefault();
    const marka = document.getElementById("newExMarka").value;
    const modell = document.getElementById("newExModell").value;
    const ar = document.getElementById("newExAr").value;
    const leiras = document.getElementById("newExLeiras").value;
    try {
      const res = await fetch("/api/exkluziv_cipok", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ marka, modell, ar, leiras })
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
    const marka = document.getElementById("editExMarka").value;
    const modell = document.getElementById("editExModell").value;
    const ar = document.getElementById("editExAr").value;
    const leiras = document.getElementById("editExLeiras").value;
    try {
      const res = await fetch(`/api/exkluziv_cipok/${exId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ marka, modell, ar, leiras })
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
    document.getElementById("addExkluzivContainer").style.display = "none";
  }
  function cancelEditExkluziv() {
    document.getElementById("editExkluzivContainer").style.display = "none";
  }

  // Exportálás globálisan az inline onclick-hez
  window.editUser = editUser;
  window.deleteUser = deleteUser;
  window.editCipo = editCipo;
  window.deleteCipo = deleteCipo;
  window.showCipoMeretek = showCipoMeretek;
  window.editMeret = editMeret;
  window.deleteMeret = deleteMeret;
  window.editExkluziv = editExkluziv;
  window.deleteExkluziv = deleteExkluziv;
});
