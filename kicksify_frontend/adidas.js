let allAdidasShoes = []; // Ebbe tároljuk az összes Nike cipőt

document.addEventListener("DOMContentLoaded", function() {
  // 1. Lekérés az adatbázisból (API-ból)
  fetch("http://localhost:5000/api/cipok?marka=Adidas")
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP error: " + response.status);
      }
      return response.json();
    })
    .then(data => {
      // Elmentjük a kapott cipőket
      allNikeShoes = data;
      // Alapértelmezetten kirajzoljuk
      renderShoes(allAdidasShoes);
    })
    .catch(error => {
      console.error("❌ Hiba a cipők betöltésekor:", error);
      const container = document.getElementById("shoe-container");
      container.innerHTML = "<p>Hiba történt az adatok betöltésekor.</p>";
    });

  // 2. Rendezés (ár szerint) a legördülő alapján
  const sortSelect = document.getElementById("sortSelect");
  sortSelect.addEventListener("change", function() {
    const value = this.value;

    if (value === "asc") {
      // Ár szerint növekvő
      allAdidasShoes.sort((a, b) => a.ar - b.ar);
    } else if (value === "desc") {
      // Ár szerint csökkenő
      allAdiasShoes.sort((a, b) => b.ar - a.ar);
    } else {
      // "featured" vagy Kiemelt termékek -> tetszés szerint
      // pl. hagyjuk az eredeti sorrendet, vagy valami egyedi logikát
      // Itt most nem csinálunk semmit, marad a legutóbbi sorrend
    }

    // Újra kirajzoljuk a rendezett tömböt
    renderShoes(allAdidasShoes);
  });
});

/**
 * Cipők kirajzolása a shoe-container elembe.
 * @param {Array} shoeArray - A megjelenítendő cipők tömbje
 */
function renderShoes(shoeArray) {
  const container = document.getElementById("shoe-container");
  container.innerHTML = "";

  if (!Array.isArray(shoeArray) || shoeArray.length === 0) {
    container.innerHTML = "<p>Nincs elérhető Nike cipő.</p>";
    return;
  }

  shoeArray.forEach(cip => {
    // 1 oszlop mobilon, 3 oszlop md-től (Bootstrap)
    const col = document.createElement("div");
    col.className = "col-12 col-md-4 shoe-item";

    // Formázott ár, pl. "54,990 Ft"
    const arFormazott = Number(cip.ar).toLocaleString("hu-HU") + " Ft";

    // Kattintásra product.html oldalra visszük (paraméterben a cipo_id)
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
