let allJordanShoes = []; // Az összes Jordan cipő tárolására

document.addEventListener("DOMContentLoaded", function() {
  // Lekérjük az adatbázisból a Jordan cipőket
  fetch("http://localhost:5000/api/cipok?marka=Jordan")
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP error: " + response.status);
      }
      return response.json();
    })
    .then(data => {
      allJordanShoes = data;
      renderShoes(allJordanShoes);
    })
    .catch(error => {
      console.error("❌ Hiba a cipők betöltésekor:", error);
      document.getElementById("shoe-container").innerHTML = "<p>Hiba történt az adatok betöltésekor.</p>";
    });

  // Rendezés ár szerint a legördülő menüből
  const sortSelect = document.getElementById("sortSelect");
  sortSelect.addEventListener("change", function() {
    const value = this.value;
    if (value === "asc") {
      // Növekvő sorrend: kisebb árú cipők elöl
      allJordanShoes.sort((a, b) => a.ar - b.ar);
    } else if (value === "desc") {
      // Csökkenő sorrend: nagyobb árú cipők elöl
      allJordanShoes.sort((a, b) => b.ar - a.ar);
    } else {
      // "Kiemelt termékek" vagy featured – itt az eredeti sorrendet hagyhatod meg,
      // vagy implementálhatsz egy saját logikát.
    }
    renderShoes(allJordanShoes);
  });
});

/**
 * Cipők kirajzolása a #shoe-container elembe.
 * @param {Array} shoeArray - A megjelenítendő Jordan cipők tömbje
 */
function renderShoes(shoeArray) {
  const container = document.getElementById("shoe-container");
  container.innerHTML = "";

  if (!Array.isArray(shoeArray) || shoeArray.length === 0) {
    container.innerHTML = "<p>Nincs elérhető Jordan cipő.</p>";
    return;
  }

  shoeArray.forEach(cip => {
    // Bootstrap: mobilon 1 oszlop (col-12), md-től 3 oszlop (col-md-4)
    const col = document.createElement("div");
    col.className = "col-12 col-md-4 shoe-item";

    // Formázott ár: pl. "154,990 Ft"
    const arFormazott = Number(cip.ar).toLocaleString("hu-HU") + " Ft";

    // Kattintás: a termék részleteihez navigál (product.html? id paraméterrel)
    col.onclick = function() {
      window.location.href = `product.html?id=${cip.cipo_id}`;
    };

    col.innerHTML = `
      <img src="http://localhost:5000/cipok/${cip.kep}" alt="${cip.modell}">
      <p class="shoe-name">${cip.marka} ${cip.modell}</p>
      <p class="shoe-price">${arFormazott}</p>
    `;
    container.appendChild(col);
  });
}
