document.addEventListener("DOMContentLoaded", function() {
    // Lekérjük az adatbázisból a Nike cipőket az API végpontról
    fetch("/api/cipok?marka=Nike")
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        var container = document.getElementById("shoe-container");
        container.innerHTML = "";
        if (data.length === 0) {
          container.innerHTML = "<p>Nincs elérhető Nike cipő.</p>";
          return;
        }
        data.forEach(function(cip) {  // itt "cip" az egyes rekordok, melyek a "cipok" táblából származnak
          var col = document.createElement("div");
          col.className = "col-sm-6 col-md-4 col-lg-3 mb-4";
          col.innerHTML = `
            <div class="card h-100">
              <img src="/images/${cipo.kep}" class="card-img-top" alt="${cipo.modell}">
              <div class="card-body">
                <h5 class="card-title">${cipo.marka} ${cipo.modell}</h5>
                <p class="card-text"><strong>Méret:</strong> ${cipo.meret}</p>
                <p class="card-text"><strong>Szín:</strong> ${cipo.szin}</p>
                <p class="card-text"><strong>Készlet:</strong> ${cipo.keszlet}</p>
                <p class="card-text"><strong>Ár:</strong> ${cipo.ar} HUF</p>
                <p class="card-text">${cipo.leiras ? cipo.leiras.substring(0, 100) + "..." : ""}</p>
              </div>
              <div class="card-footer text-center">
                <button class="btn btn-primary">Kosárba</button>
              </div>
            </div>
          `;
          container.appendChild(col);
        });
      })
      .catch(function(error) {
        console.error("Hiba a cipők betöltésekor:", error);
        document.getElementById("shoe-container").innerHTML = "<p>Hiba történt az adatok betöltésekor.</p>";
      });
  });
  