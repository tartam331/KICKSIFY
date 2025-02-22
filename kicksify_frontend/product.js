document.addEventListener("DOMContentLoaded", function() {
  // Cipő ID lekérése az URL-ből
  const params = new URLSearchParams(window.location.search);
  const cipoId = params.get("id");

  if (!cipoId) {
      console.error("❌ Nincs cipő ID az URL-ben.");
      return;
  }

  // Cipő adatainak lekérése
  fetch(`/api/cipok/${cipoId}`)
      .then(response => response.json())
      .then(data => {
          document.getElementById("product-name").textContent = data.modell;
          document.getElementById("product-brand").textContent = data.marka;
          document.getElementById("product-price").textContent = data.ar.toLocaleString("hu-HU") + " Ft";
          document.getElementById("product-image").src = `/images/${data.kep}`;
      })
      .catch(error => console.error("❌ Hiba a cipő adatainak betöltésekor:", error));

  // Méretek lekérése
  fetch(`/api/cipok/${cipoId}/meretek`)
      .then(response => response.json())
      .then(data => {
          const sizeContainer = document.getElementById("size-options");
          sizeContainer.innerHTML = ""; // Alapértelmezett tartalom törlése

          if (data.error) {
              sizeContainer.innerHTML = "<p>Nincs elérhető méret.</p>";
              return;
          }

          data.forEach(size => {
              const sizeButton = document.createElement("button");
              sizeButton.className = "size-option";
              sizeButton.textContent = size.meret;
              sizeContainer.appendChild(sizeButton);
          });
      })
      .catch(error => console.error("❌ Hiba a méretek betöltésekor:", error));
});
