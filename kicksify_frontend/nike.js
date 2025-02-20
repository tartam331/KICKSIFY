document.addEventListener("DOMContentLoaded", function() {
  // Lekérjük az adatbázisból a Nike cipőket
  fetch("http://localhost:5000/api/cipok?marka=Nike")
      .then(response => {
          if (!response.ok) {
              throw new Error("HTTP error: " + response.status);
          }
          return response.json();
      })
      .then(data => {
          const container = document.getElementById("shoe-container");
          container.innerHTML = "";

          if (!Array.isArray(data) || data.length === 0) {
              container.innerHTML = "<p>Nincs elérhető Nike cipő.</p>";
              return;
          }

          data.forEach(cip => {
              const col = document.createElement("div");
              col.className = "col-sm-6 col-md-4 col-lg-3 shoe-item";

              // Formázott ár, pl. "54,990 Ft"
              const arFormazott = Number(cip.ar).toLocaleString("hu-HU") + " Ft";

              // Kattintásra a product.html oldalra visszük, paraméterben a cipo_id
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
      })
      .catch(error => {
          console.error("❌ Hiba a cipők betöltésekor:", error);
          document.getElementById("shoe-container").innerHTML =
              "<p>Hiba történt az adatok betöltésekor.</p>";
      });
});
