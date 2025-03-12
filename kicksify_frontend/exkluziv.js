document.addEventListener("DOMContentLoaded", function() {
    let allExclusives = [];
  
    // 1) Exkluzív cipők betöltése
    fetch("http://localhost:5000/api/exkluziv_cipok")
      .then(response => {
        if (!response.ok) {
          throw new Error("HTTP error: " + response.status);
        }
        return response.json();
      })
      .then(data => {
        allExclusives = data;
        console.log("✅ Betöltött exkluzív cipők:", allExclusives);
        renderShoes(allExclusives);
      })
      .catch(error => {
        console.error("❌ Hiba az exkluzív cipők betöltésekor:", error);
        document.getElementById("shoe-container").innerHTML = "<p>Hiba történt az adatok betöltésekor.</p>";
      });
  
    // 2) Rendezés
    document.getElementById("sortSelect").addEventListener("change", function() {
      const value = this.value;
      if (value === "asc") {
        allExclusives.sort((a, b) => a.ar - b.ar);
      } else if (value === "desc") {
        allExclusives.sort((a, b) => b.ar - a.ar);
      }
      // Ha "featured", hagyjuk az eredeti sorrendet
      renderShoes(allExclusives);
    });
  
    // 3) Exkluzív cipők megjelenítése
    function renderShoes(shoeArray) {
      const container = document.getElementById("shoe-container");
      container.innerHTML = "";
      if (!Array.isArray(shoeArray) || shoeArray.length === 0) {
        container.innerHTML = "<p>Nincs elérhető exkluzív cipő.</p>";
        return;
      }
      shoeArray.forEach(cip => {
        // Első kép kiválasztása a 'kep' mező vesszővel elválasztott listájából
        const firstImage = cip.kep.split(",")[0].trim();
        // Ha a képek esetleg külön mappában vannak, módosítsd az útvonalat (például: `/images/exkluziv/${firstImage}`)
        const imgSrc = `http://localhost:5000/cipok/${firstImage}`;
        console.log("🔍 Kép megjelenítéshez:", imgSrc);
  
        const col = document.createElement("div");
        col.className = "col-12 col-md-4 shoe-item";
  
        const priceFormatted = Number(cip.ar).toLocaleString("hu-HU") + " Ft";
  
        // Kattintás: navigálás az exkluzív termék részletes oldalára,
        // itt az URL-ben az exkluzív azonosító (exkluziv_id) kerül használatra
        col.onclick = function() {
          window.location.href = `exkluzivproduct.html?id=${cip.exkluziv_id}&type=exkluziv`;
        };
  
        col.innerHTML = `
          <img src="${imgSrc}" alt="${cip.modell}" class="shoe-image"
            onerror="this.onerror=null; this.src='images/default-image.jpg';"
            style="width: 100%; height: auto; display: block;">
          <p class="shoe-name">${cip.marka} ${cip.modell}</p>
          <p class="shoe-price">${priceFormatted}</p>
        `;
  
        container.appendChild(col);
      });
    }
  
    // 4) Bal oldali panel vezérlése
    const openLeftPanelBtn = document.getElementById("openLeftPanel");
    const leftPanel = document.getElementById("leftPanel");
    const closeLeftPanelBtn = document.getElementById("closeLeftPanel");
  
    openLeftPanelBtn.addEventListener("click", () => {
      leftPanel.classList.add("active");
    });
    closeLeftPanelBtn.addEventListener("click", () => {
      leftPanel.classList.remove("active");
    });
  });
  