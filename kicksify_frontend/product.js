document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const cipoId = urlParams.get("id");

  if (!cipoId) {
    alert("Hiba: Nem található termék az azonosító alapján.");
    return;
  }

  try {
    // Cipő adatok lekérése
    const resCipo = await fetch(`/api/cipok/${cipoId}`);
    const dataCipo = await resCipo.json();

    if (dataCipo.error) {
      console.error("Hiba:", dataCipo.error);
      return;
    }

    // Fő kép és galéria
    const mainImage = document.getElementById("main-image");
    const gallery = document.getElementById("image-gallery");
    mainImage.src = "no-image.png";
    gallery.innerHTML = "";

    if (dataCipo.kep) {
      const kepek = dataCipo.kep.split(",");
      // Első kép megjelenítése
      mainImage.src = `http://localhost:5000/cipok/${kepek[0].trim()}`;

      // További képek betöltése a galériába
      kepek.forEach(img => {
        const imgElem = document.createElement("img");
        imgElem.src = `http://localhost:5000/cipok/${img.trim()}`;
        imgElem.className = "small";
        imgElem.addEventListener("click", () => {
          mainImage.src = imgElem.src;
        });
        gallery.appendChild(imgElem);
      });
    }

    // Márka, modell, ár kiírása
    document.getElementById("product-brand").textContent = dataCipo.marka;
    document.getElementById("product-name").textContent = dataCipo.modell;
    document.getElementById("product-price").textContent =
      `${Number(dataCipo.ar).toLocaleString("hu-HU")} Ft`;

    // Méretek betöltése
    const resMeretek = await fetch(`/api/cipok/${cipoId}/meretek`);
    const dataMeretek = await resMeretek.json();
    const sizeContainer = document.getElementById("size-options");
    sizeContainer.innerHTML = "";

    dataMeretek.forEach(sizeObj => {
      const sizeBtn = document.createElement("button");
      sizeBtn.className = "size-option";
      sizeBtn.textContent = sizeObj.meret;
      sizeBtn.addEventListener("click", () => {
        document.querySelectorAll(".size-option").forEach(btn => btn.classList.remove("active"));
        sizeBtn.classList.add("active");
        document.getElementById("selected-size").textContent = sizeObj.meret;
      });
      sizeContainer.appendChild(sizeBtn);
    });

    // Grafikon és ár történelem táblázat betöltése
    loadPriceHistory(cipoId);

  } catch (err) {
    console.error("Hiba a termék/méretek betöltésekor:", err);
  }
});

/** Mennyiség csökkentése/növelése */
function updateQuantity(change) {
  const quantityInput = document.getElementById("quantity");
  let newValue = parseInt(quantityInput.value) + change;
  if (newValue < 1) newValue = 1;
  quantityInput.value = newValue;
}

/** 
 * Ár történelem: diagram és táblázat megjelenítése
 */
async function loadPriceHistory(cipoId) {
  try {
    const res = await fetch(`/api/cipok/${cipoId}/arvaltozas`);
    const priceData = await res.json();

    if (!priceData.length) {
      document.getElementById("price-history-container").innerHTML =
        "<p>Nincs elérhető ár történet.</p>";
      return;
    }

    // Adatok előkészítése
    const labels = priceData.map(e => new Date(e.datum).toLocaleDateString("hu-HU"));
    const prices = priceData.map(e => e.ar);
    let minPrice = Math.min(...prices);
    let maxPrice = Math.max(...prices);
    if (minPrice === maxPrice) {
      maxPrice = minPrice + 1;
    }

    // Diagram létrehozása Chart.js segítségével
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

    // HTML táblázat létrehozása
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

    // Táblázat beszúrása a konténerbe
    let tableContainer = document.getElementById("priceTableContainer");
    if (!tableContainer) {
      tableContainer = document.createElement("div");
      tableContainer.id = "priceTableContainer";
      document.getElementById("price-history-container").appendChild(tableContainer);
    }
    tableContainer.innerHTML = "";
    tableContainer.appendChild(table);

  } catch (err) {
    console.error("Hiba az ár történelem betöltésekor:", err);
  }
}
