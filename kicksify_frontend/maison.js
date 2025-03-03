let allNikeShoes = []; // Adidas cipők tömbje

document.addEventListener("DOMContentLoaded", function() {
  fetch("http://localhost:5000/api/cipok?marka=Maison Margiela")
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP error: " + response.status);
      }
      return response.json();
    })
    .then(data => {
      allNikeShoes = data; // Mentés a megfelelő változóba
      console.log("✅ Betöltött Adidas cipők:", allNikeShoes); // Debug

      renderShoes(allNikeShoes); // Kirajzolás
    })
    .catch(error => {
      console.error("❌ Hiba a cipők betöltésekor:", error);
      document.getElementById("shoe-container").innerHTML = "<p>Hiba történt az adatok betöltésekor.</p>";
    });

  document.getElementById("sortSelect").addEventListener("change", function() {
    const value = this.value;

    if (value === "asc") {
      allNikeShoes.sort((a, b) => a.ar - b.ar);
    } else if (value === "desc") {
      allNikeShoes.sort((a, b) => b.ar - a.ar);
    }

    renderShoes(allNikeShoes);
  });
});

/**
 * Cipők megjelenítése
 */
function renderShoes(shoeArray) {
  const container = document.getElementById("shoe-container");
  container.innerHTML = "";

  if (!Array.isArray(shoeArray) || shoeArray.length === 0) {
    container.innerHTML = "<p>Nincs elérhető Adidas cipő.</p>";
    return;
  }

  shoeArray.forEach(cip => {
    // Az első képfájl kiválasztása a listából
    const firstImage = cip.kep.split(",")[0].trim(); // Első kép kiválasztása
    const imgSrc = `http://localhost:5000/cipok/${firstImage}`;
    console.log("🔍 Kép megjelenítéshez:", imgSrc); // Ellenőrzés

    const col = document.createElement("div");
    col.className = "col-12 col-md-4 shoe-item";

    const arFormazott = Number(cip.ar).toLocaleString("hu-HU") + " Ft";

    col.onclick = function() {
      window.location.href = `product.html?id=${cip.cipo_id}`;
    };

    col.innerHTML = `
      <img src="${imgSrc}" alt="${cip.modell}" class="shoe-image"
        onerror="this.onerror=null; this.src='images/default-image.jpg';"
        style="width: 100%; height: auto; display: block;">
      <p class="shoe-name">${cip.marka} ${cip.modell}</p>
      <p class="shoe-price">${arFormazott}</p>
    `;

    container.appendChild(col);
  });
}
