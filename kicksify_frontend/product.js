document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const cipoId = urlParams.get("id");

  if (!cipoId) {
    alert("Hiba: Nem található termék az azonosító alapján.");
    return;
  }

  try {
    // 1) Cipő adatok lekérése
    const resCipo = await fetch(`/api/cipok/${cipoId}`);
    const dataCipo = await resCipo.json();

    if (dataCipo.error) {
      console.error("Hiba:", dataCipo.error);
      return;
    }

    // -- Fő kép és galéria --
    const mainImage = document.getElementById("main-image");
    const gallery = document.getElementById("image-gallery");
    mainImage.src = "no-image.png";
    gallery.innerHTML = "";

    if (dataCipo.kep) {
      const kepek = dataCipo.kep.split(",");
      // Első kép
      mainImage.src = `http://localhost:5000/cipok/${kepek[0].trim()}`;

      // További képek a galériában
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

    // -- Márka, modell, ár kiírása --
    document.getElementById("product-brand").textContent = dataCipo.marka;
    document.getElementById("product-name").textContent = dataCipo.modell;
    document.getElementById("product-price").textContent =
      `${Number(dataCipo.ar).toLocaleString("hu-HU")} Ft`;

    // -- Méretek betöltése (ha külön végpont) --
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

    // -- Létrehozzuk / mozgatjuk a grafikon dobozát a képgaléria ALÁ --
    let priceHistoryContainer = document.getElementById("price-history-container");
    if (!priceHistoryContainer) {
      priceHistoryContainer = document.createElement("div");
      priceHistoryContainer.id = "price-history-container";
      priceHistoryContainer.innerHTML = `
        <h3>Ár történelem</h3>
        <canvas id="priceChart"></canvas>
      `;
    }
    // Beszúrjuk közvetlenül a galéria után
    gallery.parentNode.insertBefore(priceHistoryContainer, gallery.nextSibling);

    // 2) Grafikon betöltése
    loadPriceChart(cipoId);

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
 * Árgrafikon betöltése (Y-tengely min = legkisebb ár, max = legnagyobb ár)
 */
async function loadPriceChart(cipoId) {
  try {
    const res = await fetch(`/api/cipok/${cipoId}/arvaltozas`);
    const priceData = await res.json();

    if (!priceData.length) {
      document.getElementById("price-history-container").innerHTML =
        "<p>Nincs elérhető ár történet.</p>";
      return;
    }

    const labels = priceData.map(e =>
      new Date(e.datum).toLocaleDateString("hu-HU")
    );
    const prices = priceData.map(e => e.ar);

    // Legkisebb és legnagyobb ár
    let minPrice = Math.min(...prices);
    let maxPrice = Math.max(...prices);

    // Ha minden ár ugyanaz, toljuk fel a max-ot
    if (minPrice === maxPrice) {
      maxPrice = minPrice + 1;
    }

    // Chart.js létrehozása
    const ctx = document.getElementById("priceChart").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels,
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
  } catch (err) {
    console.error("❌ Hiba az árgrafikon betöltésekor:", err);
  }
}
